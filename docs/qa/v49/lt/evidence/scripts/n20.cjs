const H=require('./h.cjs');const fs=require('fs');const out={};
(async()=>{const {p,close}=await H.launch({mobile:true,w:390,h:844});
await p.goto(H.BASE+'#velen',{waitUntil:'networkidle2'});await H.sleep(1500);
const nav=await p.$('#velen-screen [data-velen-deck=quests] .deck-jump');
const ax=await p.accessibility.snapshot({root:nav,interestingOnly:true});
out.strip={role:ax?.role,name:ax?.name,childCount:ax?.children?.length,first:ax?.children?.slice(0,3),current:(ax?.children||[]).filter(c=>c.pressed||c.current||/current/.test(JSON.stringify(c))).slice(0,2)};
out.counterLive=await p.evaluate(()=>document.querySelector('[data-velen-deck=quests] .velen-deck-gutter span')?.getAttribute('aria-live'));
for(const r of ['#velen/hub/nilf','#velen/quest/nilf/1']){await p.goto(H.BASE+r,{waitUntil:'networkidle2'});await H.sleep(1500);
 const s=await p.accessibility.snapshot({interestingOnly:true});const flat=[];(function walk(n){if(!n)return;if(['button','link','heading','checkbox'].includes(n.role))flat.push(n.role+': '+(n.name||'').slice(0,50)+(n.disabled?' [disabled]':'')+(n.checked!==undefined?' checked='+n.checked:''));(n.children||[]).forEach(walk);})(s);
 out[r]={count:flat.length,unnamed:flat.filter(x=>/: $/.test(x)),sample:flat.slice(0,60)};}
fs.writeFileSync('/workspace/qa49/docs/qa/v49/lt/evidence/08-chrome-ax-tree.json',JSON.stringify(out,null,1));
console.log(JSON.stringify({strip:out.strip,live:out.counterLive,hubUnnamed:out['#velen/hub/nilf'].unnamed,wtUnnamed:out['#velen/quest/nilf/1'].unnamed,hubCount:out['#velen/hub/nilf'].count},null,1).slice(0,2500));await close();})();
