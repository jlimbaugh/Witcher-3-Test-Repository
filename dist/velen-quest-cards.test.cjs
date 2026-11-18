'use strict';
const {readFileSync}=require('node:fs');
const {runInNewContext}=require('node:vm');
const {test}=require('node:test');
const assert=require('node:assert/strict');
const path=require('node:path');
const routes=require('./velen-routing.js');
const legacy=require('./velen-data-r18.js');
const {window}=runInNewContext('' + readFileSync(path.join(__dirname,'velen-quest-cards.js'),'utf8') + ';({window})', {window:{}});
const cards=window.PhoenixVelenQuestCards;

test('Velen reading cards have owners, sourced instructions and reachable follow-up cards',()=>{
 for(const [id,card] of Object.entries(cards)){
  assert.ok(legacy.leads[id]?.name||card.name,id);
  assert.ok(card.briefing&&card.completion&&card.stages.length,id);
  assert.ok(card.sources.length&&card.sources.every(url=>url.startsWith('https://')),id);
  assert.equal(routes.parse('#velen/lead/'+id).id,id);
  for(const [i,stage] of card.stages.entries()){
   assert.ok(stage.title&&stage.place&&stage.actions.length,id);
   assert.equal(routes.parse('#velen/quest/'+id+'/'+(i+1)).stage,String(i+1));
   for(const [,target] of stage.links||[])assert.ok(Object.hasOwn(cards,target),id+' → '+target);
  }
 }
 assert.deepEqual(Object.keys(legacy.quests),['nilf','pyres','mercy']);
});

test('Velen quest cards reference distinct packaged WebP illustrations',()=>{
 const allArt=['art-velen/nilf.webp',legacy.quests.pyres.art,legacy.quests.mercy.art,...Object.values(cards).map(card=>card.art)];
 assert.equal(new Set(allArt).size,allArt.length);
 for(const art of allArt){
  assert.match(art,/^(?:art-velen\/)?[a-z0-9-]+\.webp$/);
  const bytes=readFileSync(path.join(__dirname,art));
  assert.equal(bytes.toString('ascii',8,12),'WEBP',art);
 }
});
