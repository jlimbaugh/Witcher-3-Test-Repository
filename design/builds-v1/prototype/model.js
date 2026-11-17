(function(root){
 'use strict';
 // Layout and state demonstration only. Every performance value below is synthetic.
 const slots=['steel','silver','chest','gloves','trousers','boots'];
 const labels={steel:'Steel sword',silver:'Silver sword',chest:'Chest armor',gloves:'Gauntlets',trousers:'Trousers',boots:'Boots'};
 const tiers=['Basic','Enhanced','Superior'];
 const clone=x=>JSON.parse(JSON.stringify(x));
 function initial(){return {name:'Feline duelist',gear:Object.fromEntries(slots.map(s=>[s,{school:'Feline',tier:'Enhanced',upgrade:'A'}])),conditions:{quen:false,prepared:false}};}
 function score(build){let attack=1000,armor=200;for(const [slot,g] of Object.entries(build.gear)){const rank=tiers.indexOf(g.tier)+1;attack+=rank*10+(g.upgrade==='B'?20:0);if(!['steel','silver'].includes(slot))armor+=rank*5;}
  return {attack,armor,sign:20+(build.conditions.prepared?10:0),toxicity:build.conditions.prepared?25:0};}
 function propose(build,slot,change){if(!slots.includes(slot))throw Error('Unknown gear slot');
  if(change.school&&!['Feline','Griffin'].includes(change.school))throw Error('Unknown demo set');
  if(change.tier&&!tiers.includes(change.tier))throw Error('Unknown demo tier');
  if(change.upgrade&&!['A','B'].includes(change.upgrade))throw Error('Unknown demo upgrade');
  const next=clone(build);next.gear[slot]={...next.gear[slot],...change};return next;}
 function wholeTier(build,tier){if(!tiers.includes(tier))throw Error('Unknown demo tier');const next=clone(build);for(const s of slots)next.gear[s].tier=tier;return next;}
 const api={slots,labels,tiers,clone,initial,score,propose,wholeTier};
 if(typeof module!=='undefined')module.exports=api;else root.PhoenixBuildDemo=api;
})(typeof window!=='undefined'?window:null);
