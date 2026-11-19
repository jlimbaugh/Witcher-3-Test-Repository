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
