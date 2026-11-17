(function(root){
'use strict';
// v44 Slice 1: import of the legacy Velen pilot record into a canonical regional record.
// - Reads phoenix.velen.arrival.v1; never writes, rewrites or deletes it.
// - Imports only whole-activity completion (complete.nilf/pyres/mercy === true) and the two
//   recorded choices (inn: peace|fight, mercy: freed|left). No per-objective marks are created.
// - Reading position (stage, selected, lastHub, last, undo) is not completion and is not imported;
//   it stays in the legacy record, which remains the live store of the v44 Velen view.
// - Unknown/invalid values are listed by path in `ignored`, never turned into outcomes.
// - Deterministic and idempotent; newer or non-import canonical data is never overwritten.
const registry=root.PhoenixRegionalRegistry||(typeof require==='function'?require('./regional-registry.js'):null);
if(!registry)throw Error('velen-migration.js requires regional-registry.js');
const LEGACY_KEY='phoenix.velen.arrival.v1',CANONICAL_KEY='phoenix.region.velen.v1',SCHEMA=1;
const velen=registry.regions.velen;
const plain=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
const has=(o,k)=>plain(o)&&Object.prototype.hasOwnProperty.call(o,k);
function fromLegacy(raw){
 if(!plain(raw))return null;
 const record={schema:SCHEMA,region:'velen',origin:{kind:'legacy-import',key:LEGACY_KEY,legacyVersion:Number.isInteger(raw.version)?raw.version:null},activities:{},choices:{},ignored:[]};
 for(const a of Object.values(velen.activities)){
  const v=has(raw.complete,a.legacy)?raw.complete[a.legacy]:undefined;
  if(v!==undefined&&typeof v!=='boolean')record.ignored.push('complete.'+a.legacy);
  record.activities[a.id]={id:a.id,legacy:a.legacy,source:a.source,requires:[...a.requires],complete:v===true,objectives:{}};
 }
 for(const [key,c] of Object.entries(velen.choices)){
  if(!has(raw.choices,key))continue;
  const v=raw.choices[key];
  if(c.options.includes(v))record.choices[key]={activity:c.activity,value:v,source:velen.activities[c.activity].source};
  else record.ignored.push('choices.'+key);
 }
 return record;
}
const stable=x=>Array.isArray(x)?'['+x.map(stable).join(',')+']':plain(x)?'{'+Object.keys(x).sort().map(k=>JSON.stringify(k)+':'+stable(x[k])).join(',')+'}':JSON.stringify(x);
function parse(text){try{return {ok:true,value:JSON.parse(text)};}catch{return {ok:false};}}
// Ownership/change guard (QA correction 2). Every record this migration writes carries
// `migration:{writer,fingerprint}`, where fingerprint = hash of the stable serialization of the
// record WITHOUT the `migration` field, i.e. exactly the content the migration wrote. A record is
// owned-and-unchanged only if the writer matches and the fingerprint recomputed from the current
// content equals the stored one. Any canonical-side edit (objectives, completion, choices, origin...)
// that does not come from this migration breaks the match, and the record is then never replaced
// by refresh nor removed by rollback. Import provenance (origin.kind) alone grants nothing.
const WRITER='velen-migration@v44-slice1';
function cyrb53(str,seed=0){let h1=0xdeadbeef^seed,h2=0x41c6ce57^seed;for(let i=0;i<str.length;i++){const ch=str.charCodeAt(i);h1=Math.imul(h1^ch,2654435761);h2=Math.imul(h2^ch,1597334677);}h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);return (4294967296*(2097151&h2)+(h1>>>0)).toString(16).padStart(14,'0');}
function content(record){const {migration,...rest}=record;return stable(rest);}
function fingerprint(record){const text=content(record);return 'cyrb53:'+cyrb53(text)+cyrb53(text,0x9e3779b9)+':'+text.length;}
function seal(record){return {...record,migration:{writer:WRITER,fingerprint:fingerprint(record)}};}
// Returns 'owned' only for an unchanged record written by this migration.
function ownership(value){
 if(!plain(value)||!Number.isInteger(value.schema)||value.schema<1)return 'unreadable';
 if(value.schema>SCHEMA)return 'newer';
 if(value.origin?.kind!=='legacy-import'||!plain(value.migration)||value.migration.writer!==WRITER||typeof value.migration.fingerprint!=='string')return 'not-owned';
 return value.migration.fingerprint===fingerprint(value)?'owned':'edited';
}
const keptStatus={unreadable:'canonical-unreadable',newer:'newer-canonical','not-owned':'canonical-kept',edited:'canonical-edited'};
function importFromStorage(storage){
 let legacyText,canonicalText;
 try{legacyText=storage.getItem(LEGACY_KEY);canonicalText=storage.getItem(CANONICAL_KEY);}catch{return {status:'storage-unavailable'};}
 let existing=null;
 if(canonicalText!=null){
  const c=parse(canonicalText),own=c.ok?ownership(c.value):'unreadable';
  if(own!=='owned')return {status:keptStatus[own]};
  existing=c.value;
 }
 if(legacyText==null)return {status:'no-legacy'};
 const l=parse(legacyText),base=l.ok?fromLegacy(l.value):null;
 if(!base)return {status:'legacy-unreadable'};
 const record=seal(base);
 if(existing&&stable(existing)===stable(record))return {status:'unchanged',record};
 try{storage.setItem(CANONICAL_KEY,JSON.stringify(record));}catch{return {status:'save-unavailable',record};}
 return {status:existing?'refreshed':'imported',record};
}
// Rollback checkpoint (QA correction 1). Removes the canonical record only when it is the
// unchanged record this migration owns; that restores the exact pre-import v44 storage state
// (the migration only ever writes when the key was absent or held its own unchanged record, and
// the legacy record is never modified). Newer-schema, native/non-import, edited or unreadable
// records are preserved. The legacy key is never touched.
function rollback(storage){
 let text;try{text=storage.getItem(CANONICAL_KEY);}catch{return {status:'storage-unavailable',removed:false};}
 if(text==null)return {status:'absent',removed:false};
 const c=parse(text),own=c.ok?ownership(c.value):'unreadable';
 if(own!=='owned')return {status:keptStatus[own],removed:false};
 try{storage.removeItem(CANONICAL_KEY);}catch{return {status:'storage-unavailable',removed:false};}
 return {status:'removed',removed:true};
}
const api=Object.freeze({LEGACY_KEY,CANONICAL_KEY,SCHEMA,WRITER,fromLegacy,fingerprint,ownership,importFromStorage,rollback});
root.PhoenixVelenMigration=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
