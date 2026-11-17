'use strict';
(function(root){
 const KEY='phoenix.character.build-vault.v1',SLOTS=['steel','silver','chest','gloves','trousers','boots'];
 const clone=x=>JSON.parse(JSON.stringify(x)),plain=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
 const exact=(x,keys)=>plain(x)&&Object.keys(x).sort().join('|')===[...keys].sort().join('|');
 function validBuild(b){return exact(b,['id','name','equipment','level','points','region'])&&typeof b.id==='string'&&b.id.length>0&&b.id.length<=100&&typeof b.name==='string'&&b.name.trim().length>0&&b.name.length<=100&&typeof b.region==='string'&&b.region.length<=100&&[b.level,b.points].every(v=>v===null||Number.isSafeInteger(v)&&v>=0&&v<=10000)&&exact(b.equipment,SLOTS)&&SLOTS.every(s=>b.equipment[s]===null||typeof b.equipment[s]==='string'&&/^feline-(steel|silver|chest|gloves|trousers|boots)-(basic|enhanced|superior|mastercrafted|grandmaster)$/.test(b.equipment[s])&&b.equipment[s].split('-')[1]===s);}
 function valid(v){if(!exact(v,['version','activeId','builds'])||v.version!==1||!Array.isArray(v.builds)||v.builds.length>200||!v.builds.every(validBuild))return false;
 const ids=v.builds.map(b=>b.id),names=v.builds.map(b=>b.name.trim().toLowerCase());return new Set(ids).size===ids.length&&new Set(names).size===names.length&&(v.activeId===null||typeof v.activeId==='string'&&ids.includes(v.activeId));}
 function empty(){return {version:1,activeId:null,builds:[]};}
 function newBuild(id,name='My Feline build'){return {id,name,equipment:Object.fromEntries(SLOTS.map(s=>[s,null])),level:null,points:null,region:''};}
 function createVault(getStorage){let storage,raw=null,data=empty(),status='ready';
  try{storage=getStorage();raw=storage.getItem(KEY);if(raw!==null){let parsed;try{parsed=JSON.parse(raw);}catch{status='unreadable';}if(status==='ready'){if(!valid(parsed))status='unsupported';else data=clone(parsed);}}}catch{status='unavailable';}
  const writable=status==='ready';
  function commit(next){if(!valid(next))return {ok:false,reason:'invalid'};data=clone(next);
   if(!writable)return {ok:false,reason:status};
   try{if(storage.getItem(KEY)!==raw){status='changed-elsewhere';return {ok:false,reason:status};}const bytes=JSON.stringify(data);storage.setItem(KEY,bytes);raw=bytes;status='ready';return {ok:true,reason:'saved'};}catch{status='write-failed';return {ok:false,reason:status};}}
  return {read:()=>clone(data),status:()=>status,
   save(build){if(!validBuild(build))return {ok:false,reason:'invalid'};if(data.builds.some(b=>b.id!==build.id&&b.name.trim().toLowerCase()===build.name.trim().toLowerCase()))return {ok:false,reason:'name-conflict'};const next=clone(data),i=next.builds.findIndex(b=>b.id===build.id);if(i<0)next.builds.push(clone(build));else next.builds[i]=clone(build);return commit(next);},
   designate(id){if(!data.builds.some(b=>b.id===id))return {ok:false,reason:'not-saved'};const next=clone(data);next.activeId=id;return commit(next);},
   export:()=>JSON.stringify(data,null,2)};
 }
 const api={KEY,SLOTS,clone,valid,validBuild,empty,newBuild,createVault};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.PhoenixCharacterVault=api;
})(typeof window!=='undefined'?window:null);
