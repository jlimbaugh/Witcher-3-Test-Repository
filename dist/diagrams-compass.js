'use strict';
/* One logical button per matching letter; filtering never duplicates identity. */
(()=>{
 const wrap=(value,count)=>((value%count)+count)%count;
 const nearestPosition=(position,index,count)=>index+Math.round((position-index)/count)*count;
 function create({strip,buttons,onPick}){
  const nodes=[...buttons.values()],motion=new window.PhoenixDeckMotion.DeckMotion();let active=nodes,fixedPosition=0;
  const canBrowse=()=>active.length>1&&active.length*62>strip.clientWidth;
  function membership(){const next=nodes.filter(button=>!button.disabled);nodes.forEach(button=>button.hidden=button.disabled);if(next.length!==active.length||next.some((button,i)=>button!==active[i])){active=next;motion.stop();motion.position=0;fixedPosition=0;}}
  function paint(){const movable=canBrowse();strip.dataset.canBrowse=String(movable);strip.dataset.letterCount=String(active.length);if(!movable){motion.stop();motion.position=active.length>1?fixedPosition:0;}active.forEach((button,index)=>{const offset=active.length===1?0:(wrap(index-motion.position+active.length/2,active.length)-active.length/2)*62;button.style.transform='translateX('+offset+'px)';});}
  const drag=window.PhoenixDeckMotion.bindDrag(strip,motion,{paint,save(){},pixelsPerCard:()=>62,isVisible:()=>strip.clientWidth>0});
  function restore(value){motion.position=Number.isFinite(value)?value/62:0;fixedPosition=motion.position;drag.stop();}
  function center(button){const index=active.indexOf(button);if(index<0){drag.stop();return;}motion.position=nearestPosition(motion.position,index,active.length);fixedPosition=motion.position;drag.stop();}
  function sync(letter,{center:follow=true}={}){membership();for(const [l,button]of buttons){const current=l===letter&&!button.disabled;button.classList.toggle('is-current',current);if(current)button.setAttribute('aria-current','true');else button.removeAttribute('aria-current');}if(follow)center(buttons.get(letter));else paint();}
  nodes.forEach(button=>button.onclick=()=>{if(!button.disabled&&!button.hidden)onPick(button.dataset.letter);});
  strip.addEventListener('wheel',event=>{event.preventDefault();if(canBrowse())motion.position+=(event.deltaX||event.deltaY||0)/62;drag.stop();},{passive:false});
  strip.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;membership();const i=active.indexOf(document.activeElement);if(i<0)return;event.preventDefault();const next=event.key==='Home'?0:event.key==='End'?active.length-1:wrap(i+(event.key==='ArrowRight'?1:-1),active.length);active[next].focus({preventScroll:true});center(active[next]);});
  paint();return {sync,restore,position:()=>motion.position*62,letters:()=>active.map(button=>button.dataset.letter).join(''),stop:()=>drag.stop()};
 }
 window.PhoenixDiagramCompass={wrap,nearestPosition,create};
})();
