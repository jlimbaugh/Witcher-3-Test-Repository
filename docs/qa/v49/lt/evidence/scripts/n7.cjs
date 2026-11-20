const H=require('./h.cjs');const fs=require('fs');const EV='/workspace/qa49/docs/qa/v49/lt/evidence/';const out={};
const metrics=p=>p.evaluate(()=>{const rd=document.querySelector('.phoenix-reader');const vw=innerWidth;const scr=document.querySelector('#velen-screen');
 const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0;};
 const over=[...scr.querySelectorAll('*')].filter(e=>vis(e)&&e.getBoundingClientRect().right>vw+1).map(e=>(e.className||e.tagName).toString().slice(0,40)).slice(0,8);
 const clipped=[...scr.querySelectorAll('h1,h2,h3,p,li,a,button,span')].filter(e=>vis(e)&&e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible').map(e=>e.textContent.trim().slice(0,40)).slice(0,8);
 const ps=[...scr.querySelectorAll('p,li')].filter(vis);const fs_=ps.map(e=>parseFloat(getComputedStyle(e).fontSize));
 const min=Math.min(...fs_),med=fs_.sort((a,b)=>a-b)[Math.floor(fs_.length/2)];
 const main=scr.querySelector('[data-velen-nilf]')||scr.firstElementChild;const mr=main?.getBoundingClientRect();
 const heads=[...scr.querySelectorAll('h1,h2,h3')].filter(vis).map(h=>h.textContent.trim().slice(0,50)+' @'+getComputedStyle(h).fontSize);
 const leads=[...scr.querySelectorAll('a,button')].filter(e=>vis(e)&&/Bloody Baron|Hunting a Witch/.test(e.textContent)).map(e=>{const r=e.getBoundingClientRect();return e.textContent.trim().replace(/\s+/g,' ').slice(0,60)+' '+Math.round(r.width)+'x'+Math.round(r.height)+' href='+e.getAttribute('href');});
 const smallText=[...scr.querySelectorAll('p,li,a,span,small,label')].filter(e=>vis(e)&&e.childElementCount===0&&e.textContent.trim().length>2&&parseFloat(getComputedStyle(e).fontSize)<14).map(e=>e.textContent.trim().slice(0,30)+' '+getComputedStyle(e).fontSize).slice(0,10);
 return {scrollHeight:rd.scrollHeight,mainBox:mr&&[Math.round(mr.left),Math.round(vw-mr.right),Math.round(mr.width)],nilfAttr:main?.getAttribute('data-velen-nilf'),pCount:ps.length,pFontMin:min,pFontMedian:med,overflowX:over,clipped,heads,leads,smallText};});
const shots=async(p,name,n)=>{const H2=await p.evaluate(()=>innerHeight);const tot=await p.evaluate(()=>document.querySelector('.phoenix-reader').scrollHeight);const k=Math.min(n,Math.ceil(tot/H2));for(let i=0;i<k;i++){await p.evaluate((y)=>document.querySelector('.phoenix-reader').scrollTo(0,y),i*H2);await H.sleep(500);await p.screenshot({path:EV+name+'-'+(i+1)+'.jpg',type:'jpeg',quality:50});}};
(async()=>{for(const [ver,base] of [['v48','http://localhost:8748/'],['v49',H.BASE]]){
 for(const [w,h,lbl,m] of [[390,844,'390',1],[375,667,'375',1],[430,932,'430',1],[852,393,'852',1],[1280,900,'desk',0]]){
  const {p,close}=await H.launch({mobile:!!m,w,h});
  for(const [pg,route] of [['hub','#velen/hub/nilf'],['wt','#velen/quest/nilf/1']]){
   await p.goto(base+route,{waitUntil:'networkidle2'});await H.sleep(1800);
   out[ver+'-'+lbl+'-'+pg]=await metrics(p);
   if(lbl==='390')await shots(p,'02-'+ver+'-'+pg+'-390',8);
  }
  await close();}}
 fs.writeFileSync(EV+'02-nilf-metrics.json',JSON.stringify(out,null,1));
 for(const [k,v] of Object.entries(out))console.log(k,JSON.stringify({sh:v.scrollHeight,box:v.mainBox,attr:v.nilfAttr,pmin:v.pFontMin,pmed:v.pFontMedian,ov:v.overflowX,cl:v.clipped,leads:v.leads,small:v.smallText.length}));
 console.log(JSON.stringify(out['v49-390-hub'].heads),JSON.stringify(out['v48-390-hub'].heads));console.log(JSON.stringify(out['v49-390-hub'].smallText));
})();
