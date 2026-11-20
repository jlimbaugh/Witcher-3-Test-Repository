const H=require('./h.cjs');
(async()=>{const {p,close}=await H.launch({mobile:false,w:1280,h:900});
for(const r of ['#velen/lead/baron','#velen/lead/witch','#velen/quest/baron/1','#velen/quest/witch/1','#velen/hub/pyres','#velen/quest/nilf/5']){await p.goto(H.BASE+r,{waitUntil:'networkidle2'});await H.sleep(1300);console.log('=====',r,await p.evaluate(()=>location.hash));console.log(await p.evaluate(()=>document.querySelector('#velen-screen').innerText.slice(0,1500).replace(/\n+/g,' | ')));}
// search for 'pilot' text anywhere displayed on velen console & leads
await p.goto(H.BASE+'#velen',{waitUntil:'networkidle2'});await H.sleep(1200);console.log('pilot on console:',await p.evaluate(()=>(document.body.innerText.match(/[^.\n]*pilot[^.\n]*/gi)||[]).slice(0,5)));
await close();})();
