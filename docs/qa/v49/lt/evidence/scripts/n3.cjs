const H=require('./h.cjs');
(async()=>{const {p,close}=await H.launch({mobile:true,w:390,h:844});
const fails=[];p.on('response',r=>{if(r.status()>=400)fails.push(r.status()+' '+r.url());});
await p.goto(H.BASE+'#velen',{waitUntil:'networkidle2'});await H.sleep(1800);
console.log('404s',fails);
const sc=await p.evaluate(()=>{const els=[document.scrollingElement,...document.querySelectorAll('*')].filter(e=>e&&e.scrollHeight>e.clientHeight+5&&/(auto|scroll)/.test(getComputedStyle(e).overflowY));return els.slice(0,6).map(e=>(e.id||e.className||e.tagName)+' '+e.scrollTop+'/'+e.scrollHeight+'/'+e.clientHeight);});
console.log('scrollers',sc);
const rail='#velen-screen [data-velen-deck=quests] .deck-jump-rail';
await p.evaluate(r=>document.querySelector(r).scrollIntoView({block:'center'}),rail);await H.sleep(500);
const g=async()=>p.evaluate(r=>{const e=document.querySelector(r);const rr=e.getBoundingClientRect();return {sl:Math.round(e.scrollLeft),top:Math.round(rr.top),x:Math.round(rr.left+rr.width/2),y:Math.round(rr.top+rr.height/2),winY:scrollY,se:document.scrollingElement.scrollTop,cur:e.querySelector('[aria-current]:not([aria-hidden])').textContent};},rail);
let a=await g();console.log('before',a);
const c=await p.target().createCDPSession();
await c.send('Input.synthesizeScrollGesture',{x:a.x,y:a.y,xDistance:-210,yDistance:0,gestureSourceType:'touch',speed:600,preventFling:true});
console.log('during',await g());await H.sleep(2000);console.log('after h-swipe',await g());
a=await g();
await c.send('Input.synthesizeScrollGesture',{x:a.x,y:a.y,xDistance:0,yDistance:-300,gestureSourceType:'touch',speed:600});await H.sleep(1500);
console.log('after v-swipe over strip',await g());
// manual touch events
a=await g();
await c.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:a.x,y:a.y}]});
for(let i=1;i<=10;i++){await c.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:a.x-i*15,y:a.y}]});await H.sleep(16);}
await c.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await H.sleep(2000);
console.log('after manual touch drag -150',await g());
await close();})();
