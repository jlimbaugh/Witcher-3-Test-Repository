'use strict';
/** Original wolf interface art; existing atomic Undo and ordered warnings. */
window.createPhoenixMedallion=function(opts={}){
 const root=document.createElement('aside');root.className='phoenix-medallion';root.setAttribute('aria-label','Guide medallion');
 const make=(tag,text,cls)=>{const el=document.createElement(tag);if(text)el.textContent=text;if(cls)el.className=cls;return el;};
 const core=make('button',null,'medallion-core');core.type='button';core.setAttribute('aria-expanded','false');
 const sigil=make('span',null,'medallion-sigil'),wolf=make('img');wolf.src='wolf-medallion-silver.png';wolf.alt='';sigil.setAttribute('aria-hidden','true');sigil.append(wolf,make('span',null,'medallion-eyes'));const coreLabel=make('span','Navigate','medallion-label');core.append(sigil,coreLabel);
 const navToggle=make('button','Navigation','medallion-nav-toggle');navToggle.type='button';navToggle.hidden=true;navToggle.setAttribute('aria-label','Open guide navigation');navToggle.setAttribute('aria-expanded','false');
 const fan=make('nav',null,'medallion-fan');fan.hidden=true;fan.setAttribute('aria-label','Quick navigation');
 const warningBox=make('section',null,'medallion-warning');warningBox.hidden=true;
 const status=make('p',null,'medallion-status');status.setAttribute('role','status');status.setAttribute('aria-live','polite');
 const historyToggle=make('button','Warning history','medallion-history-toggle');historyToggle.type='button';historyToggle.hidden=true;historyToggle.setAttribute('aria-expanded','false');
 const historyBox=make('section',null,'medallion-history');historyBox.hidden=true;historyBox.setAttribute('aria-label','Acknowledged warnings');
 root.append(fan,warningBox,historyToggle,historyBox,status,navToggle,core);(window.PhoenixViewport?.dock||document.body).append(root);document.documentElement?.classList.add('medallion-ready');
 let navigationUI=null;
 let quickUndoActive=false;
 const quickUndo=make('button','Undo','quick-undo');quickUndo.type='button';quickUndo.hidden=true;quickUndo.setAttribute('aria-label','Undo last progress change');document.body.append(quickUndo);
 let mode='nav',fanOpen=false,queue=[],active=null,records=[],timers=[],generation=0,gesture=null,deferred=false,processing=false;
 const reduced=()=>opts.reducedMotion===true||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 const available=()=>{try{return typeof opts.onUndo==='function'&&(!opts.getUndoAvailable||!!opts.getUndoAvailable());}catch{return false;}};
 const valid=w=>{try{return !w.isValid||w.isValid();}catch{return false;}};
 function setMode(next){generation++;mode=next;root.dataset.mode=next;coreLabel.textContent=next==='undo'?'Undo':next==='warning'?'Warning':'Navigate';navToggle.hidden=next==='nav';navToggle.setAttribute('aria-expanded',String(fanOpen));core.setAttribute('aria-label',next==='undo'?'Undo last progress change':next==='warning'?'Read guide warning':'Guide navigation');core.setAttribute('aria-expanded',String(next==='nav'?fanOpen:next==='warning'&&!warningBox.hidden));}
 function clearTimers(){timers.forEach(window.clearTimeout);timers=[];root.classList.remove('undo-fading');}
 function closeFan(process=true){fanOpen=false;fan.hidden=true;root.classList.remove('fan-open');navigationUI?.close();core.setAttribute('aria-expanded','false');navToggle.setAttribute('aria-expanded','false');if(process){if(deferred){deferred=false;signalUndoAvailable();}else processQueue();}}
 function openFan(secondary=false){if(mode!=='nav'&&!secondary)return;fanOpen=true;fan.hidden=false;root.classList.add('fan-open');navToggle.setAttribute('aria-expanded','true');if(mode==='nav')core.setAttribute('aria-expanded','true');if(navigationUI)navigationUI.open();else fan.querySelector('button')?.focus();}
 function renderWarning(){warningBox.hidden=true;warningBox.replaceChildren();setMode('warning');}
 function processQueue(){
  if(quickUndoActive||fanOpen||processing)return;
  if(active&&!valid(active))active=null;
  queue=queue.filter(valid);
  if(!active)active=queue.shift()||null;
  if(active)renderWarning();else{warningBox.hidden=true;warningBox.replaceChildren();setMode('nav');}
 }
 function finishUndo(){clearTimers();quickUndoActive=false;quickUndo.hidden=true;processQueue();}
 function signalUndoAvailable(){if(!available())return;if(fanOpen){deferred=true;return;}clearTimers();quickUndoActive=true;quickUndo.hidden=false;quickUndo.classList.remove('fading');void quickUndo.offsetWidth;quickUndo.classList.add('fading');status.textContent='Progress updated. Quick Undo is available.';timers.push(window.setTimeout(()=>{status.textContent='Quick Undo closed. Undo remains in Story & correction controls.';finishUndo();},3000));}
 quickUndo.onclick=()=>{if(!quickUndoActive)return;clearTimers();quickUndoActive=false;quickUndo.hidden=true;processing=true;let ok=false;try{ok=available()&&opts.onUndo()!==false;}catch{}finally{processing=false;}status.textContent=ok?'Entire progress update undone.':'Undo could not be completed. Review Story & correction controls.';processQueue();};
 function enqueueWarning(w){if(!w||typeof w.text!=='string')return;queue.push({...w});processQueue();}
 function snapshot(){return records.map(r=>({...r}));}
 function acknowledgeWarning(){
  const pending=[active,...queue].filter(w=>w&&valid(w));active=null;queue=[];
  processing=true;
  try{for(const item of pending){records.push({id:item.id||'warning-'+Date.now(),text:item.text,href:item.href||null,at:Date.now()});try{item.onAcknowledge?.();}catch{}}
   if(pending.length)opts.onWarningHistory?.(snapshot());
  }catch{status.textContent='Warning acknowledgement could not be saved.';root.classList.add('has-error');}
  finally{processing=false;}
  historyToggle.hidden=!records.length;processQueue();
 }
 function closeHistory(focus=false){historyBox.hidden=true;historyToggle.setAttribute('aria-expanded','false');if(focus)(window.PhoenixViewport||document.body.classList.contains('reading-quest')||document.body.classList.contains('reading-hub')?core:historyToggle).focus();}
 function showHistory(){closeHistory();acknowledgeWarning();openFan(true);navigationUI?.showWarnings?.();}
 function seedHistory(list){records=Array.isArray(list)?list.filter(r=>r&&typeof r.text==='string').map(r=>({id:String(r.id||''),text:r.text,href:typeof r.href==='string'&&r.href.startsWith('#')?r.href:null,at:Number(r.at)||0})):[];historyToggle.hidden=!records.length;}
 function activate(){
  if(gesture&&gesture.generation!==generation){gesture=null;return;}gesture=null;
  if(mode==='warning'){if(fanOpen)closeFan(false);acknowledgeWarning();openFan(true);navigationUI?.showWarnings?.();return;}
  if(fanOpen)closeFan();else openFan();
 }
 core.addEventListener('pointerdown',()=>{gesture={generation,type:'pointer'};});
 core.addEventListener('pointercancel',()=>{gesture=null;});
 core.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){if(e.repeat){e.preventDefault();return;}gesture={generation,type:'keyboard'};}});
 core.addEventListener('click',activate);
 navToggle.onclick=()=>{if(fanOpen)closeFan();else openFan(true);};
 historyToggle.onclick=()=>historyBox.hidden?showHistory():closeHistory(true);
 (opts.navigationCards||[['Home','#home','white-orchard-scene.webp'],['Quests','#whiteorchard-tree','gwent-r15/ivo.webp'],['Regions','#regions','gwent-r15/cavalry.webp'],['Constellation','#whiteorchard-constellation','gwent-r15/isbel.webp']]).forEach(([label,hash,art],i)=>{const b=make('button',null,'medallion-card');b.type='button';b.setAttribute('aria-label',label);const image=make('img');image.src=art;image.alt='';b.append(image,make('small','0'+(i+1)),make('span',label));b.onclick=()=>{closeFan();opts.onNavigate?.(hash);};fan.append(b);});
 if(opts.decorateNavigation)navigationUI=opts.decorateNavigation({root,fan,open:()=>openFan(true),close:()=>closeFan(),showHistory,historyToggle,acknowledgeWarnings:acknowledgeWarning,navigate:opts.onNavigate});
 const outside=e=>{if(!root.contains(e.target)){if(fanOpen)closeFan();closeHistory();}};
 const key=e=>{if(e.key==='Escape'){if(!historyBox.hidden)closeHistory(true);else if(fanOpen){closeFan();(navToggle.hidden?core:navToggle).focus();}}};
 document.addEventListener('click',outside);document.addEventListener('keydown',key);
 setMode('nav');seedHistory(opts.history||[]);
 return {element:root,quickUndo,isQuickUndoVisible:()=>quickUndoActive,signalUndoAvailable,enqueueWarning,seedHistory,showHistory,acknowledgeWarning,getHistory:snapshot,getMode:()=>mode,getActiveWarning:()=>active,getQueueLength:()=>queue.length,isFanOpen:()=>fanOpen,
  removeWarnings(predicate){const before=records.length;records=records.filter(r=>!predicate(r));queue=queue.filter(w=>!predicate(w));if(active&&predicate(active))active=null;if(before!==records.length){historyToggle.hidden=!records.length;if(!records.length)closeHistory();else if(!historyBox.hidden)showHistory();opts.onWarningHistory?.(snapshot());}processQueue();},
  reconcileWarnings(){if(quickUndoActive&&!available())finishUndo();else processQueue();},
  dismissQuickUndo(){status.textContent='Entire progress update undone.';finishUndo();},
  destroy(){document.documentElement?.classList.remove('medallion-ready');clearTimers();document.removeEventListener('click',outside);document.removeEventListener('keydown',key);navigationUI?.destroy?.();quickUndo.remove();root.remove();}};
};
