'use strict';
/* Approved destinations and unresolved-warning access. Rendering and selection never write player progress. */
(()=>{
 const entries=[
  {key:'home',label:'Home',href:'#home',src:'navigation-art-v26/home.webp',glow:'#a6bfd9'},
  {key:'quests',label:'Quests',href:'#whiteorchard-tree',src:'navigation-art-v26/reference.webp',glow:'#ccd6df'},
  {key:'regions',label:'Regions',href:'#regions',src:'navigation-art-v26/regions.webp',glow:'#97b77c'},
  {key:'map',label:'Main Map',href:'#whiteorchard-map',src:'navigation-art-v26/progress.webp',glow:'#c99c5f'},
  {key:'warnings',label:'Warnings',src:'navigation-art-v26/warnings.webp',glow:'#9b3547'}
 ];
 function keyForRoute(hash){const root=String(hash||'#home').replace(/^#/,'').split('/')[0];if(root==='home')return 'home';if(root==='whiteorchard-tree')return 'quests';if(root==='whiteorchard-map'||root==='map')return 'map';if(/^(field-reference|economy|character|gear|combat|alchemy|gwent)/.test(root))return 'quests';return 'regions';}
 function createSequence(items,{setTimer=window.setTimeout.bind(window),clearTimer=window.clearTimeout.bind(window),reduced=()=>false,onPlaying=()=>{}}={}){
  let opened=false,seen=false,timer=null,generation=0;
  function quiet(){generation++;if(timer!==null)clearTimer(timer);timer=null;items.forEach(item=>item.stop());onPlaying(-1);}
  function play(index){quiet();if(!opened||reduced()||!items[index])return;items[index].play();onPlaying(index);const token=generation;timer=setTimer(()=>{if(token===generation)quiet();},8000);}
  function arrival(index){if(!opened||!items[index])return;play(index);const token=generation;if(timer!==null)clearTimer(timer);timer=setTimer(()=>{if(token!==generation||!opened)return;items[index].stop();onPlaying(-1);timer=null;if(index+1<items.length)arrival(index+1);},8150);}
  return {open({quiet:quietStart=false}={}){opened=true;quiet();if(!seen){seen=true;if(!quietStart&&!reduced())arrival(0);}},close(){opened=false;quiet();},touch(index){if(opened)play(index);},quiet,isOpen:()=>opened};
 }
 function decorate({root,fan,open:openMenu,close,acknowledgeWarnings,navigate}){
  const make=(tag,text,cls)=>{const node=document.createElement(tag);if(text)node.textContent=text;if(cls)node.className=cls;return node;};
  const warningButton=make('button');warningButton.type='button';fan.append(warningButton);
  const cards=[...fan.children],media=window.matchMedia('(prefers-reduced-motion: reduce)');
  fan.classList.add('command-layer','art-navigation-layer');fan.setAttribute('aria-label','Guide destinations');
  const wolf=root.querySelector('.medallion-core');
  const backdrop=make('div',null,'command-backdrop');backdrop.setAttribute('aria-hidden','true');backdrop.onclick=close;
  let listMode=false,listY=0;
  const panel=make('div',null,'art-navigation-panel'),heading=make('div',null,'art-navigation-heading'),closeButton=make('button','Close ×','art-navigation-close');closeButton.type='button';closeButton.onclick=close;closeButton.hidden=true;heading.append(make('h2','Navigate'),closeButton);
  const searchButton=make('button','Search the guide…','art-search-trigger');searchButton.type='button';searchButton.setAttribute('aria-label','Open Search');searchButton.onclick=()=>{close();window.PhoenixSearch?.open(searchButton,{reopen:()=>openMenu?.()});};
  const row=make('div',null,'art-navigation-row');row.setAttribute('role','group');row.setAttribute('aria-label','Guide destinations');
  const wrappers=cards.map((button,index)=>{
   const entry=entries[index],item=make('div',null,'art-navigation-item');item.dataset.artKey=entry.key;item.style.setProperty('--navigation-glow',entry.glow);
   button.className='art-navigation-button '+(entry.key==='home'?'ns-scene':entry.key==='regions'?'rg-scene':'');button.type='button';button.setAttribute('aria-label',entry.label);button.dataset.navigationKey=entry.key;
   const picture=make('span',null,'art-navigation-picture'),image=make('img');image.src=entry.src;image.alt='';image.draggable=false;image.decoding='async';const canvas=make('canvas');canvas.setAttribute('aria-hidden','true');picture.append(image,canvas);
   const label=make('span',null,'art-navigation-label');label.textContent=entry.label;
   const marker=make('span','◆','art-navigation-marker');marker.setAttribute('aria-hidden','true');button.replaceChildren(picture,label,marker);
   const hidden=make('span');hidden.hidden=true;const replay=make('button'),quiet=make('button');replay.type=quiet.type='button';replay.dataset.replay='';quiet.dataset.quiet='';hidden.append(replay,quiet,make('span',null,entry.key==='home'?'ns-status':'rg-status'));item.append(button,hidden);row.append(item);return item;
  });
  const badge=make('span','0','art-warning-count'),finalLabel=make('span','FINAL','art-warning-final');warningButton.querySelector('.art-navigation-picture').append(badge,finalLabel);
  const effects=wrappers.map((item,index)=>window.PhoenixNavigationEffects.create(item,entries[index].key));
  const sequence=createSequence(effects,{reduced:()=>media.matches,onPlaying(index){wrappers.forEach((item,i)=>item.classList.toggle('is-playing',i===index));}});
  const warningList=make('section',null,'art-warning-list');warningList.hidden=true;warningList.setAttribute('aria-label','Unresolved warnings');
  const back=make('button','← Return','art-warning-back');back.type='button';back.hidden=true;heading.prepend(back);panel.append(heading,searchButton,row,warningList);fan.replaceChildren(backdrop,panel);
  const read=()=>window.PhoenixWarningCenter?.get()||{items:[],count:0,final:false};
  function paintList(restoreId){const data=read();warningList.replaceChildren();heading.querySelector('h2').textContent='Warnings';
   const unknown=data.items.filter(item=>item.unknown).length;const summary=make('p',(data.count-unknown)+' open risks · '+unknown+' unknown · '+data.items.filter(item=>item.final).length+' final','art-warning-summary');warningList.append(summary);
   if(!data.items.length)warningList.append(make('p','No unresolved warnings recorded.','art-warning-empty'));
   for(const item of data.items){const entry=make('article',null,'art-warning-entry');entry.classList.toggle('is-final',item.final);if(item.art){const image=make('img',null,'art-warning-illustration');image.src=item.art;image.alt='';image.loading='lazy';entry.append(image);}const button=make('button',item.name,'art-warning-title');button.type='button';button.dataset.warningRisk=item.id;button.setAttribute('aria-label','Open warning details: '+item.name);button.onclick=()=>{const menuReturn={listY:warningList.scrollTop,warningId:item.id};close();window.PhoenixWarnings?.open(item.id,wolf,{menuReturn});};entry.append(button,make('p',item.status,'art-warning-status'));if(item.final)entry.append(make('strong','FINAL','art-warning-final-inline'));if(item.verify)entry.append(make('p',item.verify,'art-warning-verify'));entry.append(make('p',item.consequence,'art-warning-consequence'),make('p',item.cutoff,'art-warning-cutoff'));
    const correction=make('button',item.id==='poi-4'?'Review activity completion':'Open quest progress','art-warning-correction');correction.type='button';correction.onclick=()=>openCorrection(item);entry.append(correction);warningList.append(entry);}
   warningList.scrollTop=listY;
   const target=restoreId?[...warningList.querySelectorAll('button')].find(b=>b.dataset.warningRisk===restoreId):null;(target||back).focus({preventScroll:true});
  }
  function showList(saved={}){acknowledgeWarnings?.();listMode=true;fan.classList.add('warnings-takeover');root.setAttribute('aria-label','Warnings');wolf?.setAttribute('aria-label','Close Warnings');listY=saved.listY||0;sequence.open({quiet:true});searchButton.hidden=true;row.hidden=true;warningList.hidden=false;back.hidden=false;warningButton.setAttribute('aria-expanded','true');paintList(saved.warningId);}
  function showGrid(){listMode=false;fan.classList.remove('warnings-takeover');searchButton.hidden=false;warningList.hidden=true;back.hidden=true;row.hidden=false;heading.querySelector('h2').textContent='Navigate';warningButton.setAttribute('aria-expanded','false');warningButton.focus({preventScroll:true});}
  warningButton.onclick=()=>showList();back.onclick=close;
  let savedY=0,priorFocus=null,wolfLabel=null,opened=false,openGeneration=0;
  function sync(){const key=keyForRoute(location.hash),data=read();wrappers.forEach((item,i)=>{const current=entries[i].key===key;item.classList.toggle('is-current',current);if(current)cards[i].setAttribute('aria-current','page');else cards[i].removeAttribute('aria-current');});badge.textContent=String(data.count);badge.setAttribute('aria-label',data.count+' unresolved warnings');warningButton.classList.toggle('has-final-risk',data.final);finalLabel.setAttribute('aria-hidden',String(!data.final));warningButton.setAttribute('aria-label','Warnings · '+data.count+' unresolved'+(data.final?' · FINAL':''));if(listMode&&opened){listY=warningList.scrollTop;paintList();}}
  cards.forEach((button,index)=>button.addEventListener('click',()=>sequence.touch(index),true));
  function focusables(){return [...(listMode?[back,...warningList.querySelectorAll('button')]:[searchButton,...cards]),...(wolf?[wolf]:[])];}
  function keydown(event){if(['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key)){const index=cards.indexOf(document.activeElement);if(listMode||index<0)return;event.preventDefault();const next=event.key==='ArrowUp'?Math.max(0,index-2):event.key==='ArrowDown'?Math.min(cards.length-1,index+2):(index+(event.key==='ArrowRight'?1:cards.length-1))%cards.length;cards[next].focus();}if(event.key==='Tab'){const list=focusables(),index=list.indexOf(document.activeElement);if(event.shiftKey&&index<=0){event.preventDefault();list.at(-1).focus();}else if(!event.shiftKey&&(index===list.length-1||index<0)){event.preventDefault();list[0].focus();}}}

  let correctionOrigin=null,correctionButton=null,correctionContext=null;
  function restoreCorrectionContext(){if(!correctionContext)return;for(const [node,open]of correctionContext.details)if(node.isConnected)node.open=open;for(const [node,x]of correctionContext.rails)if(node.isConnected)node.scrollLeft=x;correctionContext=null;}
  function openCorrection(item){
   const task=window.PHOENIX_ROUTE?.tasks[item.id];if(!task||!navigate)return;
   const sourceView=document.querySelector('.view:not([hidden])');correctionContext={details:[...(sourceView?.querySelectorAll('details')||[])].map(node=>[node,node.open]),rails:[...(sourceView?.querySelectorAll('.objective-rail')||[])].map(node=>[node,node.scrollLeft])};
   const origin={hash:location.hash||'#home',y:savedY,listY:warningList.scrollTop,warningId:item.id};
   const destination=task.stages?window.PhoenixQuestPages.destination(item.id):'#'+task.view;
   close();correctionOrigin={...origin,destination,same:destination===origin.hash};
   navigate(destination);
   if(!correctionOrigin.same)history.replaceState({...history.state,warningChecklistOrigin:origin},'',location.href);
   requestAnimationFrame(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{
    const view=document.getElementById(task.view),deck=view?.querySelector('.quest-progress');
    if(deck){deck.open=true;window.PhoenixProgressReview?.positionQuest(item.id);}
    installCorrectionReturn(view,origin);
    (deck||correctionButton)?.scrollIntoView({block:'start'});
   })));
  }
  function installCorrectionReturn(view,origin){
   correctionButton?.remove();if(!view)return;
   correctionButton=make('button','← Return to Warnings','warning-checklist-return');correctionButton.type='button';
   correctionButton.onclick=()=>{if(correctionOrigin?.same){correctionButton.remove();correctionButton=null;correctionOrigin=null;requestAnimationFrame(()=>requestAnimationFrame(()=>{restoreCorrectionContext();(window.PhoenixViewport||window).scrollTo(0,origin.y);openMenu?.();showList(origin);}));}else history.back();};
   (view.querySelector('.reading-panel')||view).prepend(correctionButton);
  }
  function correctionRoute(){
   const marker=history.state?.warningChecklistOrigin;
   if(marker){correctionOrigin={...marker,destination:location.hash,same:false};installCorrectionReturn(document.getElementById(location.hash.slice(1).split('/')[0]),marker);return;}
   if(correctionOrigin&&location.hash===correctionOrigin.hash&&!correctionOrigin.same){
    const origin=correctionOrigin;correctionOrigin=null;correctionButton?.remove();correctionButton=null;
    requestAnimationFrame(()=>requestAnimationFrame(()=>requestAnimationFrame(()=>{restoreCorrectionContext();(window.PhoenixViewport||window).scrollTo(0,origin.y);openMenu?.();showList(origin);})));return;
   }
   correctionButton?.remove();correctionButton=null;
  }
  window.addEventListener('phoenix:route-rendered',correctionRoute);
  const reopen=event=>{openMenu?.();showList(event.detail||{});};
  const onQuiet=()=>sequence.quiet(),visibility=()=>{if(document.hidden)onQuiet();};
  root.addEventListener('keydown',keydown);
  const wolfClose=event=>{if(opened){event.preventDefault();event.stopImmediatePropagation();close();}};
  wolf?.addEventListener('click',wolfClose,true);window.addEventListener('phoenix:warning-menu-return',reopen);window.addEventListener('phoenix:progress-committed',sync);window.addEventListener('phoenix:progress-undone',sync);window.addEventListener('phoenix:route-rendered',sync);window.addEventListener('hashchange',sync);document.addEventListener('visibilitychange',visibility);media.addEventListener('change',onQuiet);
  return {showWarnings:showList,open(){if(opened)return;opened=true;const token=++openGeneration;priorFocus=document.activeElement;root.setAttribute('role','dialog');root.setAttribute('aria-modal','true');root.setAttribute('aria-label','Guide navigation');if(wolf){wolfLabel=wolf.getAttribute('aria-label');wolf.setAttribute('aria-label','Close guide navigation');}savedY=(window.PhoenixViewport||window).scrollY;listMode=false;fan.classList.remove('warnings-takeover');warningButton.setAttribute('aria-expanded','false');searchButton.hidden=false;row.hidden=false;warningList.hidden=true;back.hidden=true;heading.querySelector('h2').textContent='Navigate';sync();if(!window.PhoenixViewport)document.body.style.top=-savedY+'px';window.PhoenixViewport?.lock();document.body.classList.add('command-open');document.querySelector('main').inert=true;document.querySelector('.guide-bar').inert=true;(cards.find(card=>card.getAttribute('aria-current')==='page')||cards[0]).focus();Promise.allSettled(wrappers.map(item=>{const image=item.querySelector('img');return image.decode?image.decode():Promise.resolve();})).then(()=>{if(opened&&token===openGeneration)sequence.open();});},close(){if(!opened)return;opened=false;openGeneration++;root.removeAttribute('role');root.removeAttribute('aria-modal');root.setAttribute('aria-label','Guide medallion');if(wolf){if(wolfLabel===null)wolf.removeAttribute('aria-label');else wolf.setAttribute('aria-label',wolfLabel);}sequence.close();fan.classList.remove('warnings-takeover');document.body.classList.remove('command-open');window.PhoenixViewport?.unlock();document.body.style.top='';document.querySelector('main').inert=false;document.querySelector('.guide-bar').inert=false;(window.PhoenixViewport||window).scrollTo(0,savedY);if(priorFocus?.isConnected)priorFocus.focus({preventScroll:true});},destroy(){this.close();effects.forEach(effect=>effect.destroy());root.removeEventListener('keydown',keydown);wolf?.removeEventListener('click',wolfClose,true);window.removeEventListener('phoenix:warning-menu-return',reopen);window.removeEventListener('phoenix:route-rendered',correctionRoute);correctionButton?.remove();window.removeEventListener('phoenix:progress-committed',sync);window.removeEventListener('phoenix:progress-undone',sync);window.removeEventListener('phoenix:route-rendered',sync);window.removeEventListener('hashchange',sync);document.removeEventListener('visibilitychange',visibility);media.removeEventListener('change',onQuiet);}};
 }
 window.PhoenixNavigationArt={entries,keyForRoute,createSequence,decorate};
})();
