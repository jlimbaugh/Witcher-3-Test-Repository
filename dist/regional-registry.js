(function(root){
'use strict';
// v44 Slice 1: regional registry. Data only; no UI reads this yet.
// Every regional prerequisite is explicit. White Orchard keeps its authored entry objective
// (q-lilac:ghouls, written on each former root objective in progression-data.js). Regional
// extension points declare their own prerequisites and never inherit the White Orchard entry.
const velen=root.PHOENIX_VELEN||(typeof require==='function'?require('./velen-data-r18.js'):null);
if(!velen)throw Error('regional-registry.js requires velen-data-r18.js');
const {quests,stableIds,leadIds,sources}=velen;
const activity=(legacy,requires)=>Object.freeze({id:stableIds[legacy],legacy,region:'velen',name:quests[legacy].name,kind:quests[legacy].kind,source:quests[legacy].source,requires:Object.freeze(requires)});
// Velen's in-game entry (Imperial Audience) is not tracked by PHOENIX, so the region's
// prerequisite list is explicitly empty rather than assumed from White Orchard.
const activities=Object.freeze({
 'velen.nilf':activity('nilf',[]),
 'velen.pyres':activity('pyres',[]),
 'velen.mercy':activity('mercy',[])
});
// References only: the leads are not activities and carry no completion of their own.
const references=Object.freeze({
 'velen.lead.baron':Object.freeze({id:leadIds.baron,legacy:'baron',region:'velen',reference:true,name:velen.leads.baron.name,source:sources.main,requires:Object.freeze(['velen.nilf'])}),
 'velen.lead.witch':Object.freeze({id:leadIds.witch,legacy:'witch',region:'velen',reference:true,name:velen.leads.witch.name,source:sources.main,requires:Object.freeze(['velen.nilf'])})
});
// Whole-activity choices recorded by the legacy Velen pilot, owned by their activity.
const choices=Object.freeze({
 inn:Object.freeze({activity:'velen.nilf',options:Object.freeze(['peace','fight'])}),
 mercy:Object.freeze({activity:'velen.mercy',options:Object.freeze(['freed','left'])})
});
const regions=Object.freeze({
 'white-orchard':Object.freeze({id:'white-orchard',entry:'q-lilac:ghouls'}),
 velen:Object.freeze({id:'velen',entry:null,prerequisites:Object.freeze([]),activities,references,choices})
});
const api=Object.freeze({regions});
root.PhoenixRegionalRegistry=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
