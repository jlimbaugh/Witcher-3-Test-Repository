const H=require('./h.cjs');const fs=require('fs');const EV='/workspace/qa49/docs/qa/v49/lt/evidence/';const out={wolf:[],v48:{}};
const openWolf=p=>p.evaluate(async()=>{const w=document.querySelector('.medallion-core')||[...document.querySelectorAll('button')].find(b=>/guide navigation/i.test(b.getAttribute('aria-label')||''));w.click();await new Promise(r=>setTimeout(r,900));return w.getAttribute('aria-label');});
(async()=>{const {p,close}=await H.launch({mobile:true,w:390,h:844});
for(const label of ['Home','Regions','Field Reference','Progress','Constellation']){await p.goto(H.BASE+'#velen/quest/nilf/3',{waitUntil:'networkidle2'});await H.sleep(1500);await openWolf(p);
 const r=await p.evaluate(async l=>{const a=[...document.querySelectorAll('a,button')].find(e=>e.textContent.trim().replace('◆','')===l&&e.getBoundingClientRect().width>0&&!e.closest('#velen-screen'));if(!a)return 'not found';const href=a.getAttribute('href');a.click();await new Promise(r=>setTimeout(r,1500));return {href,hash:location.hash,h:[...document.querySelectorAll('h1,h2')].filter(e=>e.getBoundingClientRect().width>0).map(e=>e.textContent.trim()).slice(0,2)};},label);
 out.wolf.push({label,...r});console.log('wolf',label,JSON.stringify(r));}
// Warnings overlay touch dismissal
await p.goto(H.BASE+'#velen/quest/nilf/3',{waitUntil:'networkidle2'});await H.sleep(1500);
await p.evaluate(()=>document.querySelector('#velen-screen .velen-region-tools').scrollIntoView({block:'center'}));await H.sleep(400);
const wbtn=await p.evaluateHandle(()=>[...document.querySelector('#velen-screen .velen-region-tools').children].find(c=>c.textContent.trim()==='Warnings'));await wbtn.asElement().tap();await H.sleep(1500);
out.warnOpen=await p.evaluate(()=>{const m=document.querySelector('.phoenix-medallion');const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0;};return {cls:m?.className,controls:[...document.querySelectorAll('.phoenix-medallion button, .phoenix-medallion a')].filter(vis).map(b=>(b.textContent.trim()||b.getAttribute('aria-label')).slice(0,40))};});
await p.screenshot({path:EV+'04-warnings-open-390.jpg',type:'jpeg',quality:55});
const core=await p.$('.medallion-core');await core.tap();await H.sleep(1000);
out.warnAfterCoreTap=await p.evaluate(()=>({cls:document.querySelector('.phoenix-medallion')?.className,hash:location.hash,top:Math.round(document.querySelector('.phoenix-reader').scrollTop)}));
console.log(JSON.stringify({warnOpen:out.warnOpen,after:out.warnAfterCoreTap}));
await close();
// v48 console tools?
const b=await H.launch({mobile:true,w:390,h:844});for(const r of ['#velen','#velen/quest/nilf/3']){await b.p.goto('http://localhost:8748/'+r,{waitUntil:'networkidle2'});await H.sleep(1500);out.v48[r]=await b.p.evaluate(()=>{const g=document.querySelector('#velen-screen .velen-region-tools, #velen-screen .console-tiles');return g?[...g.children].map(c=>c.textContent.trim()+'→'+c.getAttribute('href')):null;});}
console.log('v48',JSON.stringify(out.v48));await b.close();
fs.writeFileSync(EV+'04-wolf-and-v48.json',JSON.stringify(out,null,1));})();
