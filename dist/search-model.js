'use strict';
/* Search reads canonical entries and progress. Only its own recent-history record is writable. */
(()=>{
 const normalize=value=>String(value||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’']/g,'').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
 const text=value=>Array.isArray(value)?value.map(text).join(' '):typeof value==='string'?value:'';
 function buildIndex({tasks,pins=[],references=[]}){
  const rows=[],seen=new Set();
  const add=row=>{if(!row.href?.startsWith('#')||seen.has(row.id))return;seen.add(row.id);rows.push({...row,expansion:row.expansion||'base',titleKey:normalize(row.title),searchKey:normalize(row.title+' '+(row.keywords||''))});};
  for(const [id,t]of Object.entries(tasks)){
   const service=pins.find(p=>p.task===id&&p.type==='service');
   const type=t.stages?'quest':t.diagram?'diagram':service?'merchant':id==='departure-review'?'reference':'activity';
   const href=t.stages?'#whiteorchard-tree/'+t.home+'/'+id:service?'#economy-merchants/'+service.id:'#'+t.view;
   add({id,taskId:id,title:t.name,type,category:type==='quest'?'Quest':type==='diagram'?'Diagram':type==='merchant'?'Merchant / service':type==='reference'?'Reference':'Activity',region:'White Orchard',href,keywords:text([t.intro,t.why,t.requirements,t.sections])});
   for(const stage of t.stages||[])add({id:id+':step:'+stage.id,taskId:id,title:stage.title+' · '+t.name,type:'quest',category:'Quest step',region:'White Orchard',href:'#'+t.view+'/'+stage.id,keywords:text([stage.text,stage.warning])});
  }
  for(const reference of references)add({...reference,type:'reference',category:'Reference',region:reference.region||'Guide-wide'});
  return rows;
 }
 function status(row,{tasks,state,engine}){
  const id=row.taskId;
  if(!id||row.type==='reference'||row.type==='merchant')return {key:'reference',label:row.type==='merchant'?'Availability not tracked':'Reference'};
  if(tasks[id]?.stages){const s=engine.status(id,state.progress);const key=s==='complete'?'completed':s==='failed'?'failed':s==='active'?'open':'unknown';return {key,label:(row.category==='Quest step'?'Quest: ':'')+(key==='completed'?'Recorded complete':key==='failed'?'Recorded failed':key==='open'?'In progress':s==='unavailable'?'Availability unknown':'Not recorded')};}
  return state.completed[id]===true?{key:'completed',label:row.type==='diagram'?'Recorded acquired':'Recorded complete'}:{key:'unknown',label:'Not recorded'};
 }
 function search(index,query,filters={},context){
  const q=normalize(String(query||'').slice(0,160)),tokens=q.split(' ').filter(Boolean);if(!tokens.length)return [];
  return index.filter(row=>(filters.expansions||row.expansion==='base')&&(!filters.region||filters.region==='all'||row.region===filters.region)&&(!filters.type||filters.type==='all'||row.type===filters.type)).map(row=>{
   const current=status(row,context);if(filters.completion&&filters.completion!=='all'&&(filters.completion==='open'?!['open','unknown'].includes(current.key):current.key!==filters.completion))return null;
   if(!tokens.every(token=>row.searchKey.includes(token)))return null;
   const score=row.titleKey===q?1000:row.titleKey.startsWith(q)?800:row.titleKey.includes(q)?600:tokens.reduce((n,t)=>n+(row.titleKey.includes(t)?30:1),0);
   return {...row,status:current,score};
  }).filter(Boolean).sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title)||a.id.localeCompare(b.id));
 }
 function readHistory(raw,index){let value;try{value=typeof raw==='string'?JSON.parse(raw):raw;}catch{return {queries:[],entries:[]};}const ids=new Set(index.map(row=>row.id));const unique=(xs,valid)=>[...new Set((Array.isArray(xs)?xs:[]).filter(valid))].slice(0,8);return {queries:unique(value?.queries,x=>typeof x==='string'&&x.trim().length>0&&x.length<=160),entries:unique(value?.entries,x=>typeof x==='string'&&ids.has(x))};}
 function remember(history,{query,id}={}){return {queries:query?.trim()?[query.trim().slice(0,160),...history.queries.filter(x=>normalize(x)!==normalize(query))].slice(0,8):[...history.queries],entries:id?[id,...history.entries.filter(x=>x!==id)].slice(0,8):[...history.entries]};}
 window.PhoenixSearchModel={normalize,buildIndex,status,search,readHistory,remember};
})();
