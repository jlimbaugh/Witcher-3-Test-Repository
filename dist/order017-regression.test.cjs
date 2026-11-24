"use strict";
// LT Engineering Order 017 regression coverage: Constellation retirement, wolf navigation, Main Map Progress layer,
// save compatibility, Undo refresh and cache-busting for returning V50 browsers. Development evidence only; not device acceptance.
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto'),path=require('node:path');
const read=f=>fs.readFileSync(f,'utf8');
const sha=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
const production=fs.readdirSync('.').filter(f=>/\.(js|css|html)$/.test(f)&&!f.endsWith('.test.cjs'));

// ---------- fake DOM + Leaflet harness for createPhoenixMap ----------
function harness({completed={},engine={},velenRows=null}={}){
  const queried=[],listeners={},replaced=[];
  function el(tag='div'){const e={tagName:tag.toUpperCase(),children:[],dataset:{},attrs:{},style:{},hidden:false,textContent:'',className:'',value:'',checked:false,parent:null,handlers:{},
    classList:{set:new Set(),add(c){this.set.add(c)},remove(c){this.set.delete(c)},toggle(c,on){on=on===undefined?!this.set.has(c):on;on?this.set.add(c):this.set.delete(c);return on},contains(c){return this.set.has(c)}},
    setAttribute(k,v){this.attrs[k]=String(v)},getAttribute(k){return this.attrs[k]??null},removeAttribute(k){delete this.attrs[k]},
    append(...n){for(const c of n){if(typeof c==='object'){c.parent=this;this.children.push(c)}}},prepend(...n){this.children.unshift(...n)},replaceChildren(...n){this.children=[];this.append(...n)},
    after(n){const p=this.parent||this;n.parent=p;const i=p.children.indexOf(this);p.children.splice(i+1,0,n)},
    addEventListener(t,f){(this.handlers[t]||(this.handlers[t]=[])).push(f)},click(){(this.handlers.click||[]).forEach(f=>f({currentTarget:this}))},
    querySelector(s){return this.querySelectorAll(s)[0]||null},
    querySelectorAll(s){const out=[];const m=s.match(/^\[data-([a-z-]+)\]$/),c=s.match(/^\.([a-z-]+)$/),t=s.match(/^([a-z]+)$/);const walk=n=>{for(const k of n.children){if(m&&Object.hasOwn(k.dataset,m[1].replace(/-([a-z])/g,(_,x)=>x.toUpperCase())))out.push(k);if(c&&String(k.className).split(' ').includes(c[1]))out.push(k);if(t&&k.tagName===t[1].toUpperCase())out.push(k);walk(k)}};walk(this);return out},
    scrollIntoView(){},focus(){},get innerText(){const t=n=>(n.textContent||'')+' '+n.children.map(t).join(' ');return t(this)}};return e;}
  const ids={};const sel=k=>ids[k]||(ids[k]=el());
  const tools=el('aside');const cluster=el('div');cluster.className='map-cluster-mode';tools.append(cluster);
  const main=el('main');
  const shell=el('div');
  const emptyActions=el('div');emptyActions.append(el('p'));
  const document={createElement:el,createTextNode:t=>({textContent:String(t),children:[],dataset:{}}),getElementById:id=>sel('#'+id),
    querySelector(s){queried.push(s);if(s==='#whiteorchard-map .atlas-tools')return tools;if(s==='main')return main;if(s==='.native-map-shell')return shell;if(s==='[data-map-empty-actions]')return emptyActions;return sel(s)},
    querySelectorAll(s){queried.push(s);return []},addEventListener(){}};
  const rendered=[];
  const L={CRS:{Simple:{}},point:()=>({}),divIcon:o=>o,latLngBounds:()=>({pad(){return this}}),
    map:()=>({fitBounds(){},setView(){},getCenter:()=>({lat:1,lng:2}),getZoom:()=>0,invalidateSize(){},on(){},getBoundsZoom:()=>0}),
    imageOverlay:()=>({addTo(){return {on(){}}}}),
    layerGroup:()=>{const g={items:[],addTo(){return g},clearLayers(){g.items.length=0}};return g},
    marker:(point,o)=>{const node=el();const mk={o,on(){},addTo(g){g.items.push(mk);if(g.items===layerItems())rendered.push(mk);return mk},getElement:()=>node};return mk},
    circleMarker:()=>({addTo(){}})};
  let firstLayer=null;const origGroup=L.layerGroup;let groups=[];L.layerGroup=()=>{const g=origGroup();groups.push(g);return g};const layerItems=()=>groups[1]&&groups[1].items;
  const markers=[{id:'m-a',task:'a',type:'quest',name:'A',point:[1,1]},{id:'m-b',task:'b',type:'quest',name:'B',point:[2,2]},{id:'m-c',task:'c',type:'poi',name:'C',point:[3,3]},{id:'m-e',task:'e',type:'poi',name:'E',point:[4,4]},{id:'m-s',task:'s',type:'service',name:'Smith',point:[5,5]}];
  const tasks={a:{name:'A',home:'h',view:'qa'},b:{name:'B',home:'h',view:'qb'},c:{name:'C',home:'h',view:'qc'},e:{name:'E',home:'h',view:'qe'},s:{name:'Smith',home:'h',view:'qs'}};
  const state={completed:{...completed},map:{type:'all',search:'',showCompleted:false},progress:{}};
  const captures=[],pins=[];
  const window={L,PHOENIX_MAP:{width:10,height:10,image:'x',labels:[],markers},PHOENIX_MAP_MEMBERSHIP:{h:['a','b','c','e','s']}};
  const ctx={window,document,L,ResizeObserver:class{observe(){}},history:{state:{},replaceState(s){this.state=s;replaced.push(s)}},location:{href:'x',hash:'#whiteorchard-map'},
    addEventListener:(t,f)=>{(listeners[t]||(listeners[t]=[])).push(f)},console};
  vm.createContext(ctx);vm.runInContext(read('map-ui.js'),ctx);
  const api=ctx.window.createPhoenixMap({tasks,hubs:[{id:'h',name:'Hub'}],state,onPin:id=>pins.push(id),persist:()=>{},eligible:()=>[],onCapture:c=>captures.push(c),
    progressStatus:id=>engine[id]||'available',regionalProgress:()=>velenRows});
  const layer=tools.children.find(c=>c.dataset.progressLayer);
  const current=()=>(layerItems()||[]).map(m=>m.o.title).sort();
  const button=k=>layer.children.find(c=>String(c.className).includes('map-progress-filters')).children.find(b=>b.dataset.progressFilter===k);
  return {api,state,layer,tools,main,queried,listeners,captures,pins,current,button,shell,refresh:()=>api.refresh()};
}
const scenario=()=>harness({completed:{a:true},engine:{b:'failed',e:'unavailable'},velenRows:[{status:'complete'},{status:'failed'},{status:'open'}]});

test('O17 legacy redirects keep bookmarks on existing geographical map routes',()=>{
  const src=read('app.js'),block=src.slice(src.indexOf('// Stage 3 · retire old destinations'));
  const routing=require('./velen-routing.js');
  for(const [from,to] of [['#progress','#whiteorchard-map'],['#whiteorchard-constellation','#whiteorchard-map'],['#whiteorchard-constellation/whiteorchard/q-lilac','#whiteorchard-map'],['#star-chart','#whiteorchard-map'],['#progress/velen','#velen/map'],['#constellation/velen','#velen/map'],['#home',null]]){
    let target=null;const ctx={location:{hash:from,replace(h){target=h}},window:{addEventListener(){}}};vm.runInNewContext(block,ctx);assert.equal(target,to,from);
  }
  assert.ok(!src.includes('#map/nilf/1'),'invalid index.html route removed');
  assert.equal(routing.sharedHash('#velen/map'),'#velen/map','Velen redirect target is a valid existing Velen route');
});

test('O17 no active Constellation or standalone Progress destination remains in production files',()=>{
  for(const gone of ['atlas-r14.js','progress-star-chart.js','progress-star-chart.css','console-constellation-r16.svg','navigation-art-v26/constellation.webp'])assert.ok(!fs.existsSync(gone),gone+' removed');
  for(const f of production){const s=read(f);
    assert.ok(!/Open the whole constellation|Whole-game progress|atlas-r14\.js|progress-star-chart|console-constellation-r16|constellation\.webp/.test(s),f+' has no retired control or asset reference');
    // Inert closest('#progress')/[id*=constellation] colour checks in visual-system.js match no element and are documented as retained.
    if(f!=='app.js')assert.ok(!/['"]#(whiteorchard-constellation|progress|star-chart)['"\/]/.test(s.replace(/closest\('[^']*'\)/g,'')),f+' links no retired route');
    assert.ok(!/frame\('progress'/.test(s),f+' builds no standalone Progress view');}
  assert.match(read('main-console.js'),/link\('View Progress on Main Map →','#whiteorchard-map','regional-progress-link'\)/);
});

test('O17 wolf navigation restores Field Reference in the approved six-tile structure',()=>{
  const c={window:{}};vm.runInNewContext(read('navigation-art.js'),c);const nav=c.window.PhoenixNavigationArt;
  assert.deepEqual(Array.from(nav.entries,e=>[e.key,e.label,e.href||null]),[['home','Home','#home'],['regions','Regions','#regions'],['reference','Field Reference','#field-reference'],['map','Main Map','#whiteorchard-map'],['quests','Quests','#whiteorchard-tree'],['warnings','Warnings',null]]);
  assert.equal(nav.entries.find(e=>e.key==='reference').src,'navigation-art-v26/reference.webp','Field Reference keeps its approved art');
  assert.equal(new Set(nav.entries.map(e=>e.src)).size,6,'no two tiles share art');
  for(const e of nav.entries)assert.ok(fs.statSync(e.src).size>1000,e.src);
  const html=read('index.html'),mc=read('main-console.js');
  for(const id of ['regions','whiteorchard-map','whiteorchard-tree'])assert.ok(html.includes('id="'+id+'"'),id+' view exists');
  assert.match(mc,/frame\('home',/,'Home view is built');assert.match(mc,/frame\('field-reference','Field Reference'/,'Field Reference view is built');
  assert.match(read('navigation-art.css'),/\.art-navigation-row\{[^}]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/,'two-column grid unchanged');
  for(const [r,k] of [['#field-reference','reference'],['#economy-merchants','reference'],['#whiteorchard-map','map'],['#whiteorchard-tree/hub-hunt','quests'],['#home','home'],['#velen','regions']])assert.equal(nav.keyForRoute(r),k,r);
});

test('O17 Progress layer renders only inside the Main Map filter panel',()=>{
  const h=scenario();
  assert.ok(h.layer,'layer created');assert.equal(h.tools.children.indexOf(h.layer),h.tools.children.findIndex(c=>c.className==='map-cluster-mode')+1,'placed after the cluster controls');
  assert.equal(h.main.children.length,0,'nothing attached to <main>');assert.ok(!h.queried.includes('main'),'never looks up <main>');
  const src=read('map-ui.js');assert.ok(!/querySelector\('main'\)|document\.querySelector\('\.map-toolbar/.test(src));assert.ok(!src.includes('createPhoenixMap = function(opts)'),'leaking wrapper removed');
  assert.ok(!/\.map-progress-summary\s*\{[^}]*background/.test(read('velen-nilf-map.css')),'leaking dark bar style removed');
});

test('O17 filters run through real marker data, update counts and show an empty state',()=>{
  const h=scenario();h.api.show();
  assert.deepEqual(h.current(),['B','C','E','Smith'],'All: completed hidden by the existing Show completed setting');
  h.button('unfinished').click();assert.deepEqual(h.current(),['C']);
  h.button('completed').click();assert.deepEqual(h.current(),['A']);
  h.button('failed').click();assert.deepEqual(h.current(),['B']);
  assert.equal(h.button('failed').getAttribute('aria-pressed'),'true');
  const empty=h.layer.children.find(c=>Object.hasOwn(c.dataset,'progressEmpty'));assert.equal(empty.hidden,true);
  const g=harness({engine:{}});g.api.show();g.button('completed').click();assert.deepEqual(g.current(),[]);
  const e2=g.layer.children.find(c=>Object.hasOwn(c.dataset,'progressEmpty'));assert.equal(e2.hidden,false);assert.match(e2.textContent,/No White Orchard activities are recorded as completed/);
  g.button('all').click();assert.equal(g.current().length,5);
});

test('O17 Missed is not offered without a canonical missed state; Failed comes from the engine only',()=>{
  const h=scenario();const keys=h.layer.children.find(c=>String(c.className).includes('map-progress-filters')).children.map(b=>b.dataset.progressFilter);
  assert.deepEqual(keys,['all','unfinished','completed','failed']);
  assert.ok(!/['"]missed['"]/.test(read('progression-engine.js')),'engine has no missed state; revisit this control if one is added');
  const g=harness({engine:{}});g.api.show();g.button('failed').click();assert.deepEqual(g.current(),[],'no failure inferred from lack of completion');
});

test('O17 counts are regional: White Orchard from mapped canonical tasks, Velen from its own owners',()=>{
  const h=scenario();h.api.show();
  const wo=h.layer.children.find(c=>c.dataset.regionCount==='whiteorchard'),velen=h.layer.children.find(c=>c.dataset.regionCount==='velen');
  assert.equal(wo.textContent,'White Orchard · 4 mapped activities · 1 completed · 1 unfinished · 1 failed · 1 unavailable');
  assert.equal(velen.hidden,false);assert.match(velen.innerText,/Velen · 1 of 3 tracked entries complete · 1 failed/);
  assert.ok(!/whole-game|whole game/i.test(wo.textContent));
  const none=harness({velenRows:null});none.api.show();assert.equal(none.layer.children.find(c=>c.dataset.regionCount==='velen').hidden,true,'no fabricated Velen counts');
});

test('O17 map → quest → map restores the progress filter with the existing map context',()=>{
  const h=scenario();h.api.show();h.button('unfinished').click();
  const ctx=h.captures.at(-1);assert.equal(ctx.progressFilter,'unfinished');
  const g=scenario();g.api.show('restore',null,{...ctx,view:{center:[1,2],zoom:0}});
  assert.deepEqual(g.current(),['C']);assert.equal(g.button('unfinished').getAttribute('aria-pressed'),'true');
  const bad=scenario();bad.api.show('restore',null,{...ctx,progressFilter:'missed',view:{center:[1,2],zoom:0}});assert.equal(bad.button('all').getAttribute('aria-pressed'),'true','unknown filter falls back to All');
});

test('O17 save compatibility: keys unchanged and the temporary filter is never written',()=>{
  const keys=new Set();for(const f of production.filter(f=>f.endsWith('.js')))for(const m of read(f).matchAll(/['"`](phoenix(?:\.[A-Za-z0-9_-]+)+\.?|phoenix-appearance-v1)['"`]/g))keys.add(m[1]);
  assert.deepEqual([...keys].sort(),['phoenix-appearance-v1','phoenix.character.build-vault.v1','phoenix.guide.resume.v1','phoenix.reading-foldouts.v1','phoenix.region.velen.v1','phoenix.search.history.v1','phoenix.velen.','phoenix.velen.arrival.v1','phoenix.velen.map.progress','phoenix.velen.reading.v1','phoenix.whiteorchard.interaction.v1','phoenix.whiteorchard.pendingWarnings.v1','phoenix.whiteorchard.pilot.v1','phoenix.whiteorchard.warningHistory.v1']);
  assert.match(read('app.js'),/filter\(\(\[k\]\)=>k!=='clusterMode'&&k!=='progressFilter'\)/);
  assert.match(read('progression-engine.js'),/schema:1/,'progress schema unchanged');
});

test('O17 Undo and progress commits refresh the layer through existing events',()=>{
  const h=scenario();h.api.show();
  const wo=()=>h.layer.children.find(c=>c.dataset.regionCount==='whiteorchard').textContent;
  assert.match(wo(),/1 completed/);h.state.completed.c=true;(h.listeners['phoenix:progress-committed']||[]).forEach(f=>f());assert.match(wo(),/2 completed · 0 unfinished/);
  delete h.state.completed.c;(h.listeners['phoenix:progress-undone']||[]).forEach(f=>f());assert.match(wo(),/1 completed · 1 unfinished/);
  assert.match(read('progression-ui.js'),/phoenix:progress-undone/,'Undo still announces itself');
});

// V50 entry-page references (html|file -> [tag, sha256]) pinned from e8b818492bbc71450453a69686bf1a7f0d3042ac.
const V50_REFS={"character.html|character.css":["character-gear-reference-v1","7524a2517d593289da9e53de4c06ef33a0ec301bc82dfb75df2ec2422ef0055b"],"character.html|character-vault.js":["character-foundation-v1","58e9288eabfc5e2cef0240bbf1e20cf04ca98948b0cb4b005d184f59290d418d"],"character.html|character-gear.js":["character-gear-reference-v1","1daa442103a689d9adb7921fd79a6b2a6a341383dc311906783fb65ba1f6c9c9"],"character.html|character-ui.js":["v49-phone-fixes-1","0d72630c1afdcc2fcde9d270317c789f4a64866808d2170c3a641de7a2b01ea2"],"index.html|leaflet.css":["","a7837102824184820dfa198d1ebcd109ff6d0ff9a2672a074b9a1b4d147d04c6"],"index.html|styles.css":["type-v40","b20216106746b5584b7d6ef5b2c176497e1ac68d7295b7ea96022323822a41d2"],"index.html|phoenix-journal.css":["type-v40","edea07edaf16768dfe1cc655a3081f83c79f21d52bc8d4b709fed7d80642b6f8"],"index.html|appearance.js":["type-v41","3404df095a1c1d72229fd0c6d71ebae96efb921190fd041eeedee5e5237b3878"],"index.html|guide-viewport.js":["wolf-dock-1","20d5f907be826a65d9600d8300f55aed576a428a97dc266a6f0e8146ff34d180"],"index.html|white-orchard.js":["main-route-1","2d068ea09ceff260e750baeb001782602387e90a2315968dfd0dfab2335934dc"],"index.html|leaflet.js":["","db49d009c841f5ca34a888c96511ae936fd9f5533e90d8b2c4d57596f4e5641a"],"index.html|map-data.js":["progress-r8a","2a50337714f171514069c3be78227e7434c46609e4d2203def2f066970c09f90"],"index.html|map-ui.js":["v49-phone-fixes-1","f014b2d3b2c542edb8980580a69dffc7e753b01dda774de5d2cc882d50f8a349"],"index.html|progression-data.js":["regional-foundation-v45","ebb676bb859ffebcdd68704d6feae0c5d4a0a1180a147af3f0698da6f4d7ad24"],"index.html|progression-engine.js":["progress-r8a","08a4f8c603f554b3cab32845667073dfb1cd74b99300310075fbcce947e78469"],"index.html|progression-ui.js":["v49-phone-fixes-1","e07aabe7be166324c0bcf0d261db98f0eb60388d9ac04b4dfe28c0fc1488e123"],"index.html|home-panel.js":["","3d70b46f912f244c14e8ed9d53a818c6324086ac15159afabfd73d3ffbdd01c3"],"index.html|home-metrics.js":["exploration-1","da6d41f00457ef4b5a032899cae6be0a1284ac68a03353c2719a261ce338cb96"],"index.html|medallion.js":["shared-walkthrough-v1","84c259219ac00424f81e851643e15f8c8198ec03116f424a69f4a218b0f12040"],"index.html|home-ui.js":["regional-tools-shared-1","adfa566c993d1a0cdd77712c6b0107cc09bb665f9fcc17a4ebf327331027d03b"],"index.html|diagrams-data.js":["compass-v32","16e2047d55896a544a240a0389c788c9cd130f67840389798fc9a7d114a8d69b"],"index.html|exploration-data.js":["exploration-1","3461036e472b44ddd02d86498e6a53266e90e34ad4ed8e5c4f8daf04cf7d6c8f"],"index.html|diagrams-art.js":["diagram-art-1","58f75c61a20ddcd8fdd6f73597dd7fbb9dc87d7a4eab7e4d4a2f7198ffd8f7bf"],"index.html|diagrams-compass.js":["compass-v32","fcdfbec66c53e146d42a3b791e1523f1b5807c46bccf39579771f12923b25b74"],"index.html|diagrams-ui.js":["v49-phone-fixes-1","895d3fe6d02f80a4f5abdbe3226904a3d91569ae48c792e5265ec597c932138e"],"index.html|exploration-art.js":["den-variety-3","c804a02b1101435ca68306e94614c2b8aab7f311e16b2230c92454e4f15848dd"],"index.html|exploration-ui.js":["v49-phone-fixes-1","65305d0c40bdb8b0a1c224ac997efdada9d675a6e272626123376b7153657d96"],"index.html|deck-jump.js":["velen-rail-tools-3","d205f716daa22bcc9d7e07d2154d757758fabfa9f3e46a1d9b85103a31078065"],"index.html|deck-motion.js":["swipe-box-v38","286e9c52187bb2bcc406195ca98d63eb28152b1decc940db708bac1b08bdf959"],"index.html|navigation-effects.js":["warnings-v29","9675daa545ee8d161fdad8e743225ed81dc3402291348251d5326d6fdb8fa58e"],"index.html|navigation-art.js":["warnings-takeover-v44","2c61342c2cb653f4a46db99b592732d53513ad6d776ffb6918c5330539675eed"],"index.html|velen-data-r18.js":["regional-foundation-v45","4b292527a495da0d2bd0dea2bb69007423debfb48e1b12ff09551c3d7d438af2"],"index.html|regional-registry.js":["regional-foundation-v45","2879254792d8eb34af578e05f2c614cee5d0f317bc9edff3b48a5691a5cbd283"],"index.html|velen-migration.js":["regional-foundation-v45","0642650fb58f325af2a78514cb5cefcf94ace487cde7013f6e9c69a20025c3b7"],"index.html|velen-nilf-objectives.js":["v49-phone-fixes-1","eb7d3017437a0e0234c2a222f716d7fbb48e46cc6d8c2c3922ea76aedfab23da"],"index.html|velen-nilf-progress.js":["nilf-slice2-qa4-v45","ee9086355206974758dbe3513c68ad6846b7fb2a793a7a92f4ac6a8db67e9888"],"index.html|velen-nilf-ui.js":["v49-phone-fixes-2","6b105ed0888ced2297e8783260222bc6e2ba3332bc5a8c218607762b9bee441a"],"index.html|velen-routing.js":["quest-route-maps-35","14b8cfa54373e47efcd9d2d30739e39014d3c2bc3f80a65d60c48b1ac6ac9e7a"],"index.html|velen-quest-cards.js":["velen-five-14","0d1f75f3c42d13542723be7139883f050f1e17569f13934f2c7a55efa547a045"],"index.html|velen-r18.js":["hub-progress-14","f4b1f7324e130aca1f1ec48b5101769270e055d819dd9cb79736972071cba85f"],"index.html|main-console.js":["regional-tools-shared-1","649912f36bb45e8257cff360bd267f4950007679c031e595725b4a9bac99de34"],"index.html|departure.js":["v49-phone-fixes-1","290558ed176a89cd69135dcb16b9185834ed2f85ff18e1d64c84907cf2818c48"],"index.html|quest-hubs.js":["illustrated-actions-34","c1f9d6de6e0fc714c907a1e5c3545cf2c8e67ef520bd2f01d31e4c0b89c682f7"],"index.html|quest-pages.js":["paired-slices-1","43dd4397bbd463112b5512609d230b61658c79640a2d87cf71351e1d6df808cb"],"index.html|warning-details.js":["warnings-v29","35c4b779ef6e6e96a7a56e1e4790260a2dcac4acb60e145d9ab0b04d22920ff3"],"index.html|warning-center.js":["objective-warning-v34","e90942f42271b592ad256744dbf92900b48062c13413e7fbdfb7772b4c85146f"],"index.html|search-model.js":["v49-tools-deck-1","72f270f6882f5f9d622386f36629903beea052a77d918c8498af63504b3ecaa7"],"index.html|search-ui.js":["v49-tools-deck-1","10e8cfed93a9652f7b2b7763396d252d6ec275feee26f0e36eb39386c31c92e6"],"index.html|visual-system.js":["velen-shell-v43","9e37cbafe5823a3e38aed070606e3e46ab37b55ad01763250e279461cad69bb3"],"index.html|swipe-boxes.js":["swipe-box-v39","7c8db40da453fc023fba2a769bbd763e8950ced57e3a10113499dbff089c40a8"],"index.html|reading-pilot.js":["reading-v42","8f36725f37301016795bf04c91628879a84a11b27519caa5023a276c774a5e08"],"index.html|shared-walkthrough.js":["witch-objectives-1","03a0dab64d7eafba906d44ead3bf0175283e0f2d52163090ba87b6dc0c532112"],"index.html|app.js":["v49-phone-fixes-1","7c93d275c97eebb800312f613a6878d6bf36c52f2c181d4db79a3aef038cf58e"],"index.html|weathered-r10.css":["type-v40","47de48932d1032566cae17c32f7d013976353e97d5b991fda83caab0617a9f21"],"index.html|weathered-r10.js":["quest-layout-2","de56d94946acb34809af9b26cbd9dd1f5c9d817ebe48108f1203adc0b380229d"],"index.html|desk-r11.css":["type-v40","fcd2b91593bd7eaeb68bc8feca9da000317598da11fd810e02fbac71ef2f4cb6"],"index.html|desk-r11.js":["regional-wrap-catchup-16","b8475e21507ca61546e022fd79793f5f42dbadbd00427b7c7053f11537d01d6e"],"index.html|tarot-r12.css":["type-v40","cd7e33ee80a7415f0836bf9874dc57838ebeaeb8b99742eb51300d815d759cb9"],"index.html|art-r13.css":["type-v40","96b1ae643c0329b9c5c146f0e594a3741a651d5221658c429713cc7de5ebe3ea"],"index.html|atlas-r14.css":["","139f2d397dae1af5eb721df6af38b5ca72374ff85e3b3dab3b9ea4c35df52b7b"],"index.html|atlas-r14.js":["diagrams-1","d5185c09751ee5c7224cc861bb8d13539a9caca7763a54efde5d6ccc06fd1f95"],"index.html|guide-art-r15.css":["type-v40","81cea97f5d0f4ac94d132d914907fda5489cc1fdc20168a503a4eee6c287347f"],"index.html|guide-art-r15.js":["quest-layout-2","b2136096e6c73b88eb72ebd96d0c30ac7e23b198b72310db0807139439aba118"],"index.html|console-r16.css":["type-v40","737302d97dbd16cd664c8d1e3d2bfe39df8c0c12f673c861359ff1d5521c6960"],"index.html|console-r16.js":["stage1","185cb0f854f00b60f4c1aa9d06f8dc2c648f562d00f7f327c2450ed2c4c8798e"],"index.html|home-rebuild.css":["regional-tools-shared-1","9fb5a35f378ae7af893a39a0453ca280aa5379393bedaa2445140bd150c7760c"],"index.html|main-console.css":["type-v40","67fc2e08b30dae593e32e8b166c0c61e2153b006a531d340611e4694e0e4a793"],"index.html|diagrams.css":["type-v40","4f0e0ee01b90c1ea4e2a59e2a2f63c7c9aee7d9a6d524fb25474686512a5ea62"],"index.html|exploration.css":["type-v40","91848ac59093184caf4d45b836fa81e07ba299af5c39a60436a5869fe67ac0e0"],"index.html|departure.css":["paired-slices-1","e17654ee00fd65223600e68e7b9c4aa97e5daf9c38feb553993fcc59d99d0a22"],"index.html|quest-pages.css":["type-v40","13643cfdfefa818bd5cfaf26b7d67a31653347a033b67255df40696598e22435"],"index.html|parchment-controls.css":["type-v40","e740cd179303f916e669b3805edf5d2fdda2245af9e6e91bb5e6aa808cb36fe8"],"index.html|guide-viewport.css":["type-v40","b69476c2d4a74370cbe8e118232a65557941b489267d7bbd8ff61a76a76684b6"],"index.html|quest-deck-motion.css":["swipe-calibration-v33","e931bb4325cfcba8430552579a5bd8a2cb3fc34491a8e21bc5d9543b441b2d5f"],"index.html|warning-details.css":["warning-overlay-1","6f5bda03c23f9b372d181326c9821d566f7402ffdf935e970bc0355f8e054970"],"index.html|navigation-art.css":["wolf-menu-resize-21","db53fe087d0aa0e85c0788c3522d3daac648838ec0e3d8e0404d9f1fbca1728d"],"index.html|objective-presentation.css":["type-v40","d07539c9ad5c3c4de7add373c2d50acf7c2d0f961a19a22ae4fe93190ea4d509"],"index.html|search-ui.css":["type-v40","6b3623b2cf03033d05cd30f43a2d63d89650d089c8373846d3077d580c238b22"],"index.html|visual-system.css":["type-v40","9442198b4acc9b7988c6d8f00e579e589caa85968d25780aabf2ef1cd71e433d"],"index.html|swipe-boxes.css":["swipe-box-v38","03e84f27e8283f6d9e469ffe1e462564819be0e03ca1ed305cb629383052c6e2"],"index.html|velen-view.css":["nilf-slice2-v45","4b171890a5cef380db134efef891ad7518f0a0150510aed1ccdda6a8bc74e2cc"],"index.html|velen-activity-decks.css":["footer-checklist-1","a87da5839fe765ff89189e043a704acb23c3a958bf070d77811e65b60d75495c"],"index.html|typography.css":["type-v40","cffdd0d2e5e6d87c9ebc4cf904d3f183ed4421e3a6e2f2c3b69d0bc1a0ca1875"],"index.html|typography.js":["type-v40","13c59cc8f009f4f1beb0397c82bfd0d29ee3ee86b00e1909d4acb57df54b929f"],"index.html|reading-pilot.css":["reading-v42","a5c94a3fe763d09a8baedfe42747598beb898ad1af375a238209f7ca6914aa59"],"index.html|shared-walkthrough.css":["regional-wrap-catchup-16","6350d756f63e7ad93ca6e1c110b53e27a54713c42f8fd5e93919c30b49ecaa3f"],"index.html|nilf-forged.css":["v49-phone-fixes-1","3c3126d52dc950269ec2998003ea16bcabb16849f053f4f37af872c17f648d2d"],"index.html|character-entry.js":["character-foundation-v1","373738616ba964a5e72813ea5ec0d70e134c3b1a962b53a815c442ed308866a3"],"velen.html|velen-routing.js":["quest-route-maps-35","14b8cfa54373e47efcd9d2d30739e39014d3c2bc3f80a65d60c48b1ac6ac9e7a"],"velen.html|velen-entry.js":["velen-shell-v43","b55a79bcd3525a3aa565e6c6374e800a282946bdd98b61d1fe36850e4558a16d"]};
test('O17 cache-busting: every file changed since V50 carries a tag a returning V50 browser has not cached',()=>{
  const stale=[];
  for(const html of fs.readdirSync('.').filter(f=>f.endsWith('.html'))){const s=read(html);
    for(const m of s.matchAll(/(?:src|href)="([^"?#:]+\.(?:js|css))(?:\?v=([^"]*))?"/g)){const [ ,file,tag='']=m,base=V50_REFS[html+'|'+file];if(!base||!fs.existsSync(file))continue;if(sha(file)!==base[1]&&tag===base[0])stale.push(html+': '+file+'?v='+tag);}}
  assert.deepEqual(stale,[]);
});

test('O17 PR #30 Velen styling survives integration byte-for-byte with its tags',()=>{
  const pins={'home-rebuild.css':['velen-console-plates-2','e8d76c8d0ff8fbc894753b5d1b14f4ac8126ddd1332203d47f9a8c9d42fe4024']};
  const html=read('index.html');
  for(const [f,[tag,sum]] of Object.entries(pins)){assert.equal(sha(f),sum,f);assert.ok(html.includes(f+'?v='+tag),f+' tag');}
  for(const [f,tag] of [['nilf-forged.css','velen-nilf-hub-1'],['shared-walkthrough.css','velen-inn-walk-2'],['velen-activity-decks.css','velen-ad-plates-1'],['velen-nilf-map.css','velen-map-peers-2']])assert.ok(html.includes(f+'?v='+tag),f);
  assert.match(read('velen-nilf-map.css'),/#velen-screen \.nilf-area-map button\.nilf-map-control/,'Velen map controls stay 44px peers');
  for(const f of ['velen-r18.js','velen-nilf-map.js','velen-nilf-ui.js','velen-routing.js'])assert.ok(html.includes(f+'?v='),f+' still loaded');
});
