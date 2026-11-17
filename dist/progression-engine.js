'use strict';
window.createPhoenixProgress = function(data,tasks,hubs){
 const {quests,objectiveIndex:idx,choices,milestones,riskQuests}=data;
 const clone=x=>JSON.parse(JSON.stringify(x));
 function init(saved={},completed={}){const p={schema:1,objectives:{},choices:{},manual:{},failed:{},legacy:{}};if(saved.schema===1){for(const [id,v] of Object.entries(saved.objectives||{}))if(idx[id]&&['done','skipped'].includes(v))p.objectives[id]=v;for(const [id,v] of Object.entries(saved.choices||{}))if(choices[id]?.options.some(x=>x[0]===v))p.choices[id]=v;for(const k of Object.keys(milestones))p.manual[k]=saved.manual?.[k]===true;for(const id of Object.keys(quests)){p.failed[id]=saved.failed?.[id]===true;p.legacy[id]=saved.legacy?.[id]===true;}}else for(const id of Object.keys(quests))if(completed[id])p.legacy[id]=true;return p;}
 function deps(o,p){return [...o.requires,...Object.entries(o.conditionalRequires||{}).flatMap(([choice,paths])=>paths[p.choices[choice]]||[])];}
 function branch(o,p){if(!o.branch)return true;const [key,values]=o.branch;return (Array.isArray(values)?values:[values]).includes(p.choices[key]);}
 function closed(o,p){if(o.optional&&p.objectives[o.id]!=='done'&&questDone(o.quest,p))return true;return !!o.branch&&!!p.choices[o.branch[0]]&&!branch(o,p);}
 function required(q,p){return quests[q].objectives.filter(o=>!o.optional&&(!o.branch||branch(o,p)));}
 function done(q,p){return !p.failed[q]&&(p.legacy[q]||required(q,p).every(o=>p.objectives[o.id]==='done')&&quests[q].objectives.filter(o=>o.choice).every(o=>!!p.choices[o.choice]));}
 // A failed cargo pursuit must never fail unrelated quests.
 function questDone(q,p){if(q==='q-cargo'&&p.choices.cargo==='escaped')return false;return done(q,p);}
 function facts(p){const f={};for(const [k,v] of Object.entries(p.manual))if(v)f[k]=true;const valid=(id,seen=new Set())=>{if(seen.has(id))return false;seen.add(id);return p.objectives[id]==='done'&&deps(idx[id],p).every(r=>valid(r,new Set(seen)));};Object.values(idx).forEach(o=>{if(o.grants&&valid(o.id))f[o.grants]=true;});if(f.departed){f.griffin=true;f.garrison=true;f.arrival=true;}if(f.griffin){f.garrison=true;f.arrival=true;}if(f.garrison)f.arrival=true;return f;}
 function status(q,p){if(p.failed[q]||q==='q-cargo'&&p.choices.cargo==='escaped')return 'failed';if(questDone(q,p))return 'complete';if(facts(p).departed&&riskQuests.includes(q))return Object.keys(p.objectives).some(id=>idx[id]?.quest===q&&['done','skipped'].includes(p.objectives[id]))?'failed':'unavailable';return Object.keys(p.objectives).some(id=>idx[id]?.quest===q&&['done','skipped'].includes(p.objectives[id]))?'active':'not started';}
 function utility(id){return tasks[id].mapOnly===true;}
 function availability(id,p){const f=facts(p);if(quests[id]&&['complete','failed','unavailable'].includes(status(id,p)))return status(id,p);if(!f.arrival)return 'unknown';if(id==='q-beast'&&!f.garrison)return 'blocked';if(id==='q-incident'&&!f.griffin)return 'blocked';if(id==='q-death'&&!p.objectives['q-beast:herbalist']&&!Object.keys(p.objectives).some(k=>idx[k]?.quest===id))return 'unknown';return 'available';}
 function visible(id,p){return ['available','complete','failed','unavailable'].includes(availability(id,p));}
 function levelCeiling(h){const primary=h.items.find(id=>tasks[id].home===h.id&&quests[id]),level=tasks[primary]?.level;return Number.isFinite(level)&&level>0?level+5:null;}
 function eligible(h,p){const ceiling=levelCeiling(h);return h.items.filter(id=>!utility(id)&&visible(id,p)&&(!Number.isFinite(tasks[id].level)||(ceiling!==null&&tasks[id].level<=ceiling)));}
 function pruneUpdates(updates,p,completed,read=[]){const seen=new Set(read);return updates.map(u=>({...u,id:u.id||'legacy:'+u.hub+':'+u.activities.join(',')})).filter(u=>!seen.has(u.id)).map(u=>{const h=hubs.find(h=>h.id===u.hub);return {...u,activities:h?u.activities.filter(id=>tasks[id]&&!(tasks[id].home===h.id&&quests[id])&&eligible(h,p).includes(id)&&!completed[id]&&availability(id,p)==='available'):[]};}).filter(u=>u.activities.length);}

 function counts(q,p){const r=required(q,p),opt=quests[q].objectives.filter(o=>o.optional&&!closed(o,p)&&p.objectives[o.id]!=='skipped');return {done:r.filter(o=>p.objectives[o.id]==='done').length,total:r.length,optionalDone:opt.filter(o=>p.objectives[o.id]==='done').length,optionalTotal:opt.length};}
 function ancestors(id,p,out=new Set()){const o=idx[id];if(!o||closed(o,p))return out;for(const r of deps(o,p)){const ro=idx[r];if(ro&&!ro.optional&&!closed(ro,p)){ancestors(r,p,out);out.add(r);}}return out;}
 function reconcile(p){}
 function plan(progress,completed,action,options={}){
  const p=init(progress,completed),c=clone(completed);for(const [key,value] of Object.entries(options.choices||{})){if(!choices[key])throw Error('Unknown choice');if(value==='')delete p.choices[key];else if(choices[key].options.some(o=>o[0]===value))p.choices[key]=value;else throw Error('Unknown choice value');}let targets=[],catchup=[],affected=[];for(const o of Object.values(idx))if(closed(o,p)&&p.objectives[o.id]){affected.push(o.id);delete p.objectives[o.id];}
  if(action.kind==='story-set'){
   const order=Object.keys(milestones),n=order.indexOf(action.id),remove=new Set(Object.values(idx).filter(o=>o.grants&&order.indexOf(o.grants)>n).map(o=>o.id));
   let changed=true;while(changed){changed=false;for(const [id,v] of Object.entries(p.objectives))if(v==='done'&&deps(idx[id],p).some(r=>remove.has(r))&&!remove.has(id)){remove.add(id);changed=true;}}
   affected=[...remove].filter(id=>p.objectives[id]);remove.forEach(id=>{delete p.objectives[id];});p.manual={};order.slice(0,n+1).forEach(k=>p.manual[k]=true);
  }
  else if(action.kind==='milestone'){const order=Object.keys(milestones),n=order.indexOf(action.id);if(n<0)throw Error('Unknown milestone');order.slice(0,n+1).forEach(k=>p.manual[k]=true);}
  else if(action.kind==='quest-failed'){if(!quests[action.quest])throw Error('Unknown quest');if(action.value)p.failed[action.quest]=true;else delete p.failed[action.quest];}
  else if(action.kind==='reconcile-legacy'){if(!quests[action.quest])throw Error('Unknown quest');delete p.legacy[action.quest];}
  else if(action.kind==='activity'){c[action.id]=action.value;}
  else {
   if(action.kind==='quest'){if(!quests[action.quest])throw Error('Unknown quest');targets=required(action.quest,p).map(o=>o.id);catchup=targets.filter(id=>p.objectives[id]!=='done');}
   else {if(!idx[action.id])throw Error('Unknown objective');if(action.kind==='skip'&&!idx[action.id].optional)throw Error('Only optional objectives may be skipped');targets=[action.id];}
   if(action.value===false){const remove=new Set(targets);let changed=true;while(changed){changed=false;for(const [id,v] of Object.entries(p.objectives))if(v==='done'&&deps(idx[id],p).some(r=>remove.has(r))&&!remove.has(id)){remove.add(id);changed=true;}}
    affected=[...remove].filter(id=>p.objectives[id]);remove.forEach(id=>{delete p.objectives[id];if(idx[id].choice)delete p.choices[idx[id].choice];});
    if(action.kind==='quest')delete p.legacy[action.quest];
    const order=Object.keys(milestones);for(const id of affected){const grant=idx[id].grants;if(grant)order.slice(order.indexOf(grant)).forEach(k=>delete p.manual[k]);}
   }else if(action.kind==='skip'){if(!idx[action.id].optional)throw Error('Only optional objectives may be skipped');if(action.skip)p.objectives[action.id]='skipped';else delete p.objectives[action.id];}
   else {
    const extra=new Set();targets.forEach(id=>ancestors(id,p,extra));catchup=[...new Set([...catchup,...[...extra].filter(id=>p.objectives[id]!=='done'&&!targets.includes(id))])];
    if(options.catchup!==false)targets=[...extra,...targets];
    targets.forEach(id=>{if(!closed(idx[id],p)){p.objectives[id]='done';}});
   }
  }
  const missingChoices=[...new Set(Object.keys(p.objectives).filter(id=>p.objectives[id]==='done'&&idx[id]?.choice&&!p.choices[idx[id].choice]).map(id=>idx[id].choice))];
  if(action.kind==='quest'&&action.value!==false&&!missingChoices.length&&required(action.quest,p).every(o=>p.objectives[o.id]==='done'))delete p.legacy[action.quest];
  const departureSuggestion=targets.includes('q-incident:bandits')&&action.value!==false&&!facts(progress).departed&&!facts(p).departed;
  if(options.confirmDeparture===true&&departureSuggestion)p.manual.departed=true;
  reconcile(p);for(const q of Object.keys(quests))c[q]=questDone(q,p);
  const before=facts(progress),after=facts(p),newMilestones=Object.keys(milestones).filter(k=>after[k]&&!before[k]);
  const removedMilestones=Object.keys(milestones).filter(k=>before[k]&&!after[k]);
  const failures=Object.keys(quests).filter(q=>status(q,p)==='failed'&&status(q,progress)!=='failed');
  const closing=Object.keys(quests).filter(q=>status(q,p)==='unavailable'&&status(q,progress)!=='unavailable');
  const completionLosses=Object.keys(quests).filter(q=>(completed[q]===true||questDone(q,progress))&&!c[q]);
  const failureCleared=Object.keys(quests).filter(q=>status(q,progress)==='failed'&&status(q,p)!=='failed');
  const initialArrival=!before.arrival&&after.arrival;
  const updates=initialArrival?[]:hubs.map(h=>({hub:h.id,activities:eligible(h,p).filter(id=>!(tasks[id].home===h.id&&quests[id])&&!eligible(h,progress).includes(id)&&!c[id]&&availability(id,p)==='available')})).filter(u=>u.activities.length);
  return {progress:p,completed:c,catchup,affected,missingChoices,newMilestones,removedMilestones,failures,closing,updates,completionLosses,failureCleared,departureSuggestion};
 }
 return {init,branch,closed,required,done:questDone,facts,status,availability,visible,eligible,counts,ancestors,plan,levelCeiling,pruneUpdates};
};
