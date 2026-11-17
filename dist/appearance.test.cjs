
'use strict';
const {test}=require('node:test'),assert=require('node:assert/strict'),model=require('./appearance.js');
test('font and theme remain available while saved slider sizes are ignored',()=>{for(const size of [100,120,125,150,999])assert.deepEqual(model.preference({theme:'night',font:'fell',textSize:size}),{theme:'night',font:'fell',textSize:100});});
test('missing or corrupt preferences restore the intended default typography',()=>{assert.deepEqual(model.preference(null),{font:'fondamento',textSize:100});assert.deepEqual(model.preference({font:'invalid',theme:'invalid',textSize:'invalid'}),{font:'fondamento',textSize:100});assert.deepEqual(model.preference({font:'alegreya'}),{font:'alegreya',textSize:100});});
