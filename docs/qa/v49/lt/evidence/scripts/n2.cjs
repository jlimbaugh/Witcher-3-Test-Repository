const H=require('./h.cjs');const fs=require('fs');const EV='/workspace/qa49/docs/qa/v49/lt/evidence/';
const base=H.BASE;const out={};
const state=p=>p.evaluate(()=>{const f=document.querySelector('#velen-screen [data-velen-deck=quests] .deck-jump');const r=f.querySelector('.deck-jump-rail');const rr=r.getBoundingClientRect();const bs=[...r.children];
 const vis=bs.filter(b=>{const x=b.getBoundingClientRect();return x.left>=rr.left-1&&x.right<=rr.right+1;}).map(b=>b.textContent);
 const part=bs.filter(b=>{const x=b.getBoundingClientRect();return x.right>rr.left+1&&x.left<rr.right-1;}).length;
 const cur=r.querySelector('[aria-current]:not([aria-hidden])');const mid=rr.left+rr.width/2;
 const centered=bs.reduce((a,b)=>{const x=b.getBoundingClientRect();const d=Math.abs(x.left+x.width/2-mid);return d<a.d?{d,t:b.textContent}:a},{d:1e9});
 const pb=getComputedStyle(f,'::before');const fr=f.getBoundingClientRect();
 const sel=document.querySelector('[data-velen-deck=quests] .quest-card.selected');
 const acts=[...document.querySelectorAll('.home-selected-actions a')].map(a=>a.getAttribute('href'));
 const b0=bs[0].getBoundingClientRect();
 return {count:bs.length/5,btn:Math.round(b0.width)+'x'+Math.round(b0.height),fullyVisible:vis,partlyVisible:part,ariaCurrent:cur?.getAttribute('aria-label'),centeredNumber:centered.t,centerOffsetPx:+centered.d.toFixed(1),
  pointer:{w:pb.width,h:pb.height,left:pb.left,frameCenter:+(fr.left+fr.width/2).toFixed(1),railCenter:+mid.toFixed(1)},counter:document.querySelector('[data-velen-deck=quests] .velen-deck-gutter span')?.textContent,
  selected:sel?.getAttribute('aria-label')?.replace('Select quest: ',''),selectedArtAlt:sel?.querySelector('img')?.getAttribute('src'),panelTitle:document.querySelector('.selected-panel h2,.selected-panel h3,.selected-panel .scroll-title')?.textContent,actions:acts,focused:document.activeElement?.getAttribute('aria-label'),scrollY:Math.round(scrollY)};});
const names=p=>p.evaluate(()=>[...document.querySelectorAll('#velen-screen [data-velen-deck=quests] .deck-jump-rail > button:not([aria-hidden])')].map(b=>b.getAttribute('aria-label')));
const tapNum=async(p,n)=>{const h=await p.evaluateHandle(n=>{const r=document.querySelector('#velen-screen [data-velen-deck=quests] .deck-jump-rail');const rr=r.getBoundingClientRect();return [...r.children].find(b=>{const x=b.getBoundingClientRect();return b.textContent==String(n)&&x.left>=rr.left-1&&x.right<=rr.right+1;})||null;},n);const e=h.asElement();if(!e)return 'not visible';await e.tap();await H.sleep(1200);return 'tapped';};
(async()=>{
 for(const [w,h,label,mobile] of [[375,667,'375',1],[390,844,'390',1],[430,932,'430',1],[852,393,'852-landscape',1],[932,430,'932-landscape',1],[1280,900,'desktop-1280',0]]){
  const {p,close}=await H.launch({mobile:!!mobile,w,h});await p.goto(base+'#velen',{waitUntil:'networkidle2'});await H.sleep(1800);
  await p.evaluate(()=>document.querySelector('#velen-screen .deck-jump').scrollIntoView({block:'center'}));await H.sleep(500);
  out[label]={initial:await state(p)};
  await p.screenshot({path:EV+'01-strip-'+label+'.jpg',type:'jpeg',quality:55});
  await close();}
 // functional run at 390
 const {p,close}=await H.launch({mobile:true,w:390,h:844});await p.goto(base+'#velen',{waitUntil:'networkidle2'});await H.sleep(1800);
 const ls0=JSON.stringify(await H.ls(p));const N=await names(p);out.names=N;
 await p.evaluate(()=>document.querySelector('#velen-screen .deck-jump').scrollIntoView({block:'center'}));await H.sleep(400);
 // wrap backward: tap 40 from 1
 out.wrapBack={tap:await tapNum(p,40),after:await state(p)};
 // wrap forward: tap 1 from 40
 out.wrapFwd={tap:await tapNum(p,1),after:await state(p)};
 // late jump: step via taps to 38 (tap 39? visible are 39,40,1,2,3) -> tap 39 then 38? do scroll settle to late number instead
 // scroll settle: scroll rail left by 3 buttons
 const scrollBy=async dx=>{await p.evaluate(dx=>{document.querySelector('#velen-screen [data-velen-deck=quests] .deck-jump-rail').scrollBy({left:dx,behavior:'instant'});},dx);await H.sleep(1500);};
 await scrollBy(-3*68.5);out.scrollBack3={after:await state(p)};
 await scrollBy(5*68.5);out.scrollFwd5={after:await state(p)};
 // late number: tap repeatedly the leftmost visible to reach 30s
 let st=await state(p);let guard=0;
 while(!/^(3[0-9]|40)$/.test(String(st.centeredNumber))&&guard++<12){await tapNum(p,st.fullyVisible[0]);st=await state(p);}
 out.lateJump={after:st};
 await p.screenshot({path:EV+'01-strip-late-390.jpg',type:'jpeg',quality:55});
 // touch swipe on strip via CDP gesture (horizontal)
 const box=await p.evaluate(()=>{const r=document.querySelector('#velen-screen [data-velen-deck=quests] .deck-jump-rail').getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};});
 const c=await p.target().createCDPSession();
 await c.send('Input.synthesizeScrollGesture',{x:Math.round(box.x),y:Math.round(box.y),xDistance:-200,yDistance:0,gestureSourceType:'touch',speed:800});await H.sleep(1800);
 out.touchSwipeLeft200={after:await state(p)};
 // vertical gesture over strip
 const y0=await p.evaluate(()=>scrollY);const box2=await p.evaluate(()=>{const r=document.querySelector('#velen-screen [data-velen-deck=quests] .deck-jump-rail').getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};});
 await c.send('Input.synthesizeScrollGesture',{x:Math.round(box2.x),y:Math.round(box2.y),xDistance:0,yDistance:-300,gestureSourceType:'touch',speed:800});await H.sleep(1200);
 out.verticalOverStrip={before:y0,after:await p.evaluate(()=>scrollY)};
 out.progressNeutral=(JSON.stringify(await H.ls(p))===ls0);out.lsKeys=Object.keys(await H.ls(p));
 // open hub + walkthrough for late selection
 const cur=await state(p);out.openFromLate={selected:cur.selected,actions:cur.actions};
 const wt=cur.actions[0];await p.evaluate(h=>location.hash=h.replace(/^#/,''),wt);await H.sleep(1500);
 out.openFromLate.walkthrough={hash:await p.evaluate(()=>location.hash),h1:await p.evaluate(()=>[...document.querySelectorAll('#velen-screen h1,#velen-screen h2')].map(x=>x.textContent).slice(0,3))};
 await p.goBack({waitUntil:'networkidle2'});await H.sleep(1500);out.openFromLate.back=await state(p);
 const hub=cur.actions[1];await p.evaluate(h=>location.hash=h.replace(/^#/,''),hub);await H.sleep(1500);
 out.openFromLate.hub={hash:await p.evaluate(()=>location.hash),h1:await p.evaluate(()=>[...document.querySelectorAll('#velen-screen h1,#velen-screen h2')].map(x=>x.textContent).slice(0,3))};
 // keyboard
 await p.goto(base+'#velen',{waitUntil:'networkidle2'});await H.sleep(1500);
 out.keyboard=await p.evaluate(()=>{const bs=[...document.querySelectorAll('#velen-screen [data-velen-deck=quests] .deck-jump-rail > button')];return {focusable:bs.filter(b=>b.tabIndex>=0).length,hidden:bs.filter(b=>b.getAttribute('aria-hidden')).length};});
 out.logs=p._logs.filter(l=>/error/i.test(l));
 await close();fs.writeFileSync(EV+'01-strip-results.json',JSON.stringify(out,null,1));console.log(JSON.stringify(out,null,1).slice(0,9000));})();
