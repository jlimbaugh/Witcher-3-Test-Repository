'use strict';

window.createPhoenixDeckJump=function(names,current,onJump,{selectOnSettle=false}={}){
 const count=names.length, copies=5, middleCopy=2;
 const frame=document.createElement('nav');
 frame.className='deck-jump';
 frame.setAttribute('aria-label','Jump to a numbered card');
 const rail=document.createElement('div');
 rail.className='deck-jump-rail';
 frame.append(rail);
 const buttons=[];
 for(let copy=0;copy<copies;copy++){
  for(const [index,name] of names.entries()){
   const button=document.createElement('button');
   button.type='button';
   button.textContent=String(index+1);
   button.setAttribute('aria-label',(index+1)+'. '+name);
   if(copy!==middleCopy){button.tabIndex=-1;button.setAttribute('aria-hidden','true');}
   button.onclick=()=>{clearTimeout(settle);onJump(index);};
   rail.append(button);
   buttons.push(button);
  }
 }
 function center(index){
  const button=buttons[middleCopy*count+index];
  rail.scrollLeft=button.offsetLeft+(button.offsetWidth-rail.clientWidth)/2;
 }
 let active=current;
 function update(index){
  for(let copy=0;copy<copies;copy++){
   buttons[copy*count+active].removeAttribute('aria-current');
   buttons[copy*count+index].setAttribute('aria-current','true');
  }
  active=index;
 }
 let settle;
 function normalize(){
  const width=rail.clientWidth;
  const span=buttons[count]?.offsetLeft-buttons[0]?.offsetLeft;
  if(!rail.isConnected||!width||!span)return;
  const midpoint=rail.scrollLeft+width/2,start=buttons[middleCopy*count].offsetLeft;
  if(selectOnSettle){
   let nearest=buttons[0],distance=Infinity;
   for(const button of buttons){
    const delta=Math.abs(button.offsetLeft+button.offsetWidth/2-midpoint);
    if(delta<distance){nearest=button;distance=delta;}
   }
   const index=buttons.indexOf(nearest)%count;
   if(index!==active){onJump(index);return;}
  }
  const offset=((midpoint-start)%span+span)%span;
  const next=start+offset-width/2;
  if(Math.abs(next-rail.scrollLeft)>1)rail.scrollLeft=next;
 }
 rail.addEventListener('scroll',()=>{
  clearTimeout(settle);
  settle=setTimeout(normalize,150);
 },{passive:true});
 rail.addEventListener('scrollend',()=>{clearTimeout(settle);normalize();});
 update(current);
 requestAnimationFrame(()=>center(current));
 return {frame,update,center};
};
