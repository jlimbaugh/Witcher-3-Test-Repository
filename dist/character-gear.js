'use strict';
(function(root){
 // First verified identity catalogue only. No prototype values or unverified stat formulas.
 const slots={steel:'Steel sword',silver:'Silver sword',chest:'Chest armor',gloves:'Gauntlets',trousers:'Trousers',boots:'Boots'};
 const tiers=['basic','enhanced','superior','mastercrafted','grandmaster'];
 const source='https://witcher3.gameslantern.com/gear-sets/cat-school-gear';
 const items=Object.fromEntries(Object.entries(slots).flatMap(([slot,label])=>tiers.map(tier=>{const id='feline-'+slot+'-'+tier;return [id,{id,set:'Feline',slot,tier,name:(tier==='basic'?'':tier[0].toUpperCase()+tier.slice(1)+' ')+'Feline '+label.toLowerCase(),content:tier==='grandmaster'?'Blood and Wine':'Base Game',source,stats:null,level:null}];})));
 const api={slots,tiers,items,source};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.PhoenixCharacterGear=api;
})(typeof window!=='undefined'?window:null);
