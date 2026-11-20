const puppeteer=require('puppeteer-core');const fs=require('fs');const path=require('path');
exports.BUILDS={before:'http://localhost:8149/',after:'http://localhost:8150/'};
exports.EV='/workspace/fix49/docs/qa/v49/lt-fixes/evidence/';fs.mkdirSync(exports.EV,{recursive:true});
exports.IPHONE_UA='Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1';
exports.VIEWS=[['375',375,667,true],['390',390,844,true],['430',430,932,true],['852',852,393,true],['932',932,430,true],['desktop',1280,900,false]];
exports.launch=async(opts={})=>{const dir=fs.mkdtempSync(path.join('/tmp','fix49-prof-'));
 const b=await puppeteer.launch({executablePath:'/usr/bin/google-chrome',headless:'new',userDataDir:dir,args:['--no-sandbox','--disable-gpu','--hide-scrollbars']});
 const p=(await b.pages())[0]||await b.newPage();
 if(opts.mobile){await p.setUserAgent(exports.IPHONE_UA);await p.setViewport({width:opts.w,height:opts.h,deviceScaleFactor:2,isMobile:true,hasTouch:true});}
 else await p.setViewport({width:opts.w||1280,height:opts.h||900});
 p._logs=[];p.on('pageerror',e=>p._logs.push('pageerror: '+e.message));
 if(opts.init)await p.evaluateOnNewDocument(opts.init);
 return {b,p,close:async()=>{await b.close();fs.rmSync(dir,{recursive:true,force:true});}};};
exports.sleep=ms=>new Promise(r=>setTimeout(r,ms));
exports.shot=(p,name)=>p.screenshot({path:exports.EV+name+'.jpg',type:'jpeg',quality:45});
exports.reader=p=>p.evaluate(()=>Math.round((document.querySelector('.phoenix-reader')||document.scrollingElement).scrollTop));
exports.toView=(p,sel)=>p.evaluate(s=>{const e=document.querySelector(s);if(e)e.scrollIntoView({block:'center'});return !!e;},sel);
// for each build x view, run fn({p,build,view,base})
exports.matrix=async(fn,{builds=['before','after'],views=exports.VIEWS,init}={})=>{const out={};for(const build of builds){out[build]={};for(const [vn,w,h,m] of views){const {p,close}=await exports.launch({mobile:m,w,h,init});try{out[build][vn]=await fn({p,build,view:vn,base:exports.BUILDS[build]});}catch(e){out[build][vn]={error:String(e)};}out[build][vn]&&typeof out[build][vn]==='object'&&(out[build][vn].errors=p._logs);await close();}}return out;};
