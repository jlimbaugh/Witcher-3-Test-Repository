'use strict';
// Minimal dependency-free Chrome DevTools Protocol client (Node >= 22: global WebSocket).
const {spawn}=require('node:child_process');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path'),http=require('node:http');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

async function launchChrome(chromePath){
  // Fresh, throwaway profile per run: never touches a real/owner profile.
  const userDataDir=fs.mkdtempSync(path.join(os.tmpdir(),'phx-wo-probe-'));
  const args=['--headless=new','--remote-debugging-port=0','--user-data-dir='+userDataDir,'--no-first-run','--no-default-browser-check',
    '--disable-extensions','--disable-background-networking','--disable-sync','--disable-component-update','--disable-gpu','--mute-audio','about:blank'];
  if(process.getuid&&process.getuid()===0)args.unshift('--no-sandbox');
  const proc=spawn(chromePath,args,{stdio:['ignore','ignore','pipe']});
  const portFile=path.join(userDataDir,'DevToolsActivePort');
  for(let i=0;i<200&&!fs.existsSync(portFile);i++)await sleep(50);
  await sleep(50);
  const [port]=fs.readFileSync(portFile,'utf8').split('\n');
  const list=await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
  const page=list.find(t=>t.type==='page');
  const client=await connect(page.webSocketDebuggerUrl);
  client.close=async()=>{try{client.ws.close();}catch{}proc.kill('SIGKILL');await sleep(150);fs.rmSync(userDataDir,{recursive:true,force:true});};
  return client;
}
function connect(url){
  return new Promise((resolve,reject)=>{
    const ws=new WebSocket(url);let id=0;const pending=new Map(),listeners=[];
    ws.onmessage=ev=>{const msg=JSON.parse(ev.data);if(msg.id&&pending.has(msg.id)){const p=pending.get(msg.id);pending.delete(msg.id);msg.error?p.reject(new Error(msg.error.message)):p.resolve(msg.result);}else if(msg.method)listeners.forEach(l=>l(msg));};
    ws.onerror=reject;
    ws.onopen=()=>resolve({ws,send:(method,params={})=>new Promise((res,rej)=>{const i=++id;pending.set(i,{resolve:res,reject:rej});ws.send(JSON.stringify({id:i,method,params}));}),on:fn=>listeners.push(fn)});
  });
}
// Static server for a dist/ directory. no-store so every load hits the server.
function serve(root){
  const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.woff2':'font/woff2'};
  const server=http.createServer((req,res)=>{
    let p=decodeURIComponent(new URL(req.url,'http://x').pathname);if(p==='/')p='/index.html';
    if(p==='/__seed.html'){res.writeHead(200,{'content-type':'text/html','cache-control':'no-store'});return res.end('<!doctype html><title>seed</title>');}
    const f=path.join(root,path.normalize(p).replace(/^(\.\.[\/\\])+/,''));
    if(!f.startsWith(path.resolve(root))||!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);return res.end();}
    res.writeHead(200,{'content-type':types[path.extname(f)]||'application/octet-stream','cache-control':'no-store'});fs.createReadStream(f).pipe(res);
  });
  return new Promise(r=>server.listen(0,'127.0.0.1',()=>r({server,origin:'http://127.0.0.1:'+server.address().port})));
}
module.exports={launchChrome,serve,sleep};
