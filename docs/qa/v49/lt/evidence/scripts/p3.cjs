const H=require('./h.cjs'),L=require('./lib.cjs'),T=require('./pt.cjs'),fs=require('fs');
const out={};const WK='phoenix.whiteorchard.interaction.v1';
const wo=async p=>{const r=JSON.parse((await H.ls(p))[WK]);return {obj:r.progress.objectives,undo:r.progressUndo?Object.keys(r.progressUndo):null};};
const nil=async p=>{const r=await L.nilf(p);return {obj:r.activities['velen.nilf'].objectives,choices:r.choices};};
const confirmAll=async p=>{for(let i=0;i<3;i++){const d=await L.dlg(p);if(!d.length)break;await L.clickDialog(p,/Confirm/);}};
const clickVis=(p,sel)=>p.evaluate(s=>{const all=[...document.querySelectorAll(s)];const b=all.find(b=>b.getClientRects().length)||all[0];if(!b)return 'none';let d=b.closest('details');while(d){d.open=true;d=d.parentElement.closest('details');}b.scrollIntoView({block:'center'});const ctx=b.closest('details,section')?.innerText.replace(/\s+/g,' ').slice(0,400);b.click();return {n:all.length,disabled:b.disabled,text:b.textContent.trim(),ctx};},sel);
const firstUnchecked=p=>p.evaluate(()=>{const c=[...document.querySelectorAll('input[data-objective-check]')].find(c=>c.closest('.sw-box'));return [...document.querySelectorAll('.sw-rail .sw-box')].map(b=>b.dataset.swObjective);});
(async()=>{let {p,close}=await H.launch();
 // N1: WO quest A then WO quest B, Undo on quest A page
 await T.go(p,'#quest-lilac');out.lilacRail=await firstUnchecked(p);
 await T.check(p,'data-objective-check','q-lilac:ghouls');out.n1_dlgA=(await L.dlg(p)).map(d=>d.text.slice(0,500));await confirmAll(p);out.n1_afterA=await wo(p);
 await T.go(p,'#quest-beast');out.beastRail=await firstUnchecked(p);const bid=out.beastRail[0];
 await T.check(p,'data-objective-check',bid);out.n1_dlgB=(await L.dlg(p)).map(d=>d.text.slice(0,500));await confirmAll(p);out.n1_afterB=await wo(p);
 await T.go(p,'#quest-lilac');out.n1_undoBtn=await clickVis(p,'[data-undo-deck]');await H.sleep(1000);out.n1_afterUndoOnA=await wo(p);
 out.n1_msgs=(await L.status(p)).filter(x=>/undo/i.test(x));await p.screenshot({path:'ev/p3-n1-undo-on-lilac.png'});
 // cross-owner: Velen change then WO change; Velen undo and WO undo independence
 await T.go(p,'#velen/quest/nilf/1');await T.check(p,'data-velen-check','velen.nilf:travel');out.x_nilf1=await nil(p);
 await T.go(p,'#quest-beast');const before=await wo(p);await T.check(p,'data-objective-check',out.beastRail[0]);await confirmAll(p);out.x_woAfter=await wo(p);
 out.x_quick=await p.evaluate(()=>{const b=document.querySelector('.quick-undo');return b?{vis:!!b.getClientRects().length&&getComputedStyle(b).visibility!=='hidden'&&!b.hidden,owner:b.dataset.undoOwner||null}:'none';});
 await T.go(p,'#velen/quest/nilf/1');out.x_velenUndo=await clickVis(p,'[data-velen-undo]');await H.sleep(1000);out.x_afterVelenUndo={nilf:await nil(p),wo:await wo(p)};
 // P-02 uncheck travel clears choice; then undo restores?
 await T.go(p,'#velen/quest/nilf/3');await T.check(p,'data-velen-check','velen.nilf:ask');await T.selectChoice(p,'peace');await H.sleep(300);await L.clickDialog(p,/Confirm update/);out.u_before=await nil(p);
 await T.go(p,'#velen/quest/nilf/1');await T.check(p,'data-velen-check','velen.nilf:travel');out.u_dlg=(await L.dlg(p)).map(d=>d.text);await L.clickDialog(p,/Confirm/);out.u_after=await nil(p);
 out.u_choiceUI=await p.evaluate(()=>[...document.querySelectorAll('[data-velen-edit-choice]')].map(b=>b.closest('details,section,div')?.innerText.replace(/\s+/g,' ').slice(0,200)).slice(0,2));
 out.u_undo=await clickVis(p,'[data-velen-undo]');await H.sleep(1000);out.u_afterUndo=await nil(p);
 // Pyres hub resolve + isolation
 const n0=(await H.ls(p))['phoenix.region.velen.v1'];await T.go(p,'#velen/hub/pyres');
 await p.evaluate(()=>[...document.querySelectorAll('input[type=checkbox]')].find(c=>/Funeral Pyres/.test(c.getAttribute('aria-label')||'')).click());await H.sleep(900);out.py_dlg=(await L.dlg(p)).map(d=>d.text.slice(0,300));await confirmAll(p);
 out.py_after=JSON.parse((await H.ls(p))['phoenix.velen.arrival.v1']);out.py_nilfSame=n0===(await H.ls(p))['phoenix.region.velen.v1'];
 await p.reload({waitUntil:'networkidle2'});await H.sleep(1500);out.py_reloadChecked=await p.evaluate(()=>[...document.querySelectorAll('input[type=checkbox]')].filter(c=>/Funeral Pyres/.test(c.getAttribute('aria-label')||'')).map(c=>c.getAttribute('aria-label')+'='+c.checked));
 out.py_progressPage=await (async()=>{await T.go(p,'#velen');return p.evaluate(()=>(document.querySelector('main').innerText.match(/Arrival pilot[^\n]*/)||[''])[0]);})();
 out.logs=p._logs.filter(l=>!/404/.test(l));await close();
 // corrupt WO notice text
 ({p,close}=await H.launch());await p.evaluateOnNewDocument(()=>{if(!sessionStorage.getItem('s')){sessionStorage.setItem('s','1');localStorage.setItem('phoenix.whiteorchard.interaction.v1','{broken');}});
 for(const h of ['#home','#quest-lilac','#whiteorchard','#progress']){await T.go(p,h);out['cw_'+h]=await T.visibleText(p,'could not be read|not saved|unavailable|kept unchanged|saves in this browser');}
 await p.screenshot({path:'ev/p3-corrupt-wo-progress.png'});await close();
 fs.writeFileSync('ev/p3-results.json',JSON.stringify(out,null,1));console.log('ok');})().catch(e=>{console.error(e);fs.writeFileSync('ev/p3-results.json',JSON.stringify(out,null,1));});
