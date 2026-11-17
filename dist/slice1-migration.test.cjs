'use strict';
// v44 Slice 1: Velen stable IDs, explicit regional prerequisites and legacy Velen import.
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const velen=require('./velen-data-r18.js'),registry=require('./regional-registry.js'),m=require('./velen-migration.js');
const LEGACY='phoenix.velen.arrival.v1',CANON='phoenix.region.velen.v1';
function store(init={},{failWrites=false}={}){const map=new Map(Object.entries(init));return {map,getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>{if(failWrites)throw Error('quota');map.set(k,String(v));},removeItem:k=>{map.delete(k);},snapshot:()=>Object.fromEntries(map)};}
const withLegacy=raw=>store({[LEGACY]:typeof raw==='string'?raw:JSON.stringify(raw)});
const canon=s=>JSON.parse(s.getItem(CANON));
const completes=r=>Object.fromEntries(Object.values(r.activities).map(a=>[a.id,a.complete]));
function loadWO(){const c={window:{}};vm.createContext(c);for(const f of ['white-orchard.js','map-data.js','diagrams-data.js','exploration-data.js','progression-data.js','progression-engine.js','departure.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);const w=c.window;return {w,data:w.PHOENIX_PROGRESS_DATA,tasks:w.PHOENIX_ROUTE.tasks,e:w.createPhoenixProgress(w.PHOENIX_PROGRESS_DATA,w.PHOENIX_ROUTE.tasks,w.PHOENIX_ROUTE.hubs)};}

// --- Stable IDs and regional prerequisites -------------------------------------------------
test('Velen activities have stable IDs mapped one-to-one to legacy keys; leads are references only',()=>{
 assert.deepEqual({...velen.stableIds},{nilf:'velen.nilf',pyres:'velen.pyres',mercy:'velen.mercy'});
 assert.deepEqual({...velen.leadIds},{baron:'velen.lead.baron',witch:'velen.lead.witch'});
 const r=registry.regions.velen;assert.deepEqual(Object.keys(r.activities),['velen.nilf','velen.pyres','velen.mercy']);
 for(const [id,a] of Object.entries(r.activities)){assert.equal(a.id,id);assert.equal(velen.stableIds[a.legacy],id);assert.ok(velen.quests[a.legacy]);}
 for(const [id,ref] of Object.entries(r.references)){assert.equal(ref.reference,true);assert.deepEqual([...ref.requires],['velen.nilf']);assert.equal(velen.leadIds[ref.legacy],id);assert.equal(r.activities[id],undefined);}
});
test('Velen prerequisites are explicit and never inherit the White Orchard entry objective',()=>{
 const r=registry.regions.velen;assert.equal(r.entry,null);assert.deepEqual([...r.prerequisites],[]);
 for(const a of [...Object.values(r.activities),...Object.values(r.references)]){assert.ok(Array.isArray(a.requires)||Object.isFrozen(a.requires));for(const req of a.requires)assert.ok(!req.startsWith('q-'),a.id+' must not require a White Orchard objective');}
 assert.equal(registry.regions['white-orchard'].entry,'q-lilac:ghouls');
});
test('Velen objective records carry actual https source URLs, not source names',()=>{
 for(const a of Object.values(registry.regions.velen.activities)){assert.match(a.source,/^https:\/\/[^\s]+$/);assert.equal(a.source,velen.quests[a.legacy].source);}
 for(const ref of Object.values(registry.regions.velen.references))assert.match(ref.source,/^https:\/\//);
});
test('White Orchard prerequisites are authored explicitly; no implicit injection remains',()=>{
 const src=fs.readFileSync('progression-data.js','utf8');assert.ok(!/o\.requires\s*=\s*\[/.test(src),'progression-data.js must not inject prerequisites');
 const {data}=loadWO();
 for(const [qid,q] of Object.entries(data.quests)){assert.equal(q.region,'white-orchard');for(const o of q.objectives){assert.equal(o.region,'white-orchard');assert.match(o.source,/^https:\/\/www\.witcher\.tools\/quests\//);assert.equal(o.source,q.source);if(o.id!=='q-lilac:ghouls')assert.ok(o.requires.length>0,o.id+' has no explicit prerequisite');}}
 assert.equal(data.objectiveIndex['q-lilac:ghouls'].requires.length,0);assert.equal(data.regions['white-orchard'].entry,'q-lilac:ghouls');
});
test('a regional extension quest with no prerequisite is not given q-lilac:ghouls',()=>{
 // Re-run the data module with an extra regional quest appended through the same quest() helper.
 const src=fs.readFileSync('progression-data.js','utf8').replace(' // v44 Slice 1: White Orchard entry',' quest(\'q-ext\',\'ext\',[[\'start\',\'Begin elsewhere.\',\'Elsewhere\']]);\n // v44 Slice 1: White Orchard entry');assert.ok(src.includes("quest('q-ext'"));
 const c={window:{}};vm.createContext(c);vm.runInContext(src,c);assert.deepEqual([...c.window.PHOENIX_PROGRESS_DATA.objectiveIndex['q-ext:start'].requires],[]);
});

// --- White Orchard behaviour is unchanged -----------------------------------------------------
test('White Orchard objective graph and 270 progression/branch/departure/correction scenarios match untouched v44',()=>{
 const expected=JSON.parse(fs.readFileSync('slice1-wo-baseline.fixture.json','utf8')),actual=require('./slice1-wo-scenarios.cjs').run(__dirname);
 assert.deepEqual(actual.graph,expected.graph);
 assert.deepEqual(Object.keys(actual.scenarios),Object.keys(expected.scenarios));
 for(const k of Object.keys(expected.scenarios))assert.deepEqual(actual.scenarios[k],expected.scenarios[k],k);
});
test('WO prerequisites: arrival still gates regional availability and catch-up still includes the entry objective',()=>{
 const {e}=loadWO(),p=e.init();assert.equal(e.availability('q-pan',p),'unknown');
 const r=e.plan(p,{},{kind:'objective',id:'q-viper:report',value:true});assert.deepEqual(new Set([...r.catchup]),new Set(['q-lilac:ghouls','q-viper:ruins']));assert.equal(e.availability('q-pan',r.progress),'available');
 const n=e.plan(p,{},{kind:'objective',id:'q-devil:notice',value:true});assert.deepEqual([...n.catchup],['q-lilac:ghouls']);
});
test('WO branching, departure and correction behave as in v44',()=>{
 const {e,data}=loadWO(),fresh=()=>e.init();
 const b=e.plan(fresh(),{},{kind:'quest',quest:'q-firestarter',value:true},{choices:{arson:'bribe'}});assert.equal(b.completed['q-firestarter'],true);assert.ok(e.closed(data.objectiveIndex['q-firestarter:escort'],b.progress));
 const started=e.plan(fresh(),{},{kind:'objective',id:'q-missing:dune',value:true}).progress,d=e.plan(started,{},{kind:'milestone',id:'departed'});assert.ok(d.failures.includes('q-missing'));assert.ok(d.closing.includes('q-firestarter'));
 const inn=e.plan(fresh(),{},{kind:'objective',id:'q-incident:bandits',value:true});assert.equal(e.facts(inn.progress).departed,undefined);assert.ok(inn.departureSuggestion);
 const all=e.plan(fresh(),{},{kind:'objective',id:'q-lilac:leave',value:true}).progress,c=e.plan(all,{},{kind:'objective',id:'q-beast:kill',value:false});assert.ok(c.affected.includes('q-lilac:leave'));assert.ok(c.removedMilestones.includes('departed'));
});

// --- Legacy Velen import ----------------------------------------------------------------------
test('empty storage and an empty legacy record',()=>{
 const none=store();assert.equal(m.importFromStorage(none).status,'no-legacy');assert.deepEqual(none.snapshot(),{});
 const s=withLegacy({}),r=m.importFromStorage(s);assert.equal(r.status,'imported');const c=canon(s);
 assert.deepEqual(completes(c),{'velen.nilf':false,'velen.pyres':false,'velen.mercy':false});assert.deepEqual(c.choices,{});assert.deepEqual(c.ignored,[]);assert.equal(c.origin.key,LEGACY);assert.equal(c.origin.legacyVersion,null);
});
test('corrupt legacy data is never imported or modified',()=>{
 for(const bad of ['not json','{"complete":','[]','null','42','"text"','true']){const s=store({[LEGACY]:bad}),before=s.snapshot();assert.equal(m.importFromStorage(s).status,'legacy-unreadable',bad);assert.deepEqual(s.snapshot(),before);}
 const odd=withLegacy({complete:'all',choices:['peace'],stage:'x'}),r=m.importFromStorage(odd);assert.equal(r.status,'imported');assert.deepEqual(completes(canon(odd)),{'velen.nilf':false,'velen.pyres':false,'velen.mercy':false});assert.deepEqual(canon(odd).choices,{});
});
test('the three whole-activity completion marks import independently',()=>{
 for(const id of ['nilf','pyres','mercy']){const s=withLegacy({version:1,complete:{[id]:true}});m.importFromStorage(s);const c=completes(canon(s));for(const other of ['nilf','pyres','mercy'])assert.equal(c['velen.'+other],other===id,id+'→'+other);}
 const all=withLegacy({complete:{nilf:true,pyres:true,mercy:true}});m.importFromStorage(all);assert.deepEqual(completes(canon(all)),{'velen.nilf':true,'velen.pyres':true,'velen.mercy':true});
 const odd=withLegacy({complete:{nilf:'true',pyres:1,mercy:false}});m.importFromStorage(odd);assert.deepEqual(completes(canon(odd)),{'velen.nilf':false,'velen.pyres':false,'velen.mercy':false});assert.deepEqual(canon(odd).ignored,['complete.nilf','complete.pyres']);
});
test('completion imports without inventing per-objective or per-stage marks',()=>{
 const s=withLegacy({complete:{nilf:true,pyres:true,mercy:true},stage:{nilf:4,pyres:3,mercy:1}});m.importFromStorage(s);
 for(const a of Object.values(canon(s).activities)){assert.deepEqual(a.objectives,{});assert.deepEqual(Object.keys(a).sort(),['complete','id','legacy','objectives','requires','source'].sort());assert.match(a.source,/^https:\/\//);}
});
test('both choices import with every valid value; unknown branch values never become outcomes',()=>{
 for(const inn of ['peace','fight'])for(const mercy of ['freed','left']){const s=withLegacy({choices:{inn,mercy}});m.importFromStorage(s);const c=canon(s);assert.deepEqual(c.choices.inn,{activity:'velen.nilf',value:inn,source:velen.quests.nilf.source});assert.deepEqual(c.choices.mercy,{activity:'velen.mercy',value:mercy,source:velen.quests.mercy.source});assert.deepEqual(c.ignored,[]);assert.deepEqual(completes(c),{'velen.nilf':false,'velen.pyres':false,'velen.mercy':false},'a choice must not imply completion');}
 for(const bad of ['PEACE','both','fought',1,true,null,'',{value:'peace'}]){const s=withLegacy({choices:{inn:bad,mercy:bad}});m.importFromStorage(s);const c=canon(s);assert.deepEqual(c.choices,{},JSON.stringify(bad));assert.deepEqual(c.ignored,['choices.inn','choices.mercy']);}
 const one=withLegacy({complete:{mercy:true},choices:{inn:'fight'}});m.importFromStorage(one);assert.equal(canon(one).choices.mercy,undefined,'completion must not invent a choice');assert.equal(canon(one).choices.inn.value,'fight');
});
test('partially recorded reading positions are preserved and never treated as completion',()=>{
 const raw={version:1,selected:'pyres',stage:{nilf:4},last:{id:'mercy'},undo:{complete:{nilf:true,pyres:true,mercy:true},choices:{inn:'fight',mercy:'left'}}},text=JSON.stringify(raw),s=store({[LEGACY]:text});
 const viewBefore=velen.initial(JSON.parse(text));m.importFromStorage(s);const c=canon(s);
 assert.deepEqual(completes(c),{'velen.nilf':false,'velen.pyres':false,'velen.mercy':false});assert.deepEqual(c.choices,{});
 for(const k of ['stage','selected','lastHub','last','undo'])assert.equal(c[k],undefined,k+' must not be copied into the canonical record');
 assert.equal(s.getItem(LEGACY),text);assert.deepEqual(velen.initial(JSON.parse(s.getItem(LEGACY))),viewBefore);
 assert.equal(viewBefore.stage.nilf,4);assert.equal(viewBefore.selected,'pyres');assert.equal(viewBefore.lastHub,'nilf');assert.deepEqual(viewBefore.last,{id:'mercy'});assert.equal(viewBefore.undo.complete.nilf,true);
});
test('repeat import is idempotent and byte-stable; later legacy edits refresh only import-owned data',()=>{
 const s=withLegacy({version:1,complete:{pyres:true},choices:{mercy:'freed'},stage:{pyres:2}});assert.equal(m.importFromStorage(s).status,'imported');const first=s.snapshot();
 for(let i=0;i<3;i++){assert.equal(m.importFromStorage(s).status,'unchanged');assert.deepEqual(s.snapshot(),first);}
 // Reading-only changes in the legacy record do not alter the import.
 const st=velen.initial(JSON.parse(s.getItem(LEGACY)));velen.apply(st,{kind:'view',id:'nilf',stage:3});s.setItem(LEGACY,JSON.stringify(st));assert.equal(m.importFromStorage(s).status,'unchanged');
 // The v44 Velen view still writes the legacy key; a recorded change is reflected once.
 velen.apply(st,{kind:'complete',id:'nilf',value:true});s.setItem(LEGACY,JSON.stringify(st));assert.equal(m.importFromStorage(s).status,'refreshed');assert.equal(canon(s).activities['velen.nilf'].complete,true);assert.equal(m.importFromStorage(s).status,'unchanged');
});
test('newer or non-import canonical data is never overwritten by the legacy record',()=>{
 const legacy=JSON.stringify({complete:{nilf:true}});
 for(const [existing,status] of [[{schema:2,region:'velen',activities:{}},'newer-canonical'],[{schema:1,region:'velen',origin:{kind:'canonical'},activities:{}},'canonical-kept'],['{broken','canonical-unreadable'],[{region:'velen'},'canonical-unreadable']]){
  const s=store({[LEGACY]:legacy,[CANON]:typeof existing==='string'?existing:JSON.stringify(existing)}),before=s.snapshot();assert.equal(m.importFromStorage(s).status,status);assert.deepEqual(s.snapshot(),before);}
});
test('the legacy record is retained byte-for-byte and the v44 Velen loader reads it unchanged',()=>{
 const text='{"version":1,"selected":"mercy","lastHub":"pyres","complete":{"nilf":true,"pyres":false,"mercy":true},"stage":{"nilf":4,"pyres":2,"mercy":1},"choices":{"inn":"peace","mercy":"left"},"last":{"id":"pyres"},"undo":{"complete":{"nilf":false,"pyres":false,"mercy":true},"choices":{"inn":"peace"}}}',s=store({[LEGACY]:text});
 m.importFromStorage(s);m.importFromStorage(s);assert.equal(s.getItem(LEGACY),text);
 const r18=fs.readFileSync('velen-r18.js','utf8');assert.ok(r18.includes("key='phoenix.velen.arrival.v1'"));assert.ok(!r18.includes(CANON),'the v44 Velen view must not read the canonical record in Slice 1');
});
test('rollback removes only the unchanged owned canonical record and restores the exact pre-import storage',()=>{
 const s=store({[LEGACY]:JSON.stringify({complete:{nilf:true},choices:{inn:'fight'},stage:{nilf:3}}),'phoenix.whiteorchard.interaction.v1':'{"version":1}'}),before=s.snapshot();
 m.importFromStorage(s);assert.ok(s.getItem(CANON));assert.deepEqual(m.rollback(s),{status:'removed',removed:true});assert.deepEqual(s.snapshot(),before);assert.deepEqual(m.rollback(s),{status:'absent',removed:false});assert.deepEqual(s.snapshot(),before);
 assert.equal(m.importFromStorage(s).status,'imported','import can be re-run after rollback');
 // A refreshed (still owned, unchanged) record is also removable.
 const st=velen.initial(JSON.parse(s.getItem(LEGACY)));velen.apply(st,{kind:'complete',id:'mercy',value:true});s.setItem(LEGACY,JSON.stringify(st));assert.equal(m.importFromStorage(s).status,'refreshed');const legacyText=s.getItem(LEGACY);assert.equal(m.rollback(s).status,'removed');assert.equal(s.getItem(CANON),null);assert.equal(s.getItem(LEGACY),legacyText);
});
test('unavailable storage never throws or touches the legacy record',()=>{
 const legacy=JSON.stringify({complete:{pyres:true}}),s=store({[LEGACY]:legacy},{failWrites:true});assert.equal(m.importFromStorage(s).status,'save-unavailable');assert.equal(s.getItem(LEGACY),legacy);
 assert.equal(m.importFromStorage({getItem(){throw Error('denied');}}).status,'storage-unavailable');
});
test('init seam: migration loads after Velen data and runs before the Velen view initializes',()=>{
 const html=fs.readFileSync('index.html','utf8'),at=f=>html.indexOf('src="'+f);
 assert.ok(at('velen-data-r18.js')<at('regional-registry.js')&&at('regional-registry.js')<at('velen-migration.js')&&at('velen-migration.js')<at('velen-r18.js')&&at('velen-migration.js')<at('app.js'));
 const app=fs.readFileSync('app.js','utf8');assert.ok(app.indexOf('PhoenixVelenMigration?.importFromStorage(localStorage)')>0);assert.ok(app.indexOf('PhoenixVelenMigration?.importFromStorage(localStorage)')<app.indexOf('createPhoenixVelen({navigate})'));
 // The browser path uses the window globals, without require().
 const c={window:{}};vm.createContext(c);for(const f of ['velen-data-r18.js','regional-registry.js','velen-migration.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);assert.equal(c.window.PhoenixVelenMigration.CANONICAL_KEY,CANON);
});

// --- QA corrections: ownership/change guard for refresh and rollback --------------------------
const LEGACY_TEXT=JSON.stringify({version:1,complete:{nilf:false,pyres:true,mercy:false},choices:{inn:'peace'},stage:{nilf:2}});
function owned(){const s=store({[LEGACY]:LEGACY_TEXT});assert.equal(m.importFromStorage(s).status,'imported');return s;}
function editCanon(s,fn){const c=canon(s);fn(c);s.setItem(CANON,JSON.stringify(c));return s.getItem(CANON);}
test('written records are sealed with a verifiable fingerprint of exactly what the migration wrote',()=>{
 const s=owned(),c=canon(s);assert.equal(c.migration.writer,m.WRITER);assert.match(c.migration.fingerprint,/^cyrb53:[0-9a-f]{28}:\d+$/);assert.equal(m.fingerprint(c),c.migration.fingerprint);assert.equal(m.ownership(c),'owned');
 // Key order is not an edit: the fingerprint is over a stable serialization.
 const reordered=JSON.stringify(Object.fromEntries(Object.entries(c).reverse()));s.setItem(CANON,reordered);assert.equal(m.importFromStorage(s).status,'unchanged');assert.equal(s.getItem(CANON),reordered);
});
test('rollback preserves a newer-schema canonical record and never touches the legacy key',()=>{
 const text=JSON.stringify({schema:2,region:'velen',origin:{kind:'legacy-import'},activities:{'velen.nilf':{complete:true}}}),s=store({[LEGACY]:LEGACY_TEXT,[CANON]:text});
 assert.deepEqual(m.rollback(s),{status:'newer-canonical',removed:false});assert.equal(s.getItem(CANON),text);assert.equal(s.getItem(LEGACY),LEGACY_TEXT);
});
test('rollback preserves native, non-import, unsealed and unreadable canonical records',()=>{
 const sealed=canon(owned());
 for(const [value,status] of [[{schema:1,region:'velen',origin:{kind:'canonical'},activities:{}},'canonical-kept'],[{schema:1,region:'velen',activities:{}},'canonical-kept'],
  // Import provenance alone is not ownership: a pre-correction/forged import record without a valid seal is kept.
  [{...sealed,migration:undefined},'canonical-kept'],[{...sealed,migration:{writer:'someone-else',fingerprint:sealed.migration.fingerprint}},'canonical-kept'],[{...sealed,origin:{kind:'canonical'}},'canonical-kept'],
  ['{broken','canonical-unreadable'],[{region:'velen'},'canonical-unreadable']]){
  const text=typeof value==='string'?value:JSON.stringify(value),s=store({[LEGACY]:LEGACY_TEXT,[CANON]:text});
  assert.deepEqual(m.rollback(s),{status,removed:false},text);assert.equal(s.getItem(CANON),text);assert.equal(s.getItem(LEGACY),LEGACY_TEXT);
  assert.equal(m.importFromStorage(s).status,status,'import must not overwrite it either');assert.equal(s.getItem(CANON),text);assert.equal(s.getItem(LEGACY),LEGACY_TEXT);}
});
test('rollback preserves an import record later edited by the canonical side',()=>{
 for(const edit of [c=>{c.activities['velen.nilf'].objectives={'velen.nilf:inn':'done'};},c=>{c.activities['velen.pyres'].complete=false;},c=>{c.choices.inn.value='fight';},c=>{c.note='canonical';},c=>{c.migration.fingerprint='cyrb53:0:0';}]){
  const s=owned(),text=editCanon(s,edit);assert.deepEqual(m.rollback(s),{status:'canonical-edited',removed:false});assert.equal(s.getItem(CANON),text);assert.equal(s.getItem(LEGACY),LEGACY_TEXT);}
});
test('rollback removes an unchanged owned record and leaves the legacy key byte-identical',()=>{
 const s=owned();assert.equal(m.ownership(canon(s)),'owned');assert.deepEqual(m.rollback(s),{status:'removed',removed:true});assert.equal(s.getItem(CANON),null);assert.equal(s.getItem(LEGACY),LEGACY_TEXT);assert.deepEqual(s.snapshot(),{[LEGACY]:LEGACY_TEXT});
 assert.equal(m.rollback({getItem(){throw Error('denied');}}).status,'storage-unavailable');
});
test('refresh never erases canonical-recorded objectives or reverts canonical completion',()=>{
 const s=owned(),text=editCanon(s,c=>{c.activities['velen.nilf'].objectives={'velen.nilf:inn':'done','velen.nilf:heatherton':'done'};c.activities['velen.nilf'].complete=true;c.activities['velen.mercy'].complete=true;});
 // The legacy side changes completion and a choice afterwards: an unguarded refresh would replace the record.
 const st=velen.initial(JSON.parse(LEGACY_TEXT));velen.apply(st,{kind:'complete',id:'pyres',value:false});velen.apply(st,{kind:'choice',key:'inn',value:'fight'});s.setItem(LEGACY,JSON.stringify(st));const legacyText=s.getItem(LEGACY);
 for(let i=0;i<3;i++){assert.equal(m.importFromStorage(s).status,'canonical-edited');assert.equal(s.getItem(CANON),text);assert.equal(s.getItem(LEGACY),legacyText);}
 const c=canon(s);assert.deepEqual(c.activities['velen.nilf'].objectives,{'velen.nilf:inn':'done','velen.nilf:heatherton':'done'});assert.equal(c.activities['velen.nilf'].complete,true);assert.equal(c.activities['velen.mercy'].complete,true);assert.equal(c.activities['velen.pyres'].complete,true);assert.equal(c.choices.inn.value,'peace');
});
test('an unchanged owned record still refreshes when legacy completion or choices change, then stays idempotent',()=>{
 const s=owned(),st=velen.initial(JSON.parse(LEGACY_TEXT));
 velen.apply(st,{kind:'complete',id:'nilf',value:true});s.setItem(LEGACY,JSON.stringify(st));assert.equal(m.importFromStorage(s).status,'refreshed');assert.equal(canon(s).activities['velen.nilf'].complete,true);assert.equal(m.ownership(canon(s)),'owned');
 velen.apply(st,{kind:'choice',key:'mercy',value:'left'});s.setItem(LEGACY,JSON.stringify(st));assert.equal(m.importFromStorage(s).status,'refreshed');assert.equal(canon(s).choices.mercy.value,'left');
 velen.apply(st,{kind:'complete',id:'pyres',value:false});s.setItem(LEGACY,JSON.stringify(st));assert.equal(m.importFromStorage(s).status,'refreshed');assert.equal(canon(s).activities['velen.pyres'].complete,false);
 const snap=s.snapshot();for(let i=0;i<3;i++){assert.equal(m.importFromStorage(s).status,'unchanged');assert.deepEqual(s.snapshot(),snap);}
 assert.equal(s.getItem(LEGACY),JSON.stringify(st));
});
