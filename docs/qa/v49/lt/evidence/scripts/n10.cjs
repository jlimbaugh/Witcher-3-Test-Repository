const H=require('./h.cjs');const fs=require('fs');const {execFileSync}=require('child_process');const out={};
(async()=>{for(const [ver,base] of [['v49',H.BASE],['v48','http://localhost:8748/']]){const {p,close}=await H.launch({mobile:true,w:390,h:844});
for(const [pg,route,sels] of [['hub','#velen/hub/nilf',['.quest-hub-description','.quest-hub-paper .quiet','.nilf-hub-sources, .quest-hub-sources, a[href*="velen-sources"]','.quest-hub-briefing h1']],['wt','#velen/quest/nilf/1',['.sw-reading p','.sw-reading li','.sw-source-link, a[href*="velen-sources"]']]]){
 await p.goto(base+route,{waitUntil:'networkidle2'});await H.sleep(1800);
 for(const s of sels){const ok=await p.evaluate(s=>{const e=document.querySelector('#velen-screen '+s.split(',')[0])||document.querySelector(s);if(!e)return null;e.scrollIntoView({block:'center'});const st=getComputedStyle(e);return {color:st.color,fs:st.fontSize,text:e.textContent.trim().slice(0,40)};},s);
  if(!ok){out[ver+' '+pg+' '+s]='not found';continue;}await H.sleep(400);
  const el=await p.$('#velen-screen '+s.split(',')[0])||await p.$(s);const f='/tmp/c.png';await el.screenshot({path:f});
  const r=execFileSync('python3',['-c',`
from PIL import Image
i=Image.open('/tmp/c.png').convert('RGB');px=list(i.getdata())
def L(c):
  def f(v):
    v/=255;return v/12.92 if v<=0.03928 else ((v+0.055)/1.055)**2.4
  return 0.2126*f(c[0])+0.7152*f(c[1])+0.0722*f(c[2])
ls=sorted(L(c) for c in px);n=len(ls)
lo=sum(ls[:max(1,n//20)])/max(1,n//20);hi=sum(ls[-max(1,n//4):])/max(1,n//4)
print(round((hi+0.05)/(lo+0.05),2))`]).toString().trim();
  out[ver+' '+pg+' '+s]={...ok,approxContrast:r};}}
await close();}
fs.writeFileSync('/workspace/qa49/docs/qa/v49/lt/evidence/02-contrast.json',JSON.stringify(out,null,1));console.log(JSON.stringify(out,null,1));})();
