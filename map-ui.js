'use strict';
// Original console integration; coordinate adaptation credits are in MAP-SOURCES.md.
window.createPhoenixMap = function({tasks,hubs,state,onPin,persist}) {
  const data=window.PHOENIX_MAP,canvas=document.getElementById('orchard-map');
  const status=document.querySelector('[data-map-status]');
  if(!window.L){status.textContent='The map could not load. Reload the page to try again.';return {show(){},refresh(){}};}
  const bounds=[[0,0],[data.height,data.width]];
  const map=L.map(canvas,{crs:L.CRS.Simple,minZoom:-4,maxZoom:1,zoomSnap:.25,zoomDelta:.5,maxBounds:[[-250,-250],[data.height+250,data.width+250]],maxBoundsViscosity:.9,attributionControl:false,scrollWheelZoom:false,keyboard:true});
  L.imageOverlay(data.image,bounds,{alt:'In-game White Orchard terrain map',interactive:false}).addTo(map).on('error',()=>{status.textContent='Map image unavailable. Reload to try again.';});
  const labels=L.layerGroup().addTo(map);
  data.labels.forEach(label=>L.marker(label.point,{icon:L.divIcon({className:'native-map-label',html:'<span>'+label.name+'</span>',iconSize:[140,20],iconAnchor:[70,-12]}),interactive:false,keyboard:false}).addTo(labels));
  const layer=L.layerGroup().addTo(map);
  const types={"pop": ["Places of Power", "pop"], "diagram": ["Diagrams", "poi"], "service": ["Services", "armourer"], "gwent": ["Gwent", "gwent"], "notice": ["Notice boards", "notice"], "abandoned": ["Abandoned sites", "abandoned"], "buff": ["Equipment enhancements", "grindstone"], "camp": ["Bandit camps", "banditcamp"], "entrance": ["Entrances", "entrance"], "guarded": ["Guarded treasure", "guarded"], "hidden": ["Hidden treasure", "hidden"], "nest": ["Monster nests", "monsternest"], "poi": ["Discoveries", "poi"], "signpost": ["Signposts", "fasttravel"], "cache": ["Water caches", "smugglers"], "quest": ["Quest starts", "sidequests"], "contract": ["Contracts", "tempcontract"]};
  let focusedTask=null,focusedHub=null,first=true,saveTimer;
  function iconFor(pin){return pin.icon||(pin.id==='tomira'?'herbalist':types[pin.type][1]);}
  function matches(pin){return (state.map.type==='all'||state.map.type===pin.type)&&(state.map.showCompleted||!state.completed[pin.task])&& (pin.name+' '+tasks[pin.task].name+' '+(hubs.find(h=>h.id===tasks[pin.task].home)?.name||'')).toLocaleLowerCase().includes(state.map.search.trim().toLocaleLowerCase());}
  function visiblePins(){return data.markers.filter(p=>p.task===focusedTask||tasks[p.task].home===focusedHub||matches(p));}
  function refresh(){
    layer.clearLayers();const pins=visiblePins();
    pins.forEach(pin=>{
      const done=state.completed[pin.task]===true,focus=pin.task===focusedTask||tasks[pin.task].home===focusedHub;
      const marker=L.marker(pin.point,{title:pin.name,alt:pin.name,keyboard:true,riseOnHover:true,icon:L.divIcon({className:'native-pin'+(done?' is-complete':'')+(focus?' is-focused':''),html:'<img src="map-icon-'+iconFor(pin)+'.png" alt="" draggable="false">'+(done?'<span aria-hidden="true">✓</span>':''),iconSize:[44,44],iconAnchor:[22,22]})});
      marker.on('click',()=>onPin(pin.task));marker.addTo(layer);
      const el=marker.getElement();if(el){el.setAttribute('role','button');el.setAttribute('aria-label',pin.name+(done?', completed':'')+'. Open assigned quest hub');el.addEventListener('keydown',event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();event.stopPropagation();onPin(pin.task);}});}
    });
    const count=document.querySelector('[data-map-count]');count.textContent=pins.length+' of '+data.markers.length+' guide-linked markers';
    const list=document.querySelector('[data-map-links]');list.replaceChildren();
    pins.forEach(pin=>{const row=document.createElement('div');row.className='map-test-row';const a=document.createElement('a');a.textContent=pin.name+(state.completed[pin.task]?' ✓':'');a.href='#whiteorchard-tree/'+tasks[pin.task].home+'/'+pin.task;row.append(a);list.append(row);});
    document.querySelector('[data-map-empty]').hidden=pins.length>0;
  }
  function fit(){map.fitBounds(bounds,{padding:[14,14],animate:false});}
  function focusTask(id){
    focusedHub=null;
    const pins=data.markers.filter(p=>p.task===id);focusedTask=pins.length?id:null;refresh();
    if(pins.length){map.fitBounds(L.latLngBounds(pins.map(p=>p.point)).pad(.35),{maxZoom:-.25,padding:[65,65],animate:false});status.textContent='Location: '+tasks[id].name+'. Tap its icon to return to the quest hub.';return true;}
    return false;
  }
  function focusHub(home=state.selectedHub){
    focusedTask=null;focusedHub=home;let pins=data.markers.filter(p=>tasks[p.task].home===home);
    const anchor=hubs.find(h=>h.id===home)?.mapAnchor;
    if(!pins.length&&anchor){pins=data.markers.filter(p=>p.task===anchor);focusedTask=anchor;focusedHub=null;}
    if(pins.length){map.fitBounds(L.latLngBounds(pins.map(p=>p.point)).pad(.3),{maxZoom:-.25,padding:[65,65],animate:false});status.textContent='Mapped stops for your selected quest.';}
    else {focusedHub=null;fit();status.textContent='This quest has no verified pin yet. Showing the regional map.';}
    refresh();
  }
  function show(task){
    focusedHub=null;
    map.invalidateSize({pan:false});
    if(first){first=false;const saved=state.map.view;if(saved&&Array.isArray(saved.center)&&saved.center.length===2&&saved.center.every(Number.isFinite)&&Number.isFinite(saved.zoom))map.setView(saved.center,Math.max(-4,Math.min(1,saved.zoom)),{animate:false});else fit();}
    if(task&&tasks[task]){if(!focusTask(task))focusHub(tasks[task].home);}
    else {focusedTask=null;refresh();status.textContent='Drag to pan. Pinch or use + / − to zoom. Tap an icon to open its quest hub.';}
  }
  const type=document.querySelector('[data-map-type]'),search=document.querySelector('[data-map-search]'),completed=document.querySelector('[data-map-completed]');
  type.value=state.map.type;search.value=state.map.search;completed.checked=state.map.showCompleted;
  function filter(){focusedTask=null;focusedHub=null;state.map.type=type.value;state.map.search=search.value.slice(0,100);state.map.showCompleted=completed.checked;refresh();persist();status.textContent='Filters updated. Tap a visible icon to open its quest hub.';}
  type.addEventListener('change',filter);search.addEventListener('input',filter);completed.addEventListener('change',filter);
  document.querySelector('[data-map-fit]').addEventListener('click',()=>{focusedTask=null;focusedHub=null;fit();refresh();status.textContent='Showing all of White Orchard. Your filters still apply.';});
  document.querySelector('[data-map-quest]').addEventListener('click',()=>focusHub());
  document.querySelector('[data-map-expand]').addEventListener('click',event=>{const shell=document.querySelector('.native-map-shell');const expanded=shell.classList.toggle('map-expanded');event.currentTarget.textContent=expanded?'Close expanded map':'Expand map';event.currentTarget.setAttribute('aria-expanded',String(expanded));map.invalidateSize({pan:false});});
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.querySelector('.map-expanded'))document.querySelector('[data-map-expand]').click();});
  map.on('moveend zoomend',()=>{clearTimeout(saveTimer);saveTimer=setTimeout(()=>{const center=map.getCenter();state.map.view={center:[center.lat,center.lng],zoom:map.getZoom()};persist();},150);});
  new ResizeObserver(()=>map.invalidateSize({pan:false})).observe(canvas);
  return {show,refresh};
};
