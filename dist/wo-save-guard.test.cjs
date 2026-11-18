'use strict';
// v45 QA6: White Orchard save guard (audit finding D2). Executes the real White Orchard loader, persist() and save-status
// code of app.js (extracted verbatim from `const key = ...interaction.v1` up to `function taskAnchor(`) in a VM with the
// real route, progression data and engine, against an in-memory Storage that logs every write and can inject faults.
// Each "visit" is one page session: load -> initial render persist -> interaction persists -> pagehide persist.
// Behaviour checked: unusable records are preserved byte-for-byte with zero writes for the whole session, a failed read
// never leads to a write of defaults, valid and absent records give exactly the v45 bytes, write failures behave as in
// v45, and the status text distinguishes normal / blocked-unreadable / blocked-unsupported / storage-unavailable /
// write-failed. Optional PHOENIX_V45_BASELINE=<v45 dist dir> replays the same visits against the v45 app.js region.
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),crypto=require('node:crypto');
const KEY='phoenix.whiteorchard.interaction.v1',LEGACY='phoenix.whiteorchard.pilot.v1';
const J=x=>JSON.parse(JSON.stringify(x)); // VM objects come from another realm: compare as plain JSON
const sha=s=>crypto.createHash('sha256').update(s,'utf8').digest('hex');
const VALID="{\"version\":1,\"completed\":{\"q-lilac\":false,\"q-beast\":false,\"q-firestarter\":false,\"q-pan\":false,\"q-cargo\":false,\"q-missing\":false,\"q-death\":false,\"q-devil\":false,\"q-viper\":false,\"q-temerian\":false,\"q-deserter\":false,\"q-dirty\":false,\"q-incident\":false},\"selectedHub\":\"hub-arrival\",\"expandedHub\":\"hub-arrival\",\"windowStart\":0,\"treeReturn\":{\"hubDecks\":{\"completed\":false,\"rails\":{\"Merchants & services\":0,\"Quests & contracts\":0,\"Exploration\":0},\"doneX\":0},\"selectedHub\":\"hub-arrival\",\"groupOpen\":{},\"expandedHub\":\"hub-arrival\",\"windowStart\":0,\"scrollY\":0,\"scrollX\":0,\"focusId\":\"\"},\"lastStage\":\"forge\",\"lastContent\":{\"task\":\"q-lilac\",\"view\":\"quest-lilac\"},\"lastWalkthrough\":true,\"lastWalkthroughView\":\"quest-lilac\",\"stageByView\":{\"quest-lilac\":\"1\"},\"map\":{\"type\":\"all\",\"search\":\"\",\"showCompleted\":false},\"progress\":{\"schema\":1,\"objectives\":{\"q-lilac:ghouls\":\"done\",\"q-lilac:ride\":\"done\"},\"choices\":{},\"manual\":{\"arrival\":false,\"garrison\":false,\"griffin\":false,\"departed\":false},\"failed\":{\"q-lilac\":false,\"q-beast\":false,\"q-firestarter\":false,\"q-pan\":false,\"q-cargo\":false,\"q-missing\":false,\"q-death\":false,\"q-devil\":false,\"q-viper\":false,\"q-temerian\":false,\"q-deserter\":false,\"q-dirty\":false,\"q-incident\":false},\"legacy\":{\"q-lilac\":false,\"q-beast\":false,\"q-firestarter\":false,\"q-pan\":false,\"q-cargo\":false,\"q-missing\":false,\"q-death\":false,\"q-devil\":false,\"q-viper\":false,\"q-temerian\":false,\"q-deserter\":false,\"q-dirty\":false,\"q-incident\":false}},\"groupOpen\":{},\"routeUpdates\":[],\"progressUndo\":{\"progress\":{\"schema\":1,\"objectives\":{},\"choices\":{},\"manual\":{},\"failed\":{},\"legacy\":{}},\"completed\":{},\"routeUpdates\":[]},\"mapContext\":null,\"noticeRead\":[]}";
// The probe fixture qa/wo-save-preservation/fixtures/valid-record.json (written by the v45 UI), embedded for portability.
assert.equal(sha(VALID),'1c55d017171f31bda61c156a7150d770aa7aa38def32e96f81e172a3da9c0dbf');
function data(){
 const c={};c.window=c;vm.createContext(c);
 for(const f of ['white-orchard.js','map-data.js','progression-data.js','progression-engine.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,f),'utf8'),c,{filename:f});
 return c;
}
function region(src){
 const a=src.indexOf("  const key = 'phoenix.whiteorchard.interaction.v1';"),b=src.indexOf('  function taskAnchor(');
 assert.ok(a>0&&b>a,'White Orchard loader/persist region not found');return src.slice(a,b);
}
// Storage double: Map-backed, logs writes, optional faults {read:true} (getItem of KEY throws), {write:'key'|'all'}.
function store(init={},fault={}){
 const map=new Map(Object.entries(init)),log=[];
 return {map,log,fault,
  getItem(k){if(fault.read&&k===KEY)throw Object.assign(new Error('simulated read failure'),{name:'SecurityError'});return map.has(k)?map.get(k):null;},
  setItem(k,v){if(fault.write==='all'||fault.write==='key'&&k===KEY){log.push(['refused',k]);throw Object.assign(new Error('simulated quota'),{name:'QuotaExceededError'});}log.push(['set',k]);map.set(k,String(v));},
  removeItem(k){log.push(['remove',k]);map.delete(k);},clear(){log.push(['clear']);map.clear();},
  writes(k=KEY){return log.filter(([op,key])=>op==='set'&&key===k).length;},
 };
}
// One page session of the given app.js source. denied: the localStorage getter itself throws (storage blocked).
function visit(src,storage,{denied=false,interact=true}={}){
 const d=data(),{tasks,hubs,groups}=d.PHOENIX_ROUTE;
 Object.entries(d.PHOENIX_PROGRESS_DATA.quests).forEach(([id,q])=>{if(!Number.isFinite(tasks[id].level)&&Number.isFinite(q.level))tasks[id].level=q.level;});
 const engine=d.createPhoenixProgress(d.PHOENIX_PROGRESS_DATA,tasks,hubs);
 const messages=[{textContent:'',dataset:{}},{textContent:'',dataset:{}}];
 const ctx={tasks,hubs,groups,progressEngine:engine,stages:tasks['q-firestarter'].stages.map(s=>s.id),history:{},JSON,Object,Array,Number,Math,Set,Boolean,String,
  document:{querySelectorAll:sel=>sel==='[data-save-message]'?messages:[]}};
 if(!denied)ctx.localStorage=storage;
 vm.createContext(ctx);
 // Installed from inside the context: an accessor on the sandbox object is not seen by global lookups.
 if(denied){vm.runInContext('Object.defineProperty(globalThis,"localStorage",{configurable:true,get(){const e=new Error("storage access denied");e.name="SecurityError";throw e;}})',ctx);assert.throws(()=>vm.runInContext('localStorage',ctx),e=>e.name==='SecurityError');}
 const api=vm.runInContext(region(src)+';({state,persist,show:typeof showSaveStatus==="function"?showSaveStatus:null})',ctx);
 const seen=[];const note=()=>seen.push(messages[0].textContent);
 api.persist();note(); // initial render() -> persist()
 if(interact){
  // Interaction as the UI does it (progression-ui apply/undoLast): change progress in memory, persist, then Undo, persist.
  const before={progress:api.state.progress,completed:{...api.state.completed}};
  const plan=engine.plan(api.state.progress,api.state.completed,{kind:'objective',id:'q-lilac:ride',value:true});
  api.state.progressUndo={progress:before.progress,completed:before.completed,routeUpdates:api.state.routeUpdates};
  api.state.progress=plan.progress;api.persist();note();
  const afterTick=engine.facts?api.state.progress:null;
  api.state.progress=engine.init(before.progress,before.completed);api.state.progressUndo=null;api.persist();note();
  api.ticked=afterTick;
 }
 api.persist();note(); // pagehide
 return {...api,messages,seen,state:api.state};
}
const APP=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
const V45_DIR=process.env.PHOENIX_V45_BASELINE,V45_APP=V45_DIR?fs.readFileSync(path.join(V45_DIR,'app.js'),'utf8'):null;
const MSG={saving:'',writeFailed:'Saving is unavailable. Changes last for this visit only.',
 unreadable:'Your saved White Orchard progress could not be read, so it is kept unchanged. Changes in this visit are not saved.',
 unsupported:'Your saved White Orchard progress is in a format this guide cannot use, so it is kept unchanged. Changes in this visit are not saved.',
 storage:'Saved progress could not be read. Changes in this visit are not saved.'};
const v=JSON.parse(VALID);
const DAMAGED={
 'invalid JSON (truncated)':[VALID.slice(0,Math.floor(VALID.length/2)),'unreadable'],
 'invalid JSON (text)':['not json {','unreadable'],
 'empty string':['','unreadable'],
 'array':['[]','unreadable'],'string':['"hello"','unreadable'],'null':['null','unreadable'],'number':['42','unreadable'],
 'object without version':['{"foo":1}','unsupported'],
 'populated, version missing':[JSON.stringify((({version,...rest})=>rest)(v)),'unsupported'],
 'populated, version "1" (string)':[JSON.stringify({...v,version:'1'}),'unsupported'],
 'populated, version 2':[JSON.stringify({...v,version:2}),'unsupported'],
 'populated, version 2, divergent fields':[JSON.stringify({...v,version:2,completed:{...v.completed,'q-lilac':true},selectedHub:'hub-missing',expandedHub:'hub-missing'}),'unsupported'],
 'populated, version 0':[JSON.stringify({...v,version:0}),'unsupported'],
 'populated, version null':[JSON.stringify({...v,version:null}),'unsupported'],
};
const DEFAULT_COMPLETED=k=>Object.values(k).every(x=>x===false);

for(const [name,[bytes,status]] of Object.entries(DAMAGED))test('unusable record is preserved and never written: '+name,()=>{
 const s=store({[KEY]:bytes});
 for(let session=0;session<3;session++){ // first load + two reloads
  const r=visit(APP,s);
  assert.equal(s.map.get(KEY),bytes,'stored bytes unchanged');
  assert.equal(r.messages[0].dataset.saveState,status);
  assert.deepEqual([...new Set(r.seen)],[status==='unreadable'?MSG.unreadable:MSG.unsupported],'blocked message only; the normal message never appears');
  assert.ok(DEFAULT_COMPLETED(r.state.completed),'nothing imported from an unusable record');
  assert.equal(r.state.selectedHub,'hub-arrival');assert.deepEqual(J(r.state.noticeRead),[]);assert.equal(r.state.progressUndo,null);
 }
 assert.equal(s.writes(),0,'zero writes of the White Orchard key across three sessions');
 assert.ok(!s.log.some(([op])=>op==='remove'||op==='clear'));
});
test('blocked session: progress still changes in memory, Undo restores it, and nothing is written',()=>{
 const s=store({[KEY]:'{"version":2}'}),r=visit(APP,s);
 assert.ok(r.ticked,'in-memory progress was updated by the objective tick');
 assert.notDeepEqual(J(r.ticked),J(r.state.progress),'Undo restored the previous in-memory progress');
 assert.equal(s.writes(),0);assert.equal(s.map.get(KEY),'{"version":2}');
});
test('a later successful write elsewhere does not clear the blocked state',()=>{
 const s=store({[KEY]:'[]'}),r=visit(APP,s,{interact:false});
 s.setItem('phoenix.guide.resume.v1','{}');r.persist();r.persist();
 assert.equal(r.messages[0].dataset.saveState,'unreadable');assert.equal(r.messages[0].textContent,MSG.unreadable);assert.equal(s.writes(),0);
});
test('read failure (getItem throws, persistently): no write of defaults; storage-unavailable message never claims preservation',()=>{
 const s=store({[KEY]:VALID},{read:true});
 for(let i=0;i<3;i++){const r=visit(APP,s);assert.equal(r.messages[0].dataset.saveState,'storage-unavailable');assert.deepEqual([...new Set(r.seen)],[MSG.storage]);assert.ok(!/kept unchanged|preserved/i.test(r.messages[0].textContent));}
 assert.equal(s.writes(),0);assert.equal(s.map.get(KEY),VALID);
});
test('read failure on the first load only: the original progress survives and is used once storage recovers',()=>{
 const s=store({[KEY]:VALID},{read:true});
 visit(APP,s);assert.equal(s.writes(),0);assert.equal(s.map.get(KEY),VALID);
 s.fault.read=false;
 const r=visit(APP,s,{interact:false});
 assert.equal(r.messages[0].dataset.saveState,'saving');
 assert.deepEqual(J(r.state.progress.objectives),v.progress.objectives,'progress comes from the preserved record');
 assert.deepEqual(JSON.parse(s.map.get(KEY)).progress.objectives,v.progress.objectives);
});
test('localStorage access denied (getter throws): the loader and persist() do not throw; storage-unavailable status',()=>{
 const r=visit(APP,null,{denied:true});
 assert.equal(r.messages[0].dataset.saveState,'storage-unavailable');assert.deepEqual([...new Set(r.seen)],[MSG.storage]);
});
test('write failure for the key: unchanged v45 behaviour (bytes kept, "Saving is unavailable…", recovers after a good write)',()=>{
 const s=store({[KEY]:VALID},{write:'key'}),r=visit(APP,s);
 assert.equal(s.map.get(KEY),VALID);assert.deepEqual([...new Set(r.seen)],[MSG.writeFailed]);assert.equal(r.messages[0].dataset.saveState,'write-failed');
 s.fault.write=null;r.persist();assert.equal(r.messages[0].textContent,MSG.saving);assert.equal(r.messages[0].dataset.saveState,'saving');
 if(V45_APP){const s5=store({[KEY]:VALID},{write:'key'}),r5=visit(V45_APP,s5);assert.deepEqual(r5.seen,r.seen,'same messages as v45');assert.equal(s5.map.get(KEY),VALID);}
});
test('write failure for every key: bytes kept, write-failed message',()=>{
 const s=store({[KEY]:VALID},{write:'all'}),r=visit(APP,s);assert.equal(s.map.get(KEY),VALID);assert.deepEqual([...new Set(r.seen)],[MSG.writeFailed]);
});
test('accepted record: every saved field comes from that one record',()=>{
 const rec={...v,completed:{...v.completed,'q-beast':true},selectedHub:'hub-missing',expandedHub:null,groupOpen:{'hub-arrival:quest':true},noticeRead:['n1'],
  routeUpdates:[{hub:'hub-arrival',activities:['q-lilac'],id:'u1'},{hub:'nope',activities:[]}],progressUndo:{progress:v.progress,completed:v.completed},mapContext:{scope:'hub-missing'}};
 const s=store({[KEY]:JSON.stringify(rec)}),r=visit(APP,s,{interact:false});
 assert.equal(r.state.completed['q-beast'],true);assert.equal(r.state.selectedHub,'hub-missing');assert.equal(r.state.expandedHub,null);
 assert.deepEqual(J(r.state.groupOpen),rec.groupOpen);assert.deepEqual(J(r.state.noticeRead),['n1']);assert.deepEqual(J(r.state.routeUpdates),[rec.routeUpdates[0]]);
 assert.deepEqual(J(r.state.progressUndo),rec.progressUndo);assert.deepEqual(J(r.state.mapContext),rec.mapContext);
 assert.deepEqual(J(r.state.progress.objectives),v.progress.objectives);assert.equal(r.messages[0].textContent,MSG.saving);
});
// Final bytes after one session (load, tick, Undo, pagehide), pinned from the v45 app.js region; re-checked live against
// PHOENIX_V45_BASELINE when it is set.
const PINNED={
 'valid fixture':[()=>({[KEY]:VALID}),'710d37b70979c4694f02054d32d4696de27bd2681ae7a04708335b092a247159'],
 'absent':[()=>({}),'8f8e07e9a201ff12edf0a05cd7e6c9db7412760e253b1cfb22364d976662ef7a'],
 'absent + legacy pilot firestarter':[()=>({[LEGACY]:'{"firestarter":true}'}),'66f3d2fb3efe92818595090eab377a1dff99f42e8b2275c167278a5fc45ae2c1'],
 'absent + unreadable legacy pilot':[()=>({[LEGACY]:'{oops'}),'8f8e07e9a201ff12edf0a05cd7e6c9db7412760e253b1cfb22364d976662ef7a'],
 'valid with a malformed routeUpdates entry':[()=>({[KEY]:JSON.stringify({...v,routeUpdates:[null]})}),'16d84a0e654af7cd8bda26eb1a4867ce20cb20a07c66dcf69c9157447d51f9d3'],
};
for(const [name,[init,pin]] of Object.entries(PINNED))test('valid/absent bytes are identical to v45: '+name,()=>{
 const s=store(init()),r=visit(APP,s),out=s.map.get(KEY);
 assert.equal(r.messages[0].textContent,MSG.saving);
 if(init()[LEGACY]!==undefined)assert.equal(s.map.get(LEGACY),init()[LEGACY],'legacy pilot key never written');
 if(V45_APP){const s5=store(init());visit(V45_APP,s5);assert.equal(out,s5.map.get(KEY),'byte-identical to the v45 region');assert.equal(s.writes(),s5.writes(),'same number of writes as v45');}
 assert.equal(sha(out),pin,'pinned v45 bytes');
});
test('one status writer: persist() and reflect() both use showSaveStatus()',()=>{
 assert.equal(APP.split("querySelectorAll('[data-save-message]')").length-1,1,'only showSaveStatus writes [data-save-message]');
 const persist=APP.slice(APP.indexOf('  function persist() {'),APP.indexOf('  // QA6: one source'));assert.match(persist,/showSaveStatus\(\)/);assert.match(persist,/if \(!saveBlocked\)/);
 const reflect=APP.slice(APP.indexOf('function reflect('),APP.indexOf('function reflect(')+4000);assert.match(reflect,/showSaveStatus\(\);/);
 assert.equal(APP.split('localStorage.getItem(key)').length-1,1,'the White Orchard record is read exactly once');
});
