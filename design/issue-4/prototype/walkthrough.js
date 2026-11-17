'use strict';
/* Issue #4 mockup: one component layout for every quest/region. In-memory state only (no localStorage).
   URL: ?q=wo|velen&state=default|warning|optional|info|completed[&sel=<objective key>] */
(()=>{
const D=window.MOCKUP_DATA,params=new URLSearchParams(location.search);
const qk=params.get('q')==='velen'?'velen':'wo',Q=D[qk],state=params.get('state')||'default';
// Sample progress: isolated, ephemeral, representative. Nothing here is read from or written to the browser.
const SAMPLE={wo:{selected:'trophy',done:['herbalist','buckthorn','ask','follow','site','tracks','nest','vesemir','prepare','field','kill']},
              velen:{selected:'ask',done:['travel','inn']}};
// Q3 (Cmdr, 2026-11-17): a remembered "Got it" per warning. Simulated here with an in-memory Set; production needs a new storage key (see README).
const s={selected:params.get('sel')||SAMPLE[qk].selected,done:new Set(SAMPLE[qk].done),warnOpen:state==='warning'||state==='warning-ack',ack:new Set()};
if(state==='completed')s.done.add(s.selected);
if(state==='warning-ack'){const o=Q.objectives.find(o=>o.key===s.selected),w=o&&Q.stages[o.stage].warning;if(w)s.ack.add(w.id);}
const art=p=>'../../../dist/'+p;
const el=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!=null)n.textContent=text;return n;};
const primary=Q.objectives.filter(o=>!o.optional&&!o.conditional);         // selector boxes = required journal objectives
const nextUnfinished=()=>primary.find(o=>!s.done.has(o.key));
const app=document.getElementById('app');

function heading(){
  const h=el('header','quest-heading');const img=el('img');img.src=art(Q.art);img.alt='';img.style.objectPosition=Q.artPosition||'center';
  const meta=el('p','meta',Q.region+' · Suggested level '+Q.level);meta.append(el('span','kind-chip',Q.kind.toUpperCase()));h.append(img,el('p','eyebrow','QUEST WALKTHROUGH · '+Q.region.toUpperCase()),el('h1','',Q.quest),meta);
  return h;
}
function selector(){
  const wrap=el('section','selector');wrap.setAttribute('aria-label','Objectives');
  const sel=primary.find(o=>o.key===s.selected)||primary[0],st=Q.stages[sel.stage],warn=st&&st.warning;
  // Wolf pointer: fixed above the centre of the rail. Carries the selected objective's warning, if any.
  const ww=el('div','wolf-wrap'),wolf=el('button','wolf');wolf.type='button';
  const wi=el('img');wi.src=art('visual-art/wolf-pointer.webp');wi.alt='';wolf.append(wi);
  const acked=warn&&s.ack.has(warn.id);
  if(warn){const b=el('span','wolf-badge'+(acked?' acked':' unread'),acked?'✓':'!');wolf.append(b);
    wolf.setAttribute('aria-expanded',String(s.warnOpen));wolf.setAttribute('aria-controls','warning-panel');
    wolf.setAttribute('aria-label',(s.warnOpen?'Hide':'Show')+' warning for this objective'+(acked?' (acknowledged)':' (not yet acknowledged)'));
    wolf.onclick=()=>{s.warnOpen=!s.warnOpen;render(true);};}
  else{wolf.disabled=true;wolf.setAttribute('aria-label','No warning for this objective');}
  ww.append(wolf,el('p','wolf-caption'+(acked?' acked':''),warn?((acked?'Warning, acknowledged':'Warning')+(s.warnOpen?' · tap the wolf to close':' · tap the wolf')):''));
  wrap.append(ww);
  if(warn&&s.warnOpen){const p=el('div','warning-panel');p.id='warning-panel';p.setAttribute('role','region');p.setAttribute('aria-label','Warning');
    p.append(el('h3','',warn.short));
    const ackRow=el('div','ack-row');
    if(acked){ackRow.append(el('span','ack-done','✓ Acknowledged. The wolf will not mark this warning as new again.'));
      const u=el('button','ack-btn secondary','Mark as new');u.type='button';u.onclick=()=>{s.ack.delete(warn.id);render(true);};ackRow.append(u);}
    else{const g=el('button','ack-btn','Got it');g.type='button';g.setAttribute('aria-label','Got it: acknowledge this warning');g.onclick=()=>{s.ack.add(warn.id);render(true);};
      ackRow.append(g,el('span','ack-hint','Clears the new-warning dot for this warning. Does not change progress.'));}
    p.append(ackRow);
    if(warn.sections.length){const dl=el('dl');for(const [k,v] of warn.sections)dl.append(el('dt','',k),el('dd','',v));p.append(dl);}
    p.append(el('p','provenance','Shown for: '+sel.label+' Mockup: acknowledgment is held in memory only.'));wrap.append(p);}
  const rail=el('div','rail');rail.setAttribute('role','listbox');rail.setAttribute('aria-label','Objectives, swipe or tap to choose');
  for(const o of primary){const b=el('div','box'+(o.key===sel.key?' selected':'')+(s.done.has(o.key)?' done':''));b.dataset.key=o.key;
    b.setAttribute('role','option');b.setAttribute('aria-selected',String(o.key===sel.key));b.tabIndex=o.key===sel.key?0:-1;
    const c=el('button','check');c.type='button';const box=el('span','',s.done.has(o.key)?'✓':'');c.append(box);
    c.setAttribute('aria-pressed',String(s.done.has(o.key)));c.setAttribute('aria-label',(s.done.has(o.key)?'Completed: ':'Mark complete: ')+o.label);
    if(o.key!==sel.key){c.tabIndex=-1;c.setAttribute('aria-disabled','true');}
    c.onclick=e=>{e.stopPropagation();if(o.key!==s.selected){choose(o.key);return;}s.done.has(o.key)?s.done.delete(o.key):s.done.add(o.key);render(true);}; // completion never advances
    const name=el('div','name',o.label);if(s.done.has(o.key))name.append(el('span','tick-note','Completed'));
    b.append(c,name);b.onclick=()=>choose(o.key);rail.append(b);}
  rail.addEventListener('keydown',e=>{const i=primary.findIndex(o=>o.key===s.selected);if(e.key==='ArrowRight'&&primary[i+1])choose(primary[i+1].key,true);if(e.key==='ArrowLeft'&&primary[i-1])choose(primary[i-1].key,true);});
  let t;rail.addEventListener('scroll',()=>{clearTimeout(t);t=setTimeout(()=>{const r=rail.getBoundingClientRect(),mid=r.left+r.width/2;let best=null,dist=1e9;for(const b of rail.children){const bb=b.getBoundingClientRect(),d=Math.abs(bb.left+bb.width/2-mid);if(d<dist){dist=d;best=b;}}if(best&&best.dataset.key!==s.selected)choose(best.dataset.key,false,true);},140);},{passive:true});
  wrap.append(rail);
  const idx=primary.indexOf(sel)+1,done=primary.filter(o=>s.done.has(o.key)).length;
  const line=el('div','status-line');line.append(el('span','position','OBJECTIVE '+idx+' OF '+primary.length));
  const nu=nextUnfinished();
  if(nu&&nu.key!==sel.key){const n=el('button','next-btn','Next unfinished →');n.type='button';n.setAttribute('aria-label','Go to next unfinished objective: '+nu.label);n.onclick=()=>choose(nu.key);line.append(n);}
  else line.append(el('span','on-next',nu?'This is your next unfinished objective':'All required objectives completed'));
  const pr=el('div','progress');const bar=el('span','bar');const fill=el('i');fill.style.width=(100*done/primary.length)+'%';bar.append(fill);
  pr.append(el('span','',done+' of '+primary.length+' required completed'),bar);line.append(pr);
  const cond=Q.objectives.filter(o=>o.conditional);
  if(cond.length)line.append(el('span','route-note','Route-dependent, not counted yet: '+cond.map(o=>o.label).join(' ')));
  wrap.append(line);
  requestAnimationFrame(()=>{const b=rail.querySelector('.selected');if(b)rail.scrollLeft=b.offsetLeft-(rail.clientWidth-b.offsetWidth)/2;});
  return wrap;
}
function reading(){
  const sel=primary.find(o=>o.key===s.selected)||primary[0],st=Q.stages[sel.stage];const r=el('section','reading');r.setAttribute('aria-live','polite');
  r.append(el('h2','',st.title));if(st.place)r.append(el('p','place',st.place));r.append(el('span','ornament'));
  // Q1 (Cmdr, 2026-11-17): keep the shared stage text and name the selected objective above the actions.
  const fo=el('div','for-objective');fo.append(el('span','label','SELECTED OBJECTIVE'),el('strong','',sel.label));r.append(fo);
  r.append(el('h3','','WHAT TO DO'));const ol=el('ol','actions');for(const a of st.actions)ol.append(el('li','',a));r.append(ol);
  if(st.choices.length){r.append(el('h3','','CHOICE'));const ul=el('ul','choices');for(const c of st.choices)ul.append(el('li','',c));r.append(ul);}
  if(st.explanation.length){r.append(el('h3','','WHY'));const ex=el('div','explain');for(const p of st.explanation)ex.append(el('p','',p));r.append(ex);}
  // Related optional tasks: optional journal objectives mapped to this stage, then this stage's optional entries.
  const opt=el('details','row');opt.id='optional';if(state==='optional')opt.open=true;
  const optObjs=Q.objectives.filter(o=>o.optional&&o.stage===sel.stage),near=st.nearby,total=optObjs.length+near.length;
  const sum=el('summary');sum.append('Related optional tasks ',el('span','count','· '+total));opt.append(sum);const ob=el('div','row-body');
  ob.append(el('h3','','OPTIONAL OBJECTIVES'));
  for(const o of optObjs){const it=el('div','opt-item'),c=el('button','check');c.type='button';c.append(el('span','',s.done.has(o.key)?'✓':''));c.setAttribute('aria-label','Mark optional objective complete: '+o.label);c.onclick=()=>{s.done.has(o.key)?s.done.delete(o.key):s.done.add(o.key);render(true);};
    const t=el('div');t.append(el('span','kind','Optional journal objective'),o.label);it.append(c,t);ob.append(it);}
  if(!optObjs.length)ob.append(el('p','empty','No optional objective is linked to this objective.'));
  // Q2 (Cmdr, 2026-11-17): nearby activities also go here, labelled "Nearby".
  ob.append(el('h3','','NEARBY'));
  for(const d of near){const it=el('div','opt-item nearby'),t=el('div');const a=el('a','link-entry',d.label+' →');a.href='#';a.onclick=e=>e.preventDefault();
    t.append(el('span','kind','Nearby · '+d.kind),a);if(d.context)t.append(el('p','context',d.context));it.append(el('span','pin','◆'),t);ob.append(it);}
  if(!near.length)ob.append(el('p','empty','No nearby activity is recorded for this objective.'));
  opt.append(ob);r.append(opt);
  const inf=el('details','row');inf.id='info';if(state==='info')inf.open=true;const is=el('summary');is.append('Information');inf.append(is);const ib=el('div','row-body');
  for(const b of st.info){ib.append(el('h3','',b.title.toUpperCase()));for(const p of b.paragraphs)ib.append(el('p','',p));}
  if(!st.info.length)ib.append(el('p','empty','No further information for this objective.'));
  inf.append(ib);r.append(inf);
  // Quest-level rows kept from the White Orchard page (unchanged roles).
  const qr=el('div','quest-rows');
  for(const b of Q.questInfo){const d=el('details','row');d.append(el('summary','',b.title));const body=el('div','row-body');for(const p of b.paragraphs||[])body.append(el('p','',p));for(const l of b.links||[]){const a=el('a','link-entry',l.replace(/^https?:\/\//,''));a.href=l;body.append(a,el('br'));}d.append(body);qr.append(d);}
  const sc=el('details','row');sc.append(el('summary','','Story & correction controls'),el('div','row-body','Unchanged from the current White Orchard page (choices, Undo). Not redesigned in this mockup; N1 stays deferred.'));qr.append(sc);
  r.append(qr);
  const fb=el('div','footer-buttons');fb.append(el('span','','↶ Return to hub'),el('span','','Map'));r.append(fb);
  return r;
}
function choose(key,focus,fromScroll){s.selected=key;s.warnOpen=false;render(false,fromScroll);if(focus)document.querySelector('.box.selected')?.focus();}
function render(keepScroll,fromScroll){const y=window.scrollY,rl=document.querySelector('.rail')?.scrollLeft;
  const panel=el('div','panel');panel.append(selector(),reading());app.replaceChildren(heading(),panel);
  if(keepScroll||fromScroll){window.scrollTo(0,y);}
}
render();
// Mockup states: bring the relevant part into view for the screenshot.
addEventListener('load',()=>setTimeout(()=>{
  const target={optional:'#optional',info:'#info'}[state];
  if(target){const n=document.querySelector(target);window.scrollTo(0,n.getBoundingClientRect().top+scrollY-170);}
},50));
})();
