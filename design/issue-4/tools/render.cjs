// Renders the issue #4 mockup states with headless Chrome (CDP). Usage: node render.cjs <baseUrl> <outDir>
const {execFileSync}=require('child_process');const path=require('path');
const [base,out]=process.argv.slice(2);const shot='/workspace/tools/shot.cjs';
// WO info state selects 'nest' because the trophy stage has no supporting information to show.
const SEL={'wo:info':'&sel=nest'};const jobs=[];for(const q of ['wo','velen'])for(const st of (process.env.STATES||'default,warning,warning-ack,optional,info,completed').split(','))jobs.push([q,st,390,844]);
if(!process.env.SKIP_LANDSCAPE)for(const q of ['wo','velen'])jobs.push([q,'default',844,390,'landscape']);
for(const [q,st,w,h,tag] of jobs){const f=path.join(out,`${q}-${tag||'portrait'}-${st}.png`);
  execFileSync('node',[shot,`${base}?q=${q}&state=${st}${(!tag&&SEL[q+':'+st])||''}`,f,String(w),String(h),'0','2'],{stdio:'inherit',timeout:90000});}
