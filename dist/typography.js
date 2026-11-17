'use strict';
/* Purpose headings only; navigation and progress handlers retain ownership. */
(()=>{document.addEventListener('DOMContentLoaded',()=>{const seen=new WeakSet(),selector='.quest-step-nav,.quest-page-tools,.quest-hub-tools,.progress-actions';let queued=0;
 function enhance(){queued=0;document.querySelectorAll(selector).forEach(node=>{if(seen.has(node))return;seen.add(node);const heading=document.createElement('p');heading.className='action-group-title';heading.textContent=node.matches('.quest-step-nav')?'Walkthrough navigation':node.matches('.progress-actions')?'Progress actions':'Reference tools';node.before(heading);node.classList.add('purpose-action-group');});}
 const queue=()=>{if(!queued)queued=requestAnimationFrame(enhance);};new MutationObserver(records=>{if(records.some(r=>[...r.addedNodes].some(n=>n.nodeType===1&&(n.matches(selector)||n.querySelector(selector)))))queue();}).observe(document.body,{childList:true,subtree:true});enhance();});})();
