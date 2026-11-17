const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function setup(){const c={window:{}};vm.createContext(c);for(const f of ['white-orchard.js','map-data.js','diagrams-data.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);return c.window.PhoenixDiagramCatalog;}
test('production letterOf and firstForLetter',()=>{const cat=setup();assert.equal(cat.letterOf('Amateur\'s armor repair kit diagram'),'A');assert.equal(cat.firstForLetter([{id:'a1',name:'Alpha'},{id:'a2',name:'Another'}],'A').id,'a1');assert.equal(cat.firstForLetter([{id:'b1',name:'Beta'}],'Z'),undefined);});
test('production currentCard returns the leftmost visible card at a partial boundary',()=>{const cat=setup();
 // Alpha partially visible at -110…55, Beta at 79…244. Leftmost visible is Alpha, not the card nearest the left edge.
 const cards=[{id:'alpha',name:'Alpha',left:-110,right:55,hidden:false},{id:'beta',name:'Beta',left:79,right:244,hidden:false}];
 const card=cat.currentCard(cards,0,300);
 assert.equal(card.id,'alpha');
 assert.equal(cat.letterOf(card.name),'A');
});
test('production currentCard ignores hidden and fully offscreen cards',()=>{const cat=setup();
 const cards=[{id:'a',name:'Alpha',left:-200,right:-10,hidden:false},{id:'b',name:'Beta',left:10,right:100,hidden:true},{id:'c',name:'Gamma',left:20,right:120,hidden:false}];
 assert.equal(cat.currentCard(cards,0,200).id,'c');
});
test('production currentCard is stable after a simulated filter hides earlier letters',()=>{const cat=setup();
 const all=[{id:'a',name:'Alpha',left:0,right:80,hidden:false},{id:'m',name:'Manticore',left:90,right:170,hidden:false}];
 all[0].hidden=true;
 assert.equal(cat.currentCard(all,0,200).id,'m');
});
test('restored rail position selects the card that occupies that window',()=>{const cat=setup();
 // After restore, rail window starts at 200; the card covering that window is the current one.
 const cards=[{id:'a',name:'Alpha',left:0,right:180,hidden:false},{id:'v',name:'Viper',left:200,right:380,hidden:false}];
 assert.equal(cat.currentCard(cards,200,500).id,'v');
 assert.equal(cat.letterOf(cat.currentCard(cards,200,500).name),'V');
});
