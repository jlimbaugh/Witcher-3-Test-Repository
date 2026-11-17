'use strict';
(function(root){
 const essentials={
  '1':{do:'Defeat the ghouls, then collect the optional crystal skull before following Vesemir.',where:'The opening campsite.',needed:'Silver sword for the ghouls; Witcher Senses for the search.'},
  ford:{do:'Follow Vesemir and choose whether to accept the merchant’s reward.',where:'The road toward White Orchard’s inn.'},
  '2':{do:'Ask Elsa about Yennefer, then speak to Gaunter O’Dimm.',where:'Inside White Orchard’s inn, in the common room.'},
  brawl:{do:'Deal with the men outside the inn using fists.',where:'Outside White Orchard’s inn.'},
  '3':{do:'Ask the garrison commander about Yennefer to receive the griffin contract.',where:'The Nilfgaardian garrison northwest of White Orchard; the commander is beside the quartermaster’s area.'},
  hunt:{do:'Follow The Beast of White Orchard, then return here after reporting the kill.',where:'The linked griffin walkthrough below.'},
  '4':{do:'Review departure risks and finish the local quests you want before starting the final inn sequence.',where:'The departure review, then the inn with Vesemir.'}
 };
 function plan(stage){const brief=essentials[stage.id];if(!brief)return null;const support=[{id:'route',title:'Route details',paragraphs:[stage.text]}];for(const [i,d]of (stage.details||[]).entries()){
  if(stage.id==='1'&&i===0){if(d.paragraphs[0])support.push({id:'combat',title:'Combat preparation',paragraphs:[d.paragraphs[0]]});if(d.paragraphs.length>1)support.push({id:'finding',title:'Finding the skull',paragraphs:d.paragraphs.slice(1)});}
  else support.push({id:'detail-'+i,title:stage.id==='2'?'Optional conversations & supplies':stage.id==='brawl'?'Combat guidance':stage.id==='3'?'Finding the location':stage.id==='hunt'?'Progress records':'Returning later',paragraphs:d.paragraphs.slice()});
 }return {brief:{...brief},support:support.filter(d=>d.paragraphs.length)};}
 function shouldCue({current,previous,mode,pilot}){return current===pilot&&current!==previous&&mode!=='pop'&&mode!=='same';}
 function preferences(value,validKeys){const out={};if(value&&typeof value==='object'&&!Array.isArray(value))for(const key of validKeys)if(typeof value[key]==='boolean')out[key]=value[key];return out;}
 const model={plan,shouldCue,preferences};if(typeof module!=='undefined'&&module.exports){module.exports=model;return;}root.PhoenixReadingModel=model;
 root.createPhoenixReadingPilot=function({task}){
  const section=document.getElementById(task.view),storeKey='phoenix.reading-foldouts.v1',plans=task.stages.map(s=>[s,plan(s)]).filter(([,p])=>p),keys=plans.flatMap(([s,p])=>p.support.map(d=>task.view+'/'+s.id+'/'+d.id));let saved={};try{saved=preferences(JSON.parse(localStorage.getItem(storeKey)||'{}'),keys);}catch{}
  const make=(tag,text,cls)=>{const node=document.createElement(tag);if(text)node.textContent=text;if(cls)node.className=cls;return node;};
  for(const [stage,p]of plans){const body=section.querySelector('[data-stage="'+stage.id+'"] .stage-content');if(!body)continue;body.classList.add('reading-pilot-step');const opening=make('dl',null,'step-essentials');opening.setAttribute('aria-label','Step essentials');for(const [key,title]of [['do','Do'],['where','Where'],['needed','Needed']])if(p.brief[key]){opening.append(make('dt',title),make('dd',p.brief[key]));}
   body.querySelector('h2').after(opening);body.querySelectorAll(':scope>p:not(.risk-note),:scope>.quest-step-detail').forEach(n=>n.remove());const optional=body.querySelector(':scope>.optional-stops');const choices=body.querySelector(':scope>.quest-choices');let after=choices||body.querySelector(':scope>.risk-note')||opening;if(optional){after.after(optional);after=optional;}
   for(const d of p.support){const details=make('details',null,'reading-support quest-step-detail'),key=task.view+'/'+stage.id+'/'+d.id;details.dataset.readingKey=key;details.append(make('summary',d.title));d.paragraphs.forEach(text=>details.append(make('p',text)));details.open=saved[key]===true;details.addEventListener('toggle',()=>{try{saved=preferences(JSON.parse(localStorage.getItem(storeKey)||'{}'),keys);}catch{}saved[key]=details.open;try{localStorage.setItem(storeKey,JSON.stringify(saved));}catch{}});after.after(details);after=details;}
  }
  const header=section.querySelector('.page-heading');let timer=0;const quiet=()=>{clearTimeout(timer);header.classList.remove('reading-arrival');};const media=matchMedia('(prefers-reduced-motion: reduce)');
  addEventListener('phoenix:route-rendered',event=>{quiet();if(!media.matches&&shouldCue({current:event.detail.root,previous:event.detail.previousRoot,mode:event.detail.mode,pilot:task.view})){header.classList.add('reading-arrival');timer=setTimeout(quiet,1500);}});media.addEventListener('change',quiet);return {view:task.view};
 };
})(typeof window==='undefined'?null:window);
