const H=require('./h.cjs');
exports.dlg=p=>p.evaluate(()=>[...document.querySelectorAll('dialog')].filter(d=>d.open).map(d=>({id:d.id,text:d.innerText.replace(/\s+\n/g,'\n').slice(0,1500),buttons:[...d.querySelectorAll('button,input[type=radio],input[type=checkbox]')].map(b=>({tag:b.tagName,type:b.type,value:b.value,name:b.name,text:(b.textContent||b.closest('label')?.textContent||'').trim().slice(0,80)}))})));
// select an objective in the rail (tap proxy if not selected) then click its checkbox
exports.railSelect=async(p,id,tap=false)=>{const sel=`.sw-rail .sw-box[data-sw-objective="${id}"]`;
 await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:'center',inline:'center'}),sel);await H.sleep(600);
 const proxy=await p.$(sel+' button.sw-check-proxy');if(proxy){tap?await proxy.tap():await proxy.click();await H.sleep(700);}
 return sel;};
exports.railCheck=async(p,id,tap=false)=>{const sel=await exports.railSelect(p,id,tap);const cb=await p.$(sel+' input[type=checkbox]');if(!cb)throw Error('no checkbox for '+id);
 await p.evaluate(s=>document.querySelector(s).scrollIntoView({block:'center',inline:'center'}),sel);await H.sleep(500);
 tap?await cb.tap():await cb.click();await H.sleep(900);};
exports.nilf=async p=>{const v=(await H.ls(p))['phoenix.region.velen.v1'];try{return JSON.parse(v);}catch{return v;}};
exports.counts=p=>p.evaluate(()=>(document.body.innerText.match(/\d+ of \d+ required completed/)||[''])[0]);
exports.status=p=>p.evaluate(()=>[...document.querySelectorAll('[role=status],.progress-toast,[aria-live]')].map(e=>e.textContent.trim()).filter(Boolean));
exports.clickDialog=async(p,re)=>{const ok=await p.evaluate(src=>{const re=new RegExp(src,'i');const d=[...document.querySelectorAll('dialog')].find(d=>d.open);if(!d)return 'no dialog';const b=[...d.querySelectorAll('button')].find(b=>re.test(b.textContent.trim())||re.test(b.value));if(!b)return 'no button';b.click();return 'clicked '+b.textContent.trim();},re.source||re);await H.sleep(900);return ok;};
