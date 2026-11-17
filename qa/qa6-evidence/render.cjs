#!/usr/bin/env node
'use strict';
// QA6 small renders (LT, author-supplied). Throwaway headless Chrome profile per shot; JPEG q50 at 1x.
// Usage: CHROME_PATH=... node qa/qa6-evidence/render.cjs <label>=<dist dir> ... ; writes qa/qa6-evidence/renders/*.jpg
const fs=require('node:fs'),path=require('node:path');const {launchChrome,serve,sleep}=require('../wo-save-preservation/cdp.cjs');
const WO='phoenix.whiteorchard.interaction.v1',OUT=path.join(__dirname,'renders');
const builds=process.argv.slice(2).map(x=>x.split('='));
const SHOTS=[
 ['wo-unreadable-hub',{seed:'not json {'},'#whiteorchard-tree/hub-arrival'],
 ['storage-denied-home',{deny:true},''],
 ['storage-denied-velen-hub',{deny:true},'#velen/hub/nilf'],
];
(async()=>{for(const [label,dir] of builds)for(const vp of [['portrait',390,844],['landscape',844,390]])for(const [name,opt,hash] of SHOTS){
 const {server,origin}=await serve(dir),c=await launchChrome(process.env.CHROME_PATH||'google-chrome');
 try{await c.send('Page.enable');await c.send('Runtime.enable');await c.send('Emulation.setDeviceMetricsOverride',{width:vp[1],height:vp[2],deviceScaleFactor:1,mobile:true});
  const go=async u=>{const d=new Promise(r=>c.on(m=>{if(m.method==='Page.loadEventFired')r();}));await c.send('Page.navigate',{url:u});await Promise.race([d,sleep(8000)]);await sleep(1500);};
  await go(origin+'/__seed.html');await c.send('Runtime.evaluate',{expression:`localStorage.clear();${opt.seed?`localStorage.setItem(${JSON.stringify(WO)},${JSON.stringify(opt.seed)})`:''}`});
  if(opt.deny)await c.send('Page.addScriptToEvaluateOnNewDocument',{source:`Object.defineProperty(window,'localStorage',{configurable:true,get(){throw new DOMException('render: storage access denied','SecurityError');}});`});
  await go(origin+'/index.html');if(hash){await c.send('Runtime.evaluate',{expression:`location.hash=${JSON.stringify(hash)}`});await sleep(1500);}
  if(name==='wo-unreadable-hub')await c.send('Runtime.evaluate',{expression:`document.querySelector('[data-save-message]:not([hidden])')?.scrollIntoView({block:'center'})`}).then(()=>sleep(500));
  const {data}=await c.send('Page.captureScreenshot',{format:'jpeg',quality:50});
  const f=path.join(OUT,`${label}-${name}-${vp[0]}.jpg`);fs.writeFileSync(f,Buffer.from(data,'base64'));console.log(f,fs.statSync(f).size);
 }finally{await c.close();server.close();}
}})().catch(e=>{console.error(e);process.exit(1);});
