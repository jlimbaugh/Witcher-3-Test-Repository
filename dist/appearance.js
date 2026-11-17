'use strict';
(function(root){
 function preference(record={}){return {font:['alegreya','fell','fondamento'].includes(record?.font)?record.font:'fondamento',textSize:100,...(['day','night'].includes(record?.theme)?{theme:record.theme}:{})};}
 const model={preference};if(typeof module!=='undefined'&&module.exports){module.exports=model;return;}root.PhoenixAppearanceModel=model;
 const key='phoenix-appearance-v1',doc=root.document,html=doc.documentElement,media=root.matchMedia('(prefers-color-scheme: dark)');
 let saved={};try{saved=preference(JSON.parse(root.localStorage.getItem(key)||'{}'));}catch{saved=preference();}
 let manual=['day','night'].includes(saved.theme),theme=manual?saved.theme:media.matches?'night':'day',font=saved.font,textSize=100;
 function paint(){html.dataset.theme=theme;html.dataset.textSize=String(textSize);html.style.setProperty('--guide-type-scale',String(textSize/100));html.style.setProperty('--body',font==='fell'?'Fell,Georgia,serif':font==='fondamento'?'Fondamento,Fell,Georgia,serif':'Alegreya,Georgia,serif');const meta=doc.querySelector('meta[name="theme-color"]');if(meta)meta.content=theme==='night'?'#141311':'#d5c4a0';const button=doc.getElementById('theme-toggle');if(button){button.textContent=theme==='night'?'Day':'Night';button.setAttribute('aria-label','Switch to '+(theme==='night'?'day':'night')+' theme');}const select=doc.getElementById('reading-font');if(select)select.value=font;}
 function save(){try{root.localStorage.setItem(key,JSON.stringify({...(manual?{theme}:{}),font}));}catch{}}
 paint();media.addEventListener('change',()=>{if(!manual){theme=media.matches?'night':'day';paint();}});
 doc.addEventListener('DOMContentLoaded',()=>{
  const select=doc.getElementById('reading-font'),button=doc.getElementById('theme-toggle'),host=select?.parentElement;if(!host||!button)return;
  const details=doc.createElement('details');details.className='appearance-settings';const summary=doc.createElement('summary');summary.textContent='Appearance';const panel=doc.createElement('div');panel.className='appearance-settings-panel';const controls=doc.createElement('div');controls.className='appearance-font-controls';const label=doc.createElement('label');label.htmlFor=select.id;label.textContent='Reading font';details.append(summary,panel);host.append(details);controls.append(label,select,button);panel.append(controls);host.classList.add('has-appearance-settings');
  button.addEventListener('click',()=>{theme=theme==='night'?'day':'night';manual=true;paint();save();});select.addEventListener('change',event=>{font=event.target.value;paint();save();});paint();
  doc.addEventListener('pointerdown',event=>{if(details.open&&!details.contains(event.target))details.open=false;});details.addEventListener('keydown',event=>{if(event.key==='Escape'){details.open=false;summary.focus();event.stopPropagation();}});
 });
})(typeof window==='undefined'?null:window);
