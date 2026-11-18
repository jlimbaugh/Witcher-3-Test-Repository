'use strict';
window.createPhoenixVelen=function({navigate}){
const questCards=window.PhoenixVelenQuestCards||{};
window.PhoenixVelenReadingPages=new WeakMap();
const routeModel=window.PhoenixVelenRouting,viewport=()=>window.PhoenixViewport||window;
const view=document.createElement('section');view.id='velen';view.className='view scene main-console-view velen-view';view.hidden=true;view.setAttribute('aria-labelledby','velen-heading');view.innerHTML='<div class="scene-inner console-r16"><div class="cover" id="velen-screen"></div><p id="velen-save-status" role="status"></p></div>';document.querySelector('main').append(view);
const confirm=document.createElement('dialog');confirm.id='velen-confirm-progress';confirm.className='progress-dialog';confirm.setAttribute('aria-labelledby','velen-confirm-title');confirm.innerHTML='<form method="dialog"><h2 id="velen-confirm-title">Confirm recorded progress</h2><p id="velen-confirm-text"></p><div class="dialog-actions"><button value="cancel">Cancel</button><button value="confirm">Confirm</button></div></form>';document.body.append(confirm);
let inputMode='pointer',renderSerial=0,renderedHash=null;document.addEventListener('pointerdown',()=>inputMode='pointer',true);document.addEventListener('keydown',e=>{if(['Tab','Enter',' '].includes(e.key))inputMode='keyboard';},true);
const {quests:legacyQuests,leads,initial,apply,unlocked}=window.PHOENIX_VELEN,key='phoenix.velen.arrival.v1';let raw={};try{raw=JSON.parse(localStorage.getItem(key)||'{}');}catch{}
const quests={...legacyQuests,nilf:{...legacyQuests.nilf,art:'art-velen/nilf.webp',position:'center'}};
// v45 Slice 2 QA3 save guard (owner-authorized, narrowly scoped; the only change to the legacy save writer):
// if phoenix.velen.arrival.v1 exists but cannot be read (invalid JSON, or JSON that is not an object - the same rule
// as the Slice 1 import's legacy-unreadable), this page session never writes that key. Browsing state lives in memory
// only, so the unreadable bytes survive render, navigation, interaction, reloads and a refused handover until the
// record is repaired. Valid or absent records are saved exactly as in v45 (same code path, same bytes).
const legacyUnreadable=(()=>{let text;try{text=localStorage.getItem(key);}catch{return false;}if(text==null)return false;try{const v=JSON.parse(text);return !(v&&typeof v==='object'&&!Array.isArray(v));}catch{return true;}})(),legacyGuardText='Your saved Velen record could not be read, so it is kept unchanged. Changes in this visit are not saved.';const state=initial(raw),screen=document.getElementById('velen-screen'),status=document.getElementById('velen-save-status');let pending=null,swipeClickUntil=0;const dialog=document.getElementById('velen-confirm-progress');

const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n;};const link=(text,href,cls='')=>{const a=el('a',cls,text);a.href=href.startsWith('index.html#')?href.slice(10):href.startsWith('#')?routeModel.sharedHash(href):href;return a;};
// v45 Slice 2 seam: The Nilfgaardian Connection (velen.nilf) is rendered by velen-nilf-ui.js and its progress is owned by
// the canonical Velen region record via velen-nilf-progress.js (this file never reads that key itself). This file keeps routing, the console, reading position, Continue records and the
// velen.pyres/velen.mercy owners. If the handover is unavailable (e.g. newer canonical data), nilf falls back to the v45 legacy hub.
/* QA6 D4: read the localStorage getter once, guarded. A browser that denies storage access throws here; the Nilfgaardian owner then gets a stand-in whose calls throw that same error, which it already reports as storage-unavailable, so start-up continues. */const nilfStorage=(()=>{try{return localStorage;}catch(error){const denied=()=>{throw error;};return {getItem:denied,setItem:denied,removeItem:denied};}})();const nilfUI=window.createPhoenixVelenNilfUI&&window.PhoenixVelenNilfProgress?window.createPhoenixVelenNilfUI({storage:nilfStorage,quests,link,go,readingStage:()=>state.stage.nilf,hasReading:()=>state.last?.id==='nilf'||state.stage.nilf>1,activityComplete:id=>state.complete[id]===true,rerender:()=>{const rail=screen.querySelector('.sw-rail');render({focus:false,y:viewport().scrollY,railX:rail?.scrollLeft});}}):null;
const nilfOwned=()=>!!nilfUI&&nilfUI.owned(),isComplete=id=>id==='nilf'&&nilfOwned()?nilfUI.complete():state.complete[id]===true,isUnlocked=()=>isComplete('nilf');
function save(){if(legacyUnreadable){status.textContent=legacyGuardText;return;}/* QA3 save guard */try{localStorage.setItem(key,JSON.stringify(state));status.textContent='Your Velen progress saves in this browser.';}catch{status.textContent='Saving is unavailable. Progress lasts for this visit only.';}}
function picture(src,cls,position){const im=el('img',cls);im.src=src;im.alt='';im.decoding='async';if(position)im.style.objectPosition=position;return im;}
function scroll(title){const n=el('section','scroll scroll-r16');if(title)n.append(el('h2','',title));return n;}
function artTile(title,href,src,pos){const a=link('',href,'art-tile console-tile');a.append(picture(src,'',pos),el('span','',title));return a;}
function route(){return routeModel.parse(location.hash);}
function go(hash,extra={}){navigate(routeModel.sharedHash(hash),{velen:extra});}
const deckQuests={...quests};
for(const [id,card] of Object.entries(questCards)){
  deckQuests[id]={kind:'Main quest',art:'velen-landscape-r18.webp',...leads[id],...card};
}
const deckIds=Object.keys(deckQuests);
let deckSelected=state.selected;
function restoreHomeDeck(){
  const id=history.state?.velen?.selected;
  if(Object.hasOwn(deckQuests,id))deckSelected=id;
}
function header(title,sub,art='velen-landscape-r18.webp'){const n=el('header','scene-banner');n.append(picture(art),el('p','eyebrow',sub),el('h1','',title));return n;}
function carousel(){const box=el('section','quest-selector desk-carousel');box.setAttribute('aria-label','Choose a Velen quest');const ids=deckIds,idx=ids.indexOf(deckSelected),deck=el('div','deck');
for(const offset of [-1,0,1]){const i=(idx+offset+ids.length)%ids.length,id=ids[i];const q=deckQuests[id],b=el('button','quest-card desk-card gwent-guide-card '+(offset===0?'selected':offset===1?'right':'left'));b.type='button';b.dataset.quest=id;b.setAttribute('aria-label','Select quest: '+q.name);b.setAttribute('aria-pressed',String(i===idx));b.tabIndex=i===idx?0:-1;const im=picture(q.art,'quest-card-art',q.position);im.loading=i===idx?'eager':'lazy';im.fetchPriority=i===idx?'high':'low';const badge=el('span','gwent-guide-badge',q.kind==='Main quest'?'Ⅰ':q.kind==='Side quest'?'Ⅱ':'◇');badge.setAttribute('aria-hidden','true');b.append(im,badge,el('small','',q.kind),el('strong','',q.name));b.onclick=()=>{if(performance.now()<swipeClickUntil)return;select(id);};deck.append(b);}
const footer=el('div','orbit-controls velen-deck-gutter'),count=el('span','',(idx+1)+' / '+ids.length);
count.setAttribute('aria-live','polite');
footer.append(count);
box.append(deck,footer);
deck.onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();select(e.key==='Home'?ids[0]:e.key==='End'?ids[ids.length-1]:ids[(idx+(e.key==='ArrowLeft'?ids.length-1:1))%ids.length]);screen.querySelector('.quest-card.selected').focus({preventScroll:true});}};
let start=null;deck.onpointerdown=e=>{if(e.isPrimary&&e.button===0)start={id:e.pointerId,x:e.clientX,y:e.clientY};};deck.onpointermove=e=>{if(!start||start.id!==e.pointerId)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.abs(dx)>=8&&Math.abs(dx)>Math.abs(dy)*1.3)swipeClickUntil=performance.now()+400;if(Math.abs(dx)>=8&&Math.abs(dx)>Math.abs(dy)*1.3&&!deck.hasPointerCapture(e.pointerId))deck.setPointerCapture(e.pointerId);};
function finishSwipe(e,cancelled){if(!start||start.id!==e.pointerId)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;start=null;if(deck.hasPointerCapture(e.pointerId))deck.releasePointerCapture(e.pointerId);if(cancelled)return;const direction=window.PhoenixSwipeBoxModel.swipeDirection(dx,dy,false);if(direction){e.preventDefault();swipeClickUntil=performance.now()+400;select(ids[(idx+direction+ids.length)%ids.length]);}}
deck.onpointerup=e=>finishSwipe(e,false);deck.onpointercancel=e=>finishSwipe(e,true);deck.ondragstart=e=>e.preventDefault();return box;}
function select(id){
  if(!Object.hasOwn(deckQuests,id))return;
  const y=viewport().scrollY;
  deckSelected=id;
  history.replaceState({...history.state,velen:{...history.state?.velen,selected:id}},'',location.href);
  if(Object.hasOwn(quests,id))state.selected=id;
  render({y,focus:false});
}
function consoleView(){
  const id=deckSelected,q=deckQuests[id],tracked=Object.hasOwn(quests,id);
  screen.append(header('Velen','No Man’s Land'));
  const resume=scroll(),last=state.last?.id;
  resume.classList.add('resume','console-continue');
  resume.append(el('small','',last?'Resume last walkthrough':'Return to last hub'),link(last?quests[last].name:quests[state.lastHub].name,last?'#quest/'+last+'/'+state.stage[last]:'#hub/'+state.lastHub));
  screen.append(resume,carousel());
  const selected=scroll(q.name);
  selected.classList.add('selected-panel','selected-scroll');
  selected.append(el('p','',q.briefing||q.intro));
  if(q.level)selected.append(el('p','eyebrow','Suggested level '+q.level));
  const actions=el('nav','tiles console-tiles');
  actions.setAttribute('aria-label','Selected quest actions');
  actions.append(
    artTile('Open walkthrough','#quest/'+id+'/'+(tracked?state.stage[id]:1),q.art,q.position),
    artTile(tracked?'Open quest hub':'Open quest card',(tracked?'#hub/':'#lead/')+id,q.art,'right center')
  );
  selected.append(actions);
  screen.append(selected);
  const along=scroll('Along the arrival road');
  along.append(el('p','pilot-count','Arrival pilot · '+['nilf','pyres','mercy'].filter(isComplete).length+' / 3 activities resolved'));
  for(const id of ['pyres','mercy'])along.append(link((state.complete[id]?'✓ ':'○ ')+quests[id].name,'#hub/'+id,'activity-link'));
  screen.append(along);
  const explore=scroll('Explore Velen'),shortcuts=el('nav','tiles shortcuts console-tiles');
  shortcuts.append(artTile('Regions','index.html#regions','velen-landscape-r18.webp'),artTile('Merchants','#merchants','gwent-r15/gabor.webp'));
  explore.append(shortcuts);
  screen.append(explore);
}
function nextLeads(){const n=scroll('After Hendrik’s notes');n.append(el('p','small-note',isUnlocked()?'Notes recorded · choose your next lead.':'Next leads · record the finished main quest in its hub when you have read the notes in game.'));const tiles=el('div','tiles');for(const [id,l] of Object.entries(leads))tiles.append(artTile(l.name,'#lead/'+id,deckQuests[id].art));n.append(tiles);return n;}
function hub(id){const q=quests[id];screen.append(header(q.name,q.kind+' · Permanent owner hub',q.art));const n=scroll('At this stop');n.append(link('← Velen console','#velen','back-link'),link('Open walkthrough →','#quest/'+id+'/'+state.stage[id],'button-link'));const label=el('label','completion'),check=el('input');check.type='checkbox';check.checked=state.complete[id];check.setAttribute('aria-label','Mark '+q.name+' resolved');check.onchange=()=>{check.checked=state.complete[id];pending={kind:'complete',id,value:!state.complete[id]};document.getElementById('velen-confirm-text').textContent=id==='nilf'?(state.complete[id]?'Remove the recorded completion? The two next-lead summaries return to an unconfirmed state. Other activities remain unchanged.':'Confirm that you finished this quest and read Hendrik’s notes in game. This records only this quest and confirms the two next leads. It does not complete side activities.'):(state.complete[id]?'Remove this activity’s recorded completion?':'Confirm that you resolved this activity in the game. Other activities remain unchanged.');dialog.showModal();};label.append(check,el('span','',state.complete[id]?'Resolved — recorded':'Mark resolved in game'));n.append(label);if(state.undo){const undo=el('button','','Undo last progress change');undo.onclick=()=>{apply(state,{kind:'undo'});save();render({focus:false,y:viewport().scrollY});};n.append(undo);}n.append(el('p','small-note','Stage navigation never marks completion. A reference elsewhere uses this same mark.'));
if(id==='nilf'){n.append(el('h3','','Side quests & encounters'));for(const other of ['pyres','mercy'])n.append(link((state.complete[other]?'✓ ':'○ ')+quests[other].name+' · open owner hub','#hub/'+other,'activity-link'));n.append(el('h3','','Services & notices'),link('Innkeeper · supplies and Gwent information','#merchants','activity-link'),link('Collected notices & deferred exploration','#deferred','activity-link'));}else n.append(link('Return to arrival quest hub','#hub/nilf','activity-link'));screen.append(n);if(id==='nilf')screen.append(nextLeads());}
function choice(key,n){const label=el('label','choice-label',key==='inn'?'Record your inn outcome (optional)':'Record your decision (optional)'),select=el('select');select.setAttribute('aria-label',key==='inn'?'Recorded inn outcome':'Recorded John Verdun decision');select.append(new Option('Not recorded',''));const values=key==='inn'?[['peace','Settled peacefully'],['fight','Fought the soldiers']]:[['freed','Released John'],['left','Left him tied']];for(const [v,t]of values)select.append(new Option(t,v));select.value=state.choices[key]||'';select.onchange=()=>{if(!select.value){state.undo={complete:{...state.complete},choices:{...state.choices}};delete state.choices[key];}else apply(state,{kind:'choice',key,value:select.value});save();};label.append(select);n.append(label);}
function rememberReading(id){try{localStorage.setItem('phoenix.guide.resume.v1',JSON.stringify({href:'#velen/quest/'+id+'/'+state.stage[id],name:quests[id].name,stageNumber:state.stage[id]}));}catch{}}
function readingPage(id,q,index,legacy){
  const stage=q.stages[index], page=el('div','quest-page velen-reading-page');
  const heading=el('header','page-heading r15-heading');
  const art=picture(q.art||'velen-landscape-r18.webp','r15-page-art',q.position);
  const seal=el('span','r15-page-seal',q.kind||'Main quest');
  seal.setAttribute('aria-hidden','true');
  heading.append(art,el('p','eyebrow','QUEST WALKTHROUGH / VELEN'),el('h1','',q.name),el('p','quest-page-facts',q.level?'Velen · Suggested level '+q.level:'Velen'),seal);
  const panel=el('article','reading-panel');
  const tools=el('nav','quest-tools');
  tools.setAttribute('aria-label','Quest tools');
  const back=link(legacy?'Return to hub':'Return to quest card',legacy?'#hub/'+id:'#lead/'+id);
  if(legacy)back.dataset.returnHub='true';
  tools.append(back);
  page.append(heading,panel,tools);
  const story=stage.choice?()=>{const section=el('div','sw-story');choice(stage.choice,section);return section;}:null;
  window.PhoenixVelenReadingPages.set(page,{id,q,index,story,goStage:n=>go('#quest/'+id+'/'+n,{hubReturn:history.state?.velen?.hubReturn,restoreY:Math.round(viewport().scrollY)})});
  screen.append(page);
}
function walkthrough(id,stage){if(id==='nilf'&&nilfOwned()){apply(state,{kind:'view',id,stage:stage||state.stage[id]});save();rememberReading(id);nilfUI.walkthrough(screen,state.stage[id]-1);return;}const q=quests[id];apply(state,{kind:'view',id,stage:stage||state.stage[id]});save();rememberReading(id);readingPage(id,q,state.stage[id]-1,true);}

function questCard(id, stage){
  const card=questCards[id], lead=leads[id]||card;
  if(stage){
    const index=Math.min(card.stages.length,Number(stage)||1)-1;
    readingPage(id,{...lead,...card},index,false);
    return;
  }
  screen.append(header(lead.name,(lead.kind||'Main quest')+(lead.level?' · Suggested level '+lead.level:''),card.art));
  const panel=scroll('At this stop');
  panel.append(link('← Velen console','#velen','back-link'),el('p','eyebrow',lead.place),el('p','',card.briefing));
  panel.append(el('p','',card.start||'Start after reading Hendrik’s notes in The Nilfgaardian Connection. Both leads can be followed in either order.'));
  panel.append(link('Open walkthrough →','#quest/'+id+'/1','button-link'));
  panel.append(el('h3','','When the quest is complete'),el('p','',card.completion));
  panel.append(link('Sources','velen-sources.html#'+id,'sw-source-link'));
  screen.append(panel);
}
function info(type,id){if(type==='lead'){const l=leads[id];screen.append(header(l.name,'Next lead · Suggested level '+l.level));const n=scroll(l.place);n.append(el('p','',l.text),el('p','warning',isUnlocked()?'This lead is confirmed by your recorded main-quest completion. Its full walkthrough is not built in this pilot.':'This lead follows Hendrik’s notes. If you have already read them, record The Nilfgaardian Connection as complete in its owner hub.'),link('Return to arrival hub','#hub/nilf','button-link'));screen.append(n);return;}
screen.append(header(type==='merchants'?'Innkeeper & notices':'Collected notices','Inn at the Crossroads'));const n=scroll(type==='merchants'?'Services at this stop':'Keep for later');if(type==='merchants'){n.append(el('p','','The innkeeper provides food, drink and a shop conversation. Check his card stock and Gwent dialogue in game; this pilot does not yet verify the named match reward or its quest-state prerequisites.'),el('p','','Quest connections: The Nilfgaardian Connection; Contract: Missing Brother. Full inventories are not tracked.'),link('Notices and deferred work','#deferred','activity-link'));}else{n.append(el('h3','','Contract: Missing Brother · level 33'),el('p','','The notice can be collected at the inn. Its combat is beyond the arrival recommendation; collecting it does not mark the contract complete.'),el('h3','','Wild at Heart'),el('p','','An inn-board lead for a separate quest cluster. Its full route is not included here; it is not labelled too high-level.'),el('h3','','Lornruk · later exploration'),el('p','','The shoreline Quen Place of Power and fortress encounter need separate guidance. Research describes level-10 drowners and a level-14 wyvern. Do not add the wyvern fight to the arrival route.'));}n.append(link('Return to The Nilfgaardian Connection hub','#hub/nilf','button-link'));screen.append(n);}
function render(options={}){renderedHash=routeModel.sharedHash(location.hash);const serial=++renderSerial,r=route();view.dataset.velenView=r.type; if(r.type==='velen')restoreHomeDeck();screen.replaceChildren();if(r.type==='hub'&&quests[r.id]){state.selected=r.id;state.lastHub=r.id;if(r.id==='nilf'&&nilfOwned()){nilfUI.hub(screen);screen.append(nextLeads());}else hub(r.id);}else if(r.type==='quest'&&quests[r.id])walkthrough(r.id,r.stage);else if(['lead','quest'].includes(r.type)&&Object.hasOwn(questCards,r.id))questCard(r.id,r.stage);else if(r.type==='lead'&&leads[r.id])info('lead',r.id);else if(['merchants','deferred'].includes(r.type))info(r.type);else if(r.type==='velen')consoleView();else{screen.append(header('The trail is unclear','Unknown pilot link'));const n=scroll();n.append(link('Return to Velen','#velen','button-link'));screen.append(n);}if(!(['lead','quest'].includes(r.type)&&Object.hasOwn(questCards,r.id)))save();if(options.railX!=null&&screen.firstElementChild?.classList.contains('velen-nilf-page'))screen.firstElementChild.dataset.swRestoreRail=String(options.railX);const heading=screen.querySelector('h1');if(heading)heading.id='velen-heading';window.PhoenixVisuals?.enhance();window.PhoenixSwipeBoxes?.enhance();requestAnimationFrame(()=>{if(view.hidden||serial!==renderSerial)return;if(options.y!==undefined)viewport().scrollTo(0,options.y);if(options.focus===true&&heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}});}
document.addEventListener('click',e=>{const a=e.target.closest('#velen a[href^="#velen"]');if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();e.stopPropagation();const href=a.getAttribute('href'),target=routeModel.parse(href),r=route();let extra={};if(r.type==='hub'&&target.type==='quest'){extra.hubReturn={id:r.id,y:viewport().scrollY,ui:r.id==='nilf'&&nilfOwned()?nilfUI.capture():undefined};}else if(r.type==='quest'&&target.type==='quest')extra.hubReturn=history.state?.velen?.hubReturn;if(a.dataset.returnHub){const origin=history.state?.velen?.hubReturn;go('#hub/'+(origin?.id||r.id),{restoreY:origin?.y||0,restoreUI:origin?.ui});return;}go(href,extra);},true);
dialog.addEventListener('close',()=>{if(dialog.returnValue==='confirm'&&pending){apply(state,pending);save();render({focus:false,y:viewport().scrollY});status.textContent=legacyUnreadable?legacyGuardText:'Progress updated. Undo is available in the owner hub.';/* QA3 save guard */requestAnimationFrame(()=>screen.querySelector('.completion input')?.focus({preventScroll:true}));}pending=null;});
addEventListener('phoenix:route-rendered',event=>{if(event.detail.root!=='velen')return;const focus=routeModel.shouldFocus(event.detail.mode,inputMode);if(renderedHash===routeModel.sharedHash(location.hash)){const current=route();if(current.type==='quest'&&quests[current.id])rememberReading(current.id);if(focus){const heading=screen.querySelector('h1');heading.tabIndex=-1;heading.focus({preventScroll:true});}return;}render({focus});});render({focus:false});return {view};
};
