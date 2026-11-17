'use strict';
/* Read-only projection of canonical White Orchard risks; no new progress owner. */
(()=>{
 function build({state,engine,tasks,hash='#home'}){
  const departure=window.PhoenixDeparture.build({state,engine,tasks});
  const [view,stage]=hash.replace(/^#/,'').split('/');
  const task=Object.keys(tasks).find(id=>tasks[id].view===view);
  const items=departure.ordered.filter(item=>!item.completed&&!item.failed).map(item=>{
   const detail=window.PhoenixWarningCatalog.get(item.id,tasks);
   const final=item.active&&(item.id==='poi-4'?task==='q-beast'&&stage==='trophy':window.PhoenixDeparture.atStep(task,stage)&&!departure.departed);
   const verify=item.unknown?(item.kind==='cutoff-unknown'?'Check whether the skull is in your inventory or still at the opening campsite. Recorded story progress alone does not prove it was missed.':item.id==='poi-4'?'Check your inventory for the crystal skull, or revisit the opening campsite.':'Check this quest’s status and remaining objectives in your in-game journal.'):'';
   return {...item,final,verify,cutoff:detail.cutoff,consequence:detail.consequence,art:item.id==='poi-4'?'art-white-orchard-illustrated/poi-4.webp':'art-r13/'+item.id+'-card.webp'};
  });
  return {items,count:items.length,finalCount:items.filter(item=>item.final).length,final:items.some(item=>item.final)};
 }
 window.PhoenixWarningCenterModel={build};
 window.createPhoenixWarningCenter=({state,engine,tasks})=>({get:()=>build({state,engine,tasks,hash:location.hash||'#home'})});
})();
