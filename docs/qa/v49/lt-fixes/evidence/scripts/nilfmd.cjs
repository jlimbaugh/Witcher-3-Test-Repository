const o=require('/workspace/fix49/docs/qa/v49/lt-fixes/evidence/nilf-v48-before-after.json');
let a='| View | v48 H1 / briefing | before H1 / briefing | after H1 / briefing | NILF-01 |\n|---|---|---|---|---|\n',b='| View | before rails: nearest gap (px) | after rails: nearest gap (px) | NILF-02 |\n|---|---|---|---|\n',c='| View | before Return to hub plate | after | before hub Previous / Next plate | after | BTN-01 |\n|---|---|---|---|---|---|\n';
const g=r=>(r||[]).map(x=>`${x.side} ${x.nearest?x.nearest.gap+' ('+x.nearest.el.slice(0,22)+')':'none'}`).join('; ');
for(const v of Object.keys(o.after)){const V=o.v48[v],B=o.before[v],A=o.after[v];
 a+=`| ${v} | ${V.hub.h1} / ${V.hub.briefing} | ${B.hub.h1} / ${B.hub.briefing} | ${A.hub.h1} / ${A.hub.briefing} | ${A.hub.h1===V.hub.h1&&A.hub.briefing===V.hub.briefing?'✅ PASS':'❌'} |\n`;
 const minGap=r=>Math.min(...r.map(x=>x.nearest?x.nearest.gap:99));
 b+=`| ${v} | ${g(B.hub.rails)} | ${g(A.hub.rails)} | ${minGap(A.hub.rails)>=2?'✅ PASS':'❌'} |\n`;
 const pl=(r,p)=>{const x=(r||[]).find(x=>x.purpose===p);return x?x.plate.map(n=>Math.round(parseFloat(n))).join('×')+' on '+x.el.join('×'):'n/a';};
 const ok=pl(A.walk.buttons,'return').split(' on ')[0]===A.walk.buttons.find(x=>x.purpose==='return')?.el.join('×')&&['previous','next'].every(p=>{const x=A.hubButtons.find(y=>y.purpose===p);return x&&Math.round(parseFloat(x.plate[0]))===x.el[0];});
 c+=`| ${v} | ${pl(B.walk.buttons,'return')} | ${pl(A.walk.buttons,'return')} | ${pl(B.hubButtons,'previous')} / ${pl(B.hubButtons,'next')} | ${pl(A.hubButtons,'previous')} / ${pl(A.hubButtons,'next')} | ${ok?'✅ PASS':'❌'} |\n`;
 for(const x of ['v48','before','after'])if(o[x][v].errors?.length)console.error(x,v,o[x][v].errors);}
require('fs').writeFileSync('nilf01.md',a);require('fs').writeFileSync('nilf02.md',b);require('fs').writeFileSync('btn01.md',c);console.log(a,b,c);
