'use strict';
(() => {
 const mapHash='#progress/velen', overviewHash='#progress';
 const planets=[
  {id:'nilf',x:0,y:120,art:'nilf.webp',moons:['pyres','mercy']},
  {id:'baron',x:-142,y:-65,art:'baron.webp',moons:['ciris-room']},
  {id:'witch',x:142,y:-65,art:'witch.webp',moons:['wandering-in-the-dark']}
 ];
 const categories={
  story:'Main story',side:'Side quests',contracts:'Contracts',treasure:'Treasure hunts',
  gear:'Gear hunts',encounters:'Encounters',competitions:'Competitions'
 };
 const stateText={open:'Open',active:'In progress',complete:'Complete',failed:'Failed',unavailable:'Progress unavailable'};
 const stateSymbol={open:'○',active:'◐',complete:'✓',failed:'!',unavailable:'?'};
 const regionArt={'White Orchard':'white-orchard-scene.webp',Velen:'velen-landscape-r18.webp'};
 let host, ledger, deck, map, world, controls, detail, filterBox, filterToggle, prev, next, regionCards, regionIndex=0;
 let view={x:0,y:0,zoom:1,planet:null},filters=[],rows=[],points=new Map(),gesture=null;
 let recentDrag=false, zoomTimer;
 const make=(tag,cls,text)=>{
  const element=document.createElement(tag);
  if(cls)element.className=cls;
  if(text)element.textContent=text;
  return element;
 };
 const button=(text,action,cls)=>{
  const element=make('button',cls,text);
  element.type='button';
  element.addEventListener('click',action);
  return element;
 };
 const link=(text,href)=>{
  const element=make('a','progress-chart-action',text);
  element.href=href;
  return element;
 };
 const category=row=>row.category==='quests'?(row.kind==='Main quest'?'story':'side'):row.category;
 const unresolved=row=>row.status==='failed'||row.status==='unavailable';
 const matches=row=>!filters.length||filters.some(filter=>filter==='unresolved'?unresolved(row):category(row)===filter);
 const rowFor=id=>rows.find(row=>row.href.endsWith('/'+id));
 const planetFor=id=>planets.find(planet=>planet.id===id);
 const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
 function saveState(){
  history.replaceState({...history.state,progressChart:{
   regionIndex,filters,view,fromDeck:history.state?.progressChart?.fromDeck===true
  }},'',location.href);
 }
 function paintCamera(){
  world.style.transform='translate('+view.x+'px,'+view.y+'px) scale('+view.zoom+')';
 }
 function center(planet){
  view.x=planet?-planet.x*view.zoom:0;
  view.y=planet?-planet.y*view.zoom:0;
  paintCamera();
 }
 function focusPlanet(planet){
  if(recentDrag)return;
  view.planet=planet.id;
  center(planet);
  paintMap();
  world.querySelector('[data-planet="'+planet.id+'"]')?.focus({preventScroll:true});
  saveState();
 }
 function route(from,to){
  const segment=make('div','progress-chart-route');
  segment.style.left=from.x+'px';
  segment.style.top=from.y+'px';
  segment.style.width=Math.hypot(to.x-from.x,to.y-from.y)+'px';
  segment.style.transform='rotate('+Math.atan2(to.y-from.y,to.x-from.x)+'rad)';
  world.append(segment);
 }
 function place(element,point){
  element.style.left=point.x+'px';
  element.style.top=point.y+'px';
  world.append(element);
 }
 function paintMap(){
  const focused=planetFor(view.planet);
  const visible=planets.filter(planet=>matches(rowFor(planet.id))||planet.moons.some(id=>{
   const row=rowFor(id);
   return row&&matches(row);
  }));
  world.replaceChildren();
  if(visible.includes(planets[0])){
   for(const branch of visible.slice(1))route(planets[0],branch);
  }
  for(const planet of visible){
   const row=rowFor(planet.id);
   const node=button('',()=>focusPlanet(planet),'progress-chart-planet');
   node.dataset.planet=planet.id;
   node.dataset.status=row.status;
   node.setAttribute('aria-label',row.name+' · '+stateText[row.status]);
   node.setAttribute('aria-pressed',String(planet===focused));
   const orb=make('span','progress-chart-orb');
   orb.style.backgroundImage='url("art-velen/'+planet.art+'")';
   orb.append(make('span','progress-chart-symbol',stateSymbol[row.status]));
   node.append(orb,make('span','progress-chart-name',row.name));
   place(node,planet);
  }
  detail.hidden=!visible.includes(focused);
  detail.replaceChildren();
  if(!detail.hidden){
   const row=rowFor(focused.id);
   detail.append(make('h2',null,row.name),make('p',null,stateText[row.status]+(row.total?' · '+row.done+' / '+row.total+' required':'')),
    link(focused.id==='nilf'?'Open quest hub':'Open quest card',row.href));
   const moons=focused.moons.map(rowFor).filter(row=>row&&matches(row));
   moons.forEach((moon,index)=>{
    const point={x:focused.x+(index?106:-106),y:focused.y+65};
    route(focused,point);
    const node=link(stateSymbol[moon.status]+' '+moon.name,moon.href);
    node.classList.add('progress-chart-moon');
    node.dataset.status=moon.status;
    node.setAttribute('aria-label',moon.name+' · '+stateText[moon.status]);
    place(node,point);
   });
  }
  if(!visible.length)world.append(make('p','progress-chart-empty','No pilot quests match these filters.'));
 }
 function paintFilters(){
  filterBox.replaceChildren(make('h2',null,'Activity filters'));
  for(const [id,name] of [...Object.entries(categories),['unresolved','Unresolved']]){
   const label=make('label','progress-chart-filter');
   const input=make('input');
   input.type='checkbox';
   input.checked=filters.includes(id);
   input.addEventListener('change',()=>{
    filters=input.checked?[...filters,id]:filters.filter(filter=>filter!==id);
    paintMap();
    paintCounts();
    saveState();
   });
   label.append(input,document.createTextNode(name));
   filterBox.append(label);
  }
  filterBox.append(button('Clear filters',()=>{filters=[];paintFilters();paintMap();paintCounts();saveState();filterBox.querySelector('input')?.focus();}));
 }
 function paintCounts(){
  const totals=regionCards[1].querySelector('ul');
  totals.replaceChildren();
  for(const [id,name] of [...Object.entries(categories),['unresolved','Unresolved']]){
   if(filters.length&&!filters.includes(id))continue;
   const matching=rows.filter(row=>id==='unresolved'?unresolved(row):category(row)===id);
   if(matching.length)totals.append(make('li',null,name+' · '+(id==='unresolved'?matching.length:matching.filter(row=>row.status==='complete').length+'/'+matching.length)));
  }
  if(!totals.children.length)totals.append(make('li',null,'No tracked entries match'));
 }
 function nearestRegion(){
  const center=deck.scrollLeft+deck.clientWidth/2;
  return regionCards.reduce((closest,card,index)=>Math.abs(card.offsetLeft+card.offsetWidth/2-center)
   <Math.abs(regionCards[closest].offsetLeft+regionCards[closest].offsetWidth/2-center)?index:closest,0);
 }
 function paintDeck(){
  regionCards.forEach((card,index)=>{
   card.tabIndex=index===regionIndex?0:-1;
   card.setAttribute('aria-current',String(index===regionIndex));
  });
  prev.disabled=regionIndex===0;
  next.disabled=regionIndex===regionCards.length-1;
 }
 function selectRegion(index,behavior='smooth'){
  regionIndex=clamp(index,0,regionCards.length-1);
  const card=regionCards[regionIndex];
  deck.scrollTo({left:card.offsetLeft+(card.offsetWidth-deck.clientWidth)/2,behavior});
  paintDeck();
 }
 function buildOverview(){
  const overview=make('section','progress-chart-overview');
  overview.append(make('h2',null,'Region progress'));
  deck=make('div','progress-chart-deck');
  deck.setAttribute('aria-label','Region systems');
  regionCards=Object.keys(regionArt).map((name,index)=>{
   const card=button('',()=>{
    if(index!==nearestRegion()){selectRegion(index);return;}
    saveState();
    if(index===0){location.hash='#progress/ledger';return;}
    location.hash=mapHash;
    history.replaceState({...history.state,progressChart:{regionIndex,filters,fromDeck:true}},'',location.href);
   },'progress-chart-system');
   card.style.backgroundImage='url("'+regionArt[name]+'")';
   const counts=make('ul');
   if(index===0)counts.append(make('li',null,'Open recorded progress'));
   card.append(make('strong',null,name),counts);
   deck.append(card);
   return card;
  });
  deck.addEventListener('scroll',()=>{
   if(!deck.clientWidth)return;
   regionIndex=nearestRegion();
   paintDeck();
  },{passive:true});
  deck.addEventListener('keydown',event=>{
   if(!['ArrowLeft','ArrowRight'].includes(event.key))return;
   event.preventDefault();
   selectRegion(regionIndex+(event.key==='ArrowRight'?1:-1),'instant');
   regionCards[regionIndex].focus({preventScroll:true});
  });
  const buttons=make('nav','progress-chart-deck-controls');
  buttons.setAttribute('aria-label','Browse region systems');
  prev=button('Previous',()=>selectRegion(regionIndex-1));
  next=button('Next',()=>selectRegion(regionIndex+1));
  buttons.append(prev,next);
  overview.append(deck,buttons);
  return overview;
 }
 function gestureFrame(){
  const [a,b]=points.values();
  return b?{x:(a.x+b.x)/2,y:(a.y+b.y)/2,distance:Math.hypot(a.x-b.x,a.y-b.y)}:{x:a.x,y:a.y,distance:0};
 }
 function currentPlanet(){
  return planets.find(planet=>rowFor(planet.id)?.status==='active')
   ||planets.find(planet=>rowFor(planet.id)?.status==='open')||planets[0];
 }
 function buildMap(){
  const shell=make('section','progress-chart-screen');
  shell.setAttribute('aria-label','Velen progress star chart');
  map=make('div','progress-chart-field');
  map.tabIndex=0;
  map.setAttribute('aria-label','Velen quest map. Use arrow keys to pan and plus or minus to zoom.');
  world=make('div','progress-chart-world');
  map.append(world);
  map.addEventListener('pointerdown',event=>{
   if(event.button!==0)return;
   if(!points.size)recentDrag=false;
   points.set(event.pointerId,{x:event.clientX,y:event.clientY});
   gesture=gestureFrame();
  });
  map.addEventListener('pointermove',event=>{
   if(!points.has(event.pointerId))return;
   points.set(event.pointerId,{x:event.clientX,y:event.clientY});
   const frame=gestureFrame();
   if(!recentDrag&&points.size===1&&Math.hypot(frame.x-gesture.x,frame.y-gesture.y)<5)return;
   recentDrag=true;
   map.setPointerCapture(event.pointerId);
   const scale=gesture.distance?clamp(view.zoom*frame.distance/gesture.distance,.55,2.4):view.zoom;
   const rect=map.getBoundingClientRect();
   const x=gesture.x-rect.left-rect.width/2,y=gesture.y-rect.top-rect.height/2;
   view.x=x+(view.x-x)*scale/view.zoom+frame.x-gesture.x;
   view.y=y+(view.y-y)*scale/view.zoom+frame.y-gesture.y;
   view.zoom=scale;
   gesture=frame;
   paintCamera();
  });
  function finish(event){
   if(!points.delete(event.pointerId))return;
   gesture=points.size?gestureFrame():null;
   if(!gesture&&recentDrag)saveState();
  }
  map.addEventListener('pointerup',finish);
  map.addEventListener('pointercancel',finish);
  map.addEventListener('pointerleave',event=>{if(!map.hasPointerCapture(event.pointerId))finish(event);});
  map.addEventListener('click',event=>{if(recentDrag){event.preventDefault();event.stopPropagation();recentDrag=false;}},true);
  map.addEventListener('wheel',event=>{
   event.preventDefault();
   view.zoom=clamp(view.zoom*Math.exp(-event.deltaY*.002),.55,2.4);
   paintCamera();
   clearTimeout(zoomTimer);
   zoomTimer=setTimeout(()=>{if(location.hash===mapHash)saveState();},120);
  },{passive:false});
  map.addEventListener('keydown',event=>{
   if(event.target!==map)return;
   const key=event.key;
   if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','-','='].includes(key))return;
   event.preventDefault();
   if(key==='ArrowLeft')view.x+=45;
   else if(key==='ArrowRight')view.x-=45;
   else if(key==='ArrowUp')view.y+=45;
   else if(key==='ArrowDown')view.y-=45;
   else view.zoom=clamp(view.zoom*(key==='-'?.9:1.1),.55,2.4);
   paintCamera();
   saveState();
  });
  controls=make('nav','progress-chart-controls');
  controls.setAttribute('aria-label','Star chart controls');
  controls.append(button('Back',()=>{
   if(history.state?.progressChart?.fromDeck)history.back();
   else location.hash=overviewHash;
  }));
  filterBox=make('div','progress-chart-filters');
  filterBox.id='progress-chart-filters';
  filterBox.hidden=true;
  filterToggle=button('Filters',()=>{
   filterBox.hidden=!filterBox.hidden;
   filterToggle.setAttribute('aria-expanded',String(!filterBox.hidden));
  });
  filterToggle.setAttribute('aria-controls',filterBox.id);
  filterToggle.setAttribute('aria-expanded','false');
  controls.append(filterToggle,button('Recenter',()=>{
   view.zoom=1;
   center(planetFor(view.planet)||currentPlanet());
   saveState();
  }));
  detail=make('section','progress-chart-detail');
  shell.append(map,make('h1','progress-chart-title','Velen'),controls,filterBox,detail);
  return shell;
 }
 function display(){
  if(!host){
   const progress=document.getElementById('progress');
   ledger=progress.querySelector('.main-parchment');
   host=make('div','progress-chart');
   ledger.before(host);
   host.append(buildOverview(),buildMap());
  }
  const saved=history.state?.progressChart;
  rows=window.PhoenixVelen.regionalProgress();
  if(location.hash===mapHash&&saved?.filters)filters=saved.filters;
  if(location.hash===mapHash){
   regionIndex=1;
   host.firstElementChild.hidden=true;
   host.lastElementChild.hidden=false;
   ledger.hidden=true;
   filterBox.hidden=true;
   filterToggle.setAttribute('aria-expanded','false');
   view=saved?.view?{...saved.view}:{x:0,y:0,zoom:1,planet:null};
   if(!saved?.view){
    const focus=currentPlanet();
    view.planet=focus.id;
    center(focus);
   }else paintCamera();
   paintFilters();
   paintMap();
   saveState();
   controls.querySelector('button').focus({preventScroll:true});
  }else{
   const showingLedger=location.hash==='#progress/ledger';
   host.firstElementChild.hidden=showingLedger;
   host.lastElementChild.hidden=true;
   ledger.hidden=!showingLedger;
   if(showingLedger){
    if(!ledger.querySelector('.progress-chart-action'))ledger.prepend(link('Back to region progress',overviewHash));
    const whiteOrchard=ledger.querySelector('.home-hud');
    if(whiteOrchard)whiteOrchard.open=true;
   }else{
    const index=saved?.regionIndex??regionIndex;
    regionIndex=index;
    paintCounts();
    requestAnimationFrame(()=>{
     if(location.hash!==overviewHash&&location.hash!=='')return;
     selectRegion(index,'instant');
     if(saved)regionCards[index].focus({preventScroll:true});
    });
   }
  }
 }
 addEventListener('phoenix:route-rendered',event=>{
  if(event.detail.root==='progress'&&window.PhoenixVelen)display();
 });
})();
