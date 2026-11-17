'use strict';
/* Continuous coordinates: wrapping changes item lookup, never the travel position. */
(function(root){
 const wrap=(value,count)=>((value%count)+count)%count;
 class DeckMotion{
  constructor(position=0){this.position=position;this.velocity=0;}
  stop(){this.velocity=0;}
  release(velocity,reduced){this.velocity=Math.max(-.025,Math.min(.025,velocity));this.decay=reduced?.025:.0038;}
  advance(milliseconds){const dt=Math.min(64,Math.max(0,milliseconds)),decay=this.decay||.0038,factor=Math.exp(-decay*dt);this.position+=this.velocity*(1-factor)/decay;this.velocity*=factor;if(Math.abs(this.velocity)<.000025)this.stop();return this.position;}
 }
 // Enclosed decks own horizontal movement; page scrolling lives in the side gutters.
 function bindDrag(stage,motion,{paint,save,isVisible=()=>true,pixelsPerCard=()=>180}){
  let raf=0,lastTime=0,gesture=null,suppressClick=false;
  const reduced=root.matchMedia('(prefers-reduced-motion: reduce)');
  function stop(){if(raf)root.cancelAnimationFrame(raf);raf=0;motion.stop();paint();}
  function tick(now){if(!isVisible()){stop();return;}motion.advance(now-lastTime);lastTime=now;paint();if(motion.velocity)raf=root.requestAnimationFrame(tick);else{raf=0;save();paint();}}
  stage.addEventListener('pointerdown',e=>{if(!e.isPrimary||e.button!==0)return;const spinning=!!motion.velocity;stop();suppressClick=spinning;gesture={id:e.pointerId,x:e.clientX,y:e.clientY,lastX:e.clientX,time:e.timeStamp,velocity:0,drag:false,startPosition:motion.position};});
  stage.addEventListener('pointermove',e=>{if(!gesture||e.pointerId!==gesture.id)return;const g=gesture,dx=e.clientX-g.x,dy=e.clientY-g.y;if(!g.drag){if(Math.hypot(dx,dy)>=8)suppressClick=true;const boxed=stage.classList?.contains('phoenix-horizontal-box');if(!boxed&&Math.abs(dy)>=16&&Math.abs(dy)>Math.abs(dx)*1.3){gesture=null;save();return;}if(Math.abs(dx)<8||!boxed&&Math.abs(dx)<=Math.abs(dy)*1.3)return;g.drag=true;suppressClick=true;stage.setPointerCapture(e.pointerId);}
   const dt=Math.max(1,e.timeStamp-g.time),change=-(e.clientX-g.lastX)/pixelsPerCard();motion.position+=change;g.velocity=g.velocity*.25+(change/dt)*.75;g.lastX=e.clientX;g.time=e.timeStamp;paint();});
  function release(e,cancelled){if(!gesture||gesture.id!==e.pointerId)return;const g=gesture;gesture=null;if(stage.hasPointerCapture(e.pointerId))stage.releasePointerCapture(e.pointerId);if(g.drag&&cancelled){motion.position=g.startPosition;paint();}if(g.drag&&!cancelled){motion.release(e.timeStamp-g.time>90?0:g.velocity,reduced.matches);if(motion.velocity){lastTime=root.performance.now();raf=root.requestAnimationFrame(tick);}}save();}
  stage.addEventListener('pointerup',e=>release(e,false));stage.addEventListener('pointercancel',e=>release(e,true));
  stage.addEventListener('click',e=>{if(suppressClick){e.preventDefault();e.stopImmediatePropagation();suppressClick=false;}},{capture:true});
  stage.addEventListener('dragstart',e=>e.preventDefault());
  reduced.addEventListener('change',()=>{if(reduced.matches)stop();});
  return {stop};
 }
 const api={wrap,DeckMotion,bindDrag};if(typeof module!=='undefined')module.exports=api;else root.PhoenixDeckMotion=api;
})(typeof window==='undefined'?null:window);
