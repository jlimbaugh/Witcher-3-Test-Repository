// shared harness: fresh isolated profile per launch
const puppeteer=require('puppeteer-core');const fs=require('fs');const os=require('os');const path=require('path');
exports.BASE=process.env.QA_BASE||'https://phoenix-wo-qa-1c91b66.krwpfbtbn8.chatgpt.site/';
exports.IPHONE_UA='Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1';
exports.launch=async(opts={})=>{const dir=fs.mkdtempSync(path.join('/tmp','qa48-prof-'));
 const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',userDataDir:dir,args:['--no-sandbox','--disable-gpu','--hide-scrollbars',...(opts.args||[])]});
 b._dir=dir;const p=(await b.pages())[0]||await b.newPage();
 if(opts.mobile){await p.setUserAgent(exports.IPHONE_UA);await p.setViewport({width:opts.w||393,height:opts.h||852,deviceScaleFactor:3,isMobile:true,hasTouch:true});}
 else await p.setViewport({width:opts.w||1280,height:opts.h||900});
 p._logs=[];p.on('console',m=>p._logs.push(m.type()+': '+m.text()));p.on('pageerror',e=>p._logs.push('pageerror: '+e.message));
 return {b,p,close:async()=>{await b.close();fs.rmSync(dir,{recursive:true,force:true});}};};
exports.sleep=ms=>new Promise(r=>setTimeout(r,ms));
exports.ls=p=>p.evaluate(()=>Object.fromEntries(Object.keys(localStorage).sort().map(k=>[k,localStorage.getItem(k)])));
