// NILF-01 / NILF-02 / BTN-01 metrics + screenshots. usage: node nilf.cjs [builds csv] [views csv]
const H=require('./h.cjs');const fs=require('fs');H.BUILDS.v48='http://localhost:8148/';
const builds=(process.argv[2]||'v48,before,after').split(',');const vsel=process.argv[3]?process.argv[3].split(','):null;
const views=vsel?H.VIEWS.filter(v=>vsel.includes(v[0])):H.VIEWS;
const metrics=p=>p.evaluate(()=>{const fs_=s=>{const e=document.querySelector(s);return e?parseFloat(getComputedStyle(e).fontSize):null;};
 const R=e=>{const r=e.getBoundingClientRect();return {x:Math.round(r.left),y:Math.round(r.top+(document.querySelector('.phoenix-reader')||document.scrollingElement).scrollTop),w:Math.round(r.width),h:Math.round(r.height),r:Math.round(r.right)};};
 const out={h1:fs_('#velen-screen .quest-hub-briefing h1'),briefing:fs_('#velen-screen .quest-hub-description')};
 // rails: pseudo boxes on .quest-hub-paper (inset 0 -7px -19px => box = paper rect expanded), rail 11x75 at left 22%/65% (before) and mirrored (after)
 const paper=document.querySelector('#velen-screen [data-velen-nilf] > .quest-hub-paper');
 if(paper){const cs=getComputedStyle(paper,'::before');out.railCSS={inset:cs.inset,bgPos:cs.backgroundPosition,bgSize:cs.backgroundSize,afterPos:getComputedStyle(paper,'::after').backgroundPosition,afterInset:getComputedStyle(paper,'::after').inset};
  const pr=paper.getBoundingClientRect();const L=parseFloat(cs.left),Rt=parseFloat(cs.right),T=parseFloat(cs.top),B=parseFloat(cs.bottom);
  const ps=getComputedStyle(paper),bl=parseFloat(ps.borderLeftWidth),br=parseFloat(ps.borderRightWidth),bt=parseFloat(ps.borderTopWidth),bb=parseFloat(ps.borderBottomWidth);out.paperBorder=[bt,br,bb,bl];const box={l:pr.left+bl+L,r:pr.right-br-Rt,t:pr.top+bt+T,b:pr.bottom-bb-B};const ah=getComputedStyle(paper,'::after');const box2={l:pr.left+bl+parseFloat(ah.left),r:pr.right-br-parseFloat(ah.right),t:pr.top+bt+parseFloat(ah.top),b:pr.bottom-bb-parseFloat(ah.bottom)};
  const pos=(b,pct)=>({l:b.l,r:b.l+11,t:b.t+(b.b-b.t-75)*pct,b:b.t+(b.b-b.t-75)*pct+75});
  const posR=(b,pct)=>({l:b.r-11,r:b.r,t:b.t+(b.b-b.t-75)*pct,b:b.t+(b.b-b.t-75)*pct+75});
  const yp=v=>parseFloat(v.split(',')[0].trim().split(' ')[1])/100;const p1=yp(cs.backgroundPosition),p2=yp(ah.backgroundPosition);
  const rails=cs.backgroundImage.includes('rail')?[['left',pos(box,p1)]]:[];if(ah.backgroundImage.includes('rail'))rails.push(['right',posR(box2,p2)]);
  const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0;};
  const ctrls=[...document.querySelectorAll('#velen-screen [data-velen-nilf] :is(a,button,summary,.quest-hub-group,.home-action-tile,h2,.quest-hub-tools)')].filter(vis);
  out.rails=rails.map(([side,r])=>{let worst=null;for(const c of ctrls){const cr=c.getBoundingClientRect();const ov=Math.min(r.r,cr.right)-Math.max(r.l,cr.left),ovy=Math.min(r.b,cr.bottom)-Math.max(r.t,cr.top);if(ovy>0){const gap=side==='left'?cr.left-r.r:r.l-cr.right;if(worst===null||gap<worst.gap)worst={gap:Math.round(gap*10)/10,el:(c.textContent||'').trim().replace(/\s+/g,' ').slice(0,40)};}}return {side,x:[Math.round(r.l),Math.round(r.r)],y:[Math.round(r.t),Math.round(r.b)],nearest:worst};});}
 out.buttons=[...document.querySelectorAll('#velen-screen [data-velen-nilf] .phoenix-action[data-button-purpose], #velen-screen [data-velen-nilf] .quest-hub-tools > a, #velen-screen [data-velen-nilf] .quest-page-tools > a')].filter(e=>e.getBoundingClientRect().width>0).map(e=>{const b=getComputedStyle(e,'::before');return {t:e.textContent.trim().slice(0,30),purpose:e.dataset.buttonPurpose||null,el:[Math.round(e.getBoundingClientRect().width),Math.round(e.getBoundingClientRect().height)],plate:[b.width,b.height],clip:b.clipPath!=='none'};});
 return out;});
(async()=>{const out=await H.matrix(async({p,build,view,base})=>{const r={};
 await p.goto(base+'index.html#velen/hub/nilf',{waitUntil:'networkidle0'});await H.sleep(1500);
 r.hub=await metrics(p);
 await H.shot(p,`nilf-${build}-hub-top-${view}`);
 // top-to-bottom read at phone width (390): sequential screenshots
 if(view==='390'||view==='desktop'){const total=await p.evaluate(()=>{const s=document.querySelector('.phoenix-reader')||document.scrollingElement;return s.scrollHeight;});const vh=await p.evaluate(()=>innerHeight);let i=0;for(let y=0;y<total&&i<10;y+=vh-80,i++){await p.evaluate(y=>(document.querySelector('.phoenix-reader')||document.scrollingElement).scrollTo(0,y),y);await H.sleep(250);await H.shot(p,`nilf-${build}-hub-read-${view}-${String(i+1).padStart(2,'0')}`);}r.readShots=i;}
 // rails crop region: scroll to Start walkthrough
 await H.toView(p,'#velen-screen [data-velen-nilf] .quest-hub-tools');await H.sleep(300);await H.shot(p,`nilf-${build}-hub-tools-${view}`);
 await p.goto(base+'index.html#velen/quest/nilf/1',{waitUntil:'networkidle0'});await H.sleep(1500);
 r.walk=await metrics(p);
 const ok=await H.toView(p,'#velen-screen [data-velen-nilf] [data-button-purpose="return"]');await H.sleep(300);await H.shot(p,`btn01-${build}-walk-return-${view}`);
 await p.goto(base+'index.html#velen/hub/nilf',{waitUntil:'networkidle0'});await H.sleep(1200);await p.evaluate(()=>document.querySelectorAll('#velen-screen details').forEach(d=>d.open=true));
 await H.toView(p,'#velen-screen [data-velen-nilf] [data-button-purpose="next"],#velen-screen .quest-hub-rail-controls');await H.sleep(300);await H.shot(p,`btn01-${build}-hub-prevnext-${view}`);
 r.hubButtons=await metrics(p).then(m=>m.buttons);
 console.log(build,view,'h1',r.hub.h1,'brief',r.hub.briefing,'rails',JSON.stringify(r.hub.rails),'btn',JSON.stringify(r.hubButtons.filter(b=>b.purpose).concat(r.walk.buttons.filter(b=>b.purpose))));
 return r;},{builds,views});
fs.writeFileSync(H.EV+'nilf-'+builds.join('-')+(vsel?'-'+vsel.join('-'):'')+'.json',JSON.stringify(out,null,1));})();
