(function(root){
'use strict';
// v45 Slice 2: explicit progress-ownership handover of The Nilfgaardian Connection (velen.nilf) to the
// canonical regional record phoenix.region.velen.v1.
// - Owns only activities['velen.nilf'], choices.inn, owners and handover inside the canonical record.
// - Never reads or writes the legacy record phoenix.velen.arrival.v1 for progress; velen.pyres and velen.mercy
//   stay owned by that legacy record and their v45 hubs (`owners` says so explicitly).
// - Imported whole-quest completion becomes the engine's `legacy` mark: the quest stays complete while its
//   objectives remain unrecorded. No objective marks are invented and an unknown inn outcome stays unknown.
// - The handover removes the Slice 1 migration seal, so the unchanged Slice 1 guard classifies the record as
//   `canonical-kept`: later imports never overwrite it and migration rollback never removes it.
// - The handover write carries its own seal; rollbackHandover restores the exact pre-handover storage only
//   while the record is unchanged since the handover. Any later progress write preserves the record.
const migration=root.PhoenixVelenMigration||(typeof require==='function'?require('./velen-migration.js'):null);
const data=root.PHOENIX_VELEN_NILF_PROGRESS||(typeof require==='function'?require('./velen-nilf-objectives.js'):null);
// Node tests only: progression-engine.js assigns to `window`, so alias it to the global object when absent.
const engineFactory=root.createPhoenixProgress||(typeof require==='function'?((typeof window==='undefined'&&(globalThis.window=globalThis)),require('./progression-engine.js'),window.createPhoenixProgress):null);
if(!migration||!data||!engineFactory)throw Error('velen-nilf-progress.js requires velen-migration.js, velen-nilf-objectives.js and progression-engine.js');
const KEY=migration.CANONICAL_KEY,LEGACY_KEY=migration.LEGACY_KEY,Q=data.quest,WRITER='velen-nilf-handover@v45-slice2';
const engine=engineFactory(data,{},[]);
const plain=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
const clone=x=>JSON.parse(JSON.stringify(x));
function parse(text){try{return {ok:true,value:JSON.parse(text)};}catch{return {ok:false};}}
function read(storage){
 let text;try{text=storage.getItem(KEY);}catch{return {status:'storage-unavailable'};}
 if(text==null)return {status:'absent',text:null};
 const c=parse(text);
 if(!c.ok||!plain(c.value)||!Number.isInteger(c.value.schema)||c.value.schema<1)return {status:'canonical-unreadable',text};
 if(c.value.schema>migration.SCHEMA)return {status:'newer-canonical',text};
 return {status:'readable',text,value:c.value};
}
// Inn outcomes stored as choices.inn. The direct-Heatherton route is not an inn outcome: it is stored as the activity's
// `route` and only mapped to the engine's inn-path value in memory (QA2 correction 2).
const OUTCOMES=['peace','fight'],DIRECT=data.choices.inn.routeValue,ROUTE_DIRECT='direct-heatherton';
const handedOver=v=>plain(v)&&plain(v.owners)&&v.owners[Q]===KEY&&plain(v.handover)&&plain(v.activities)&&plain(v.activities[Q]);
function sealOf(record){const {seal,...rest}=record.handover;return migration.fingerprint({...record,handover:rest});}
function handover(storage){
 const r=read(storage);
 if(r.status==='storage-unavailable'||r.status==='canonical-unreadable'||r.status==='newer-canonical')return {status:r.status};
 if(r.value&&handedOver(r.value))return {status:'already-handed-over'};
 // QA2 correction 1: with no canonical record, a legacy record that is still present means the Slice 1 import did not
 // succeed (legacy-unreadable or save-unavailable: a readable legacy record is always imported first). Keep the v45
 // fallback and write nothing, so a repaired legacy save can still be imported before ownership moves.
 if(r.status==='absent'){let legacy;try{legacy=storage.getItem(LEGACY_KEY);}catch{return {status:'storage-unavailable'};}if(legacy!=null)return {status:'legacy-not-imported'};}
 const base=r.value?clone(r.value):{schema:migration.SCHEMA,region:'velen',origin:{kind:'canonical'},activities:{},choices:{},ignored:[]};
 delete base.migration;
 const act=plain(base.activities?.[Q])?base.activities[Q]:{};
 const imported=act.complete===true,choice=OUTCOMES.includes(base.choices?.inn?.value)?base.choices.inn.value:null;
 base.activities={...(plain(base.activities)?base.activities:{}),[Q]:{...act,id:Q,legacy:'nilf',source:data.source,requires:[],objectives:plain(act.objectives)?{...act.objectives}:{},complete:imported,legacyComplete:act.legacyComplete===true||imported,failed:act.failed===true}};
 base.choices=plain(base.choices)?base.choices:{};
 base.owners={...(plain(base.owners)?base.owners:{}),[Q]:KEY,'velen.pyres':base.owners?.['velen.pyres']||LEGACY_KEY,'velen.mercy':base.owners?.['velen.mercy']||LEGACY_KEY};
 base.handover={writer:WRITER,activity:Q,from:r.value?KEY+(r.value.origin?.kind==='legacy-import'?' (imported from '+LEGACY_KEY+')':''):null,importedComplete:imported,importedChoice:choice,before:r.text};
 base.handover.seal=sealOf(base);
 try{storage.setItem(KEY,JSON.stringify(base));}catch{return {status:'save-unavailable'};}
 return {status:'handed-over',record:base};
}
// Shared-engine progress for velen.nilf from the canonical record. Known objective IDs only; unknown keys are kept in storage untouched.
// QA4: a confirmed whole-quest completion on the direct route (`confirmedComplete`) is a quest-level fact, separate from
// objective marks and from imported legacy completion. In memory it is the engine's whole-quest `legacy` mark plus a
// `confirmed` flag (not an engine field); it only applies while the direct route is recorded.
const confirmedOn=act=>act.confirmedComplete===true&&act.route===ROUTE_DIRECT&&act.legacyComplete!==true;
function toProgress(record){
 const act=record.activities[Q],objectives={};
 for(const [id,v] of Object.entries(plain(act.objectives)?act.objectives:{}))if(data.objectiveIndex[id])objectives[id]=v;
 const confirmed=confirmedOn(act);
 const p=engine.init({schema:1,objectives,choices:OUTCOMES.includes(record.choices?.inn?.value)?{inn:record.choices.inn.value}:act.route===ROUTE_DIRECT?{inn:DIRECT}:{},manual:{},failed:{[Q]:act.failed===true},legacy:{[Q]:act.legacyComplete===true||confirmed}},{});
 if(confirmed)p.confirmed={[Q]:true};
 return p;
}
function load(storage){
 const r=read(storage);
 if(r.status!=='readable')return {owned:false,status:r.status,progress:engine.init(),complete:false};
 if(!handedOver(r.value))return {owned:false,status:'not-handed-over',progress:engine.init(),complete:false};
 const progress=toProgress(r.value);
 const confirmedComplete=progress.confirmed?.[Q]===true;
 return {owned:true,status:'owned',record:r.value,progress,complete:engine.done(Q,progress),legacyComplete:progress.legacy[Q]===true&&!confirmedComplete,confirmedComplete,undo:!!r.value.activities[Q].undo};
}
function snapshot(act,choices){return {objectives:clone(plain(act.objectives)?act.objectives:{}),legacyComplete:act.legacyComplete===true,failed:act.failed===true,choice:choices?.inn?clone(choices.inn):null,route:act.route||null,...(act.confirmedComplete===true?{confirmedComplete:true}:{})};}
function write(storage,mutate){
 const r=read(storage);
 if(r.status!=='readable'||!handedOver(r.value))return {status:r.status==='readable'?'not-handed-over':r.status};
 const record=clone(r.value);mutate(record);
 const act=record.activities[Q];act.complete=engine.done(Q,toProgress(record));
 // QA3: objectives closed by the direct route are listed explicitly, so skipped stays distinct from completed in data.
 delete act.bypassed;delete act.unconfirmed;/* QA4: stable key order so Undo restores exact bytes */
 if(act.route===ROUTE_DIRECT)act.bypassed=Object.values(data.objectiveIndex).filter(o=>o.route==='inn').map(o=>o.id);
 // QA4: objectives whose journal status is unconfirmed on the direct route are listed too (never marked, never required).
 if(act.route===ROUTE_DIRECT)act.unconfirmed=Object.values(data.objectiveIndex).filter(o=>o.unconfirmedOn===DIRECT&&act.objectives?.[o.id]!=='done').map(o=>o.id);
 try{storage.setItem(KEY,JSON.stringify(record));}catch{return {status:'save-unavailable'};}
 return {status:'saved',record};
}
// Commit a shared-engine plan result for velen.nilf. One Undo level, like the WO progress toast.
function commit(storage,progress){
 return write(storage,record=>{
  const act=record.activities[Q],keep={};
  for(const [id,v] of Object.entries(plain(act.objectives)?act.objectives:{}))if(!data.objectiveIndex[id])keep[id]=v;
  act.undo=snapshot(act,record.choices);
  act.objectives={...keep};
  for(const [id,v] of Object.entries(progress.objectives))if(data.objectiveIndex[id]&&['done','skipped'].includes(v))act.objectives[id]=v;
  const value=progress.choices?.inn,confirmed=progress.confirmed?.[Q]===true&&progress.legacy?.[Q]===true&&value===DIRECT;
  act.legacyComplete=progress.legacy?.[Q]===true&&!confirmed;act.failed=progress.failed?.[Q]===true;
  if(confirmed)act.confirmedComplete=true;else delete act.confirmedComplete;
  if(OUTCOMES.includes(value))record.choices.inn={activity:Q,value,source:data.source};else delete record.choices.inn;
  if(value===DIRECT)act.route=ROUTE_DIRECT;else delete act.route;
 });
}
function undo(storage){
 const r=read(storage);if(r.status!=='readable'||!handedOver(r.value)||!r.value.activities[Q].undo)return {status:'nothing-to-undo'};
 return write(storage,record=>{const act=record.activities[Q],u=act.undo;act.objectives=u.objectives;act.legacyComplete=u.legacyComplete;act.failed=u.failed;if(u.choice)record.choices.inn=u.choice;else delete record.choices.inn;if(u.route)act.route=u.route;else delete act.route;if(u.confirmedComplete)act.confirmedComplete=true;else delete act.confirmedComplete;delete act.undo;});
}
// Shared-engine plan for velen.nilf. The inn path is carried by both "Ask about…" and "Look for… in Heatherton" (the
// direct route has no inn conversation), and the engine clears a choice whenever an objective carrying it is unchecked.
// Unchecking Heatherton steps must not erase a peace/fight outcome that the still-recorded inn conversation keeps.
// QA4: on the direct route, "Record whole quest complete" records a confirmed whole-quest completion (the player read
// Hendrik's notes, which finishes the quest) without filling any objective mark and without an inn outcome. Removing it
// removes only that confirmation. All other routes keep the shared engine's whole-quest behaviour unchanged.
function plan(progress,action,options={}){
 const wasConfirmed=progress.confirmed?.[Q]===true,quest=action.kind==='quest'&&action.quest===Q&&progress.failed?.[Q]!==true;
 const inn=Object.hasOwn(options.choices||{},'inn')?options.choices.inn:progress.choices?.inn;
 const confirm=quest&&action.value!==false&&inn===DIRECT&&!engine.done(Q,progress),unconfirm=quest&&action.value===false&&wasConfirmed;
 const r=engine.plan(progress,{},confirm||unconfirm?{kind:'reconcile-legacy',quest:Q}:action,confirm||unconfirm?{...options,catchup:false}:options),before=progress.choices?.inn,ASK=Q+':ask';
 if(action.value===false&&!r.progress.choices.inn&&OUTCOMES.includes(before)&&r.progress.objectives[ASK]==='done'&&!Object.hasOwn(options.choices||{},'inn')){
  r.progress.choices.inn=before;r.missingChoices=r.missingChoices.filter(c=>c!=='inn');
 }
 if(confirm&&!r.missingChoices.length){r.progress.legacy[Q]=true;r.progress.confirmed={[Q]:true};r.confirmedCompletion=true;}
 else if(wasConfirmed&&!unconfirm&&r.progress.legacy[Q]===true){
  // A confirmation belongs to the direct route: keep it while the route stays direct, drop it when the route changes.
  if(r.progress.choices.inn===DIRECT)r.progress.confirmed={[Q]:true};
  else{delete r.progress.legacy[Q];if(!r.completionLosses.includes(Q))r.completionLosses=[...r.completionLosses,Q];}
 }
 return r;
}
// Guarded storage rollback of the handover itself. The legacy key is never touched.
function rollbackHandover(storage){
 const r=read(storage);
 if(r.status==='absent')return {status:'absent',restored:false};
 if(r.status!=='readable')return {status:r.status,restored:false};
 if(!handedOver(r.value)||r.value.handover.writer!==WRITER)return {status:'not-handed-over',restored:false};
 if(r.value.handover.seal!==sealOf(r.value))return {status:'handover-edited',restored:false};
 try{if(r.value.handover.before==null)storage.removeItem(KEY);else storage.setItem(KEY,r.value.handover.before);}catch{return {status:'storage-unavailable',restored:false};}
 return {status:'restored',restored:true};
}
const api=Object.freeze({KEY,LEGACY_KEY,QUEST:Q,WRITER,engine,data,handover,load,plan,commit,undo,rollbackHandover,toProgress,ROUTE_DIRECT,DIRECT});
root.PhoenixVelenNilfProgress=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
