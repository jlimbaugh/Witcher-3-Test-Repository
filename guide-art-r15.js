'use strict';
/* One visual vocabulary over existing routes; no completion or quest-data mutations. */
(()=>{
 const {tasks,hubs}=window.PHOENIX_ROUTE;
 const make=(tag,cls,text)=>{const e=document.createElement(tag);e.className=cls||'';if(text)e.textContent=text;return e;};
 const mainIds=new Set(['q-lilac','q-beast','q-incident']);
 const primaryFor=id=>{if(tasks[id]?.stages)return id;const task=tasks[id],hub=hubs.find(h=>h.id===task?.home);return hub?.items.find(k=>tasks[k]?.stages&&tasks[k].home===hub.id)||'q-lilac';};
 const specific={ 'loc-forge':'q-firestarter','pop-cemetery':'q-viper','gwent-start':'gwent-r15/vysogota.webp','pop-north':'q-cargo','pop-cackler':'q-missing','pop-sawmill':'q-cargo','pop-bear':'q-devil','pop-bridge':'q-lilac','departure-review':'q-incident','poi-4':'q-lilac','poi-1':'q-missing'};
 const artFor=id=>{const selected=specific[id]||primaryFor(id);return selected.includes('/')?selected:'art-r13/'+selected+'-card.webp';};
 const headingArt=(section,src,category)=>{let heading=section.querySelector('.page-heading,.region-hero,.atlas-title');if(!heading){const h1=section.querySelector('h1');if(!h1)return;const intro=h1.nextElementSibling;heading=make('div','page-heading');h1.before(heading);heading.append(h1);if(intro?.matches('p.constellation-note'))heading.append(intro);}if(!heading)return;heading.classList.add('r15-heading');const img=make('img','r15-page-art');img.alt='';img.dataset.pageArt=src;img.loading='lazy';img.decoding='async';heading.prepend(img);if(category){const label=make('span','r15-page-seal',category);label.setAttribute('aria-hidden','true');heading.append(label);}section.classList.add('r15-illustrated');};
 for(const section of document.querySelectorAll('.view[data-task]')){const id=section.dataset.task,t=tasks[id];section.dataset.artFamily=t.stages?(mainIds.has(id)?'main':t.category==='contract'?'contract':'side'):id.startsWith('loc-')?'location':'discovery';headingArt(section,artFor(id),t.stages?(t.category==='contract'?'Contract':mainIds.has(id)?'Main quest':'Side quest'):'Field note');}
 for(const [id,src,label] of [['regions','gwent-r15/cavalry.webp','The Continent'],['whiteorchard','white-orchard-scene.webp','White Orchard'],['whiteorchard-tree','art-r13/q-lilac-card.webp','Quest journal'],['whiteorchard-pois','gwent-r15/woodland.webp','Discoveries'],['economy-merchants','gwent-r15/gabor.webp','Merchants'],['whiteorchard-map','white-orchard-map.webp','Regional atlas'],['whiteorchard-constellation','gwent-r15/isbel.webp','The Constellation']]){const section=document.getElementById(id);if(section)headingArt(section,src,label);}
 for(const section of document.querySelectorAll('.view:not(.r15-illustrated):not(#home):not(#not-found)')){if(section.querySelector('h1'))headingArt(section,section.id.includes('firestarter')?'art-r13/q-firestarter-card.webp':'gwent-r15/cavalry.webp','Field journal');}
 // Every existing non-carousel navigation plate gets illustration, not a bare box.
 const navImages={'velen.html':'velen-landscape-r18.webp','#whiteorchard-tree':'gwent-r15/ivo.webp','#whiteorchard-map':'gwent-r15/vysogota.webp','#whiteorchard-pois':'gwent-r15/woodland.webp','#whiteorchard':'gwent-r15/cavalry.webp'};
 for(const link of document.querySelectorAll('.region-doors .door,.region-feature')){const src=navImages[link.getAttribute('href')];if(!src)continue;link.classList.add('r15-navigation-plate');const img=make('img','r15-nav-art');img.alt='';img.loading='lazy';img.decoding='async';img.dataset.pageArt=src;link.prepend(img);}
 document.querySelectorAll('.reading-panel,.hub-activities,.journal-sheet,.atlas-panel,.map-paper,.progress-dialog,.location-card,.region-feature').forEach(e=>e.classList.add('r15-material'));
 // Region-aware entry is carried in the URL; the only imported region remains White Orchard.
 const atlasPath=task=>'#whiteorchard-constellation/whiteorchard'+(task?'/'+task:'');
 for(const section of document.querySelectorAll('.view[data-task]')){const row=section.querySelector('.stage-links');if(row&&!row.querySelector('[data-world-atlas]')){const a=make('a','atlas-entry','Constellation');a.href=atlasPath(section.dataset.task);a.dataset.worldAtlas='';row.append(a);}}
 let selectedTask='';
 function reflect(){const root=location.hash.slice(1).split('/')[0]||'home',section=document.getElementById(root);if(section?.dataset.task)selectedTask=section.dataset.task;else if(root==='whiteorchard-tree'){const pieces=location.hash.split('/');selectedTask=tasks[pieces[2]]?pieces[2]:hubs.find(h=>h.id===pieces[1])?.items.find(id=>tasks[id]?.stages&&tasks[id].home===pieces[1])||selectedTask;}
  document.querySelectorAll('[data-world-atlas],a[href="#whiteorchard-constellation"]').forEach(a=>{if(!a.closest('[data-task]'))a.href=atlasPath(selectedTask);});
  for(const img of section?.querySelectorAll('img[data-page-art]')||[]){if(!img.getAttribute('src'))img.src=img.dataset.pageArt;}
  if(root==='home')for(const img of document.querySelectorAll('#home img[data-page-art]'))if(!img.src)img.src=img.dataset.pageArt;
 }
 addEventListener('phoenix:route-rendered',reflect);addEventListener('hashchange',reflect);reflect();
})();
