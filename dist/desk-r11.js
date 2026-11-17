'use strict';
(()=>{
 const {tasks,hubs}=window.PHOENIX_ROUTE;
 const mainIds=new Set(['q-lilac','q-beast','q-incident']);
 const category=(id,t)=>mainIds.has(id)?'main':t.category==='contract'?'contract':t.stages?'side':'poi';
 const names={main:'Main quests',side:'Side quests',poi:'POIs & discoveries',contract:'Contracts'};
 const entries=Object.entries(tasks).filter(([id,t])=>!t.mapOnly&&id!=='cow-pasture-warning');
 const make=(tag,cls,text)=>{const e=document.createElement(tag);e.className=cls||'';if(text)e.textContent=text;return e;};
 function carousel(items,title){
  const {wrap,DeckMotion,bindDrag}=window.PhoenixDeckMotion;
  const consoleDeck=title==='Choose your quest',key=consoleDeck?'consoleQuest':'journalQuest',phaseKey=key+'Phase';
  const box=make('section','desk-carousel continuous-quest-deck');box.setAttribute('aria-label',title);
  box.append(make('h2','',title));const stage=make('div','card-orbit'),ring=make('div','card-ring');stage.tabIndex=0;stage.setAttribute('aria-label','Browse quest cards');stage.append(ring);box.append(stage);
  const saved=history.state?.[key],initial=Math.max(0,items.findIndex(item=>saved?item.quest===saved:item.href.split('/')[1]===document.querySelector('.hub-toggle.selected-hub')?.id.replace('-toggle','')));
  let selected=initial;
  const motion=new DeckMotion(Number.isFinite(history.state?.[phaseKey])?history.state[phaseKey]:initial),radius=items.length>5?320:235,angle=360/items.length;
  const cards=items.map((item,i)=>{
   const card=make('button','desk-card gwent-guide-card');card.type='button';card.setAttribute('aria-label','Open quest hub: '+item.name);card.dataset.deckIndex=i;
   const img=make('img');img.alt='';img.decoding='async';img.loading='lazy';img.draggable=false;
   if(item.quest){card.classList.add('illustrated-tarot');card.dataset.quest=item.quest;img.dataset.src='art-r13/'+item.quest+'-card.webp';img.className='quest-card-art';card.style.backgroundImage='url("art-r13/'+item.quest+'-thumb.webp")';}
   else {img.src=item.art||'r10-contract.svg';img.className='gwent-card-art';}
   const badge=make('span','gwent-guide-badge');badge.setAttribute('aria-hidden','true');const icon=make('img','gwent-badge-icon');icon.src=item.kind==='Contracts'?'map-icon-tempcontract.png':item.kind==='Main quests'?'map-icon-notice.png':'map-icon-sidequests.png';icon.alt='';icon.draggable=false;badge.append(icon);
   card.append(badge,img,make('small','',item.kind||'THE PATH'),make('strong','',item.name));
   card.onclick=e=>{e.preventDefault();selected=i;commit();location.hash=item.href;};ring.append(card);return card;
  });
  const controls=make('div','orbit-controls'),prev=make('button','','← Previous'),status=make('span'),next=make('button','','Next →'),open=make('a','tarot-open-action','Open quest hub →');prev.type=next.type='button';status.setAttribute('aria-live','polite');status.setAttribute('aria-atomic','true');controls.append(prev,status,next);box.append(controls,open);
  function save(){history.replaceState({...history.state,[key]:items[selected].quest,[phaseKey]:motion.position},'',location.href);}
  function paint(){
   const front=wrap(Math.round(motion.position),items.length);
   ring.style.transform='translateZ(-'+radius+'px) rotateY('+(-motion.position*angle)+'deg)';
   cards.forEach((card,i)=>{
    const delta=wrap(i-motion.position+items.length/2,items.length)-items.length/2,near=Math.abs(delta)<2.1;
    card.style.transform='rotateY('+(i*angle)+'deg) translateZ('+radius+'px) rotateY('+((motion.position-i)*angle)+'deg)';
    const illustration=card.querySelector('img[data-src]');if(illustration&&near&&illustration.getAttribute('src')!==illustration.dataset.src)illustration.src=illustration.dataset.src;
    card.style.opacity=String(Math.max(0,1-Math.abs(delta)*.42));card.style.visibility=near?'visible':'hidden';card.style.pointerEvents=near?'auto':'none';card.tabIndex=front===i?0:-1;card.setAttribute('aria-hidden',String(!near));card.setAttribute('aria-pressed',String(selected===i));card.classList.toggle('front-card',front===i);
   });
   const text=(front+1)+' / '+items.length;if(status.textContent!==text&&!motion.velocity)status.textContent=text;
  }
  function commit(){box.dataset.selectedQuest=items[selected].quest||'';open.href=items[selected].href;save();box.dispatchEvent(new CustomEvent('phoenix:card-selected',{bubbles:true,detail:{quest:items[selected].quest}}));paint();}
  const gesture=bindDrag(stage,motion,{paint,save,isVisible:()=>!box.closest('.view')?.hidden,pixelsPerCard:()=>Math.max(100,Math.min(220,stage.clientWidth*.48))});
  const stop=()=>gesture.stop();
  function move(delta){stop();motion.position+=delta;paint();save();}
  prev.onclick=()=>move(-1);next.onclick=()=>move(1);
  stage.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();stop();motion.position=e.key==='Home'?0:e.key==='End'?items.length-1:Math.round(motion.position)+(e.key==='ArrowRight'?1:-1);paint();save();cards[wrap(Math.round(motion.position),items.length)].focus({preventScroll:true});});
  addEventListener('phoenix:route-rendered',e=>{const root=consoleDeck?'whiteorchard-console':'whiteorchard-tree';if(e.detail.root!==root){stop();return;}const savedPhase=history.state?.[phaseKey];if(Number.isFinite(savedPhase))motion.position=savedPhase;const i=items.findIndex(item=>item.quest===history.state?.[key]);if(i>=0)selected=i;paint();});
  box.dataset.selectedQuest=items[selected].quest||'';open.href=items[selected].href;paint();return box;
 }

 const questCards=entries.filter(([id,t])=>t.stages).map(([id,t])=>({name:t.name,href:'#whiteorchard-tree/'+t.home+'/'+id,kind:names[category(id,t)],quest:id}));
 const home=carousel(questCards,'Choose your quest');
 document.querySelector('#whiteorchard-console .home-sheet').after(home);
 document.querySelector('#whiteorchard-tree .tree-heading').after(carousel(questCards,'Choose a quest'));
 const deckReturn=make('button','return-to-deck','Choose another quest ↑');deckReturn.type='button';deckReturn.onclick=()=>{const deck=document.querySelector('#whiteorchard-tree .desk-carousel');deck.querySelector('.front-card').focus({preventScroll:true});deck.scrollIntoView({block:'start',behavior:'auto'});};document.querySelector('#whiteorchard-tree .tree-viewport').before(deckReturn);
 document.querySelector('#whiteorchard-tree .tree-viewport').setAttribute('aria-label','Selected quest and activity groups');
 document.querySelector('#whiteorchard-tree').classList.add('tarot-quest-view');
 document.querySelector('#tree-title').textContent='White Orchard · Quest journal';
 document.querySelector('.tree-hint').textContent='Choose a quest card, then open its hub for the briefing, walkthrough and nearby activities.';
 document.querySelectorAll('.hub-toggle').forEach(button=>{const hub=hubs.find(h=>h.id+'-toggle'===button.id);const primary=hub.items.map(id=>tasks[id]).find(t=>t.stages&&t.home===hub.id);button.classList.add('tarot-selected-header');const plate=make('span','selected-tarot-art');plate.setAttribute('aria-hidden','true');const img=make('img');const primaryId=Object.keys(tasks).find(id=>tasks[id]===primary);img.src=primaryId?'art-r13/'+primaryId+'-thumb.webp':'r10-map.svg';img.className='selected-quest-illustration';img.loading='lazy';img.decoding='async';img.alt='';plate.append(img);button.prepend(plate);});
 const overview=make('a','primary-action','Open the whole constellation →');overview.href='#whiteorchard-constellation';document.querySelector('#whiteorchard-tree .tree-heading').after(overview);

})();
