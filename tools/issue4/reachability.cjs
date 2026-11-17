'use strict';
// Issue #4 evidence (author-supplied, LT): White Orchard content reachability audit on the production DOM. For every
// WO walkthrough, every selector objective is selected in turn with the warning panel and every dropdown open; the union
// of the rendered text must contain every stage title, action text, choice, detail paragraph, nearby/continue link,
// spoiler and warning of that walkthrough. Fresh save (undecided routes). Usage: node reachability.cjs <base-url> <out-dir>
const {launch,sleep}=require('./cdp.cjs'),fs=require('node:fs'),path=require('node:path');
const [base,out]=[process.argv[2]||'http://127.0.0.1:8770/index.html',path.resolve(process.argv[3]||'evidence')];fs.mkdirSync(out,{recursive:true});
(async()=>{const b=await launch({width:390,height:844});await b.go(base+'#home',2500);
 const quests=await b.eval(`Object.keys(window.PHOENIX_PROGRESS_DATA.quests).filter(q=>window.PHOENIX_ROUTE.tasks[q].stages)`);const report=[];
 for(const q of quests){const plan=await b.eval(`(()=>{const t=window.PHOENIX_ROUTE.tasks['${q}'],cat=window.PhoenixWarningCatalog;const pieces=[];const norm=s=>String(s).replace(/\\s+/g,' ').trim().toLowerCase();
   for(const st of t.stages){pieces.push(['title',st.id,st.title]);for(const s of window.PhoenixSharedWalkthroughModel.sentences(st.text))pieces.push(['action',st.id,s]);(st.options||[]).forEach(o=>pieces.push(['choice',st.id,o]));
    (st.details||[]).forEach(d=>d.paragraphs.forEach(p=>pieces.push(['detail',st.id,p])));(st.detours||[]).filter(d=>window.PHOENIX_ROUTE.tasks[d.task]).forEach(d=>pieces.push(['nearby',st.id,d.label]));(st.links||[]).filter(l=>window.PHOENIX_ROUTE.tasks[l.task]).forEach(l=>pieces.push(['link',st.id,l.label]));
    if(st.spoiler)pieces.push(['spoiler',st.id,st.spoiler]);const risk=cat.context('${q}',st.id);if(risk)pieces.push(['warning',st.id,cat.get(risk,window.PHOENIX_ROUTE.tasks).short]);else if(st.warning)pieces.push(['warning',st.id,st.warning]);}
   return {view:t.view,stages:t.stages.map(s=>s.id),pieces:pieces.map(p=>[p[0],p[1],norm(p[2])])}})()`);
  let seen='';await b.eval(`location.hash=${JSON.stringify('#'+plan.view+'/'+plan.stages[0])}`);
  let ready=false;
  for(let attempt=0;attempt<60;attempt++){
   ready=await b.eval(`(()=>{const v=document.querySelector('.view:not([hidden])');return v?.id===${JSON.stringify(plan.view)}&&v.querySelector('.sw-walkthrough')?.dataset.swKey===${JSON.stringify('wo:'+q)};})()`);
   if(ready)break;await sleep(100);
  }
  if(!ready)throw Error('Walkthrough did not mount for '+q);
  const ids=await b.eval(`[...document.querySelectorAll('.view:not([hidden]) .sw-box')].map(x=>x.dataset.swObjective)`);
  for(const id of ids){await b.eval(`document.querySelector('.view:not([hidden]) .sw-box[data-sw-objective="${id}"]')?.click()`);await sleep(1300);
   await b.eval(`(()=>{const w=document.querySelector('.view:not([hidden]) .sw-wolf');if(w&&!w.disabled&&w.getAttribute('aria-expanded')!=='true')w.click();})()`);await sleep(300);
   await b.eval(`document.querySelectorAll('.view:not([hidden]) .sw-walkthrough details').forEach(d=>d.open=true)`);await sleep(150);
   seen+='\n'+await b.eval(`document.querySelector('.view:not([hidden]) .sw-walkthrough').textContent.replace(/\\s+/g,' ')`);}
  const missing=plan.pieces.filter(p=>!seen.toLowerCase().includes(p[2].replace(/\s+/g,' ').toLowerCase()));
  report.push({quest:q,selectorObjectives:ids.length,pieces:plan.pieces.length,missing});console.log(q,ids.length,'objectives',plan.pieces.length,'pieces, missing',missing.length);}
 await b.close();const total=report.reduce((n,r)=>n+r.pieces,0),miss=report.reduce((n,r)=>n+r.missing.length,0);
 fs.writeFileSync(path.join(out,'reachability.json'),JSON.stringify({base,when:new Date().toISOString(),label:'author-supplied (LT); headless Chrome, fresh save',total,missing:miss,report},null,1));
 console.log('TOTAL',total,'missing',miss);process.exit(miss?1:0);
})().catch(e=>{console.error(e);process.exit(2);});
