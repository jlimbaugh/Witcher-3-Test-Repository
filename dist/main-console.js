'use strict';
/* Stage 1: main navigation and shared landings. Never writes quest progress. */
(()=>{
 const make=(tag,text,cls)=>{const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n;};
 const link=(text,href,cls)=>{const a=make('a',text,cls);a.href=href;return a;};
 const art=(src)=>{const im=make('img');im.src=src;im.alt='';im.loading='lazy';return im;};
 const main=document.querySelector('main');
 const navigationCards=window.PhoenixNavigationArt.entries.filter(entry=>entry.href).map(entry=>[entry.label,entry.href,entry.src]);
 const regions=[
  {name:'White Orchard',sub:'Temeria · Beginning of the Path',href:'#whiteorchard-console',art:'white-orchard-scene.webp'},
  {name:'Velen',sub:'No Man’s Land · Arrival pilot',href:'#velen',art:'velen-landscape-r18.webp'},
  {name:'Novigrad',sub:'Free City',art:'gwent-r15/cavalry.webp'},
  {name:'Oxenfurt',sub:'Redania',art:'gwent-r15/gabor.webp'},
  {name:'Skellige',sub:'The Isles',art:'gwent-r15/woodland.webp'},
  {name:'Kaer Morhen',sub:'The Wolf School',art:'art-r13/q-viper-card.webp'},
  {name:'Vizima',sub:'Royal Palace',art:'gwent-r15/ivo.webp'},
  {name:'Toussaint',sub:'Blood and Wine',expansion:'baw',art:'gwent-r15/isbel.webp'}
 ];
 function frame(id,title,description){const section=make('section',null,'view scene main-console-view');section.id=id;section.hidden=true;section.setAttribute('aria-labelledby',id+'-heading');const inner=make('div',null,'main-console-inner');const hero=make('header',null,'main-console-hero');hero.append(art('white-orchard-scene.webp'),make('p','THE WITCHER · FIELD GUIDE','eyebrow'));const h=make('h1',title);h.id=id+'-heading';hero.append(h,make('p',description,'main-console-intro'));inner.append(hero);section.append(inner);main.append(section);return {section,inner};}
 function parchment(title){const n=make('section',null,'main-parchment');if(title)n.append(make('h2',title));return n;}
 function tile(title,description,src,href){const a=href?link('',href,'main-entry-card'):make('button',null,'main-entry-card is-unbuilt');if(!href){a.type='button';a.disabled=true;}a.append(art(src),make('strong',title),make('span',href?description:'Not built yet'));return a;}
 function regionDeck(host){
  const {wrap,DeckMotion,bindDrag}=window.PhoenixDeckMotion;
  const section=parchment('Choose your region');section.classList.add('main-region-selector');
  const viewport=make('div',null,'main-region-orbit continuous-region-deck');viewport.setAttribute('role','group');viewport.setAttribute('aria-label','Geographic regions');viewport.tabIndex=0;
  const page=host.closest('.view').id,key=page+'RegionPhase',motion=new DeckMotion(Number.isFinite(history.state?.[key])?history.state[key]:0);
  const cards=regions.map(r=>{const a=r.href?link('',r.href,'main-region-card'):make('button',null,'main-region-card');if(!r.href){a.type='button';a.disabled=true;}const image=art(r.art);image.draggable=false;a.append(image,make('small',r.sub),make('strong',r.name),make('span',r.href?'Enter region →':'Not built yet'));viewport.append(a);return a;});
  const controls=make('div',null,'main-deck-controls'),prev=make('button','← Previous'),count=make('span'),next=make('button','Next →');prev.type=next.type='button';prev.setAttribute('aria-label','Previous region');next.setAttribute('aria-label','Next region');count.setAttribute('aria-live','polite');controls.append(prev,count,next);
  function save(){history.replaceState({...history.state,[key]:motion.position},'',location.href);}
  function paint(){const front=wrap(Math.round(motion.position),cards.length);cards.forEach((card,i)=>{const d=wrap(i-motion.position+cards.length/2,cards.length)-cards.length/2,near=Math.abs(d)<2.1,scale=Math.max(.7,1-Math.abs(d)*.15);card.hidden=!near;card.style.transform='translateX(calc(-50% + '+(d*168)+'px)) rotate('+(d*9)+'deg) scale('+scale+')';card.style.opacity=String(Math.max(0,1-Math.abs(d)*.55));card.style.zIndex=String(10-Math.round(Math.abs(d)*3));card.tabIndex=i===front?0:-1;card.setAttribute('aria-hidden',String(!near));card.classList.toggle('is-unbuilt',!regions[i].href);const r=regions[i];card.querySelector('span').textContent=r.href?'Enter region →':'Not built yet';});if(!motion.velocity)count.textContent=(front+1)+' / '+cards.length+' · '+regions[front].name;}
  const gesture=bindDrag(viewport,motion,{paint,save,isVisible:()=>!host.closest('.view').hidden,pixelsPerCard:()=>168});
  prev.onclick=()=>{gesture.stop();motion.position--;paint();save();};next.onclick=()=>{gesture.stop();motion.position++;paint();save();};
  viewport.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();gesture.stop();motion.position=e.key==='Home'?0:e.key==='End'?cards.length-1:Math.round(motion.position)+(e.key==='ArrowRight'?1:-1);paint();save();const card=cards[wrap(Math.round(motion.position),cards.length)];if(!card.disabled)card.focus({preventScroll:true});});
  viewport.addEventListener('click',save);
  section.append(viewport,controls,make('p','Swipe to browse · Tap a region to enter','main-hint'));host.append(section);
  const api={restore(){gesture.stop();if(Number.isFinite(history.state?.[key]))motion.position=history.state[key];paint();},paint};paint();return api;
 }
 const home=frame('home','The Path','One guide. Every region. Your journey.');
 const resume=link('', '#regions','main-resume main-parchment');resume.append(make('small','YOUR NEXT STEP'),make('strong','Choose your starting region'),make('span','Start here, or join an existing playthrough →'));home.inner.append(resume);
 const homeDeck=regionDeck(home.inner);
 function toolsMount(host,region){
  const mount=make('div');mount.dataset.regionalTools=region;host.append(mount);
 }
 toolsMount(home.inner,'selected');
 const oldRegions=document.getElementById('regions');oldRegions.replaceChildren();const regionInner=make('div',null,'main-console-inner');oldRegions.classList.add('main-console-view');oldRegions.append(regionInner);const rh=make('h1','Regions');rh.id='regions-title';regionInner.append(rh,make('p','Choose a place. Follow its stories.','main-console-intro'));const regionsDeck=regionDeck(regionInner);toolsMount(regionInner,'selected');
 const ref=frame('field-reference','Field Reference','The knowledge behind the journey.');
 const subjects=[['Economy','Earning, buying and merchants','gwent-r15/gabor.webp','#economy'],['Character','Builds, gear and crafting','gwent-r15/ivo.webp'],['Combat','Swords, Signs and Bestiary','art-r13/q-beast-card.webp'],['Alchemy','Recipes, effects and ingredients','art-r13/q-death-card.webp'],['Gwent','Cards, decks and opponents','gwent-r15/isbel.webp']];
 const refRail=make('nav',null,'reference-rail');refRail.setAttribute('aria-label','Field Reference subjects');subjects.forEach(([a,b,c,d])=>refRail.append(tile(a,b,c,d)));ref.inner.append(refRail);const tools=make('div',null,'main-deck-controls'),rp=make('button','← Previous'),rn=make('button','Next →');rp.type=rn.type='button';rp.setAttribute('aria-label','Previous reference subjects');rn.setAttribute('aria-label','Next reference subjects');rp.onclick=()=>refRail.scrollBy({left:-210,behavior:'auto'});rn.onclick=()=>refRail.scrollBy({left:210,behavior:'auto'});tools.append(rp,make('span','Swipe to browse'),rn);ref.inner.append(tools);
 const eco=frame('economy','Economy','Make every crown count.');const eg=make('nav',null,'main-entry-grid');eg.append(tile('Merchants','Locations and services','gwent-r15/gabor.webp','#economy-merchants'),tile('Earning & selling','','gwent-r15/cavalry.webp'),tile('Buying & saving','','art-r13/q-viper-card.webp'),tile('Loot & materials','','art-r13/q-deserter-card.webp'));eco.inner.append(eg,link('← Field Reference','#field-reference','main-back'));
 // Header destinations now describe the whole guide.
 const header=document.querySelector('.guide-bar nav');header.replaceChildren(...navigationCards.map(([label,href])=>link(label,href)));
 function decorateNavigation(context){return window.PhoenixNavigationArt.decorate(context);}
 function recordWalkthrough(href,name,stageNumber){try{localStorage.setItem('phoenix.guide.resume.v1',JSON.stringify({href,name,stageNumber}));}catch{}}
 function attach({state,tasks,navigate}){
  // Move the existing summary to its single shared landing; preserve local quest counts.
  // Standalone Progress is retired (Order 017). The legacy White Orchard Journey HUD stays off the console, as it was in V50; recorded progress is shown on the Main Map.
  const hud=document.querySelector('#whiteorchard-console .home-hud');if(hud){hud.open=false;hud.remove();}
  document.querySelector('#whiteorchard-console .home-selected')?.after(link('View Progress on Main Map →','#whiteorchard-map','regional-progress-link'));
  function refresh(){let shared=null;try{shared=JSON.parse(localStorage.getItem('phoenix.guide.resume.v1')||'null');}catch{}if(shared&&typeof shared.name==='string'&&typeof shared.href==='string'&&window.PhoenixVelenRouting.resumeHref(shared.href,window.PHOENIX_VELEN.quests)){resume.href=window.PhoenixVelenRouting.resumeHref(shared.href,window.PHOENIX_VELEN.quests);resume.querySelector('small').textContent='CONTINUE YOUR JOURNEY';resume.querySelector('strong').textContent=shared.name;resume.querySelector('span').textContent='Resume · Stage '+shared.stageNumber+' →';return;}const t=Object.values(tasks).find(t=>t.stages&&t.view===state.lastWalkthroughView);if(t){const stage=state.stageByView[t.view]||t.stages[0].id;resume.href='#'+t.view+'/'+stage;resume.querySelector('small').textContent='CONTINUE YOUR JOURNEY';resume.querySelector('strong').textContent=t.name;resume.querySelector('span').textContent='Resume · Stage '+(t.stages.findIndex(s=>s.id===stage)+1)+' →';}else{resume.href='#regions';resume.querySelector('small').textContent='YOUR NEXT STEP';resume.querySelector('strong').textContent='Choose your starting region';resume.querySelector('span').textContent='Start here, or join an existing playthrough →';}}
  addEventListener('phoenix:route-rendered',e=>{refresh();if(e.detail.root==='home')homeDeck.restore();if(e.detail.root==='regions')regionsDeck.restore();document.querySelectorAll('.guide-bar nav a').forEach(a=>{const active=a.hash==='#'+e.detail.root;if(active)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});});refresh();
 }
 window.PhoenixConsole={navigationCards,regions,attach,decorateNavigation,recordWalkthrough};
})();
