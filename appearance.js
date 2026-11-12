'use strict';
(() => {
 const key='phoenix-appearance-v1',root=document.documentElement,media=window.matchMedia('(prefers-color-scheme: dark)');
 let saved={};try{saved=JSON.parse(localStorage.getItem(key)||'{}')||{};}catch{}
 let manual=['day','night'].includes(saved.theme),theme=manual?saved.theme:media.matches?'night':'day';
 let font=['alegreya','fell'].includes(saved.font)?saved.font:'alegreya';
 function paint(){root.dataset.theme=theme;root.style.setProperty('--body',font==='fell'?'Fell,Georgia,serif':'Alegreya,Georgia,serif');const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.content=theme==='night'?'#141311':'#d5c4a0';const button=document.getElementById('theme-toggle');if(button){button.textContent=theme==='night'?'Day':'Night';button.setAttribute('aria-label','Switch to '+(theme==='night'?'day':'night')+' theme');}const select=document.getElementById('reading-font');if(select)select.value=font;}
 function save(){try{localStorage.setItem(key,JSON.stringify({...(manual?{theme}:{}),font}));}catch{}}
 paint();media.addEventListener('change',()=>{if(!manual){theme=media.matches?'night':'day';paint();}});
 document.addEventListener('DOMContentLoaded',()=>{paint();document.getElementById('theme-toggle').addEventListener('click',()=>{theme=theme==='night'?'day':'night';manual=true;paint();save();});document.getElementById('reading-font').addEventListener('change',event=>{font=event.target.value;paint();save();});});
})();
