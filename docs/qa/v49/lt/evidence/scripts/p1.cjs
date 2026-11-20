// T1-T5 nilf persistence, choice, undo, cancel, back/forward, visit-only marks
const H=require('./h.cjs'),L=require('./lib.cjs'),T=require('./pt.cjs'),fs=require('fs');
const out={};const A=async p=>(await L.nilf(p)).activities['velen.nilf'];
(async()=>{let {p,close}=await H.launch();
 await T.go(p,'#velen/quest/nilf/1');
 await T.check(p,'data-velen-check','velen.nilf:travel');
 out.t1_afterTravel={act:await A(p),ui:await T.checked(p,'data-velen-check','velen.nilf:travel'),counts:await L.counts(p)};
 await p.reload({waitUntil:'networkidle2'});await H.sleep(1500);
 out.t1_afterReload={act:(await A(p)).objectives,ui:await T.checked(p,'data-velen-check','velen.nilf:travel'),counts:await L.counts(p),hash:await p.evaluate(()=>location.hash)};
 // back/forward
 await T.go(p,'#velen/quest/nilf/4');await p.goBack({waitUntil:'networkidle2'});await H.sleep(1200);
 out.t1_back={hash:await p.evaluate(()=>location.hash),ui:await T.checked(p,'data-velen-check','velen.nilf:travel')};
 await p.goForward({waitUntil:'networkidle2'});await H.sleep(1200);out.t1_fwd={hash:await p.evaluate(()=>location.hash)};
 // T4 cancel
 await T.go(p,'#velen/quest/nilf/3');const before=(await H.ls(p))['phoenix.region.velen.v1'];
 await T.check(p,'data-velen-check','velen.nilf:ask');out.t4_dialog=await L.dlg(p);
 await L.clickDialog(p,/^Cancel$/);out.t4_afterCancel={same:before===(await H.ls(p))['phoenix.region.velen.v1'],ui:await T.checked(p,'data-velen-check','velen.nilf:ask')};
 // T2 choice fight with catchup
 await T.check(p,'data-velen-check','velen.nilf:ask');out.t2_sel=await T.selectChoice(p,'fight');await H.sleep(400);
 out.t2_dialogAfterSel=await L.dlg(p);await p.screenshot({path:'ev/p1-ask-fight-dialog.png'});
 out.t2_confirm=await L.clickDialog(p,/Confirm update/);
 const r2=await L.nilf(p);out.t2_after={obj:r2.activities['velen.nilf'].objectives,choices:r2.choices,counts:await L.counts(p),status:await L.status(p).then(s=>s.filter(x=>/undo|saved|progress/i.test(x)))};
 await p.screenshot({path:'ev/p1-after-fight.png'});
 // Undo via story & correction controls
 const undoInfo=await p.evaluate(()=>{const b=document.querySelector('[data-velen-undo]');if(!b)return 'no undo button';const d=b.closest('details');if(d)d.open=true;b.scrollIntoView({block:'center'});return {disabled:b.disabled,text:b.textContent,ctx:b.closest('section,details,div')?.innerText.slice(0,500)};});
 out.t2_undoBtn=undoInfo;await H.sleep(500);
 await p.click('[data-velen-undo]').catch(e=>out.t2_undoClickErr=e.message);await H.sleep(1000);
 const r3=await L.nilf(p);out.t2_afterUndo={obj:r3.activities['velen.nilf'].objectives,choices:r3.choices,counts:await L.counts(p),ui:{ask:await T.checked(p,'data-velen-check','velen.nilf:ask'),travel:await T.checked(p,'data-velen-check','velen.nilf:travel')},msgs:await T.visibleText(p,'undone|undo could')};
 // T3 catch-up unchecked + peace
 await T.go(p,'#velen/quest/nilf/4');await T.check(p,'data-velen-check','velen.nilf:look');out.t3_dialog=await L.dlg(p);
 out.t3_catch=await p.evaluate(()=>{const d=[...document.querySelectorAll('dialog')].find(d=>d.open);const c=d?.querySelector('[data-velen-catchup]');if(!c)return 'no catchup';if(c.checked)c.click();return c.checked;});
 out.t3_sel=await T.selectChoice(p,'peace');await H.sleep(300);out.t3_dialog2=await L.dlg(p);out.t3_confirm=await L.clickDialog(p,/Confirm update/);
 const r4=await L.nilf(p);out.t3_after={obj:r4.activities['velen.nilf'].objectives,choices:r4.choices,route:r4.activities['velen.nilf'].route,counts:await L.counts(p)};
 // reload persistence of choice
 await p.reload({waitUntil:'networkidle2'});await H.sleep(1500);const r5=await L.nilf(p);out.t3_reload={obj:r5.activities['velen.nilf'].objectives,choices:r5.choices};
 // edit choice: switch peace->fight
 out.t5_editBtn=await p.evaluate(()=>{const b=document.querySelector('[data-velen-edit-choice]');if(!b)return 'none';const d=b.closest('details');if(d)d.open=true;b.scrollIntoView({block:'center'});b.click();return b.textContent;});await H.sleep(900);
 out.t5_editDialog=await L.dlg(p);await p.screenshot({path:'ev/p1-edit-choice.png'});
 out.t5_sel=await T.selectChoice(p,'fight');await H.sleep(300);out.t5_dialog2=await L.dlg(p);out.t5_confirm=await L.clickDialog(p,/Confirm|Save|Change|Update/);
 const r6=await L.nilf(p);out.t5_after={obj:r6.activities['velen.nilf'].objectives,choices:r6.choices,counts:await L.counts(p)};
 out.logs=p._logs;await close();
 // T6 visit-only marks on card quests
 ({p,close}=await H.launch());await T.go(p,'#velen/quest/ladies-of-the-wood/1');const ls0=JSON.stringify(await H.ls(p));
 await p.click('input[aria-label^="Mark complete"]');await H.sleep(800);
 out.t6={checkedNow:await p.$eval('input[aria-label^="Mark complete"]',c=>c.checked),storageSame:ls0===JSON.stringify(await H.ls(p)),note:await T.visibleText(p,'last for this visit')};
 await T.go(p,'#velen/quest/ladies-of-the-wood/2');await T.go(p,'#velen/quest/ladies-of-the-wood/1');out.t6.afterNav=await p.$eval('input[aria-label^="Mark complete"]',c=>c.checked);
 await p.reload({waitUntil:'networkidle2'});await H.sleep(1500);out.t6.afterReload=await p.$eval('input[aria-label^="Mark complete"]',c=>c.checked);
 await close();
 fs.writeFileSync('ev/p1-results.json',JSON.stringify(out,null,1));console.log(JSON.stringify(out,null,1));})().catch(e=>{console.error('ERR',e);fs.writeFileSync('ev/p1-results.json',JSON.stringify(out,null,1));process.exit(1);});
