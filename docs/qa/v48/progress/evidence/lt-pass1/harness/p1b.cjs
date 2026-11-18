const H=require('./h.cjs'),L=require('./lib.cjs'),T=require('./pt.cjs'),fs=require('fs');
const out={};const S=async p=>{const r=await L.nilf(p);return {obj:r.activities['velen.nilf'].objectives,choices:r.choices,route:r.activities['velen.nilf'].route||null,counts:await L.counts(p)};};
const clickVis=(p,sel)=>p.evaluate(s=>{const all=[...document.querySelectorAll(s)];const b=all.find(b=>b.getClientRects().length)||all[0];if(!b)return 'none';let d=b.closest('details');while(d){d.open=true;d=d.parentElement.closest('details');}b.scrollIntoView({block:'center'});const vis=!!b.getClientRects().length;b.click();return {n:all.length,vis,disabled:b.disabled,text:b.textContent.trim()};},sel);
(async()=>{let {p,close}=await H.launch();
 await T.go(p,'#velen/quest/nilf/1');await T.check(p,'data-velen-check','velen.nilf:travel');
 await T.go(p,'#velen/quest/nilf/3');await T.check(p,'data-velen-check','velen.nilf:ask');await T.selectChoice(p,'fight');await H.sleep(300);await L.clickDialog(p,/Confirm update/);
 out.a_afterFight=await S(p);const recAfterTravel=null;
 out.a_undo=await clickVis(p,'[data-velen-undo]');await H.sleep(1200);out.a_afterUndo=await S(p);out.a_msgs=await L.status(p).then(s=>s.filter(x=>/undo/i.test(x)));
 out.a_ui={ask:await T.checked(p,'data-velen-check','velen.nilf:ask'),inn:await T.checked(p,'data-velen-check','velen.nilf:inn')};
 // second undo: should it undo travel?
 out.a_undo2=await clickVis(p,'[data-velen-undo]');await H.sleep(1000);out.a_afterUndo2=await S(p);
 // Quick undo path
 await T.check(p,'data-velen-check','velen.nilf:ask');await T.selectChoice(p,'peace');await H.sleep(300);await L.clickDialog(p,/Confirm update/);out.b_afterPeace=await S(p);
 out.b_quick=await p.evaluate(()=>{const b=document.querySelector('.quick-undo');if(!b)return 'none';const r=b.getBoundingClientRect();return {vis:!!b.getClientRects().length&&getComputedStyle(b).visibility!=='hidden',owner:b.dataset.undoOwner,text:b.textContent.trim(),r:[r.x,r.y,r.width,r.height].map(Math.round)};});
 await p.screenshot({path:'ev/p1b-quick-undo.png'});
 const qb=await p.$('.quick-undo');if(qb){try{await qb.click();out.b_quickClicked=true;}catch(e){out.b_quickErr=e.message;}}await H.sleep(1000);out.b_afterQuick=await S(p);
 // change recorded choice peace -> fight after fight objective
 await T.check(p,'data-velen-check','velen.nilf:ask');await T.selectChoice(p,'peace');await H.sleep(300);await L.clickDialog(p,/Confirm update/);
 out.c_edit=await clickVis(p,'[data-velen-edit-choice]');await H.sleep(800);out.c_sel=await T.selectChoice(p,'fight');await H.sleep(500);out.c_dlg=(await L.dlg(p)).map(d=>d.text);
 out.c_confirm=await L.clickDialog(p,/Confirm update/);out.c_after=await S(p);
 await T.go(p,'#velen/quest/nilf/3');out.c_fightBox=await T.checked(p,'data-velen-check','velen.nilf:fight');
 await T.check(p,'data-velen-check','velen.nilf:fight');out.c_fightDlg=(await L.dlg(p)).map(d=>d.text);await L.clickDialog(p,/Confirm update/);out.c_afterFightObj=await S(p);
 out.d_edit=await clickVis(p,'[data-velen-edit-choice]');await H.sleep(800);out.d_sel=await T.selectChoice(p,'peace');await H.sleep(500);out.d_dlg=(await L.dlg(p)).map(d=>d.text);await p.screenshot({path:'ev/p1b-switch-fight-to-peace.png'});
 out.d_confirm=await L.clickDialog(p,/Confirm update/);out.d_after=await S(p);
 // uncheck an objective
 await T.go(p,'#velen/quest/nilf/1');const sel='.sw-rail .sw-box[data-sw-objective="velen.nilf:travel"]';
 await T.check(p,'data-velen-check','velen.nilf:travel');out.e_uncheckDlg=(await L.dlg(p)).map(d=>d.text);await p.screenshot({path:'ev/p1b-uncheck-travel.png'});await L.clickDialog(p,/Confirm/);out.e_afterUncheck=await S(p);
 // whole quest complete
 out.f_whole=await clickVis(p,'[data-velen-quest]');await H.sleep(800);out.f_dlg=(await L.dlg(p)).map(d=>d.text);await L.clickDialog(p,/Confirm/);out.f_after=await S(p);
 out.logs=p._logs;await close();
 ({p,close}=await H.launch());await T.go(p,'#velen/quest/ladies-of-the-wood/1');const ls0=JSON.stringify(await H.ls(p));
 const vc=()=>p.evaluate(()=>[...document.querySelectorAll('input[type=checkbox]')].filter(c=>c.getClientRects().length).map(c=>c.getAttribute('aria-label')+'='+c.checked));
 out.g_before=await vc();await p.evaluate(()=>[...document.querySelectorAll('input[type=checkbox]')].find(c=>c.getClientRects().length).click());await H.sleep(800);
 out.g_after=await vc();out.g_storageSame=ls0===JSON.stringify(await H.ls(p));
 await T.go(p,'#velen/quest/ladies-of-the-wood/2');out.g_stage2=await vc();await T.go(p,'#velen/quest/ladies-of-the-wood/1');out.g_back1=await vc();
 await p.reload({waitUntil:'networkidle2'});await H.sleep(1500);out.g_reload=await vc();await close();
 fs.writeFileSync('ev/p1b-results.json',JSON.stringify(out,null,1));console.log('done');})().catch(e=>{console.error('ERR',e);fs.writeFileSync('ev/p1b-results.json',JSON.stringify(out,null,1));process.exit(1);});
