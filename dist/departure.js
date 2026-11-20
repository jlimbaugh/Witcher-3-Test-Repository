'use strict';
window.PhoenixDeparture={
 sources:{cutoff:'https://witcher.fandom.com/wiki/The_Witcher_3_secondary_quests',skull:'https://www.gamebanshee.com/thewitcher3/walkthrough/lilacandgooseberries.php',returning:'https://game-checklists.com/witcher3/all-side-quests-checklist.html'},
 // Fixed authored order by cutoff: skull (before Beast), then the three quests (before final inn). Ties preserve this authored sequence.
 build({state,engine,tasks,exploration,diagrams}){
  const p=state.progress,f=engine.facts(p);
  const riskIds=['q-firestarter','q-missing','q-death']; // authored tie order preserved
  const classify=(id,isSkull=false)=>{
   const s=isSkull? (state.completed[id]?'complete': (f.griffin||f.departed?'cutoff-unknown':'not started')) : engine.status(id,p);
   let kind,status,active=false,unknown=false,failed=false,completed=false;
   if(isSkull){
    if(state.completed[id]){kind='completed';status='Recorded acquired';completed=true;}
    else if(f.griffin||f.departed){kind='cutoff-unknown';status='Earlier cutoff recorded — check in game';unknown=true;}
    else{kind='unrecorded';status='Not recorded — check in game';unknown=true;active=true;}
   }else{
    if(s==='complete'){kind='completed';status='Recorded complete';completed=true;}
    else if(s==='failed'){kind='failed';status='Recorded failed';failed=true;}
    else if(s==='active'){kind='open';status='Recorded in progress';active=true;}
    else if(s==='unavailable'){kind='unavailable';status='Unavailable at recorded story stage';unknown=true;}
    else{kind='unrecorded';status='Not recorded — check in game';unknown=true;active=true;}
   }
   const item={id,name:tasks[id].name,href:'#'+tasks[id].view,kind,status,active,unknown,failed,completed,text:isSkull?'Collect before completing The Beast of White Orchard. This cutoff is earlier than departure.':'Finish before the inn departure sequence that leads to Imperial Audience.'};
   return item;
  };
  const risks=riskIds.map(id=>classify(id));
  const skull=classify('poi-4',true);
  // Ordered by cutoff: skull first, then risks in authored order
  const ordered=[skull,...risks];
  const knownOpen=ordered.filter(r=>r.active&&!r.unknown);
  const unknowns=ordered.filter(r=>r.unknown);
  const failed=ordered.filter(r=>r.failed);
  const completed=ordered.filter(r=>r.completed);
  // Warning eligibility: unrecorded and open items remain eligible. Cutoff-unknown, failed, completed, and unavailable are excluded. Summary counts stay separate.
  const warningEligible=ordered.filter(r=>!r.completed&&!r.failed&&r.kind!=='cutoff-unknown'&&r.kind!=='unavailable');
  return {departed:!!f.departed,risks,skull,ordered,knownOpen,unknowns,failed,completed,warningEligible,active:warningEligible};
 },
 summaryText(v){
  const openN=v.knownOpen.length,unkN=v.unknowns.length;
  const parts=[openN+' known open risk'+(openN===1?'':'s'),unkN+' unknown item'+(unkN===1?'':'s')];
  if(v.failed.length)parts.push(v.failed.length+' recorded failed');
  if(v.completed.length)parts.push(v.completed.length+' recorded complete');
  const allPositive=v.ordered.length===4&&v.completed.length===4&&!v.unknowns.length&&!v.failed.length;
  if(allPositive)parts.push('All 4 items recorded complete');
  return parts.join(' · ');
 },
 atStep(root,stage){return root==='q-lilac'&&stage==='4'||root==='q-incident'&&['1','2'].includes(stage);}
};
window.createPhoenixDeparture=function({state,tasks,engine,medallion,navigate}){
 const model=window.PhoenixDeparture,section=document.getElementById(tasks['departure-review'].view),panel=section.querySelector('.reading-panel');
 const make=(tag,text,cls)=>{const e=document.createElement(tag);if(text)e.textContent=text;if(cls)e.className=cls;return e;};
 let origin=null;const back=make('button','Return to where you opened this review','departure-return');back.type='button';back.hidden=true;back.onclick=()=>{if(origin){navigate(origin.hash);requestAnimationFrame(()=>requestAnimationFrame(()=>(window.PhoenixViewport||window).scrollTo(0,origin.y)));}};panel.prepend(back);
 document.addEventListener('click',event=>{const a=event.target.closest('a');if(a?.getAttribute('href')==='#'+section.id&&location.hash.split('/')[0]!=='#'+section.id){origin={hash:location.hash||'#whiteorchard-console',y:(window.PhoenixViewport||window).scrollY};back.hidden=false;}},true);
 const host=make('section',null,'departure-review');host.dataset.departureReview='';back.after(host);
 // Optional unfinished UI removed from this page per agreed decision 1. Shared activity entries remain elsewhere.
 function get(){return model.build({state,engine,tasks});}
 const link=(text,href)=>{const a=make('a',text);a.href=href;return a;};
 // Integration: regional checklist access belongs in the explicit preparation/departure tools.
 const consoleLink=link('Review before leaving White Orchard','#'+section.id);consoleLink.className='departure-console-link';const preparationTools=document.querySelector('#whiteorchard-preparation-tools');if(preparationTools)preparationTools.append(consoleLink);
 for(const [id,stages]of [['q-lilac',['4']],['q-incident',['1','2']]])for(const stage of stages){const view=tasks[id].view;const node=document.querySelector('#'+view+' [data-stage="'+stage+'"]');if(!node||node.querySelector('a[href="#'+section.id+'"]'))continue;const a=link('Open departure review','#'+section.id);a.className='departure-step-link';node.append(a);}
 let queued=new Set();
 let resolvedOpen=false;
 function row(item){const a=make('article',null,'departure-item');a.dataset.kind=item.kind;
  // Title opens the canonical warning overlay; related-entry navigation lives inside the overlay.
  const title=make('button',item.name,'warning-details-trigger departure-title');title.type='button';title.dataset.warningDetails=item.id;title.setAttribute('aria-label','Open warning details: '+item.name);a.append(title);
  const status=make('p',item.status,'departure-status');a.append(status);
  // Unknown guidance immediately below status
  if(item.unknown){const guidance=make('p',item.kind==='cutoff-unknown'?'A recorded cutoff does not prove the item was permanently missed. Check in game whether it was collected or is still available.':'Outcome is not recorded in the guide. Open the in-game journal or visit the location to verify.','departure-guidance');a.append(guidance);}
  if(item.text){const detail=window.PhoenixWarningCatalog?.get(item.id,tasks);a.append(make('p',detail?.short||item.text));if(detail){const b=make('button','Full warning details','warning-details-trigger');b.type='button';b.dataset.warningDetails=item.id;b.setAttribute('aria-label','Full warning details: '+item.name);a.append(b);}}
  return a;}
 function refresh(){const v=get();
  // Preserve Resolved expansion across refresh and linked returns.
  const prevResolved=host.querySelector('.departure-resolved');
  if(prevResolved)resolvedOpen=prevResolved.open;
  host.replaceChildren(make('h2','Before leaving White Orchard'),make('p','Check your in-game journal before speaking to Vesemir at the inn after the griffin hunt. This review reads your saved guide records; opening it marks nothing complete.'));
  if(v.departed)host.append(make('p','Departure is already recorded. Use these entries to verify or correct your records; this guide cannot restore missed in-game content.','risk-note'));
  // Summary always shows separate known-open and unknown counts, including zero. Confirmation only when all four are positively recorded.
  const summary=make('p',model.summaryText(v),'departure-summary');
  host.append(summary);
  // Ordered list: skull first, then quests. Completed can be collapsed under resolved group while retaining cutoff order.
  host.append(make('h3','By cutoff'));
  const openItems=v.ordered.filter(r=>!r.completed);
  openItems.forEach(r=>host.append(row(r)));
  if(v.completed.length){const resolved=make('details','','departure-resolved');resolved.append(make('summary','Resolved ('+v.completed.length+')'));v.completed.forEach(r=>resolved.append(row(r)));resolved.open=resolvedOpen;host.append(resolved);}
  host.append(make('p','You may continue freely. Reviewing or acknowledging a warning does not complete, fail, or acquire anything.'));
  // Sources retained
  if(!section.querySelector('.sw-source-link'))panel.append(link('Sources','velen-sources.html#departure-review'));
  // Warning eligibility includes unrecorded quests. Signature uses warningEligible, not knownOpen alone.
  const eligible=v.warningEligible;
  const signature='departure-risk:'+eligible.map(r=>r.id).join(',');queued=new Set([...queued].filter(id=>id===signature));
  medallion.removeWarnings?.(w=>w.id?.startsWith('departure-risk:')&&(!eligible.length||v.departed||w.id!==signature));
  medallion.reconcileWarnings();
  const root=location.hash.slice(1).split('/')[0],stage=state.stageByView[root];if(!v.departed&&model.atStep(Object.keys(tasks).find(id=>tasks[id].view===root),stage)&&eligible.length){const id=signature;if(!queued.has(id)&&!medallion.getHistory().some(w=>w.id===id)){queued.add(id);medallion.enqueueWarning({id,text:'Before the inn departure: review the remaining missable-content reminders. Unrecorded quests need checking in game.',href:'#'+section.id,isValid:()=>{const n=get();const valid=!n.departed&&n.warningEligible.map(r=>r.id).join(',')===eligible.map(r=>r.id).join(',');if(!valid)queued.delete(id);return valid;},onAcknowledge(){queued.delete(id);}});}}
 }
 for(const event of ['phoenix:route-rendered','phoenix:progress-committed','phoenix:progress-undone'])addEventListener(event,refresh);refresh();
 return {refresh};
};
