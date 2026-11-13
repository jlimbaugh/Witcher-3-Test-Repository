'use strict';
/* Console presentation only. Progress and all routes remain owned by app.js. */
(()=>{
 const home=document.querySelector('#home'), cover=home.querySelector('.cover');
 const {tasks}=window.PHOENIX_ROUTE;
 const create=(tag,cls,text)=>{const e=document.createElement(tag);e.className=cls||'';if(text)e.textContent=text;return e;};
 home.classList.add('console-r16');
 document.querySelector('.wordmark').textContent='PHOENIX';
 const old=home.querySelector('.home-sheet');
 const title=old.querySelector('h1');title.textContent='White Orchard';
 const banner=home.querySelector('.cover-art');banner.append(title);
 const cont=old.querySelector('[data-console-continue]');
 cont.className='console-continue scroll-r16';cont.querySelector('small').textContent='Resume last walkthrough';
 const deck=home.querySelector('.desk-carousel');
 const scroll=create('section','selected-scroll scroll-r16');scroll.setAttribute('aria-label','Selected quest');
 const questTitle=create('h2');const description=create('p','selected-description');
 const progress=create('p','console-progress');const meter=create('progress');meter.setAttribute('aria-label','Regional guide activities completed');
 scroll.append(questTitle,description,progress,meter);
 function group(label){const section=create('section','console-group scroll-r16');const h=create('h2','',label);section.setAttribute('aria-label',label);section.append(h);const grid=create('nav','console-tiles');grid.setAttribute('aria-label',label);section.append(grid);return {section,grid};}
 function tile(grid,label,href,art){const a=create('a','console-tile');a.href=href;const img=create('img');img.src=art;img.alt='';img.loading='lazy';img.decoding='async';const span=create('span','',label);a.append(img,span);grid.append(a);return a;}
 const actions=group('At this stop'), explore=group('Explore the guide');
 const open=tile(actions.grid,'Open selected quest','#whiteorchard-tree','art-r13/q-beast-card.webp');
 const nearby=tile(actions.grid,'Nearby opportunities','#whiteorchard-tree','white-orchard-map.webp');
 tile(explore.grid,'Quests','#whiteorchard-tree','art-r13/q-lilac-card.webp');
 tile(explore.grid,'Regional map','#whiteorchard-map','white-orchard-map.webp');
 tile(explore.grid,'Constellation','#whiteorchard-constellation','console-constellation-r16.svg');
 tile(explore.grid,'Merchants','#economy-merchants','gwent-r15/gabor.webp');
 cover.replaceChildren(banner,cont,deck,scroll,actions.section,explore.section);
 home.querySelector('.study-note').textContent='Unofficial Witcher field guide · Your progress, your path';
 function updateSelection(){const id=deck.dataset.selectedQuest,t=tasks[id];if(!t)return;questTitle.textContent=t.name;description.textContent=t.intro||'Follow this lead. Discover what is worth doing along the way.';open.href='#'+t.view;open.querySelector('img').src='art-r13/'+id+'-card.webp';open.setAttribute('aria-label','Open selected quest: '+t.name);nearby.href='#whiteorchard-tree/'+t.home+'/'+id;nearby.setAttribute('aria-label','Nearby opportunities for '+t.name);}
 function updateResume(){const href=cont.getAttribute('href')||'';const root=href.replace(/^#/, '').split('/')[0];const staged=Object.values(tasks).some(t=>t.stages&&t.view===root);cont.querySelector('small').textContent=staged?'Resume last walkthrough':root==='whiteorchard-tree'?'Return to last hub':'Return to last guide page';}
 function updateProgress(){const text=document.querySelector('[data-pilot-progress]').textContent;progress.textContent='Regional progress · '+text;const nums=text.match(/\d+/g)||['0','39'];meter.value=Number(nums[0]);meter.max=Number(nums[1]);}
 deck.addEventListener('phoenix:card-selected',updateSelection);
 new MutationObserver(updateProgress).observe(document.querySelector('[data-pilot-progress]'),{childList:true,characterData:true,subtree:true});
 new MutationObserver(updateResume).observe(cont,{attributes:true,attributeFilter:['href']});
 updateSelection();updateProgress();updateResume();
})();
