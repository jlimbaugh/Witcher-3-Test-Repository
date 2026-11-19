const H=require('./h.cjs');const fs=require('fs');const out={};
(async()=>{for(const [w,h] of [[375,667],[390,844],[430,932],[852,393]]){const {p,close}=await H.launch({mobile:true,w,h});
for(const [pg,route] of [['hub','#velen/hub/nilf'],['wt','#velen/quest/nilf/1']]){await p.goto(H.BASE+route,{waitUntil:'networkidle2'});await H.sleep(1800);
 out[w+'-'+pg]=await p.evaluate(()=>{const paper=document.querySelector('#velen-screen [data-velen-nilf] > :is(.quest-hub-paper,.reading-panel)');const s=getComputedStyle(paper);const P=paper.getBoundingClientRect();
  const bl=parseFloat(s.borderLeftWidth),br=parseFloat(s.borderRightWidth),bt=parseFloat(s.borderTopWidth),bb=parseFloat(s.borderBottomWidth);
  const pb={left:P.left+bl,right:P.right-br,top:P.top+bt,bottom:P.bottom-bb};const Hh=(pb.bottom-pb.top)+19;
  const rails=[{side:'L',x0:pb.left-7,x1:pb.left+4,y0:pb.top+0.22*(Hh-75)},{side:'R',x0:pb.right-4,x1:pb.right+7,y0:pb.top+0.65*(Hh-75)}].map(r=>({...r,y1:r.y0+75}));
  const brace={x0:(pb.left+pb.right)/2-56,x1:(pb.left+pb.right)/2+56,y1:pb.bottom+19,y0:pb.bottom-1};
  const kids=[...paper.querySelectorAll('h1,h2,h3,p,a,button,summary,.sw-box,.sw-row,.sw-selector,.quest-hub-group,.quest-hub-briefing')].filter(e=>{const b=e.getBoundingClientRect();return b.width>0&&b.height>0&&b.width<P.width;});
  const hits=[];for(const rl of [...rails,{...brace,side:'brace'}])for(const e of kids){const b=e.getBoundingClientRect();const ox=Math.min(b.right,rl.x1)-Math.max(b.left,rl.x0),oy=Math.min(b.bottom,rl.y1)-Math.max(b.top,rl.y0);if(ox>-2&&oy>0)hits.push(rl.side+': "'+(e.textContent.trim().replace(/\s+/g,' ').slice(0,34))+'" ('+e.className.toString().split(' ')[0]+') x-overlap '+ox.toFixed(1)+'px');}
  return {border:[bt,br,bb,bl],rails:rails.map(r=>r.side+' x '+r.x0.toFixed(0)+'-'+r.x1.toFixed(0)+' y '+r.y0.toFixed(0)+'-'+r.y1.toFixed(0)),hits:[...new Set(hits)]};});}
await close();}
fs.writeFileSync('/workspace/qa49/docs/qa/v49/lt/evidence/02-rail-clearance.json',JSON.stringify(out,null,1));for(const[k,v]of Object.entries(out))console.log(k,JSON.stringify(v));})();
