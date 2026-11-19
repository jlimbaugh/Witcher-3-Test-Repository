const H=require('./h.cjs');
(async()=>{const {p,close}=await H.launch({mobile:true,w:390,h:844});await p.goto(H.BASE+'#velen',{waitUntil:'networkidle2'});await H.sleep(1800);
console.log(await p.evaluate(()=>{const r=document.querySelector('#velen-screen [data-velen-deck=quests] .deck-jump-rail');const cur=r.querySelector('[aria-current]:not([aria-hidden])');const o=cur.nextElementSibling;const f=e=>{const s=getComputedStyle(e);return {bg:s.backgroundColor,bgi:s.backgroundImage.slice(0,80),color:s.color,border:s.borderColor,shadow:s.boxShadow.slice(0,80),outline:s.outline,transform:s.transform,fw:s.fontWeight};};return {cur:f(cur),other:f(o)};}));
await close();})();
