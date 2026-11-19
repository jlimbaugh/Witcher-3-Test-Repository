const H=require('./h.cjs'),L=require('./lib.cjs'),T=require('./pt.cjs'),fs=require('fs');
const out={};const WK='phoenix.whiteorchard.interaction.v1';
const wo=async p=>{const r=JSON.parse((await H.ls(p))[WK]);return r.progress.objectives;};
const confirmAll=async p=>{for(let i=0;i<3;i++){const d=await L.dlg(p);if(!d.length)break;await L.clickDialog(p,/Confirm/);}};
const undoBtns=p=>p.evaluate(()=>[...document.querySelectorAll('[data-undo-deck]')].map(b=>({vis:!!b.getClientRects().length,dis:b.disabled,label:b.getAttribute('aria-label'),quest:b.closest('[data-task],[data-quest],section')?.id||''})));
(async()=>{let {p,close}=await H.launch();
 await T.go(p,'#quest-lilac');await T.check(p,'data-objective-check','q-lilac:ghouls');await confirmAll(p);out.a=await wo(p);
 await T.go(p,'#quest-beast');out.hashB=await p.evaluate(()=>location.hash+' | '+document.title);
 await T.check(p,'data-objective-check','q-beast:herbalist');out.dlgB=(await L.dlg(p)).map(d=>d.text.slice(0,400));await confirmAll(p);out.b=await wo(p);
 await T.go(p,'#quest-lilac');out.hashA=await p.evaluate(()=>location.hash+' | '+document.title);out.btns=await undoBtns(p);
 await p.waitForFunction(()=>!document.querySelector('.quick-undo')||!document.querySelector('.quick-undo').getClientRects().length||true);
 await H.sleep(4000);// let quick undo window close
 const r=await p.evaluate(()=>{const b=[...document.querySelectorAll('[data-undo-deck]')].find(b=>b.getClientRects().length&&!b.disabled);if(!b)return 'no enabled visible';let d=b.closest('details');while(d){d.open=true;d=d.parentElement.closest('details');}b.scrollIntoView({block:'center'});return {label:b.getAttribute('aria-label'),text:b.textContent.trim(),ctx:b.closest('details')?.innerText.replace(/\s+/g,' ').slice(0,300)};});out.undoTarget=r;
 await p.screenshot({path:'ev/p4-n1-before-undo.png'});
 await p.evaluate(()=>[...document.querySelectorAll('[data-undo-deck]')].find(b=>b.getClientRects().length&&!b.disabled).click());await H.sleep(1200);
 out.afterUndo=await wo(p);out.msgs=(await L.status(p)).filter(x=>/undo/i.test(x)&&!/^Undo last update$/.test(x));await p.screenshot({path:'ev/p4-n1-after-undo.png'});
 await close();fs.writeFileSync('ev/p4-results.json',JSON.stringify(out,null,1));console.log(JSON.stringify(out,null,1).slice(0,4000));})().catch(e=>{console.error(e);});
