'use strict';
(function(root){
 const slots={steel:'Steel sword',silver:'Silver sword',chest:'Chest armor',gloves:'Gauntlets',trousers:'Trousers',boots:'Boots'};
 const tiers=['basic','enhanced','superior','mastercrafted','grandmaster'];
 const source='https://witcher3.gameslantern.com/gear-sets/cat-school-gear';
 const provenance={url:source,version:'4.04',retrieved:'2026-11-17',targetVerified:false};
 // Reference requirements only: the retrieved source identifies v4.04, not current Remastered.
 // Never use these as a hard equipment gate or a current-version performance claim.
 const levels={basic:17,enhanced:23,superior:29,mastercrafted:34,grandmaster:40};
 const title=s=>s[0].toUpperCase()+s.slice(1);
 const items=Object.fromEntries(Object.entries(slots).flatMap(([slot,label])=>tiers.map(tier=>{const id='feline-'+slot+'-'+tier;return [id,{id,set:'Feline',slot,tier,name:(tier==='basic'?'':title(tier)+' ')+'Feline '+label.toLowerCase(),content:tier==='grandmaster'?'Blood and Wine':'Base Game',source,stats:null,level:null,referenceLevel:levels[tier],provenance:{...provenance}}];})));
 function requirement(item,level){
  if(!item)return {state:'unknown',referenceLevel:null,allowed:true,text:'No equipment selected.'};
  if(level===null||level===undefined||!Number.isSafeInteger(level)||level<0)return {state:'profile-unknown',referenceLevel:item.referenceLevel,allowed:true,text:'Reference level '+item.referenceLevel+'; your level is not recorded. Current-version requirement not verified.'};
  const below=level<item.referenceLevel;
  return {state:below?'below-reference':'meets-reference',referenceLevel:item.referenceLevel,allowed:true,text:(below?'Below':'Meets')+' the v'+item.provenance.version+' reference level '+item.referenceLevel+'. Current-version requirement not verified; available for planning.'};
 }
 function changes(before,after){return Object.keys(slots).filter(s=>before.equipment[s]!==after.equipment[s]).map(slot=>({slot,before:items[before.equipment[slot]]||null,after:items[after.equipment[slot]]||null,requirement:requirement(items[after.equipment[slot]],after.level)}));}
 const api={slots,tiers,items,source,provenance,requirement,changes};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.PhoenixCharacterGear=api;
})(typeof window!=='undefined'?window:null);
