'use strict';
// v45 QA6: start-up when the browser denies localStorage access (finding D4: in QA5 the `localStorage` getter threw at
// velen-r18.js:19 while the Nilfgaardian owner was being built, the error escaped createPhoenixVelen() at app.js:380, and
// the initial render never ran - a blank page). Executes the real code: the guarded storage acquisition from
// velen-r18.js (extracted verbatim), the real Nilfgaardian owner (velen-nilf-progress.js), the real Slice 1 import, and the
// real White Orchard loader/persist region of app.js, each with a `localStorage` getter that throws SecurityError.
// The full page start-up and Home -> Velen -> quest -> return in a browser are covered by qa/wo-save-preservation/probe.cjs.
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const h=require('./velen-nilf-progress.js'),m=require('./velen-migration.js');
const R18=fs.readFileSync(path.join(__dirname,'velen-r18.js'),'utf8'),APP=fs.readFileSync(path.join(__dirname,'app.js'),'utf8');
// The getter is installed from inside the context: an accessor on the sandbox object is not seen by global lookups.
const deny=c=>vm.runInContext('Object.defineProperty(globalThis,"localStorage",{configurable:true,get(){const e=new Error("The operation is insecure.");e.name="SecurityError";throw e;}})',c);
const denied=()=>{const c={};vm.createContext(c);deny(c);return c;};
const acquisition=()=>{const a=R18.indexOf('const nilfStorage='),b=R18.indexOf('const nilfUI=');assert.ok(a>0&&b>a,'guarded acquisition not found before the Nilfgaardian UI');return R18.slice(a,b);};

test('velen-r18.js reads the localStorage getter only inside the guarded acquisition and passes the guarded value on',()=>{
 const line=R18.slice(R18.indexOf('const nilfUI='),R18.indexOf('\n',R18.indexOf('const nilfUI=')));
 assert.match(line,/\{storage:nilfStorage,/);assert.doesNotMatch(line,/storage:localStorage/);
 assert.doesNotMatch(acquisition(),/catch\{\}/,'no silent catch: the stand-in re-throws the original error on use');
});
test('denied access: acquisition does not throw; the stand-in re-throws the original SecurityError on every call',()=>{
 const c=denied();assert.throws(()=>vm.runInContext('localStorage',c),e=>e.name==='SecurityError','the simulated denial is real');
 const s=vm.runInContext(acquisition()+';nilfStorage',c);
 for(const op of ['getItem','setItem','removeItem'])assert.throws(()=>s[op]('k','v'),e=>e.name==='SecurityError',op);
});
test('working storage: acquisition returns the real localStorage object itself (no behaviour change)',()=>{
 const real={getItem(){return null;},setItem(){},removeItem(){}},c={localStorage:real};vm.createContext(c);
 assert.equal(vm.runInContext(acquisition()+';nilfStorage',c),real);
});
test('denied access: the Nilfgaardian owner reports storage-unavailable and never throws (load, handover, commit, undo, rollback)',()=>{
 const s=vm.runInContext(acquisition()+';nilfStorage',denied());
 assert.equal(h.load(s).owned,false);assert.equal(h.load(s).status,'storage-unavailable');
 assert.equal(h.handover(s).status,'storage-unavailable');
 assert.notEqual(h.commit(s,h.load(s).progress).status,'saved');assert.equal(h.undo(s).status,'nothing-to-undo');
 assert.equal(h.rollbackHandover(s).restored,false);
 assert.doesNotThrow(()=>{try{m.importFromStorage(s);}catch(e){if(e.name!=='SecurityError')throw e;}},'Slice 1 import: app.js wraps it; only the storage error may surface');
});
test('denied access: the White Orchard loader and persist() run to completion with the storage-unavailable status',()=>{
 const a=APP.indexOf("  const key = 'phoenix.whiteorchard.interaction.v1';"),b=APP.indexOf('  function taskAnchor(');
 const c={};c.window=c;vm.createContext(c);for(const f of ['white-orchard.js','map-data.js','progression-data.js','progression-engine.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,f),'utf8'),c);
 const {tasks,hubs,groups}=c.PHOENIX_ROUTE,msg={textContent:'',dataset:{}};
 Object.assign(c,{tasks,hubs,groups,stages:tasks['q-firestarter'].stages.map(s=>s.id),progressEngine:c.createPhoenixProgress(c.PHOENIX_PROGRESS_DATA,tasks,hubs),history:{},document:{querySelectorAll:sel=>sel==='[data-save-message]'?[msg]:[]}});
 deny(c);
 const api=vm.runInContext(APP.slice(a,b)+';({persist})',c);
 assert.doesNotThrow(()=>{api.persist();api.persist();});
 assert.equal(msg.dataset.saveState,'storage-unavailable');assert.match(msg.textContent,/^Saving is unavailable/);assert.doesNotMatch(msg.textContent,/kept unchanged/);
});
test('start-up order is unchanged and createPhoenixVelen() is not wrapped in a blanket catch',()=>{
 const tail=APP.slice(APP.indexOf('PhoenixVelenMigration?.importFromStorage'));
 assert.match(tail,/^PhoenixVelenMigration\?\.importFromStorage\(localStorage\);\}catch\{\}/);
 // Issue #4 (shared walkthrough v1): exactly one rendering seam (comment + one optional-call line) is allowed between
 // createPhoenixVelen() and the views list; it is not wrapped in a catch either.
 assert.match(APP,/\n  window\.PhoenixVelen=window\.createPhoenixVelen\(\{navigate\}\);\n(?:  \/\/ Issue #4 seam[^\n]*\n  \/\/ [^\n]*\n  window\.PhoenixSharedWalkthrough=window\.createPhoenixSharedWalkthrough\?\.\(\{state,tasks,hubs,engine:progressEngine,navigate\}\);\n)?  views=\[\.\.\.document\.querySelectorAll\('\.view'\)\];\n  addEventListener\('phoenix:views-ready',\(\)=>render\(\{mode:'initial'\}\)\);\n  updateTree\(\);render\(\);\n\}\)\(\);/,'unrelated init errors still surface');
});
