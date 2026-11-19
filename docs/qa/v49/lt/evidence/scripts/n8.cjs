const H=require('./h.cjs');const fs=require('fs');const {execSync}=require('child_process');const out={};
(async()=>{for(const [ver,base] of [['v49',H.BASE],['v48','http://localhost:8748/']])for(const [w,h,m] of [[375,667,1],[390,844,1],[430,932,1],[852,393,1]]){const {p,close}=await H.launch({mobile:!!m,w,h});
for(const [pg,route] of [['hub','#velen/hub/nilf'],['wt','#velen/quest/nilf/1']]){await p.goto(base+route,{waitUntil:'networkidle2'});await H.sleep(1800);
 const r=await p.evaluate(()=>{const paper=document.querySelector('#velen-screen [data-velen-nilf] > :is(.quest-hub-paper,.reading-panel)');if(!paper)return null;const P=paper.getBoundingClientRect();const Hh=P.height+19;
  const rails=[{side:'L',x0:P.left-7,x1:P.left+4,y0:P.top+0.22*(Hh-75),y1:P.top+0.22*(Hh-75)+75},{side:'R',x0:P.right-4,x1:P.right+7,y0:P.top+0.65*(Hh-75),y1:P.top+0.65*(Hh-75)+75}];
  const kids=[...paper.querySelectorAll('h1,h2,h3,p,a,button,summary,details,li,.sw-box,.sw-row')].filter(e=>{const b=e.getBoundingClientRect();return b.width>0&&b.height>0;});
  const hits=[];for(const rl of rails)for(const e of kids){const b=e.getBoundingClientRect();const ox=Math.min(b.right,rl.x1)-Math.max(b.left,rl.x0),oy=Math.min(b.bottom,rl.y1)-Math.max(b.top,rl.y0);if(ox>0&&oy>0)hits.push(rl.side+': '+(e.textContent.trim().replace(/\s+/g,' ').slice(0,40)||e.className)+' overlap '+ox.toFixed(1)+'px');}
  const kl=Math.min(...kids.map(e=>e.getBoundingClientRect().left)),kr=Math.max(...kids.map(e=>e.getBoundingClientRect().right));
  return {paper:[Math.round(P.left),Math.round(P.right)],contentLeftGap:+(kl-P.left).toFixed(1),contentRightGap:+(P.right-kr).toFixed(1),railHits:[...new Set(hits)].slice(0,6)};});
 out[ver+'-'+w+'-'+pg]=r;}
await close();}
fs.writeFileSync('/workspace/qa49/docs/qa/v49/lt/evidence/02-rail-clearance.json',JSON.stringify(out,null,1));for(const[k,v]of Object.entries(out))console.log(k,JSON.stringify(v));})();
