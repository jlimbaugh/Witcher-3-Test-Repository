'use strict';
/** Temporary CSS medallion art. Navigation, atomic Undo and ordered warnings. */
window.createPhoenixMedallion=function(opts={}){
 const root=document.createElement('aside');root.className='phoenix-medallion';root.setAttribute('aria-label','Guide medallion');
 const make=(tag,text,cls)=>{const el=document.createElement(tag);if(text)el.textContent=text;if(cls)el.className=cls;return el;};
 const core=make('button','Navigation','medallion-core');core.type='button';core.setAttribute('aria-expanded','false');
 const fan=make('nav',null,'medallion-fan');fan.hidden=true;fan.setAttribute('aria-label','Quick navigation');
 const warningBox=make('section',null,'medallion-warning');warningBox.hidden=true;
 const status=make('p',null,'medallion-status');status.setAttribute('role','status');status.setAttribute('aria-live','polite');
 const historyToggle=make('button','Warning history','medallion-history-toggle');historyToggle.type='button';historyToggle.hidden=true;historyToggle.setAttribute('aria-expanded','false');
 const historyBox=make('section',null,'medallion-history');historyBox.hidden=true;historyBox.setAttribute('aria-label','Acknowledged warnings');
 root.append(fan,warningBox,historyToggle,historyBox,status,core);document.body.append(root);
 let mode='nav',fanOpen=false,queue=[],active=null,records=[],timers=[],generation=0,gesture=null,deferred=false,processing=false;
 const reduced=()=>opts.reducedMotion===true||window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
 const available=()=>{try{return typeof opts.onUndo==='function'&&(!opts.getUndoAvailable||!!opts.getUndoAvailable());}catch{return false;}};
 const valid=w=>{try{return !w.isValid||w.isValid();}catch{return false;}};
 function setMode(next){generation++;mode=next;root.dataset.mode=next;core.textContent=next==='undo'?'Undo':next==='warning'?'Warning':'Navigation';core.setAttribute('aria-label',next==='undo'?'Undo last progress change':next==='warning'?'Read guide warning':'Guide navigation');core.setAttribute('aria-expanded',String(next==='nav'?fanOpen:next==='warning'&&!warningBox.hidden));}
 function clearTimers(){timers.forEach(window.clearTimeout);timers=[];root.classList.remove('undo-fading');}
 function closeFan(process=true){fanOpen=false;fan.hidden=true;core.setAttribute('aria-expanded','false');if(process){if(deferred){deferred=false;signalUndoAvailable();}else processQueue();}}
 function openFan(){if(mode!=='nav')return;fanOpen=true;fan.hidden=false;core.setAttribute('aria-expanded','true');fan.querySelector('button')?.focus();}
 function renderWarning(){warningBox.replaceChildren();warningBox.hidden=false;const p=make('p',active.text);p.setAttribute('role','status');warningBox.append(p);if(active.href){const a=make('a','Open related guide');a.href=active.href;warningBox.append(a);}const ack=make('button','Acknowledge');ack.type='button';ack.onclick=acknowledgeWarning;warningBox.append(ack);setMode('warning');}
 function processQueue(){
  if(mode==='undo'||fanOpen||processing)return;
  if(active&&!valid(active))active=null;
  queue=queue.filter(valid);
  if(!active)active=queue.shift()||null;
  if(active)renderWarning();else{warningBox.hidden=true;warningBox.replaceChildren();setMode('nav');}
 }
 function finishUndo(){clearTimers();setMode('nav');processQueue();}
 function signalUndoAvailable(){if(!available())return;if(fanOpen){deferred=true;return;}clearTimers();warningBox.hidden=true;setMode('undo');root.classList.remove('has-error');status.textContent='Progress updated. Quick Undo is available.';timers.push(window.setTimeout(()=>{if(reduced()){finishUndo();return;}root.classList.add('undo-fading');timers.push(window.setTimeout(finishUndo,900));},3000));}
 function enqueueWarning(w){if(!w||typeof w.text!=='string')return;queue.push({...w});processQueue();}
 function snapshot(){return records.map(r=>({...r}));}
 function acknowledgeWarning(){if(mode!=='warning'||!active)return;const item=active;active=null;records.push({id:item.id||'warning-'+Date.now(),text:item.text,href:item.href||null,at:Date.now()});historyToggle.hidden=false;processing=true;try{item.onAcknowledge?.();}catch{}try{opts.onWarningHistory?.(snapshot());}catch{status.textContent='Warning acknowledged for this visit; its history could not be saved.';root.classList.add('has-error');}finally{processing=false;}if(!historyBox.hidden)showHistory();processQueue();core.focus();}
 function closeHistory(focus=false){historyBox.hidden=true;historyToggle.setAttribute('aria-expanded','false');if(focus)historyToggle.focus();}
 function showHistory(){if(!records.length)return;historyBox.replaceChildren(make('h2','Acknowledged warnings'));[...records].reverse().forEach(r=>{const row=make('div');row.append(make('p',r.text));if(r.href){const a=make('a','Open related guide');a.href=r.href;row.append(a);}historyBox.append(row);});const close=make('button','Close history');close.type='button';close.onclick=()=>closeHistory(true);historyBox.append(close);historyBox.hidden=false;historyToggle.setAttribute('aria-expanded','true');close.focus();}
 function seedHistory(list){records=Array.isArray(list)?list.filter(r=>r&&typeof r.text==='string').map(r=>({id:String(r.id||''),text:r.text,href:typeof r.href==='string'&&r.href.startsWith('#')?r.href:null,at:Number(r.at)||0})):[];historyToggle.hidden=!records.length;}
 function activate(){
  if(gesture&&gesture.generation!==generation){gesture=null;return;}gesture=null;
  if(mode==='undo'){clearTimers();processing=true;let ok=false;try{ok=available()&&opts.onUndo()!==false;}catch{}finally{processing=false;}if(!ok)root.classList.add('has-error');status.textContent=ok?'Entire progress update undone.':'Undo could not be completed. Review Story & correction controls.';finishUndo();return;}
  if(mode==='warning'){warningBox.hidden=false;core.setAttribute('aria-expanded','true');warningBox.querySelector('button')?.focus();return;}
  if(fanOpen)closeFan();else openFan();
 }
 core.addEventListener('pointerdown',()=>{gesture={generation,type:'pointer'};});
 core.addEventListener('pointercancel',()=>{gesture=null;});
 core.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){if(e.repeat){e.preventDefault();return;}gesture={generation,type:'keyboard'};}});
 core.addEventListener('click',activate);
 historyToggle.onclick=()=>historyBox.hidden?showHistory():closeHistory(true);
 [['Home','#home'],['Quests','#whiteorchard-tree'],['Regions','#regions'],['Constellation','#whiteorchard-constellation']].forEach(([label,hash])=>{const b=make('button',label);b.type='button';b.onclick=()=>{closeFan();opts.onNavigate?.(hash);};fan.append(b);});
 const outside=e=>{if(!root.contains(e.target)){if(fanOpen)closeFan();closeHistory();}};
 const key=e=>{if(e.key==='Escape'){if(!historyBox.hidden)closeHistory(true);else if(fanOpen){closeFan();core.focus();}}};
 document.addEventListener('click',outside);document.addEventListener('keydown',key);
 setMode('nav');seedHistory(opts.history||[]);
 return {element:root,signalUndoAvailable,enqueueWarning,seedHistory,showHistory,acknowledgeWarning,getHistory:snapshot,getMode:()=>mode,getActiveWarning:()=>active,getQueueLength:()=>queue.length,isFanOpen:()=>fanOpen,
  reconcileWarnings(){if(mode==='undo'&&!available())finishUndo();else processQueue();},
  dismissQuickUndo(){if(mode==='undo')finishUndo();},
  destroy(){clearTimers();document.removeEventListener('click',outside);document.removeEventListener('keydown',key);root.remove();}};
};
