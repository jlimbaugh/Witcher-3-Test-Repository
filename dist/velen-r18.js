'use strict';
window.createPhoenixVelen=function({navigate}){
const questCards=window.PhoenixVelenQuestCards||{};
window.PhoenixVelenReadingPages=new WeakMap();
const routeModel=window.PhoenixVelenRouting,viewport=()=>window.PhoenixViewport||window;
const view=document.createElement('section');view.id='velen';view.className='view scene main-console-view velen-view';view.hidden=true;view.setAttribute('aria-labelledby','velen-heading');view.innerHTML='<div class="scene-inner console-r16"><div class="cover" id="velen-screen"></div><p id="velen-save-status" role="status"></p></div>';document.querySelector('main').append(view);
const confirm=document.createElement('dialog');confirm.id='velen-confirm-progress';confirm.className='progress-dialog';confirm.setAttribute('aria-labelledby','velen-confirm-title');confirm.innerHTML='<form method="dialog"><h2 id="velen-confirm-title">Confirm recorded progress</h2><p id="velen-confirm-text"></p><div class="dialog-actions"><button value="cancel">Cancel</button><button value="confirm">Confirm</button></div></form>';document.body.append(confirm);
let inputMode='pointer',renderSerial=0,renderedHash=null;document.addEventListener('pointerdown',()=>inputMode='pointer',true);document.addEventListener('keydown',e=>{if(['Tab','Enter',' '].includes(e.key))inputMode='keyboard';},true);
const {quests:legacyQuests,leads,initial,apply,unlocked}=window.PHOENIX_VELEN,key='phoenix.velen.arrival.v1';let raw={};try{raw=JSON.parse(localStorage.getItem(key)||'{}');}catch{}
// v45 Slice 2 QA3 save guard (owner-authorized, narrowly scoped; the only change to the legacy save writer):
// if phoenix.velen.arrival.v1 exists but cannot be read (invalid JSON, or JSON that is not an object - the same rule
// as the Slice 1 import's legacy-unreadable), this page session never writes that key. Browsing state lives in memory
// only, so the unreadable bytes survive render, navigation, interaction, reloads and a refused handover until the
// record is repaired. Valid or absent records are saved exactly as in v45 (same code path, same bytes).
const legacyUnreadable=(()=>{let text;try{text=localStorage.getItem(key);}catch{return false;}if(text==null)return false;try{const v=JSON.parse(text);return !(v&&typeof v==='object'&&!Array.isArray(v));}catch{return true;}})(),legacyGuardText='Your saved Velen record could not be read, so it is kept unchanged. Changes in this visit are not saved.';const state=initial(raw),screen=document.getElementById('velen-screen'),status=document.getElementById('velen-save-status');let pending=null,swipeClickUntil=0;const dialog=document.getElementById('velen-confirm-progress');

const quests={...legacyQuests,nilf:{...legacyQuests.nilf,art:'art-velen/nilf.webp',position:'center'}};
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n;};const link=(text,href,cls='')=>{const a=el('a',cls,text);a.href=href.startsWith('index.html#')?href.slice(10):href.startsWith('#')?routeModel.sharedHash(href):href;return a;};
// v45 Slice 2 seam: The Nilfgaardian Connection (velen.nilf) is rendered by velen-nilf-ui.js and its progress is owned by
// the canonical Velen region record via velen-nilf-progress.js (this file never reads that key itself). This file keeps routing, the console, reading position, Continue records and the
// velen.pyres/velen.mercy owners. If the handover is unavailable (e.g. newer canonical data), nilf falls back to the v45 legacy hub.
/* QA6 D4: read the localStorage getter once, guarded. A browser that denies storage access throws here; the Nilfgaardian owner then gets a stand-in whose calls throw that same error, which it already reports as storage-unavailable, so start-up continues. */const nilfStorage=(()=>{try{return localStorage;}catch(error){const denied=()=>{throw error;};return {getItem:denied,setItem:denied,removeItem:denied};}})();const nilfUI=window.createPhoenixVelenNilfUI&&window.PhoenixVelenNilfProgress?window.createPhoenixVelenNilfUI({storage:nilfStorage,quests,link,go,regionTools,showOnMap:stage=>showOnMap('nilf',stage),readingStage:()=>state.stage.nilf,hasReading:()=>state.last?.id==='nilf'||state.stage.nilf>1,activityComplete:id=>state.complete[id]===true,rerender:()=>{const rail=screen.querySelector('.sw-rail');render({focus:false,y:viewport().scrollY,railX:rail?.scrollLeft});}}):null;
const nilfOwned=()=>!!nilfUI&&nilfUI.owned(),isComplete=id=>id==='nilf'&&nilfOwned()?nilfUI.complete():state.complete[id]===true,isUnlocked=()=>isComplete('nilf');
function save(){if(legacyUnreadable){status.textContent=legacyGuardText;return;}/* QA3 save guard */try{localStorage.setItem(key,JSON.stringify(state));status.textContent='';}catch{status.textContent='Saving is unavailable. Progress lasts for this visit only.';}}
function picture(src,cls,position){const im=el('img',cls);im.src=src;im.alt='';im.decoding='async';if(position)im.style.objectPosition=position;return im;}
function scroll(title){const n=el('section','scroll scroll-r16');if(title)n.append(el('h2','',title));return n;}
function artTile(title,href,src,pos){const a=link('',href,'art-tile console-tile');a.append(picture(src,'',pos),el('span','',title));return a;}
function questAction(text,href,art='navigation-art-v26/action-walkthrough.webp'){
  const action=link('',href,'home-action-tile');
  action.append(picture(art),el('span','',text));
  return action;
}
function route(){return routeModel.parse(location.hash);}
function go(hash,extra={}){navigate(routeModel.sharedHash(hash),{velen:extra});}
const deckQuests={...quests};
for(const [id,card] of Object.entries(questCards)){
  deckQuests[id]={kind:'Main quest',art:'velen-landscape-r18.webp',...leads[id],...card};
}
function deckCategory(id,card){
  if(card.kind==='Witcher contract')return 'contracts';
  if(card.kind==='Monster nest')return 'nests';
  if(card.kind==='Encounter'||['death-by-fire','lynch-mob','hazardous-goods'].includes(id))return 'encounters';
  if(card.kind==='Competition'||/^(races-|fists-of-fury-|gwent-)/.test(id))return 'competitions';
  if(card.kind==='Gear hunt'||/^Scavenger Hunt:/i.test(card.name))return 'gear';
  if(card.kind==='Treasure hunt')return 'treasure';
  return 'quests';
 }
const activityTabs=[
  ['contracts','Contracts','art-velen/shrieker.webp'],['treasure','Treasure','art-velen/sunken-treasure.webp'],
  ['gear','Gear Hunts','art-velen/griffin-school-gear.webp'],
  ['nests','Monster Nests','art-white-orchard-variety/category-nests.webp'],['encounters','Roadside Encounters',quests.mercy.art],
  ['competitions','Competitions','art-velen/races-crows-perch.webp']
];
const decks=Object.fromEntries(['quests',...activityTabs.map(([id])=>id)].map(id=>[id,[]]));
for(const [id,card] of Object.entries(deckQuests))decks[deckCategory(id,card)].push(id);
let deckSelected=decks.quests.includes(state.selected)?state.selected:decks.quests[0];
let activityTab=activityTabs[0][0],activitySelected=decks[activityTab][0],activitiesOpen=false;
function restoreHomeDeck(){
  const saved=history.state?.velen;
  if(decks.quests.includes(saved?.selected))deckSelected=saved.selected;
  activityTab=activityTabs.some(([id])=>id===saved?.activityTab)?saved.activityTab:activityTabs[0][0];
  activitySelected=decks[activityTab].includes(saved?.activitySelected)?saved.activitySelected:decks[activityTab][0];
  activitiesOpen=saved?.activitiesOpen===true;
}
function recordDeckView(){
  history.replaceState({...history.state,velen:{...history.state?.velen,selected:deckSelected,activityTab,activitySelected,activitiesOpen}},'',location.href);
}
function header(title,sub,art='velen-landscape-r18.webp'){const n=el('header','scene-banner');n.append(picture(art),el('p','eyebrow',sub),el('h1','',title));return n;}
function carousel(category,selectedId,tools=null){
const box=el('section','quest-selector desk-carousel');
box.dataset.velenDeck=category;
box.setAttribute('aria-label',tools?.label||(tools?'Choose a regional tool':category==='quests'?'Choose a Velen quest':'Choose a Velen activity'));
const catalogue=tools?.catalogue||deckQuests;
const ids=tools?Object.keys(catalogue):decks[category],idx=ids.indexOf(selectedId),deck=el('div','deck');
const select=(id,focus)=>tools?tools.select(id):selectCard(category,id,focus);
for(const offset of ids.length===1?[0]:ids.length===2?[-1,0]:[-1,0,1]){
  const i=(idx+offset+ids.length)%ids.length,id=ids[i],q=catalogue[id];
  const cardClass=tools?.compact?'velen-activity-category-label':'desk-card gwent-guide-card';
  const b=el('button','quest-card '+cardClass+' '+(offset===0?'selected':offset===1?'right':'left'));
  b.type='button';
  if(tools)b.dataset.tool=id;else b.dataset.quest=id;
  b.setAttribute('aria-label',(tools?.itemLabel||(tools?'Select tool: ':'Select quest: '))+q.name);
  b.setAttribute('aria-pressed',String(i===idx));
  b.tabIndex=i===idx?0:-1;
  if(tools?.compact){
    b.textContent=q.name;
  }else{
    const im=picture(q.art,'quest-card-art',q.position);
    im.loading=i===idx?'eager':'lazy';
    im.fetchPriority=i===idx?'high':'low';
    const badge=el('span','gwent-guide-badge',q.kind==='Main quest'?'Ⅰ':q.kind==='Side quest'?'Ⅱ':'◇');
    badge.setAttribute('aria-hidden','true');
    b.append(im,badge,el('small','',q.dlc?'Free DLC':q.kind),el('strong','',q.name));
  }
  b.onclick=()=>{if(performance.now()<swipeClickUntil)return;select(id);};
  deck.append(b);
}
const footer=el('div','orbit-controls velen-deck-gutter'),count=el('span','',(idx+1)+' / '+ids.length);
count.setAttribute('aria-live','polite');
footer.append(count);
box.append(deck);
if(!tools){const jump=window.createPhoenixDeckJump(ids.map(id=>deckQuests[id].name),idx,index=>select(ids[index],true),{selectOnSettle:true});
box.append(jump.frame);}
box.append(footer);
deck.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();select(e.key==='Home'?ids[0]:e.key==='End'?ids[ids.length-1]:ids[(idx+(e.key==='ArrowLeft'?ids.length-1:1))%ids.length]);(tools?.host?.isConnected?tools.host:screen).querySelector('[data-velen-deck='+category+'] .quest-card.selected')?.focus({preventScroll:true});}};
let start=null;
deck.onpointerdown=e=>{
  if(!e.isPrimary||e.button!==0){start=null;return;}
  const card=deck.querySelector('.quest-card.selected').getBoundingClientRect();
  const edge=6;
  const horizontal=e.clientX>=card.left-edge&&e.clientX<=card.right+edge&&
    e.clientY>=card.top-edge&&e.clientY<=card.bottom+edge;
  start={id:e.pointerId,x:e.clientX,y:e.clientY,horizontal,axis:null,scrollY:viewport().scrollY};
};
function move(e){
  if(!start||start.id!==e.pointerId)return;
  const dx=e.clientX-start.x,dy=e.clientY-start.y;
  if(!start.axis&&Math.max(Math.abs(dx),Math.abs(dy))>=8){
    start.axis=start.horizontal&&Math.abs(dx)>Math.abs(dy)*1.3?'horizontal':'vertical';
    if(e.isTrusted&&e.type==='pointermove')deck.setPointerCapture(e.pointerId);
  }
  if(!start.axis)return;
  swipeClickUntil=performance.now()+400;
  if(start.axis==='vertical'&&e.pointerType==='touch')viewport().scrollTo(0,start.scrollY-dy*.8);
}
deck.onpointermove=move;
deck.onpointerup=e=>{
  if(!start||start.id!==e.pointerId)return;
  move(e);
  const direction=start.axis==='horizontal'&&window.PhoenixSwipeBoxModel.swipeDirection(e.clientX-start.x,e.clientY-start.y,false);
  start=null;
  if(direction){e.preventDefault();select(ids[(idx+direction+ids.length)%ids.length]);}
};
deck.onpointercancel=()=>{start=null;};
deck.ondragstart=e=>e.preventDefault();return box;}
function selectCard(category,id,focusJump=false){
  if(!decks[category].includes(id))return;
  const y=viewport().scrollY;
  if(category==='quests'){
    deckSelected=id;
    if(Object.hasOwn(quests,id))state.selected=id;
  }else activitySelected=id;
  recordDeckView();
  render({y,focus:false});
  if(focusJump)screen.querySelector('[data-velen-deck='+category+'] .deck-jump button[aria-current="true"]:not([aria-hidden])')?.focus({preventScroll:true});
}
const hubProgressQuests=new Set(['princess','ciris-room','wandering-in-the-dark','magic-lamp','ladies-of-the-wood','whispering-hillock','king-of-the-wolves','family-matters','ciris-race','out-of-the-shadows','return-to-crookback-bog','fleeing-the-bog','keira-invitation','towerful-of-mice','favor-for-a-friend','advancement-of-learning','shrieker','jenny-o-the-woods','merry-widow','swamp-thing','patrol-gone-missing','mysterious-tracks','byways-murders','phantom-of-the-trade-route','woodland-beast','griffin-from-the-highlands','beast-of-honorton','missing-brother','master-armorers','where-the-cat-and-wolf-play','take-what-you-want','fall-of-the-house-of-reardon','ghosts-of-the-past','eternal-fires-shadow','thou-shalt-not-pass','fake-papers','bitter-harvest','wild-at-heart','a-greedy-god','a-dogs-life','forefathers-eve','death-by-fire','lynch-mob','defender-of-the-faith','last-rites','fools-gold','truth-is-in-the-stars','hazardous-goods','witcher-wannabe','loves-cruel-snares','blood-ties','races-crows-perch','fists-of-fury-velen','lost-goods','out-of-the-frying-pan-into-the-fire','an-unfortunate-turn-of-events','queen-zuleykas-treasure','sunken-chest','sunken-treasure','hidden-from-the-world','the-dead-have-no-defense','the-things-men-do-for-coin','dont-play-with-the-gods','blood-gold','a-costly-mistake','tough-luck','battlefield-loot','a-plea-ignored','dowry','griffin-school-gear']);
function trackedQuestProgress(id,card){
  const tracker=window.createVelenQuestTracker(id,card.objectiveIds);
  if(!tracker.editable)return {status:'unavailable',notice:tracker.notice};
  const required=card.objectiveIds.filter(key=>!card.optionalObjectives?.includes(key));
  const done=required.filter(key=>tracker.record.marks.includes(key)).length,total=required.length;
  return {done,total,status:total&&done===total?'complete':done?'active':'open'};
}
function appendHubProgress(panel,id){
  if(!hubProgressQuests.has(id))return;
  const row=trackedQuestProgress(id,questCards[id]);
  panel.append(el('p','velen-hub-progress',row.notice||'Quest progress · '+row.done+' of '+row.total));
}
function regionalProgress(){
  const entries=Object.entries(questCards).filter(([,card])=>card.objectiveIds?.length).map(([id,card])=>({
    name:card.name||deckQuests[id].name,
    kind:deckQuests[id].kind,
    category:deckCategory(id,deckQuests[id]),
    dlc:card.dlc,
    href:'#velen/lead/'+id,
    ...trackedQuestProgress(id,card)
  }));
  const canonical=nilfUI.state();
  for(const [id,quest] of Object.entries(quests)){
    let result;
    if(id==='nilf'&&canonical.owned){
      const owner=window.PhoenixVelenNilfProgress;
      const status=owner.engine.status(owner.QUEST,canonical.progress);
      const {done,total}=owner.engine.counts(owner.QUEST,canonical.progress);
      result={done,total,status:status==='not started'?'open':status};
    }else{
      // The arrival hubs own the legacy completion flags. A reading bookmark is never progress.
      const unavailable=legacyUnreadable||storageUnavailableForLedger()||(id==='nilf'&&!["absent","not-handed-over"].includes(canonical.status));
      result={status:unavailable?'unavailable':isComplete(id)?'complete':'open'};
    }
    entries.push({name:quest.name,kind:quest.kind,category:deckCategory(id,quest),href:'#velen/hub/'+id,...result});
  }
  return entries;
}
function storageUnavailableForLedger(){
  try{nilfStorage.getItem(key);return false;}catch{return true;}
}
function selectedPanel(id){
  const q=deckQuests[id],tracked=Object.hasOwn(quests,id);
  const selected=scroll(q.name);
  selected.classList.add('selected-panel','selected-scroll');
  selected.append(el('p','',q.briefing||q.intro));
  appendHubProgress(selected,id);
  if(q.dlc)selected.append(el('p','eyebrow',q.dlc));
  if(q.level)selected.append(el('p','eyebrow','Suggested level '+q.level));
  const actions=el('nav','home-selected-actions');
  actions.setAttribute('aria-label','Selected card actions');
  actions.append(
    questAction('Open walkthrough','#quest/'+id+'/'+(tracked?state.stage[id]:readingStage(id))),
    questAction(tracked?'Open quest hub':'Open quest card',(tracked?'#hub/':'#lead/')+id,'navigation-art-v26/action-quest-hub.webp')
  );
  actions.append(questAction('Show on Map','#map/'+id,'velen-route-map-art.svg'));
  selected.append(actions);
  return selected;
}
function activities(){
  const section=scroll('Activities & Discoveries');
  section.classList.add('velen-activities');
  section.id='velen-activities';
  const host=el('div','velen-activity-category-menu');
  const catalogue=Object.fromEntries(activityTabs.map(([id,name,art])=>[id,{name,art,kind:'Activity category'}]));
  function select(id,focus=false){
    const y=viewport().scrollY;
    activityTab=id;
    activitySelected=decks[id][0];
    recordDeckView();
    render({y,focus:false});
    if(focus)screen.querySelector('#velen-activities .quest-card.selected')?.focus({preventScroll:true});
  }
  host.classList.toggle('velen-activity-category-compact',activitiesOpen);
  const rail=carousel('categories',activityTab,{catalogue,select,host,compact:activitiesOpen,itemLabel:'Select activity category: ',label:'Choose a Velen activity category'});
  const center=rail.querySelector('.quest-card.selected');
  center.setAttribute('aria-label',(activitiesOpen?'Close ':'Open ')+catalogue[activityTab].name+' activity deck');
  center.removeAttribute('aria-pressed');
  center.setAttribute('aria-expanded',String(activitiesOpen));
  center.setAttribute('aria-controls','velen-activity-panel');
  center.onclick=()=>{
    if(performance.now()<swipeClickUntil)return;
    const scrollY=viewport().scrollY;
    const y=Math.max(0,Math.min(scrollY,scrollY+host.getBoundingClientRect().top));
    activitiesOpen=!activitiesOpen;
    recordDeckView();
    render({y,focus:false});
    if(inputMode==='keyboard')screen.querySelector('#velen-activities .quest-card.selected')?.focus({preventScroll:true});
  };
  host.append(rail);
  const panel=el('div','velen-activity-content');
  panel.id='velen-activity-panel';
  panel.hidden=!activitiesOpen;
  if(activitiesOpen){
    panel.setAttribute('aria-label',catalogue[activityTab].name+' activities');
    if(activitySelected)panel.append(carousel(activityTab,activitySelected),selectedPanel(activitySelected));
    else panel.append(el('p','velen-activity-empty','No Velen cards are available in this category yet.'));
  }
  section.append(host,panel);
  return section;
}
const readingKey='phoenix.velen.reading.v1';
function resumePanel(){
  let saved;
  try{saved=JSON.parse(localStorage.getItem(readingKey)||'null');}catch{}
  const id=Object.hasOwn(deckQuests,saved?.id)?saved.id:state.last?.id||'nilf';
  const q=deckQuests[id];
  let stage=state.stage[id]||1;
  if(saved?.id===id&&Number.isInteger(saved.stage)&&saved.stage>=1&&saved.stage<=q.stages.length)stage=saved.stage;
  let caption=isComplete(id)?'Quest complete':(q.stages[stage-1]?.title||'');
  if(id==='nilf'&&nilfOwned()&&!isComplete(id)){
    const owner=window.PhoenixVelenNilfProgress,p=nilfUI.state().progress;
    const next=owner.engine.required(owner.QUEST,p).find(o=>p.objectives[o.id]!=='done'&&!owner.engine.closed(o,p));
    if(next){stage=next.stage;caption='Next objective · '+next.label;}
  }
  const panel=scroll();
  panel.classList.add('resume','console-continue');
  panel.append(el('small','','Resume'),el('h2','',q.name));
  if(caption)panel.append(el('p','',caption));
  panel.append(questAction('Open walkthrough','#quest/'+id+'/'+stage));
  return panel;
}
function cardStops(id){
  return id==='nilf'?Object.values(window.PhoenixSharedWalkthroughModel?.VELEN_NEARBY||{}).flat():
    id==='family-matters'?[{label:'Ciri’s Room',href:'#velen/lead/ciris-room',context:'Search Ciri’s room while you’re at Crow’s Perch.'}]:[];
}
function nearbyStops(id){
  const stops=cardStops(id);
  if(!stops.length)return;
  const panel=scroll('Nearby Stops');
  for(const stop of stops){
    panel.append(link(stop.label||quests[stop.quest].name,stop.href,'activity-link'),el('p','small-note',stop.context));
  }
  return panel;
}
function routeStage(id,q,requested){
  if(requested)return Math.min(q.stages.length,Number(requested));
  if(Object.hasOwn(questCards,id))return readingStage(id);
  if(id==='nilf'&&nilfOwned()&&!isComplete(id)){
    const owner=window.PhoenixVelenNilfProgress,p=nilfUI.state().progress;
    const next=owner.engine.required(owner.QUEST,p).find(o=>p.objectives[o.id]!=='done'&&!owner.engine.closed(o,p));
    if(next)return next.stage;
  }
  try{
    const reading=JSON.parse(localStorage.getItem(readingKey)||'null');
    if(reading?.id===id&&Number.isInteger(reading.stage)&&reading.stage>=1&&reading.stage<=q.stages.length)return reading.stage;
  }catch{}
  return state.stage[id]||1;
}
function mapPin(label,href,icon,detail){
  const pin=link('',href,'velen-route-pin');
  const body=el('span');
  body.append(el('strong','',label));
  if(detail)body.append(el('small','',detail));
  pin.append(picture('map-icon-'+icon+'.png'),body);
  return pin;
}
let detachNilfMap;
function regionalMap(id,requested){
  const q=Object.hasOwn(deckQuests,id)?deckQuests[id]:null;
  const stage=q ? routeStage(id,q,requested) : null;
  const hasFocusedArea=id==='nilf'||id==='mercy'||(id==='pyres'&&stage===1);
  if(window.PhoenixNilfAreaMap){
    screen.append(header('Velen Map','No Man’s Land'));
    detachNilfMap=window.PhoenixNilfAreaMap.mount(screen,{
      stage:hasFocusedArea?stage:null,
      activity:hasFocusedArea&&id!=='nilf'?id:null,
      mapContext:q&&!hasFocusedArea?q.name+' · '+q.stages[stage-1].title:null,
      nearby:window.PhoenixSharedWalkthroughModel.VELEN_NEARBY,
      quests,open:go,complete:isComplete,
      back:()=>{
        if(history.state?.velen?.mapFromWalkthrough||history.state?.velen?.mapFromVelen)history.back();
        else go(q?'#quest/'+id+'/'+stage:'#velen');
      }
    });
    if(!q||hasFocusedArea)return;
  }else screen.append(header(q?q.name:'Velen route maps',q?'Quest route map':'Region Tools'));
  const paper=scroll(q?'Walkthrough route notes':'Browse quest routes');
  paper.classList.add('velen-route-paper');
  if(!q){
    for(const category of ['quests',...activityTabs.map(([key])=>key)]){
      if(!decks[category].length)continue;
      const group=el('details','velen-route-group');
      group.open=category==='quests';
      group.append(el('summary','',activityTabs.find(([key])=>key===category)?.[1]||'Quests'));
      for(const key of decks[category])group.append(mapPin(deckQuests[key].name,'#map/'+key,'fasttravel'));
      paper.append(group);
    }
  }else{
    const focus=q.stages[stage-1];
    const sketch=el('div','velen-route-sketch');
    sketch.append(el('p','eyebrow','Step '+stage+' of '+q.stages.length),mapPin(focus.place||focus.title,'#quest/'+id+'/'+stage,'sidequests',focus.title===focus.place?'':focus.title));
    const nearby=id==='nilf'?window.PhoenixSharedWalkthroughModel?.VELEN_NEARBY?.[stage]||[]:cardStops(id);
    const related=new Map();
    for(const stop of nearby)related.set(stop.href,mapPin(stop.label||quests[stop.quest].name,stop.href,stop.kind==='service'?'merchant':'sidequests',stop.context));
    for(const [label,target] of focus.links||[]){
      if(!Object.hasOwn(deckQuests,target))continue;
      const href='#velen/lead/'+target;
      if(!related.has(href))related.set(href,mapPin(label,href,'sidequests'));
    }
    if(related.size){
      const branches=el('div','velen-route-branches');
      branches.setAttribute('aria-label','Related stops at this step');
      branches.append(...related.values());
      sketch.append(branches);
    }
    paper.append(sketch);
    if(q.stages.length>1){
      const route=el('details','velen-route-group');
      route.append(el('summary','','All route steps'));
      q.stages.forEach((step,index)=>{
        const marker=mapPin(step.place||step.title,'#map/'+id+'/'+(index+1),'fasttravel',step.title===step.place?'':step.title);
        if(index+1===stage)marker.setAttribute('aria-current','step');
        route.append(marker);
      });
      paper.append(route);
    }
  }
  const tools=el('nav','home-selected-actions');
  if(q)tools.append(questAction('Browse Velen route maps','#map','velen-route-map-art.svg'));
  tools.append(questAction('Return to Velen','#velen','navigation-art-v26/action-quest-hub.webp'));
  paper.append(tools);
  screen.append(paper);
}
function regionTools(context){
  const tools=el('section','velen-tools-section');
  tools.append(el('h2','','Region Tools'));
  tools.id=context?context.id+'-region-tools':'velen-region-tools';
  const catalogue={};
  for(const item of window.PhoenixNavigationArt.entries){
    catalogue[item.key]={name:item.label,art:item.src,kind:'Regional tool',href:item.href?'index.html'+item.href:null};
  }
  catalogue.maps={name:'Velen Map',art:'visual-art/region-tools/route-maps.svg',kind:'Regional tool',href:'#map'};
  catalogue.merchants={name:'Merchants',art:'gwent-r15/gabor.webp',kind:'Regional tool',href:'#merchants'};
  const host=el('div','velen-tools-menu');
  function select(key,remember=true){
    const item=catalogue[key];
    if(remember)history.replaceState({...history.state,regionalTool:key},'',location.href);
    const deck=carousel('tools',key,{catalogue,select,host});
    const button=deck.querySelector('.quest-card.selected');
    button.removeAttribute('aria-pressed');
    button.setAttribute('aria-label','Open '+item.name);
    host.replaceChildren(deck);
    tools.onRegionChange=null;
    if(item.href){
      function updateDestination(){
        const region=context?.region()||'velen';
        const local=key==='maps'||key==='merchants';
        const unavailable=local&&region==='unbuilt';
        button.setAttribute('aria-disabled',String(unavailable));
        button.setAttribute('aria-label','Open '+item.name+(unavailable?' · Region not built yet':''));
        let href=item.href.slice('index.html'.length);
        if(key==='maps')href=region==='velen'?'#velen/map':'#whiteorchard-map';
        if(key==='merchants')href=region==='velen'?'#velen/merchants':'#economy-merchants';
        button.onclick=()=>{if(!unavailable&&performance.now()>=swipeClickUntil)navigate(href);};
      }
      updateDestination();
      tools.onRegionChange=updateDestination;
    }
    else{
      const list=el('section','regional-warning-list');
      list.id=tools.id+'-warnings';list.hidden=true;list.setAttribute('aria-label','Unresolved warnings');
      button.setAttribute('aria-controls',list.id);button.setAttribute('aria-expanded','false');
      button.onclick=()=>{
        if(performance.now()<swipeClickUntil)return;
        list.hidden=!list.hidden;button.setAttribute('aria-expanded',String(!list.hidden));
        if(list.hidden)return;
        list.replaceChildren();
        const items=window.PhoenixWarningCenter?.get().items||[];
        if(!items.length)list.append(el('p','','No unresolved warnings recorded.'));
        for(const risk of items){
          const detail=el('button','',risk.name+' · '+risk.status);
          detail.type='button';detail.onclick=()=>window.PhoenixWarnings.open(risk.id,detail);
          list.append(detail);
        }
      };
      host.append(list);
    }

  }
  select((!context||location.hash.split('/')[0]==='#'+context.id)&&Object.hasOwn(catalogue,history.state?.regionalTool)?history.state.regionalTool:'home',false);
  const search=el('form','regional-search-bar');
  search.setAttribute('role','search');
  const input=document.createElement('input');
  input.type='search';input.placeholder='Search the guide';input.setAttribute('aria-label','Search the guide');
  input.enterKeyHint='search';input.maxLength=160;
  const submit=el('button','','Search');submit.type='submit';
  search.append(input,submit);
  search.onsubmit=event=>{
    event.preventDefault();
    navigate('#guide-search/'+new URLSearchParams({q:input.value.trim()}));
  };
  tools.append(host,search);
  return tools;
}
function mountRegionalTools(mount){
  const view=mount.closest('.view');
  const orbit=view.querySelector('.main-region-orbit');
  function region(){
    if(!orbit)return 'whiteorchard';
    const route=orbit.querySelector('[tabindex="0"]')?.getAttribute('href');
    if(route==='#velen')return 'velen';
    return route==='#whiteorchard-console'?'whiteorchard':'unbuilt';
  }
  const section=regionTools({id:view.id,region});
  mount.classList.add('regional-tools-host','velen-view');
  const shell=el('div','console-r16 regional-tools-shell');
  shell.append(section);mount.append(shell);
  if(orbit)new MutationObserver(()=>section.onRegionChange?.()).observe(orbit,{subtree:true,attributes:true,attributeFilter:['tabindex']});
}
for(const mount of document.querySelectorAll('[data-regional-tools]'))mountRegionalTools(mount);
function sectionJump(items){
  const nav=el('nav','velen-section-jump');
  nav.setAttribute('aria-label','Section jumps');
  const picker=document.createElement('select');
  picker.setAttribute('aria-label','Jump to section');
  picker.add(new Option('Jump to section…',''));
  for(const [name] of items)picker.add(new Option(name,name));
  picker.onchange=()=>{
    const entry=items.find(([name])=>name===picker.value);
    picker.selectedIndex=0;
    const target=entry?.[1]();
    if(!target)return;
    if(target.tagName==='DETAILS')target.open=true;
    const title=target.querySelector('summary,h1,h2,h3')||target;
    if(!title.hasAttribute('tabindex'))title.tabIndex=-1;
    title.focus({preventScroll:true});
    target.scrollIntoView({block:'start',behavior:'auto'});
  };
  nav.append(picker);return nav;
}
function consoleView(){
  screen.append(header('Velen','No Man’s Land'));
  const activity=activities(),selected=selectedPanel(deckSelected);
  const questMenu=el('section','velen-quest-menu');
  questMenu.setAttribute('aria-label','Velen quest cards');
  questMenu.append(carousel('quests',deckSelected),selected);
  screen.append(resumePanel(),questMenu);
  const nearby=nearbyStops(deckSelected);
  if(nearby)screen.append(nearby);
  screen.append(activity);
  const tools=regionTools();
  screen.append(tools);
  screen.firstElementChild.after(sectionJump([
    ['Quest cards',()=>screen.querySelector('[data-velen-deck="quests"]')],
    ['Activities',()=>activity],['Region Tools',()=>tools]
  ]));
}
function nextLeads(){const n=scroll('After Hendrik’s notes');n.append(el('p','small-note',isUnlocked()?'Notes recorded · choose your next lead.':'Next leads · record the finished main quest in its hub when you have read the notes in game.'));const tiles=el('div','tiles');for(const [id,l] of Object.entries(leads))tiles.append(artTile(l.name,'#lead/'+id,deckQuests[id].art));n.append(tiles);return n;}
function hub(id){const q=quests[id];screen.append(header(q.name,q.kind+' · Permanent owner hub',q.art));const n=scroll('At this stop'),actions=el('nav','home-selected-actions');actions.setAttribute('aria-label','Quest actions');actions.append(questAction('Open walkthrough','#quest/'+id+'/'+state.stage[id]),questAction('Show on Map','#map/'+id,'velen-route-map-art.svg'));n.append(link('← Velen console','#velen','back-link'),actions);const label=el('label','completion'),check=el('input');check.type='checkbox';check.checked=state.complete[id];check.setAttribute('aria-label','Mark '+q.name+' resolved');check.onchange=()=>{check.checked=state.complete[id];pending={kind:'complete',id,value:!state.complete[id]};document.getElementById('velen-confirm-text').textContent=id==='nilf'?(state.complete[id]?'Remove the recorded completion? The two next-lead summaries return to an unconfirmed state. Other activities remain unchanged.':'Confirm that you finished this quest and read Hendrik’s notes in game. This records only this quest and confirms the two next leads. It does not complete side activities.'):(state.complete[id]?'Remove this activity’s recorded completion?':'Confirm that you resolved this activity in the game. Other activities remain unchanged.');dialog.showModal();};label.append(check,el('span','',state.complete[id]?'Resolved — recorded':'Mark resolved in game'));n.append(label);if(state.undo){const undo=el('button','','Undo last progress change');undo.onclick=()=>{apply(state,{kind:'undo'});save();render({focus:false,y:viewport().scrollY});};n.append(undo);}n.append(el('p','small-note','Stage navigation never marks completion. A reference elsewhere uses this same mark.'));
if(id==='nilf'){n.append(el('h3','','Side quests & encounters'));for(const other of ['pyres','mercy'])n.append(link((state.complete[other]?'✓ ':'○ ')+quests[other].name+' · open owner hub','#hub/'+other,'activity-link'));n.append(el('h3','','Services & notices'),link('Innkeeper · supplies and Gwent information','#merchants','activity-link'),link('Collected notices & deferred exploration','#deferred','activity-link'));}else n.append(link('Return to arrival quest hub','#hub/nilf','activity-link'));screen.append(n);if(id==='nilf')screen.append(nextLeads());}
function choice(key,n){const label=el('label','choice-label',key==='inn'?'Record your inn outcome (optional)':'Record your decision (optional)'),select=el('select');select.setAttribute('aria-label',key==='inn'?'Recorded inn outcome':'Recorded John Verdun decision');select.append(new Option('Not recorded',''));const values=key==='inn'?[['peace','Settled peacefully'],['fight','Fought the soldiers']]:[['freed','Released John'],['left','Left him tied']];for(const [v,t]of values)select.append(new Option(t,v));select.value=state.choices[key]||'';select.onchange=()=>{if(!select.value){state.undo={complete:{...state.complete},choices:{...state.choices}};delete state.choices[key];}else apply(state,{kind:'choice',key,value:select.value});save();};label.append(select);n.append(label);}
const readingBookmarks=new Map();
function readingStage(id){
  let stage=readingBookmarks.get(id);
  if(stage===undefined){
    try{
      const bookmark=localStorage.getItem(readingKey+'.'+id);
      const last=bookmark===null?JSON.parse(localStorage.getItem(readingKey)):null;
      stage=bookmark===null?(last?.id===id?last.stage:1):Number(bookmark);
    }catch{}
  }
  return Number.isInteger(stage)&&stage>=1&&stage<=questCards[id].stages.length?stage:1;
}
function rememberReading(id,stage=state.stage[id]){
  if(Object.hasOwn(questCards,id)){
    readingBookmarks.set(id,stage);
    try{localStorage.setItem(readingKey+'.'+id,String(stage));}catch{}
  }
  try{
    localStorage.setItem(readingKey,JSON.stringify({id,stage}));
    if(Object.hasOwn(quests,id))localStorage.setItem('phoenix.guide.resume.v1',JSON.stringify({href:'#velen/quest/'+id+'/'+stage,name:quests[id].name,stageNumber:stage}));
  }catch{}
}
function showOnMap(id,stage){
  const href='#map/'+id+'/'+stage;
  const action=link('Show on Map',href,'nilf-show-on-map');
  action.onclick=event=>{
    if(event.button!==0||event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;
    event.preventDefault();
    go(href,{mapFromWalkthrough:true});
  };
  return action;
}
function readingPage(id,q,index,legacy){
  const stage=q.stages[index], page=el('div','quest-page velen-reading-page');
  const heading=el('header','page-heading r15-heading');
  const art=picture(q.art||'velen-landscape-r18.webp','r15-page-art',q.position);
  const seal=el('span','r15-page-seal',q.kind||'Main quest');
  seal.setAttribute('aria-hidden','true');
  heading.append(art,el('p','eyebrow','QUEST WALKTHROUGH / VELEN'),el('h1','',q.name),el('p','quest-page-facts',q.level?'Velen · Suggested level '+q.level:'Velen'),seal);
  if(q.dlc)heading.append(el('p','quest-page-facts',q.dlc));
  const panel=el('article','reading-panel');
  panel.append(showOnMap(id,index+1));
  const tools=el('nav','quest-tools');
  tools.setAttribute('aria-label','Quest tools');
  const back=link(legacy?'Return to hub':'Return to quest card',legacy?'#hub/'+id:'#lead/'+id);
  if(legacy)back.dataset.returnHub='true';
  tools.append(back);
  page.append(heading,panel,tools,regionTools());
  const story=stage.choice?()=>{const section=el('div','sw-story');choice(stage.choice,section);return section;}:null;
  window.PhoenixVelenReadingPages.set(page,{id,q,index,story,goStage:n=>go('#quest/'+id+'/'+n,{hubReturn:history.state?.velen?.hubReturn,restoreY:Math.round(viewport().scrollY)})});
  screen.append(page);
}
function walkthrough(id,stage){if(id==='nilf'&&nilfOwned()){apply(state,{kind:'view',id,stage:stage||state.stage[id]});save();rememberReading(id);nilfUI.walkthrough(screen,state.stage[id]-1);return;}const q=quests[id];apply(state,{kind:'view',id,stage:stage||state.stage[id]});save();rememberReading(id);readingPage(id,q,state.stage[id]-1,true);}

function questCard(id, stage){
  const card=questCards[id], lead=leads[id]||card;
  if(stage){
    const index=Math.min(card.stages.length,Number(stage)||1)-1;
    rememberReading(id,index+1);
    readingPage(id,{...lead,...card},index,false);
    return;
  }
  screen.append(header(lead.name,(lead.kind||'Main quest')+(lead.level?' · Suggested level '+lead.level:''),card.art));
  const panel=scroll('At this stop');
  panel.append(link('← Velen console','#velen','back-link'),el('p','eyebrow',lead.place),el('p','',card.briefing));
  if(card.dlc)panel.append(el('p','eyebrow',card.dlc));
  panel.append(el('p','',card.start||'Start after reading Hendrik’s notes in The Nilfgaardian Connection. Both leads can be followed in either order.'));
  appendHubProgress(panel,id);
  const actions=el('nav','home-selected-actions');
  actions.setAttribute('aria-label','Quest actions');
  actions.append(questAction('Open walkthrough','#quest/'+id+'/'+readingStage(id)),questAction('Show on Map','#map/'+id,'velen-route-map-art.svg'));
  panel.append(actions);
  panel.append(el('h3','','When the quest is complete'),el('p','',card.completion));
  panel.append(link('Sources','velen-sources.html#'+id,'sw-source-link'));
  screen.append(panel);
}
function info(type,id){if(type==='lead'){const l=leads[id];screen.append(header(l.name,'Next lead · Suggested level '+l.level));const n=scroll(l.place);n.append(el('p','',l.text),el('p','warning',isUnlocked()?'This lead is confirmed by your recorded main-quest completion. Its full walkthrough is not built in this pilot.':'This lead follows Hendrik’s notes. If you have already read them, record The Nilfgaardian Connection as complete in its owner hub.'),link('Return to arrival hub','#hub/nilf','button-link'));screen.append(n);return;}
screen.append(header(type==='merchants'?'Innkeeper & notices':'Collected notices','Inn at the Crossroads'));const n=scroll(type==='merchants'?'Services at this stop':'Keep for later');if(type==='merchants'){n.append(el('p','','The innkeeper provides food, drink and a shop conversation. Check his card stock and Gwent dialogue in game; this pilot does not yet verify the named match reward or its quest-state prerequisites.'),el('p','','Quest connections: The Nilfgaardian Connection; Contract: Missing Brother. Full inventories are not tracked.'),link('Notices and deferred work','#deferred','activity-link'));}else{n.append(el('h3','','Contract: Missing Brother · level 33'),el('p','','The notice can be collected at the inn. Its combat is beyond the arrival recommendation; collecting it does not mark the contract complete.'),el('h3','','Wild at Heart'),el('p','','An inn-board lead for a separate quest cluster. Its full route is not included here; it is not labelled too high-level.'),el('h3','','Lornruk · later exploration'),el('p','','The shoreline Quen Place of Power and fortress encounter need separate guidance. Research describes level-10 drowners and a level-14 wyvern. Do not add the wyvern fight to the arrival route.'));}n.append(link('Return to The Nilfgaardian Connection hub','#hub/nilf','button-link'));screen.append(n);}
function render(options={}){renderedHash=routeModel.sharedHash(location.hash);const serial=++renderSerial,r=route();view.dataset.velenView=r.type; if(r.type==='velen')restoreHomeDeck();detachNilfMap?.();detachNilfMap=null;screen.replaceChildren();if(r.type==='hub'&&quests[r.id]){state.selected=r.id;state.lastHub=r.id;if(r.id==='nilf'&&nilfOwned()){nilfUI.hub(screen);screen.append(nextLeads(),link('Sources','velen-sources.html#nilf','sw-source-link nilf-hub-sources'));}else {hub(r.id);screen.append(link('Sources','velen-sources.html#'+r.id,'sw-source-link'));}}else if(r.type==='quest'&&quests[r.id])walkthrough(r.id,r.stage);else if(['lead','quest'].includes(r.type)&&Object.hasOwn(questCards,r.id))questCard(r.id,r.stage);else if(r.type==='lead'&&leads[r.id])info('lead',r.id);else if(['merchants','deferred'].includes(r.type))info(r.type);else if(r.type==='velen')consoleView();else if(r.type==='map')regionalMap(r.id,r.stage);else{screen.append(header('The trail is unclear','Unknown pilot link'));const n=scroll();n.append(link('Return to Velen','#velen','button-link'));screen.append(n);}if(r.type!=='map'&&!(['lead','quest'].includes(r.type)&&Object.hasOwn(questCards,r.id)))save();if(options.railX!=null&&screen.firstElementChild?.classList.contains('velen-nilf-page'))screen.firstElementChild.dataset.swRestoreRail=String(options.railX);if(nilfUI?.notice() && r.id==='nilf'){
 const notice=el('p','risk-note',nilfUI.notice());notice.setAttribute('role','status');
 screen.querySelector('header')?.after(notice);
}if(r.type==='quest' && screen.querySelector('#velen-region-tools')){
 const page=screen.querySelector('.velen-nilf-page,.velen-reading-page');
 page?.querySelector(':scope > .page-heading')?.after(sectionJump([
   ['Walkthrough',()=>page.querySelector('.sw-walkthrough,.reading-panel')],
   ['Region Tools',()=>page.querySelector('#velen-region-tools')]
 ]));
}const heading=screen.querySelector('h1');if(heading)heading.id='velen-heading';window.PhoenixVisuals?.enhance();window.PhoenixSwipeBoxes?.enhance();requestAnimationFrame(()=>{if(view.hidden||serial!==renderSerial)return;if(options.y!==undefined)viewport().scrollTo(0,options.y);if(options.focus===true&&heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}});}
document.addEventListener('click',e=>{const a=e.target.closest('#velen a[href^="#velen"]');if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;if(a.matches('.nilf-show-on-map,.nilf-map-seal,.nilf-map-label'))return;e.preventDefault();e.stopPropagation();const href=a.getAttribute('href'),target=routeModel.parse(href),r=route();let extra={};if(target.type==='map'&&r.type!=='map')extra.mapFromVelen=true;if(r.type==='hub'&&target.type==='quest'){extra.hubReturn={id:r.id,y:viewport().scrollY,ui:r.id==='nilf'&&nilfOwned()?nilfUI.capture():undefined};}else if(r.type==='quest'&&target.type==='quest')extra.hubReturn=history.state?.velen?.hubReturn;if(a.dataset.returnHub){const origin=history.state?.velen?.hubReturn;go('#hub/'+(origin?.id||r.id),{restoreY:origin?.y||0,restoreUI:origin?.ui});return;}go(href,extra);},true);
dialog.addEventListener('close',()=>{if(dialog.returnValue==='confirm'&&pending){apply(state,pending);save();render({focus:false,y:viewport().scrollY});status.textContent=legacyUnreadable?legacyGuardText:'Progress updated. Undo is available in the owner hub.';/* QA3 save guard */requestAnimationFrame(()=>screen.querySelector('.completion input')?.focus({preventScroll:true}));}pending=null;});
addEventListener('phoenix:route-rendered',event=>{if(event.detail.root!=='velen')return;const focus=routeModel.shouldFocus(event.detail.mode,inputMode);if(renderedHash===routeModel.sharedHash(location.hash)){const current=route();if(current.type==='quest'&&quests[current.id])rememberReading(current.id);if(focus){const heading=screen.querySelector('h1');heading.tabIndex=-1;heading.focus({preventScroll:true});}return;}render({focus});});render({focus:false});return {view, mountRegionalTools, regionalProgress, nilfState: () => nilfUI?.state()};
};
