'use strict';
/* Issue #4 (implementation/shared-walkthrough-v1): ONE walkthrough component, White Orchard as the template, with
   regional adapters for the White Orchard walkthroughs and The Nilfgaardian Connection.
   Rendering only. Completion, choices, route state, Undo and saved progress stay with their existing owners:
   - checkboxes carry the existing data-objective-check / data-velen-check hooks, so the existing document-level
     handlers run the existing plan / review dialog / catch-up / Undo path;
   - Story & correction controls carry the existing data-story-update, data-undo-deck, data-quest-state,
     data-reconcile-legacy, data-edit-choice (WO) and data-velen-* (Velen) hooks;
   - reading position uses the existing routes (#<quest view>/<stage>, #velen/quest/nilf/<n>).
   Selecting or reading never records completion or a route choice. The objective that is selected inside a stage
   is kept in history.state and in memory for this page session only (no new storage). */
(function(root){
 // ---- LT objective -> reading-stage map (White Orchard). The data files have no such map; this is a proposal
 // recorded in docs/SHARED-WALKTHROUGH-V1.md. Stages without a journal objective stay reachable as setup or
 // follow-up blocks inside the Information dropdown of the nearest selector objective.
 const WO_STAGE_MAP={
  'q-lilac':{ghouls:'1',ride:'ford',inn:'2',ask:'2',garrison:'3',contract:'hunt',ready:'4',leave:'4'},
  'q-missing':{dune:'1',meet:'1',shields:'2',dog:'3',tell:'3',help:'3'},
  'q-pan':{door:'2',pan:'2',inspect:'2',return:'3'},
  'q-cargo':{merchant:'1',tracks:'1',cart:'1',evidence:'1',box:'2',return:'2',chase:'3',unhorse:'3',bandits:'3',grab:'3'},
  'q-death':{brew:'2',deliver:'3'},
  'q-devil':{notice:'1',client:'1',spirit:'2',evidence:'2',diary:'2',drag:'2',well:'2',bestiary:'2',binding:'2',body:'2',down:'3',bracelet:'3',out:'3',surface:'3',leave:'3',prepare:'4',burn:'5',kill:'5',trophy:'5',reward:'5'},
  'q-beast':{herbalist:'2',buckthorn:'river',hunter:'3',ask:'3',dogs:'3',talk:'3',follow:'patrol',site:'patrol',tracks:'patrol',nest:'nest',vesemir:'4',prepare:'4',field:'ambush',kill:'5',trophy:'trophy',reward:'payment'},
  'q-viper':{ruins:'1',report:'1',remains:'2',letter:'2',diagrams:'3'},
  'q-temerian':{orders:'1',cache:'2'},
  'q-deserter':{notes:'1',cache:'2'},
  'q-dirty':{notes:'1',treasure:'3'},
  'q-firestarter':{clues:'forge',trail:'trail',wounds:'suspect',suspect:'suspect',fight:'return',escort:'return',report:'return'},
  'q-incident':{bandits:'fight'}
 };
 // Q2 B nearby entries for Velen. Names come from velen-data-r18.js; context lines are the existing hub card text in
 // velen-nilf-ui.js. Placement on a stage by its place is the LT proposal accepted with the mockups.
 const VELEN_NEARBY={
  2:[{quest:'pyres',href:'#velen/hub/pyres',kind:'side quest',context:'Fits the road: the priest west of Mulbrydale offers it. Completion is recorded in its own hub.'},
     {quest:'mercy',href:'#velen/hub/mercy',kind:'encounter',context:'Fits the road: the riverbank on the approach to the inn. Its decision is recorded in its own hub.'}],
  3:[{label:'Innkeeper',href:'#velen/merchants',kind:'service',context:'At the Inn at the Crossroads: food, drink and a shop conversation.'},
     {label:'Collected notices',href:'#velen/deferred',kind:'notices',context:'Notices from the inn board, kept for later. Collecting a notice is not completing it.'}]
 };
 const sentences=text=>String(text||'').match(/[^.!?]+[.!?]+(?=\s|$)|[^.!?]+$/g)?.map(s=>s.trim()).filter(Boolean)||[];

 // ---- pure model (unit-tested in shared-walkthrough.test.cjs) ---------------------------------------------------
 // rows: [{id,key,label,optional,required,stage}] in journal order. stageOrder: stage ids in reading order.
 function layout(rows,stageOrder){
  const primary=rows.filter(o=>o.required);
  const optional=rows.filter(o=>o.optional);
  const conditional=rows.filter(o=>!o.required&&!o.optional);
  const ownerOf={},extras={};
  for(const o of primary)if(!(o.stage in ownerOf))ownerOf[o.stage]=o.id;
  const index=id=>stageOrder.indexOf(id);
  for(const st of stageOrder){if(st in ownerOf)continue;
   const later=primary.filter(o=>index(o.stage)>index(st)).sort((a,b)=>index(a.stage)-index(b.stage))[0];
   const earlier=primary.filter(o=>index(o.stage)<index(st)).sort((a,b)=>index(b.stage)-index(a.stage))[0];
   const host=later||earlier;if(!host)continue;
   ownerOf[st]=host.id;(extras[host.id]||(extras[host.id]=[])).push({stage:st,when:later?'before':'after'});}
  return {primary,optional,conditional,ownerOf,extras};
 }
 function selectFor({stage,remembered,primary,ownerOf}){
  const valid=id=>primary.some(o=>o.id===id);
  const rem=primary.find(o=>o.id===remembered);
  if(rem&&(rem.stage===stage||ownerOf[stage]===rem.id))return rem.id;
  if(ownerOf[stage]&&valid(ownerOf[stage]))return ownerOf[stage];
  return primary[0]?.id||null;
 }
 // History record identity for a selector warning. Reuses the existing crystal-skull identity of the warning history.
 function warningRecordId(region,risk){return risk==='poi-4'?'crystal-skull-cutoff':'walkthrough-warning:'+region+':'+risk;}
 function acknowledged(history,id,text){return (history||[]).some(r=>r&&r.id===id&&r.text===text);}
 function nextUnfinished(primary,isOpen){return primary.find(o=>isOpen(o))||null;}
 const model={WO_STAGE_MAP,VELEN_NEARBY,sentences,layout,selectFor,warningRecordId,acknowledged,nextUnfinished};
 if(typeof module!=='undefined'&&module.exports){module.exports=model;return;}
 root.PhoenixSharedWalkthroughModel=model;

 // ---- component ------------------------------------------------------------------------------------------------
 root.createPhoenixSharedWalkthrough=function({state,tasks,hubs,engine,navigate}){
  const data=root.PHOENIX_PROGRESS_DATA,catalog=root.PhoenixWarningCatalog,viewport=()=>root.PhoenixViewport||root;
  const make=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n;};
  const memory=new Map();// adapter key -> {objective, warnOpen}
  let feedback=null;// {key,text}: last warning acknowledgment outcome, for this view only
  const medallion=()=>root.__phoenixMedallion||null;
  const history_=()=>{try{return medallion()?.getHistory?.()||[];}catch{return [];}};

  function remembered(key){return history.state?.sharedWalkthrough?.key===key?history.state.sharedWalkthrough.objective:memory.get(key)?.objective;}
  function remember(key,objective){memory.set(key,{...(memory.get(key)||{}),objective});try{history.replaceState({...history.state,sharedWalkthrough:{key,objective}},'',location.href);}catch{}}

  // ---- White Orchard adapter -------------------------------------------------------------------------------------
  function woAdapter(q){
   const t=tasks[q],section=document.getElementById(t.view),map=WO_STAGE_MAP[q]||{},p=state.progress;
   const required=new Set(engine.required(q,p).map(o=>o.id));
   const rows=data.quests[q].objectives.map(o=>({id:o.id,key:o.id.split(':')[1],label:o.label,optional:o.optional===true,required:required.has(o.id),stage:map[o.id.split(':')[1]],choice:o.choice||null,raw:o}));
   const stageOrder=t.stages.map(s=>s.id),lay=layout(rows.filter(r=>r.stage),stageOrder),status=engine.status(q,p),counts=engine.counts(q,p);
   const legacy=!!p.legacy?.[q]&&status==='complete';
   const objState=o=>{const raw=data.objectiveIndex[o.id],closed=engine.closed(raw,p),skipped=p.objectives[o.id]==='skipped',done=p.objectives[o.id]==='done';
    return {done,closed,skipped,disabled:closed||skipped,text:closed?(o.optional&&engine.done(q,p)?'Unavailable — quest finished':'Unavailable — alternate path chosen'):skipped?'Skipped — change Optional status in Story & correction controls.':done?'Completed':raw.branch&&!p.choices[raw.branch[0]]?'Confirm the preceding choice to establish this path.':legacy?'Not individually recorded — saved quest completion covers it.':status==='failed'?'Not completed. This quest remains Failed; objective edits do not reopen it.':'Not completed'};};
   const stageById=id=>t.stages.find(s=>s.id===id);
   const brief=st=>q==='q-lilac'&&root.PhoenixReadingModel?root.PhoenixReadingModel.plan(st)?.brief:null;
   function woWarning(stageIds){for(const id of stageIds){const risk=catalog.context(q,id);if(risk){const d=catalog.get(risk,tasks);if(d)return {id:warningRecordId('white-orchard',risk),short:d.short,sections:[['Consequence',d.consequence],['Cutoff',d.cutoff],['How to avoid it',d.prevention]],href:'#'+t.view+'/'+id};}
     const st=stageById(id);if(st?.warning)return {id:warningRecordId('white-orchard',q+':'+id),short:st.warning,sections:[],href:'#'+t.view+'/'+id};}return null;}
   function nearby(st){const ctx={tasks,engine,state},model=root.PhoenixNearbyModel;return [...new Map((st.detours||[]).filter(d=>tasks[d.task]).map(d=>[d.task,d])).values()].map(d=>{const task=tasks[d.task],service=root.PHOENIX_MAP.markers.find(m=>m.task===d.task&&m.type==='service'),info=model?.state(d.task,ctx)||{};
     return {label:d.label,href:service?'#economy-merchants/'+service.id:'#'+task.view+(d.stage?'/'+d.stage:''),kind:task.type||task.category||'entry',status:info.complete?'Completed':info.missed?'Recorded failed':info.blocked?'Prerequisite needed':info.unknown?'Availability unconfirmed':'',optionalStop:true};});}
   function links(st){return (st.links||[]).filter(l=>tasks[l.task]).map(l=>({label:l.label,href:'#'+tasks[l.task].view+(l.stage?'/'+l.stage:'')}));}
   function stageBlock(st){const b=brief(st);return {title:st.title,place:b?.where||'',actions:sentences(st.text),choices:st.options||[],why:(st.details||[])[0]?.paragraphs||[],info:[...(b?.needed?[{title:'Needed',paragraphs:[b.needed]}]:[]),...(st.details||[]).slice(1).map(d=>({title:d.title,paragraphs:d.paragraphs}))],spoiler:st.spoiler||'',links:links(st),nearby:nearby(st)};}
   return {key:'wo:'+q,region:'White Orchard',section,quest:t.name,rows,lay,stageOrder,counts,status,legacy,
    note:legacy?'Saved complete — objectives unconfirmed. Review it in Story & correction controls.':status==='failed'?'This quest is recorded as Failed.':status==='unavailable'?'This quest is unavailable at your recorded story stage.':status==='complete'?'Quest complete.':'',
    objState,
    currentStage:()=>state.stageByView[t.view]||t.stages[0].id,
    goStage(id){if(id!==(state.stageByView[t.view]||t.stages[0].id))navigate('#'+t.view+'/'+id);},
    reading(stageId){const st=stageById(stageId);return stageBlock(st);},
    extraBlock(stageId){return stageBlock(stageById(stageId));},
    warning(o){const ids=[o.stage,...(lay.extras[o.id]||[]).map(x=>x.stage)];return woWarning(ids);},
    checkAttr:'data-objective-check',
    optionalControls(o){if(!o.optional)return null;const label=make('label','sw-skip','Optional status ');const select=make('select');select.dataset.objectiveSkip=o.id;for(const [v,txt] of [['open','Not skipped'],['skipped','Skipped']]){const op=make('option','',txt);op.value=v;select.append(op);}select.value=p.objectives[o.id]==='skipped'?'skipped':'open';label.append(select);return label;},
    story(){const box=make('div','progress-actions sw-story');
     const b=(text,attr,val='')=>{const x=make('button','',text);x.type='button';x.setAttribute(attr,val);return x;};
     box.append(b('Update story progress','data-story-update'),b('Undo last progress change','data-undo-deck'));
     if(p.legacy?.[q])box.append(b('Review saved completion','data-reconcile-legacy',q));
     const label=make('label','','Quest status '),sel=make('select');sel.dataset.questState=q;for(const [v,txt] of [['active','Not complete'],['failed','Failed']]){const op=make('option','',txt);op.value=v;sel.append(op);}sel.value=status==='failed'?'failed':'active';label.append(sel);box.append(label);
     for(const o of rows.filter(r=>r.choice)){const row=make('p','sw-choice');const btn=b('Record / review choice: '+o.label,'data-edit-choice',o.id);row.append(btn);const v=p.choices[o.choice];if(v){const opt=data.choices[o.choice]?.options.find(x=>x[0]===v);row.append(make('span','quiet',' Recorded: '+(opt?opt[1]:v)));}box.append(row);}
     box.querySelector('[data-undo-deck]').disabled=!state.progressUndo;return box;}};
  }

  // ---- Velen adapter (The Nilfgaardian Connection) -----------------------------------------------------------------
  function velenAdapter(page){
   const owner=root.PhoenixVelenNilfProgress,Q=owner.QUEST,vd=owner.data,eng=owner.engine,velen=root.PHOENIX_VELEN,q=velen.quests.nilf;
   let s;try{s=owner.load(localStorage);}catch{s=null;}
   if(!s||!s.owned)return null;
   const p=s.progress,required=new Set(eng.required(Q,p).map(o=>o.id)),status=eng.status(Q,p),counts=eng.counts(Q,p);
   const rows=vd.quests[Q].objectives.map(o=>({id:o.id,key:o.id.split(':')[1],label:o.label,optional:o.optional===true,required:required.has(o.id),stage:String(o.stage),choice:o.choice||null,raw:o}));
   const stageOrder=q.stages.map((_,i)=>String(i+1)),lay=layout(rows,stageOrder);
   const objState=o=>{const raw=o.raw,closed=eng.closed(raw,p),done=p.objectives[o.id]==='done';
    return {done,closed,skipped:false,disabled:closed,text:closed?(raw.unconfirmedOn&&p.choices.inn===raw.unconfirmedOn?'Unconfirmed on the direct route — neither required nor marked.':raw.route==='inn'&&p.choices.inn===vd.choices.inn.routeValue?'Not required — you went straight to Heatherton. Left unmarked.':'Unavailable — alternate path chosen'):done?'Completed':raw.branch&&!p.choices[raw.branch[0]]&&!required.has(o.id)?'Confirm the preceding choice to establish this path.':s.legacyComplete?'Not individually recorded — saved quest completion covers it.':s.confirmedComplete?'Not individually recorded — your confirmed quest completion covers it.':'Not completed'};};
   const stage=n=>q.stages[Number(n)-1];
   function block(n){const st=stage(n);return {title:st.title,place:st.place||'',actions:sentences(st.text),choices:[],why:st.prep?[st.prep]:[],info:st.choice==='inn'?[{title:'What the inn choice changes',paragraphs:[vd.choices.inn.outcome]}]:[],spoiler:'',links:[],
    nearby:(VELEN_NEARBY[n]||[]).map(x=>({label:x.quest?velen.quests[x.quest].name:x.label,href:x.href,kind:x.kind,context:x.context}))};}
   return {key:'velen:nilf',region:'Velen',section:page,quest:q.name,sourceId:'nilf',related:stageOrder.flatMap(n=>block(n).nearby),rows,lay,stageOrder,counts,status,legacy:!!s.legacyComplete,
    note:s.legacyComplete&&status==='complete'?'Saved complete — objectives unconfirmed. Review it in Story & correction controls.':s.confirmedComplete&&status==='complete'?'Confirmed complete: you recorded that you read Hendrik’s notes on the direct route.':status==='complete'?'Quest complete.':'',
    objState,
    currentStage:()=>{const m=/^#velen\/quest\/nilf\/(\d+)/.exec(location.hash);const n=m?Number(m[1]):1;return String(n>=1&&n<=q.stages.length?n:1);},
    goStage(n){if(n===this.currentStage())return;navigate('#velen/quest/nilf/'+n,{velen:{hubReturn:history.state?.velen?.hubReturn,restoreY:Math.round(viewport().scrollY)}});},
    reading:block,extraBlock:block,
    warning(o){for(const n of [o.stage,...(lay.extras[o.id]||[]).map(x=>x.stage)]){const st=stage(n);if(st?.warning)return {id:warningRecordId('velen.nilf','stage-'+n),short:st.warning,sections:[],href:'#velen/quest/nilf/'+n};}return null;},
    checkAttr:'data-velen-check',
    optionalControls:()=>null,
    story(){const box=make('div','progress-actions sw-story');const b=(text,attr,val='')=>{const x=make('button','',text);x.type='button';x.setAttribute(attr,val);return x;};
     box.append(b(status==='complete'?'Remove whole-quest completion':'Record whole quest complete','data-velen-quest',status==='complete'?'false':'true'));
     const u=b('Undo last progress change','data-velen-undo');u.disabled=!s.undo;box.append(u);
     if(s.legacyComplete)box.append(b('Review saved completion','data-velen-reconcile'));
     for(const o of rows.filter(r=>r.choice)){const row=make('p','sw-choice');row.append(b('Record / review choice: '+o.label,'data-velen-edit-choice',o.id));const v=p.choices[o.choice];if(v){const opt=vd.choices[o.choice].options.find(x=>x[0]===v);row.append(make('span','quiet',' Recorded: '+(opt?opt[1]:v)));}box.append(row);}
     return box;}};
  }

  function velenReadingAdapter(page){
   const {id,q,index,story,goStage}=root.PhoenixVelenReadingPages.get(page);
   const rows=q.stages.map((st,i)=>({id:String(i+1),label:st.title,stage:String(i+1),required:true}));
   const lay=layout(rows,rows.map(row=>row.stage));
   const key='velen:'+id;
   const marks=memory.get(key)?.stageMarks||new Set();
   function reading(n){
    const st=q.stages[Number(n)-1],note=st.note||st.prep;
    return {title:st.title,place:st.place||'',actions:st.actions||sentences(st.text),choices:[],why:[],info:note?[{title:'Field notes',paragraphs:[note]}]:[],links:(st.links||[]).map(([label,id])=>({label,href:'#velen/lead/'+id})),nearby:[],spoiler:st.spoiler||''};
   }
   const related=q.stages.flatMap(st=>(st.links||[]).map(([label,id])=>({label,href:'#velen/lead/'+id})));
   if(id==='pyres'||id==='mercy'){
    const other=id==='pyres'?'mercy':'pyres';
    related.push({label:root.PHOENIX_VELEN.quests[other].name,href:'#velen/hub/'+other});
   }
   return {key,region:'Velen',section:page,quest:q.name,sourceId:id,related,rows,lay,reading,story,goStage,readOnly:true,
    toggleStage(stage,checked){if(checked)marks.add(stage);else marks.delete(stage);memory.set(key,{...memory.get(key),stageMarks:marks});},
    currentStage:()=>String(index+1),objState:o=>({done:marks.has(o.id),disabled:false,text:'Not completed'}),
    warning(o){const text=q.stages[Number(o.stage)-1].warning;return text?{id:warningRecordId('velen.'+id,'stage-'+o.stage),short:text,sections:[],href:'#velen/quest/'+id+'/'+o.stage}:null;}};
  }

  // ---- shared rendering ------------------------------------------------------------------------------------------
  function checkbox(a,o,st){const label=make('label','sw-check');const input=make('input');input.type='checkbox';if(a.readOnly){input.addEventListener('change',()=>{a.toggleStage(o.id,input.checked);const box=input.closest('.sw-box');box.classList.toggle('done',input.checked);input.setAttribute('aria-label',(input.checked?'Completed: ':'Mark complete: ')+o.label);const name=box.querySelector('.sw-name');name.querySelector('.sw-state')?.remove();if(input.checked)name.append(make('span','sw-state','Completed'));});}else input.setAttribute(a.checkAttr,o.id);input.checked=st.done;input.disabled=st.disabled;input.setAttribute('aria-label',(st.done?'Completed: ':'Mark complete: ')+o.label);label.append(input,make('span','sw-check-mark'));return label;}
  function render(a){
   const host=a.section.querySelector('.reading-panel');if(!host)return;
   a.section.classList.add('sw-page');
   const old=host.querySelector(':scope>.sw-walkthrough');const oldRail=old?.querySelector('.sw-rail');
   const pageY=viewport().scrollY;
   const stage=a.currentStage();
   let selected=selectFor({stage,remembered:remembered(a.key),primary:a.lay.primary,ownerOf:a.lay.ownerOf});
   const sel=a.lay.primary.find(o=>o.id===selected);
   const mem=memory.get(a.key)||{};if(mem.objective!==selected)remember(a.key,selected);
   const root_=make('section','sw-walkthrough');root_.dataset.swKey=a.key;root_.dataset.swSelected=selected;
   // selector
   const selector=make('section','sw-selector');selector.setAttribute('aria-label',a.readOnly?'Walkthrough stages':'Objectives');
   const warn=sel?a.warning(sel):null,acked=warn?acknowledged(history_(),warn.id,warn.short):false,open=!!(warn&&mem.warnOpen===selected);
   const wrap=make('div','sw-wolf-wrap'),wolf=make('button','sw-wolf');wolf.type='button';const marker=make('span','wolf-pointer sw-marker'),wi=make('img','wolf-pointer-art');marker.setAttribute('aria-hidden','true');wi.src='visual-art/wolf-pointer.webp';wi.alt='';wi.draggable=false;marker.append(wi);wolf.append(marker);
   if(warn){wolf.append(make('span','sw-wolf-badge'+(acked?' acked':' unread'),acked?'✓':'!'));wolf.setAttribute('aria-expanded',String(open));wolf.setAttribute('aria-controls','sw-warning-panel');wolf.setAttribute('aria-label',(open?'Hide':'Show')+' warning for this objective'+(acked?' (acknowledged)':' (new)'));
    wolf.onclick=()=>{memory.set(a.key,{...memory.get(a.key),warnOpen:open?null:selected});feedback=null;render(a);root_.isConnected;const w=a.section.querySelector('.sw-wolf');w?.focus({preventScroll:true});};}
   else{wolf.disabled=true;wolf.setAttribute('aria-label','No warning for this objective');}
   wrap.append(wolf,make('p','sw-wolf-caption'+(acked?' acked':''),warn?((acked?'Warning, acknowledged':'Warning')+(open?' · tap the wolf to close':' · tap the wolf')):''));selector.append(wrap);
   if(warn&&open){const panel=make('div','sw-warning-panel');panel.id='sw-warning-panel';panel.setAttribute('role','region');panel.setAttribute('aria-label','Warning');panel.append(make('h3','',warn.short));
    const row=make('div','sw-ack-row');
    if(acked)row.append(make('span','sw-ack-done','✓ Acknowledged. The wolf will not mark this warning as new again unless its text changes.'));
    else{const g=make('button','sw-ack-btn','Got it');g.type='button';g.setAttribute('aria-label','Got it: acknowledge this warning');g.onclick=()=>{let result='unavailable';try{result=medallion()?.acknowledgeRecord?.({id:warn.id,text:warn.short,href:warn.href})||'unavailable';}catch{result='unavailable';}
      feedback={key:a.key,text:result==='saved'?'':result==='blocked'?'Your saved warning history could not be read, so it is kept unchanged. This acknowledgment lasts for this visit only.':'Saving is unavailable. This acknowledgment lasts for this visit only.'};render(a);a.section.querySelector('.sw-wolf')?.focus({preventScroll:true});};
     row.append(g,make('span','sw-ack-hint','Clears the new-warning mark for this warning. Does not change progress.'));}
    panel.append(row);
    if(feedback?.key===a.key&&feedback.text)panel.append(make('p','sw-ack-feedback',feedback.text));
    if(warn.sections.length){const dl=make('dl');for(const [k,v] of warn.sections)dl.append(make('dt','',k),make('dd','',v));panel.append(dl);}
    panel.append(make('p','sw-provenance','Shown for: '+sel.label+' Opening this panel does not change progress.'));selector.append(panel);}
   const rail=make('div','sw-rail');rail.setAttribute('role','listbox');rail.setAttribute('aria-label',a.quest+(a.readOnly?' stages.':' objectives.')+' Swipe or use arrow keys to choose.');rail.tabIndex=-1;
   for(const o of a.lay.primary){const st=a.objState(o),isSel=o.id===selected,box=make('div','sw-box'+(isSel?' selected':'')+(st.done?' done':'')+(st.disabled?' unavailable':''));box.dataset.swObjective=o.id;box.setAttribute('role','option');box.setAttribute('aria-selected',String(isSel));box.tabIndex=isSel?0:-1;
    if(isSel)box.append(checkbox(a,o,st));
    else{const c=make('button','sw-check sw-check-proxy');c.type='button';c.tabIndex=-1;c.setAttribute('aria-label','Select objective: '+o.label);c.append(make('span','sw-check-mark'+(st.done?' on':'')));c.onclick=e=>{e.stopPropagation();choose(a,o.id,true);};box.append(c);}
    const name=make('div','sw-name',o.label);if(st.done||st.disabled)name.append(make('span','sw-state',st.done?'Completed':st.text));box.append(name);
    if(isSel&&!st.done&&st.text!=='Not completed')box.setAttribute('aria-description',st.text);
    box.addEventListener('click',()=>{if(!box.classList.contains('selected'))choose(a,o.id,true);});rail.append(box);}
   rail.addEventListener('keydown',e=>{const i=a.lay.primary.findIndex(o=>o.id===selected);const n=e.key==='ArrowRight'?i+1:e.key==='ArrowLeft'?i-1:e.key==='Home'?0:e.key==='End'?a.lay.primary.length-1:-2;if(n<-1)return;e.preventDefault();const o=a.lay.primary[Math.max(0,Math.min(a.lay.primary.length-1,n))];if(o&&o.id!==selected)choose(a,o.id,true,true);});
   let settle=0;rail.addEventListener('scroll',()=>{clearTimeout(settle);settle=setTimeout(()=>{if(!rail.isConnected||rail.dataset.programmatic)return;const r=rail.getBoundingClientRect(),mid=r.left+r.width/2;let best=null,dist=1e9;for(const b of rail.children){const bb=b.getBoundingClientRect(),d=Math.abs(bb.left+bb.width/2-mid);if(d<dist){dist=d;best=b;}}if(best&&dist<r.width*.25&&best.dataset.swObjective!==selected){const from=a.lay.primary.findIndex(o=>o.id===selected),to=a.lay.primary.findIndex(o=>o.id===best.dataset.swObjective);choose(a,a.lay.primary[from+Math.sign(to-from)].id,false);}},160);},{passive:true});
   selector.append(rail);
   const idx=a.lay.primary.findIndex(o=>o.id===selected)+1,done=a.lay.primary.filter(o=>a.objState(o).done).length;
   const line=make('div','sw-status');line.append(make('span','sw-position',(a.readOnly?'STAGE ':'OBJECTIVE ')+idx+' OF '+a.lay.primary.length));
   if(!a.readOnly){
   const nu=nextUnfinished(a.lay.primary,o=>{const st=a.objState(o);return !st.done&&!st.disabled;});
   if(nu&&nu.id!==selected){const n=make('button','sw-next','Next unfinished →');n.type='button';n.setAttribute('aria-label','Go to next unfinished objective: '+nu.label);n.onclick=()=>choose(a,nu.id,true,true);line.append(n);}
   else line.append(make('span','sw-on-next',nu?'This is your next unfinished objective':'No unfinished required objective'));
   const pr=make('div','sw-progress');const bar=make('span','sw-bar');bar.setAttribute('aria-hidden','true');const fill=make('i');fill.style.width=(a.counts.total?100*a.counts.done/a.counts.total:0)+'%';bar.append(fill);
   pr.append(make('span','',a.counts.done+' of '+a.counts.total+' required completed'),bar);line.append(pr);
   const off=a.rows.filter(o=>!o.required&&!o.optional&&o.stage),closed=off.filter(o=>a.objState(o).closed),cond=off.filter(o=>!a.objState(o).closed);
   if(cond.length)line.append(make('span','sw-route-note','Route-dependent, not counted yet: '+cond.map(o=>o.label).join(' ')));
   if(closed.length)line.append(make('span','sw-route-note','Not on your recorded route, not counted: '+closed.map(o=>o.label).join(' ')));
   if(a.note)line.append(make('span','sw-route-note sw-quest-note',a.note));
   }
   if(a.readOnly)line.append(make('span','sw-route-note','Stage checkmarks last for this visit.'));
   selector.append(line);root_.append(selector);
   // reading
   if(sel){const r=a.reading(sel.stage),reading=make('section','sw-reading');reading.setAttribute('aria-label','Instructions for the selected objective');
    reading.append(make('h2','',r.title));if(r.place)reading.append(make('p','sw-place',r.place));reading.append(make('span','sw-ornament'));
    const fo=make('div','sw-for');fo.append(make('span','sw-label','SELECTED OBJECTIVE'),make('strong','',sel.label));if(!a.readOnly)reading.append(fo);
    reading.append(make('h3','','WHAT TO DO'));const ol=make('ol','sw-actions');for(const x of r.actions)ol.append(make('li','',x));reading.append(ol);
    if(r.choices.length){reading.append(make('h3','','AVAILABLE CHOICES'));const ul=make('ul','sw-choices');for(const c of r.choices)ul.append(make('li','',c));reading.append(ul);}
    if(r.why.length){reading.append(make('h3','','WHY'));const ex=make('div','sw-explain');for(const x of r.why)ex.append(make('p','',x));reading.append(ex);}
    // Related optional tasks: optional journal objectives for this stage, then Nearby (Q2 B).
    const optObjs=a.lay.optional.filter(o=>o.stage===sel.stage),near=r.nearby,opt=make('details','sw-row');opt.dataset.swRow='optional';if(mem.rows?.optional)opt.open=true;
    const sum=make('summary');sum.append('Related optional tasks ',make('span','sw-count','· '+(optObjs.length+near.length)));opt.append(sum);const ob=make('div','sw-row-body');
    ob.append(make('h3','','OPTIONAL OBJECTIVES'));
    for(const o of optObjs){const st=a.objState(o),it=make('div','sw-opt');it.append(checkbox(a,o,st));const t=make('div');t.append(make('span','sw-kind','Optional journal objective'),make('span','',o.label));if(st.text!=='Not completed')t.append(make('span','sw-state',st.text));const extra=a.optionalControls(o);if(extra)t.append(extra);it.append(t);ob.append(it);}
    if(!optObjs.length)ob.append(make('p','sw-empty','No optional objective is linked to this objective.'));
    ob.append(make('h3','','NEARBY'));
    const nearbyItem=n=>{const it=make('div','sw-opt sw-near'),t=make('div'),link=make('a','sw-link',n.label+' →');link.href=n.href;if(n.optionalStop)link.dataset.optionalStop='true';t.append(make('span','sw-kind','Nearby · '+n.kind),link);if(n.status)t.append(make('span','sw-state',n.status));if(n.context)t.append(make('p','sw-context',n.context));it.append(make('span','sw-pin','◆'),t);return it;};
    for(const n of near)ob.append(nearbyItem(n));if(!near.length)ob.append(make('p','sw-empty','No nearby activity is recorded for this objective.'));
    opt.append(ob);if(optObjs.length||(!a.sourceId&&near.length))reading.append(opt);
    // Information: further stage detail, unmapped setup/follow-up stages, route links and spoilers.
    const inf=make('details','sw-row');inf.dataset.swRow='info';if(mem.rows?.info||(mem.rows?.info===undefined&&stage!==sel.stage))inf.open=true;/* a stage without its own objective opens here */inf.append(make('summary','','Information'));const ib=make('div','sw-row-body');let any=false;
    const para=(host,list)=>{for(const x of list)host.append(make('p','',x));};
    for(const b of r.info){ib.append(make('h3','',b.title.toUpperCase()));para(ib,b.paragraphs);any=true;}
    if(r.links.length&&!a.sourceId){ib.append(make('h3','','CONTINUE THE ROUTE'));for(const l of r.links){const x=make('a','sw-link',l.label+' →');x.href=l.href;ib.append(x);}any=true;}
    for(const extra of a.lay.extras[sel.id]||[]){const b=a.extraBlock(extra.stage),box=make('section','sw-extra');box.dataset.swStage=extra.stage;box.append(make('h3','',(extra.when==='before'?'BEFORE THIS: ':'AFTERWARDS: ')+b.title.toUpperCase()));if(b.place)box.append(make('p','sw-place',b.place));
     const ol2=make('ol','sw-actions');for(const x of b.actions)ol2.append(make('li','',x));box.append(ol2);
     if(b.choices.length){const ul=make('ul','sw-choices');for(const c of b.choices)ul.append(make('li','',c));box.append(ul);}para(box,b.why);for(const d of b.info){box.append(make('h4','',d.title));para(box,d.paragraphs);}
     for(const l of b.links){const x=make('a','sw-link',l.label+' →');x.href=l.href;box.append(x);}for(const n of b.nearby)box.append(nearbyItem(n));
     if(b.spoiler){const sp=make('details','sw-spoiler');sp.append(make('summary','','Consequences · Spoilers'),make('p','',b.spoiler));box.append(sp);}
     ib.append(box);any=true;}
    if(r.spoiler){const sp=make('details','sw-spoiler');sp.append(make('summary','','Consequences · Spoilers'),make('p','',r.spoiler));ib.append(sp);any=true;}
    if(any){inf.append(ib);reading.append(inf);}
    for(const d of [opt,inf])d.addEventListener('toggle',()=>{const m=memory.get(a.key)||{};memory.set(a.key,{...m,rows:{...(m.rows||{}),[d.dataset.swRow]:d.open}});});
    root_.append(reading);}
   if(a.related?.length){
    const related=make('section','sw-reading sw-related'),list=make('ul','sw-related-list');
    related.append(make('h2','','Related quests and tasks'),list);
    for(const item of new Map(a.related.map(item=>[item.href,item])).values()){
     const row=make('li'),link=make('a','sw-link',item.label+' →');link.href=item.href;
     row.append(link);if(item.context)row.append(make('p','sw-context',item.context));list.append(row);
    }
    root_.append(related);
   }
   if(a.sourceId){
    for(const item of host.querySelectorAll(':scope>details.sources'))item.hidden=true;
    if(!a.section.querySelector(':scope>.sw-source-link')){
     const source=make('a','sw-source-link','Sources');
     source.href='velen-sources.html#'+a.sourceId;a.section.append(source);
    }
   }
   if(old)old.replaceWith(root_);else host.prepend(root_);
   // Story & correction controls (P2 A): existing controls, re-hosted as one quest-level row.
   if(a.story){let story=host.querySelector(':scope>.sw-story-row');if(!story){story=make('details','sw-row sw-story-row');story.append(make('summary','','Story & correction controls'));const body=make('div','sw-row-body');story.append(body);const save=host.querySelector(':scope>.save-message');const sources=[...host.querySelectorAll(':scope>details')].find(d=>d.querySelector('summary')?.textContent.startsWith('Sources'));const anchor=save||sources;if(anchor)anchor.before(story);else host.append(story);}
   story.querySelector('.sw-row-body').replaceChildren(a.story());}
   const box=rail.querySelector('.selected');
   if(box){
    rail.dataset.programmatic='1';
    const prior=a.section.dataset.swRestoreRail;
    delete a.section.dataset.swRestoreRail;
    const keep=prior!=null?Number(prior):old?.dataset.swKey===a.key&&old.dataset.swSelected===selected?oldRail?.scrollLeft:null;
    if(keep!=null)rail.scrollLeft=keep;
    requestAnimationFrame(()=>{
     if(!rail.isConnected)return;
     if(keep!=null){
      rail.scrollLeft=keep;
      if(old)viewport().scrollTo(0,pageY);
     }else{
      const card=box.getBoundingClientRect(),frame=rail.getBoundingClientRect();
      rail.scrollLeft+=card.left+card.width/2-frame.left-frame.width/2;
     }
     setTimeout(()=>{delete rail.dataset.programmatic;},100);
    });
   }
  }
  function choose(a,id,scroll,focus){
   const o=a.lay.primary.find(x=>x.id===id);if(!o)return;
   remember(a.key,id);const m=memory.get(a.key);memory.set(a.key,{...m,warnOpen:null});feedback=null;
   const target=a.lay.ownerOf[o.stage]===o.id||!a.lay.ownerOf[o.stage]?o.stage:o.stage;
   if(target!==a.currentStage()){a.goStage(target);remember(a.key,id);return;}// the route render repaints
   render(a);if(focus)a.section.querySelector('.sw-box.selected')?.focus({preventScroll:true});
  }

  // ---- mounting --------------------------------------------------------------------------------------------------
  const woQuests=Object.keys(data.quests).filter(q=>tasks[q]?.stages&&WO_STAGE_MAP[q]);
  for(const q of woQuests)document.getElementById(tasks[q].view)?.classList.add('sw-page');
  function current(){const rootId=(location.hash||'#home').slice(1).split('/')[0];
   const q=woQuests.find(id=>tasks[id].view===rootId);if(q)return woAdapter(q);
   if(rootId==='velen'){const page=document.querySelector('#velen-screen .velen-nilf-page');if(page)return velenAdapter(page);const reading=document.querySelector('#velen-screen>.velen-reading-page');if(reading)return velenReadingAdapter(reading);}return null;}
  function isShowing(){const v=document.querySelector('.view:not([hidden])');return !!(v&&(v.classList.contains('sw-page')&&v.querySelector('.sw-walkthrough')||v.querySelector('#velen-screen>.sw-page .sw-walkthrough')));}
  function refresh(){const a=current();try{medallion()?.reconcileWarnings?.();}catch{}if(!a)return;const focusInRail=document.activeElement?.closest?.('.sw-rail');try{render(a);}catch(e){console.error('shared walkthrough',e);a.section.classList.remove('sw-page');return;}try{medallion()?.reconcileWarnings?.();}catch{}if(focusInRail)a.section.querySelector('.sw-box.selected')?.focus({preventScroll:true});}
  for(const ev of ['phoenix:route-rendered','phoenix:progress-committed','phoenix:progress-undone'])addEventListener(ev,()=>requestAnimationFrame(refresh));
  const velenScreen=document.getElementById('velen-screen');
  if(velenScreen)new MutationObserver(()=>{const page=velenScreen.querySelector(':scope>:is(.velen-nilf-page,.velen-reading-page)');if(page&&!page.querySelector('.sw-walkthrough'))refresh();/* render() adds .sw-page only when the owner is active */}).observe(velenScreen,{childList:true});
  refresh();
  return {refresh,isShowing,model};
 };
})(typeof window==='undefined'?null:window);
