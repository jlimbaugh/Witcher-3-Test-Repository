'use strict';
// Issue #4 shared walkthrough v1: model tests (author-supplied, LT). Uses the real route, progression data and engines.
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const M=require('./shared-walkthrough.js');
function load(files){const c={};c.window=c;vm.createContext(c);for(const f of files)vm.runInContext(fs.readFileSync(path.join(__dirname,f),'utf8'),c,{filename:f});return c;}
const c=load(['white-orchard.js','map-data.js','progression-data.js','progression-engine.js']);
const {tasks,hubs}=c.PHOENIX_ROUTE,data=c.PHOENIX_PROGRESS_DATA;
for(const [id,q] of Object.entries(data.quests))if(!Number.isFinite(tasks[id].level))tasks[id].level=q.level;
const engine=c.createPhoenixProgress(data,tasks,hubs);
const J=x=>JSON.parse(JSON.stringify(x));
const woQuests=Object.keys(data.quests).filter(q=>tasks[q].stages);
function rows(q,p){const req=new Set(engine.required(q,p).map(o=>o.id));return data.quests[q].objectives.map(o=>({id:o.id,label:o.label,optional:o.optional===true,required:req.has(o.id),stage:M.WO_STAGE_MAP[q][o.id.split(':')[1]]}));}

test('the map covers exactly the 13 White Orchard walkthroughs and every objective maps to an existing stage',()=>{
 assert.equal(woQuests.length,13);assert.deepEqual(Object.keys(M.WO_STAGE_MAP).sort(),[...woQuests].sort());
 for(const q of woQuests){const stages=new Set(tasks[q].stages.map(s=>s.id));
  for(const o of data.quests[q].objectives){const st=M.WO_STAGE_MAP[q][o.id.split(':')[1]];assert.ok(st,o.id+' has no stage');assert.ok(stages.has(st),o.id+' -> '+st+' is not a stage of '+q);}
  for(const k of Object.keys(M.WO_STAGE_MAP[q]))assert.ok(data.quests[q].objectives.some(o=>o.id===q+':'+k),q+':'+k+' is not a real objective');}
});
test('every stage of every WO walkthrough stays reachable (own objective, or setup / follow-up block) on a fresh save',()=>{
 for(const q of woQuests){const lay=M.layout(rows(q,engine.init()),tasks[q].stages.map(s=>s.id));
  for(const st of tasks[q].stages){const owner=lay.ownerOf[st.id];assert.ok(owner,q+' stage '+st.id+' unreachable');assert.ok(lay.primary.some(o=>o.id===owner));
   const own=lay.primary.some(o=>o.stage===st.id);if(!own)assert.ok(lay.extras[owner].some(x=>x.stage===st.id),q+' '+st.id+' not attached');}}
});
test('stages without a journal objective are attached as information blocks (griffin contract, Lilac brawl, Beast herbalist setup)',()=>{
 const lil=M.layout(rows('q-lilac',engine.init()),tasks['q-lilac'].stages.map(s=>s.id));
 assert.deepEqual(J(lil.extras['q-lilac:garrison']),[{stage:'brawl',when:'before'}]);
 const beast=M.layout(rows('q-beast',engine.init()),tasks['q-beast'].stages.map(s=>s.id));
 assert.deepEqual(J(beast.extras['q-beast:herbalist']),[{stage:'1',when:'before'}],'taking the griffin contract stays reachable');
});
test('selector members and totals are the engine required set on every WO route; never hard-coded',()=>{
 for(const q of woQuests){for(const p of [engine.init(),engine.init({},{[q]:true})]){const lay=M.layout(rows(q,p),tasks[q].stages.map(s=>s.id));
  assert.equal(lay.primary.length,engine.counts(q,p).total,q);assert.deepEqual(lay.primary.map(o=>o.id),engine.required(q,p).map(o=>o.id));}}
 let p=engine.init();p=engine.plan(p,{}, {kind:'objective',id:'q-firestarter:suspect',value:true},{choices:{arson:'bribe'}}).progress;
 const lay=M.layout(rows('q-firestarter',p),tasks['q-firestarter'].stages.map(s=>s.id));assert.equal(lay.primary.length,engine.counts('q-firestarter',p).total);assert.ok(!lay.primary.some(o=>o.id==='q-firestarter:fight'),'closed branch leaves the selector');
});
test('velen.nilf: 8 undecided / peace, 9 fight, 5 direct, from the real owner engine',()=>{
 const owner=require('./velen-nilf-progress.js');
 const Q=owner.QUEST,vd=owner.data,eng=owner.engine,velen=load(['velen-data-r18.js']).PHOENIX_VELEN;
 const order=velen.quests.nilf.stages.map((_,i)=>String(i+1));
 const at=choice=>{const p=eng.init();if(choice)p.choices.inn=choice;const req=new Set(eng.required(Q,p).map(o=>o.id));
  const r=vd.quests[Q].objectives.map(o=>({id:o.id,optional:o.optional===true,required:req.has(o.id),stage:String(o.stage)}));return {p,lay:M.layout(r,order)};};
 for(const [choice,n] of [[null,8],['peace',8],['fight',9],['direct',5]]){const {p,lay}=at(choice);assert.equal(lay.primary.length,n,String(choice));assert.equal(eng.counts(Q,p).total,n);
  for(const st of order)assert.ok(lay.ownerOf[st],choice+' stage '+st+' reachable');}
 const direct=at('direct').lay;assert.equal(direct.ownerOf['3'],Q+':look','direct route: The Inn opens as a "before this" block of the next objective');
});
test('selection: remembered objective is kept only when it belongs to the stage; otherwise the stage owner',()=>{
 const lay=M.layout(rows('q-beast',engine.init()),tasks['q-beast'].stages.map(s=>s.id));
 assert.equal(M.selectFor({stage:'patrol',remembered:'q-beast:site',primary:lay.primary,ownerOf:lay.ownerOf}),'q-beast:site');
 assert.equal(M.selectFor({stage:'patrol',remembered:'q-beast:kill',primary:lay.primary,ownerOf:lay.ownerOf}),'q-beast:follow');
 assert.equal(M.selectFor({stage:'3',remembered:'q-beast:dogs',primary:lay.primary,ownerOf:lay.ownerOf}),'q-beast:ask','optional objectives are never selector boxes');
 assert.equal(M.selectFor({stage:'1',remembered:null,primary:lay.primary,ownerOf:lay.ownerOf}),'q-beast:herbalist');
 assert.equal(M.selectFor({stage:'nope',remembered:null,primary:lay.primary,ownerOf:lay.ownerOf}),lay.primary[0].id);
});
test('warning identity: crystal skull reuses the existing history id; acknowledgment needs the same id AND text',()=>{
 assert.equal(M.warningRecordId('white-orchard','poi-4'),'crystal-skull-cutoff');
 assert.equal(M.warningRecordId('white-orchard','departure'),'walkthrough-warning:white-orchard:departure');
 const h=[{id:'crystal-skull-cutoff',text:'A',href:'#x',at:1}];
 assert.equal(M.acknowledged(h,'crystal-skull-cutoff','A'),true);assert.equal(M.acknowledged(h,'crystal-skull-cutoff','A changed'),false,'materially changed text is unread');
 assert.equal(M.acknowledged([],'x','A'),false);assert.equal(M.acknowledged(null,'x','A'),false);
});
test('next unfinished skips done and unavailable objectives',()=>{
 const list=[{id:'a'},{id:'b'},{id:'c'}];assert.equal(M.nextUnfinished(list,o=>o.id==='c').id,'c');assert.equal(M.nextUnfinished(list,()=>false),null);
});
test('the component writes no storage of its own and never calls the progress owners directly',()=>{
 const src=fs.readFileSync(path.join(__dirname,'shared-walkthrough.js'),'utf8');
 assert.ok(!/localStorage\.(setItem|removeItem|clear)|sessionStorage/.test(src),'no storage writes');
 assert.ok(!/\.(plan|commit|undo|undoLast|request|apply|handover)\(/.test(src.replace(/owner\.load\(|PhoenixReadingModel\.plan\(/g,'')),'no direct progress mutation');
 for(const hook of ['data-objective-check','data-velen-check','data-objective-skip','data-story-update','data-undo-deck','data-quest-state','data-edit-choice','data-reconcile-legacy','data-velen-quest','data-velen-undo','data-velen-edit-choice','data-velen-reconcile'])assert.ok(src.includes(hook.replace(/^data-/,'').replace(/-([a-z])/g,(m,x)=>x.toUpperCase()))||src.includes(hook),hook+' reused');
});
// home-ui.js warning persistence guard: the classification functions are extracted verbatim and run against a logged store.
function guard(){const src=fs.readFileSync(path.join(__dirname,'home-ui.js'),'utf8');const a=src.indexOf(' function readList('),b=src.indexOf(" const key='phoenix.whiteorchard.warningHistory.v1'");assert.ok(a>0&&b>a,'guard functions not found');
 return store=>{const ctx={localStorage:store};vm.createContext(ctx);vm.runInContext(src.slice(a,b)+';this.readList=readList;this.writeList=writeList;this.acceptPendingWarning=acceptPendingWarning;',ctx);return ctx;};}
function logged(init,fault={}){const map=new Map(Object.entries(init)),log=[];return {log,map,getItem(k){if(fault.read)throw Object.assign(new Error('denied'),{name:'SecurityError'});return map.has(k)?map.get(k):null;},setItem(k,v){if(fault.write)throw new Error('quota');log.push([k,v]);map.set(k,String(v));},removeItem(k){log.push(['remove',k]);map.delete(k);}};}
const HK='phoenix.whiteorchard.warningHistory.v1',ok=r=>r&&typeof r==='object'&&typeof r.text==='string';
test('warning history guard: damaged, empty, non-array and read-failed saves stay unchanged with zero writes',()=>{
 const g=guard();
 for(const raw of ['{oops','','{"a":1}','null','[1,2]','[{"id":"x"}]']){const s=logged({[HK]:raw}),f=g(s),r=f.readList(HK,ok);assert.equal(r.writable,false,JSON.stringify(raw));assert.equal(f.writeList(HK,r,[{id:'a',text:'b'}]),'blocked');assert.deepEqual(s.log,[]);assert.equal(s.map.get(HK),raw);}
 const d=logged({},{read:true}),fd=g(d),rd=fd.readList(HK,ok);assert.equal(rd.status,'storage-unavailable');assert.equal(fd.writeList(HK,rd,[]),'unavailable','denied storage is reported as unavailable, not as damaged');assert.deepEqual(d.log,[]);
});
test('warning history guard: absent and valid records stay writable; a failed write reports unavailable',()=>{
 const g=guard();const a=logged({}),fa=g(a),ra=fa.readList(HK,ok);assert.equal(ra.status,'absent');assert.equal(fa.writeList(HK,ra,[{id:'x',text:'t',href:null,at:1}]),'saved');assert.equal(a.log.length,1);
 const valid='[{"id":"crystal-skull-cutoff","text":"t","href":null,"at":1}]',v=logged({[HK]:valid}),fv=g(v),rv=fv.readList(HK,ok);assert.equal(rv.status,'accepted');assert.equal(rv.list.length,1);
 const w=logged({},{write:true}),fw=g(w),rw=fw.readList(HK,ok);assert.equal(fw.writeList(HK,rw,[]),'unavailable');
});

test('pending warning guard rejects malformed entries before pruning can overwrite them',()=>{
 const key='phoenix.whiteorchard.pendingWarnings.v1',g=guard();
 for(const raw of ['[{}]','[[]]','[{"id":"x","quest":"q-beast","status":"failed"}]','[{"id":"x","quest":"q-beast","status":"other","text":"t"}]']){
  const store=logged({[key]:raw}),f=g(store),r=f.readList(key,f.acceptPendingWarning);
  assert.equal(r.writable,false,raw);assert.equal(f.writeList(key,r,[]),'blocked');assert.deepEqual(store.log,[]);assert.equal(store.map.get(key),raw);
 }
 const valid=[{id:'failed:q-beast:1',quest:'q-beast',status:'failed',text:'Recorded failed',href:'#quest-beast'}];
 const store=logged({[key]:JSON.stringify(valid)}),f=g(store),r=f.readList(key,f.acceptPendingWarning);
 assert.equal(r.status,'accepted');assert.equal(f.writeList(key,r,valid),'saved');
});
