'use strict';
window.PhoenixHomePanel = (() => {
  function selectedQuestView(id, engine, progress, tasks) {
    const task=tasks[id], data=window.PHOENIX_PROGRESS_DATA;
    if(!task || !data.quests[id]) return null;
    const status=engine.status(id,progress), counts=engine.counts(id,progress);
    const warning=['failed','unavailable'].includes(status)
      ? (status==='failed'?'This quest is recorded as failed.':'Unavailable under the recorded story state.')
      : [data.riskQuests.includes(id)&&status!=='complete'?'Departure-sensitive: review this unfinished quest before the recorded departure transition.':'',task.decisionWarning||''].filter(Boolean).join(' ');
    const next=engine.required(id,progress).find(o=>progress.objectives[o.id]!=='done'&&!engine.closed(o,progress));
    let label=status==='complete'?'All required objectives complete':status==='failed'?'Quest failed — no further objectives':status==='unavailable'?'Quest unavailable for current story progress':next?'Next objective: '+next.label:'Review the unresolved quest choice in Update Progress';
    return {id,name:task.name,description:task.intro||'',level:Number.isFinite(task.level)?task.level:null,status,label,nextId:!['complete','failed','unavailable'].includes(status)?next?.id:null,counts,warning,legacy:progress.legacy[id]===true};
  }
  return {selectedQuestView};
})();
