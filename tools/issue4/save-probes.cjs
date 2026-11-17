'use strict';
// Issue #4 evidence (author-supplied, LT): QA6 save protection with the shared walkthrough in real pages (headless Chrome).
// Damaged, unsupported, empty and read-failed saves must stay byte-for-byte unchanged with ZERO writes to that key while
// the user reads, selects, opens warnings, presses Got it, uses dropdowns and navigates; denied storage must still render
// Home, Velen, quest pages and back. Usage: node save-probes.cjs <base-url> <out-dir>
const {launch,sleep}=require('./cdp.cjs'),fs=require('node:fs'),path=require('node:path');
const [base,out]=[process.argv[2]||'http://127.0.0.1:8770/index.html',path.resolve(process.argv[3]||'evidence')];fs.mkdirSync(out,{recursive:true});
const WO='phoenix.whiteorchard.interaction.v1',VEL='phoenix.region.velen.v1',HIST='phoenix.whiteorchard.warningHistory.v1';
const LOGGER=`(()=>{const w=[];window.__writes=w;const P=Storage.prototype,si=P.setItem,ri=P.removeItem,cl=P.clear;P.setItem=function(k,v){w.push(['set',k]);return si.call(this,k,v)};P.removeItem=function(k){w.push(['remove',k]);return ri.call(this,k)};P.clear=function(){w.push(['clear']);return cl.call(this)};
 const f=sessionStorage.getItem('__probe_fault');if(f){const [mode,key]=JSON.parse(f);const gi=P.getItem;if(mode==='read')P.getItem=function(k){if(k===key)throw new DOMException('simulated read failure','SecurityError');return gi.call(this,k)};
  if(mode==='denied')Object.defineProperty(window,'localStorage',{configurable:true,get(){throw new DOMException('The operation is insecure.','SecurityError')}});}})();`;
const CASES=[
 {id:'wo-damaged',key:WO,raw:'{"version":1,"completed":{"q-lilac":tru'},
 {id:'wo-empty',key:WO,raw:''},
 {id:'wo-unsupported',key:WO,raw:'{"version":99,"completed":{}}'},
 {id:'wo-read-failed',key:WO,raw:'{"version":1,"completed":{}}',fault:'read'},
 {id:'velen-damaged',key:VEL,raw:'{"schema":1,"region":"velen","activities":{'},
 {id:'history-damaged',key:HIST,raw:'[{"id":"crystal-skull-cutoff","text":'},
 {id:'history-empty',key:HIST,raw:''},
];
const results=[];
async function journey(b,log){
 const step=async(name,fn)=>{try{await fn();log.push([name,'ok']);}catch(e){log.push([name,'error: '+String(e).slice(0,160)]);}};
 await step('open Beast walkthrough',async()=>{await b.eval(`location.hash='#quest-beast/trophy'`);await sleep(1800);});
 await step('select neighbour',async()=>{await b.eval(`document.querySelector('.view:not([hidden]) .sw-box.selected + .sw-box .sw-check-proxy')?.click()`);await sleep(1200);});
 await step('warning expand + Got it',async()=>{await b.eval(`location.hash='#quest-beast/trophy'`);await sleep(1200);await b.eval(`document.querySelector('.view:not([hidden]) .sw-wolf')?.click()`);await sleep(400);await b.eval(`document.querySelector('.view:not([hidden]) .sw-ack-btn')?.click()`);await sleep(400);});
 await step('dropdowns',async()=>{await b.eval(`document.querySelectorAll('.view:not([hidden]) details.sw-row').forEach(d=>d.open=!d.open)`);await sleep(300);});
 await step('Velen walkthrough + select',async()=>{await b.eval(`location.hash='#velen/quest/nilf/2'`);await sleep(1800);await b.eval(`document.querySelector('.view:not([hidden]) .sw-box.selected + .sw-box')?.click()`);await sleep(1200);});
 await step('back',async()=>{await b.eval('history.back()');await sleep(1500);});
 return b.eval(`({hash:location.hash,sw:!!document.querySelector('.view:not([hidden]) .sw-walkthrough'),feedback:document.querySelector('.view:not([hidden]) .sw-ack-feedback')?.textContent||null,save:[...document.querySelectorAll('[data-save-message]')].map(x=>x.textContent).filter(Boolean)[0]||null})`);
}
(async()=>{
 for(const c of CASES){const b=await launch();await b.send('Page.addScriptToEvaluateOnNewDocument',{source:LOGGER});
  // seed from a static same-origin file, so no app instance is running (its pagehide save would overwrite the seed)
  const blank=new URL('r10-stone.svg',base).href;await b.go(blank,800);await b.eval(`localStorage.clear();localStorage.setItem(${JSON.stringify(c.key)},${JSON.stringify(c.raw)});${c.fault?`sessionStorage.setItem('__probe_fault',JSON.stringify(['${c.fault}',${JSON.stringify(c.key)}]))`:''}`);
  await b.go(base+'#home',3000);const log=[];const end=await journey(b,log);
  const writes=await b.eval('window.__writes');
  // leave the app (pagehide save runs here and is logged by the static page's own logger only if it reaches storage)
  await b.go(blank,1000);await b.eval(`sessionStorage.removeItem('__probe_fault')`);await b.reload(800);const pagehide=await b.eval(`localStorage.getItem(${JSON.stringify(c.key)})`);
  const keyWrites=writes.filter(w=>w[1]===c.key||w[0]==='clear');const stored=pagehide;
  const r={case:c.id,key:c.key,unchanged:stored===c.raw,keyWrites:keyWrites.length,allWrites:[...new Set(writes.map(w=>w.join(':')))],end,log,ok:stored===c.raw&&keyWrites.length===0};results.push(r);console.log(r.case,r.ok?'PASS':'FAIL',JSON.stringify({unchanged:r.unchanged,keyWrites:r.keyWrites,end}));await b.close();}
 // denied storage
 {const b=await launch();await b.send('Page.addScriptToEvaluateOnNewDocument',{source:LOGGER});await b.go(new URL('r10-stone.svg',base).href,800);await b.eval(`sessionStorage.setItem('__probe_fault',JSON.stringify(['denied','*']))`);await b.go(base+'#home',3000);
  const seen={};const look=async(h)=>{await b.eval(`location.hash=${JSON.stringify(h)}`);await sleep(1800);return b.eval(`(()=>{const v=document.querySelector('.view:not([hidden])');return {id:v?.id||null,text:(v?.innerText||'').length,sw:!!v?.querySelector('.sw-walkthrough')}})()`);};
  seen.home=await look('#home');seen.velen=await look('#velen');seen.velenQuest=await look('#velen/quest/nilf/3');seen.beast=await look('#quest-beast/trophy');
  await b.eval(`document.querySelector('.view:not([hidden]) .sw-box.selected + .sw-box')?.click()`);await sleep(1200);seen.selectInMemory=await b.eval(`document.querySelector('.view:not([hidden]) .sw-box.selected')?.dataset.swObjective||null`);
  await b.eval(`location.hash='#quest-beast/trophy'`);await sleep(1200);await b.eval(`document.querySelector('.view:not([hidden]) .sw-wolf')?.click()`);await sleep(300);await b.eval(`document.querySelector('.view:not([hidden]) .sw-ack-btn')?.click()`);await sleep(400);
  seen.ack=await b.eval(`({badge:document.querySelector('.view:not([hidden]) .sw-wolf-badge')?.className,feedback:document.querySelector('.view:not([hidden]) .sw-ack-feedback')?.textContent})`);
  await b.eval('history.back()');await sleep(1500);seen.back=await b.eval('location.hash');
  const errors=b.events.filter(e=>e.method==='Runtime.exceptionThrown').map(e=>e.params.exceptionDetails?.exception?.description?.slice(0,200));
  const ok=seen.home.text>0&&seen.velen.text>0&&seen.velenQuest.text>0&&seen.beast.sw&&/acked/.test(seen.ack.badge||'')&&/unavailable/i.test(seen.ack.feedback||'')&&errors.length===0;
  results.push({case:'denied-storage',seen,errors,ok});console.log('denied-storage',ok?'PASS':'FAIL',JSON.stringify(seen),errors);await b.close();}
 fs.writeFileSync(path.join(out,'save-probes.json'),JSON.stringify({base,when:new Date().toISOString(),label:'author-supplied (LT); headless Chrome; storage faults simulated in page script',results},null,1));
 process.exit(results.every(r=>r.ok)?0:1);
})().catch(e=>{console.error(e);process.exit(2);});
