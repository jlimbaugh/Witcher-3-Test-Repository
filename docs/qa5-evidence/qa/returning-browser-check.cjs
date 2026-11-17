// QA5 returning-browser check (test harness only; not part of the release).
// Session 1: a fresh persistent Chrome profile loads the accepted v45 build (long-lived caching) and a v45 Velen save is
// seeded and rendered. The browser is closed. The served files are swapped to the candidate build on the same origin.
// Session 2: the same profile reopens the site. CDP Network events + server log prove which URLs were requested and
// whether each was served from the HTTP cache; then the Nilfgaardian objective controls, persistence and return
// navigation are exercised.
// Usage: node returning-browser-check.cjs <v45 dir> <candidate dir> <label> <out dir> [policy=immutable] [viewports=phone,landscape]
const {chromium}=require('/tmp/fmt/node_modules/playwright-core');
const fs=require('fs'),path=require('path'),cp=require('child_process'),os=require('os');
const [,,V45,CAND,LABEL,OUT,POLICY='immutable',VPLIST='phone,landscape']=process.argv;
const LEG='phoenix.velen.arrival.v1',CAN='phoenix.region.velen.v1',Q='velen.nilf';
const VPS={phone:{width:390,height:844},landscape:{width:844,height:390}};
const WATCH=['index.html','app.js','velen-r18.js','velen-view.css','velen-nilf-objectives.js','velen-nilf-progress.js','velen-nilf-ui.js'];
// A v45 Velen save in progress: nilf not complete, reading stage 2; pyres complete; mercy open with a choice.
const SEED=JSON.stringify({version:1,selected:'nilf',lastHub:'nilf',complete:{nilf:false,pyres:true,mercy:false},stage:{nilf:2,pyres:3,mercy:1},choices:{},last:{id:'nilf'}});
fs.mkdirSync(OUT,{recursive:true});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const results=[];const ok=(name,cond,info)=>{results.push({name,pass:!!cond,info});};
async function launch(profile,vp){
 const ctx=await chromium.launchPersistentContext(profile,{executablePath:'/usr/bin/google-chrome',headless:true,args:['--no-sandbox'],viewport:vp,deviceScaleFactor:vp.width<500?2:1.5,isMobile:vp.width<500,hasTouch:true});
 // Always a new tab (a relaunched persistent profile may restore the previous tab, which would bypass the CDP probe).
 const page=await ctx.newPage();for(const x of ctx.pages())if(x!==page)await x.close();const errs=[];page.on('pageerror',e=>errs.push(e.message));
 const cdp=await ctx.newCDPSession(page);const net=new Map();
 await cdp.send('Network.enable');
 cdp.on('Network.requestWillBeSent',e=>{net.set(e.requestId,{url:e.request.url,type:e.type,servedFromCache:false,...(net.get(e.requestId)||{})});});
 cdp.on('Network.requestServedFromCache',e=>{const r=net.get(e.requestId)||{};r.servedFromCache=true;net.set(e.requestId,r);});
 cdp.on('Network.responseReceived',e=>{const r=net.get(e.requestId)||{};Object.assign(r,{status:e.response.status,fromDiskCache:!!e.response.fromDiskCache,fromMemoryCache:!!e.response.fromMemoryCache,cacheControl:e.response.headers['cache-control']||e.response.headers['Cache-Control']||null});net.set(e.requestId,r);});
 return {ctx,page,errs,net};
}
const file=u=>{try{const x=new URL(u);return x.pathname.replace(/^\//,'')+x.search;}catch{return u;}};
const watched=net=>[...net.values()].filter(r=>r.url&&WATCH.some(w=>file(r.url).split('?')[0]===w)).map(r=>({url:file(r.url),status:r.status,fromDiskCache:r.fromDiskCache,fromMemoryCache:r.fromMemoryCache,servedFromCache:r.servedFromCache,cacheControl:r.cacheControl}));
const dump=p=>p.evaluate(()=>{const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k);}return o;});
const canon=async p=>JSON.parse(await p.evaluate(k=>localStorage.getItem(k),CAN)||'null');
const progressOpen=p=>p.evaluate(()=>{const d=document.querySelector('#velen .velen-quest-progress');return d?d.open:null;});
async function expandProgress(p){const s=p.locator('#velen .velen-quest-progress > summary').first();if(!await s.count())return false;if(!await progressOpen(p)){await s.scrollIntoViewIfNeeded();await s.click();await sleep(400);}return await progressOpen(p);}
const controls=p=>p.evaluate(Q=>[...document.querySelectorAll(`#velen input[data-velen-check^="${Q}:"]`)].map(i=>({id:i.dataset.velenCheck,checked:i.checked,disabled:i.disabled})),Q);
async function tapNilfCard(p){const b=p.locator('#velen .desk-carousel button',{hasText:'Nilfgaardian'}).first();if(!await b.count())return false;await b.click();await sleep(800);return true;}
async function shot(p,name){await p.evaluate(()=>{const s=document.querySelector('#velen .velen-quest-progress > summary');if(!s)return;const r=s.getBoundingClientRect();(window.PhoenixViewport?.reader||document.scrollingElement).scrollBy(0,r.top-8);});await sleep(300);const f=path.join(OUT,name);await p.screenshot({path:f,type:'jpeg',quality:60});return f;}
(async()=>{
 const report={label:LABEL,policy:POLICY,candidate:CAND,runs:[]};
 let port=8900+Math.floor(Math.random()*900);
 for(const vpName of VPLIST.split(',')){
  const vp=VPS[vpName],ctl=fs.mkdtempSync(path.join(os.tmpdir(),'qa5ctl-')),profile=fs.mkdtempSync(path.join(os.tmpdir(),'qa5prof-'));
  fs.writeFileSync(path.join(ctl,'root'),V45);fs.writeFileSync(path.join(ctl,'policy'),POLICY);
  port++;const srv=cp.spawn('node',[path.join(__dirname,'cache-server.cjs'),String(port),ctl],{stdio:'inherit'});await sleep(500);
  const base=`http://127.0.0.1:${port}/`,run={viewport:vpName,origin:base,profile:'(temp persistent profile)'};const tag=LABEL+'-'+vpName;
  try{
   // ---- Session 1: accepted v45 ----
   let s=await launch(profile,vp);
   await s.page.goto(base+'index.html#home');await sleep(800);
   await s.page.evaluate(([k,v])=>{localStorage.clear();localStorage.setItem(k,v);},[LEG,SEED]);
   await s.page.goto(base+'index.html#velen');await s.page.reload({waitUntil:'load'});await sleep(1500); // full v45 load: Slice 1 import runs on the seeded save
   await s.page.evaluate(()=>location.hash='#velen/hub/nilf');await sleep(1000);
   run.session1={served:'v45',watched:watched(s.net),storage:await dump(s.page),errors:s.errs};
   ok(tag+': session 1 (v45) imported the seeded save into the canonical record (Slice 1)',!!run.session1.storage[CAN]&&run.session1.storage[LEG]!=null,Object.keys(run.session1.storage));
   ok(tag+': session 1 loaded v45 app.js from the network',run.session1.watched.some(r=>r.url==='app.js?v=regional-foundation-v45'&&r.status===200&&!r.fromDiskCache));
   await s.page.goto('about:blank');await sleep(300);await s.ctx.close();
   // ---- swap served build on the same origin ----
   fs.writeFileSync(path.join(ctl,'root'),CAND);const mark=fs.readFileSync(path.join(ctl,'requests.jsonl'),'utf8').split('\n').filter(Boolean).length;
   // ---- Session 2: returning browser, same profile ----
   s=await launch(profile,vp);
   await s.page.goto(base+'index.html#velen',{waitUntil:'load'});await s.page.waitForSelector('#velen .desk-carousel button',{timeout:15000}).catch(()=>{});await sleep(1500);
   const srvLog=fs.readFileSync(path.join(ctl,'requests.jsonl'),'utf8').split('\n').filter(Boolean).slice(mark).map(l=>JSON.parse(l));
   const w=watched(s.net),appReq=w.find(r=>r.url.startsWith('app.js'));
   const htmlTags=fs.readFileSync(path.join(CAND,'index.html'),'utf8').match(/(?:src|href)="(?:app\.js|velen-r18\.js|velen-view\.css|velen-nilf-[a-z]+\.js)\?v=[^"]+"/g).map(x=>x.split('"')[1]);
   const c0=await canon(s.page);const dbg={pages:s.ctx.pages().map(x=>x.url()),netEvents:s.net.size,pageUrl:s.page.url()};console.error('session2 debug',JSON.stringify(dbg));
   run.session2={served:path.basename(CAND),candidateTags:htmlTags,watched:w,serverRequestsForWatched:srvLog.filter(l=>WATCH.some(x=>l.url.replace(/^\//,'').split('?')[0]===x)).map(l=>({url:l.url,status:l.status,cc:l.cc})),
    fromCacheUnchanged:[...s.net.values()].filter(r=>r.url&&(r.fromDiskCache||r.servedFromCache||r.fromMemoryCache)).map(r=>file(r.url)).filter(u=>/\.(js|css)/.test(u)),appJs:appReq,handoverRan:c0?.owners?.[Q]===CAN,canonicalOwners:c0?.owners||null,errors:s.errs};
   ok(tag+': cache control: unchanged v45 scripts were served from the HTTP cache in session 2 (proves the cache is live)',POLICY!=='immutable'||run.session2.fromCacheUnchanged.some(u=>u.startsWith('progression-engine.js')),run.session2.fromCacheUnchanged.length);
   ok(tag+': returning browser requested the candidate app.js URL over the network (not from cache)',appReq&&!appReq.fromDiskCache&&!appReq.fromMemoryCache&&!appReq.servedFromCache&&srvLog.some(l=>l.url.startsWith('/app.js')),appReq);
   for(const u of htmlTags){const r=w.find(x=>x.url===u);ok(tag+': '+u+' loaded from the server (new version)',r&&!r.fromDiskCache&&!r.servedFromCache&&r.status===200,r);}
   ok(tag+': Slice 2 handover ran on first load (new app.js executed)',run.session2.handoverRan,c0?.owners);
   // Navigate to the Nilfgaardian hub with a real card tap from the Velen console.
   const tapped=await tapNilfCard(s.page);run.session2.hash=await s.page.evaluate(()=>location.hash);
   run.session2.progressInitiallyOpen=await progressOpen(s.page);
   const expanded=await expandProgress(s.page);const ctl0=await controls(s.page);
   run.session2.controlsAfterExpand=ctl0;
   ok(tag+': card tap opens the nilf hub',tapped&&run.session2.hash==='#velen/hub/nilf',run.session2.hash);
   ok(tag+': progress section starts collapsed and expands from its summary',run.session2.progressInitiallyOpen===false&&expanded===true,{initial:run.session2.progressInitiallyOpen,expanded});
   ok(tag+': Nilfgaardian objective controls reachable after expanding',ctl0.length>=8,ctl0.length);
   if(ctl0.length){await shot(s.page,`${tag}-1-controls-expanded.jpg`);
    const t=s.page.locator(`#velen input[data-velen-check="${Q}:travel"]`);await t.scrollIntoViewIfNeeded();await t.click({force:true});await sleep(500);
    const dlg=s.page.locator('dialog.velen-progress-dialog [data-velen-confirm]');if(await dlg.isVisible().catch(()=>false)){await dlg.click();await sleep(600);}
    await expandProgress(s.page);
    const c1=await canon(s.page),ctl1=await controls(s.page);run.session2.afterMark={objectives:c1?.activities?.[Q]?.objectives,controls:ctl1};
    ok(tag+': marking Travel records it in the canonical record and the control shows it',c1?.activities?.[Q]?.objectives?.[Q+':travel']==='done'&&ctl1.find(x=>x.id===Q+':travel')?.checked===true,run.session2.afterMark);
    await shot(s.page,`${tag}-2-travel-marked.jpg`);
    // Persistence across reload.
    await sleep(3500);await s.page.reload();await sleep(1800);
    const hashR=await s.page.evaluate(()=>location.hash);await expandProgress(s.page);const ctl2=await controls(s.page),c2=await canon(s.page);
    run.session2.afterReload={hash:hashR,controls:ctl2,objectives:c2?.activities?.[Q]?.objectives};
    ok(tag+': Travel persists across reload',hashR==='#velen/hub/nilf'&&ctl2.find(x=>x.id===Q+':travel')?.checked===true&&c2?.activities?.[Q]?.objectives?.[Q+':travel']==='done',run.session2.afterReload);
    // Return navigation: hub -> Velen console (Return link) -> card tap back to the hub; then history back/forward.
    const ret=s.page.locator('#velen a[href="#velen"]').first();let via='hash';
    if(await ret.count()&&await ret.isVisible().catch(()=>false)){await ret.click();via='return link';}else await s.page.evaluate(()=>location.hash='#velen');
    await sleep(900);const hashC=await s.page.evaluate(()=>location.hash);
    const consoleShown=await s.page.evaluate(()=>!!document.querySelector('#velen .desk-carousel'));
    await tapNilfCard(s.page);const hashH=await s.page.evaluate(()=>location.hash);await expandProgress(s.page);const ctl3=await controls(s.page);
    await s.page.goBack();await sleep(900);const hashB=await s.page.evaluate(()=>location.hash);
    await s.page.goForward();await sleep(900);const hashF=await s.page.evaluate(()=>location.hash);await expandProgress(s.page);const ctl4=await controls(s.page);
    run.session2.returnNav={via,consoleHash:hashC,consoleShown,hubHash:hashH,back:hashB,forward:hashF,travelAfterReturn:ctl3.find(x=>x.id===Q+':travel')?.checked,travelAfterForward:ctl4.find(x=>x.id===Q+':travel')?.checked};
    ok(tag+': return to the Velen console and back to the hub keeps the recorded objective',hashC==='#velen'&&consoleShown&&hashH==='#velen/hub/nilf'&&ctl3.find(x=>x.id===Q+':travel')?.checked===true,run.session2.returnNav);
    ok(tag+': history back/forward between console and hub keeps the recorded objective',hashB==='#velen'&&hashF==='#velen/hub/nilf'&&ctl4.find(x=>x.id===Q+':travel')?.checked===true,run.session2.returnNav);
    const st=await dump(s.page);run.session2.legacyUnchangedFromSession1=st[LEG]===run.session1.storage[LEG];
   }else{await s.page.screenshot({path:path.join(OUT,`${tag}-1-no-controls.jpg`),type:'jpeg',quality:60});
    // Direct route to the hub as well: show what the stale build renders there.
    await s.page.evaluate(()=>location.hash='#velen/hub/nilf');await sleep(1200);const ex=await expandProgress(s.page);
    run.session2.directHub={hash:await s.page.evaluate(()=>location.hash),progressSection:ex,controls:(await controls(s.page)).length,canonicalOwnsNilf:(await canon(s.page))?.owners?.[Q]===CAN};
    ok(tag+': direct #velen/hub/nilf also shows Nilfgaardian objective controls',run.session2.directHub.controls>=8,run.session2.directHub);
    await s.page.screenshot({path:path.join(OUT,`${tag}-2-direct-hub-no-controls.jpg`),type:'jpeg',quality:60});run.session2.nilfView=await s.page.evaluate(()=>({hub:!!document.querySelector('#velen .velen-nilf-hub'),text:(document.querySelector('#velen')?.innerText||'').slice(0,400)}));}
   ok(tag+': no page errors in session 2',s.errs.length===0,s.errs);
   await s.ctx.close();
  }catch(e){run.error=String(e.stack||e);ok(tag+': harness error',false,run.error);}
  srv.kill();report.runs.push(run);
 }
 report.results=results;
 fs.writeFileSync(path.join(OUT,LABEL+'-report.json'),JSON.stringify(report,null,1));
 for(const r of results)console.log((r.pass?'PASS ':'FAIL ')+r.name+(r.pass?'':'  :: '+String(JSON.stringify(r.info)).slice(0,300)));
 console.log(`${LABEL}: ${results.filter(r=>r.pass).length}/${results.length} passed`);
})();
