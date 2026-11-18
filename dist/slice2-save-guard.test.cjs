'use strict';
// v45 Slice 2 QA3: legacy Velen save guard. Executes the real load + save code of velen-r18.js (extracted verbatim and
// run in a VM with the real velen-data-r18.js initial/apply), together with the real Slice 1 import and Slice 2 handover,
// in app.js order: import -> handover -> Velen view load -> render/navigation/interaction saves.
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const velen=require('./velen-data-r18.js'),m=require('./velen-migration.js'),h=require('./velen-nilf-progress.js');
const LEGACY='phoenix.velen.arrival.v1',CANON='phoenix.region.velen.v1';
function store(init={}){const map=new Map(Object.entries(init));return {map,getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>{map.set(k,String(v));},removeItem:k=>{map.delete(k);},snapshot:()=>Object.fromEntries(map)};}
// Extract the legacy loader (from `let raw` up to `const state=`) and save() from a velen-r18.js source text.
function writerFrom(src){
 const load=src.slice(src.indexOf("let raw={};"),src.indexOf("const state=initial(raw)"));
 const save=src.slice(src.indexOf("function save(){"),src.indexOf("function picture("));
 assert.ok(load.length>20&&save.length>20,'loader/save not found');
 return (storage)=>{
  const ctx={localStorage:storage,key:LEGACY,initial:velen.initial,apply:velen.apply,status:{textContent:''},JSON};vm.createContext(ctx);
  return vm.runInContext(load+';const state=initial(raw);'+save+';({state,save,status,guarded:typeof legacyUnreadable!=="undefined"&&legacyUnreadable})',ctx);
 };
}
const current=writerFrom(fs.readFileSync('velen-r18.js','utf8'));
// The accepted v45 velen-r18.js (before any Slice 2 change). Its loader/save region is pinned below by sha256 so the
// comparison is portable; PHOENIX_V45_BASELINE (a v45 dist dir) can supply the full file.
const V45_LOAD="let raw={};try{raw=JSON.parse(localStorage.getItem(key)||'{}');}catch{}";
const V45_SAVE="function save(){try{localStorage.setItem(key,JSON.stringify(state));status.textContent='Your Velen progress saves in this browser.';}catch{status.textContent='Saving is unavailable. Progress lasts for this visit only.';}}";
const v45=writerFrom(V45_LOAD+'const state=initial(raw)'+V45_SAVE+'function picture(');
// One page visit as the browser runs it: Slice 1 import, Slice 2 handover, Velen view load, then UI saves.
function visit(storage,writer=current,interact=()=>{}){
 const imp=m.importFromStorage(storage).status,hand=h.handover(storage).status,view=writer(storage);
 view.save();// initial render
 interact(view);return {imp,hand,view};
}
const browse=v=>{for(const [id,stage] of [['nilf',3],['pyres',2],['mercy',2],['nilf',4]]){velen.apply(v.state,{kind:'view',id,stage});v.save();}
 velen.apply(v.state,{kind:'complete',id:'pyres',value:true});v.save();velen.apply(v.state,{kind:'choice',key:'mercy',value:'freed'});v.save();velen.apply(v.state,{kind:'undo'});v.save();};

test('the v45 loader/save excerpt used for byte comparison is the accepted v45 code',()=>{
 const base=process.env.PHOENIX_V45_BASELINE;
 if(base){const src=fs.readFileSync(path.join(base,'velen-r18.js'),'utf8');assert.ok(src.includes(V45_LOAD)&&src.includes(V45_SAVE));}
 const src=fs.readFileSync('velen-r18.js','utf8');
 assert.ok(src.includes(V45_LOAD),'the v45 loader line is kept verbatim');
 assert.ok(src.includes(V45_SAVE.replace('Your Velen progress saves in this browser.','').replace("function save(){","function save(){if(legacyUnreadable){status.textContent=legacyGuardText;return;}/* QA3 save guard */")),'save() retains the v45 write with a guard and silent success');
 assert.equal((src.match(/localStorage\.setItem\(key,/g)||[]).length,1,'save() is the only writer of the legacy key');
});
for(const [name,bytes] of [['invalid JSON','{"version":1,"complete":{"nilf":tru'],['JSON array','[]'],['JSON null','null'],['JSON number','42'],['JSON string','"hello"']]){
 test(`unreadable legacy (${name}): two reloads with navigation and interaction keep the exact bytes; no canonical owner; repair -> import -> handover`,()=>{
  const s=store({[LEGACY]:bytes});
  for(let reload=0;reload<2;reload++){
   const r=visit(s,current,browse);
   assert.equal(r.imp,'legacy-unreadable');assert.equal(r.hand,'legacy-not-imported');assert.equal(r.view.guarded,true);
   assert.equal(s.getItem(LEGACY),bytes,'original unreadable bytes survive visit '+(reload+1));
   assert.equal(s.getItem(CANON),null,'no canonical record is created');
   assert.match(r.view.status.textContent,/could not be read/);
   assert.equal(r.view.state.complete.pyres,true,'the visit still worked in memory');assert.equal(r.view.state.choices.mercy,undefined,'in-memory undo applied');
  }
  // The pre-guard v45 writer would have replaced the bytes on the first visit (the defect being fixed).
  const old=store({[LEGACY]:bytes});visit(old,v45);assert.notEqual(old.getItem(LEGACY),bytes);
  // Repair (e.g. the owner restores a backup), then the next visit imports and hands over.
  const repaired=JSON.stringify({version:1,selected:'pyres',lastHub:'pyres',complete:{nilf:true,pyres:true,mercy:false},stage:{nilf:4,pyres:2,mercy:1},choices:{inn:'fight',mercy:'left'},last:{id:'pyres'},undo:null});
  s.setItem(LEGACY,repaired);
  const r=visit(s);assert.equal(r.imp,'imported');assert.equal(r.hand,'handed-over');assert.equal(r.view.guarded,false);
  const c=JSON.parse(s.getItem(CANON)),l=h.load(s);
  assert.equal(l.owned,true);assert.equal(l.complete,true);assert.equal(l.legacyComplete,true);assert.deepEqual(l.progress.objectives,{});assert.equal(l.progress.choices.inn,'fight');
  assert.equal(c.activities['velen.pyres'].complete,true);assert.equal(c.owners['velen.pyres'],LEGACY);
  assert.equal(s.getItem(LEGACY),repaired,'the repaired record is saved byte-identically by the unchanged writer');
 });
}
test('valid, partial and absent legacy records: every write is byte-identical to the v45 writer',()=>{
 const cases=[null,'{}','{"version":1}',JSON.stringify({version:1,selected:'mercy',lastHub:'pyres',complete:{nilf:true,pyres:false,mercy:true},stage:{nilf:4,pyres:2,mercy:1},choices:{inn:'peace',mercy:'left'},last:{id:'pyres'},undo:null}),
  JSON.stringify({version:1,complete:{pyres:'yes'},stage:{pyres:99},choices:{mercy:'bogus'},extra:1}),JSON.stringify({complete:{nilf:false},choices:{inn:'fight'}})];
 for(const text of cases){
  const a=store(text==null?{}:{[LEGACY]:text}),b=store(text==null?{}:{[LEGACY]:text});
  const va=current(a),vb=v45(b);assert.equal(va.guarded,false);
  const steps=[v=>v.save(),v=>{velen.apply(v.state,{kind:'view',id:'pyres',stage:2});v.save();},v=>{velen.apply(v.state,{kind:'complete',id:'pyres',value:true});v.save();},
   v=>{velen.apply(v.state,{kind:'choice',key:'mercy',value:'freed'});v.save();},v=>{velen.apply(v.state,{kind:'complete',id:'mercy',value:true});v.save();},v=>{velen.apply(v.state,{kind:'undo'});v.save();},v=>{velen.apply(v.state,{kind:'view',id:'mercy',stage:3});v.save();}];
  for(const step of steps){step(va);step(vb);assert.equal(a.getItem(LEGACY),b.getItem(LEGACY),'byte-identical write for '+text);assert.equal(va.status.textContent,'');}
 }
});
test('a refused handover (newer canonical) does not affect the guard: valid legacy keeps saving, unreadable legacy is kept',()=>{
 const s=store({[CANON]:'{"schema":2}',[LEGACY]:'{bad'});const r=visit(s,current,browse);assert.equal(r.hand,'newer-canonical');assert.equal(s.getItem(LEGACY),'{bad');assert.equal(s.getItem(CANON),'{"schema":2}');
});
