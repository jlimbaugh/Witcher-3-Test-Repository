'use strict';
/* Explicit horizontal hit areas. Page scrolling remains outside these boxes. */
(()=>{
 const custom='.card-orbit,.main-region-orbit,.command-deck,.quest-selector .deck,.diagram-letter-strip';
 const native='.quest-hub-rail,.diagram-rail,.diagram-cluster-rail,.objective-rail,.reference-rail,.home-shortcuts,.stage-ribbon,.scroll-index';
 function nearestCard(cards,scrollLeft){if(!cards.length)return null;const first=cards[0].offsetLeft;return cards.reduce((best,card)=>Math.abs(card.offsetLeft-first-scrollLeft)<Math.abs(best.offsetLeft-first-scrollLeft)?card:best,cards[0]);}
 function outerHeight(cardHeight,paddingTop,paddingBottom,chrome){return Math.ceil(Math.max(0,cardHeight)+Math.max(0,paddingTop)+Math.max(0,paddingBottom)+Math.max(0,chrome));}
 function swipeDirection(dx,dy,boxed){return Math.abs(dx)>40&&(boxed||Math.abs(dx)>Math.abs(dy)*1.3)?(dx<0?1:-1):0;}
 window.PhoenixSwipeBoxModel={nearestCard,outerHeight,swipeDirection};
 window.createPhoenixSwipeBoxes=function(){const bound=new WeakSet(),listeners=[],observers=[];let pending=0,alive=true;
  function fitObjective(rail){if(!rail.clientWidth)return;const card=nearestCard([...rail.querySelectorAll(':scope>.objective-card')],rail.scrollLeft);if(!card)return;const style=getComputedStyle(rail),height=outerHeight(card.offsetHeight,parseFloat(style.paddingTop)||0,parseFloat(style.paddingBottom)||0,rail.offsetHeight-rail.clientHeight);if(Math.abs(rail.offsetHeight-height)>1)rail.style.height=height+'px';}
  function fitDeck(rail){const card=[...rail.querySelectorAll('.desk-card,.main-region-card,.medallion-card')].find(node=>node.offsetHeight>0);if(!card)return;const ring=rail.querySelector('.card-ring'),top=parseFloat(getComputedStyle(ring||card).top)||0;const height=Math.ceil(card.offsetHeight+Math.max(0,top)+12);if(Math.abs(rail.offsetHeight-height)>1)rail.style.height=height+'px';}
  function enhance(){pending=0;if(!alive)return;document.querySelectorAll(custom+','+native).forEach(rail=>{if(bound.has(rail))return;bound.add(rail);rail.classList.add('phoenix-horizontal-box');rail.dataset.swipeEngine=rail.matches('.diagram-letter-strip')?'compass':rail.matches(custom)?'custom':'native';if(rail.matches('.objective-rail')){const fit=()=>fitObjective(rail);rail.addEventListener('scroll',fit,{passive:true});listeners.push([rail,'scroll',fit]);if(typeof ResizeObserver!=='undefined'){const observer=new ResizeObserver(fit);observer.observe(rail);rail.querySelectorAll(':scope>.objective-card').forEach(card=>observer.observe(card));observers.push(observer);}fit();}else if(rail.dataset.swipeEngine==='custom'){const fit=()=>fitDeck(rail);if(typeof ResizeObserver!=='undefined'){const observer=new ResizeObserver(fit);const card=rail.querySelector('.desk-card,.main-region-card,.medallion-card');if(card)observer.observe(card);observer.observe(rail);observers.push(observer);}fit();}});}
  const queue=()=>{if(alive&&!pending)pending=requestAnimationFrame(enhance);};
  const observer=new MutationObserver(records=>{if(records.some(record=>[...record.addedNodes].some(node=>node.nodeType===1&&(node.matches(custom+','+native)||node.querySelector(custom+','+native)))))queue();});observer.observe(document.body,{childList:true,subtree:true});
  for(const event of ['phoenix:route-rendered','phoenix:progress-committed','phoenix:progress-undone'])window.addEventListener(event,queue);enhance();
  return {enhance,destroy(){alive=false;observer.disconnect();observers.forEach(o=>o.disconnect());listeners.forEach(([node,event,handler])=>node.removeEventListener(event,handler));if(pending)cancelAnimationFrame(pending);for(const event of ['phoenix:route-rendered','phoenix:progress-committed','phoenix:progress-undone'])window.removeEventListener(event,queue);}};
 };
})();
