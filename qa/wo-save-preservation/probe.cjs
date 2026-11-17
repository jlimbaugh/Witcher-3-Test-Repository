#!/usr/bin/env node
'use strict';
/*
 PHOENIX White Orchard save-preservation probe (D2 investigation, LT). Read-only with respect to the app:
 it serves a dist/ directory as-is, drives a fresh throwaway headless Chrome profile per run over CDP, and
 records every localStorage write plus exact stored bytes at each phase. No dependencies beyond Node >= 22.

 Usage (from the repository root):
   CHROME_PATH=/path/to/chrome \
   PHOENIX_DIST_BASELINE=<baseline checkout>/dist \
   PHOENIX_DIST_CANDIDATE=<candidate checkout>/dist \
   node qa/wo-save-preservation/probe.cjs [--out results.json] [--only <case-substring>] [--jobs 3]
 If only one of the two dist variables is set, only that build is probed.
 QA6 extension: any number of builds with repeated `--build <label>=<dist dir>` (e.g. --build baseline=../v45/dist
 --build qa5=../qa5/dist --build qa6=dist); these replace the two variables when given. Adds the empty-string input,
 Velen cases at both viewports, and the `d4:` flow (localStorage access denied: Home -> Velen -> hub -> quest -> return
 -> Home, with storage, messages, visible views and page errors captured after every step).
*/
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {launchChrome,serve,sleep}=require('./cdp.cjs');

const WO='phoenix.whiteorchard.interaction.v1',VELEN='phoenix.velen.arrival.v1';
const argv=process.argv.slice(2),arg=(n,d)=>{const i=argv.indexOf(n);return i>=0?argv[i+1]:d;};
const OUT=arg('--out',path.join(__dirname,'results.json')),ONLY=arg('--only',''),JOBS=Number(arg('--jobs',3));
const CHROME=process.env.CHROME_PATH||'google-chrome';
const buildArgs=argv.flatMap((a,i)=>a==='--build'?[argv[i+1]]:[]).map(x=>{const i=x.indexOf('=');return [x.slice(0,i),x.slice(i+1)];});
const builds=buildArgs.length?buildArgs:[['baseline',process.env.PHOENIX_DIST_BASELINE],['candidate',process.env.PHOENIX_DIST_CANDIDATE]].filter(([,d])=>d);
if(!builds.length){console.error('Set PHOENIX_DIST_BASELINE and/or PHOENIX_DIST_CANDIDATE to a dist/ directory.');process.exit(2);}
const sha=s=>crypto.createHash('sha256').update(s,'utf8').digest('hex');
const VIEWPORTS={portrait:{width:390,height:844},landscape:{width:844,height:390}};

// A realistic populated record: produced by the probe itself through the normal UI on a clean profile
// (confirm the first Lilac and Gooseberries objective) unless PHOENIX_WO_VALID_RECORD (a file) is given.
let VALID=null;
const WO_INPUTS=()=>({
  'absent':null,
  'invalid-json-truncated':VALID.slice(0,Math.floor(VALID.length/2)),
  'invalid-json-text':'not json {',
  'invalid-json-empty-string':'',
  'shape-array':'[]',
  'shape-string':'"hello"',
  'shape-null':'null',
  'shape-number':'42',
  'shape-object-missing-fields':'{"foo":1}',
  'version-2-populated':JSON.stringify({...JSON.parse(VALID),version:2}),
  'version-string-1-populated':JSON.stringify({...JSON.parse(VALID),version:'1'}),
  'version-2-divergent':JSON.stringify({...JSON.parse(VALID),version:2,completed:{...JSON.parse(VALID).completed,'q-lilac':true},selectedHub:'hub-missing',expandedHub:'hub-missing'}),
  'version-missing-populated':(()=>{const o=JSON.parse(VALID);delete o.version;return JSON.stringify(o);})(),
  'valid-populated':VALID,
});
// Storage fault modes (applied with the valid populated record seeded).
const FAULTS={
  'read-throws-wo-key':{read:'always'},
  'read-throws-first-load-only':{read:'first-load'},
  'localStorage-access-throws':{access:'always'},
  'write-throws-wo-key-quota':{write:'wo'},
  'write-throws-all-keys-quota':{write:'all'},
};
const VELEN_INPUTS={'velen-invalid-json':'{"stage":','velen-shape-array':'[1,2]','velen-shape-string':'"x"','velen-valid-absent':null};

function instrument(fault){
  // Runs before any page script. Logs every Storage write through a CDP binding; optionally injects faults.
  return `(()=>{const F=${JSON.stringify(fault||{})},WO=${JSON.stringify(WO)};const P=Storage.prototype,g=P.getItem,s=P.setItem,r=P.removeItem,c=P.clear;
const log=(op,k,v)=>{try{window.__phxWrite(JSON.stringify({op,key:k,value:v,t:performance.now(),hash:location.hash,stack:(new Error().stack||'').split('\\n').slice(2,7).map(x=>x.trim().replace(location.origin+'/','')).join(' | ')}));}catch{}};
const isLocal=o=>{try{return o===window.localStorage;}catch{return true;}};
P.getItem=function(k){if(isLocal(this)&&F.read&&k===WO)throw new DOMException('probe: simulated read failure','SecurityError');return g.call(this,k);};
P.setItem=function(k,v){if(isLocal(this)&&F.write&&(F.write==='all'||k===WO)){log('setItem-REFUSED',k,String(v));throw new DOMException('probe: simulated quota','QuotaExceededError');}log('setItem',k,String(v));return s.call(this,k,v);};
P.removeItem=function(k){log('removeItem',k,null);return r.call(this,k);};
P.clear=function(){log('clear',null,null);return c.call(this);};
if(F.access){Object.defineProperty(window,'localStorage',{configurable:true,get(){throw new DOMException('probe: storage access denied','SecurityError');}});}
})();`;
}

async function settle(c,ms=1500){await sleep(ms);}
async function run(build,dist,name,seed,viewport,fault,flow){
  const {server,origin}=await serve(dist);const c=await launchChrome(CHROME);
  const rec={build,name,viewport,flow,fault:fault||null,seedKey:flow==='velen'?VELEN:WO,phases:[],writes:[],errors:[],interaction:[]};
  let phase='seed';
  c.on(m=>{
    if(m.method==='Runtime.bindingCalled'&&m.params.name==='__phxWrite'){const w=JSON.parse(m.params.payload);w.phase=phase;
      if(w.key!==WO&&w.key!==VELEN&&w.value!=null){w.valueSha256=sha(w.value);w.valueLength=w.value.length;delete w.value;}rec.writes.push(w);}
    if(m.method==='Runtime.exceptionThrown'){const d=m.params.exceptionDetails;rec.errors.push({phase,kind:'exception',text:(d.exception?.description||d.text||'').slice(0,400),at:(d.stackTrace?.callFrames||[]).slice(0,4).map(f=>(f.url||'').replace(/^https?:\/\/[^/]+\//,'')+':'+(f.lineNumber+1)+':'+(f.columnNumber+1)).join(' | ')||((d.url||'').replace(/^https?:\/\/[^/]+\//,'')+':'+(d.lineNumber+1)+':'+(d.columnNumber+1))});}
    if(m.method==='Runtime.consoleAPICalled'&&['error','warning','assert'].includes(m.params.type))rec.errors.push({phase,kind:'console-'+m.params.type,text:m.params.args.map(a=>a.value??a.description??'').join(' ').slice(0,400)});
    if(m.method==='Log.entryAdded'&&m.params.entry.level==='error')rec.errors.push({phase,kind:'log',text:(m.params.entry.text+' '+(m.params.entry.url||'')).slice(0,400)});
  });
  await c.send('Page.enable');await c.send('Runtime.enable');await c.send('Log.enable');await c.send('DOMStorage.enable');
  await c.send('Emulation.setDeviceMetricsOverride',{...VIEWPORTS[viewport],deviceScaleFactor:2,mobile:true});
  await c.send('Runtime.addBinding',{name:'__phxWrite'});
  const ev=async(expr)=>{const r=await c.send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error('eval: '+(r.exceptionDetails.exception?.description||r.exceptionDetails.text));return r.result.value;};
  const storage=async()=>{let items;try{items=(await c.send('DOMStorage.getDOMStorageItems',{storageId:{storageKey:origin+'/',isLocalStorage:true}})).entries;}catch{items=(await c.send('DOMStorage.getDOMStorageItems',{storageId:{securityOrigin:origin,isLocalStorage:true}})).entries;}
    const o={};for(const [k,v] of items.sort())o[k]=(k===WO||k===VELEN||k==='phoenix.guide.resume.v1')?{bytes:v,sha256:sha(v),length:v.length}:{sha256:sha(v),length:v.length};return o;};
  const messages=async()=>ev(`(()=>{const vis=e=>!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length);const m=[...document.querySelectorAll('[data-save-message],#velen-save-status')].map(e=>({sel:e.id?'#'+e.id:'[data-save-message]',text:e.textContent,state:e.dataset.saveState||null,visible:vis(e)}));const u={};m.forEach(x=>{const k=x.sel+'|'+x.text;u[k]=u[k]||{...x,count:0,visibleCount:0};u[k].count++;if(x.visible)u[k].visibleCount++;});return {hash:location.hash,visibleViews:[...document.querySelectorAll('.view')].filter(v=>!v.hidden).map(v=>v.id),messages:Object.values(u)};})()`).catch(e=>({error:String(e)}));
  const snap=async(label)=>{const s=await storage();const m=label==='before-load'?null:await messages();rec.phases.push({phase:label,storage:s,ui:m});};
  const load=async(url)=>{const done=new Promise(r=>{const h=m=>{if(m.method==='Page.loadEventFired')r();};c.on(h);});await c.send('Page.navigate',{url});await Promise.race([done,sleep(8000)]);await settle(c);};
  try{
    await load(origin+'/__seed.html');
    await ev(`localStorage.clear();${seed==null?'':`localStorage.setItem(${JSON.stringify(flow==='velen'?VELEN:WO)},${JSON.stringify(seed)});`}${flow==='velen'?'':''}true`);
    await snap('before-load');
    const script=(await c.send('Page.addScriptToEvaluateOnNewDocument',{source:instrument(fault)})).identifier;
    phase='load';await load(origin+'/index.html'+(flow==='velen'?'#velen':''));await snap('after-load');
    if(flow==='d4'){ // QA6: storage access denied; the whole start-up and the Velen route must work.
      phase='interaction';
      for(const [label,expr] of [['velen','(location.hash="#velen",location.hash)'],['velen-hub','(location.hash="#velen/hub/nilf",location.hash)'],['velen-quest','(location.hash="#velen/quest/nilf/1",location.hash)'],['return-hub','(history.back(),"back")'],['return-velen','(history.back(),"back")'],['home','(location.hash="#home",location.hash)']]){
        let r;try{r=await ev(expr);}catch(e){r='ERROR '+e.message;}await sleep(1100);
        const ui=await messages(),dom=await ev(`(()=>({hash:location.hash,velenHub:!!document.querySelector('#velen .velen-nilf-hub,#velen .quest-hub'),velenText:(document.querySelector('#velen:not([hidden])')?.innerText||'').replace(/\s+/g,' ').slice(0,160),bodyText:(document.querySelector('.view:not([hidden])')?.innerText||'').replace(/\s+/g,' ').slice(0,120)}))()`).catch(e=>({error:String(e)}));
        rec.interaction.push({step:label,result:r,dom});rec.phases.push({phase:'after-'+label,storage:await storage(),ui});
      }
      for(const n of [1,2]){phase='reload-'+n;const done=new Promise(r=>{c.on(m=>{if(m.method==='Page.loadEventFired')r();});});await c.send('Page.reload',{ignoreCache:true});await Promise.race([done,sleep(8000)]);await settle(c);await snap('after-reload-'+n);}
      throw {done:true};
    }
    phase='interaction';
    const step=async(label,expr,wait=900)=>{let r;try{r=await ev(expr);}catch(e){r='ERROR '+e.message;}rec.interaction.push({step:label,result:r});await sleep(wait);};
    if(flow==='velen'){
      await step('open Nilfgaardian quest','(location.hash="#velen/quest/nilf/1",location.hash)');
      await step('return to Velen','(history.back(),"back")');
      await step('return to WO hub','(location.hash="#whiteorchard-tree/hub-arrival",location.hash)');
    }else{
      await step('open WO hub','(location.hash="#whiteorchard-tree/hub-arrival",location.hash)');
      await step('open quest page','(location.hash="#quest-lilac/1",location.hash)');
      await step('return to hub','(history.back(),"back")');
      await step('toggle objective q-lilac:ride',`(()=>{const cb=document.querySelector('[data-objective-check="q-lilac:ride"]');if(!cb)return 'no control';cb.click();return 'clicked; checked='+cb.checked;})()`,700);
      await step('confirm progress update',`(()=>{const b=[...document.querySelectorAll('dialog[open] [data-confirm]')][0];if(!b)return 'no dialog';b.click();return 'confirmed; checked='+document.querySelector('[data-objective-check="q-lilac:ride"]')?.checked;})()`);
      await snap('after-toggle');
      await step('undo',`(()=>{const b=document.querySelector('[data-undo-deck]');if(!b)return 'no undo';if(b.disabled)return 'undo disabled';b.click();return 'undone; checked='+document.querySelector('[data-objective-check="q-lilac:ride"]')?.checked;})()`);
      await step('return home','(location.hash="#home",location.hash)');
    }
    await snap('after-interaction');
    if(fault?.read==='first-load')await c.send('Page.removeScriptToEvaluateOnNewDocument',{identifier:script}).then(()=>c.send('Page.addScriptToEvaluateOnNewDocument',{source:instrument(null)}));
    for(const n of [1,2]){phase='reload-'+n;const done=new Promise(r=>{c.on(m=>{if(m.method==='Page.loadEventFired')r();});});await c.send('Page.reload',{ignoreCache:true});await Promise.race([done,sleep(8000)]);await settle(c);await snap('after-reload-'+n);}
  }catch(e){if(!e?.done)rec.errors.push({phase,kind:'probe',text:String(e.stack||e)});}
  await c.close();server.close();
  summarize(rec,seed);return rec;
}
function summarize(rec,seed){
  const k=rec.seedKey,get=p=>rec.phases.find(x=>x.phase===p)?.storage?.[k];
  const final=get('after-reload-2'),afterLoad=get('after-load');
  const keyWrites=rec.writes.filter(w=>w.key===k&&w.op==='setItem');
  const firstWrite=keyWrites[0];
  rec.summary={
    flow:rec.flow,
    seedPresent:seed!=null,seedSha256:seed==null?null:sha(seed),
    preservedAfterLoad:seed==null?null:afterLoad?.bytes===seed,
    preservedThroughReload2:seed==null?null:final?.bytes===seed,
    finalSha256:final?.sha256??null,finalBytesPrefix:final?.bytes?.slice(0,160)??null,
    keyWriteCount:keyWrites.length,refusedWriteCount:rec.writes.filter(w=>w.key===k&&w.op==='setItem-REFUSED').length,
    firstKeyWrite:firstWrite?{phase:firstWrite.phase,stack:firstWrite.stack,valuePrefix:firstWrite.value.slice(0,160)}:null,
    removeOrClear:rec.writes.filter(w=>w.op!=='setItem'&&w.op!=='setItem-REFUSED').length,
    messagesByPhase:Object.fromEntries(rec.phases.filter(p=>p.ui).map(p=>[p.phase,[...new Set((p.ui.messages||[]).map(m=>m.sel+': '+m.text))]])),
    viewsByPhase:Object.fromEntries(rec.phases.filter(p=>p.ui).map(p=>[p.phase,p.ui.visibleViews||null])),
    errorCount:rec.errors.length,
  };
}
async function pool(tasks,n){const out=[];let i=0;await Promise.all(Array.from({length:n},async()=>{while(i<tasks.length){const t=tasks[i++];const r=await t();out.push(r);process.stderr.write(`${r.build} ${r.viewport} ${r.name}: preserved=${r.summary.preservedThroughReload2} writes=${r.summary.keyWriteCount} msg=${JSON.stringify(Object.values(r.summary.messagesByPhase).flat().filter((x,j,a)=>a.indexOf(x)===j))}\n`);}}));return out;}

(async()=>{
  if(process.env.PHOENIX_WO_VALID_RECORD)VALID=fs.readFileSync(process.env.PHOENIX_WO_VALID_RECORD,'utf8');
  else{ // generate through the normal UI on the first build listed
    const [b,d]=builds[0];const r=await run(b,d,'generate-valid',null,'portrait',null,'wo-generate');
    const t=r.phases.find(p=>p.phase==='after-toggle')?.storage?.[WO]?.bytes;if(!t)throw new Error('could not generate a valid record');VALID=t;
  }
  const meta={probe:'qa/wo-save-preservation/probe.cjs',generatedAt:new Date().toISOString(),node:process.version,chrome:CHROME,
    evidence:'author-run (LT self-evidence); not independent review',builds:Object.fromEntries(builds),validRecordSha256:sha(VALID),validRecord:VALID};
  const tasks=[];
  for(const [b,d] of builds)for(const vp of Object.keys(VIEWPORTS)){
    for(const [n,s] of Object.entries(WO_INPUTS()))tasks.push(['wo',b,d,n,s,vp,null]);
    for(const [n,f] of Object.entries(FAULTS))tasks.push(['wo',b,d,'fault:'+n,VALID,vp,f]);
    for(const [n,s] of Object.entries(VELEN_INPUTS))tasks.push(['velen',b,d,n,s,vp,null]);
    tasks.push(['d4',b,d,'d4:localStorage-access-denied',VALID,vp,{access:'always'}]);
  }
  const sel=tasks.filter(t=>!ONLY||t[3].includes(ONLY));
  const results=await pool(sel.map(([flow,b,d,n,s,vp,f])=>()=>run(b,d,n,s,vp,f,flow)),JOBS);
  results.sort((a,b)=>(a.build+a.name+a.viewport).localeCompare(b.build+b.name+b.viewport));
  fs.writeFileSync(OUT,JSON.stringify({meta,results},null,1));console.error('wrote '+OUT+' ('+results.length+' runs)');
})().catch(e=>{console.error(e);process.exit(1);});
