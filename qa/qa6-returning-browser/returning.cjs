#!/usr/bin/env node
'use strict';
/*
 PHOENIX QA6 returning-browser check (LT, author-supplied evidence; test harness only, not part of the release).
 Dependency-free (Node >= 22 global WebSocket, any Chrome/Chromium). Never touches an existing browser profile: it creates
 one persistent throwaway profile per run and deletes it at the end.

 Session 1: the profile loads the OLD build (v45 or QA5) from a local server with long-lived caching (HTML: no-cache +
   ETag; every other file: public, max-age=31536000, immutable) and visits Home, the White Orchard tree and Velen, so
   every script and stylesheet is in the HTTP cache. The browser is closed (Browser.close, cache flushed to disk).
 The served files are swapped to the NEW build (QA6) on the same origin.
 Session 2 (same profile): CDP Network events + the server log show, per URL, whether it came from the network or the
   HTTP cache. Then the new behaviour is exercised:
   (a) an unreadable White Orchard record ('not json {') is seeded -> load -> White Orchard hub -> reload: bytes must stay
       identical, zero setItem calls for the key, [data-save-message] state 'unreadable' (QA6 app.js active);
   (b) localStorage access denied (getter throws) -> load: the start page renders with no uncaught error, then
       Velen -> quest -> return works (QA6 velen-r18.js active; QA5 would show a blank page).
 Usage: node returning.cjs --old <old dist> --old-label v45|qa5 --new <qa6 dist> [--viewport portrait|landscape] [--out file]
*/
const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),http=require('node:http'),crypto=require('node:crypto'),{spawn}=require('node:child_process');
const argv=process.argv.slice(2),arg=(n,d)=>{const i=argv.indexOf(n);return i>=0?argv[i+1]:d;};
const OLD=path.resolve(arg('--old')),NEW=path.resolve(arg('--new')),OLD_LABEL=arg('--old-label','old'),VP=arg('--viewport','portrait'),CHROME=process.env.CHROME_PATH||'google-chrome';
const OUT=arg('--out',path.join(__dirname,`returning-${OLD_LABEL}-to-qa6-${VP}.json`));
const VIEWPORTS={portrait:{width:390,height:844},landscape:{width:844,height:390}};
const WO='phoenix.whiteorchard.interaction.v1',UNREADABLE='not json {';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.json':'application/json','.woff2':'font/woff2','.txt':'text/plain'};
let root=OLD;const serverLog=[];let session='s1';
const server=http.createServer((req,res)=>{
 const u=new URL(req.url,'http://x');let p=decodeURIComponent(u.pathname);if(p==='/')p='/index.html';
 if(p==='/__seed.html'){res.writeHead(200,{'content-type':'text/html','cache-control':'no-store'});return res.end('<!doctype html><title>seed</title>');}
 const f=path.join(root,path.normalize(p).replace(/^(\.\.[\/\\])+/,''));
 if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404,{'cache-control':'no-store'});serverLog.push({session,url:req.url,status:404});return res.end();}
 const body=fs.readFileSync(f),etag='"'+crypto.createHash('sha256').update(body).digest('hex').slice(0,32)+'"',ext=path.extname(f);
 const h={'content-type':types[ext]||'application/octet-stream','cache-control':ext==='.html'?'no-cache':'public, max-age=31536000, immutable',etag};
 const status=req.headers['if-none-match']===etag?304:200;serverLog.push({session,root:root===OLD?OLD_LABEL:'qa6',url:req.url,status});
 res.writeHead(status,h);res.end(status===304?undefined:body);
});
function connect(url){return new Promise((resolve,reject)=>{const ws=new WebSocket(url);let id=0;const pending=new Map(),ls=[];
 ws.onmessage=ev=>{const m=JSON.parse(ev.data);if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(new Error(m.error.message)):p.resolve(m.result);}else if(m.method)ls.forEach(l=>l(m));};
 ws.onerror=reject;ws.onopen=()=>resolve({ws,send:(method,params={})=>new Promise((res,rej)=>{const i=++id;pending.set(i,{resolve:res,reject:rej});ws.send(JSON.stringify({id:i,method,params}));}),on:f=>ls.push(f)});});}
async function launch(profile){
 const args=['--headless=new','--remote-debugging-port=0','--user-data-dir='+profile,'--no-first-run','--no-default-browser-check','--disable-extensions','--disable-background-networking','--disable-sync','--disable-component-update','--disable-gpu','--mute-audio','about:blank'];
 if(process.getuid&&process.getuid()===0)args.unshift('--no-sandbox');
 const portFile=path.join(profile,'DevToolsActivePort');try{fs.rmSync(portFile);}catch{}
 const proc=spawn(CHROME,args,{stdio:['ignore','ignore','pipe']});
 for(let i=0;i<200&&!fs.existsSync(portFile);i++)await sleep(50);await sleep(100);
 const [port,browserPath]=fs.readFileSync(portFile,'utf8').split('\n');
 const page=(await (await fetch(`http://127.0.0.1:${port}/json/list`)).json()).find(t=>t.type==='page');
 const c=await connect(page.webSocketDebuggerUrl),b=await connect(`ws://127.0.0.1:${port}${browserPath}`);
 c.close=async()=>{try{await Promise.race([b.send('Browser.close'),sleep(3000)]);}catch{}await new Promise(r=>{if(proc.exitCode!=null)return r();proc.on('exit',r);setTimeout(()=>{proc.kill('SIGKILL');r();},5000);});};
 return c;
}
(async()=>{
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;
 const profile=fs.mkdtempSync(path.join(os.tmpdir(),'phx-qa6-returning-'));
 const results=[],ok=(name,pass,info)=>results.push({name,pass:!!pass,info});
 const report={meta:{harness:'qa/qa6-returning-browser/returning.cjs',evidence:'author-supplied (LT)',generatedAt:new Date().toISOString(),node:process.version,old:OLD_LABEL,oldDir:OLD,newDir:NEW,viewport:VP,cachePolicy:'HTML no-cache+ETag; other files public, max-age=31536000, immutable'},session1:{},session2:{}};
 const setup=async c=>{const net=[],errs=[];
  c.on(m=>{if(m.method==='Network.requestWillBeSent')net.push({id:m.params.requestId,url:m.params.request.url.replace(origin+'/','')});
   if(m.method==='Network.requestServedFromCache'){const n=net.find(x=>x.id===m.params.requestId);if(n)n.memoryOrDiskCache=true;}
   if(m.method==='Network.responseReceived'){const n=net.find(x=>x.id===m.params.requestId);if(n){n.status=m.params.response.status;n.fromDiskCache=!!m.params.response.fromDiskCache;n.fromMemoryCache=!!m.params.response.fromMemoryCache;}}
   if(m.method==='Runtime.exceptionThrown')errs.push((m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text||'').slice(0,300));});
  for(const d of ['Page','Runtime','Network'])await c.send(d+'.enable');
  await c.send('Emulation.setDeviceMetricsOverride',{...VIEWPORTS[VP],deviceScaleFactor:2,mobile:true});
  await c.send('Runtime.addBinding',{name:'__phxWrite'});
  return {net,errs};};
 const ev=async(c,expr)=>{const r=await c.send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;};
 const nav=async(c,url)=>{const done=new Promise(r=>c.on(m=>{if(m.method==='Page.loadEventFired')r();}));await c.send('Page.navigate',{url});await Promise.race([done,sleep(10000)]);await sleep(1800);};
 const reload=async c=>{const done=new Promise(r=>c.on(m=>{if(m.method==='Page.loadEventFired')r();}));await c.send('Page.reload',{});await Promise.race([done,sleep(10000)]);await sleep(1800);};
 const stored=c=>ev(c,`localStorage.getItem(${JSON.stringify(WO)})`);
 const ui=c=>ev(c,`(()=>({hash:location.hash,views:[...document.querySelectorAll('.view')].filter(v=>!v.hidden).map(v=>v.id),save:[...new Set([...document.querySelectorAll('[data-save-message]')].map(e=>(e.dataset.saveState||'')+': '+e.textContent))],velen:document.getElementById('velen-save-status')?.textContent||null,scripts:[...document.scripts].map(s=>s.getAttribute('src')).filter(s=>/^(app|velen-r18)\\.js/.test(s||''))}))()`);
 const writeLog=`(()=>{const s=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k===${JSON.stringify(WO)})window.__phxWrite(JSON.stringify({k,stack:(new Error().stack||'').split('\\n').slice(2,4).join(' | ')}));return s.call(this,k,v);};})();`;
 try{
  // ---- session 1: old build, warm the cache ----
  let c=await launch(profile);let s=await setup(c);
  await nav(c,origin+'/index.html');for(const h of ['#whiteorchard-tree/hub-arrival','#velen','#velen/quest/nilf/1','#home']){await ev(c,`location.hash=${JSON.stringify(h)}`);await sleep(900);}
  report.session1={ui:await ui(c),requests:s.net.length,errors:s.errs,cachedScripts:s.net.filter(n=>/^(app|velen-r18)\.js/.test(n.url)).map(n=>n.url),allUrls:[...new Set(s.net.map(n=>n.url))]};
  await c.close();
  // ---- swap to QA6 on the same origin ----
  root=NEW;session='s2';
  c=await launch(profile);s=await setup(c);const writes=[];c.on(m=>{if(m.method==='Runtime.bindingCalled'&&m.params.name==='__phxWrite')writes.push(JSON.parse(m.params.payload));});
  await nav(c,origin+'/__seed.html');await ev(c,`localStorage.setItem(${JSON.stringify(WO)},${JSON.stringify(UNREADABLE)});true`);
  const wl=(await c.send('Page.addScriptToEvaluateOnNewDocument',{source:writeLog})).identifier;
  const netStart=s.net.length;
  await nav(c,origin+'/index.html');
  const first=s.net.slice(netStart).filter(n=>/\.(js|css|html)(\?|$)/.test(n.url));
  const src=f=>first.filter(n=>n.url.startsWith(f+'?')||n.url===f);
  const fromNet=n=>!n.memoryOrDiskCache&&!n.fromDiskCache&&!n.fromMemoryCache;
  report.session2.firstLoadRequests=first;
  report.session2.serverLogSession2=serverLog.filter(l=>l.session==='s2').map(l=>l.status+' '+l.url);
  const appReq=src('app.js'),velReq=src('velen-r18.js');
  ok('index.html revalidated and the QA6 copy served',serverLog.some(l=>l.session==='s2'&&/^\/(index\.html)?$/.test(l.url)&&l.status===200&&l.root==='qa6'),serverLog.filter(l=>l.session==='s2'&&/index\.html|^\/$/.test(l.url)));
  ok('app.js requested with the QA6 tag and fetched from the network (not the HTTP cache)',appReq.length===1&&appReq[0].url==='app.js?v=save-guard-qa6-v45'&&fromNet(appReq[0])&&appReq[0].status===200&&serverLog.some(l=>l.session==='s2'&&l.url==='/app.js?v=save-guard-qa6-v45'&&l.status===200),appReq);
  ok('velen-r18.js requested with the QA6 tag and fetched from the network (not the HTTP cache)',velReq.length===1&&velReq[0].url==='velen-r18.js?v=save-guard-qa6-v45'&&fromNet(velReq[0])&&velReq[0].status===200&&serverLog.some(l=>l.session==='s2'&&l.url==='/velen-r18.js?v=save-guard-qa6-v45'&&l.status===200),velReq);
  // Split every script/stylesheet request by whether its bytes differ between the old and the new build.
  const same=n=>{const f=n.url.split('?')[0];try{return fs.readFileSync(path.join(OLD,f)).equals(fs.readFileSync(path.join(NEW,f)));}catch{return false;}};
  const assets=first.filter(n=>/\.(js|css)(\?|$)/.test(n.url)),unchanged=assets.filter(same),changed=assets.filter(n=>!same(n));
  report.session2.changedSinceOld=changed.map(n=>({url:n.url,fromNetwork:fromNet(n),status:n.status}));
  ok('long-lived cache is in force: every script/stylesheet unchanged since the old build came from the HTTP cache with no server request',unchanged.length>20&&unchanged.every(n=>!fromNet(n))&&!serverLog.some(l=>l.session==='s2'&&unchanged.some(n=>'/'+n.url===l.url)),{count:unchanged.length,fromNetwork:unchanged.filter(fromNet).map(n=>n.url)});
  ok('every script/stylesheet changed since the old build was fetched from the network under a URL the old build never used',changed.length>=2&&changed.every(n=>fromNet(n)&&n.status===200&&!report.session1.allUrls.includes(n.url)),report.session2.changedSinceOld);
  const a1=await ui(c);await ev(c,`location.hash="#whiteorchard-tree/hub-arrival"`);await sleep(1200);const a2=await ui(c);await reload(c);await ev(c,`location.hash="#whiteorchard-tree/hub-arrival"`);await sleep(1200);const a3=await ui(c);
  const bytes=await stored(c);report.session2.unreadable={afterLoad:a1,hub:a2,afterReload:a3,bytes,woWrites:writes};
  ok('QA6 save guard active: unreadable White Orchard bytes kept through load, hub and reload; 0 writes',bytes===UNREADABLE&&writes.length===0,{bytes,writes});
  ok('QA6 status shown on the White Orchard hub: unreadable / kept unchanged',a2.save.length===1&&a2.save[0].startsWith('unreadable: Your saved White Orchard progress could not be read')&&a3.save[0]===a2.save[0],{hub:a2.save,reload:a3.save});
  ok('scripts in the page are the QA6 URLs',JSON.stringify(a1.scripts)===JSON.stringify(['velen-r18.js?v=save-guard-qa6-v45','app.js?v=save-guard-qa6-v45']),a1.scripts);
  // (b) storage access denied
  await c.send('Page.removeScriptToEvaluateOnNewDocument',{identifier:wl});
  await c.send('Page.addScriptToEvaluateOnNewDocument',{source:`Object.defineProperty(window,'localStorage',{configurable:true,get(){throw new DOMException('harness: storage access denied','SecurityError');}});`});
  const errStart=s.errs.length;await nav(c,origin+'/index.html');const d0=await ui(c);
  const steps=[];for(const h of ['#velen','#velen/hub/nilf','#velen/quest/nilf/1']){await ev(c,`location.hash=${JSON.stringify(h)}`);await sleep(1100);steps.push(await ui(c));}
  await ev(c,'history.back()');await sleep(1100);steps.push(await ui(c));await ev(c,'history.back()');await sleep(1100);steps.push(await ui(c));
  report.session2.denied={start:d0,steps,errors:s.errs.slice(errStart)};
  ok('storage denied: start page renders (QA6 velen-r18.js storage guard active)',d0.views.includes('home'),d0);
  ok('storage denied: Velen -> hub -> quest -> back -> back works',steps.map(x=>x.views.join()).join('|')==='velen|velen|velen|velen|velen'&&steps[3].hash==='#velen/hub/nilf'&&steps[4].hash==='#velen',steps.map(x=>x.hash));
  ok('storage denied: accurate messages (WO storage-unavailable; Velen saving unavailable)',d0.save[0]?.startsWith('storage-unavailable: Saving is unavailable')&&/Saving is unavailable/.test(steps[0].velen||''),{wo:d0.save,velen:steps[0].velen});
  ok('storage denied: no uncaught errors',s.errs.length===errStart,s.errs.slice(errStart));
  ok('no uncaught errors in session 2 before the denial step',s.errs.slice(0,errStart).length===0,s.errs.slice(0,errStart));
  await c.close();
 }catch(e){ok('harness error',false,String(e.stack||e));}
 server.close();fs.rmSync(profile,{recursive:true,force:true});
 report.results=results;fs.writeFileSync(OUT,JSON.stringify(report,null,1));
 for(const r of results)console.log((r.pass?'PASS ':'FAIL ')+r.name+(r.pass?'':' :: '+JSON.stringify(r.info).slice(0,400)));
 console.log(`${OLD_LABEL} -> qa6 (${VP}): ${results.filter(r=>r.pass).length}/${results.length} passed`);
 process.exit(results.every(r=>r.pass)?0:1);
})();
