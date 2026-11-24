'use strict';
// Original console integration; coordinate adaptation credits are in MAP-SOURCES.md.
window.createPhoenixMap = function({tasks,hubs,state,onPin,persist,eligible,onCapture,progressStatus,regionalProgress}) {
  const data=window.PHOENIX_MAP,canvas=document.getElementById('orchard-map');
  const status=document.querySelector('[data-map-status]');
  if(!window.L){status.textContent='The map could not load. Reload the page to try again.';return {show(){},refresh(){},capture(){}};}
  const bounds=[[0,0],[data.height,data.width]];
  const map=L.map(canvas,{crs:L.CRS.Simple,minZoom:-4,maxZoom:1,zoomSnap:.25,zoomDelta:.5,maxBounds:[[-250,-250],[data.height+250,data.width+250]],maxBoundsViscosity:.9,attributionControl:false,scrollWheelZoom:false,keyboard:true});
  L.imageOverlay(data.image,bounds,{alt:'In-game White Orchard terrain map',interactive:false}).addTo(map).on('error',()=>{status.textContent='Map image unavailable. Reload to try again.';});
  const labels=L.layerGroup().addTo(map);
  data.labels.forEach(label=>L.marker(label.point,{icon:L.divIcon({className:'native-map-label',html:'<span>'+label.name+'</span>',iconSize:[140,20],iconAnchor:[70,-12]}),interactive:false,keyboard:false}).addTo(labels));
  const layer=L.layerGroup().addTo(map);
  const focusLayer=L.layerGroup().addTo(map);
  function taskPins(id){const exact=data.markers.find(p=>p.id===focusedPin&&p.task===id);if(exact)return [exact];const found=data.markers.filter(p=>p.task===id);if(found.length)return found;const t=tasks[id];if(!t?.diagramPoint)return [];const seller=window.PHOENIX_DIAGRAMS?.vendors[focusedSource],source=seller&&data.markers.find(p=>p.id===seller.pin);return [{id:'focus-'+id,name:t.name,task:id,type:'diagram',point:source?.point||t.diagramPoint}];}
  const types={"pop": ["Places of Power", "pop"], "diagram": ["Diagrams", "poi"], "service": ["Services", "armourer"], "gwent": ["Gwent", "gwent"], "notice": ["Notice boards", "notice"], "abandoned": ["Abandoned sites", "abandoned"], "buff": ["Equipment enhancements", "grindstone"], "camp": ["Bandit camps", "banditcamp"], "entrance": ["Entrances", "entrance"], "guarded": ["Guarded treasure", "guarded"], "hidden": ["Hidden treasure", "hidden"], "nest": ["Monster nests", "monsternest"], "poi": ["Discoveries", "poi"], "signpost": ["Signposts", "fasttravel"], "cache": ["Water caches", "smugglers"], "quest": ["Quest starts", "sidequests"], "contract": ["Contracts", "tempcontract"]};
  let clusterMode='browse';
  // Order 017 · Main Map Progress layer. Filters run through matches()/refresh(), the same marker data and render cycle as every other map filter.
  // Canonical states only: completion (state.completed), 'failed' and 'unavailable' from the progression engine. The engine has no "missed" state,
  // so no Missed control is offered (decision recorded for Capt). The filter is temporary map context: kept in history for Back, never saved.
  const PROGRESS_FILTERS=['all','unfinished','completed','failed'];
  let progressFilter='all';
  let focusedSource=null,focusedPin=null;
  let focusedTask=null,focusedHub=null,scope=null,first=true,saveTimer;
  const panel=document.querySelector("[data-map-panel]");
  function iconFor(pin){return pin.icon||(pin.id==='tomira'?'herbalist':types[pin.type][1]);}
  function progressOf(id){const engine=typeof progressStatus==='function'?progressStatus(id):null;if(engine==='failed')return 'failed';if(state.completed[id]===true)return 'completed';if(engine==='unavailable')return 'unavailable';return 'unfinished';}
  function progressMatch(pin){return progressFilter==='all'||(!isUtility(pin)&&progressOf(pin.task)===progressFilter);}
  function matches(pin){return progressMatch(pin)&&(state.map.type==='all'||state.map.type===pin.type)&&(isUtility(pin)||state.map.showCompleted||progressFilter==='completed'||progressFilter==='failed'||!state.completed[pin.task])&& (pin.name+' '+tasks[pin.task].name+' '+(hubs.find(h=>h.id===tasks[pin.task].home)?.name||'')).toLocaleLowerCase().includes(state.map.search.trim().toLocaleLowerCase());}
  function visiblePins(){const cluster=scope?hubs.find(h=>h.id===scope):null;const allowed=cluster?(clusterMode==='browse'?window.PHOENIX_MAP_MEMBERSHIP[cluster.id]:eligible(cluster)):null;const all=[...data.markers];if(focusedTask&&!all.some(p=>p.task===focusedTask))all.push(...taskPins(focusedTask));return all.filter(p=>(!allowed||allowed.includes(p.task))&&(p.task===focusedTask||matches(p)));}
  function refresh(){
    document.querySelectorAll('[data-cluster-mode]').forEach(b=>{b.disabled=!scope;b.setAttribute('aria-pressed',String(b.dataset.clusterMode===clusterMode));});
    layer.clearLayers();focusLayer.clearLayers();const pins=visiblePins();
    pins.forEach(pin=>{
      const done=!isUtility(pin)&&state.completed[pin.task]===true,focus=pin.task===focusedTask||tasks[pin.task].home===focusedHub;
      const marker=L.marker(pin.point,{title:pin.name,alt:pin.name,keyboard:true,riseOnHover:true,icon:L.divIcon({className:'native-pin'+(done?' is-complete':'')+(focus?' is-focused':''),html:'<img src="map-icon-'+iconFor(pin)+'.png" alt="" draggable="false">'+(done?'<span aria-hidden="true">✓</span>':''),iconSize:[44,44],iconAnchor:[22,22]})});
      marker.on('click',()=>openPin(pin));marker.addTo(layer);if(pin.task===focusedTask&&(!focusedPin||pin.id===focusedPin))L.circleMarker(pin.point,{radius:32,color:'#e5c483',weight:3,fillColor:'#e5c483',fillOpacity:.1,opacity:.95,interactive:false,className:'task-focus-ring'}).addTo(focusLayer);
      const el=marker.getElement();if(el){el.setAttribute('role','button');el.setAttribute('aria-label',pin.name+(done?', completed':'')+'. Open '+(isUtility(pin)?'location panel':'guide'));el.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();openPin(pin);}});}
    });
    const count=document.querySelector('[data-map-count]');const regular=pins.filter(p=>data.markers.includes(p)).length;count.textContent=regular+' of '+data.markers.length+' regional markers'+(pins.length>regular?' + selected diagram location':'');
    const list=document.querySelector('[data-map-links]');list.replaceChildren();
    pins.forEach(pin=>{const row=document.createElement('div');row.className='map-test-row';const button=document.createElement('button');button.type='button';button.textContent=pin.name+(!isUtility(pin)&&state.completed[pin.task]?' ✓':'');button.addEventListener('click',()=>openPin(pin));row.append(button);list.append(row);});
    document.querySelector('[data-map-empty]').hidden=pins.length>0;
    paintProgress(pins);
    const empty=document.querySelector('[data-map-empty-actions]');empty.hidden=pins.length>0||!scope;empty.querySelector('p').textContent=clusterMode==='progress'?'No matching activities under your recorded progress and filters. Browse without changing progress, or review Story progress.':'No matching pins under these map filters. Try all marker types or Show completed.';
  }
  function fit(){map.fitBounds(bounds,{padding:[14,14],animate:false});}
  function focusTask(id){
    focusedHub=null;
    const pins=taskPins(id);focusedTask=pins.length?id:null;focusedPin=pins.length?(pins.find(p=>p.type==='diagram')||pins.find(p=>p.type==='quest')||pins[0]).id:null;refresh();
    if(pins.length){const target=pins.find(p=>p.type==='diagram')||pins.find(p=>p.type==='quest')||pins[0];const overview=map.getBoundsZoom(bounds,false,L.point(28,28));map.setView(target.point,Math.min(0,overview+1.25),{animate:false});status.textContent='Circled location: '+tasks[id].name+'. Nearby markers remain available for orientation.';return true;}return false;
  }
  function isUtility(pin){return ['service','buff','signpost','notice'].includes(pin.type);}
  function openPin(pin){capture();if(!isUtility(pin)){panel.hidden=true;onPin(pin.task);return;}
    panel.replaceChildren();panel.hidden=false;const title=document.createElement('h2');title.textContent=pin.name;panel.append(title);
    const task=tasks[pin.task],description=document.createElement('p');description.textContent=pin.type==='signpost'?'Fast travel signpost. Discover it in the game to use it.':pin.type==='buff'?'Temporary equipment enhancement. Use the station before heading out.':pin.type==='notice'?'Read local notices to discover contracts and other leads.':task.requirements||'Regional service';panel.append(description);
    if(task.completionDefinition){const meaning=document.createElement('p');meaning.className='completion-meaning';meaning.textContent='Completion meaning: '+task.completionDefinition;const legacy=document.createElement('p');legacy.className='quiet';legacy.textContent='Earlier marks remain as recorded; this label does not retroactively verify actions.';panel.append(meaning,legacy);}
    if(task.exploration){const entry=document.createElement('a');entry.href='#'+task.view;entry.textContent='Open shared activity entry';panel.append(entry);}
    const knownFlags=data.merchantFlags?.[pin.id]||[];if(knownFlags.length){const flags=document.createElement('p');flags.textContent=knownFlags.map(flag=>flag.label).join(' · ');panel.append(flags);const sources=document.createElement('a');sources.className='sw-source-link';sources.href='velen-sources.html#merchant-'+pin.id;sources.textContent='Sources';panel.append(sources);}
    if(pin.type==='service'&&window.PHOENIX_DIAGRAMS){const sellers=Object.entries(window.PHOENIX_DIAGRAMS.vendors).filter(([,v])=>v.pin===pin.id).map(([id])=>id);const entries=window.PHOENIX_DIAGRAMS.entries.filter(d=>d.vendors?.some(id=>sellers.includes(id)));if(entries.length){const d=document.createElement('details'),summary=document.createElement('summary');summary.textContent='Diagram stock leads · '+entries.length;d.append(summary);for(const entry of entries){const a=document.createElement('a');a.href='#'+entry.view;a.textContent=entry.name;d.append(a);}panel.append(d);}}
    if(pin.type==='service'){const link=document.createElement('a');link.href='#economy-merchants/'+pin.id;link.textContent='Economy → Merchant details';panel.append(link);}
    const hubLink=document.createElement('a');hubLink.href='#whiteorchard-tree/'+task.home;hubLink.textContent='Related quest hub →';panel.append(hubLink);
    const close=document.createElement('button');close.type='button';close.textContent='Close location panel';close.addEventListener('click',()=>panel.hidden=true);panel.append(close);panel.scrollIntoView({block:'nearest'});title.setAttribute('tabindex','-1');title.focus({preventScroll:true});
  }
  function focusHub(home=state.selectedHub){
    focusedTask=null;focusedHub=null;scope=home;document.querySelector('#whiteorchard-map [data-selected-hub]').href='#whiteorchard-tree/'+home;const hub=hubs.find(h=>h.id===home),allowed=hub?(clusterMode==='browse'?window.PHOENIX_MAP_MEMBERSHIP[hub.id]:eligible(hub)):[],pins=data.markers.filter(p=>allowed.includes(p.task));
    if(pins.length)map.fitBounds(L.latLngBounds(pins.map(p=>p.point)).pad(.3),{maxZoom:-.25,padding:[65,65],animate:false});else fit();
    status.textContent=(clusterMode==='browse'?'Browsing cluster: ':'Filtered by recorded progress: ')+(hub?.name||'')+'. Browsing never records arrival or completion.';refresh();
  }
  function setClusterMode(mode){clusterMode=mode==='progress'?'progress':'browse';if(scope)focusHub(scope);const context=capture();history.replaceState({...history.state,map:context},'',location.href);}
  document.querySelectorAll('[data-cluster-mode]').forEach(b=>b.addEventListener('click',()=>setClusterMode(b.dataset.clusterMode)));
  document.querySelector('[data-map-empty-browse]').addEventListener('click',()=>setClusterMode('browse'));
  function capture(){const center=map.getCenter(),context={clusterMode,progressFilter,scope,focusedTask,focusedSource,focusedPin,type:state.map.type,search:state.map.search,showCompleted:state.map.showCompleted,expanded:document.querySelector('.native-map-shell').classList.contains('map-expanded'),view:{center:[center.lat,center.lng],zoom:map.getZoom()}};state.mapContext=context;onCapture?.(context);persist();return context;}
  function show(task,hubId,entryContext,focusId){
    panel.hidden=true;map.invalidateSize({pan:false});
    const context=entryContext||state.mapContext;
    if(task==='restore'&&context&&Array.isArray(context.view?.center)&&context.view.center.length===2&&context.view.center.every(Number.isFinite)&&Number.isFinite(context.view.zoom)){
      clusterMode=context.clusterMode==='progress'?'progress':'browse';progressFilter=PROGRESS_FILTERS.includes(context.progressFilter)?context.progressFilter:'all';scope=hubs.some(h=>h.id===context.scope)?context.scope:null;focusedTask=tasks[context.focusedTask]?context.focusedTask:null;focusedSource=context.focusedSource||null;focusedPin=context.focusedPin||null;focusedHub=null;
      state.map.type=Object.hasOwn(types,context.type)?context.type:'all';state.map.search=typeof context.search==='string'?context.search:'';state.map.showCompleted=context.showCompleted===true;
      type.value=state.map.type;search.value=state.map.search;completed.checked=state.map.showCompleted;
      document.querySelector('.native-map-shell').classList.toggle('map-expanded',context.expanded===true);const expand=document.querySelector('[data-map-expand]');expand.textContent=context.expanded?'Close expanded map':'Expand map';expand.setAttribute('aria-expanded',String(context.expanded===true));map.invalidateSize({pan:false});
      map.setView(context.view.center,Math.max(-4,Math.min(1,context.view.zoom)),{animate:false});refresh();status.textContent='Your map position, zoom and filters restored.';first=false;return;
    }
    if(first){first=false;const saved=state.map.view;if(saved&&Array.isArray(saved.center)&&saved.center.length===2&&saved.center.every(Number.isFinite)&&Number.isFinite(saved.zoom))map.setView(saved.center,Math.max(-4,Math.min(1,saved.zoom)),{animate:false});else fit();}
    if(task!=='restore'){focusedSource=null;focusedPin=null;}
    if(task==='pin'&&data.markers.some(p=>p.id===hubId)){const p=data.markers.find(p=>p.id===hubId);scope=null;focusedPin=p.id;state.map.type='all';state.map.search='';type.value='all';search.value='';focusTask(p.task);return;}
    if(task==='cluster'&&hubs.some(h=>h.id===hubId)){state.map.type='all';state.map.search='';type.value='all';search.value='';focusHub(hubId);if(focusId&&tasks[focusId]&&!focusTask(focusId))status.textContent+=' This task has no exact confirmed map pin; showing its cluster.';}
    else if(task&&tasks[task]){scope=null;focusedHub=null;focusedSource=window.PHOENIX_DIAGRAMS?.vendors[hubId]?hubId:null;state.map.type='all';state.map.search='';type.value='all';search.value='';if(!focusTask(task))focusHub(tasks[task].home);}
    else {scope=null;focusedHub=null;focusedTask=null;refresh();status.textContent='Drag to pan. Pinch or use + / − to zoom. Tap a quest or discovery to open its guide.';}
  }
  const type=document.querySelector('[data-map-type]'),search=document.querySelector('[data-map-search]'),completed=document.querySelector('[data-map-completed]');
  // The layer lives inside this map's own filter panel only; it is never attached to <main> or any other view.
  const tools=document.querySelector('#whiteorchard-map .atlas-tools');
  const progressLayer=document.createElement('section');progressLayer.className='map-progress-layer';progressLayer.dataset.progressLayer='whiteorchard';progressLayer.setAttribute('aria-label','Progress layer · White Orchard');
  const progressHeading=document.createElement('p');progressHeading.className='eyebrow';progressHeading.textContent='PROGRESS LAYER';
  const progressSummary=document.createElement('p');progressSummary.className='map-progress-summary';progressSummary.dataset.regionCount='whiteorchard';progressSummary.setAttribute('aria-live','polite');
  const progressButtons=document.createElement('div');progressButtons.className='map-cluster-mode map-progress-filters';progressButtons.setAttribute('role','group');progressButtons.setAttribute('aria-label','Show White Orchard activities by recorded progress');
  const filterLabels={all:'All activities',unfinished:'Unfinished',completed:'Completed',failed:'Failed'};
  PROGRESS_FILTERS.forEach(key=>{const b=document.createElement('button');b.type='button';b.dataset.progressFilter=key;b.textContent=filterLabels[key];b.addEventListener('click',()=>setProgressFilter(key));progressButtons.append(b);});
  const progressEmpty=document.createElement('p');progressEmpty.className='map-progress-empty';progressEmpty.dataset.progressEmpty='';progressEmpty.hidden=true;
  const velenSummary=document.createElement('p');velenSummary.className='map-progress-region';velenSummary.dataset.regionCount='velen';velenSummary.hidden=true;
  progressLayer.append(progressHeading,progressSummary,progressButtons,progressEmpty,velenSummary);
  if(tools)(tools.querySelector('.map-cluster-mode')||tools.lastElementChild).after(progressLayer);
  function regionCounts(){const ids=[...new Set(data.markers.filter(p=>!isUtility(p)&&tasks[p.task]).map(p=>p.task))],c={total:ids.length,completed:0,unfinished:0,failed:0,unavailable:0};ids.forEach(id=>c[progressOf(id)]++);return c;}
  function paintProgress(pins){
    const c=regionCounts();
    progressSummary.textContent='White Orchard · '+c.total+' mapped activities · '+c.completed+' completed · '+c.unfinished+' unfinished · '+c.failed+' failed'+(c.unavailable?' · '+c.unavailable+' unavailable':'');
    progressButtons.querySelectorAll('[data-progress-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.progressFilter===progressFilter)));
    const shown=pins?pins.filter(p=>data.markers.includes(p)&&!isUtility(p)).length:0;
    progressEmpty.hidden=progressFilter==='all'||shown>0;
    progressEmpty.textContent=progressFilter==='all'?'':'No White Orchard activities are recorded as '+filterLabels[progressFilter].toLowerCase()+' under the current map filters. Choose All activities to see every marker.';
    // Velen is reported from its own canonical owners (read-only) and is never mixed into White Orchard counts. Other regions have no progress data yet.
    let rows=null;try{rows=typeof regionalProgress==='function'?regionalProgress():null;}catch{rows=null;}
    if(Array.isArray(rows)&&rows.length){const done=rows.filter(r=>r.status==='complete').length,failed=rows.filter(r=>r.status==='failed').length;velenSummary.hidden=false;velenSummary.replaceChildren(document.createTextNode('Velen · '+done+' of '+rows.length+' tracked entries complete'+(failed?' · '+failed+' failed':'')+' · '));const a=document.createElement('a');a.href='#velen/map';a.textContent='Open the Velen map →';velenSummary.append(a);}else velenSummary.hidden=true;
  }
  function setProgressFilter(key){progressFilter=PROGRESS_FILTERS.includes(key)?key:'all';focusedTask=null;focusedHub=null;refresh();const context=capture();history.replaceState({...history.state,map:context},'',location.href);status.textContent=progressFilter==='all'?'Progress filter cleared. All markers follow your other filters.':'Showing '+filterLabels[progressFilter].toLowerCase()+' White Orchard activities.';}
  addEventListener('phoenix:progress-committed',()=>refresh());addEventListener('phoenix:progress-undone',()=>refresh());
  type.value=state.map.type;search.value=state.map.search;completed.checked=state.map.showCompleted;
  function filter(){focusedTask=null;focusedHub=null;state.map.type=type.value;state.map.search=search.value.slice(0,100);state.map.showCompleted=completed.checked;refresh();capture();status.textContent='Filters updated. Tap a quest or discovery icon to open its guide.';}
  type.addEventListener('change',filter);search.addEventListener('input',filter);completed.addEventListener('change',filter);
  document.querySelector('[data-map-all]').addEventListener('click',()=>{progressFilter='all';scope=null;focusedTask=null;focusedHub=null;state.map.type='all';state.map.search='';type.value='all';search.value='';refresh();fit();status.textContent='All regional marker types. Completed activities follow your visibility setting.';capture();});
  document.querySelector('[data-map-fit]').addEventListener('click',()=>{focusedTask=null;focusedHub=null;fit();refresh();status.textContent='Showing all of White Orchard. Your filters still apply.';capture();});
  document.querySelector('[data-map-quest]').addEventListener('click',()=>focusHub());
  document.querySelector('[data-map-expand]').addEventListener('click',event=>{const shell=document.querySelector('.native-map-shell');const expanded=shell.classList.toggle('map-expanded');event.currentTarget.textContent=expanded?'Close expanded map':'Expand map';event.currentTarget.setAttribute('aria-expanded',String(expanded));map.invalidateSize({pan:false});});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.querySelector('.map-expanded'))document.querySelector('[data-map-expand]').click();});
  map.on('moveend zoomend',()=>{if(canvas.closest('[hidden]'))return;const center=map.getCenter();state.map.view={center:[center.lat,center.lng],zoom:map.getZoom()};capture();});
  new ResizeObserver(()=>map.invalidateSize({pan:false})).observe(canvas);
  return {show,refresh,capture};
};
