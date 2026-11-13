'use strict';
window.PhoenixHomeMetrics=(()=>{
  const main=new Set(['q-lilac','q-beast','q-incident']);
  const side=new Set(['q-missing','q-pan','q-cargo','q-death','q-devil','q-firestarter']);
  const exploration=new Set(['q-viper','q-temerian','q-deserter','q-dirty','pop-cemetery','pop-north','pop-cackler','pop-sawmill','pop-bear','pop-bridge','abandoned-1','abandoned-2','banditcamp-1','banditcamp-2','banditcamp-3','banditcamp-6','guarded-1','guarded-2','guarded-3','guarded-4','guarded-5','monsternest-1','monsternest-2','monsternest-3','poi-1','poi-4','smugglers-1','spoils-1']);
  function categoryFor(id){return main.has(id)?'main':side.has(id)?'side':exploration.has(id)?'exploration':null;}
  function derive(tasks,completed,engine,progress){
    const out={main:{label:'Main story',done:0,total:0},side:{label:'Side quests and contracts',done:0,total:0},exploration:{label:'Exploration and treasure',done:0,total:0},gwent:{label:'Gwent collection',unavailable:true,note:'Collection not tracked yet'}};
    Object.keys(tasks).forEach(id=>{const cat=categoryFor(id);if(!cat)return;out[cat].total++;if(engine&&window.PHOENIX_PROGRESS_DATA.quests[id]?engine.status(id,progress)==='complete':completed[id]===true)out[cat].done++;});return out;
  }
  return {derive,categoryFor};
})();
