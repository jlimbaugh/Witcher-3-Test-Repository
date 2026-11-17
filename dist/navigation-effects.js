'use strict';
/* Approved navigation art studies: display-only, no player state or routing writes. */
(()=>{
function createHome(root){
 const img=root.querySelector('img'),canvas=root.querySelector('canvas'),ctx=canvas.getContext('2d'),replay=root.querySelector('[data-replay]'),quiet=root.querySelector('[data-quiet]'),status=root.querySelector('.ns-status'),scene=root.querySelector('.ns-scene');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const W=768,H=1152;canvas.width=W;canvas.height=H;
 const lit=document.createElement('canvas'),mask=document.createElement('canvas');lit.width=mask.width=W;lit.height=mask.height=H;const lc=lit.getContext('2d'),mc=mask.getContext('2d');
 let frame=0,start=0,ready=false;
 function rng(seed){return ()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}}
 function channel(a,b,rough,random,depth=6){if(!depth)return [a,b];const dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy)||1,k=(random()-.5)*rough;const mid=[(a[0]+b[0])/2-dy/length*k,(a[1]+b[1])/2+dx/length*k];const left=channel(a,mid,rough*.54,random,depth-1),right=channel(mid,b,rough*.54,random,depth-1);return left.slice(0,-1).concat(right)}
 function flash(seed,route,branches){const random=rng(seed);let main=[];for(let i=1;i<route.length;i++){const part=channel(route[i-1],route[i],.022,random,5);main=main.concat(i===1?part:part.slice(1))}const paths=[{points:main,width:1.1}];for(let i=0;i<branches;i++){const at=main[Math.floor((.12+random()*.76)*(main.length-1))],direction=random()>.5?1:-1,end=[Math.max(.08,Math.min(.94,at[0]+(random()-.3)*.14)),Math.max(.055,Math.min(.245,at[1]+direction*(.018+random()*.038)))];const points=channel(at,end,.015,random,5);paths.push({points,width:.32+random()*.3});if(i%3===0){const fork=points[Math.floor(points.length*.58)];paths.push({points:channel(fork,[fork[0]+.018*(random()-.5),fork[1]+.022*direction],.007,random,4),width:.25})}}return paths}
 const events=[
  {at:.7,x:.78,y:.12,r:.25,power:.72,paths:[]},
  {at:2.5,x:.53,y:.115,r:.34,power:1,paths:flash(94,[[.24,.112],[.38,.104],[.49,.145],[.63,.11],[.78,.137]],15)},
  {at:5.2,x:.83,y:.14,r:.23,power:.95,paths:flash(731,[[.77,.078],[.81,.13],[.79,.17],[.86,.225]],10)},
  {at:6.5,x:.41,y:.09,r:.23,power:.53,paths:[]}
 ];
 function clipSky(){ctx.beginPath();ctx.moveTo(.045*W,.045*H);ctx.lineTo(.95*W,.045*H);ctx.lineTo(.95*W,.25*H);ctx.lineTo(.88*W,.245*H);ctx.lineTo(.82*W,.26*H);ctx.lineTo(.75*W,.24*H);ctx.lineTo(.68*W,.226*H);ctx.lineTo(.55*W,.195*H);ctx.lineTo(.49*W,.23*H);ctx.lineTo(.42*W,.18*H);ctx.lineTo(.35*W,.13*H);ctx.lineTo(.29*W,.15*H);ctx.lineTo(.21*W,.142*H);ctx.lineTo(.14*W,.163*H);ctx.lineTo(.045*W,.21*H);ctx.closePath();ctx.clip()}
 function cloud(e,level){mc.clearRect(0,0,W,H);mc.save();mc.translate(e.x*W,e.y*H);mc.scale(1,.63);const gradient=mc.createRadialGradient(0,0,0,0,0,e.r*W);gradient.addColorStop(0,'rgba(255,255,255,.95)');gradient.addColorStop(.35,'rgba(255,255,255,.65)');gradient.addColorStop(.7,'rgba(255,255,255,.18)');gradient.addColorStop(1,'rgba(255,255,255,0)');mc.fillStyle=gradient;mc.fillRect(-W,-H,W*2,H*2);mc.restore();lc.clearRect(0,0,W,H);lc.globalCompositeOperation='source-over';lc.filter='grayscale(.7) brightness(3.5)';lc.drawImage(img,0,0,W,H);lc.filter='none';lc.globalCompositeOperation='destination-in';lc.drawImage(mask,0,0);lc.globalCompositeOperation='source-over';ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=level;ctx.drawImage(lit,0,0);ctx.restore()}
 function drawPaths(paths,level){ctx.save();ctx.lineCap='round';ctx.lineJoin='round';ctx.globalCompositeOperation='screen';for(const p of paths){ctx.beginPath();p.points.forEach(([x,y],i)=>i?ctx.lineTo(x*W,y*H):ctx.moveTo(x*W,y*H));ctx.globalAlpha=level*.21;ctx.strokeStyle='#b4bfe8';ctx.lineWidth=p.width*4;ctx.shadowColor='#a9b6d8';ctx.shadowBlur=5;ctx.stroke();ctx.globalAlpha=level;ctx.lineWidth=p.width;ctx.strokeStyle='#f4f2ff';ctx.shadowBlur=0;ctx.stroke()}ctx.restore()}
 function envelope(age){if(age<0||age>1.1)return 0;const primary=Math.exp(-Math.max(0,age-.035)/.14)*Math.min(1,age/.025);const restrike=age>.36?Math.exp(-(age-.36)/.09)*.52:0;return Math.min(1,primary+restrike)}
 function paint(t){ctx.clearRect(0,0,W,H);ctx.save();clipSky();for(const e of events){const age=t-e.at,level=envelope(age)*e.power;if(level<.004)continue;cloud(e,level*.72);const channels=age<.16?level:age>=.36&&age<.47?level*.7:level*.12;if(e.paths.length)drawPaths(e.paths,channels)}ctx.restore();if(t<8){const windows=[[.18,.367],[.607,.363],[.648,.30],[.671,.303],[.752,.408],[.907,.434]];windows.forEach(([x,y],i)=>{const glow=ctx.createRadialGradient(x*W,y*H,0,x*W,y*H,8);const alpha=.06+.035*Math.sin(t*2.2+i*1.7);glow.addColorStop(0,'rgba(255,200,119,'+alpha+')');glow.addColorStop(1,'rgba(255,180,90,0)');ctx.fillStyle=glow;ctx.fillRect(x*W-9,y*H-9,18,18)})}}
 function settle(){cancelAnimationFrame(frame);frame=0;ctx.clearRect(0,0,W,H);replay.setAttribute('aria-pressed','false');quiet.setAttribute('aria-pressed','true');status.textContent='Reading · storm settled'}
 function tick(now){const t=(now-start)/1000;paint(t);if(t<8)frame=requestAnimationFrame(tick);else settle()}
 function play(){if(!ready)return;settle();replay.setAttribute('aria-pressed','true');quiet.setAttribute('aria-pressed','false');if(reduced.matches){status.textContent='Reduced motion · steady moonlight';return}status.textContent='Cloud flashes + fine branching channels';start=performance.now();frame=requestAnimationFrame(tick)}
 reduced.addEventListener('change',settle);img.addEventListener('load',()=>{ready=true},{once:true});if(img.complete&&img.naturalWidth){ready=true}

 return {play,stop:settle,destroy(){settle();reduced.removeEventListener('change',settle)}};
}

function createRegions(root){
 const img=root.querySelector('img'),canvas=root.querySelector('canvas'),ctx=canvas.getContext('2d'),scene=root.querySelector('.rg-scene'),replay=root.querySelector('[data-replay]'),quiet=root.querySelector('[data-quiet]'),status=root.querySelector('.rg-status'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const W=768,H=1152;canvas.width=W;canvas.height=H;
 const points=[{x:843/1024,y:1133/1536},{x:576/1024,y:691/1536},{x:435/1024,y:489/1536},{x:225/1024,y:850/1536},{x:780/1024,y:258/1536},{x:854/1024,y:943/1536}];
 const center={x:164/1024,y:1248/1536},radius=73/1024;
 let ready=false,frame=0,start=0;
 function ease(a){a=Math.max(0,Math.min(1,a));return a*a*(3-2*a)}
 function heading(p){return Math.atan2(p.x-center.x,(center.y-p.y)*H/W)*180/Math.PI-43}
 function compass(t){let angle;if(t<.9){angle=155*Math.sin(Math.PI*t/.9)}else{const phase=Math.max(0,t-.9),index=Math.min(5,Math.floor(phase)),previous=index?heading(points[index-1]):0;angle=previous+(heading(points[index])-previous)*ease((phase-index)/.6)}if(t>6.9)angle*=1-ease((t-6.9)/1.1);const r=radius*W,x=center.x*W,y=center.y*H;ctx.save();ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.clip();ctx.translate(x,y);ctx.rotate(angle*Math.PI/180);ctx.drawImage(img,(center.x-radius)*img.naturalWidth,center.y*img.naturalHeight-radius*img.naturalWidth,2*radius*img.naturalWidth,2*radius*img.naturalWidth,-r,-r,2*r,2*r);ctx.restore()}
 function glow(p,strength,t,i){if(strength<.005)return;const x=p.x*W,y=p.y*H,r=27;ctx.save();ctx.globalCompositeOperation='screen';const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'rgba(225,246,174,'+strength*.68+')');g.addColorStop(.16,'rgba(171,205,115,'+strength*.65+')');g.addColorStop(.48,'rgba(102,154,76,'+strength*.42+')');g.addColorStop(1,'rgba(67,111,58,0)');ctx.fillStyle=g;ctx.fillRect(x-r,y-r,r*2,r*2);ctx.globalAlpha=strength*.75;ctx.fillStyle='#d9efb5';ctx.shadowColor='#a8c685';ctx.shadowBlur=5;ctx.beginPath();ctx.arc(x,y,1.6,0,Math.PI*2);ctx.fill();for(let j=0;j<3;j++){const phase=t*1.1+i+j*2.1;ctx.globalAlpha=strength*.28;ctx.beginPath();ctx.arc(x+Math.cos(phase)*(7+j*3),y+Math.sin(phase)*5-j*3,.7,0,Math.PI*2);ctx.fill()}ctx.restore()}
 function paint(t){ctx.clearRect(0,0,W,H);compass(t);points.forEach((p,i)=>{const age=t-(.9+i),rise=ease(age/.35),fall=1-ease((age-.6)/.75),strength=age>=0?rise*fall:0;glow(p,strength,t,i)})}
 function settle(){cancelAnimationFrame(frame);frame=0;ctx.clearRect(0,0,W,H);replay.setAttribute('aria-pressed','false');quiet.setAttribute('aria-pressed','true');status.textContent='Reading · compass and spell settled'}
 function tick(now){const t=(now-start)/1000;if(t>=8){settle();return}paint(t);frame=requestAnimationFrame(tick)}
 function play(){if(!ready)return;settle();replay.setAttribute('aria-pressed','true');quiet.setAttribute('aria-pressed','false');if(reduced.matches){status.textContent='Reduced motion · still map';return}status.textContent='Compass turns · green light visits the regions';start=performance.now();frame=requestAnimationFrame(tick)}
 reduced.addEventListener('change',settle);img.addEventListener('load',()=>{ready=true},{once:true});if(img.complete&&img.naturalWidth){ready=true}

 return {play,stop:settle,destroy(){settle();reduced.removeEventListener('change',settle)}};
}

function createDetail(item,name){const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const img=item.querySelector('img'),canvas=item.querySelector('canvas'),ctx=canvas.getContext('2d');const W=384,H=576;canvas.width=W;canvas.height=H;let frame=0,start=0;
  function halo(x,y,r,color,a){ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=a;const gradient=ctx.createRadialGradient(x*W,y*H,0,x*W,y*H,r);gradient.addColorStop(0,color);gradient.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=gradient;ctx.fillRect(x*W-r,y*H-r,2*r,2*r);ctx.restore()}
  function line(points,t,delay,color){const age=t-delay;if(age<0||age>3.5)return;const level=Math.sin(Math.min(1,age/3.5)*Math.PI);ctx.save();ctx.globalAlpha=level;ctx.strokeStyle=color;ctx.lineWidth=1;ctx.shadowBlur=3;ctx.shadowColor=color;ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p[0]*W,p[1]*H):ctx.moveTo(p[0]*W,p[1]*H));const length=300;ctx.setLineDash([length]);ctx.lineDashOffset=length*(1-Math.min(1,age/.9));ctx.stroke();ctx.restore()}
  function paint(t){ctx.clearRect(0,0,W,H);if(name==='reference'){
   halo(.66,.26,29,'#efb463',.3+.1*Math.sin(t*6));
   ctx.save();ctx.translate(.662*W,.247*H);ctx.rotate(Math.sin(t*7)*.12);ctx.fillStyle='#fff3b2';ctx.shadowColor='#ffb454';ctx.shadowBlur=7;ctx.beginPath();ctx.ellipse(0,-4,1.8,7+Math.sin(t*8)*1.5,0,0,Math.PI*2);ctx.fill();ctx.restore();
   if(t>1&&t<5){const q=(t-1)/4,x=.66-.055*Math.sin(q*Math.PI),y=.242-.065*Math.sin(q*Math.PI);ctx.save();ctx.globalAlpha=Math.sin(q*Math.PI);ctx.fillStyle='#ffe0a2';ctx.shadowColor='#f7a74c';ctx.shadowBlur=5;ctx.beginPath();ctx.arc(x*W,y*H,2,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.ellipse(x*W,y*H+6,2,5,-.2,0,Math.PI*2);ctx.fill();ctx.strokeStyle='#ffdc99';ctx.lineWidth=1.5;ctx.beginPath();ctx.moveTo(x*W-5,y*H+4);ctx.lineTo(x*W,y*H+7);ctx.lineTo(x*W+5,y*H+2);ctx.stroke();ctx.restore()}
   line([[.54,.52],[.60,.49],[.65,.46]],t,.6,'#e3edff');line([[.65,.46],[.70,.44],[.75,.42]],t,1.5,'#e3edff');
  }else if(name==='warnings'){
   const a=Math.sin(Math.min(1,t/8)*Math.PI)*.55;halo(.5,.52,180,'#9e3146',a);
   [[[.32,.36],[.43,.34],[.55,.37]],[[.61,.29],[.70,.28],[.78,.30]],[[.61,.46],[.70,.44],[.79,.45]]].forEach((points,i)=>line(points,t,.4+i*.8,'#d8a5a6'));
  }else if(name==='progress'){
   const notes=[[.19,.65],[.64,.52],[.19,.38],[.70,.29],[.59,.13]];notes.forEach(([x,y],i)=>{const age=t-(.2+i*.75),a=age>=0&&age<2.5?Math.sin(age/2.5*Math.PI)*.65:0;halo(x+.07,y,22,'#e5b46d',a);line([[x,y],[x+.04,y-.005],[x+.085,y+.002]],t,.2+i*.75,'#ffe3a9')});
  }else{
   const level=.35+.15*Math.sin(t*1.6);halo(.5,.40,125,'#3d8e82',level);
   const stars=[[.5,.25],[.25,.33],[.39,.35],[.79,.38],[.35,.56]];stars.forEach(([x,y],i)=>halo(x,y,5,'#d9f7ed',.3+.3*Math.sin(t*2+i)));
   for(const delay of [.4,1.9,3.5,5.4]){const age=t-delay;if(age<0||age>1.3)continue;const q=age/1.3,x=.78-.38*q,y=.27+.23*q;ctx.save();ctx.globalCompositeOperation='screen';ctx.globalAlpha=Math.sin(q*Math.PI);const g=ctx.createLinearGradient((x+.09)*W,(y-.055)*H,x*W,y*H);g.addColorStop(0,'#78cbb500');g.addColorStop(1,'#f0fffc');ctx.strokeStyle=g;ctx.shadowBlur=3;ctx.shadowColor='#b0ded2';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo((x+.09)*W,(y-.055)*H);ctx.lineTo(x*W,y*H);ctx.stroke();ctx.restore()}
  }}
  function stop(){cancelAnimationFrame(frame);ctx.clearRect(0,0,W,H)}function tick(now){const t=(now-start)/1000;if(t>=8){stop();return}paint(t);frame=requestAnimationFrame(tick)}function play(){stop();if(reduced.matches)return;start=performance.now();frame=requestAnimationFrame(tick)}reduced.addEventListener('change',stop);
 return {play,stop,destroy(){stop();reduced.removeEventListener('change',stop)}};
}

window.PhoenixNavigationEffects={create(root,key){return key==='home'?createHome(root):key==='regions'?createRegions(root):createDetail(root,key)}};
})();
