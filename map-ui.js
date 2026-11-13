'use strict';
// Original console integration; coordinate adaptation credits are in MAP-SOURCES.md.
window.createPhoenixMap = function({tasks,hubs,state,onPin,persist,eligible,onCapture}) {
  const data=window.PHOENIX_MAP,canvas=document.getElementById('orchard-map');
  const status=document.querySelector('[data-map-status]');
  if(!window.L){status.textContent='The map could not load. Reload the page to try again.';return {show(){},refresh(){},capture(){}};}
  const bounds=[[0,0],[data.height,data.width]];
  const map=L.map(canvas,{crs:L.CRS.Simple,minZoom:-4,maxZoom:1,zoomSnap:.25,zoomDelta:.5,maxBounds:[[-250,-250],[data.height+250,data.width+250]],maxBoundsViscosity:.9,attributionControl:false,scrollWheelZoom:false,keyboard:true});
  L.imageOverlay(data.image,bounds,{alt:'In-game White Orchard terrain map',interactive:false}).addTo(map).on('error',()=>{status.textContent='Map image unavailable. Reload to try again.';});
  const labels=L.layerGroup().addTo(map);
  data.labels.forEach(label=>L.marker(label.point,{icon:L.divIcon({className:'native-map-label',html:'<span>'+label.name+'</span>',iconSize:[140,20],iconAnchor:[70,-12]}),interactive:false,keyboard:false}).addTo(labels));
  const layer=L.layerGroup().addTo(map);
  const types={"pop": ["Places of Power", "pop"], "diagram": ["Diagrams", "poi"], "service": ["Services", "armourer"], "gwent": ["Gwent", "gwent"], "notice": ["Notice boards", "notice"], "abandoned": ["Abandoned sites", "abandoned"], "buff": ["Equipment enhancements", "grindstone"], "camp": ["Bandit camps", "banditcamp"], "entrance": ["Entrances", "entrance"], "guarded": ["Guarded treasure", "guarded"], "hidden": ["Hidden treasure", "hidden"], "nest": ["Monster nests", "monsternest"], "poi": ["Discoveries", "poi"], "signpost": ["Signposts", "fasttravel"], "cache": ["Water caches", "smugglers"], "quest": ["Quest starts", "sidequests"], "contract": ["Contracts", "tempcontract"]};
  let focusedTask=null,focusedHub=null,scope=null,first=true,saveTimer;
  const panel=document.querySelector("[data-map-panel]");
  function iconFor(pin){return pin.icon||(pin.id==='tomira'?'herbalist':types[pin.type][1]);}
  function matches(pin){return (state.map.type==='all'||state.map.type===pin.type)&&(isUtility(pin)||state.map.showCompleted||!state.completed[pin.task])&& (pin.name+' '+tasks[pin.task].name+' '+(hubs.find(h=>h.id===tasks[pin.task].home)?.name||'')).toLocaleLowerCase().includes(state.map.search.trim().toLocaleLowerCase());}
  function visiblePins(){const cluster=scope?hubs.find(h=>h.id===scope):null;const allowed=cluster?eligible(cluster):null;return data.markers.filter(p=>(!allowed||allowed.includes(p.task))&&(p.task===focusedTask||matches(p)));}
  function refresh(){
    layer.clearLayers();const pins=visiblePins();
    pins.forEach(pin=>{
      const done=!isUtility(pin)&&state.completed[pin.task]===true,focus=pin.task===focusedTask||tasks[pin.task].home===focusedHub;
      const marker=L.marker(pin.point,{title:pin.name,alt:pin.name,keyboard:true,riseOnHover:true,icon:L.divIcon({className:'native-pin'+(done?' is-complete':'')+(focus?' is-focused':''),html:'<img src="map-icon-'+iconFor(pin)+'.png" alt="" draggable="false">'+(done?'<span aria-hidden="true">✓</span>':''),iconSize:[44,44],iconAnchor:[22,22]})});
      marker.on('click',()=>openPin(pin));marker.addTo(layer);
      const el=marker.getElement();if(el){el.setAttribute('role','button');el.setAttribute('aria-label',pin.name+(done?', completed':'')+'. Open '+(isUtility(pin)?'location panel':'guide'));el.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();openPin(pin);}});}
    });
    const count=document.querySelector('[data-map-count]');count.textContent=pins.length+' of '+data.markers.length+' guide-linked markers';
    const list=document.querySelector('[data-map-links]');list.replaceChildren();
    pins.forEach(pin=>{const row=document.createElement('div');row.className='map-test-row';const button=document.createElement('button');button.type='button';button.textContent=pin.name+(!isUtility(pin)&&state.completed[pin.task]?' ✓':'');button.addEventListener('click',()=>openPin(pin));row.append(button);list.append(row);});
    document.querySelector('[data-map-empty]').hidden=pins.length>0;
  }
  function fit(){map.fitBounds(bounds,{padding:[14,14],animate:false});}
  function focusTask(id){
    focusedHub=null;
    const pins=data.markers.filter(p=>p.task===id);focusedTask=pins.length?id:null;refresh();
    if(pins.length){map.fitBounds(L.latLngBounds(pins.map(p=>p.point)).pad(.35),{maxZoom:-.25,padding:[65,65],animate:false});status.textContent='Location: '+tasks[id].name+'. Tap its icon to open the guide.';return true;}
    return false;
  }
  function isUtility(pin){return ['service','buff','signpost','notice'].includes(pin.type);}
  function openPin(pin){capture();if(!isUtility(pin)){panel.hidden=true;onPin(pin.task);return;}
    panel.replaceChildren();panel.hidden=false;const title=document.createElement('h2');title.textContent=pin.name;panel.append(title);
    const task=tasks[pin.task],description=document.createElement('p');description.textContent=pin.type==='signpost'?'Fast travel signpost. Discover it in the game to use it.':pin.type==='buff'?'Temporary equipment enhancement. Use the station before heading out.':pin.type==='notice'?'Read local notices to discover contracts and other leads.':task.requirements||'Regional service';panel.append(description);
    if(task.completionDefinition){const meaning=document.createElement('p');meaning.className='completion-meaning';meaning.textContent='Completion meaning: '+task.completionDefinition;const legacy=document.createElement('p');legacy.className='quiet';legacy.textContent='Earlier marks remain as recorded; this label does not retroactively verify actions.';panel.append(meaning,legacy);}
    const knownFlags=data.merchantFlags?.[pin.id]||[];if(knownFlags.length){const flags=document.createElement('p');flags.textContent=knownFlags.map(flag=>flag.label).join(' · ');panel.append(flags);const sources=document.createElement('details'),summary=document.createElement('summary');summary.textContent='Flag references';sources.append(summary);knownFlags.forEach(flag=>{const a=document.createElement('a');a.href=flag.source;a.textContent=flag.label+' — source';a.target='_blank';a.rel='noopener noreferrer';sources.append(a);});panel.append(sources);}
    if(pin.type==='service'){const link=document.createElement('a');link.href='#economy-merchants/'+pin.id;link.textContent='Economy → Merchant details';panel.append(link);}
    const hubLink=document.createElement('a');hubLink.href='#whiteorchard-tree/'+task.home;hubLink.textContent='Related quest hub →';panel.append(hubLink);
    const close=document.createElement('button');close.type='button';close.textContent='Close location panel';close.addEventListener('click',()=>panel.hidden=true);panel.append(close);panel.scrollIntoView({block:'nearest'});title.setAttribute('tabindex','-1');title.focus({preventScroll:true});
  }
  function focusHub(home=state.selectedHub){
    focusedTask=null;focusedHub=null;scope=home;const hub=hubs.find(h=>h.id===home),allowed=hub?eligible(hub):[],pins=data.markers.filter(p=>allowed.includes(p.task));
    if(pins.length)map.fitBounds(L.latLngBounds(pins.map(p=>p.point)).pad(.3),{maxZoom:-.25,padding:[65,65],animate:false});else fit();
    status.textContent=pins.length?'Cluster map: '+hub.name+'. Only this group’s available activities are shown.':'No confirmed mapped activities for this cluster. Update progress or show all markers.';refresh();
  }
  function capture(){const center=map.getCenter(),context={scope,focusedTask,type:state.map.type,search:state.map.search,showCompleted:state.map.showCompleted,expanded:document.querySelector('.native-map-shell').classList.contains('map-expanded'),view:{center:[center.lat,center.lng],zoom:map.getZoom()}};state.mapContext=context;onCapture?.(context);persist();return context;}
  function show(task,hubId,entryContext){
    panel.hidden=true;map.invalidateSize({pan:false});
    const context=entryContext||state.mapContext;
    if(task==='restore'&&context&&Array.isArray(context.view?.center)&&context.view.center.length===2&&context.view.center.every(Number.isFinite)&&Number.isFinite(context.view.zoom)){
      scope=hubs.some(h=>h.id===context.scope)?context.scope:null;focusedTask=tasks[context.focusedTask]?context.focusedTask:null;focusedHub=null;
      state.map.type=Object.hasOwn(types,context.type)?context.type:'all';state.map.search=typeof context.search==='string'?context.search:'';state.map.showCompleted=context.showCompleted===true;
      type.value=state.map.type;search.value=state.map.search;completed.checked=state.map.showCompleted;
      document.querySelector('.native-map-shell').classList.toggle('map-expanded',context.expanded===true);const expand=document.querySelector('[data-map-expand]');expand.textContent=context.expanded?'Close expanded map':'Expand map';expand.setAttribute('aria-expanded',String(context.expanded===true));map.invalidateSize({pan:false});
      map.setView(context.view.center,Math.max(-4,Math.min(1,context.view.zoom)),{animate:false});refresh();status.textContent='Your map position, zoom and filters restored.';first=false;return;
    }
    if(first){first=false;const saved=state.map.view;if(saved&&Array.isArray(saved.center)&&saved.center.length===2&&saved.center.every(Number.isFinite)&&Number.isFinite(saved.zoom))map.setView(saved.center,Math.max(-4,Math.min(1,saved.zoom)),{animate:false});else fit();}
    if(task==='cluster'&&hubs.some(h=>h.id===hubId)){state.map.type='all';state.map.search='';type.value='all';search.value='';focusHub(hubId);}
    else if(task&&tasks[task]){scope=null;focusedHub=null;if(!focusTask(task))focusHub(tasks[task].home);}
    else {scope=null;focusedHub=null;focusedTask=null;refresh();status.textContent='Drag to pan. Pinch or use + / − to zoom. Tap a quest or discovery to open its guide.';}
  }
  const type=document.querySelector('[data-map-type]'),search=document.querySelector('[data-map-search]'),completed=document.querySelector('[data-map-completed]');
  type.value=state.map.type;search.value=state.map.search;completed.checked=state.map.showCompleted;
  function filter(){focusedTask=null;focusedHub=null;state.map.type=type.value;state.map.search=search.value.slice(0,100);state.map.showCompleted=completed.checked;refresh();capture();status.textContent='Filters updated. Tap a quest or discovery icon to open its guide.';}
  type.addEventListener('change',filter);search.addEventListener('input',filter);completed.addEventListener('change',filter);
  document.querySelector('[data-map-all]').addEventListener('click',()=>{scope=null;focusedTask=null;focusedHub=null;state.map.type='all';state.map.search='';type.value='all';search.value='';refresh();fit();status.textContent='All regional marker types. Completed activities follow your visibility setting.';capture();});
  document.querySelector('[data-map-fit]').addEventListener('click',()=>{focusedTask=null;focusedHub=null;fit();refresh();status.textContent='Showing all of White Orchard. Your filters still apply.';capture();});
  document.querySelector('[data-map-quest]').addEventListener('click',()=>focusHub());
  document.querySelector('[data-map-expand]').addEventListener('click',event=>{const shell=document.querySelector('.native-map-shell');const expanded=shell.classList.toggle('map-expanded');event.currentTarget.textContent=expanded?'Close expanded map':'Expand map';event.currentTarget.setAttribute('aria-expanded',String(expanded));map.invalidateSize({pan:false});});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.querySelector('.map-expanded'))document.querySelector('[data-map-expand]').click();});
  map.on('moveend zoomend',()=>{if(canvas.closest('[hidden]'))return;const center=map.getCenter();state.map.view={center:[center.lat,center.lng],zoom:map.getZoom()};capture();});
  new ResizeObserver(()=>map.invalidateSize({pan:false})).observe(canvas);
  return {show,refresh,capture};
};
