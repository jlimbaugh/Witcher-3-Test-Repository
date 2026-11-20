const H=require('./h.cjs');const L=require('./lib.cjs');const fs=require('fs');const EV='/workspace/qa49/docs/qa/v49/lt/evidence/';const out={};
const inv=p=>p.evaluate(()=>{const scr=document.querySelector('#velen-screen');const els=[...scr.querySelectorAll('button,a')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&!e.closest('.deck-jump,.sw-rail')});
 return els.map(e=>{const s=getComputedStyle(e),b=getComputedStyle(e,'::before');const r=e.getBoundingClientRect();return {t:(e.textContent.trim().replace(/\s+/g,' ')||e.getAttribute('aria-label')||'').slice(0,32),tag:e.tagName,cls:e.className.toString().slice(0,40),x:Math.round(r.left),y:Math.round(r.top+scr.closest('.phoenix-reader').scrollTop),w:Math.round(r.width),h:Math.round(r.height),bg:s.backgroundColor,shadow:s.boxShadow.slice(0,20),border:s.borderTopWidth,clip:b.clipPath.slice(0,30),filter:s.filter.slice(0,30)};});});
(async()=>{const {p,close}=await H.launch({mobile:true,w:390,h:844});
for(const [pg,route] of [['hub','#velen/hub/nilf'],['wt','#velen/quest/nilf/1']]){await p.goto(H.BASE+route,{waitUntil:'networkidle2'});await H.sleep(1800);
 out[pg]=await inv(p);
 out[pg+'-cut']=await p.evaluate(()=>getComputedStyle(document.body).getPropertyValue('--nilf-button-cut').trim().slice(0,60));}
// return to hub details
out.returnHub=await p.evaluate(()=>{const a=[...document.querySelectorAll('#velen-screen a,#velen-screen button')].find(e=>/Return to hub/.test(e.textContent));if(!a)return null;const b=getComputedStyle(a,'::before'),af=getComputedStyle(a,'::after');return {html:a.outerHTML.slice(0,300),parent:a.parentElement.className,beforeContent:b.content,beforeClip:b.clipPath.slice(0,40),beforeBg:b.backgroundImage.slice(0,60),afterContent:af.content,rect:JSON.stringify(a.getBoundingClientRect())};});
// states: focus, active, disabled on walkthrough
await p.evaluate(()=>{const b=[...document.querySelectorAll('#velen-screen [data-velen-nilf] button')].find(b=>/Quest cards|Previous|Next/.test(b.textContent))||document.querySelector('#velen-screen .quest-page-tools a');b.scrollIntoView({block:'center'});});await H.sleep(500);
out.disabled=await p.evaluate(()=>[...document.querySelectorAll('#velen-screen [data-velen-nilf] button:disabled')].map(b=>b.textContent.trim().slice(0,30)+' opacity '+getComputedStyle(b).opacity));
// focus via keyboard on Quest cards
const qc=await p.evaluateHandle(()=>[...document.querySelectorAll('#velen-screen .quest-page-tools a, #velen-screen .quest-page-tools button')].find(e=>/Quest cards/.test(e.textContent)));
if(qc.asElement()){await qc.asElement().focus();await p.keyboard.press('Shift');await p.evaluate(()=>{document.activeElement.scrollIntoView({block:'center'})});await H.sleep(300);out.focusOutline=await p.evaluate(()=>{const s=getComputedStyle(document.activeElement);return s.outline+' offset '+s.outlineOffset;});
 const bx=await qc.asElement().boundingBox();await p.screenshot({path:EV+'03-wt-tools-focus-390.jpg',type:'jpeg',quality:60,clip:{x:0,y:Math.max(0,bx.y-120),width:390,height:260}});}
// objective controls + review dialog
await p.goto(H.BASE+'#velen/quest/nilf/1',{waitUntil:'networkidle2'});await H.sleep(1500);
out.objControls=await p.evaluate(()=>[...document.querySelectorAll('#velen-screen :is(.objective-controls,.quest-hub-rail-controls) > *')].map(e=>{const r=e.getBoundingClientRect();return e.textContent.trim().slice(0,20)+' '+Math.round(r.left)+','+Math.round(r.top)+' '+Math.round(r.width)+'x'+Math.round(r.height)+(e.disabled?' disabled':'');}));
await p.evaluate(()=>document.querySelector('#velen-screen .objective-controls, #velen-screen .sw-selector')?.scrollIntoView({block:'center'}));await H.sleep(400);
await p.screenshot({path:EV+'03-wt-objective-controls-390.jpg',type:'jpeg',quality:60});
// trigger a dialog: check 'ask' objective out of order to get review dialog
try{await L.railCheck(p,'velen.nilf:ask',true);}catch(e){out.dlgErr=e.message;}
await H.sleep(800);out.dialog=await L.dlg(p);
out.dialogBtns=await p.evaluate(()=>{const d=[...document.querySelectorAll('dialog')].find(d=>d.open);if(!d)return null;return [...d.querySelectorAll('button')].map(b=>{const r=b.getBoundingClientRect();const s=getComputedStyle(b,'::before');return b.textContent.trim().slice(0,24)+' '+Math.round(r.left)+','+Math.round(r.top)+' '+Math.round(r.width)+'x'+Math.round(r.height)+' clip:'+(s.clipPath!=='none')+(b.disabled?' disabled':'');});});
await p.screenshot({path:EV+'03-wt-review-dialog-390.jpg',type:'jpeg',quality:60});
await L.clickDialog(p,/^Cancel$/);
await close();
fs.writeFileSync(EV+'03-buttons.json',JSON.stringify(out,null,1));
for(const pg of ['hub','wt']){console.log('==',pg,out[pg+'-cut']);for(const e of out[pg])console.log(JSON.stringify(e));}
console.log(JSON.stringify({returnHub:out.returnHub,disabled:out.disabled,focus:out.focusOutline,obj:out.objControls,dlgErr:out.dlgErr,dialog:out.dialog?.map(d=>d.id+': '+d.text.slice(0,200)),dialogBtns:out.dialogBtns},null,1));})();
