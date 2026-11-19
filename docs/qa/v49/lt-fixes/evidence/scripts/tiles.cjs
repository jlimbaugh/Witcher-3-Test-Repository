const H=require('./h.cjs');const fs=require('fs');
(async()=>{const out=await H.matrix(async({p,build,view,base})=>{const r={};
 for(const [ctx,route] of [['console','#velen'],['walkthrough','#velen/quest/nilf/3']]){
  await p.goto(base+'index.html'+route,{waitUntil:'networkidle0'});await H.sleep(1200);await H.toView(p,'.velen-region-tools');await H.sleep(500);
  r[ctx]=await p.evaluate(()=>[...document.querySelectorAll('.velen-region-tools > *')].map(t=>{const c=getComputedStyle(t),b=t.getBoundingClientRect();return {t:t.textContent.trim(),tag:t.tagName,frame:`${c.borderTopWidth} ${c.borderTopStyle} ${c.borderTopColor} / img ${c.borderImageSource==='none'?'none':'iron'} / bg ${c.backgroundColor} / r ${c.borderTopLeftRadius}`,size:[Math.round(b.width),Math.round(b.height)],x:Math.round(b.left),img:t.querySelector('img')?.getAttribute('src')};}));
  const el=await p.$('.velen-region-tools');await el.screenshot({path:H.EV+`tiles-${build}-${ctx}-${view}.jpg`,type:'jpeg',quality:50});
 }
 // functional: Search opens dialog, Route maps routes
 await p.goto(base+'index.html#velen/quest/nilf/3',{waitUntil:'networkidle0'});await H.sleep(1000);await H.toView(p,'.velen-region-tools');await H.sleep(300);
 const s=await p.evaluateHandle(()=>[...document.querySelectorAll('.velen-region-tools > *')].find(c=>c.textContent.trim()==='Search'));view==='desktop'?await s.asElement().click():await s.asElement().tap();await H.sleep(800);
 r.searchOpen=await p.evaluate(()=>!!document.querySelector('dialog[open]'));await p.keyboard.press('Escape');await H.sleep(400);
 const m=await p.evaluateHandle(()=>[...document.querySelectorAll('.velen-region-tools > *')].find(c=>c.textContent.trim()==='Route maps'));view==='desktop'?await m.asElement().click():await m.asElement().tap();await H.sleep(1000);r.routeMaps=await p.evaluate(()=>location.hash);
 const frames=new Set(r.console.map(t=>t.frame));const imgs=r.console.map(t=>t.img);
 console.log(build,view,'frames',frames.size,[...frames].join(' || '),'| dupImg',imgs.length-new Set(imgs).size,'| search',r.searchOpen,'maps',r.routeMaps);
 return r;});
fs.writeFileSync(H.EV+'tiles.json',JSON.stringify(out,null,1));})();
