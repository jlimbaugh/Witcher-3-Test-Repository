const H=require('./h.cjs'),T=require('./pt.cjs');
(async()=>{const {p,close}=await H.launch({w:1280,h:900});await p.evaluateOnNewDocument(v=>{if(!sessionStorage.getItem('s')){sessionStorage.setItem('s','1');localStorage.setItem('phoenix.region.velen.v1',v);}},'{"schema":1,"region":"velen",');
 await T.go(p,'#velen/quest/nilf/1');await p.screenshot({path:'ev/p6-corrupt-nilf-top.png'});
 await p.evaluate(()=>{const e=[...document.querySelectorAll('body *')].find(e=>e.children.length===0&&/saves in this browser/.test(e.textContent)&&e.getClientRects().length);e.scrollIntoView({block:'center'});e.style.outline='3px solid red';});await H.sleep(500);await p.screenshot({path:'ev/p6-corrupt-nilf-footer.png'});await close();})();
