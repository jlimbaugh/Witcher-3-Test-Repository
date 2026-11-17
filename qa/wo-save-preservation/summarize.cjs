#!/usr/bin/env node
'use strict';
// Condenses results.json into summary.json + a Markdown table (stdout). Usage: node summarize.cjs [results.json]
const fs=require('node:fs'),path=require('node:path');
const file=process.argv[2]||path.join(__dirname,'results.json');const {meta,results}=JSON.parse(fs.readFileSync(file,'utf8'));
const rows={};
for(const r of results){const s=r.summary,k=r.name;if(!r.phases.find(p=>p.phase==='after-reload-2'))r.errors.push({phase:'probe',text:'incomplete run'});rows[k]=rows[k]||{name:k,key:r.seedKey,runs:{}};
  const fin=r.phases.find(p=>p.phase==='after-reload-2')?.storage?.[r.seedKey];let objectives=null,version=null;try{const o=JSON.parse(fin.bytes);objectives=o?.progress?.objectives??null;version=o?.version??null;}catch{}
  const msgs=[...new Set(Object.values(s.messagesByPhase).flat().filter(m=>r.seedKey.includes('velen')?m.startsWith('#velen'):m.startsWith('[data-save')).map(m=>m.replace(/^[^:]+: /,'')))];
  rows[k].runs[r.build+'/'+r.viewport]={preservedAfterLoad:s.preservedAfterLoad,preservedThroughReload2:s.preservedThroughReload2,keyWrites:s.keyWriteCount,refusedWrites:s.refusedWriteCount,firstWritePhase:s.firstKeyWrite?.phase??null,firstWriteAt:s.firstKeyWrite?.stack?.split(' | ')[1]??null,finalSha256:s.finalSha256,finalVersion:version,finalObjectives:objectives,messages:msgs,
    initialViews:s.viewsByPhase?.['after-load']??null,errors:r.errors.filter(e=>!/favicon/.test(e.text)).map(e=>e.phase+': '+e.text+(e.at?' @ '+e.at:''))};}
const out={meta:{...meta,validRecord:undefined},rows:Object.values(rows)};
fs.writeFileSync(path.join(path.dirname(file),'summary.json'),JSON.stringify(out,null,1));
const cell=(row,b)=>{const rs=['portrait','landscape'].map(v=>row.runs[b+'/'+v]).filter(Boolean);if(!rs.length)return 'not run';
  const a=rs[0],same=rs.every(x=>JSON.stringify({...x,errors:x.errors.map(e=>e.split(':')[1])})===JSON.stringify({...a,errors:a.errors.map(e=>e.split(':')[1])}));
  const pres=a.preservedThroughReload2===null?'n/a (no seed)':a.preservedThroughReload2?'bytes kept':'**overwritten** ('+a.firstWritePhase+')';
  return `${pres}; ${a.keyWrites} writes${a.refusedWrites?', '+a.refusedWrites+' refused':''}; final objectives ${JSON.stringify(a.finalObjectives)}; msg "${a.messages.join('" / "')}"${a.errors.length?'; errors: '+a.errors.length:''}${same?'':' (viewports differ)'}`;};
// Columns follow the builds in the results (QA6: baseline / qa5 / qa6; investigation: baseline / candidate).
const builds=[...new Set(results.map(r=>r.build))];
console.log('| Input | '+builds.map(b=>b+(meta.builds?.[b]?' ('+meta.builds[b]+')':'')).join(' | ')+' |\n|'+'---|'.repeat(builds.length+1));
for(const row of out.rows)console.log(`| ${row.name} | ${builds.map(b=>cell(row,b)).join(' | ')} |`);
