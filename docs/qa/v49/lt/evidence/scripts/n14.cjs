const H=require('./h.cjs');const fs=require('fs');const EV='/workspace/qa49/docs/qa/v49/lt/evidence/';const out={};
const reader=p=>p.evaluate(()=>Math.round(document.querySelector('.phoenix-reader').scrollTop));
const where=p=>p.evaluate(()=>{const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0;};const scr=[...document.querySelectorAll('main > section, [id$=-screen]')].filter(vis).map(s=>s.id).slice(0,3);const dl=[...document.querySelectorAll('dialog')].filter(d=>d.open).map(d=>(d.id||d.className)+': '+d.innerText.trim().slice(0,80).replace(/\s+/g,' '));const ov=[...document.querySelectorAll('[role=dialog],.overlay,.search-overlay,.warning-overlay')].filter(vis).map(e=>(e.id||e.className).toString().slice(0,40));return {hash:location.hash,screens:scr,h:[...document.querySelectorAll('h1,h2')].filter(vis).map(x=>x.textContent.trim()).slice(0,3),dialogs:dl,overlays:ov};});
(async()=>{const {p,close}=await H.launch({mobile:true,w:390,h:844});
for(const [ctx,route] of [['console','#velen'],['walkthrough','#velen/quest/nilf/3']]){
 await p.goto(H.BASE+route,{waitUntil:'networkidle2'});await H.sleep(1800);
 const tiles=await p.evaluate(()=>{const g=document.querySelector('#velen-screen .velen-region-tools');if(!g)return null;g.scrollIntoView({block:'center'});return [...g.children].map(t=>{const r=t.getBoundingClientRect();const img=t.querySelector('img');return {t:t.textContent.trim(),tag:t.tagName,href:t.getAttribute('href'),w:Math.round(r.width),h:Math.round(r.height),x:Math.round(r.left),img:img?.getAttribute('src')||getComputedStyle(t).backgroundImage.slice(0,60)};});});
 out[ctx]={tiles,results:[]};if(!tiles)continue;await H.sleep(400);
 await p.screenshot({path:EV+'04-tools-'+ctx+'-390.jpg',type:'jpeg',quality:55});
 for(const t of tiles){await p.goto(H.BASE+route,{waitUntil:'networkidle2'});await H.sleep(1500);
  await p.evaluate(()=>document.querySelector('#velen-screen .velen-region-tools').scrollIntoView({block:'center'}));await H.sleep(500);
  const y0=await reader(p);const h0=await p.evaluate(()=>location.hash);
  const el=await p.evaluateHandle(txt=>[...document.querySelector('#velen-screen .velen-region-tools').children].find(c=>c.textContent.trim()===txt),t.t);
  await el.asElement().tap();await H.sleep(1600);const at=await where(p);
  let ret;
  if(t.tag==='BUTTON'){ // overlay: dismiss with Escape then via close
    const closeBtn=await p.evaluate(()=>{const d=[...document.querySelectorAll('dialog')].find(d=>d.open);const b=d&&[...d.querySelectorAll('button')].find(b=>/close|dismiss|done|back|×/i.test(b.textContent+b.getAttribute('aria-label')));return b?(b.textContent.trim()||b.getAttribute('aria-label')):null;});
    await p.keyboard.press('Escape');await H.sleep(900);ret={closeBtn,afterEscape:await where(p),readerTop:await reader(p)};
  } else {await p.goBack({waitUntil:'networkidle2'});await H.sleep(1600);ret={afterBack:await where(p),readerTop:await reader(p)};}
  out[ctx].results.push({tile:t.t,from:h0,readerBefore:y0,opened:at,returned:ret});
  console.log(ctx,t.t,'->',JSON.stringify(at).slice(0,200),'| back:',JSON.stringify(ret).slice(0,220),'y0',y0);}
}
// wolf menu
await p.goto(H.BASE+'#velen/quest/nilf/3',{waitUntil:'networkidle2'});await H.sleep(1500);
out.wolf=await p.evaluate(async()=>{const w=[...document.querySelectorAll('button,a')].find(b=>/Navigate/i.test(b.textContent+b.getAttribute('aria-label'))&&b.getBoundingClientRect().width>0);if(!w)return 'no wolf';w.click();await new Promise(r=>setTimeout(r,900));const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0;};const menu=[...document.querySelectorAll('nav,dialog,[role=menu],.wolf-menu,.floating-menu')].filter(vis).filter(m=>m.querySelectorAll('a,button').length>3).pop();return {wolf:w.className+' '+w.getAttribute('aria-label'),items:menu?[...menu.querySelectorAll('a,button')].filter(vis).map(a=>a.textContent.trim().replace(/\s+/g,' ')):null};});
await p.screenshot({path:EV+'04-wolf-menu-390.jpg',type:'jpeg',quality:55});
console.log('wolf',JSON.stringify(out.wolf));
fs.writeFileSync(EV+'04-region-tools.json',JSON.stringify(out,null,1));
console.log(JSON.stringify(out.console.tiles),JSON.stringify(out.walkthrough.tiles));
await close();})();
