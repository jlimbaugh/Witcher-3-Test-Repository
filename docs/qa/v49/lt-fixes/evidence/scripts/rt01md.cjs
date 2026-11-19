const o=require('/workspace/fix49/docs/qa/v49/lt-fixes/evidence/rt01.json');const T=['Home','Regions','Field Reference','Progress','Constellation'];
const EXP={'Home':'#home','Regions':'#regions','Field Reference':'#field-reference','Progress':'#progress','Constellation':'#whiteorchard-constellation'};
let md=`| View | Context | ${T.join(' | ')} | Back returns to origin |\n|---|---|${T.map(()=>'---').join('|')}|---|\n`;
for(const b of ['before','after'])for(const v of Object.keys(o[b]))for(const c of ['console','walkthrough']){const r=o[b][v][c];md+=`| ${b} ${v} | ${c} | ${T.map(t=>`${r[t].hash.startsWith(EXP[t])?'✅':'❌'} \`${r[t].hash}\` “${r[t].h1}”`).join(' | ')} | ${T.every(t=>r[t].backOk)?'✅ all':'❌'} |\n`;}
process.stdout.write(md);
