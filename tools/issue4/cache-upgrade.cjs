'use strict';
// Issue #4 evidence (author-supplied, LT): cached upgrade QA6 -> candidate in one browser profile with a host-like
// HTTP cache (max-age=600 for assets; index.html modelled as expired). Then the same with deliberately stale tags,
// which must show the mixed old/new build (the regression the cache-tag test guards against).
// Usage: node cache-upgrade.cjs <qa6-dist> <candidate-dist> <out-dir>
const {launch,sleep}=require('./cdp.cjs'),{spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const [qa6,cand,out]=process.argv.slice(2).map(p=>path.resolve(p));fs.mkdirSync(out,{recursive:true});
const PORT=Number(process.env.PORT||8797),U=`http://127.0.0.1:${PORT}/index.html`;
function serve(root){const p=spawn(process.execPath,[path.join(__dirname,'serve.cjs'),root,String(PORT)],{env:{...process.env,HTML_NO_CACHE:'1'},stdio:'ignore'});return new Promise(r=>setTimeout(()=>r(p),700));}
const PROBE=`({shared:typeof window.createPhoenixSharedWalkthrough,mounted:!!window.PhoenixSharedWalkthrough,ackApi:typeof window.__phoenixMedallion?.acknowledgeRecord,
 sw:!!document.querySelector('.view:not([hidden]) .sw-walkthrough'),count:document.querySelector('.view:not([hidden]) .sw-progress span')?.textContent||null,
 tags:[...document.querySelectorAll('script[src]')].map(s=>s.getAttribute('src')).filter(s=>/^(app|medallion|home-ui|shared-walkthrough)\\.js/.test(s)),
 save:[...document.querySelectorAll('[data-save-message]')].map(x=>x.textContent).filter(Boolean)[0]||null})`;
async function run(candidateRoot,label){const profile=fs.mkdtempSync(path.join(os.tmpdir(),'sw-cache-'));const res={label};
 let srv=await serve(qa6);let b=await launch({profile});await b.go(U+'#quest-beast',3000);await b.go(U+'#velen/quest/nilf/1',2500);
 // record one Velen objective in QA6 so the upgrade must preserve it
 await b.eval(`document.querySelector('#velen [data-velen-check]')?.click()`);await sleep(1500);
 res.qa6=await b.eval(PROBE);res.qa6Record=await b.eval(`localStorage.getItem('phoenix.region.velen.v1')`);
 await b.close(true);srv.kill();await sleep(300);
 srv=await serve(candidateRoot);b=await launch({profile});await b.go(U+'#velen/quest/nilf/1',3500);res.after=await b.eval(PROBE);
 const net=b.events.filter(e=>e.method==='Network.responseReceived').map(e=>({url:e.params.response.url.replace(/^.*\//,''),fromCache:!!(e.params.response.fromDiskCache||e.params.response.fromMemoryCache)})).filter(x=>/^(app|medallion|home-ui|shared-walkthrough)\./.test(x.url));
 res.network=net;res.afterRecord=await b.eval(`localStorage.getItem('phoenix.region.velen.v1')`);await b.go(U+'#quest-beast/trophy',2500);res.afterWO=await b.eval(PROBE);
 await b.close();srv.kill();fs.rmSync(profile,{recursive:true,force:true});return res;}
(async()=>{
 const good=await run(cand,'candidate tags');
 // stale copy: candidate files, but the changed assets keep their old tags
 const stale=fs.mkdtempSync(path.join(os.tmpdir(),'sw-stale-'));fs.cpSync(cand,stale,{recursive:true});
 const idx=path.join(stale,'index.html');fs.writeFileSync(idx,fs.readFileSync(idx,'utf8').replace('app.js?v=shared-walkthrough-v1','app.js?v=save-guard-qa6-v45').replace('medallion.js?v=shared-walkthrough-v1','medallion.js?v=warnings-takeover-v44').replace('home-ui.js?v=shared-walkthrough-v1','home-ui.js?v=paired-slices-1'));
 const bad=await run(stale,'deliberately stale tags');fs.rmSync(stale,{recursive:true,force:true});
 const goodOk=good.qa6.shared==='undefined'&&good.after.shared==='function'&&good.after.mounted&&good.after.ackApi==='function'&&good.after.sw&&good.afterRecord===good.qa6Record&&good.afterWO.sw;
 const staleMixed=bad.after.shared==='function'&&(!bad.after.mounted||bad.after.ackApi!=='function');
 const summary={upgradeOk:goodOk,staleTagsProduceMixedBuild:staleMixed,velenRecordPreserved:good.afterRecord===good.qa6Record};
 fs.writeFileSync(path.join(out,'cache-upgrade.json'),JSON.stringify({when:new Date().toISOString(),label:'author-supplied (LT); headless Chrome disk cache; host modelled as max-age=600 assets, expired index.html',summary,good,bad},null,1));
 console.log(JSON.stringify(summary),'\n',JSON.stringify(good.after),'\n',JSON.stringify(bad.after));process.exit(goodOk&&staleMixed?0:1);
})().catch(e=>{console.error(e);process.exit(2);});
