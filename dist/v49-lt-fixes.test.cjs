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
 assert.match(tools,/href:item\.href\?'index\.html'\+item\.href:null/,'navigation entries pass through the index.html# prefix');
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
test('Region Tools reuses the quest deck and approved destination art, with search below the cards',()=>{
 const src=read('velen-r18.js');
 assert.match(src,/carousel\('tools',key,\{catalogue,select\}\)/);
 assert.match(src,/if\(!tools\)\{const jump=window.createPhoenixDeckJump/);
 assert.match(src,/tools.append\(host,search\)/);
 const art=[...read('navigation-art.js').matchAll(/src:'([^']+)'/g)].map(m=>m[1]);
 for(const file of [...art,'visual-art/region-tools/route-maps.svg','gwent-r15/gabor.webp'])assert.ok(fs.existsSync(file),file);
});
