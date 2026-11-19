// storage robustness: corrupt, newer schema, denied, quota, migration
const H=require('./h.cjs'),L=require('./lib.cjs'),T=require('./pt.cjs'),fs=require('fs');
const out={};const CK='phoenix.region.velen.v1',LK='phoenix.velen.arrival.v1',WK='phoenix.whiteorchard.interaction.v1';
const msgs=p=>p.evaluate(()=>[...document.querySelectorAll('[role=alert],[role=status],.save-warning,[data-save-warning],[class*=warning],[class*=notice]')].filter(e=>e.getClientRects().length).map(e=>e.innerText.trim().replace(/\s+/g,' ').slice(0,300)).filter(t=>/save|stor|progress|record|browser/i.test(t)).filter((v,i,a)=>a.indexOf(v)===i).slice(0,12));
async function fixture(name,seed,{pre}={}){const {p,close}=await H.launch();const r={name};try{
 if(seed)await p.evaluateOnNewDocument(o=>{try{if(!sessionStorage.getItem('qa48seeded')){sessionStorage.setItem('qa48seeded','1');localStorage.clear();for(const[k,v]of Object.entries(o))localStorage.setItem(k,v);}}catch(e){}},seed);
 if(pre)await p.evaluateOnNewDocument(pre);
 await T.go(p,'#velen/quest/nilf/1');r.lsBefore=await H.ls(p).catch(e=>'ERR '+e.message);r.msgs=await msgs(p);r.counts=await L.counts(p);r.nilfText=await p.evaluate(()=>document.querySelector('main').innerText.slice(0,1500));r.inputs=await p.evaluate(()=>document.querySelectorAll('input[data-velen-check]').length);
 await p.screenshot({path:`ev/p2-${name}-load.png`});
 try{await T.check(p,'data-velen-check','velen.nilf:travel');}catch(e){r.checkErr=e.message;}
 r.uiAfter=await T.checked(p,'data-velen-check','velen.nilf:travel');r.dlg=(await L.dlg(p)).map(d=>d.text);r.msgsAfter=await msgs(p);r.status=(await L.status(p)).filter(x=>/save|undo|stor|not/i.test(x)&&!/saves in this browser/.test(x));
 r.lsAfter=await H.ls(p).catch(e=>'ERR '+e.message);await p.screenshot({path:`ev/p2-${name}-after.png`});
 await p.reload({waitUntil:'networkidle2'});await H.sleep(1500);r.uiReload=await T.checked(p,'data-velen-check','velen.nilf:travel');r.lsReload=await H.ls(p).catch(e=>'ERR '+e.message);
 // WO side
 await T.go(p,'#quest-lilac');r.woMsgs=await msgs(p);try{await T.check(p,'data-objective-check','q-lilac:ghouls');}catch(e){r.woErr=e.message;}r.woUi=await T.checked(p,'data-objective-check','q-lilac:ghouls');r.woDlg=(await L.dlg(p)).map(d=>d.text.slice(0,300));r.woMsgsAfter=await msgs(p);
 r.lsFinal=await H.ls(p).catch(e=>'ERR '+e.message);r.logs=p._logs.filter(l=>!/favicon|404/.test(l));
}catch(e){r.err=e.stack;}await close();out[name]=r;console.log('done',name);}
const deny=()=>{const t=()=>{throw new DOMException('denied','SecurityError');};Object.defineProperty(window,'localStorage',{get(){throw new DOMException('The operation is insecure.','SecurityError');}});};
const quota=()=>{const orig=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(String(k).startsWith('phoenix.'))throw new DOMException('quota','QuotaExceededError');return orig.call(this,k,v);};};
(async()=>{
 await fixture('corrupt-velen',{[CK]:'{"schema":1,"region":"velen",'});
 await fixture('newer-velen',{[CK]:JSON.stringify({schema:99,region:'velen',activities:{},future:true})});
 await fixture('corrupt-legacy',{[LK]:'not json at all'});
 await fixture('corrupt-wo',{[WK]:'{broken'});
 await fixture('unsupported-wo',{[WK]:JSON.stringify({version:2,completed:{'q-lilac':true}})});
 await fixture('quota-writes',null,{pre:quota});
 await fixture('denied-storage',null,{pre:deny});
 // migration fixtures (repo dist/slice2-nilf.test.cjs line 10 and 313)
 await fixture('mig-legacy-nilf-complete',{[LK]:JSON.stringify({version:1,selected:'pyres',lastHub:'mercy',complete:{nilf:true,pyres:true,mercy:false},stage:{nilf:4,pyres:3,mercy:2},choices:{mercy:'left'},last:{id:'mercy'}})});
 await fixture('mig-legacy-inn-fight',{[LK]:JSON.stringify({version:1,complete:{nilf:false},stage:{nilf:3},choices:{inn:'fight'}})});
 await fixture('mig-wo-valid-v45',{[WK]:fs.readFileSync('repo/qa/wo-save-preservation/fixtures/valid-record.json','utf8').trim()});
 fs.writeFileSync('ev/p2-results.json',JSON.stringify(out,null,1));})();
