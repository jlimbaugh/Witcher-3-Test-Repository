// progress test helpers
const H=require('./h.cjs'),L=require('./lib.cjs');
exports.seed=async(p,obj)=>{await p.goto(H.BASE+'favicon.ico');await p.evaluate(o=>{localStorage.clear();for(const[k,v]of Object.entries(o))localStorage.setItem(k,v);},obj);};
exports.go=async(p,h)=>{await p.goto(H.BASE+h,{waitUntil:'networkidle2'});await H.sleep(1500);};
exports.check=async(p,attr,id,tap=false)=>{const r=await p.evaluate((a,i)=>{const c=[...document.querySelectorAll(`input[${a}="${i}"]`)].find(c=>c.closest('.sw-box'))||document.querySelector(`input[${a}="${i}"]`);if(!c)return null;const box=c.closest('.sw-box');c.scrollIntoView({block:'center',inline:'center'});return {box:!!box,obj:box?.dataset.swObjective||null};},attr,id);
 if(!r)throw Error('no checkbox '+id);await H.sleep(600);
 const boxSel=r.obj?`.sw-box[data-sw-objective="${r.obj}"]`:null;
 if(boxSel){const proxy=await p.$(boxSel+' button.sw-check-proxy');if(proxy){tap?await proxy.tap():await proxy.click();await H.sleep(700);}}
 const q=boxSel?boxSel+` input[${attr}="${id}"]`:`input[${attr}="${id}"]`;
 await p.evaluate(s=>document.querySelector(s)?.scrollIntoView({block:'center',inline:'center'}),q);await H.sleep(500);
 const cb=await p.$(q);if(!cb)throw Error('no live checkbox '+id);
 try{tap?await cb.tap():await cb.click();}catch(e){exports.domClicks=(exports.domClicks||0)+1;await p.evaluate(s=>document.querySelector(s).click(),q);}await H.sleep(900);};
exports.checked=(p,attr,id)=>p.evaluate((a,i)=>[...document.querySelectorAll(`input[${a}="${i}"]`)].map(c=>c.checked),attr,id);
exports.selectChoice=async(p,value)=>p.evaluate(v=>{const d=[...document.querySelectorAll('dialog')].find(d=>d.open);const s=d&&d.querySelector('select');if(s){s.value=v;s.dispatchEvent(new Event('change',{bubbles:true}));s.dispatchEvent(new Event('input',{bubbles:true}));return 'select '+[...s.options].map(o=>o.value).join(',');}
 const r=d&&d.querySelector(`input[type=radio][value="${v}"]`);if(r){r.click();return 'radio';}return 'none';},value);
exports.visibleText=(p,re)=>p.evaluate(src=>{const re=new RegExp(src,'i');return [...document.querySelectorAll('body *')].filter(e=>e.children.length===0&&e.getClientRects().length&&re.test(e.textContent)).map(e=>e.textContent.trim().slice(0,200));},re);
