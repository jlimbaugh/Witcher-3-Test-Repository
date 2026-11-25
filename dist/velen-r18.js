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
let activityTab=activityTabs[0][0],activitySelected=decks[activityTab][0],activityDetails=null,activitiesOpen=true;
function restoreHomeDeck(){
  const saved=history.state?.velen;
  if(decks.quests.includes(saved?.selected))deckSelected=saved.selected;
  activityTab=activityTabs.some(([id])=>id===saved?.activityTab)?saved.activityTab:activityTabs[0][0];
  activitySelected=decks[activityTab].includes(saved?.activitySelected)?saved.activitySelected:decks[activityTab][0];
  activityDetails=saved?.activityDetails===activitySelected?activitySelected:null;
  activitiesOpen=saved?.activitiesOpen!==false;
}
function recordDeckView(){
  history.replaceState({...history.state,velen:{...history.state?.velen,selected:deckSelected,activityTab,activitySelected,activityDetails,activitiesOpen}},'',location.href);
}
function header(title,sub,art='velen-landscape-r18.webp'){const n=el('header','scene-banner');n.append(picture(art),el('p','eyebrow',sub),el('h1','',title));return n;}
function carousel(category,selectedId,tools=null){
const box=el('section','quest-selector desk-carousel');
box.dataset.velenDeck=category;
box.setAttribute('aria-label',tools?.label||(tools?'Choose a regional tool':category==='quests'?'Choose a Velen quest':'Choose a Velen activity'));
const catalogue=tools?.catalogue||deckQuests;
const ids=tools?Object.keys(catalogue):decks[category],idx=ids.indexOf(selectedId),deck=el('div','deck');
const select=(id,focus,showDetails=false)=>tools?tools.select(id):selectCard(category,id,focus,showDetails);
for(const offset of ids.length===1?[0]:ids.length===2?[-1,0]:[-1,0,1]){
  const i=(idx+offset+ids.length)%ids.length,id=ids[i],q=catalogue[id];
  const cardClass=tools?.compact?'velen-activity-category-label':'desk-card gwent-guide-card';
  const b=el('button','quest-card '+cardClass+' '+(offset===0?'selected':offset===1?'right':'left'));
  b.type='button';
  if(tools)b.dataset.tool=id;else b.dataset.quest=id;
  b.setAttribute('aria-label',(tools?.itemLabel||(tools?'Select tool: ':'Select quest: '))+q.name);
  b.setAttribute('aria-pressed',String(tools||category==='quests'?i===idx:activityDetails===id));
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
  b.onclick=()=>{if(performance.now()<swipeClickUntil)return;select(id,false,true);};
  deck.append(b);
}
const footer=el('div','orbit-controls velen-deck-gutter'),count=el('span','',(idx+1)+' / '+ids.length);
count.setAttribute('aria-live','polite');
footer.append(count);
box.append(deck);
if(!tools){const jump=window.createPhoenixDeckJump(ids.map(id=>deckQuests[id].name),idx,index=>select(ids[index],true,true),{selectOnSettle:true});
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
  if(direction){e.preventDefault();select(ids[(idx+direction+ids.length)%ids.length],false,!tools&&activitiesOpen);}
};
deck.onpointercancel=()=>{start=null;};
deck.ondragstart=e=>e.preventDefault();return box;}
function selectCard(category,id,focusJump=false,showDetails=false){
  if(!decks[category].includes(id))return;
  const y=viewport().scrollY;
  if(category==='quests'){
    deckSelected=id;
    if(Object.hasOwn(quests,id))state.selected=id;
  }else{
    activitySelected=id;
    if(showDetails)activityDetails=id;
    else if(activityDetails!==id)activityDetails=null;
  }
  recordDeckView();
  render({y,focus:false});
  if(focusJump)screen.querySelector('[data-velen-deck='+category+'] .deck-jump button[aria-current="true"]:not([aria-hidden])')?.focus({preventScroll:true});
  if(category!=='quests'&&showDetails&&inputMode==='keyboard')screen.querySelector('[data-velen-deck='+category+'] .quest-card.selected')?.focus({preventScroll:true});
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
    activityDetails=null;
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
    if(activitiesOpen){
      activitySelected=decks[activityTab][0];
      activityDetails=null;
    }else{
      activitiesOpen=true;
    }
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
    if(activitySelected){
      panel.append(carousel(activityTab,activitySelected));
      if(activityDetails)panel.append(selectedPanel(activityDetails));
    }
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
    const next=owner.engine.required(owner.QUEST,p).find(key=>!p.marks.includes(key));
    caption=next?owner.engine.title(owner.QUEST,next):'Quest complete';
  }
  const panel=scroll('Continue');
  panel.append(el('p','',q.name),el('p','',caption),questAction('Continue','#quest/'+id+'/'+stage));
  return panel;
}
function regionTools(){
  const tools=el('nav','region-tools');
  tools.setAttribute('aria-label','Region tools');
  tools.append(
    artTile('Main Map','#velen/map','navigation-art-v26/action-map.webp'),
    artTile('Progress','#velen/progress','navigation-art-v26/action-progress.webp'),
    artTile('Quests','#velen/quests','navigation-art-v26/action-quest-hub.webp')
  );
  return tools;
}
function render({focus=false,y=0,railX=0}={}){
  const serial=++renderSerial;
  const hash=location.hash;
  if(renderedHash===hash&&!focus)return;
  renderedHash=hash;
  const parsed=route();
  screen.replaceChildren();
  if(parsed.view==='home'){
    restoreHomeDeck();
    screen.append(header('Velen','Activities & Discoveries'),activities(),resumePanel(),regionTools());
  }else if(parsed.view==='lead'||parsed.view==='hub'){
    const id=parsed.id,q=deckQuests[id];
    if(!q){screen.append(el('p','', 'Unknown card.'));return;}
    screen.append(header(q.name,q.kind||'Quest',q.art),selectedPanel(id));
  }else{
    screen.append(el('p','','Unknown route.'));
  }
  if(focus)screen.querySelector('h1,button,a')?.focus({preventScroll:true});
  requestAnimationFrame(()=>{
    if(serial!==renderSerial)return;
    viewport().scrollTo(0,y);
    const rail=screen.querySelector('.sw-rail');
    if(rail)rail.scrollLeft=railX;
  });
}
function showOnMap(id,stage){go('#map/'+id,{stage});}
function readingStage(id){
  const q=deckQuests[id];
  return Math.max(1,Math.min(q?.stages?.length||1,state.stage[id]||1));
}
window.addEventListener('hashchange',()=>render({focus:inputMode==='keyboard'}));
restoreHomeDeck();
render({focus:false});
};