'use strict';

window.createPhoenixDeckJump=function(names,current,onJump){
 const count=names.length;
 const frame=document.createElement('nav');
 frame.className='deck-jump';
 frame.setAttribute('aria-label','Jump to a numbered card');
 const rail=document.createElement('div');
 rail.className='deck-jump-rail';
 frame.append(rail);
 const buttons=[];
 for(let copy=0;copy<3;copy++){
  for(const [index,name] of names.entries()){
   const button=document.createElement('button');
   button.type='button';
   button.textContent=String(index+1);
   button.setAttribute('aria-label',(index+1)+'. '+name);
   if(copy!==1){button.tabIndex=-1;button.setAttribute('aria-hidden','true');}
   button.onclick=()=>onJump(index);
   rail.append(button);
   buttons.push(button);
  }
 }
 function center(index){
  const button=buttons[count+index];
  rail.scrollLeft=button.offsetLeft+(button.offsetWidth-rail.clientWidth)/2;
 }
 let active=current;
 function update(index){
  for(const copy of [0,1,2]){
   buttons[copy*count+active].removeAttribute('aria-current');
   buttons[copy*count+index].setAttribute('aria-current','true');
  }
  active=index;
 }
 let settle;
 rail.addEventListener('scroll',()=>{
  clearTimeout(settle);
  settle=setTimeout(()=>{
   if(!rail.clientWidth)return;
   const span=buttons[count].offsetLeft-buttons[0].offsetLeft;
   if(!span)return;
   const middle=rail.scrollLeft+rail.clientWidth/2;
   const start=buttons[count].offsetLeft;
   if(middle<start)rail.scrollLeft+=span;
   else if(middle>=start+span)rail.scrollLeft-=span;
  },150);
 },{passive:true});
 update(current);
 requestAnimationFrame(()=>center(current));
 return {frame,update,center};
};
