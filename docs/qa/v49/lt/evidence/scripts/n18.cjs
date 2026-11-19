const H=require('./h.cjs');const fs=require('fs');
(async()=>{const {p,close}=await H.launch({mobile:false,w:1280,h:900});const out={};
for(const n of [1,2,3,4,5,6,7,8]){await p.goto(H.BASE+'#velen/quest/nilf/'+n,{waitUntil:'networkidle2'});await H.sleep(1200);
out[n]=await p.evaluate(()=>{const s=document.querySelector('#velen-screen');const objs=[...s.querySelectorAll('.sw-rail .sw-box')].map(b=>b.dataset.swObjective+': '+b.querySelector('.sw-name')?.textContent.trim());const read=s.querySelector('.sw-reading');return {h:[...s.querySelectorAll('h1,h2')].map(h=>h.textContent.trim()).slice(0,3),objs,reading:read?.innerText.slice(0,1400)};});}
await p.goto(H.BASE+'#velen/hub/nilf',{waitUntil:'networkidle2'});await H.sleep(1200);await p.evaluate(()=>document.querySelectorAll('#velen-screen details').forEach(d=>d.open=true));
out.hub=await p.evaluate(()=>document.querySelector('#velen-screen').innerText.slice(0,5000));
fs.writeFileSync('/tmp/nilf-content.json',JSON.stringify(out,null,1));await close();})();
