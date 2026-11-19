'use strict';
// LT fixes for the v49 QA findings (PR #25). Author-supplied tests (LT).
const test=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');
const model=require('./velen-routing.js');
const read=f=>fs.readFileSync(f,'utf8');
// Mirror of velen-r18.js link() href resolution (asserted below to stay in sync with the source).
const LINK_RULE="a.href=href.startsWith('index.html#')?href.slice(10):href.startsWith('#')?routeModel.sharedHash(href):href;";
const resolve=href=>href.startsWith('index.html#')?href.slice(10):href.startsWith('#')?model.sharedHash(href):href;
test('RT-01: Region Tools guide-wide tiles keep their own destinations instead of collapsing to #velen',()=>{
 const r18=read('velen-r18.js');assert.ok(r18.includes(LINK_RULE),'link() resolution rule unchanged');
 const tools=r18.slice(r18.indexOf('function regionTools()'),r18.indexOf('function consoleView()'));
 assert.match(tools,/artTile\(item\.label,'index\.html'\+item\.href,item\.src\)/,'navigation entries pass through the index.html# prefix');
 const hrefs=[...read('navigation-art.js').matchAll(/href:'(#[^']+)'/g)].map(m=>m[1]);
 assert.deepEqual(hrefs,['#home','#regions','#field-reference','#progress','#whiteorchard-constellation']);
 for(const h of hrefs){assert.equal(model.sharedHash(h),'#velen','sharedHash alone would rewrite '+h);assert.equal(resolve('index.html'+h),h,h+' keeps its destination');}
 // Velen-local tools still route inside Velen.
 assert.equal(resolve('#map'),'#velen/map');assert.equal(resolve('#merchants'),'#velen/merchants');
});
test('NILF-01 / NILF-02 / BTN-01: hub type keeps the v48 scale, hub rails sit on the border, forged plates are full size',()=>{
 const css=read('nilf-forged.css');
 assert.ok(!/quest-hub-briefing h1\s*\{/.test(css),'no Nilf override of the hub title size (v48: 32px at 390)');
 assert.ok(!/quest-hub-description/.test(css),'no Nilf override of the hub briefing size (v48: 17.6px at 390)');
 assert.match(css,/\[data-velen-nilf="hub"\] > \.quest-hub-paper::before,\s*#velen-screen \[data-velen-nilf="hub"\] > \.quest-hub-paper::after \{\s*left: -15px;\s*right: -15px;/);
 const vs=read('visual-system.css');assert.match(vs,/\.phoenix-action\[data-button-purpose\]:not\(\[data-button-purpose=plain\]\):before\{[^}]*width:27px;height:24px/,'the icon rule this fix neutralises still exists');
 assert.match(css,/\.phoenix-action\[data-button-purpose\]:not\(\[data-button-purpose=plain\][^)]*\)::before \{\s*width: auto;\s*height: auto;/);
});
test('RT-02 / RT-03: button tiles take the Merchant frame; Search and Route maps have distinct, labelled original art',()=>{
 const css=read('nilf-forged.css');
 const rule=(css.match(/html body #velen-screen \.velen-region-tools > button\.art-tile\.art-tile \{([^}]*)\}/)||[])[1];
 assert.ok(rule,'button tile frame override present');
 for(const d of ['border: 3px solid #98a497 !important','border-image: none !important','background: #18282c !important','box-shadow: 0 5px 8px #0009 !important'])assert.ok(rule.includes(d),d);
 const vv=(read('velen-view.css').match(/\.velen-view \.art-tile\{([^}]*)\}/)||[])[1]||'';for(const d of ['background:#18282c','box-shadow:0 5px 8px #0009','border:3px solid #98a497','border-radius:4px'])assert.ok(vv.includes(d),'Merchant (link) tile frame it mirrors: '+d);
 const r18=read('velen-r18.js');
 assert.ok(r18.includes("actionTile('Search','visual-art/region-tools/search.svg'"));
 assert.ok(r18.includes("artTile('Route maps','#map','visual-art/region-tools/route-maps.svg')"));
 const srcs=[...read('navigation-art.js').matchAll(/src:'([^']+)'/g)].map(m=>m[1]).concat(['visual-art/region-tools/search.svg','visual-art/region-tools/route-maps.svg','gwent-r15/gabor.webp']);
 assert.equal(new Set(srcs).size,srcs.length,'no Region Tools tile reuses another tile\'s art');
 for(const f of ['visual-art/region-tools/search.svg','visual-art/region-tools/route-maps.svg']){const svg=read(f);assert.match(svg,/not official|Not CD PROJEKT RED/i,f+' labelled');assert.ok(!/<script|href=/.test(svg),f+' has no script or external refs');}
 assert.match(read('ART-SOURCES.md'),/region-tools\/search\.svg[\s\S]*not\*{0,2}\s+official/i);
});
