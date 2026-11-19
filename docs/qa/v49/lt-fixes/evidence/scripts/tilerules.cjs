const H=require('./h.cjs');
(async()=>{const {p,close}=await H.launch({mobile:true,w:390,h:844});await p.goto((process.argv[2]||'http://localhost:8150/')+'index.html#velen',{waitUntil:'networkidle0'});await H.sleep(1200);
const cdp=await p.target().createCDPSession();await cdp.send('DOM.enable');await cdp.send('CSS.enable');const {root}=await cdp.send('DOM.getDocument',{depth:-1});
const sheets={};cdp.on('CSS.styleSheetAdded',e=>sheets[e.header.styleSheetId]=e.header.sourceURL);await cdp.send('CSS.disable');await cdp.send('CSS.enable');
for(const sel of ['.velen-region-tools > a.art-tile:last-child','.velen-region-tools > button.art-tile']){console.log('=== '+sel);
const {nodeId}=await cdp.send('DOM.querySelector',{nodeId:root.nodeId,selector:sel});
const m=await cdp.send('CSS.getMatchedStylesForNode',{nodeId});
for(const x of m.matchedCSSRules){if(x.rule.origin!=='regular')continue;const t=x.rule.style.cssProperties.filter(c=>/border|background|box-shadow|color|radius|padding|line-height|wrap/.test(c.name)&&c.value&&!c.disabled&&c.text).map(c=>c.name+':'+c.value.slice(0,50));if(t.length)console.log((sheets[x.rule.styleSheetId]||'').split('/').pop()+' | '+x.rule.selectorList.text.slice(0,160),'=>',t.join('; ').slice(0,300));}}
await close();})();
