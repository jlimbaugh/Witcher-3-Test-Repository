const H=require('./h.cjs');if(process.env.QA_BASE)H.BASE=process.env.QA_BASE;const L=require('./lib.cjs'),T=require('./pt.cjs');const fs=require('fs');
const base=process.env.QA_BASE||H.BASE;const tag=process.argv[2]||'v49';const out={};
const nilf=async p=>{const r=await L.nilf(p);return {obj:r?.activities?.['velen.nilf']?.objectives,choices:Object.fromEntries(Object.entries(r?.choices||{}).map(([k,v])=>[k,v.value]))};};
const rail=p=>p.evaluate(()=>{const r=document.querySelector('#velen-screen .sw-rail');if(!r)return {present:false};const rr=r.getBoundingClientRect();const sel=r.querySelector('.sw-box.selected,.sw-box[aria-current],.sw-box[data-selected]');return {present:true,boxes:r.querySelectorAll('.sw-box').length,railInViewport:rr.bottom>0&&rr.top<innerHeight,railTop:Math.round(rr.top)};});
const clickUndo=async p=>{const r=await p.evaluate(()=>{const bs=[...document.querySelectorAll('#velen-screen [data-velen-undo], #velen-screen button')].filter(b=>/Undo last progress change/.test(b.textContent));for(const b of bs){const d=b.closest('details');if(d)d.open=true;}const v=bs.find(b=>b.getBoundingClientRect().width>0);if(!v)return 'none visible of '+bs.length;v.scrollIntoView({block:'center'});return v.disabled?'disabled':'ok';});if(r!=='ok')return r;await H.sleep(500);const h=await p.evaluateHandle(()=>[...document.querySelectorAll('#velen-screen button')].find(b=>/Undo last progress change/.test(b.textContent)&&b.getBoundingClientRect().width>0));await h.asElement().tap();await H.sleep(1200);return 'tapped';};
(async()=>{const {p,close}=await H.launch({mobile:true,w:390,h:844});
await T.go(p,'#velen/quest/nilf/3');
await T.check(p,'data-velen-check','velen.nilf:ask',true);out.dialog=(await L.dlg(p)).map(d=>d.text.slice(0,300));
out.sel=await T.selectChoice(p,'fight');await H.sleep(300);out.confirm=await L.clickDialog(p,/Confirm update/);
out.afterMark={...(await nilf(p)),counts:await L.counts(p),rail:await rail(p),status:(await L.status(p)).filter(x=>/undo|saved|progress|not/i.test(x)).slice(0,4)};
await p.screenshot({path:'/workspace/qa49/docs/qa/v49/lt/evidence/07-'+tag+'-after-mark-390.jpg',type:'jpeg',quality:55});
await p.reload({waitUntil:'networkidle2'});await H.sleep(1500);out.afterReload={...(await nilf(p)),counts:await L.counts(p)};
out.undo1=await clickUndo(p);out.afterUndo={...(await nilf(p)),counts:await L.counts(p),msgs:await T.visibleText(p,'undone|undo could|nothing to undo')};
out.undo2=await clickUndo(p);out.afterUndo2={...(await nilf(p))};
await p.reload({waitUntil:'networkidle2'});await H.sleep(1500);out.afterUndoReload={...(await nilf(p)),counts:await L.counts(p)};
// mark travel, go to hub, check hub reflects, return
await T.go(p,'#velen/quest/nilf/1');await T.check(p,'data-velen-check','velen.nilf:travel',true);await H.sleep(500);out.dlgTravel=(await L.dlg(p)).map(d=>d.text.slice(0,120));if(out.dlgTravel.length)await L.clickDialog(p,/Confirm/);
out.afterTravel={...(await nilf(p)),rail:await rail(p)};
await T.go(p,'#velen/hub/nilf');out.hub={counts:await p.evaluate(()=>(document.querySelector('#velen-screen').innerText.match(/Quest progress · \d+\/\d+|\d+\/\d+ completed/g)||[]).slice(0,3)),cont:await p.evaluate(()=>document.querySelector('#velen-screen .home-action-tile')?.innerText.replace(/\n/g,' '))};
// quick undo via status
await T.go(p,'#velen/quest/nilf/1');
out.logs=p._logs.filter(l=>!/favicon|404/.test(l));
fs.writeFileSync('/workspace/qa49/docs/qa/v49/lt/evidence/07-undo-'+tag+'.json',JSON.stringify(out,null,1));console.log(JSON.stringify(out,null,1).slice(0,4000));await close();})();
