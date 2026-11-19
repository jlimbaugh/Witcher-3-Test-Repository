const H=require('./h.cjs');const fs=require('fs');const EV='/workspace/qa49/docs/qa/v49/lt/evidence/';const out={};
const scan=p=>p.evaluate(()=>{const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0;};const scr=document.querySelector('#velen-screen')||document.body;
 const ext=[...scr.querySelectorAll('a[href^="http"]')].filter(vis).map(a=>a.textContent.trim().slice(0,30)+'→'+a.href.slice(0,60));
 const src=[...scr.querySelectorAll('a')].filter(a=>/source|reference/i.test(a.textContent)&&vis(a)).map(a=>a.textContent.trim().slice(0,40)+'→'+a.getAttribute('href'));
 const save=(scr.innerText.match(/[^.\n]*(saves in this browser|browser save|save[sd]? (in|to) (this|your) browser)[^.\n]*/gi)||[]);
 return {ext,src,save};});
(async()=>{const {p,close}=await H.launch({mobile:true,w:390,h:844});
const routes=['#velen/hub/nilf',...[1,2,3,4,5,6,7,8].map(n=>'#velen/quest/nilf/'+n),'#velen/hub/pyres','#velen/quest/pyres/1','#velen/quest/baron/1','#velen/lead/baron','#velen/quest/witch/1','#velen/lead/witch','#velen/quest/blood-ties/1'];
for(const r of routes){await p.goto(H.BASE+r,{waitUntil:'networkidle2'});await H.sleep(1300);await p.evaluate(()=>document.querySelectorAll('#velen-screen details').forEach(d=>d.open=true));await H.sleep(200);out[r]=await scan(p);console.log(r,JSON.stringify(out[r]));}
// WO pages
for(const r of ['#quest-lilac','#quest-lilac/1','#whiteorchard-tree/hub-arrival/q-lilac','#quest-death/1']){await p.goto(H.BASE+r,{waitUntil:'networkidle2'});await H.sleep(1300);const s=await p.evaluate(()=>{const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0;};return {h:[...document.querySelectorAll('h1,h2')].filter(vis).map(h=>h.textContent.trim()).slice(0,2),ext:[...document.querySelectorAll('main a[href^="http"], section a[href^="http"]')].filter(vis).filter(a=>!a.closest('footer')).map(a=>a.textContent.trim().slice(0,30)+'→'+a.href.slice(0,70)),src:[...document.querySelectorAll('a')].filter(a=>vis(a)&&/^sources?$|objective reference/i.test(a.textContent.trim())).map(a=>a.textContent.trim()+'→'+a.getAttribute('href'))};});out[r]=s;console.log(r,JSON.stringify(s));}
// landing on sources
for(const [from,sel] of [['#velen/hub/nilf','.nilf-hub-sources'],['#velen/quest/nilf/3','.sw-source-link'],['#velen/quest/baron/1','.sw-source-link']]){await p.goto(H.BASE+from,{waitUntil:'networkidle2'});await H.sleep(1300);
 const href=await p.evaluate(s=>document.querySelector('#velen-screen '+s)?.getAttribute('href'),sel);if(!href){out['land '+from]='no link';console.log(from,'no sources link');continue;}
 const a=await p.$('#velen-screen '+sel);await a.evaluate(e=>e.scrollIntoView({block:'center'}));await H.sleep(300);await a.tap();await H.sleep(2500);
 const land=await p.evaluate(()=>{const t=document.querySelector(':target');const r=t?.getBoundingClientRect();return {url:location.pathname+location.hash,target:t?.id,heading:t?.querySelector('h2,h3')?.textContent,targetTop:r&&Math.round(r.top),links:t?[...t.querySelectorAll('a')].map(a=>a.href.slice(0,80)):null};});
 out['land '+from]={href,...land};console.log('LAND',from,href,JSON.stringify(land));
 if(from.includes('hub'))await p.screenshot({path:EV+'05-sources-landing-nilf-390.jpg',type:'jpeg',quality:55});}
fs.writeFileSync(EV+'05-sources.json',JSON.stringify(out,null,1));await close();})();
