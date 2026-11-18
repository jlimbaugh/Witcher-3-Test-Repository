// baseline: P-01 corrupt canonical Velen notice; P-02 uncheck clears choice disclosure
const H=require('./h.cjs'),L=require('./lib.cjs'),T=require('./pt.cjs'),fs=require('fs');
const tag=process.argv[2];const out={base:H.BASE};
(async()=>{for(const [name,val] of [['corrupt','{"schema":1,"region":"velen",'],['newer',JSON.stringify({schema:99,region:'velen',activities:{}})]]){
 const {p,close}=await H.launch();await p.evaluateOnNewDocument(v=>{if(!sessionStorage.getItem('s')){sessionStorage.setItem('s','1');localStorage.setItem('phoenix.region.velen.v1',v);}},val);
 await T.go(p,'#velen/quest/nilf/1');out[name]={inputs:await p.evaluate(()=>document.querySelectorAll('input[data-velen-check]').length),notes:await T.visibleText(p,'saves in this browser|could not be read|not saved|unavailable|newer'),stored:(await H.ls(p))['phoenix.region.velen.v1']};
 await T.go(p,'#velen');out[name].hub=await T.visibleText(p,'saves in this browser|could not be read|not saved|unavailable|newer');
 await p.screenshot({path:`ev/p5-${tag}-${name}-velen.png`});await close();}
 const {p,close}=await H.launch();await T.go(p,'#velen/quest/nilf/3');
 try{await T.check(p,'data-velen-check','velen.nilf:ask');await T.selectChoice(p,'peace');await H.sleep(300);await L.clickDialog(p,/Confirm update/);
 await T.go(p,'#velen/quest/nilf/1');await T.check(p,'data-velen-check','velen.nilf:travel');out.p02_dlg=(await L.dlg(p)).map(d=>d.text);await p.screenshot({path:`ev/p5-${tag}-uncheck-dialog.png`});await L.clickDialog(p,/Confirm/);
 const r=await L.nilf(p);out.p02_after={obj:r.activities['velen.nilf'].objectives,choices:r.choices};}catch(e){out.p02_err=e.message;}
 await close();fs.writeFileSync(`ev/p5-${tag}.json`,JSON.stringify(out,null,1));console.log(JSON.stringify(out,null,1));})();
