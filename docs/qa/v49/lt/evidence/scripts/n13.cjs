const H=require('./h.cjs');const EV='/workspace/qa49/docs/qa/v49/lt/evidence/';
(async()=>{const {p,close}=await H.launch({mobile:true,w:390,h:844});
for(const r of ['#velen/hub/nilf','#velen/quest/nilf/1','#velen/quest/nilf/4']){await p.goto(H.BASE+r,{waitUntil:'networkidle2'});await H.sleep(1500);
await p.evaluate(()=>document.querySelectorAll('#velen-screen details').forEach(d=>d.open=true));await H.sleep(300);
console.log(r,JSON.stringify(await p.evaluate(()=>[...document.querySelectorAll('#velen-screen [data-velen-nilf] .phoenix-action[data-button-purpose]:not([data-button-purpose=plain])')].map(e=>{const b=getComputedStyle(e,'::before');const R=e.getBoundingClientRect();return e.textContent.trim().slice(0,22)+' ['+e.dataset.buttonPurpose+'] el '+Math.round(R.width)+'x'+Math.round(R.height)+' plate '+b.width+'x'+b.height+(R.width?'':' (hidden)');}))));}
await p.goto(H.BASE+'#velen/hub/nilf',{waitUntil:'networkidle2'});await H.sleep(1200);
await p.evaluate(()=>{document.querySelectorAll('#velen-screen details').forEach(d=>d.open=true);[...document.querySelectorAll('#velen-screen button')].find(b=>b.textContent.trim()==='Previous')?.scrollIntoView({block:'center'});});await H.sleep(500);
await p.screenshot({path:EV+'03-hub-progress-controls-390.jpg',type:'jpeg',quality:60});
await p.goto(H.BASE+'#velen/quest/nilf/1',{waitUntil:'networkidle2'});await H.sleep(1200);
await p.evaluate(()=>[...document.querySelectorAll('#velen-screen a')].find(e=>e.textContent.trim()==='Return to hub').scrollIntoView({block:'center'}));await H.sleep(500);
await p.screenshot({path:EV+'03-wt-return-to-hub-v49-390.jpg',type:'jpeg',quality:60,clip:{x:0,y:300,width:390,height:260}});
await close();
const b=await H.launch({mobile:true,w:390,h:844});await b.p.goto('http://localhost:8748/#velen/quest/nilf/1',{waitUntil:'networkidle2'});await H.sleep(1200);
await b.p.evaluate(()=>[...document.querySelectorAll('#velen-screen a')].find(e=>e.textContent.trim()==='Return to hub').scrollIntoView({block:'center'}));await H.sleep(500);
await b.p.screenshot({path:EV+'03-wt-return-to-hub-v48-390.jpg',type:'jpeg',quality:60,clip:{x:0,y:300,width:390,height:260}});await b.close();})();
