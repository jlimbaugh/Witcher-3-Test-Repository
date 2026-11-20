const H=require('./h.cjs');const fs=require('fs');const EV='/workspace/qa49/docs/qa/v49/lt/evidence/';const out={};
(async()=>{const {p,close}=await H.launch({mobile:true,w:390,h:844});
await p.goto(H.BASE+'#velen',{waitUntil:'networkidle2'});await H.sleep(1800);
const rail='#velen-screen [data-velen-deck=quests] .deck-jump-rail';
await p.evaluate(r=>document.querySelector(r).scrollIntoView({block:'center'}),rail);await H.sleep(500);
const g=async()=>p.evaluate(r=>{const e=document.querySelector(r);const rr=e.getBoundingClientRect();const rd=document.querySelector('.phoenix-reader,#phoenix-reader');return {sl:Math.round(e.scrollLeft),x:Math.round(rr.left+rr.width/2),y:Math.round(rr.top+rr.height/2),readerTop:Math.round(rd.scrollTop),cur:e.querySelector('[aria-current]:not([aria-hidden])').textContent,sel:document.querySelector('[data-velen-deck=quests] .quest-card.selected')?.getAttribute('aria-label'),actions:[...document.querySelectorAll('#velen-screen .home-selected-actions a')].map(a=>a.getAttribute('href'))};},rail);
const c=await p.target().createCDPSession();
const drag=async(dx,dy,steps=12)=>{const a=await g();await c.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:a.x,y:a.y}]});for(let i=1;i<=steps;i++){await c.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:a.x+dx*i/steps,y:a.y+dy*i/steps}]});await H.sleep(16);}await c.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await H.sleep(2000);return g();};
out.start=await g();
out.verticalDragUp300=await drag(0,-300);
out.verticalDragDown300=await drag(0,300);
await p.evaluate(r=>document.querySelector(r).scrollIntoView({block:'center'}),rail);await H.sleep(500);
out.dragLeft150=await drag(-150,0);
out.dragRight350=await drag(350,0);   // backward across wrap
out.dragRight350b=await drag(350,0);
out.dragLeft700=await drag(-700,0,20);
fs.writeFileSync(EV+'01-strip-touch.json',JSON.stringify(out,null,1));
for(const[k,v]of Object.entries(out))console.log(k,v.cur,v.sel,v.readerTop,v.sl,v.actions.join(' '));
// open hub & walkthrough from a late number (38)
await p.goto(H.BASE+'#velen',{waitUntil:'networkidle2'});await H.sleep(1500);
await p.evaluate(r=>{const e=document.querySelector(r);e.scrollIntoView({block:'center'});e.scrollBy({left:-3*68.5});},rail);await H.sleep(1800);
const s=await g();console.log('late',s.cur,s.sel,s.actions);
for(const h of s.actions){await p.evaluate(h=>location.hash=h,h);await H.sleep(1500);const t=await p.evaluate(()=>({hash:location.hash,h:[...document.querySelectorAll('#velen-screen h1,#velen-screen h2')].map(x=>x.textContent.trim()).filter(Boolean).slice(0,4)}));console.log(h,'->',JSON.stringify(t));await p.goBack({waitUntil:'networkidle2'});await H.sleep(1500);const b=await g();console.log('  back:',b.cur,b.sel,'readerTop',b.readerTop);}
await close();})();
