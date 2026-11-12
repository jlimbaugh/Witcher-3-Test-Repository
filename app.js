'use strict';
(() => {
  // One immutable home per activity. Recommendations elsewhere are links to that home.
  // This hand-curated sample proves navigation; it is not a level/access eligibility engine.
  const tasks = {
    'q-lilac': {name:'Lilac and Gooseberries', home:'hub-arrival', view:'quest-lilac', type:'quest'},
    'q-firestarter': {name:'Twisted Firestarter', home:'hub-firestarter', view:'quest-firestarter', type:'quest'},
    'loc-forge': {name:'Willis’s forge', home:'hub-firestarter', view:'location-forge', type:'service'},
    'q-beast': {name:'The Beast of White Orchard', home:'hub-hunt', view:'quest-beast', type:'quest'},
    'pop-cemetery': {name:'Cemetery Place of Power', home:'hub-hunt', view:'discovery-cemetery', type:'discovery'},
    'departure-review': {name:'Review before leaving White Orchard', home:'hub-departure', view:'departure-check', type:'quest'}
  };
  const hubs = [
    {id:'hub-arrival', name:'Lilac and Gooseberries', label:'MAIN STORY / ARRIVAL', group:0, items:['q-lilac','loc-forge']},
    {id:'hub-firestarter', name:'Twisted Firestarter', label:'VILLAGE BRANCH', group:0, side:true, items:['loc-forge','q-firestarter']},
    {id:'hub-hunt', name:'The Beast of White Orchard', label:'MAIN STORY / GRIFFIN HUNT', group:1, items:['q-beast','pop-cemetery']},
    {id:'hub-departure', name:'Before leaving White Orchard', label:'MAIN STORY / STOPPING POINT', group:2, items:['pop-cemetery','departure-review']}
  ];
  const groups = ['Arrival in White Orchard','The griffin hunt','Before the road'];
  const stages = ['forge','trail','suspect','return'];
  const key = 'phoenix.whiteorchard.interaction.v1';
  const legacyKey = 'phoenix.whiteorchard.pilot.v1';
  const views = [...document.querySelectorAll('.view')];
  const hubById = id => hubs.find(h => h.id === id);
  const validTask = id => Object.hasOwn(tasks,id);
  const validHub = id => Boolean(hubById(id));
  const treeLink = (hub,task) => '#whiteorchard-tree/'+hub+(task?'/'+task:'');
  let currentRoot = '';
  let lastRenderedURL = '';
  let saveAvailable = true;
  let scrollTimer;
  const state = {version:1,completed:{},selectedHub:'hub-arrival',expandedHub:'hub-arrival',windowStart:0,treeReturn:null,lastStage:'forge',lastContent:null,lastWalkthrough:false,map:{type:'all',search:'',showCompleted:false}};
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      const saved = JSON.parse(raw);
      if (saved && saved.version === 1) {
        Object.keys(tasks).forEach(id => {state.completed[id] = saved.completed?.[id] === true;});
        if (validHub(saved.selectedHub)) state.selectedHub = saved.selectedHub;
        if (saved.expandedHub === null || validHub(saved.expandedHub)) state.expandedHub = saved.expandedHub;
        if (Number.isInteger(saved.windowStart)) state.windowStart = Math.max(0,Math.min(groups.length-1,saved.windowStart));
        if (stages.includes(saved.lastStage)) state.lastStage = saved.lastStage;
        state.lastWalkthrough = saved.lastWalkthrough === true;
        if (validTask(saved.lastContent?.task) && ['quest-firestarter','walkthrough-firestarter','location-forge','quest-lilac','quest-beast','discovery-cemetery','departure-check'].includes(saved.lastContent.view)) state.lastContent = saved.lastContent;
        if (validHub(saved.treeReturn?.expandedHub) || saved.treeReturn?.expandedHub === null) state.treeReturn = saved.treeReturn;
        if (saved.map) state.map = {type:['all','quest','service','discovery'].includes(saved.map.type)?saved.map.type:'all',search:typeof saved.map.search==='string'?saved.map.search.slice(0,100):'',showCompleted:saved.map.showCompleted===true};
      }
    } else {
      // Read, but never overwrite or delete, the old pilot save.
      const legacy = JSON.parse(localStorage.getItem(legacyKey) || '{}');
      if (legacy?.firestarter === true) state.completed['q-firestarter'] = true;
    }
  } catch { saveAvailable = false; }
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
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
  hubs.forEach(hub=>{
    const block=document.createElement('article');
    block.className='hub-block'+(hub.side?' side-branch':'');block.id=hub.id;block.dataset.group=hub.group;
    const button=document.createElement('button');button.type='button';button.className='hub-toggle';button.id=hub.id+'-toggle';button.setAttribute('aria-controls',hub.id+'-activities');button.setAttribute('aria-expanded','false');
    const label=document.createElement('span');label.className='eyebrow';label.textContent=hub.label;
    const name=document.createElement('span');name.className='hub-name';name.textContent=hub.name;
    const arrow=document.createElement('span');arrow.className='hub-arrow';arrow.textContent='+';arrow.setAttribute('aria-hidden','true');
    button.append(label,name,arrow);
    const panel=document.createElement('div');panel.id=hub.id+'-activities';panel.className='hub-activities';panel.setAttribute('role','region');panel.setAttribute('aria-labelledby',button.id);panel.hidden=true;
    const list=document.createElement('ol');list.className='activity-list';
    hub.items.forEach(id=>{
      const row=document.createElement('li');row.className='activity-row';row.id=hub.id+'-'+id;
      const own=tasks[id].home===hub.id;
      if (own) {
        const control=document.createElement('label');control.className='task-completion';
        const check=document.createElement('input');check.type='checkbox';check.dataset.complete=id;check.setAttribute('aria-label','Mark '+tasks[id].name+' completed');
        control.append(check);row.append(control);
      } else {
        const mark=document.createElement('span');mark.className='task-mark';mark.dataset.taskMark=id;row.append(mark);
      }
      const link=taskAnchor(id,!own);link.id=row.id+'-link';row.append(link);list.append(row);
    });
    panel.append(list);block.append(button,panel);tree.append(block);
    button.addEventListener('click',()=>{
      stashTree();state.selectedHub=hub.id;state.expandedHub=state.expandedHub===hub.id?null:hub.id;
      history.replaceState({...history.state},'',treeLink(hub.id));
      updateTree();reflect();stashTree();persist();
    });
  });
  function updateTree() {
    hubs.forEach(h=>{
      const block=document.getElementById(h.id),button=document.getElementById(h.id+'-toggle');
      block.hidden=h.group<state.windowStart || h.group>state.windowStart+1;
      const expanded=state.expandedHub===h.id;
      document.getElementById(h.id+'-activities').hidden=!expanded;
      button.setAttribute('aria-expanded',String(expanded));button.querySelector('.hub-arrow').textContent=expanded?'−':'+';
      button.classList.toggle('selected-hub',state.selectedHub===h.id);
    });
    document.querySelector('[data-earlier]').disabled=state.windowStart===0;
    document.querySelector('[data-later]').disabled=state.windowStart===groups.length-1;
    document.querySelector('[data-window-label]').textContent='Story groups '+(state.windowStart+1)+'–'+Math.min(groups.length,state.windowStart+2)+' of '+groups.length;
  }
  function renderMapLinks() {
    const list=document.querySelector('[data-map-links]');list.replaceChildren();
    const ids=['loc-forge','q-firestarter','pop-cemetery'];
    ids.filter(id=>(state.map.type==='all'||tasks[id].type===state.map.type)&&(state.map.showCompleted||!state.completed[id])&&tasks[id].name.toLocaleLowerCase().includes(state.map.search.toLocaleLowerCase().trim())).forEach(id=>{
      const row=document.createElement('div');row.className='map-test-row';
      const a=taskAnchor(id,true);row.append(a);
      if(state.completed[id]){const mark=document.createElement('span');mark.textContent='Completed';row.append(mark);}
      list.append(row);
    });
    document.querySelector('[data-map-empty]').hidden=list.children.length>0;
  }
  function reflect() {
    document.querySelectorAll('[data-complete]').forEach(el=>{el.checked=state.completed[el.dataset.complete]===true;});
    document.querySelectorAll('[data-task-mark]').forEach(el=>{const done=state.completed[el.dataset.taskMark]===true;el.textContent=done?'✓':'○';el.setAttribute('aria-label',done?'Completed':'Not completed');});
    document.querySelectorAll('[data-quest-status]').forEach(el=>{el.textContent=state.completed['q-firestarter']?'Completed':'Not completed';});
    document.querySelector('[data-current-hub]').textContent=hubById(state.selectedHub).name;
    document.querySelector('[data-region-warning]').hidden=state.selectedHub!=='hub-departure';
    const count=Object.keys(tasks).filter(id=>state.completed[id]).length;
    document.querySelector('[data-pilot-progress]').textContent=count+' of '+Object.keys(tasks).length+' pilot activities completed';
    const cont=document.querySelector('[data-continue]');
    if(state.lastWalkthrough){cont.href='#walkthrough-firestarter/'+state.lastStage;cont.textContent='Continue Twisted Firestarter →';}
    else if(state.lastContent){cont.href='#'+state.lastContent.view+(state.lastContent.view==='walkthrough-firestarter'?'/'+state.lastStage:'');cont.textContent='Continue '+tasks[state.lastContent.task].name+' →';}
    else {cont.href=treeLink(state.selectedHub);cont.textContent='Open selected hub →';}
    document.querySelectorAll('[data-selected-hub]').forEach(a=>{a.href=treeLink(state.selectedHub);});
    const unfinished=document.querySelector('[data-unfinished]');unfinished.replaceChildren();
    Object.keys(tasks).filter(id=>!state.completed[id]).forEach(id=>unfinished.append(taskAnchor(id,true)));
    if(!unfinished.children.length)unfinished.textContent='All pilot activities are marked completed.';
    document.querySelectorAll('[data-save-message]').forEach(el=>{el.textContent=saveAvailable?'Progress and your place save in this browser.':'Saving is unavailable. Changes last for this visit only.';});
    renderMapLinks();
  }
  function treeSnapshot() {
    return {expandedHub:state.expandedHub,windowStart:state.windowStart,scrollY:window.scrollY,focusId:document.activeElement?.id||''};
  }
  function stashTree() {
    if(currentRoot!=='whiteorchard-tree')return;
    const snap=treeSnapshot();state.treeReturn=snap;
    history.replaceState({...history.state,tree:snap},'',location.href);
  }
  document.addEventListener('change',event=>{
    const id=event.target.dataset.complete;
    if(validTask(id)) {state.completed[id]=event.target.checked;reflect();stashTree();persist();}
  });
  document.querySelector('[data-earlier]').addEventListener('click',()=>browseWindow(-1));
  document.querySelector('[data-later]').addEventListener('click',()=>browseWindow(1));
  function browseWindow(delta) {stashTree();state.windowStart=Math.max(0,Math.min(groups.length-1,state.windowStart+delta));history.replaceState({...history.state},'','#whiteorchard-tree');updateTree();stashTree();persist();}
  document.querySelector('[data-jump-selected]').addEventListener('click',()=>navigate(treeLink(state.selectedHub)));
  const type=document.querySelector('[data-map-type]'),search=document.querySelector('[data-map-search]'),show=document.querySelector('[data-map-completed]');
  type.value=state.map.type;search.value=state.map.search;show.checked=state.map.showCompleted;
  type.addEventListener('change',()=>{state.map.type=type.value;renderMapLinks();persist();});
  search.addEventListener('input',()=>{state.map.search=search.value.slice(0,100);renderMapLinks();persist();});
  show.addEventListener('change',()=>{state.map.showCompleted=show.checked;renderMapLinks();persist();});
  function goStage(index){navigate('#walkthrough-firestarter/'+stages[Math.max(0,Math.min(stages.length-1,index))]);}
  document.querySelector('[data-stage-prev]').addEventListener('click',()=>goStage(stages.indexOf(state.lastStage)-1));
  document.querySelector('[data-stage-next]').addEventListener('click',()=>goStage(stages.indexOf(state.lastStage)+1));
  document.querySelector('[data-stage-select]').addEventListener('change',event=>navigate('#walkthrough-firestarter/'+event.target.value));
  function renderStage(id) {
    if(stages.includes(id))state.lastStage=id;
    const index=stages.indexOf(state.lastStage);
    document.querySelectorAll('[data-stage]').forEach(stage=>{stage.hidden=stage.dataset.stage!==state.lastStage;});
    document.querySelector('[data-stage-select]').value=state.lastStage;
    document.querySelector('[data-stage-prev]').disabled=index===0;
    document.querySelector('[data-stage-next]').disabled=index===stages.length-1;
    document.querySelector('[data-stage-count]').textContent='Stage '+(index+1)+' of '+stages.length;
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
  function navigate(hash) {
    stashTree();clearTimeout(scrollTimer);persist();
    if(hash===location.hash){render({mode:'same'});return;}
    history.pushState({},'',hash);render({mode:'push'});
  }
  document.addEventListener('click',event=>{
    const a=event.target.closest('a[href^="#"]');
    if(!a||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    if(validTask(a.dataset.taskLink))state.lastContent={task:a.dataset.taskLink,view:tasks[a.dataset.taskLink].view};
    navigate(a.getAttribute('href'));
  });
  function render({mode='initial'}={}) {
    const before=currentRoot;
    const [requested,suffix,taskSuffix]=parseHash();
    const target=views.find(v=>v.id===requested)||document.getElementById('not-found');
    views.forEach(v=>{v.hidden=v!==target;});currentRoot=target.id;
    document.querySelectorAll('.guide-bar nav a').forEach(a=>{
      const on=currentRoot==='home'?a.hash==='#home':a.hash==='#regions';
      if(on)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');
    });
    const contentTask=currentRoot==='walkthrough-firestarter'?'q-firestarter':Object.keys(tasks).find(id=>tasks[id].view===currentRoot);
    if(contentTask) {
      state.lastContent={task:contentTask,view:currentRoot};
      if(!state.treeReturn || state.treeReturn.expandedHub!==tasks[contentTask].home){state.treeReturn=ownerSnapshot(contentTask);state.selectedHub=tasks[contentTask].home;}
    }
    if(currentRoot==='walkthrough-firestarter'){state.lastWalkthrough=true;renderStage(suffix);}
    let restore;
    let jump;
    if(currentRoot==='whiteorchard-tree') {
      if(validHub(suffix) && !((mode==='pop'||mode==='initial') && history.state?.tree)) {
        state.selectedHub=suffix;state.expandedHub=suffix;state.windowStart=hubById(suffix).group;
        jump=validTask(taskSuffix)&&tasks[taskSuffix].home===suffix?suffix+'-'+taskSuffix+'-link':suffix+'-toggle';
      } else {
        restore=history.state?.tree||state.treeReturn;
        if(restore){
          state.expandedHub=validHub(restore.expandedHub)?restore.expandedHub:null;
          state.windowStart=Math.max(0,Math.min(groups.length-1,Number(restore.windowStart)||0));
        }
      }
      updateTree();
    }
    reflect();persist();
    lastRenderedURL=location.href;
    document.title=target.querySelector('h1').innerText.replace(/\s+/g,' ').trim()+' · Witcher Field Guide';
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      if(currentRoot!==target.id)return;
      if(currentRoot==='whiteorchard-tree'){
        if(jump){const el=document.getElementById(jump);el.focus({preventScroll:true});el.scrollIntoView({block:'center',behavior:'auto'});}
        else if(restore){
          const y=Math.max(0,Number(restore.scrollY)||0);
          const focus=document.getElementById(restore.focusId);
          if(focus&&!focus.closest('[hidden]'))focus.focus({preventScroll:true});
          if(restore.jump&&focus)focus.scrollIntoView({block:'center',behavior:'auto'});else window.scrollTo(0,y);
        } else window.scrollTo(0,0);
        stashTree();persist();
      } else if(currentRoot==='walkthrough-firestarter'&&before===currentRoot){
        const heading=document.querySelector('[data-stage="'+state.lastStage+'"] h2');heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});
        document.getElementById('stage-panel').scrollIntoView({block:'start',behavior:'auto'});
      } else {
        window.scrollTo(0,0);const heading=target.querySelector('h1');heading.setAttribute('tabindex','-1');heading.focus({preventScroll:true});
      }
    }));
  }
  addEventListener('scroll',()=>{
    if(currentRoot!=='whiteorchard-tree')return;
    clearTimeout(scrollTimer);scrollTimer=setTimeout(()=>{stashTree();persist();},120);
  },{passive:true});
  addEventListener('pagehide',()=>{stashTree();persist();});
  addEventListener('popstate',()=>{clearTimeout(scrollTimer);render({mode:'pop'});});
  // Normal internal links use pushState. This handles pasted/manual fragment changes.
  addEventListener('hashchange',()=>{if(location.href!==lastRenderedURL)render({mode:'hash'});});
  updateTree();render();
})();
