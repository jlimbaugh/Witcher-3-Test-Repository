'use strict';
(() => {
  // A stable primary home, shared completion, and contextual recommendations.
  // This hand-curated sample proves navigation; it is not a level/access eligibility engine.
  const {tasks,hubs,groups}=window.PHOENIX_ROUTE;
  const utilityTypes=new Set(['service','buff','signpost']);
  Object.entries(tasks).forEach(([id,t])=>{t.mapOnly=id==='cow-pasture-warning'||!t.stages&&id!=='gwent-start'&&window.PHOENIX_MAP.markers.some(p=>p.task===id&&utilityTypes.has(p.type));});
  hubs.forEach(h=>{h.items=h.items.filter(id=>!tasks[id].mapOnly&&id!=='cow-pasture-warning');});
  // Shared recommendations follow the same physical route, with one identity.
  const add=(hub,ids)=>{const h=hubs.find(h=>h.id===hub);ids.forEach(id=>{if(!h.items.includes(id))h.items.push(id);});};
  add('hub-hunt',['q-pan','q-cargo','pop-sawmill','q-deserter','pop-north','monsternest-1']);
  add('hub-viper',['q-temerian','q-deserter']);
  add('hub-missing',['q-viper']);
  tasks['departure-review'].sections=tasks['departure-review'].sections.map(([heading,text])=>[heading,heading==='Action'?'Finish the departure-sensitive quests you want before the inn transition. The risk checklist above reflects your recorded progress. Other discoveries are not departure warnings.':text]);
  Object.entries(window.PHOENIX_PROGRESS_DATA.quests).forEach(([id,q])=>{if(!Number.isFinite(tasks[id].level)&&Number.isFinite(q.level))tasks[id].level=q.level;});
  const progressEngine=window.createPhoenixProgress(window.PHOENIX_PROGRESS_DATA,tasks,hubs);
  const legacyViews={'q-lilac':'quest-lilac','q-beast':'quest-beast','loc-forge':'location-forge','pop-cemetery':'discovery-cemetery','departure-review':'departure-check'};
  Object.entries(legacyViews).forEach(([id,view])=>tasks[id].view=view);
  const stages=tasks['q-firestarter'].stages.map(s=>s.id);
  const esc=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const para=text=>'<p>'+esc(text)+'</p>';
  // Content and navigation share one registry, avoiding hand-synced routing lists.
  Object.entries(tasks).forEach(([id,task])=>{
    const section=document.createElement('section');section.className='view scene'+(task.stages?' walkthrough-scene':'');section.id=task.view;section.hidden=true;section.dataset.task=id;section.setAttribute('aria-labelledby',task.view+'-title');
    const meta='<details class="route-context"><summary>Why this stop belongs here</summary>'+para(task.why)+'<h2>Availability & preparation</h2>'+para(task.requirements)+(task.level?para('Suggested quest level '+task.level+'. Opportunities are hand-curated; story access and encounter readiness still apply.'):'')+'<h2>Useful reward</h2>'+para(task.reward)+'</details>';
    const links='<div class="stage-links"><a href="#whiteorchard-tree" data-return-hub>Return to exact hub</a><a href="#whiteorchard-map'+('/'+esc(id))+'">Regional map</a></div>';
    const locationLink=task.locationMap?'<a class="map-location-link" href="#whiteorchard-map/'+esc(id)+'">Show location on our map →</a>':'';
    const stageHTML=task.stages?'<div class="stage-tools">'+links+'<label>Stage <select data-stage-select aria-label="Choose walkthrough stage">'+task.stages.map(st=>'<option value="'+esc(st.id)+'">'+esc(st.title)+'</option>').join('')+'</select></label></div><div class="stage-nav" aria-label="Walkthrough stages"><button type="button" data-stage-prev>← Previous</button><span data-stage-count aria-live="polite"></span><button type="button" data-stage-next>Next →</button></div><div class="stage-panel" id="'+task.view+'-panel">'+task.stages.map((st,i)=>'<section class="walk-stage" data-stage="'+esc(st.id)+'" hidden><div class="stage-content"><span class="step-number" aria-hidden="true">'+String(i+1).padStart(2,'0')+'</span><div><h2>'+esc(st.title)+'</h2>'+(st.warning?'<p class="risk-note"><strong>Before this step:</strong> '+esc(st.warning)+'</p>':'')+para(st.text)+(st.spoiler?'<details><summary>Story outcome & choices · Spoilers</summary>'+para(st.spoiler)+'</details>':'')+'</div></div></section>').join('')+'</div>':links+locationLink+task.sections.map(([title,text])=>'<h2>'+esc(title)+'</h2>'+para(text)).join('');
    section.innerHTML='<div class="scene-inner"><nav class="crumbs" aria-label="Breadcrumb"><a href="#home">Console</a><span>/</span><a href="#whiteorchard-tree">Quests</a><span>/</span><a href="#whiteorchard-tree/'+esc(task.home)+'">Quest hub</a></nav><div class="page-heading"><p class="eyebrow">'+(task.stages?'QUEST WALKTHROUGH':'FIELD NOTE')+' / WHITE ORCHARD</p><h1 id="'+task.view+'-title">'+esc(task.name)+'</h1><p class="lead">'+esc(task.intro)+'</p></div><article class="reading-panel">'+meta+stageHTML+'<details class="sources"><summary>Sources & route notes</summary>'+task.sources.map(url=>'<p><a href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">Read source reference ↗</a></p>').join('')+'<p>Route grouping is editorial guidance. Encounter levels, availability and rewards still need Xbox field acceptance. This page records neither game state nor automatic completion.</p></details><p class="save-message" data-save-message aria-live="polite"></p></article></div>';
    const prior=document.getElementById(task.view);if(prior)prior.replaceWith(section);else document.querySelector('main').append(section);
  });
  const placeIndex=document.querySelector('#whiteorchard-pois .reading-panel');
  placeIndex.innerHTML='<label>Find a discovery or service<input type="search" data-place-search placeholder="Name or quest hub…"></label><div data-place-list></div>';
  const placeRows=Object.entries(tasks).filter(([id,t])=>!t.stages&&window.PHOENIX_MAP.markers.some(p=>p.task===id));
  function drawPlaces(query=''){const list=placeIndex.querySelector('[data-place-list]');list.innerHTML=placeRows.filter(([id,t])=>(t.name+' '+hubs.find(h=>h.id===t.home).name).toLowerCase().includes(query.toLowerCase())).map(([id,t])=>'<p><a href="#whiteorchard-tree/'+esc(t.home)+'/'+esc(id)+'">'+esc(t.name)+'</a></p>').join('')||'<p>No matching places.</p>';}
  function repairPlaceLinks(){placeIndex.querySelectorAll('a').forEach(a=>{const id=a.hash.split('/').pop(),task=tasks[id];if(task?.mapOnly){const service=window.PHOENIX_MAP.markers.find(p=>p.task===id&&p.type==='service');a.href=service?'#economy-merchants/'+service.id:'#whiteorchard-map/'+id;}});}
  placeIndex.querySelector('[data-place-search]').addEventListener('input',e=>{drawPlaces(e.target.value);repairPlaceLinks();});drawPlaces();repairPlaceLinks();
  const key = 'phoenix.whiteorchard.interaction.v1';
  const legacyKey = 'phoenix.whiteorchard.pilot.v1';
  let views = [...document.querySelectorAll('.view')];
  const hubById = id => hubs.find(h => h.id === id);
  const validTask = id => Object.hasOwn(tasks,id);
  const validHub = id => Boolean(hubById(id));
  const treeLink = (hub,task) => '#whiteorchard-tree/'+hub+(task?'/'+task:'');
  let currentRoot = '';
  let lastRenderedURL = '';
  let saveAvailable = true;
  let scrollTimer;
  let nativeMap;
  let progressUI;
  const state = {version:1,completed:{},selectedHub:'hub-arrival',expandedHub:'hub-arrival',windowStart:0,treeReturn:null,lastStage:'forge',lastContent:null,lastWalkthrough:false,lastWalkthroughView:null,stageByView:{},map:{type:'all',search:'',showCompleted:false}};
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const saved = JSON.parse(raw);
      if (saved && saved.version === 1) {
        Object.keys(tasks).forEach(id => {state.completed[id] = saved.completed?.[id] === true;});
        if (validHub(saved.selectedHub)) state.selectedHub = saved.selectedHub;
        if (saved.expandedHub === null || validHub(saved.expandedHub)) state.expandedHub = saved.expandedHub;
        if (Number.isInteger(saved.windowStart)) state.windowStart = Math.max(0,Math.min(Math.max(0,groups.length-2),saved.windowStart));
        if (stages.includes(saved.lastStage)) state.lastStage = saved.lastStage;
        state.lastWalkthrough = saved.lastWalkthrough === true;
        Object.values(tasks).filter(t=>t.stages).forEach(t=>{const st=saved.stageByView?.[t.view];if(t.stages.some(x=>x.id===st))state.stageByView[t.view]=st;});
        if(!state.stageByView['walkthrough-firestarter'])state.stageByView['walkthrough-firestarter']=state.lastStage;
        if(Object.values(tasks).some(t=>t.stages&&t.view===saved.lastWalkthroughView))state.lastWalkthroughView=saved.lastWalkthroughView;
        else if(state.lastWalkthrough)state.lastWalkthroughView='walkthrough-firestarter';
        if (validTask(saved.lastContent?.task) && [...Object.values(tasks).map(t=>t.view),'quest-firestarter'].includes(saved.lastContent.view)) state.lastContent = saved.lastContent;
        if (validHub(saved.treeReturn?.expandedHub) || saved.treeReturn?.expandedHub === null) state.treeReturn = saved.treeReturn;
        if (saved.map) state.map = {type:["all", "pop", "diagram", "service", "gwent", "notice", "abandoned", "buff", "camp", "entrance", "guarded", "hidden", "nest", "poi", "signpost", "cache", "quest", "contract"].includes(saved.map.type)?saved.map.type:'all',search:typeof saved.map.search==='string'?saved.map.search.slice(0,100):'',showCompleted:saved.map.showCompleted===true,view:saved.map.view};
      }
    } else {
      // Read, but never overwrite or delete, the old pilot save.
      const legacy = JSON.parse(localStorage.getItem(legacyKey) || '{}');
      if (legacy?.firestarter === true) state.completed['q-firestarter'] = true;
    }
  } catch { saveAvailable = false; }
  state.progress=progressEngine.init((()=>{try{return JSON.parse(localStorage.getItem(key)||'{}').progress||{};}catch{return {};}})(),state.completed);
  try{const old=JSON.parse(localStorage.getItem(key)||'{}');state.groupOpen=old.groupOpen||{};state.routeUpdates=Array.isArray(old.routeUpdates)?old.routeUpdates.filter(u=>validHub(u.hub)&&Array.isArray(u.activities)):[];state.progressUndo=old.progressUndo||null;state.mapContext=old.mapContext||null;state.noticeRead=Array.isArray(old.noticeRead)?old.noticeRead:[];}catch{}
  state.groupOpen ||= {};state.routeUpdates ||= [];
  if ('scrollRestoration'  in history) history.scrollRestoration = 'manual';
  function persist() {
    try {localStorage.setItem(key,JSON.stringify(state));saveAvailable=true;}
    catch {saveAvailable=false;}
    document.querySelectorAll('[data-save-message]').forEach(el => {el.textContent=saveAvailable?'Progress and your place save in this browser.':'Saving is unavailable. Changes last for this visit only.';});
  }
  function taskAnchor(id,home=false) {
    const a=document.createElement('a');
    a.textContent=tasks[id].name;
    a.href=home?treeLink(tasks[id].home,id):'#'+tasks[id].view;
    if (!home) a.dataset.taskLink=id;
    return a;
  }
  // Build once: a task's DOM identity and home never move when completion changes.
  const tree=document.querySelector('[data-story-tree]');
  const wires=document.createElementNS('http://www.w3.org/2000/svg','svg');
  wires.classList.add('tree-wires');wires.setAttribute('aria-hidden','true');tree.append(wires);
  function drawConnections(){
    if(tree.closest('[hidden]'))return;
    const box=tree.getBoundingClientRect();wires.setAttribute('viewBox',`0 0 ${box.width} ${box.height}`);wires.replaceChildren();
    const mains=hubs.filter(h=>!h.side);
    const edges=[...mains.slice(1).map((h,i)=>[mains[i].id,h.id]),...hubs.filter(h=>h.side).map(h=>[mains.find(m=>m.group===h.group).id,h.id])];
    edges.forEach(([from,to])=>{
      const a=document.getElementById(from),b=document.getElementById(to);if(a.hidden||b.hidden)return;
      const ar=a.querySelector('button').getBoundingClientRect(),br=b.querySelector('button').getBoundingClientRect();
      const side=b.classList.contains('side-branch');
      const narrow=true;
      const x1=side?ar.left+8-box.left:ar.right-box.left,y1=side?ar.bottom-box.top:ar.top+ar.height/2-box.top;
      const x2=br.left-box.left,y2=br.top+br.height/2-box.top;
      const path=document.createElementNS(wires.namespaceURI,'path');
      path.setAttribute('d',side?(narrow?`M ${ar.left-box.left+8} ${ar.bottom-box.top} V ${y2} H ${x2}`:`M ${x1} ${y1} H ${(x1+x2)/2} V ${y2} H ${x2}`):`M ${x1} ${y1} H ${(x1+x2)/2} V ${y2} H ${x2}`);wires.append(path);
    });
  }
  new ResizeObserver(drawConnections).observe(tree);
  function arrivalCue(el){const row=el.closest('.activity-row')||el;row.classList.add('arrived');setTimeout(()=>row.classList.remove('arrived'),2400);}

  const lanes=groups.map((name,index)=>{
    const group=document.createElement('section');group.className='story-group';group.dataset.storyGroup=index;group.setAttribute('aria-label',name);
    const main=document.createElement('div');main.className='main-lane';const branches=document.createElement('div');branches.className='branch-lane';const heading=document.createElement('p');heading.className='bracket-round';heading.textContent=name;group.append(heading,main,branches);tree.append(group);return {group,main,branches};
  });
  hubs.forEach(hub=>{
    const block=document.createElement('article');
    block.className='hub-block'+(hub.side?' side-branch':'');block.id=hub.id;block.dataset.group=hub.group;
    const button=document.createElement('button');button.type='button';button.className='hub-toggle';button.id=hub.id+'-toggle';button.setAttribute('aria-controls',hub.id+'-activities');button.setAttribute('aria-expanded','false');
    const label=document.createElement('span');label.className='eyebrow';label.textContent=hub.label;
    const name=document.createElement('span');name.className='hub-name';name.textContent=hub.name;
    const arrow=document.createElement('span');arrow.className='hub-arrow';arrow.textContent='+';arrow.setAttribute('aria-hidden','true');
    const art=document.createElement('img');art.src='r10-'+(hub.side?'contract':'map')+'.svg';art.alt='';art.className='plaque-art';button.append(art,label,name,arrow);
    const panel=document.createElement('div');panel.id=hub.id+'-activities';panel.className='hub-activities';panel.setAttribute('role','region');panel.setAttribute('aria-labelledby',button.id);panel.hidden=true;
    const clusterMap=document.createElement('a');clusterMap.href='#whiteorchard-map/cluster/'+hub.id;clusterMap.className='cluster-map-link';clusterMap.textContent='Open this cluster on the map →';panel.append(clusterMap);
    const progressSlot=document.createElement('div');progressSlot.dataset.progressHub=hub.id;panel.append(progressSlot);
    const unknown=document.createElement('button');unknown.type='button';unknown.dataset.confirmProgress=hub.id;unknown.className='progress-prompt';unknown.textContent='Confirm progress to reveal more opportunities';panel.append(unknown);
    const groupsForHub=[['walkthrough','Quest walkthrough'],['side','Side quests'],['contract','Contracts'],['exploration','POIs & exploration'],['gear','Gear']];
    const categoryFor=id=>(tasks[id].home===hub.id&&tasks[id].stages)||tasks[id].category==='preparation'?'walkthrough':tasks[id].category;
    groupsForHub.forEach(([category,title])=>{
      const ids=hub.items.filter(id=>categoryFor(id)===category);if(!ids.length)return;
      const grouping=document.createElement(category==='walkthrough'?'section':'details');grouping.className='activity-group';grouping.dataset.activityGroup=category;grouping.dataset.groupHub=hub.id;
      if(category!=='walkthrough'){grouping.open=state.groupOpen[hub.id+':'+category]===true;grouping.addEventListener('toggle',()=>{state.groupOpen[hub.id+':'+category]=grouping.open;stashTree();persist();});}
      const heading=document.createElement(category==='walkthrough'?'h3':'summary');heading.id=hub.id+'-'+category+'-heading';heading.dataset.groupTitle=title;heading.textContent=title;grouping.setAttribute('aria-labelledby',heading.id);
      const list=document.createElement('ol');list.className='activity-list';
      ids.forEach(id=>{
        const row=document.createElement('li');row.className='activity-row';row.id=hub.id+'-'+id;row.dataset.activity=id;
        const control=document.createElement('label');control.className='task-completion';
        const check=document.createElement('input');check.type='checkbox';check.dataset.complete=id;check.setAttribute('aria-label','Mark '+tasks[id].name+' completed');control.append(check);row.append(control);
        const link=taskAnchor(id);link.id=row.id+'-link';link.dataset.originHub=hub.id;row.append(link);
        const status=document.createElement('span');status.dataset.activityStatus=id;status.className='activity-status';row.append(status);list.append(row);
      });
      grouping.append(heading,list);panel.append(grouping);
    });
    block.append(button,panel);lanes[hub.group][hub.side?'branches':'main'].append(block);
    button.addEventListener('click',()=>{
      stashTree();state.selectedHub=hub.id;state.expandedHub=state.expandedHub===hub.id?null:hub.id;
      history.replaceState({...history.state},'',treeLink(hub.id));
      updateTree();reflect();stashTree();persist();
    });
  });
  function updateTree() {
    state.windowStart=Math.min(state.windowStart,Math.max(0,groups.length-2));
    lanes.forEach((lane,i)=>{lane.group.hidden=i<state.windowStart||i>state.windowStart+1;});
    hubs.forEach(h=>{
      const block=document.getElementById(h.id),button=document.getElementById(h.id+'-toggle');
      block.hidden=h.group<state.windowStart || h.group>state.windowStart+1;
      const expanded=state.expandedHub===h.id;
      document.getElementById(h.id+'-activities').hidden=!expanded;
      button.setAttribute('aria-expanded',String(expanded));button.querySelector('.hub-arrow').textContent=expanded?'−':'+';
      button.classList.toggle('selected-hub',state.selectedHub===h.id);
    });
    document.querySelector('[data-earlier]').disabled=state.windowStart===0;
    document.querySelector('[data-later]').disabled=state.windowStart===Math.max(0,groups.length-2);
    document.querySelector('[data-window-label]').textContent=groups.slice(state.windowStart,state.windowStart+2).join(' → ');
  }
  function renderMapLinks(){if(nativeMap)nativeMap.refresh();}
  function reflect() {
    document.querySelectorAll('[data-complete]').forEach(el=>{el.checked=state.completed[el.dataset.complete]===true;});
    document.querySelectorAll('[data-task-mark]').forEach(el=>{const done=state.completed[el.dataset.taskMark]===true;el.textContent=done?'✓':'○';el.setAttribute('aria-label',done?'Completed':'Not completed');});
    document.querySelectorAll('[data-quest-status]').forEach(el=>{el.textContent=state.completed['q-firestarter']?'Completed':'Not completed';});
    document.querySelector('[data-current-hub]').textContent=hubById(state.selectedHub).name;
    document.querySelector('[data-region-warning]').hidden=state.selectedHub!=='hub-departure';
    const counted=Object.keys(tasks).filter(id=>!tasks[id].mapOnly);const count=counted.filter(id=>state.completed[id]).length;
    document.querySelector('[data-pilot-progress]').textContent=count+' of '+counted.length+' guide activities completed';
    const cont=document.querySelector('[data-continue]');
    const lastWalk=Object.values(tasks).find(t=>t.stages&&t.view===state.lastWalkthroughView);
    if(lastWalk){const stage=state.stageByView[lastWalk.view]||lastWalk.stages[0].id;cont.href='#'+lastWalk.view+'/'+stage;cont.textContent='Continue · '+lastWalk.name+', stage '+(lastWalk.stages.findIndex(s=>s.id===stage)+1)+' of '+lastWalk.stages.length+' →';}
    else if(state.lastContent){cont.href='#'+state.lastContent.view;cont.textContent='Continue '+tasks[state.lastContent.task].name+' →';}
    else {cont.href=treeLink(state.selectedHub);cont.textContent='Jump to my hub →';}
    const consoleContinue=document.querySelector('[data-console-continue]');
    consoleContinue.href=cont.getAttribute('href');
    document.querySelector('[data-console-title]').textContent=lastWalk?lastWalk.name:state.lastContent?tasks[state.lastContent.task].name:hubById(state.selectedHub).name;
    document.querySelector('[data-console-meta]').textContent=lastWalk?'Resume your last walkthrough':state.lastContent?'Return to your last guide page':'Open your selected quest hub';
    document.querySelectorAll('[data-selected-hub]').forEach(a=>{a.href=treeLink(state.selectedHub);});
    const unfinished=document.querySelector('[data-unfinished]');unfinished.replaceChildren();
    Object.keys(tasks).filter(id=>!tasks[id].mapOnly&&!state.completed[id]&&progressEngine.availability(id,state.progress)==='available').forEach(id=>unfinished.append(taskAnchor(id,true)));
    if(!unfinished.children.length)unfinished.textContent=!progressEngine.facts(state.progress).arrival?'Confirm your story progress to reveal unfinished opportunities.':Object.keys(tasks).some(id=>!tasks[id].mapOnly&&!state.completed[id])?'No unfinished activities are currently available for this recorded progress.':'All listed guide activities are marked completed.';
    document.querySelectorAll('[data-save-message]').forEach(el=>{el.textContent=saveAvailable?'Progress and your place save in this browser.':'Saving is unavailable. Changes last for this visit only.';});
    if(progressUI)progressUI.reflect();
    renderMapLinks();
  }
  function treeSnapshot() {
    return {groupOpen:{...state.groupOpen},expandedHub:state.expandedHub,windowStart:state.windowStart,scrollY:window.scrollY,scrollX:document.querySelector('.tree-viewport').scrollLeft,focusId:document.activeElement?.id||''};
  }
  function stashTree() {
    if(currentRoot!=='whiteorchard-tree')return;
    const snap=treeSnapshot();state.treeReturn=snap;
    history.replaceState({...history.state,tree:snap},'',location.href);
  }
  document.addEventListener('change',event=>{
    const id=event.target.dataset.complete;
    if(validTask(id)) {const value=event.target.checked;event.target.checked=state.completed[id]===true;progressUI.request({kind:window.PHOENIX_PROGRESS_DATA.quests[id]?'quest':'activity',quest:id,id,value});}
  });
  document.querySelector('[data-earlier]').addEventListener('click',()=>browseWindow(-1));
  document.querySelector('[data-later]').addEventListener('click',()=>browseWindow(1));
  function browseWindow(delta) {stashTree();state.windowStart=Math.max(0,Math.min(Math.max(0,groups.length-2),state.windowStart+delta));history.replaceState({...history.state},'','#whiteorchard-tree');updateTree();stashTree();persist();}
  document.querySelector('[data-jump-selected]').addEventListener('click',()=>navigate(treeLink(state.selectedHub)));
  const activeQuest=()=>Object.values(tasks).find(t=>t.view===currentRoot&&t.stages);
  function goStage(index){const task=activeQuest();if(task)navigate('#'+task.view+'/'+task.stages[Math.max(0,Math.min(task.stages.length-1,index))].id);}
  document.addEventListener('click',event=>{
    const control=event.target.closest('[data-stage-prev],[data-stage-next]');if(!control)return;
    const task=activeQuest();if(!task)return;
    goStage(task.stages.findIndex(s=>s.id===state.stageByView[task.view])+(control.hasAttribute('data-stage-next')?1:-1));
  });
  document.addEventListener('change',event=>{if(event.target.matches('[data-stage-select]')){const task=activeQuest();navigate('#'+task.view+'/'+event.target.value);}});
  function renderStage(task,id) {
    const section=document.getElementById(task.view);
    if(task.stages.some(s=>s.id===id))state.stageByView[task.view]=id;
    const stage=state.stageByView[task.view]||task.stages[0].id;state.stageByView[task.view]=stage;
    const index=task.stages.findIndex(s=>s.id===stage);
    section.dataset.currentStage=stage;section.querySelectorAll('[data-stage-index]').forEach(a=>{if(a.dataset.stageIndex===stage)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');});section.querySelectorAll('[data-stage]').forEach(el=>{el.hidden=el.dataset.stage!==stage;});
    section.querySelector('[data-stage-select]').value=stage;
    section.querySelector('[data-stage-prev]').disabled=index===0;section.querySelector('[data-stage-next]').disabled=index===task.stages.length-1;
    section.querySelector('[data-stage-count]').textContent=(index+1)+' of '+task.stages.length;
    state.lastWalkthrough=true;state.lastWalkthroughView=task.view;
    if(task.view==='walkthrough-firestarter')state.lastStage=stage;
  }
  function ownerSnapshot(task) {return {expandedHub:tasks[task].home,windowStart:hubById(tasks[task].home).group,scrollY:0,focusId:tasks[task].home+'-'+task+'-link',jump:true};}
  function parseHash() {
    let parts;
    try{parts=decodeURIComponent(location.hash.slice(1)).split('/');}catch{return ['not-found'];}
    if(!parts[0])parts[0]='home';
    if(parts[0]==='home__continue')parts[0]='regions';
    if(parts[0]==='whiteorchard-quests')parts[0]='whiteorchard-tree';
    if(parts[0]==='main')parts[0]=currentRoot||'home';
    return parts;
  }
  const contentRoot=hash=>{const root=hash.replace(/^#/,'').split('/')[0];return Object.values(tasks).some(t=>t.view===root)||root==='economy-merchants';};
  function navigate(hash,options={}) {
    stashTree();const entry=history.state||{},mapSnapshot=currentRoot==='whiteorchard-map'&&nativeMap?nativeMap.capture():null;clearTimeout(scrollTimer);persist();
    if(hash===location.hash){render({mode:'same'});return;}
    const next={};if(options.tree)next.tree=options.tree;
    if(mapSnapshot&&contentRoot(hash))next.mapReturn=mapSnapshot;
    else if(contentRoot(hash)&&hash.replace(/^#/,'').split('/')[0]===currentRoot&&entry.mapReturn)next.mapReturn=entry.mapReturn;
    if(hash==='#whiteorchard-map/restore'&&entry.mapReturn)next.map=entry.mapReturn;
    history.pushState(next,'',hash);render({mode:'push'});
  }
  document.addEventListener('click',event=>{
    const a=event.target.closest('a[href^="#"]');
    if(!a||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    if(validTask(a.dataset.taskLink))state.lastContent={task:a.dataset.taskLink,view:tasks[a.dataset.taskLink].view};
    if(a.dataset.originHub)state.selectedHub=a.dataset.originHub;
    if(a.hasAttribute('data-return-hub')){const snap=state.treeReturn;const hub=snap?.expandedHub||state.selectedHub;const task=state.lastContent?.task;const path='#whiteorchard-tree/'+hub+(task&&hubById(hub)?.items.includes(task)?'/'+task:'');navigate(path,{tree:snap});return;}
    if(a.hasAttribute('data-return-map')){event.preventDefault();navigate('#whiteorchard-map/restore');return;}
    let href=a.getAttribute('href');
    if(href.startsWith('#whiteorchard-map/')&&!href.includes('/cluster/')&&contentRoot('#'+currentRoot)&&history.state?.mapReturn)href='#whiteorchard-map/restore';
    navigate(href);
  });
  let renderSerial=0;
  function render({mode='initial'}={}) {
    const generation=++renderSerial;
    views=[...document.querySelectorAll('.view')];
    const incomingMap=history.state?.map;
    const before=currentRoot;
    const [requested,suffix,taskSuffix]=parseHash();
    const target=views.find(v=>v.id===requested)||document.getElementById('not-found');
    views.forEach(v=>{v.hidden=v!==target;});currentRoot=target.id;
    document.querySelectorAll('.guide-bar nav a').forEach(a=>{
      const on=a.hash===(currentRoot==='home'?'#home':currentRoot==='whiteorchard-tree'||currentRoot.startsWith('quest-')||currentRoot.startsWith('walkthrough-')?'#whiteorchard-tree':'#regions');
      if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
    });
    const contentTask=currentRoot==='walkthrough-firestarter'?'q-firestarter':Object.keys(tasks).find(id=>tasks[id].view===currentRoot);
    if(contentTask) {
      state.lastContent={task:contentTask,view:currentRoot};
      if(!state.treeReturn || !hubById(state.treeReturn.expandedHub)?.items.includes(contentTask)){state.treeReturn=ownerSnapshot(contentTask);state.selectedHub=tasks[contentTask].home;}
    }
    if(currentRoot==='economy-merchants'&&suffix){const anchor=target.querySelector('#merchant-'+CSS.escape(suffix));if(anchor)requestAnimationFrame(()=>anchor.scrollIntoView({block:'start'}));}
    const staged=activeQuest();if(staged)renderStage(staged,suffix);
    let restore;
    let jump;
    if(currentRoot==='whiteorchard-tree') {
      if(validHub(suffix) && !history.state?.tree) {
        state.selectedHub=suffix;state.expandedHub=suffix;state.windowStart=hubById(suffix).group;
        jump=validTask(taskSuffix)&&hubById(suffix).items.includes(taskSuffix)?suffix+'-'+taskSuffix+'-link':suffix+'-toggle';
      } else {
        restore=history.state?.tree||state.treeReturn;
        if(restore){
          if(restore.groupOpen)state.groupOpen={...restore.groupOpen};
          state.expandedHub=validHub(restore.expandedHub)?restore.expandedHub:null;
          state.windowStart=Math.max(0,Math.min(Math.max(0,groups.length-2),Number(restore.windowStart)||0));
        }
      }
      updateTree();
    }
    reflect();persist();requestAnimationFrame(drawConnections);
    lastRenderedURL=location.href;
    dispatchEvent(new CustomEvent('phoenix:route-rendered',{detail:{root:currentRoot,hub:state.selectedHub}}));
    document.title=target.querySelector('h1').innerText.replace(/\s+/g,' ').trim()+' · Witcher Field Guide';
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      if(currentRoot!==target.id||generation!==renderSerial)return;
      if(currentRoot==='whiteorchard-tree'){
        if(jump){const el=document.getElementById(jump);const grouping=el.closest('details.activity-group');if(grouping){grouping.open=true;state.groupOpen[grouping.dataset.groupHub+':'+grouping.dataset.activityGroup]=true;}el.focus({preventScroll:true});el.scrollIntoView({block:'center',inline:'center',behavior:'auto'});arrivalCue(el);}
        else if(restore){
          const y=Math.max(0,Number(restore.scrollY)||0);
          const focus=document.getElementById(restore.focusId);
          if(focus&&!focus.closest('[hidden]'))focus.focus({preventScroll:true});
          if(restore.jump&&focus){focus.scrollIntoView({block:'center',inline:'center',behavior:'auto'});arrivalCue(focus);}else {document.querySelector('.tree-viewport').scrollLeft=Math.max(0,Number(restore.scrollX)||0);window.scrollTo(0,y);}
        } else window.scrollTo(0,0);
        stashTree();persist();
      } else if(staged&&before===currentRoot){
        const heading=target.querySelector('[data-stage="'+state.stageByView[staged.view]+'"] h2');heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});
        target.querySelector('.stage-panel').scrollIntoView({block:'start',behavior:'auto'});
      } else {
        if(currentRoot==='whiteorchard-map'){if(!nativeMap)nativeMap=window.createPhoenixMap({tasks,hubs,state,onPin:id=>navigate('#'+tasks[id].view),onCapture:context=>{if(currentRoot==='whiteorchard-map')history.replaceState({...history.state,map:context},'',location.href);},persist,eligible:hub=>progressEngine.eligible(hub,state.progress)});const entryMap=incomingMap;nativeMap.show(entryMap&&(mode==='pop'||mode==='initial'||suffix==='restore')?'restore':suffix,taskSuffix,entryMap);nativeMap.capture();}
        window.scrollTo(0,0);const heading=target.querySelector('h1');heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});
      }
    }));
  }
  addEventListener('scroll',()=>{
    if(currentRoot!=='whiteorchard-tree')return;
    clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>{stashTree();persist();},120);
  },{passive:true});
  document.querySelector('.tree-viewport').addEventListener('scroll',()=>{if(currentRoot==='whiteorchard-tree'){clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>{stashTree();persist();},120);}},{passive:true});
  addEventListener('pagehide',()=>{stashTree();persist();});
  addEventListener('popstate',()=>{clearTimeout(scrollTimer);render({mode:'pop'});});
  // Normal internal links use pushState. This handles pasted/manual fragment changes.
  addEventListener('hashchange',()=>{if(location.href!==lastRenderedURL)render({mode:'hash'});});
  const jumpList=document.querySelector('[data-quest-jump]');
  hubs.forEach(h=>{const option=document.createElement('option');option.value=h.id;option.textContent=h.name;jumpList.append(option);});
  jumpList.addEventListener('change',()=>{if(validHub(jumpList.value))navigate(treeLink(jumpList.value));jumpList.value='';});
  // Fail loudly during development instead of silently shipping disconnected content.
  Object.entries(tasks).forEach(([id,t])=>{if(!validHub(t.home)||(!t.mapOnly&&id!=='cow-pasture-warning'&&!hubById(t.home).items.includes(id))||!document.getElementById(t.view))throw Error('Invalid activity home/view: '+id);});
  progressUI=window.createPhoenixProgressUI({state,tasks,hubs,engine:progressEngine,persist,reflect:()=>{updateTree();reflect();requestAnimationFrame(drawConnections);},navigate,stashTree});
  views=[...document.querySelectorAll('.view')];
  addEventListener('phoenix:views-ready',()=>render({mode:'initial'}));
  updateTree();render();
})();
