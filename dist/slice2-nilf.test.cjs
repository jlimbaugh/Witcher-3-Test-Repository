'use strict';
// v45 Slice 2: The Nilfgaardian Connection (velen.nilf) on the White Orchard template, with progress ownership
// handed over to the canonical regional record. Covers the handover, completion preservation, the conditional
// inn fight, untouched pyres/mercy ownership, the Slice 1 guard, guarded rollback and the static wiring seam.
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto');
const m=require('./velen-migration.js'),data=require('./velen-nilf-objectives.js'),h=require('./velen-nilf-progress.js');
const LEGACY='phoenix.velen.arrival.v1',CANON='phoenix.region.velen.v1',Q='velen.nilf',e=h.engine,O=id=>Q+':'+id;
function store(init={},{failWrites=false,failReads=false}={}){const map=new Map(Object.entries(init));return {map,getItem:k=>{if(failReads)throw Error('denied');return map.has(k)?map.get(k):null;},setItem:(k,v)=>{if(failWrites)throw Error('quota');map.set(k,String(v));},removeItem:k=>{map.delete(k);},snapshot:()=>Object.fromEntries(map)};}
const canon=s=>JSON.parse(s.getItem(CANON));
const legacyText=JSON.stringify({version:1,selected:'pyres',lastHub:'mercy',complete:{nilf:true,pyres:true,mercy:false},stage:{nilf:4,pyres:3,mercy:2},choices:{mercy:'left'},last:{id:'mercy'}});
const act=(p,id,value=true,extra={})=>h.plan(p,{kind:'objective',id:O(id),value,...extra},{catchup:true,choices:extra.choices||{}});
const marks=p=>Object.keys(p.objectives).map(k=>k.split(':')[1]).sort().join(',');

// --- Objectives: sourced journal objectives only -------------------------------------------
test('objectives are the sourced journal objectives with https sources; reading the notes stays in the final search',()=>{
 const ids=Object.keys(data.objectiveIndex);
 assert.deepEqual(ids,['travel','inn','ask','fight','finish','look','survivor','find','search'].map(O));
 for(const o of Object.values(data.objectiveIndex)){assert.match(o.source||data.source,/^https:\/\//);assert.ok(o.label.length>5);}
 assert.match(data.routeSource,/^https:\/\/witcher\.fandom\.com\/wiki\/The_Nilfgaardian_Connection/);assert.equal(data.choices.inn.routeSource,data.routeSource);
 assert.equal(data.source,'https://www.witcher.tools/quests/the-nilfgaardian-connection');
 assert.match(data.objectiveIndex[O('search')].note,/notes/i);
 assert.ok(!ids.some(id=>/read|note/i.test(id)),'reading the notes is not a separate objective');
 assert.deepEqual(data.choices.inn.options.map(o=>o[0]),['peace','fight','direct']);
});
test('conditional inn fight: 8 required without the fight, 9 when fought; peace closes the fight objective',()=>{
 const p0=e.init();assert.equal(e.counts(Q,p0).total,8);
 const fight=e.init({schema:1,objectives:{},choices:{inn:'fight'}});assert.equal(e.counts(Q,fight).total,9);
 assert.equal(e.closed(data.objectiveIndex[O('fight')],fight),false);
 const peace=e.init({schema:1,objectives:{},choices:{inn:'peace'}});assert.equal(e.counts(Q,peace).total,8);
 assert.equal(e.closed(data.objectiveIndex[O('fight')],peace),true);
 const plan=act(p0,'search');assert.deepEqual(plan.missingChoices,['inn'],'catching up past the inn asks for the outcome instead of guessing');
 const viaFight=act(p0,'search',true,{choices:{inn:'fight'}});assert.equal(viaFight.progress.objectives[O('fight')],'done');assert.equal(e.done(Q,viaFight.progress),true);
 const viaPeace=act(p0,'search',true,{choices:{inn:'peace'}});assert.equal(viaPeace.progress.objectives[O('fight')],undefined);assert.equal(e.done(Q,viaPeace.progress),true);
 const half=act(fight,'finish');assert.equal(half.progress.objectives[O('fight')],'done','finishing after a fight requires the fight');
});

// --- Handover --------------------------------------------------------------------------------
test('fresh storage: handover creates a native canonical record that owns only velen.nilf',()=>{
 const s=store();assert.equal(h.handover(s).status,'handed-over');const r=canon(s);
 assert.equal(r.origin.kind,'canonical');assert.equal(r.migration,undefined);
 assert.deepEqual(r.owners,{[Q]:CANON,'velen.pyres':LEGACY,'velen.mercy':LEGACY});
 assert.deepEqual(r.activities[Q].objectives,{});assert.equal(r.activities[Q].complete,false);
 assert.equal(r.handover.before,null);assert.equal(s.getItem(LEGACY),null,'never creates the legacy record');
 assert.equal(h.handover(s).status,'already-handed-over');assert.equal(JSON.stringify(canon(s)),JSON.stringify(r),'idempotent');
});
test('imported legacy completion is kept without inventing objective marks; unknown inn outcome stays unknown',()=>{
 const s=store({[LEGACY]:legacyText});assert.equal(m.importFromStorage(s).status,'imported');const imported=s.getItem(CANON);
 assert.equal(h.handover(s).status,'handed-over');const r=canon(s),a=r.activities[Q];
 assert.equal(a.complete,true);assert.equal(a.legacyComplete,true);assert.deepEqual(a.objectives,{});assert.equal(r.choices.inn,undefined);
 assert.equal(r.handover.importedComplete,true);assert.equal(r.handover.before,imported);
 const l=h.load(s);assert.equal(l.owned,true);assert.equal(l.complete,true);assert.equal(l.legacyComplete,true);
 assert.deepEqual(e.counts(Q,l.progress),{done:0,total:8,optionalDone:0,optionalTotal:0});assert.equal(e.status(Q,l.progress),'complete');
 assert.equal(s.getItem(LEGACY),legacyText,'legacy record byte-identical');
});
test('an imported inn choice is carried over as the canonical choice',()=>{
 const s=store({[LEGACY]:JSON.stringify({version:1,complete:{nilf:false},stage:{nilf:3},choices:{inn:'fight'}})});m.importFromStorage(s);
 h.handover(s);const l=h.load(s);assert.equal(l.progress.choices.inn,'fight');assert.equal(e.counts(Q,l.progress).total,9);assert.equal(l.complete,false);
});
test('pyres and mercy stay owned by the legacy record: their saves and imported snapshots are untouched',()=>{
 const s=store({[LEGACY]:legacyText});m.importFromStorage(s);const before=canon(s);h.handover(s);const after=canon(s);
 for(const id of ['velen.pyres','velen.mercy'])assert.deepEqual(after.activities[id],before.activities[id]);
 assert.equal(after.owners['velen.pyres'],LEGACY);assert.equal(after.owners['velen.mercy'],LEGACY);
 const l=h.load(s);let p=act(l.progress,'travel').progress;assert.equal(h.commit(s,p).status,'saved');
 const c=canon(s);for(const id of ['velen.pyres','velen.mercy'])assert.deepEqual(c.activities[id],before.activities[id]);
 assert.deepEqual(c.choices.mercy,before.choices.mercy);assert.equal(s.getItem(LEGACY),legacyText);
});
test('Slice 1 guard: after the handover, import and migration rollback keep the canonical record',()=>{
 const s=store({[LEGACY]:legacyText});m.importFromStorage(s);h.handover(s);const snap=s.snapshot();
 assert.equal(m.importFromStorage(s).status,'canonical-kept');assert.deepEqual(s.snapshot(),snap);
 const rb=m.rollback(s);assert.equal(rb.removed,false);assert.deepEqual(s.snapshot(),snap);
 // A later legacy edit (e.g. pyres completed in the legacy hub) never refreshes over the handed-over record.
 s.setItem(LEGACY,JSON.stringify({...JSON.parse(legacyText),complete:{nilf:false,pyres:true,mercy:true}}));const c=s.getItem(CANON);
 m.importFromStorage(s);assert.equal(s.getItem(CANON),c);
});
test('handover never overwrites newer, unreadable or unavailable storage',()=>{
 for(const text of ['{"schema":2,"activities":{}}','not json','[]']){const s=store({[CANON]:text}),snap=s.snapshot();assert.notEqual(h.handover(s).status,'handed-over');assert.deepEqual(s.snapshot(),snap);assert.equal(h.load(s).owned,false);}
 assert.equal(h.handover(store({},{failReads:true})).status,'storage-unavailable');
 const w=store({},{failWrites:true});assert.notEqual(h.handover(w).status,'handed-over');assert.equal(w.map.size,0);
});
test('an existing native canonical record keeps its other content through the handover',()=>{
 const native={schema:1,region:'velen',origin:{kind:'canonical'},activities:{'velen.other':{id:'velen.other',x:1}},choices:{other:{value:1}},ignored:['a'],extra:{keep:true}};
 const s=store({[CANON]:JSON.stringify(native)});h.handover(s);const r=canon(s);
 assert.deepEqual(r.activities['velen.other'],native.activities['velen.other']);assert.deepEqual(r.choices.other,native.choices.other);assert.deepEqual(r.extra,{keep:true});assert.deepEqual(r.ignored,['a']);
});

// --- Progress writes ------------------------------------------------------------------------
test('commit records objectives and the inn outcome in canonical; one Undo restores the prior state',()=>{
 const s=store();h.handover(s);let l=h.load(s);
 const p=act(l.progress,'finish',true,{choices:{inn:'fight'}}).progress;assert.equal(h.commit(s,p).status,'saved');
 const r=canon(s);assert.equal(r.activities[Q].objectives[O('fight')],'done');assert.deepEqual(r.choices.inn,{activity:Q,value:'fight',source:data.source});
 l=h.load(s);assert.deepEqual(e.counts(Q,l.progress),{done:5,total:9,optionalDone:0,optionalTotal:0});assert.equal(l.undo,true);
 assert.equal(h.undo(s).status,'saved');l=h.load(s);assert.deepEqual(l.progress.objectives,{});assert.equal(canon(s).choices.inn,undefined);
 assert.equal(h.undo(s).status,'nothing-to-undo');
});
test('legacy-complete quest: recording objectives keeps the whole-quest completion; removing the quest clears it',()=>{
 const s=store({[LEGACY]:legacyText});m.importFromStorage(s);h.handover(s);let l=h.load(s);
 h.commit(s,act(l.progress,'travel').progress);l=h.load(s);assert.equal(l.complete,true);assert.equal(l.legacyComplete,true);
 const rm=e.plan(l.progress,{},{kind:'quest',quest:Q,value:false},{});h.commit(s,rm.progress);l=h.load(s);
 assert.equal(l.complete,false);assert.equal(l.legacyComplete,false);assert.equal(canon(s).activities[Q].complete,false);
 assert.equal(s.getItem(LEGACY),legacyText,'the legacy record is never rewritten by canonical progress');
});
test('unknown objective keys written by another writer are preserved on commit',()=>{
 const s=store();h.handover(s);const r=canon(s);r.activities[Q].objectives['velen.nilf:future']='done';s.setItem(CANON,JSON.stringify(r));
 h.commit(s,act(h.load(s).progress,'travel').progress);assert.equal(canon(s).activities[Q].objectives['velen.nilf:future'],'done');
});

// --- Guarded rollback -----------------------------------------------------------------------
test('rollbackHandover restores the exact pre-handover storage only while the record is unchanged',()=>{
 const s=store({[LEGACY]:legacyText});m.importFromStorage(s);const pre=s.snapshot();h.handover(s);
 assert.deepEqual(h.rollbackHandover(s),{status:'restored',restored:true});assert.deepEqual(s.snapshot(),pre);
 assert.equal(h.rollbackHandover(s).status,'not-handed-over');
 const f=store();h.handover(f);assert.equal(h.rollbackHandover(f).status,'restored');assert.equal(f.getItem(CANON),null);assert.equal(h.rollbackHandover(f).status,'absent');
 const t=store({[LEGACY]:legacyText});m.importFromStorage(t);h.handover(t);h.commit(t,act(h.load(t).progress,'travel').progress);const kept=t.snapshot();
 assert.deepEqual(h.rollbackHandover(t),{status:'handover-edited',restored:false});assert.deepEqual(t.snapshot(),kept);
 assert.equal(t.getItem(LEGACY),legacyText);
 // After a restored rollback the Slice 1 migration guard and rollback apply again unchanged.
 const u=store({[LEGACY]:legacyText});m.importFromStorage(u);h.handover(u);h.rollbackHandover(u);assert.equal(m.rollback(u).removed,true);assert.deepEqual(u.snapshot(),{[LEGACY]:legacyText});
});

// --- Static wiring seam ---------------------------------------------------------------------
test('wiring seam: script order, app.js handover order and minimal velen-r18 delegation',()=>{
 const html=fs.readFileSync('index.html','utf8'),order=['progression-engine.js','velen-migration.js','velen-nilf-objectives.js','velen-nilf-progress.js','velen-nilf-ui.js','velen-r18.js','app.js'].map(f=>html.indexOf('src="'+f));
 assert.ok(order.every(i=>i>0));assert.deepEqual([...order].sort((a,b)=>a-b),order);
 const app=fs.readFileSync('app.js','utf8'),imp=app.indexOf('PhoenixVelenMigration?.importFromStorage'),hand=app.indexOf('PhoenixVelenNilfProgress?.handover'),view=app.indexOf('createPhoenixVelen(');
 assert.ok(imp>0&&hand>imp&&view>hand,'handover runs after the Slice 1 import and before the Velen view');
 const r18=fs.readFileSync('velen-r18.js','utf8');
 assert.ok(r18.includes('createPhoenixVelenNilfUI'));assert.ok(!r18.includes(CANON),'velen-r18.js never reads the canonical key itself');
 assert.ok(!/data-stage-(select|prev|next)/.test(fs.readFileSync('velen-nilf-ui.js','utf8')),'Velen UI never uses WO stage hooks');
 for(const hook of ['data-objective-check','data-objective-skip','data-quest-state','data-edit-choice','data-reconcile-legacy','data-undo-deck','data-story-update'])assert.ok(!fs.readFileSync('velen-nilf-ui.js','utf8').includes(hook+'"')&&!fs.readFileSync('velen-nilf-ui.js','utf8').includes(hook+'='),hook+' stays WO-only');
 const css=fs.readFileSync('velen-view.css','utf8');assert.match(css,/#velen > \.scene-inner\.console-r16\{background:[^}]*velen-landscape-r18\.webp/);
});
// Portable: pinned sha256 of the accepted v45 files (commit a9d61c94), so this runs in any checkout without a
// machine-specific baseline path. Optionally also byte-compares against PHOENIX_V45_BASELINE=<v45 dist dir>.
const PROTECTED={
  'progression-engine.js':'08a4f8c603f554b3cab32845667073dfb1cd74b99300310075fbcce947e78469',
  'progression-data.js':'ebb676bb859ffebcdd68704d6feae0c5d4a0a1180a147af3f0698da6f4d7ad24',
  'progression-ui.js':'ca0bd046387960ca4ea4cb59729719a14f3f4a92dd1f49e3fd3a621119c59cf0',
  'quest-hubs.js':'e02e19ba98f528eb3ca46263542b3b1a1134011d69698e3ccde2b9d153831b6f',
  'quest-pages.js':'43dd4397bbd463112b5512609d230b61658c79640a2d87cf71351e1d6df808cb',
  'velen-migration.js':'0642650fb58f325af2a78514cb5cefcf94ace487cde7013f6e9c69a20025c3b7',
  'regional-registry.js':'2879254792d8eb34af578e05f2c614cee5d0f317bc9edff3b48a5691a5cbd283',
  'velen-data-r18.js':'4b292527a495da0d2bd0dea2bb69007423debfb48e1b12ff09551c3d7d438af2',
  'velen-routing.js':'25224309ea4de7adebee80080359f54560b5139b0318fe7df05b1a087168c398',
  'main-console.js':'a4dcff365e74f31dbf0529b1e353540beb896c20edae01c59121339ae430ad7b',
  'console-r16.css':'737302d97dbd16cd664c8d1e3d2bfe39df8c0c12f673c861359ff1d5521c6960',
  'visual-system.js':'9e37cbafe5823a3e38aed070606e3e46ab37b55ad01763250e279461cad69bb3',
  'swipe-boxes.js':'7c8db40da453fc023fba2a769bbd763e8950ced57e3a10113499dbff089c40a8',
  'home-rebuild.css':'481357b1e0e9858d9c8b4a7343bd0fdb6e94d5445a6a4434863b146f29e6c347',
  'guide-viewport.css':'b69476c2d4a74370cbe8e118232a65557941b489267d7bbd8ff61a76a76684b6',
};
// Issue #4 (shared walkthrough v1): two protected v45 files were edited intentionally, listed in
// docs/SHARED-WALKTHROUGH-V1.md before the edit. They leave the v45 table above and are pinned here, with history:
//   medallion.js  v45 ..... 84a4684ac076352fe05d6a8aaa50b3eba35dbbdf2e8565d15b4a44c6fb6f723c
//                 issue #4  84c259219ac00424f81e851643e15f8c8198ec03116f424a69f4a218b0f12040 (Q6 A navigation-only floating wolf on
//                           walkthrough pages with a pending mark; acknowledgeRecord() for one selector-wolf "Got it";
//                           "acknowledged for this visit only" status when the history write is blocked)
//   home-ui.js    v45 ..... d2650f48929c13e929abf5228fb33da08c04c532187fd633b66079a1befabadd
//                 issue #4  dd5bdbe6fa30ddf5dba895e3083e1285ed3af51a5c415cbc767e07d852687722 (passes navigationOnly; guards
//                           warningHistory.v1 / pendingWarnings.v1: unreadable or denied saves are never written)
const CANDIDATE_PINS={'medallion.js':'84c259219ac00424f81e851643e15f8c8198ec03116f424a69f4a218b0f12040','home-ui.js':'ac7c6fa28bd63188821aa3aed12eb3d8e6854e00eb3a8782d1cde373f2a4475d'};
test('issue #4 candidate pins: medallion.js and home-ui.js match the reviewed candidate bytes',()=>{
 for(const [f,sum] of Object.entries(CANDIDATE_PINS))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex'),sum,f+' changed since the reviewed issue #4 candidate; update CANDIDATE_PINS deliberately');
 for(const f of Object.keys(CANDIDATE_PINS))assert.ok(!Object.hasOwn(PROTECTED,f),f+' is pinned once');
});
// Slice 2 seam pin for the legacy Velen view. Updated deliberately at each authorized change:
//   accepted v45 ............. 5908676ffe5f29503e1fc40cc867dc6eadfda63cbc2f96b404d51c31ce3c12be
//   Slice 2 (freeze 1 + QA2) . ccaa703e32b8486fb5288aadc668592f537ce7a7efce2e0018d54acd595e4200
//   QA3 save guard ........... a6f24728b1c25b43a28cacab2a522d9be0b27453cf3602fcacb939cbf53cb898 (owner-authorized guard in save())
//   QA6 D4 storage guard ..... ef05afb54503496f6982ab106116a36a96ac779624207b31eab9cfebbfb3d94d (Cmdr-authorized: guarded
//                              localStorage acquisition for the Nilfgaardian owner at line 19 only; see docs/QA6-REVIEW.md)
const SEAM_PINS={'velen-r18.js':'a221c0b0c091c6477eb3a02eae28cf4e169cec0117c725ba15d8e1e845e9c31c'};
test('Slice 2 seam pin: velen-r18.js matches the declared Velen card seam',()=>{
 for(const [f,sum] of Object.entries(SEAM_PINS))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex'),sum,f+' changed since the declared Velen card seam; review before updating');
});
test('protected WO and Slice 1 files match the accepted v45 bytes (pinned sha256; optional PHOENIX_V45_BASELINE byte-compare)',()=>{
 for(const [f,sum] of Object.entries(PROTECTED))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex'),sum,f+' differs from accepted v45');
 const dir=process.env.PHOENIX_V45_BASELINE;
 if(dir){assert.ok(fs.existsSync(dir),'PHOENIX_V45_BASELINE does not exist: '+dir);for(const f of Object.keys(PROTECTED))assert.ok(fs.readFileSync(f).equals(fs.readFileSync(require('node:path').join(dir,f))),f);}
});

// --- QA2 correction 1: no handover after a failed legacy import ------------------------------------
test('unreadable legacy + no canonical: handover writes nothing; after repair the import succeeds, then the handover',()=>{
 const broken='{"version":1,"complete":{"nilf":tru',s=store({[LEGACY]:broken});
 assert.equal(m.importFromStorage(s).status,'legacy-unreadable');
 assert.deepEqual(h.handover(s),{status:'legacy-not-imported'});
 assert.deepEqual(s.snapshot(),{[LEGACY]:broken},'nothing written: the v45 fallback stays in charge');
 assert.equal(h.load(s).owned,false);assert.equal(h.handover(s).status,'legacy-not-imported','stays refused on every load');
 // Repair the legacy save (for example by the v45 view or the owner restoring a backup).
 const repaired=JSON.stringify({version:1,complete:{nilf:true,pyres:false,mercy:false},stage:{nilf:4},choices:{inn:'peace'}});s.setItem(LEGACY,repaired);
 assert.equal(m.importFromStorage(s).status,'imported','the repaired save is imported (ownership never moved)');
 assert.equal(h.handover(s).status,'handed-over');
 const l=h.load(s);assert.equal(l.owned,true);assert.equal(l.complete,true);assert.equal(l.legacyComplete,true);assert.equal(l.progress.choices.inn,'peace');assert.deepEqual(l.progress.objectives,{});
 assert.equal(canon(s).handover.importedComplete,true);assert.equal(s.getItem(LEGACY),repaired);
});
test('a failed import write (quota) also blocks the handover; storage read failures never write',()=>{
 const s=store({[LEGACY]:legacyText},{failWrites:true});assert.equal(m.importFromStorage(s).status,'save-unavailable');
 assert.equal(h.handover(s).status,'legacy-not-imported');assert.equal(s.getItem(CANON),null);
 const ok=store();assert.equal(h.handover(ok).status,'handed-over','fresh browsers with no legacy record are still handed over');
});

// --- QA2/QA3/QA4 correction 2: the direct-Heatherton route ---------------------------------------
// QA3 evidence review: "Ask…", "Defeat…" and "Finish talking…" close (wiki "Unless you go straight to Heatherton" group).
// QA4: the wiki's placement of "Go to the Inn at the Crossroads." does not establish its journal status on the bypass, so on
// the direct route it is UNCONFIRMED: neither required nor marked. It stays required while unknown and on peace/fight.
const DIRECT={choices:{inn:'direct'}},sumOf=s=>e.counts(Q,h.load(s).progress),BYPASSED=['ask','fight','finish'].map(O),UNCONFIRMED=[O('inn')];
const both=(p,a,b,opts)=>{const r1=act(p,a,true,opts);return act(r1.progress,b,true,opts);};
const quest=(p,value=true,choices={})=>h.plan(p,{kind:'quest',quest:Q,value},{catchup:true,choices});
const withoutUndo=t=>{const c=JSON.parse(t);delete c.activities[Q].undo;return JSON.stringify(c);};
test('direct-route membership is sourced: wiki live + archived snapshot, cross-checked sources recorded',()=>{
 assert.equal(data.routeArchive,'https://web.archive.org/web/20260110001207/https://witcher.fandom.com/wiki/The_Nilfgaardian_Connection');
 assert.ok(data.routeCrossCheck.length>=2&&data.routeCrossCheck.every(u=>/^https:\/\//.test(u)));
 assert.deepEqual(Object.values(data.objectiveIndex).filter(o=>o.route==='inn').map(o=>o.id),BYPASSED,'exactly the wiki conditional group');
 for(const id of BYPASSED)assert.equal(data.objectiveIndex[id].routeSource,data.routeSource);
 const inn=data.objectiveIndex[O('inn')];
 assert.equal(inn.route,undefined,'Go to the Inn is not part of the bypassed group');assert.equal(inn.unconfirmedOn,'direct');assert.deepEqual(inn.branch,['inn',['peace','fight',undefined]]);assert.match(inn.routeNote,/unconfirmed/);
});
test('direct-Heatherton route: closes Ask/Defeat/Finish, leaves Go to the Inn unconfirmed (not required, unmarked), records no inn outcome',()=>{
 const p0=e.init(),t=v=>e.counts(Q,e.init({schema:1,choices:v?{inn:v}:{}})).total;
 assert.deepEqual([t(),t('peace'),t('fight'),t('direct')],[8,8,9,5],'unknown / peace / fight unchanged; direct = 5');
 assert.deepEqual(act(p0,'search').missingChoices,['inn'],'catch-up still asks which path was taken');
 const r=act(p0,'search',true,DIRECT);assert.equal(marks(r.progress),'find,look,search,survivor,travel','Go to the Inn is not marked by catch-up');
 for(const id of [...BYPASSED,...UNCONFIRMED])assert.equal(e.closed(data.objectiveIndex[id],r.progress),true,id+' not required on the direct route');
 assert.equal(e.done(Q,r.progress),true,'recording the final search (reading Hendrik’s notes) finishes the quest on the direct route');
 const s=store();h.handover(s);assert.equal(h.commit(s,r.progress).status,'saved');
 const c=canon(s),a=c.activities[Q];assert.equal(c.choices.inn,undefined,'no inn outcome is stored');assert.equal(a.route,'direct-heatherton');
 assert.deepEqual(a.bypassed,BYPASSED,'skipped objectives are listed separately from completed ones');assert.deepEqual(a.unconfirmed,UNCONFIRMED,'unconfirmed objective listed separately');
 for(const id of [...BYPASSED,...UNCONFIRMED])assert.equal(a.objectives[id],undefined,'skipped / unconfirmed is never stored as done');
 assert.equal(a.complete,true);assert.equal(a.confirmedComplete,undefined,'completion here comes from recorded objectives, not a confirmation');assert.deepEqual(sumOf(s),{done:5,total:5,optionalDone:0,optionalTotal:0});
 assert.equal(act(h.load(s).progress,'inn').progress.objectives[O('inn')],undefined,'Go to the Inn cannot be marked on the direct route');
 assert.equal(h.load(s).progress.choices.inn,'direct','the route maps back in memory only');
 const look=act(p0,'look',true,DIRECT);assert.equal(marks(look.progress),'look,travel','"Look for Hendrik" on the direct route needs only Travel to Velen');
});
test('QA4 regression: direct-route whole-quest confirmation fills no objective mark, invents no inn outcome, stays distinct; Undo restores the exact prior state',()=>{
 // Route already recorded (Look for Hendrik on the direct route), 2/5 objectives recorded.
 const s=store();h.handover(s);h.commit(s,act(h.load(s).progress,'look',true,DIRECT).progress);
 const before=s.getItem(CANON),p=h.load(s).progress;
 const r=quest(p);assert.equal(r.confirmedCompletion,true);assert.deepEqual(r.catchup,[]);assert.deepEqual(r.affected,[]);assert.deepEqual(r.missingChoices,[]);assert.deepEqual(r.completionLosses,[]);
 assert.equal(h.commit(s,r.progress).status,'saved');
 let c=canon(s),a=c.activities[Q];
 assert.equal(a.complete,true);assert.equal(a.confirmedComplete,true);assert.equal(a.legacyComplete,false,'not confused with imported legacy completion');
 assert.deepEqual(Object.keys(a.objectives).sort(),[O('look'),O('travel')],'no objective mark is filled');
 assert.equal(a.objectives[O('inn')],undefined,'Go to the Inn stays unmarked');assert.deepEqual(a.unconfirmed,UNCONFIRMED);assert.equal(c.choices.inn,undefined,'no inn outcome');
 const l=h.load(s);assert.equal(l.complete,true);assert.equal(l.confirmedComplete,true);assert.equal(l.legacyComplete,false);assert.deepEqual(e.counts(Q,l.progress),{done:2,total:5,optionalDone:0,optionalTotal:0},'objective count stays the recorded marks');
 assert.equal(h.undo(s).status,'saved');assert.equal(withoutUndo(s.getItem(CANON)),withoutUndo(before),'Undo restores the exact prior record');
 assert.equal(h.load(s).complete,false);assert.equal(canon(s).activities[Q].confirmedComplete,undefined);
 // Route unknown: the dialog asks which path; choosing the direct route confirms without any mark.
 const u=store();h.handover(u);const ub=u.getItem(CANON);
 const ask=quest(h.load(u).progress);assert.deepEqual(ask.missingChoices,['inn']);
 const ru=quest(h.load(u).progress,true,{inn:'direct'});assert.equal(ru.confirmedCompletion,true);h.commit(u,ru.progress);
 c=canon(u);assert.deepEqual(c.activities[Q].objectives,{});assert.equal(c.activities[Q].route,'direct-heatherton');assert.equal(c.choices.inn,undefined);assert.equal(c.activities[Q].complete,true);assert.equal(c.activities[Q].confirmedComplete,true);
 h.undo(u);assert.equal(withoutUndo(u.getItem(CANON)),withoutUndo(ub));
});
test('QA4: removing a confirmation keeps recorded marks; a route change drops the confirmation; Undo reverses both',()=>{
 const s=store();h.handover(s);h.commit(s,act(h.load(s).progress,'find',true,DIRECT).progress);h.commit(s,quest(h.load(s).progress).progress);
 const confirmed=s.getItem(CANON);
 let r=quest(h.load(s).progress,false);assert.deepEqual(r.affected,[],'no objective mark removed');assert.deepEqual(r.completionLosses,[Q]);h.commit(s,r.progress);
 let c=canon(s);assert.equal(c.activities[Q].complete,false);assert.equal(c.activities[Q].confirmedComplete,undefined);assert.equal(marks(h.load(s).progress),'find,look,survivor,travel');
 h.undo(s);assert.equal(withoutUndo(s.getItem(CANON)),withoutUndo(confirmed));
 // direct -> peace: the confirmation belonged to the direct route, so it is dropped (no legacy completion is created).
 r=h.plan(h.load(s).progress,{kind:'objective',id:O('look'),value:true,editChoice:true},{catchup:false,choices:{inn:'peace'}});assert.ok(r.completionLosses.includes(Q));h.commit(s,r.progress);
 c=canon(s);assert.equal(c.activities[Q].complete,false);assert.equal(c.activities[Q].confirmedComplete,undefined);assert.equal(c.activities[Q].legacyComplete,false);assert.equal(c.choices.inn.value,'peace');
 h.undo(s);assert.equal(withoutUndo(s.getItem(CANON)),withoutUndo(confirmed));
 // Recording more objectives keeps the confirmation; 5/5 then completes on its own as well.
 h.commit(s,act(h.load(s).progress,'search',true).progress);c=canon(s);assert.equal(c.activities[Q].confirmedComplete,true);assert.equal(c.activities[Q].complete,true);assert.equal(c.activities[Q].objectives[O('inn')],undefined);
});
test('every supported path completes, and Undo restores the exact prior state',()=>{
 const expect={peace:'ask,find,finish,inn,look,search,survivor,travel',fight:'ask,fight,find,finish,inn,look,search,survivor,travel',direct:'find,look,search,survivor,travel'};
 for(const [path,want] of Object.entries(expect)){
  const s=store();h.handover(s);const before=s.getItem(CANON);
  h.commit(s,both(h.load(s).progress,'search','inn',{choices:{inn:path}}).progress);
  const l=h.load(s);assert.equal(marks(l.progress),want,path);assert.equal(l.complete,true,path);assert.equal(l.progress.choices.inn,path);
  assert.equal(h.undo(s).status,'saved');const back=canon(s);
  assert.deepEqual(back.activities[Q].objectives,{});assert.equal(back.choices.inn,undefined);assert.equal(back.activities[Q].route,undefined);assert.equal(back.activities[Q].bypassed,undefined);assert.equal(back.activities[Q].unconfirmed,undefined);assert.equal(back.activities[Q].complete,false,path);
  assert.deepEqual(back.choices,JSON.parse(before).choices,path);
 }
});
test('corrections between paths: marks on closed objectives are removed, never carried over, and Undo reverses each correction',()=>{
 const s=store();h.handover(s);
 h.commit(s,act(h.load(s).progress,'search',true,{choices:{inn:'fight'}}).progress);
 // fight -> direct: ask, fight, finish and (QA4, now not required) Go to the Inn lose their marks; shown in the dialog; Undo restores them.
 let r=h.plan(h.load(s).progress,{kind:'objective',id:O('look'),value:true,editChoice:true},{catchup:true,choices:{inn:'direct'}});
 assert.deepEqual(r.affected.map(x=>x.split(':')[1]).sort(),['ask','fight','finish','inn']);h.commit(s,r.progress);
 let c=canon(s);assert.equal(c.choices.inn,undefined);assert.equal(c.activities[Q].route,'direct-heatherton');assert.deepEqual(c.activities[Q].bypassed,BYPASSED);assert.deepEqual(c.activities[Q].unconfirmed,UNCONFIRMED);
 assert.equal(marks(h.load(s).progress),'find,look,search,survivor,travel');assert.equal(h.load(s).complete,true);
 assert.equal(h.undo(s).status,'saved');c=canon(s);assert.equal(c.choices.inn.value,'fight');assert.equal(c.activities[Q].route,undefined);assert.equal(c.activities[Q].bypassed,undefined);assert.equal(c.activities[Q].unconfirmed,undefined);assert.equal(marks(h.load(s).progress),'ask,fight,find,finish,inn,look,search,survivor,travel');
 // fight -> peace: only the fight mark is removed.
 r=h.plan(h.load(s).progress,{kind:'objective',id:O('ask'),value:true,editChoice:true},{catchup:true,choices:{inn:'peace'}});
 assert.deepEqual(r.affected,[O('fight')]);h.commit(s,r.progress);assert.equal(h.load(s).complete,true);assert.equal(e.counts(Q,h.load(s).progress).total,8);
 // direct -> peace: Go to the Inn, Ask and Finish become required again and are NOT auto-completed by the correction.
 const d=store();h.handover(d);h.commit(d,act(h.load(d).progress,'search',true,DIRECT).progress);
 r=h.plan(h.load(d).progress,{kind:'objective',id:O('look'),value:true,editChoice:true},{catchup:false,choices:{inn:'peace'}});h.commit(d,r.progress);
 const l=h.load(d);assert.equal(l.complete,false,'switching away from the direct route does not invent the inn conversation');
 assert.deepEqual(e.counts(Q,l.progress),{done:5,total:8,optionalDone:0,optionalTotal:0});assert.equal(canon(d).activities[Q].route,undefined);assert.equal(canon(d).activities[Q].bypassed,undefined);assert.equal(canon(d).choices.inn.value,'peace');
 assert.equal(h.undo(d).status,'saved');assert.equal(canon(d).activities[Q].route,'direct-heatherton');assert.deepEqual(sumOf(d),{done:5,total:5,optionalDone:0,optionalTotal:0});
});
// QA4: peace, fight and unknown routes are unchanged. A fixed matrix of plans/commits/undos on those routes is replayed
// in a fresh process and hashed; the hash was generated from the QA3 freeze (prefix-qa4) and must match byte for byte.
// Set PHOENIX_SLICE2_QA3_DIST=<prefix-qa4/dist> to also replay against that tree directly.
const TRACE=String.raw`
const dir=process.argv[1];globalThis.window=globalThis;
const h=require(dir+'/velen-nilf-progress.js'),m=require(dir+'/velen-migration.js'),Q='velen.nilf',O=x=>Q+':'+x,out=[];
const store=init=>{const map=new Map(Object.entries(init||{}));return {getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k)};};
const steps=route=>{const c=route?{inn:route}:{};return [['objective','travel',true,{}],['objective','inn',true,{}],['objective','search',true,c],['quest',null,true,c],['quest',null,false,{}],['undo'],['quest',null,true,c],['objective','look',false,{}],['undo'],['objective','ask',true,c],['objective','finish',false,{}],['quest',null,true,{}]];};
const run=(label,s,route)=>{for(const st of steps(route)){
 if(st[0]==='undo'){out.push([label,'undo',h.undo(s).status,s.getItem(h.KEY)]);continue;}
 const action=st[0]==='quest'?{kind:'quest',quest:Q,value:st[2]}:{kind:'objective',id:O(st[1]),value:st[2]};
 const r=h.plan(h.load(s).progress,action,{catchup:true,choices:st[3]});
 const plan={catchup:r.catchup,affected:r.affected,missingChoices:r.missingChoices,completionLosses:r.completionLosses,progress:r.progress,confirmedCompletion:r.confirmedCompletion};
 out.push([label,JSON.stringify(action),JSON.stringify(plan)]);
 if(!r.missingChoices.length)out.push([label,'commit',h.commit(s,r.progress).status,s.getItem(h.KEY)]);
}};
for(const route of [undefined,'peace','fight']){const s=store();h.handover(s);run('fresh:'+route,s,route);}
for(const route of [undefined,'peace','fight']){const s=store({[h.LEGACY_KEY]:JSON.stringify({version:1,complete:{nilf:true},stage:{nilf:4},choices:route?{inn:route}:{}})});m.importFromStorage(s);h.handover(s);out.push(['legacy:'+route,'handover',s.getItem(h.KEY)]);run('legacy:'+route,s,route);}
process.stdout.write(require('crypto').createHash('sha256').update(JSON.stringify(out)).digest('hex')+' '+out.length);
`;
const OTHER_ROUTES_QA3='a2f98352982c66453ace120c68a5e2776999e08282b72bb57917fa7744387204 125';
const trace=dir=>require('node:child_process').execFileSync(process.execPath,['-e',TRACE,dir],{encoding:'utf8'}).trim();
test('QA4: peace, fight and unknown routes (fresh and imported-legacy) behave byte-identically to the QA3 freeze',()=>{
 assert.equal(trace(__dirname),OTHER_ROUTES_QA3);
 const prior=process.env.PHOENIX_SLICE2_QA3_DIST;if(prior){assert.ok(fs.existsSync(prior+'/velen-nilf-progress.js'),'PHOENIX_SLICE2_QA3_DIST is set but missing: '+prior);assert.equal(trace(require('node:path').resolve(prior)),OTHER_ROUTES_QA3);}
});
test('unchecking a Heatherton step keeps the inn outcome the recorded inn conversation still supports',()=>{
 for(const path of ['peace','fight']){
  const s=store();h.handover(s);h.commit(s,act(h.load(s).progress,'search',true,{choices:{inn:path}}).progress);
  const r=act(h.load(s).progress,'look',false);assert.deepEqual(r.missingChoices,[]);assert.equal(r.progress.choices.inn,path);
  h.commit(s,r.progress);assert.equal(canon(s).choices.inn.value,path);assert.equal(marks(h.load(s).progress),path==='fight'?'ask,fight,finish,inn,travel':'ask,finish,inn,travel');
 }
 // On the direct route "Look for Hendrik" carries the route, so unchecking it clears the route (nothing else supports it).
 const s=store();h.handover(s);h.commit(s,act(h.load(s).progress,'search',true,DIRECT).progress);
 const r=act(h.load(s).progress,'look',false);h.commit(s,r.progress);assert.equal(canon(s).activities[Q].route,undefined);assert.equal(marks(h.load(s).progress),'travel');
});
test('Slice 1 imports never produce the direct route; an imported peace/fight outcome stays an outcome',()=>{
 for(const v of ['peace','fight']){const s=store({[LEGACY]:JSON.stringify({version:1,complete:{nilf:false},stage:{nilf:1},choices:{inn:v}})});m.importFromStorage(s);h.handover(s);assert.equal(canon(s).choices.inn.value,v);assert.equal(canon(s).activities[Q].route,undefined);}
});
