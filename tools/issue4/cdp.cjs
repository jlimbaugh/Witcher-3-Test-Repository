'use strict';
// Issue #4 evidence harness (author-supplied). Drives headless Chrome over CDP with a persistent profile per session,
// so reloads and storage behave like a returning browser. Never touches a real user's browser or the live site.
const {spawn}=require('node:child_process'),fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function launch({width=390,height=844,profile=null,scale=1}={}){
 const dir=profile||fs.mkdtempSync(path.join(os.tmpdir(),'sw-cdp-'));const port=9400+Math.floor(Math.random()*500);
 const chrome=spawn('google-chrome',['--headless=new','--no-sandbox','--disable-gpu','--hide-scrollbars','--no-first-run','--user-data-dir='+dir,'--remote-debugging-port='+port,'about:blank'],{stdio:'ignore'});
 let list;for(let i=0;i<60;i++){try{list=await (await fetch(`http://127.0.0.1:${port}/json`)).json();if(list.some(t=>t.type==='page'))break;}catch{}await sleep(200);}
 const target=list.find(t=>t.type==='page');const ws=new WebSocket(target.webSocketDebuggerUrl);let id=0;const pend=new Map(),events=[];
 ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pend.has(m.id)){pend.get(m.id)(m);pend.delete(m.id);}else if(m.method)events.push(m);};
 await new Promise(r=>ws.onopen=r);
 const send=(method,params={})=>new Promise(r=>{const i=++id;pend.set(i,r);ws.send(JSON.stringify({id:i,method,params}));});
 const api={dir,events,send,
  async size(w,h,s=scale){await send('Emulation.setDeviceMetricsOverride',{width:w,height:h,deviceScaleFactor:s,mobile:true,screenOrientation:w>h?{type:'landscapePrimary',angle:90}:{type:'portraitPrimary',angle:0}});},
  async go(url,wait=2500){await send('Page.navigate',{url});await sleep(wait);},
  async reload(wait=2500){await send('Page.reload',{ignoreCache:false});await sleep(wait);},
  async eval(expr){const r=await send('Runtime.evaluate',{expression:expr,awaitPromise:true,returnByValue:true});if(r.result?.exceptionDetails)throw Error('eval: '+JSON.stringify(r.result.exceptionDetails).slice(0,600));return r.result?.result?.value;},
  async shot(file){const s=await send('Page.captureScreenshot',{format:'png'});fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,Buffer.from(s.result.data,'base64'));return file;},
  async tap(x,y){for(const type of ['touchStart','touchEnd'])await send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'?[]:[{x,y}]});await sleep(150);},
  async swipe(x1,y,x2,steps=8){await send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x1,y}]});for(let i=1;i<=steps;i++){await send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:x1+(x2-x1)*i/steps,y}]});await sleep(16);}await send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await sleep(900);},
  async key(key,code=key,keyCode=0){for(const type of ['keyDown','keyUp'])await send('Input.dispatchKeyEvent',{type,key,code,windowsVirtualKeyCode:keyCode});await sleep(120);},
  sleep,
  async close(keep=false){try{ws.close();}catch{}chrome.kill('SIGKILL');await sleep(300);if(!keep&&!profile)fs.rmSync(dir,{recursive:true,force:true});}
 };
 await send('Page.enable');await send('Runtime.enable');await send('Network.enable');
 await api.size(width,height);await send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:5});
 return api;
}
module.exports={launch,sleep};
