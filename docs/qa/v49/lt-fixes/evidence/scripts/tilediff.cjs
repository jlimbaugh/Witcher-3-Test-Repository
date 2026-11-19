const H=require('./h.cjs');
(async()=>{const {p,close}=await H.launch({mobile:true,w:390,h:844});await p.goto('http://localhost:8150/index.html#velen',{waitUntil:'networkidle0'});await H.sleep(1200);
const r=await p.evaluate(()=>{const g=[...document.querySelectorAll('.velen-region-tools > *')];const m=g.find(x=>x.textContent.trim()==='Merchants'),s=g.find(x=>x.textContent.trim()==='Search');const diff=(a,b,pseudo)=>{const A=getComputedStyle(a,pseudo),B=getComputedStyle(b,pseudo);const o={};for(const k of A){if(A[k]!==B[k]&&!/^(inline-size|block-size|width|height|perspective-origin|transform-origin|cursor|align|justify|text|font|appearance)/.test(k))o[k]=[A[k],B[k]];}return o;};return {el:diff(m,s),before:diff(m,s,'::before'),after:diff(m,s,'::after'),img:diff(m.querySelector('img'),s.querySelector('img')),span:diff(m.querySelector('span'),s.querySelector('span'))};});
console.log(JSON.stringify(r,null,1));
const cdp=await p.target().createCDPSession();await cdp.send('DOM.enable');await cdp.send('CSS.enable');const {root}=await cdp.send('DOM.getDocument',{depth:-1});
const {nodeIds}=await cdp.send('DOM.querySelectorAll',{nodeId:root.nodeId,selector:'.velen-region-tools > button.art-tile'});
const m=await cdp.send('CSS.getMatchedStylesForNode',{nodeId:nodeIds[0]});
for(const x of m.matchedCSSRules){const t=x.rule.style.cssProperties.filter(c=>/border|background|box-shadow|outline|padding/.test(c.name)&&c.value).map(c=>c.name+':'+c.value.slice(0,60));if(t.length)console.log((x.rule.styleSheetId&&'')+x.rule.selectorList.text.slice(0,140),'=>',t.join('; ').slice(0,400));}
await close();})();
