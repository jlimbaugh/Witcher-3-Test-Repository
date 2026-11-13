'use strict';
(()=>{
 const {tasks,hubs}=window.PHOENIX_ROUTE;
 const mainIds=new Set(['q-lilac','q-beast','q-incident']);
 const category=(id,t)=>mainIds.has(id)?'main':t.category==='contract'?'contract':t.stages?'side':'poi';
 const names={main:'Main quests',side:'Side quests',poi:'POIs & discoveries',contract:'Contracts'};
 const entries=Object.entries(tasks).filter(([id,t])=>!t.mapOnly&&id!=='cow-pasture-warning');
 const make=(tag,cls,text)=>{const e=document.createElement(tag);e.className=cls||'';if(text)e.textContent=text;return e;};
 function carousel(items,title){
  const consoleDeck=title==='Choose your quest';
  const box=make('section','desk-carousel');box.setAttribute('aria-label',title);
  box.append(make('h2','',title));const stage=make('div','card-orbit');const ring=make('div','card-ring');stage.append(ring);box.append(stage);
  const saved=consoleDeck?history.state?.consoleQuest:null;
  const initial=items.findIndex(item=>saved?item.quest===saved:item.href.split('/')[1]===document.querySelector('.hub-toggle.selected-hub')?.id.replace('-toggle',''));
  let selected=Math.max(0,initial),startX,startY,swiped=false;const radius=items.length>5?320:235;
  const cards=items.map((item,i)=>{
   const card=make('button','desk-card gwent-guide-card');card.type='button';card.setAttribute('aria-label','Select quest: '+item.name);card.style.setProperty('--angle',(i*360/items.length)+'deg');card.style.setProperty('--radius',radius+'px');
   const img=make('img');img.alt='';img.decoding='async';img.loading='lazy';
   if(item.quest){card.classList.add('illustrated-tarot');card.dataset.quest=item.quest;img.dataset.src='art-r13/'+item.quest+'-card.webp';img.className='quest-card-art';card.style.backgroundImage='url("art-r13/'+item.quest+'-thumb.webp")';}
   else {img.src=item.art||'r10-contract.svg';img.className='gwent-card-art';}
   const badge=make('span','gwent-guide-badge');badge.setAttribute('aria-hidden','true');const icon=make('img','gwent-badge-icon');icon.src=item.kind==='Contracts'?'map-icon-tempcontract.png':item.kind==='Main quests'?'map-icon-notice.png':'map-icon-sidequests.png';icon.alt='';badge.append(icon);
   card.append(badge,img,make('small','',item.kind||'THE PATH'),make('strong','',item.name));
   card.addEventListener('click',e=>{e.preventDefault();if(swiped)return;selected=i;paint();});ring.append(card);return card;
  });
  const controls=make('div','orbit-controls');const prev=make('button','','← Previous'),status=make('span'),next=make('button','','Next →');prev.type=next.type='button';status.setAttribute('aria-live','polite');status.setAttribute('aria-atomic','true');const open=make('a','tarot-open-action','Open selected hub →');controls.append(prev,status,next);box.append(controls,open);
  function paint(){
   selected=((selected%items.length)+items.length)%items.length;
   ring.style.transform='translateZ(-'+radius+'px) rotateY('+(-selected*360/items.length)+'deg)';
   cards.forEach((card,i)=>{
    const on=selected===i,delta=(i-selected+items.length)%items.length,near=on||delta===1||delta===items.length-1;
    card.style.transform='rotateY('+(i*360/items.length)+'deg) translateZ('+radius+'px) rotateY('+((selected-i)*360/items.length)+'deg)';
    const illustration=card.querySelector('img[data-src]');if(illustration&&near){illustration.loading=on?'eager':'lazy';illustration.fetchPriority=on?'high':'low';if(illustration.getAttribute('src')!==illustration.dataset.src)illustration.src=illustration.dataset.src;}
    card.style.opacity=on?'1':'.5';card.style.visibility=near?'visible':'hidden';card.tabIndex=on?0:-1;card.setAttribute('aria-hidden',String(!on));card.setAttribute('aria-pressed',String(on));card.classList.toggle('front-card',on);card.style.pointerEvents=near?'auto':'none';
   });
   const item=items[selected];open.href=item.href;box.dataset.selectedQuest=item.quest||'';
   status.textContent=(selected+1)+' / '+items.length;
   if(consoleDeck&&!document.getElementById('home').hidden)history.replaceState({...history.state,consoleQuest:item.quest},'',location.href);
   box.dispatchEvent(new CustomEvent('phoenix:card-selected',{bubbles:true,detail:{quest:item.quest}}));
  }
  addEventListener('phoenix:route-rendered',e=>{
   if(!consoleDeck&&e.detail.root==='whiteorchard-tree'){const i=items.findIndex(item=>item.href.split('/')[1]===e.detail.hub);if(i>=0){selected=i;paint();}}
   if(consoleDeck&&e.detail.root==='home'){const i=items.findIndex(item=>item.quest===history.state?.consoleQuest);if(i>=0)selected=i;paint();}
  });
  prev.onclick=()=>{selected--;paint();};next.onclick=()=>{selected++;paint();};
  stage.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();selected=e.key==='Home'?0:e.key==='End'?items.length-1:selected+(e.key==='ArrowRight'?1:-1);paint();cards[selected].focus({preventScroll:true});});
  stage.addEventListener('pointerdown',e=>{startX=e.clientX;startY=e.clientY;swiped=false;});
  stage.addEventListener('pointerup',e=>{const dx=e.clientX-startX,dy=e.clientY-startY;if(startX!=null&&Math.abs(dx)>35&&Math.abs(dx)>Math.abs(dy)*1.3){e.preventDefault();swiped=true;selected+=dx<0?1:-1;paint();}startX=startY=null;});
  stage.addEventListener('pointercancel',()=>{startX=startY=null;swiped=false;});
  stage.addEventListener('click',e=>{if(swiped){e.preventDefault();e.stopPropagation();swiped=false;}},{capture:true});paint();return box;
 }

 const questCards=entries.filter(([id,t])=>t.stages).map(([id,t])=>({name:t.name,href:'#whiteorchard-tree/'+t.home+'/'+id,kind:names[category(id,t)],quest:id}));
 const home=carousel(questCards,'Choose your quest');
 document.querySelector('#home .home-sheet').after(home);
 document.querySelector('#whiteorchard-tree .tree-heading').after(carousel(questCards,'Choose a quest'));
 const deckReturn=make('button','return-to-deck','Choose another quest ↑');deckReturn.type='button';deckReturn.onclick=()=>{const deck=document.querySelector('#whiteorchard-tree .desk-carousel');deck.querySelector('.front-card').focus({preventScroll:true});deck.scrollIntoView({block:'start',behavior:'auto'});};document.querySelector('#whiteorchard-tree .tree-viewport').before(deckReturn);
 document.querySelector('#whiteorchard-tree .tree-viewport').setAttribute('aria-label','Selected quest and activity groups');
 document.querySelector('#whiteorchard-tree').classList.add('tarot-quest-view');
 document.querySelector('#tree-title').textContent='White Orchard · Quest journal';
 document.querySelector('.tree-hint').textContent='Browse the quest cards, then choose Open selected hub. Its activity groups open below. Completion stays with each activity’s assigned hub.';
 document.querySelectorAll('.hub-toggle').forEach(button=>{const hub=hubs.find(h=>h.id+'-toggle'===button.id);const primary=hub.items.map(id=>tasks[id]).find(t=>t.stages&&t.home===hub.id);button.classList.add('tarot-selected-header');const plate=make('span','selected-tarot-art');plate.setAttribute('aria-hidden','true');const img=make('img');const primaryId=Object.keys(tasks).find(id=>tasks[id]===primary);img.src=primaryId?'art-r13/'+primaryId+'-thumb.webp':'r10-map.svg';img.className='selected-quest-illustration';img.loading='lazy';img.decoding='async';img.alt='';plate.append(img);button.prepend(plate);});
 const overview=make('a','primary-action','Open the whole constellation →');overview.href='#whiteorchard-constellation';document.querySelector('#whiteorchard-tree .tree-heading').after(overview);

})();
