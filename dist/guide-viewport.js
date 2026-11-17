'use strict';
/* One reading scrollport above the persistent wolf dock. Route snapshots use this API. */
(()=>{
 const reader=document.createElement('div');reader.id='phoenix-reader';reader.className='phoenix-reader';
 const dock=document.createElement('div');dock.className='phoenix-nav-dock';
 const content=[...document.body.children].filter(el=>el.matches('.guide-bar,main,.site-footer'));
 if(!content.some(el=>el.tagName==='MAIN'))return;
 document.body.prepend(reader);reader.append(...content);document.body.append(dock);
 document.documentElement.classList.add('phoenix-viewport-ready');
 reader.addEventListener('scroll',()=>window.dispatchEvent(new Event('scroll')),{passive:true});
 window.PhoenixViewport={reader,dock,
  get scrollY(){return reader.scrollTop;},get scrollX(){return reader.scrollLeft;},
  scrollTo(x,y){if(typeof x==='object')reader.scrollTo(x);else reader.scrollTo(x,y);},
  lock(){reader.inert=true;reader.classList.add('is-locked');},
  unlock(){reader.inert=false;reader.classList.remove('is-locked');}
 };
})();
