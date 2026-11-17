'use strict';
// Add a normal document link after the existing console is built. No quest-state hooks or writes.
addEventListener('DOMContentLoaded',()=>{
 const tile=[...document.querySelectorAll('.home-shortcuts .console-tile')].find(x=>x.textContent.includes('Character build and skills'));
 if(!tile||tile.tagName==='A')return;const a=document.createElement('a');a.className=tile.className;a.href='character.html';
 for(const child of [...tile.childNodes])a.append(child);a.querySelector('small')?.remove();tile.replaceWith(a);
});
