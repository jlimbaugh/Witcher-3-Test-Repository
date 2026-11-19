'use strict';
// v45 Slice 2 QA5 (extended in QA6 for QA5 -> QA6): cache-busting regression. Every script/stylesheet referenced from every packaged HTML entry point
// whose bytes differ from the accepted v45 release (commit a9d61c94), or which is new, must carry a ?v= tag that
// differs from the tag v45 used for it. Otherwise a returning browser may run the cached v45 copy next to new code
// (the QA4 app.js defect). Portable: v45 tags and sha256 are pinned below; optionally the pins are re-derived from
// PHOENIX_V45_BASELINE=<v45 dist dir> and must match.
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
// file (relative to dist) -> [v45 ?v= tag ('' = untagged), v45 sha256]; derived from every *.html in the v45 dist.
const V45_REFS={
  'app.js':['regional-foundation-v45','dc471ec3efa2c41c1e56e0ee414737afa51ad1f5c4da0525cf873e61d5dac64a'],
  'appearance.js':['type-v41','3404df095a1c1d72229fd0c6d71ebae96efb921190fd041eeedee5e5237b3878'],
  'art-r13.css':['type-v40','96b1ae643c0329b9c5c146f0e594a3741a651d5221658c429713cc7de5ebe3ea'],
  'atlas-r14.css':['','139f2d397dae1af5eb721df6af38b5ca72374ff85e3b3dab3b9ea4c35df52b7b'],
  'atlas-r14.js':['diagrams-1','d5185c09751ee5c7224cc861bb8d13539a9caca7763a54efde5d6ccc06fd1f95'],
  'console-r16.css':['type-v40','737302d97dbd16cd664c8d1e3d2bfe39df8c0c12f673c861359ff1d5521c6960'],
  'console-r16.js':['stage1','185cb0f854f00b60f4c1aa9d06f8dc2c648f562d00f7f327c2450ed2c4c8798e'],
  'deck-motion.js':['swipe-box-v38','286e9c52187bb2bcc406195ca98d63eb28152b1decc940db708bac1b08bdf959'],
  'departure.css':['paired-slices-1','e17654ee00fd65223600e68e7b9c4aa97e5daf9c38feb553993fcc59d99d0a22'],
  'departure.js':['paired-slices-1','d180d3c4cd50309cab42ae5911aeb8e907d00724cf37ec08c7299becc7d893c4'],
  'desk-r11.css':['type-v40','fcd2b91593bd7eaeb68bc8feca9da000317598da11fd810e02fbac71ef2f4cb6'],
  'desk-r11.js':['region-spin-2','fd71aa223797deda14ccacae094468ad428af113404653854e5318822c06baaf'],
  'diagrams-art.js':['diagram-art-1','58f75c61a20ddcd8fdd6f73597dd7fbb9dc87d7a4eab7e4d4a2f7198ffd8f7bf'],
  'diagrams-compass.js':['compass-v32','fcdfbec66c53e146d42a3b791e1523f1b5807c46bccf39579771f12923b25b74'],
  'diagrams-data.js':['compass-v32','16e2047d55896a544a240a0389c788c9cd130f67840389798fc9a7d114a8d69b'],
  'diagrams-ui.js':['search-qa-1','6163f81c1f2ae6b0cbb5682cf9ff30e4025442278275f1bfe012869ad8b18d4e'],
  'diagrams.css':['type-v40','4f0e0ee01b90c1ea4e2a59e2a2f63c7c9aee7d9a6d524fb25474686512a5ea62'],
  'exploration-art.js':['den-variety-3','c804a02b1101435ca68306e94614c2b8aab7f311e16b2230c92454e4f15848dd'],
  'exploration-data.js':['exploration-1','3461036e472b44ddd02d86498e6a53266e90e34ad4ed8e5c4f8daf04cf7d6c8f'],
  'exploration-ui.js':['warning-overlay-1','c113fa02ea952c925eb5731162e590a6bdf75ef494fa722f166a39227ddbbba9'],
  'exploration.css':['type-v40','91848ac59093184caf4d45b836fa81e07ba299af5c39a60436a5869fe67ac0e0'],
  'guide-art-r15.css':['type-v40','81cea97f5d0f4ac94d132d914907fda5489cc1fdc20168a503a4eee6c287347f'],
  'guide-art-r15.js':['quest-layout-2','b2136096e6c73b88eb72ebd96d0c30ac7e23b198b72310db0807139439aba118'],
  'guide-viewport.css':['type-v40','b69476c2d4a74370cbe8e118232a65557941b489267d7bbd8ff61a76a76684b6'],
  'guide-viewport.js':['wolf-dock-1','20d5f907be826a65d9600d8300f55aed576a428a97dc266a6f0e8146ff34d180'],
  'home-metrics.js':['exploration-1','da6d41f00457ef4b5a032899cae6be0a1284ac68a03353c2719a261ce338cb96'],
  'home-panel.js':['','3d70b46f912f244c14e8ed9d53a818c6324086ac15159afabfd73d3ffbdd01c3'],
  'home-rebuild.css':['type-v40','481357b1e0e9858d9c8b4a7343bd0fdb6e94d5445a6a4434863b146f29e6c347'],
  'home-ui.js':['paired-slices-1','d2650f48929c13e929abf5228fb33da08c04c532187fd633b66079a1befabadd'],
  'leaflet.css':['','a7837102824184820dfa198d1ebcd109ff6d0ff9a2672a074b9a1b4d147d04c6'],
  'leaflet.js':['','db49d009c841f5ca34a888c96511ae936fd9f5533e90d8b2c4d57596f4e5641a'],
  'main-console.css':['type-v40','67fc2e08b30dae593e32e8b166c0c61e2153b006a531d340611e4694e0e4a793'],
  'main-console.js':['velen-shell-v43','a4dcff365e74f31dbf0529b1e353540beb896c20edae01c59121339ae430ad7b'],
  'map-data.js':['progress-r8a','2a50337714f171514069c3be78227e7434c46609e4d2203def2f066970c09f90'],
  'map-ui.js':['exploration-1','83fa1e2a22ed528bc3117ca0884869faa78e6fcd56248ce0b56f6bf936ebe462'],
  'medallion.js':['warnings-takeover-v44','84a4684ac076352fe05d6a8aaa50b3eba35dbbdf2e8565d15b4a44c6fb6f723c'],
  'navigation-art.css':['warnings-takeover-v44','0c5f8d48e02a6b03fba938b25776ae99293a9f8e5c033b2edbd275c9f3c75e98'],
  'navigation-art.js':['warnings-takeover-v44','2c61342c2cb653f4a46db99b592732d53513ad6d776ffb6918c5330539675eed'],
  'navigation-effects.js':['warnings-v29','9675daa545ee8d161fdad8e743225ed81dc3402291348251d5326d6fdb8fa58e'],
  'objective-presentation.css':['type-v40','d07539c9ad5c3c4de7add373c2d50acf7c2d0f961a19a22ae4fe93190ea4d509'],
  'parchment-controls.css':['type-v40','e740cd179303f916e669b3805edf5d2fdda2245af9e6e91bb5e6aa808cb36fe8'],
  'phoenix-journal.css':['type-v40','edea07edaf16768dfe1cc655a3081f83c79f21d52bc8d4b709fed7d80642b6f8'],
  'progression-data.js':['regional-foundation-v45','ebb676bb859ffebcdd68704d6feae0c5d4a0a1180a147af3f0698da6f4d7ad24'],
  'progression-engine.js':['progress-r8a','08a4f8c603f554b3cab32845667073dfb1cd74b99300310075fbcce947e78469'],
  'progression-ui.js':['objective-progress-v35','ca0bd046387960ca4ea4cb59729719a14f3f4a92dd1f49e3fd3a621119c59cf0'],
  'quest-deck-motion.css':['swipe-calibration-v33','e931bb4325cfcba8430552579a5bd8a2cb3fc34491a8e21bc5d9543b441b2d5f'],
  'quest-hubs.js':['paired-slices-1','e02e19ba98f528eb3ca46263542b3b1a1134011d69698e3ccde2b9d153831b6f'],
  'quest-pages.css':['type-v40','13643cfdfefa818bd5cfaf26b7d67a31653347a033b67255df40696598e22435'],
  'quest-pages.js':['paired-slices-1','43dd4397bbd463112b5512609d230b61658c79640a2d87cf71351e1d6df808cb'],
  'reading-pilot.css':['reading-v42','a5c94a3fe763d09a8baedfe42747598beb898ad1af375a238209f7ca6914aa59'],
  'reading-pilot.js':['reading-v42','8f36725f37301016795bf04c91628879a84a11b27519caa5023a276c774a5e08'],
  'regional-registry.js':['regional-foundation-v45','2879254792d8eb34af578e05f2c614cee5d0f317bc9edff3b48a5691a5cbd283'],
  'search-model.js':['search-qa-1','c76adbe27a3b1c4d1d816ee2a28d6a5fbf1ef7f37bff1e1c02c4a3551fbd5f83'],
  'search-ui.css':['type-v40','6b3623b2cf03033d05cd30f43a2d63d89650d089c8373846d3077d580c238b22'],
  'search-ui.js':['search-qa-1','2377ce3e33be4106976b2f2d58a36238b4ac8a167f6ea516f74cd888c0faa4bf'],
  'styles.css':['type-v40','b20216106746b5584b7d6ef5b2c176497e1ac68d7295b7ea96022323822a41d2'],
  'swipe-boxes.css':['swipe-box-v38','03e84f27e8283f6d9e469ffe1e462564819be0e03ca1ed305cb629383052c6e2'],
  'swipe-boxes.js':['swipe-box-v39','7c8db40da453fc023fba2a769bbd763e8950ced57e3a10113499dbff089c40a8'],
  'tarot-r12.css':['type-v40','cd7e33ee80a7415f0836bf9874dc57838ebeaeb8b99742eb51300d815d759cb9'],
  'typography.css':['type-v40','cffdd0d2e5e6d87c9ebc4cf904d3f183ed4421e3a6e2f2c3b69d0bc1a0ca1875'],
  'typography.js':['type-v40','13c59cc8f009f4f1beb0397c82bfd0d29ee3ee86b00e1909d4acb57df54b929f'],
  'velen-data-r18.js':['regional-foundation-v45','4b292527a495da0d2bd0dea2bb69007423debfb48e1b12ff09551c3d7d438af2'],
  'velen-entry.js':['velen-shell-v43','b55a79bcd3525a3aa565e6c6374e800a282946bdd98b61d1fe36850e4558a16d'],
  'velen-migration.js':['regional-foundation-v45','0642650fb58f325af2a78514cb5cefcf94ace487cde7013f6e9c69a20025c3b7'],
  'velen-r18.js':['velen-shell-v43','5908676ffe5f29503e1fc40cc867dc6eadfda63cbc2f96b404d51c31ce3c12be'],
  'velen-routing.js':['velen-shell-v43','25224309ea4de7adebee80080359f54560b5139b0318fe7df05b1a087168c398'],
  'velen-view.css':['velen-shell-v43','a4784bcf5b667d4da921d0c781d8937a341d63d9c40707abc649dbcc0b1828a3'],
  'visual-system.css':['type-v40','9442198b4acc9b7988c6d8f00e579e589caa85968d25780aabf2ef1cd71e433d'],
  'visual-system.js':['velen-shell-v43','9e37cbafe5823a3e38aed070606e3e46ab37b55ad01763250e279461cad69bb3'],
  'warning-center.js':['objective-warning-v34','e90942f42271b592ad256744dbf92900b48062c13413e7fbdfb7772b4c85146f'],
  'warning-details.css':['warning-overlay-1','6f5bda03c23f9b372d181326c9821d566f7402ffdf935e970bc0355f8e054970'],
  'warning-details.js':['warnings-v29','35c4b779ef6e6e96a7a56e1e4790260a2dcac4acb60e145d9ab0b04d22920ff3'],
  'weathered-r10.css':['type-v40','47de48932d1032566cae17c32f7d013976353e97d5b991fda83caab0617a9f21'],
  'weathered-r10.js':['quest-layout-2','de56d94946acb34809af9b26cbd9dd1f5c9d817ebe48108f1203adc0b380229d'],
  'white-orchard.js':['main-route-1','2d068ea09ceff260e750baeb001782602387e90a2315968dfd0dfab2335934dc'],
};
const sha=f=>crypto.createHash('sha256').update(fs.readFileSync(f)).digest('hex');
function htmlFiles(dir,rel=''){let out=[];for(const e of fs.readdirSync(path.join(dir,rel),{withFileTypes:true})){if(e.name==='node_modules'||e.name.startsWith('.'))continue;const r=path.posix.join(rel,e.name);if(e.isDirectory())out=out.concat(htmlFiles(dir,r));else if(e.name.endsWith('.html'))out.push(r);}return out.sort();}
function refsOf(dir){
 const refs=[];
 for(const html of htmlFiles(dir)){
  const text=fs.readFileSync(path.join(dir,html),'utf8');
  for(const m of text.matchAll(/<(?:script|link)\b[^>]*?(?:src|href)="([^"#]+)"/g)){
   const url=m[1];if(/^[a-z]+:|^\/\//i.test(url))continue;
   const [p,q='']=url.split('?');if(!/\.(js|css)$/.test(p))continue;
   const file=path.posix.normalize(path.posix.join(path.posix.dirname(html),p));
   const tag=new URLSearchParams(q).get('v')||'';
   refs.push({html,file,tag});
  }
 }
 return refs;
}
const here=__dirname;
test('every changed or new script/stylesheet loaded by any HTML entry point carries a tag distinct from v45',()=>{
 const refs=refsOf(here),checked=[];
 assert.ok(refs.length>=Object.keys(V45_REFS).length,'expected at least the v45 script/style references');
 for(const {html,file,tag} of refs){
  const v45=V45_REFS[file],now=sha(path.join(here,file));
  if(v45&&v45[1]===now)continue; // unchanged since v45: a reused tag is correct
  checked.push(file);
  assert.ok(tag,html+': '+file+' changed or new since v45 but is untagged');
  if(v45)assert.notEqual(tag,v45[0],html+': '+file+' changed since v45 but still uses the v45 tag ?v='+v45[0]);
 }
 for(const f of ['app.js','velen-r18.js','velen-view.css','velen-nilf-objectives.js','velen-nilf-progress.js','velen-nilf-ui.js'])assert.ok(checked.includes(f),f+' must be referenced and checked');
});
// QA6: the release after QA5. Files changed since the QA5 candidate (commit 5ba73ace) must also leave QA5's tag, so a
// browser holding cached QA5 copies fetches them. QA5 = v45 plus the entries below (derived from every *.html in QA5 dist).
const QA5_DELTA={
  'app.js':['nilf-slice2-qa5-v45','e8fb57a86511c1eb1a17e8d746ec2045aab91d1fb86bf454cc044e9bbbfd26f2'],
  'velen-nilf-objectives.js':['nilf-slice2-qa4-v45','d4f64e1003ec940e074ff8ffce5768b3953ffe2822523661aebd163788b81d1c'],
  'velen-nilf-progress.js':['nilf-slice2-qa4-v45','ee9086355206974758dbe3513c68ad6846b7fb2a793a7a92f4ac6a8db67e9888'],
  'velen-nilf-ui.js':['nilf-slice2-qa4-v45','5d79aa4e7fb1f0d42c9071cd02a6483b2ea43eccf71b5d348b28ed73905f41b9'],
  'velen-r18.js':['nilf-slice2-qa3-v45','a6f24728b1c25b43a28cacab2a522d9be0b27453cf3602fcacb939cbf53cb898'],
  'velen-view.css':['nilf-slice2-v45','4b171890a5cef380db134efef891ad7518f0a0150510aed1ccdda6a8bc74e2cc'],
};
const QA5_REFS={...V45_REFS,...QA5_DELTA};
test('QA6: every script/stylesheet changed or new since QA5 carries a tag distinct from both QA5 and v45',()=>{
 const checked=[];
 for(const {html,file,tag} of refsOf(here)){
  const qa5=QA5_REFS[file],now=sha(path.join(here,file));
  if(qa5&&qa5[1]===now)continue; // unchanged since QA5: a reused tag is correct
  checked.push(file);
  assert.ok(tag,html+': '+file+' changed or new since QA5 but is untagged');
  if(qa5)assert.notEqual(tag,qa5[0],html+': '+file+' changed since QA5 but still uses the QA5 tag ?v='+qa5[0]);
  if(V45_REFS[file])assert.notEqual(tag,V45_REFS[file][0],html+': '+file+' changed but uses the v45 tag ?v='+V45_REFS[file][0]);
 }
 for(const f of ['app.js','velen-r18.js'])assert.ok(checked.includes(f),f+' changed in QA6 and must be referenced and checked');
});
// Issue #4 (shared walkthrough v1, deliberate update): app.js gained one rendering seam, so it can no longer carry the
// QA6 release tag. The QA6 facts are kept as a pinned table instead (derived from commit 804a3a2c), and the QA6 tag
// assertion now applies to the file that is still byte-identical to QA6 (velen-r18.js).
const QA6_DELTA={
  'velen-r18.js':['save-guard-qa6-v45','ef05afb54503496f6982ab106116a36a96ac779624207b31eab9cfebbfb3d94d'],
  'app.js':['save-guard-qa6-v45','2b62272e0142cd0f7faea59930603addd231440bf9fa42d91fc64c93c44f3120'],
};
const QA6_REFS={...QA5_REFS,...QA6_DELTA};
// Files changed or new since QA6 whose tag equals any earlier release tag for that file (stale for a returning browser).
function staleAgainst(refs,dir){const out=[];for(const {html,file,tag} of refs){const now=sha(path.join(dir,file)),bases=[QA6_REFS[file],QA5_REFS[file],V45_REFS[file]].filter(Boolean);
 if(QA6_REFS[file]&&QA6_REFS[file][1]===now)continue;if(!tag||bases.some(b=>b[0]===tag))out.push(html+': '+file+(tag?'?v='+tag:' (untagged)'));}return out;}
test('Combined release: changed app and Velen scripts leave the QA6 tag',()=>{
 const tags=Object.fromEntries(refsOf(here).map(r=>[r.file,r.tag]));
 assert.notEqual(sha(path.join(here,'velen-r18.js')),QA6_DELTA['velen-r18.js'][1]);assert.notEqual(tags['velen-r18.js'],'save-guard-qa6-v45');
 assert.notEqual(sha(path.join(here,'app.js')),QA6_DELTA['app.js'][1]);assert.notEqual(tags['app.js'],'save-guard-qa6-v45');
});
test('combined release: every script/stylesheet changed or new since QA6 carries a tag distinct from QA6, QA5 and v45',()=>{
 assert.deepEqual(staleAgainst(refsOf(here),here),[]);
 const changed=refsOf(here).filter(r=>!(QA6_REFS[r.file]&&QA6_REFS[r.file][1]===sha(path.join(here,r.file)))).map(r=>r.file).sort();
 assert.deepEqual([...new Set(changed)],['app.js', 'character-entry.js', 'character-gear.js', 'character-ui.js', 'character-vault.js', 'character.css', 'deck-jump.js', 'departure.js', 'desk-r11.js', 'diagrams-ui.js', 'exploration-ui.js', 'home-rebuild.css', 'home-ui.js', 'main-console.js', 'map-ui.js', 'medallion.js', 'navigation-art.css', 'nilf-forged.css', 'progression-ui.js', 'quest-hubs.js', 'search-model.js', 'search-ui.js', 'shared-walkthrough.css', 'shared-walkthrough.js', 'velen-activity-decks.css', 'velen-nilf-objectives.js', 'velen-nilf-ui.js', 'velen-quest-cards.js', 'velen-r18.js', 'velen-routing.js'],'only the combined release assets changed');
 const tags=Object.fromEntries(refsOf(here).map(r=>[r.file,r.tag]));
 for(const f of ['medallion.js'])assert.equal(tags[f],'shared-walkthrough-v1',f);
 for(const f of ['desk-r11.js', 'shared-walkthrough.css'])assert.equal(tags[f],'regional-wrap-catchup-16',f);
 for(const f of ['quest-hubs.js'])assert.equal(tags[f],'illustrated-actions-34',f);

 for(const f of ['velen-routing.js'])assert.equal(tags[f],'quest-route-maps-35',f);
 for(const f of ['app.js', 'character-ui.js', 'departure.js', 'diagrams-ui.js', 'exploration-ui.js', 'map-ui.js', 'nilf-forged.css', 'progression-ui.js', 'velen-nilf-objectives.js'])assert.equal(tags[f],'v49-phone-fixes-1',f);
 for(const f of ['velen-nilf-ui.js'])assert.equal(tags[f],'v49-phone-fixes-2',f);
 for(const f of ['main-console.js', 'home-ui.js', 'home-rebuild.css'])assert.equal(tags[f],'regional-tools-shared-1',f);
 assert.equal(tags['shared-walkthrough.js'],'witch-objectives-1');
 assert.equal(tags['velen-r18.js'],'card-edge-1');
 assert.equal(tags['velen-activity-decks.css'],'card-edge-1');
 assert.equal(tags['navigation-art.css'],'wolf-menu-resize-21');
 assert.equal(tags['progression-ui.js'],'v49-phone-fixes-1');
 for(const f of ['search-model.js', 'search-ui.js'])assert.equal(tags[f],'v49-tools-deck-1',f);
 for(const f of ['deck-jump.js'])assert.equal(tags[f],'velen-rail-tools-3',f);
 assert.equal(tags['nilf-forged.css'],'v49-phone-fixes-1');
 for(const f of ['velen-quest-cards.js'])assert.equal(tags[f],'witch-objectives-1',f);
});
test('candidate stale-tag regression: deliberately stale tags are detected',()=>{
 const refs=refsOf(here).map(r=>({...r}));
 const stale={'app.js':'save-guard-qa6-v45','medallion.js':'warnings-takeover-v44','home-ui.js':'paired-slices-1'};
 for(const r of refs)if(stale[r.file])r.tag=stale[r.file];
 const found=staleAgainst(refs,here);
 for(const f of Object.keys(stale))assert.ok(found.some(x=>x.includes(': '+f+'?v=')),f+' with an old tag must fail the cache regression');
 const untagged=refsOf(here).map(r=>r.file==='shared-walkthrough.js'?{...r,tag:''}:r);assert.ok(staleAgainst(untagged,here).some(x=>x.includes('shared-walkthrough.js (untagged)')));
});
test('pinned QA6 tag table matches PHOENIX_QA6_BASELINE when provided',(t)=>{
 const dir=process.env.PHOENIX_QA6_BASELINE;if(!dir){t.skip('PHOENIX_QA6_BASELINE not set; pinned table used');return;}
 assert.ok(fs.existsSync(dir),'PHOENIX_QA6_BASELINE does not exist: '+dir);
 const derived={};for(const {file,tag} of refsOf(dir))derived[file]=[tag,sha(path.join(dir,file))];
 assert.deepEqual(derived,QA6_REFS);
});
test('pinned QA5 tag table matches PHOENIX_QA5_BASELINE when provided',(t)=>{
 const dir=process.env.PHOENIX_QA5_BASELINE;if(!dir){t.skip('PHOENIX_QA5_BASELINE not set; pinned table used');return;}
 assert.ok(fs.existsSync(dir),'PHOENIX_QA5_BASELINE does not exist: '+dir);
 const derived={};for(const {file,tag} of refsOf(dir))derived[file]=[tag,sha(path.join(dir,file))];
 assert.deepEqual(derived,QA5_REFS);
});
test('pinned v45 tag table matches PHOENIX_V45_BASELINE when provided',(t)=>{
 const dir=process.env.PHOENIX_V45_BASELINE;if(!dir){t.skip('PHOENIX_V45_BASELINE not set; pinned table used');return;}
 assert.ok(fs.existsSync(dir),'PHOENIX_V45_BASELINE does not exist: '+dir);
 const derived={};for(const {file,tag} of refsOf(dir))derived[file]=[tag,sha(path.join(dir,file))];
 assert.deepEqual(derived,V45_REFS);
});
