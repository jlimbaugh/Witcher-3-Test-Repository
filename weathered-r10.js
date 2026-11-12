/* Presentation only. Completion, route identity and storage remain in app.js. */
'use strict';
(()=>{
 const {tasks}=window.PHOENIX_ROUTE;
 document.querySelectorAll('#home .doors>a').forEach((a,i)=>{const img=document.createElement('img');img.alt='';img.src='r10-'+(i?'map':'contract')+'.svg';img.className='door-art';a.prepend(img);});
 document.querySelectorAll('.view[data-task]').forEach(section=>{
  const task=tasks[section.dataset.task];if(!task.stages)return;
  section.classList.add('keep-walkthrough');
  const heading=section.querySelector('.page-heading'),panel=section.querySelector('.reading-panel');
  const intro=heading.querySelector('.lead');panel.prepend(intro);
  const facts=document.createElement('p');facts.className='quest-facts';facts.textContent='WHITE ORCHARD'+(task.level?' · SUGGESTED LEVEL '+task.level:'');intro.after(facts);
  const index=document.createElement('nav');index.className='scroll-index';index.setAttribute('aria-label','Walkthrough stages');
  task.stages.forEach((st,i)=>{const a=document.createElement('a');a.href='#'+task.view+'/'+st.id;a.textContent=i+1;a.setAttribute('aria-label','Stage '+(i+1)+': '+st.title);a.dataset.stageIndex=st.id;index.append(a);});panel.prepend(index);
  const nav=panel.querySelector('.stage-nav');panel.querySelector('.stage-panel').after(nav);
  const prep=document.createElement('details');prep.className='preparation-note';const summary=document.createElement('summary');summary.textContent='Preparation';const body=document.createElement('p');body.textContent=task.requirements;prep.append(summary,body);nav.before(prep);
  const note=document.createElement('p');note.className='art-review-note';note.textContent='Art review: regional CDPR atmosphere retained; quest-specific official art and foreground cutouts pending.';heading.append(note);
 });
 function reflect(){document.querySelectorAll('.keep-walkthrough').forEach(s=>s.querySelectorAll('[data-stage-index]').forEach(a=>{if(a.dataset.stageIndex===s.dataset.currentStage)a.setAttribute('aria-current','step');else a.removeAttribute('aria-current');}));}
 addEventListener('hashchange',reflect);reflect();
 const notice=document.createElement('p');notice.className='test-build';notice.textContent='R10 TEST BUILD · Visual templates under review';document.querySelector('main').prepend(notice);
})();
