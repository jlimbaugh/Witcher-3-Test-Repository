'use strict';
// Issue #4 evidence (author-supplied, LT): real production UI journeys in headless Chrome (simulated touch, keyboard and
// viewport; physical Safari is not covered). Usage: node journeys.cjs <base-url> <out-dir>
// For each region (White Orchard: The Beast of White Orchard; Velen: The Nilfgaardian Connection) and each size
// (390x844, 844x390): normal Home -> region -> hub -> quest entry, swipe + snap, neighbour checkbox selects only,
// selected checkbox confirms, stay after completion, Undo, dropdowns, warning expand + Got it, route change (Velen),
// next-unfinished, deep link, return/back, two reloads with restored last-viewed, keyboard, overflow and overlap probes.
const {launch,sleep}=require('./cdp.cjs'),fs=require('node:fs'),path=require('node:path');
const [base,out]=[process.argv[2]||'http://127.0.0.1:8770/index.html',path.resolve(process.argv[3]||'evidence')];
fs.mkdirSync(out,{recursive:true});
const results=[];let current=null;
function check(name,ok,detail){current.checks.push({name,ok:!!ok,detail});if(!ok)console.log('  FAIL',current.id,name,String(JSON.stringify(detail)).slice(0,300));}
const SNAP=`(()=>{const v=document.querySelector('.view:not([hidden])');const s=v&&v.querySelector('.sw-walkthrough');const m=document.querySelector('.phoenix-medallion');
 const r=s&&s.querySelector('.sw-rail'),sel=s&&s.querySelector('.sw-box.selected');let centred=null;if(r&&sel){const a=r.getBoundingClientRect(),b=sel.getBoundingClientRect();centred=Math.round((b.left+b.width/2)-(a.left+a.width/2));}
 return {hash:location.hash,sw:!!s,sel:sel?.dataset.swObjective||null,centred,pos:s?.querySelector('.sw-position')?.textContent||null,count:s?.querySelector('.sw-progress span')?.textContent||null,
  h2:s?.querySelector('.sw-reading h2')?.textContent||null,warnPanel:!!s?.querySelector('.sw-warning-panel'),badge:s?.querySelector('.sw-wolf-badge')?.className||null,
  dialog:!!document.querySelector('dialog[open]'),medMode:m?.dataset.mode,medPending:m?.dataset.pendingWarnings||null,medLabel:m?.querySelector('.medallion-label')?.textContent,
  overflowX:document.documentElement.scrollWidth>innerWidth+1,progress:(()=>{let wo=null,ve=null;try{const x=JSON.parse(localStorage.getItem('phoenix.whiteorchard.interaction.v1'));wo=JSON.stringify([x.progress,x.completed]);}catch{}try{const y=JSON.parse(localStorage.getItem('phoenix.region.velen.v1'));ve=JSON.stringify([y.activities,y.choices]);}catch{}return wo+'|'+ve;})(),store:Object.fromEntries(Object.keys(localStorage).sort().map(k=>[k,localStorage.getItem(k).length]))}})()`;
async function snap(b){return b.eval(SNAP);}
async function centre(b,sel){return b.eval(`(()=>{const e=document.querySelector(${JSON.stringify(sel)});if(!e)return null;e.scrollIntoView({block:'center',inline:'nearest'});const r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2,w:r.width,h:r.height}})()`);}
async function tapSel(b,sel){let p=await centre(b,sel);if(!p)return false;await sleep(250);p=await b.eval(`(()=>{const r=document.querySelector(${JSON.stringify(sel)}).getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2}})()`);await b.tap(p.x,p.y);await sleep(700);return true;}
async function clickHref(b,prefix){const ok=await b.eval(`(()=>{const a=[...document.querySelectorAll('.view:not([hidden]) a[href]')].find(a=>a.getAttribute('href').startsWith(${JSON.stringify(prefix)})&&a.getClientRects().length);if(!a)return false;a.click();return a.getAttribute('href');})()`);await sleep(1400);return ok;}
async function shot(b,name){const f=path.join(out,current.id+'-'+name+'.png');await b.shot(f);current.shots.push(path.basename(f));}
async function confirmDialog(b){await b.eval(`[...document.querySelectorAll('dialog[open] button')].find(x=>/Confirm/.test(x.textContent))?.click()`);await sleep(1200);}
const REGIONS={
 wo:{name:'White Orchard / The Beast of White Orchard',async enter(b){await b.go(base+'#home',2500);const steps=[await clickHref(b,'#whiteorchard-console')];
   await b.eval(`location.hash='#whiteorchard-tree'`);await sleep(1200);steps.push('#whiteorchard-tree');
   steps.push(await clickHref(b,'#whiteorchard-tree/hub-arrival'));await b.eval(`location.hash='#whiteorchard-tree/hub-hunt/q-beast'`);await sleep(1200);steps.push('#whiteorchard-tree/hub-hunt/q-beast');
   steps.push(await clickHref(b,'#quest-beast'));return steps;},
  warnStage:'#quest-beast/trophy',deep:'#quest-beast/patrol',deepExpect:'q-beast:follow',withinStage:'q-beast:site',hub:'[data-return-hub]'},
 velen:{name:'Velen / The Nilfgaardian Connection',async enter(b){await b.go(base+'#home',2500);const steps=[await clickHref(b,'#velen')];steps.push(await clickHref(b,'#velen/hub/nilf'));
   steps.push(await clickHref(b,'#velen/quest/nilf/'));return steps;},
  warnStage:'#velen/quest/nilf/3',deep:'#velen/quest/nilf/4',deepExpect:'velen.nilf:look',withinStage:'velen.nilf:survivor',hub:'[data-return-hub]'}
};
(async()=>{
 for(const [w,h] of [[390,844],[844,390]])for(const [rid,R] of Object.entries(REGIONS)){
  current={id:rid+'-'+w+'x'+h,region:R.name,size:w+'x'+h,checks:[],shots:[],steps:{}};results.push(current);console.log('==',current.id);
  const b=await launch({width:w,height:h});
  try{
   // 1 entry
   current.steps.entry=await R.enter(b);let s=await snap(b);check('normal entry reaches the shared walkthrough',s.sw,s);check('no horizontal page overflow',!s.overflowX,s);
   check('floating wolf is navigation only',s.medMode==='nav'&&s.medLabel==='Navigate',s);await shot(b,'01-entry');
   const firstProgress=s.progress;
   // 2 swipe and snap
   const rail=await b.eval(`(()=>{const r=document.querySelector('.view:not([hidden]) .sw-rail');r.scrollIntoView({block:'center'});const a=r.getBoundingClientRect();return {x:a.left+a.width/2,y:a.top+a.height/2,w:a.width}})()`);await sleep(300);
   const before=(await snap(b)).sel;await b.swipe(rail.x+rail.w*0.3,rail.y,rail.x-rail.w*0.3);await sleep(1500);s=await snap(b);
   check('swipe selects another objective and snaps it centred',s.sel&&s.sel!==before&&Math.abs(s.centred)<=12,{before,after:s.sel,centred:s.centred});
   check('selection never records progress (progress, completion and choices unchanged)',s.progress===firstProgress,{before:firstProgress.slice(0,200),after:s.progress.slice(0,200)});
   await shot(b,'02-swiped');
   // 3 neighbour checkbox selects only
   const n0=await snap(b);const ok=await tapSel(b,'.view:not([hidden]) .sw-box.selected + .sw-box .sw-check-proxy');s=await snap(b);
   check('neighbouring checkbox only selects (no dialog, no count change, no progress write)',ok&&s.sel!==n0.sel&&!s.dialog&&s.count===n0.count&&s.progress===n0.progress,{from:n0.sel,to:s.sel,dialog:s.dialog,count:[n0.count,s.count]});
   // 4 selected checkbox confirms, stays
   const c0=await snap(b);await tapSel(b,'.view:not([hidden]) .sw-box.selected input[type=checkbox]');s=await snap(b);
   check('selected checkbox runs the existing flow (review dialog when catch-up or a choice is needed, else direct apply)',s.dialog||s.count!==c0.count,{dialog:s.dialog,count:s.count});
   if(s.dialog){await shot(b,'03-confirm-dialog');current.steps.dialog=await b.eval(`(()=>{const out=[];document.querySelectorAll('dialog[open] select').forEach(x=>{if(!x.value){const o=[...x.options].find(o=>o.value&&o.value!=='direct');if(o){x.value=o.value;x.dispatchEvent(new Event('change',{bubbles:true}));out.push(o.value);}}});return out})()`);await sleep(200);await confirmDialog(b);}s=await snap(b);
   check('stays on the same objective after completion',s.sel===c0.sel,{before:c0.sel,after:s.sel});check('count increases from the engine',s.count!==c0.count,{before:c0.count,after:s.count});
   await shot(b,'04-completed');
   // 5 Undo (existing toast)
   const undoBtn=await b.eval(`(()=>{const t=[...document.querySelectorAll('[data-progress-undo] button,button[data-progress-undo],.quick-undo,[data-velen-undo]')].find(x=>x.getClientRects().length&&!x.disabled);if(!t)return null;t.click();return t.className||t.textContent})()`);await sleep(1200);s=await snap(b);
   if(!undoBtn){await b.eval(`(()=>{const r=document.querySelector('.view:not([hidden]) .sw-story-row');r.open=true;(r.querySelector('[data-undo-deck],[data-velen-undo]')).click()})()`);await sleep(1200);s=await snap(b);}
   check('Undo restores the previous count and keeps the selection',s.count===c0.count&&s.sel===c0.sel,{undo:undoBtn||'story-row',count:s.count,sel:s.sel});
   // 6 dropdowns
   await b.eval(`document.querySelectorAll('.view:not([hidden]) .sw-reading details.sw-row').forEach(d=>d.open=false)`);
   await tapSel(b,'.view:not([hidden]) .sw-reading details[data-sw-row=optional]>summary');let open=await b.eval(`document.querySelector('.view:not([hidden]) details[data-sw-row=optional]').open`);check('Related optional tasks dropdown opens',open);await shot(b,'05-optional');
   await tapSel(b,'.view:not([hidden]) .sw-reading details[data-sw-row=info]>summary');open=await b.eval(`document.querySelector('.view:not([hidden]) details[data-sw-row=info]').open`);check('Information dropdown opens',open);await shot(b,'06-info');
   // 7 warning expand + Got it
   await b.eval(`location.hash=${JSON.stringify(R.warnStage)}`);await sleep(1500);s=await snap(b);check('warning objective shows an unread wolf badge',/unread/.test(s.badge||''),s);
   await tapSel(b,'.view:not([hidden]) .sw-wolf');s=await snap(b);check('wolf expands the warning inline',s.warnPanel,s);await shot(b,'07-warning');
   const beforeAck=await snap(b);await tapSel(b,'.view:not([hidden]) .sw-ack-btn');s=await snap(b);check('Got it marks the warning acknowledged',/acked/.test(s.badge||''),s);
   const hist=await b.eval(`localStorage.getItem('phoenix.whiteorchard.warningHistory.v1')`);check('acknowledgment is written to the existing warning history (no new key)',hist&&hist.includes('"text"'),hist);
   check('acknowledgment is separate from completion',s.progress===beforeAck.progress&&s.count===beforeAck.count,{before:beforeAck.count,after:s.count});await shot(b,'08-warning-ack');
   // 8 route change (Velen) through Story & correction controls
   if(rid==='velen'){await b.eval(`(()=>{const r=document.querySelector('.view:not([hidden]) .sw-story-row');r.open=true;r.querySelector('[data-velen-edit-choice]').click()})()`);await sleep(800);
    await b.eval(`(()=>{const s=document.querySelector('dialog[open] select');s.value='fight';s.dispatchEvent(new Event('change',{bubbles:true}));})()`);await sleep(200);await confirmDialog(b);s=await snap(b);
    check('route change to fight: 9 required from the engine',/of 9 required/.test(s.count||''),s.count);
    await b.eval(`(()=>{const r=document.querySelector('.view:not([hidden]) .sw-story-row');r.open=true;r.querySelector('[data-velen-undo]').click()})()`);await sleep(1200);s=await snap(b);check('route change Undo returns to 8',/of 8 required/.test(s.count||''),s.count);}
   // 9 next unfinished
   const nb=await snap(b);await tapSel(b,'.view:not([hidden]) .sw-next');s=await snap(b);check('Next unfinished moves to the first open required objective',s.sel&&s.sel!==nb.sel&&/OBJECTIVE 1 OF/.test(s.pos),{from:nb.sel,to:s.sel,pos:s.pos});
   // 10 deep link in a fresh tab (same browser profile)
   await b.go('about:blank',300);await b.go(base+R.deep,3000);s=await snap(b);check('deep link opens the stage with its first objective selected',s.sel===R.deepExpect,s);await shot(b,'09-deeplink');
   // 11 select within the stage, return to hub and back
   await b.eval(`document.querySelector('.view:not([hidden]) .sw-box[data-sw-objective="${R.withinStage}"]')?.click()`);await sleep(800);s=await snap(b);check('within-stage selection',s.sel===R.withinStage,s);
   const y0=await b.eval(`Math.round((window.PhoenixViewport||window).scrollY)`);
   await b.eval(`document.querySelector('.view:not([hidden]) ${R.hub}').click()`);await sleep(1500);const hubHash=await b.eval('location.hash');check('Return to hub leaves the walkthrough',!(await snap(b)).sw,hubHash);
   await b.eval('history.back()');await sleep(1800);s=await snap(b);check('Back returns to the same objective',s.sel===R.withinStage,{hubHash,s});
   // 12 two reloads keep the last viewed objective
   await b.reload(3000);s=await snap(b);check('reload 1 restores the last viewed objective',s.sel===R.withinStage,s);await b.reload(3000);s=await snap(b);check('reload 2 restores the last viewed objective',s.sel===R.withinStage,s);await shot(b,'10-reloaded');
   // 13 closed tab: a fresh entry restores the stage (existing stage record)
   await b.go('about:blank',300);await b.go(base+(rid==='wo'?'#quest-beast':'#velen/hub/nilf'),2500);if(rid==='velen'){await clickHref(b,'#velen/quest/nilf/');}s=await snap(b);
   check('fresh entry restores the last viewed stage (objective falls back to the stage owner)',s.sw&&(s.sel===R.withinStage||s.sel===R.deepExpect),s);
   // 14 keyboard: arrow keys move selection; focus stays in the rail
   await b.eval(`document.querySelector('.view:not([hidden]) .sw-box.selected').focus()`);const k0=(await snap(b)).sel;await b.key('ArrowRight','ArrowRight',39);await sleep(900);s=await snap(b);
   const focus=await b.eval(`document.activeElement?.classList.contains('sw-box')&&document.activeElement.classList.contains('selected')`);check('ArrowRight selects the next objective and keeps focus',s.sel!==k0&&focus,{k0,sel:s.sel,focus});
   // 15 touch targets, wolf overlap, contrast sample
   const geo=await b.eval(`(()=>{const v=document.querySelector('.view:not([hidden])');const small=[...v.querySelectorAll('.sw-walkthrough button,.sw-walkthrough a,.sw-walkthrough summary,.sw-walkthrough input,.sw-story-row button,.sw-story-row summary,.sw-story-row select')].filter(e=>e.getClientRects().length).map(e=>{const r=(e.matches('input')?e.closest('label'):e).getBoundingClientRect();return {t:(e.textContent||e.getAttribute('aria-label')||e.tagName).trim().slice(0,30),w:Math.round(r.width),h:Math.round(r.height)}}).filter(x=>x.h<44||x.w<44);
    const med=document.querySelector('.phoenix-medallion .medallion-core').getBoundingClientRect(),panel=v.querySelector('.reading-panel').getBoundingClientRect();
    return {small,overlapPx:Math.max(0,Math.round(panel.right-med.left)),landscape:innerWidth>innerHeight}})()`);
   check('touch targets are at least 44px',geo.small.length===0,geo.small);
   if(geo.landscape)check('landscape: reading column clears the floating wolf',geo.overlapPx===0,geo);
   current.geometry=geo;
  }catch(e){check('journey completed without exception',false,String(e.stack||e));}
  const errors=b.events.filter(e=>e.method==='Runtime.exceptionThrown').map(e=>e.params.exceptionDetails?.exception?.description?.slice(0,300));check('no uncaught page exceptions',errors.length===0,errors);
  await b.close();
 }
 // reduced motion
 {current={id:'reduced-motion-390x844',region:'both',size:'390x844',checks:[],shots:[],steps:{}};results.push(current);const b=await launch();await b.send('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await b.go(base+'#quest-beast/patrol',3000);const t=await b.eval(`getComputedStyle(document.querySelector('.view:not([hidden]) .sw-box')).transitionDuration`);check('reduced motion removes box transitions',/^0s/.test(t),t);await b.close();}
 const sum={runs:results.length,checks:results.reduce((n,r)=>n+r.checks.length,0),failed:results.flatMap(r=>r.checks.filter(c=>!c.ok).map(c=>r.id+': '+c.name))};
 fs.writeFileSync(path.join(out,'journeys.json'),JSON.stringify({base,when:new Date().toISOString(),label:'author-supplied (LT); headless Chrome with simulated touch/keyboard; not physical Safari',summary:sum,results},null,1));
 console.log(JSON.stringify(sum,null,1));process.exit(sum.failed.length?1:0);
})().catch(e=>{console.error(e);process.exit(2);});
