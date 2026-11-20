const H=require('./h.cjs');
(async()=>{for(const base of ['http://localhost:8748/',H.BASE]){const {p,close}=await H.launch({mobile:true,w:390,h:844});
await p.goto(base+'#velen',{waitUntil:'networkidle2'});await H.sleep(1800);
const g=()=>p.evaluate(()=>({top:Math.round(document.querySelector('.phoenix-reader,#phoenix-reader').scrollTop),sel:document.querySelector('#velen-screen .quest-card.selected')?.getAttribute('aria-label'),acts:[...document.querySelectorAll('#velen-screen .home-selected-actions a, #velen-screen .selected-panel a')].map(a=>a.getAttribute('href'))}));
await p.evaluate(()=>document.querySelector('#velen-screen .quest-card.right').click());await H.sleep(1500);
await p.evaluate(()=>document.querySelector('#velen-screen .selected-panel, #velen-screen .quest-card.selected').scrollIntoView({block:'center'}));await H.sleep(600);
const a=await g();console.log(base,'before',a.top,a.sel,a.acts.slice(0,3));
await p.evaluate(h=>location.hash=h,a.acts[0]);await H.sleep(1500);await p.goBack({waitUntil:'networkidle2'});await H.sleep(1800);
const b=await g();console.log('  after back',b.top,b.sel);await close();}})();
