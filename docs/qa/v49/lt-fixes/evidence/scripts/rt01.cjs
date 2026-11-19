const H=require('./h.cjs');const fs=require('fs');
const TILES=['Home','Regions','Field Reference','Progress','Constellation'];
const EXP={'Home':'#home','Regions':'#regions','Field Reference':'#field-reference','Progress':'#progress','Constellation':'#whiteorchard-constellation'};
const views=process.argv[2]==='quick'?H.VIEWS.filter(v=>['390','desktop'].includes(v[0])):H.VIEWS;
(async()=>{const out=await H.matrix(async({p,build,view,base})=>{const res={};
 for(const [ctx,route] of [['console','#velen'],['walkthrough','#velen/quest/nilf/3']]){res[ctx]={};
  await p.goto(base+'index.html'+route,{waitUntil:'networkidle0'});await H.sleep(1200);
  await H.toView(p,'.velen-region-tools');await H.sleep(500);await H.shot(p,`rt01-${build}-${ctx}-${view}`);
  res[ctx].hrefs=await p.evaluate(()=>[...document.querySelectorAll('.velen-region-tools > *')].map(t=>[t.textContent.trim(),t.getAttribute('href')]));
  for(const t of TILES){await p.goto(base+'index.html'+route,{waitUntil:'networkidle0'});await H.sleep(900);await H.toView(p,'.velen-region-tools');await H.sleep(300);
   const el=await p.evaluateHandle(txt=>[...document.querySelectorAll('.velen-region-tools > *')].find(c=>c.textContent.trim()===txt),t);
   const m=view!=='desktop';m?await el.asElement().tap():await el.asElement().click();await H.sleep(1300);
   const at=await p.evaluate(()=>({hash:location.hash,h1:[...document.querySelectorAll('h1')].filter(h=>h.getBoundingClientRect().height>0).map(h=>h.textContent.trim()).slice(0,1)[0]}));
   if(t==='Constellation'&&view==='390')await H.shot(p,`rt01-${build}-${ctx}-dest-constellation-390`);
   if(t==='Home'&&view==='390')await H.shot(p,`rt01-${build}-${ctx}-dest-home-390`);
   await p.goBack({waitUntil:'networkidle0'});await H.sleep(900);const back=await p.evaluate(()=>location.hash);
   res[ctx][t]={hash:at.hash,h1:at.h1,pass:at.hash===EXP[t]||at.hash.startsWith(EXP[t]+'/'),back,backOk:back===route};}
 }
 console.log(build,view,JSON.stringify(Object.fromEntries(['console','walkthrough'].map(c=>[c,TILES.map(t=>t+':'+res[c][t].hash+(res[c][t].pass?'✓':'✗')).join(' ')]))));
 return res;},{views});
fs.writeFileSync(H.EV+'rt01.json',JSON.stringify(out,null,1));})();
