(function(root){
'use strict';
// v45 Slice 2: journal objectives for The Nilfgaardian Connection (velen.nilf), shaped for the shared
// progression engine (createPhoenixProgress). Data only. Labels are the in-game journal objectives as
// listed by the cited source; route order and the conditional fight follow the same source's steps.
// No objective is invented: the wild-dog fight described by GameBanshee has no journal line and is not listed.
// Reading Hendrik's notes stays inside the final search objective.
const Q='velen.nilf',SOURCE='https://www.witcher.tools/quests/the-nilfgaardian-connection';
// QA2/QA3/QA4: the direct-Heatherton route. Evidence (checked 2026-11-16; see SLICE2-REVIEW.md §9.2):
// - Witcher Wiki objective list (live page blocks automated fetches; read via search excerpts and the full Wayback
//   snapshot 20260110001207): "Travel to Velen." and "Go to the Inn
//   at the Crossroads." are listed for every path; "Ask about the agent…", "Defeat the baron’s men." (if hostile) and
//   "Finish talking to the innkeep…" are grouped under "Unless you go straight to Heatherton".
// - witcher.tools, Game8, GameBanshee and Gamer Guides list the objectives in order and do not describe the bypass; none
//   contradicts the wiki. No second source states which objectives close.
// So: Ask / Defeat / Finish close on the direct route (wiki). QA4: the wiki's placement of "Go to the Inn" does not establish its
// journal status on the bypass, so on the direct route it is UNCONFIRMED: neither required nor marked (`unconfirmedOn`).
// It stays required while the route is unknown and on the peace/fight routes (unchanged).
const ROUTE_SOURCE='https://witcher.fandom.com/wiki/The_Nilfgaardian_Connection#Objectives',
 ROUTE_ARCHIVE='https://web.archive.org/web/20260110001207/https://witcher.fandom.com/wiki/The_Nilfgaardian_Connection',
 ROUTE_CROSSCHECK=['https://www.witcher.tools/quests/the-nilfgaardian-connection','https://game8.co/games/Witcher3/archives/275617','https://www.gamebanshee.com/thewitcher3/walkthrough/thenilfgaardianconnection.php','https://www.gamerguides.com/the-witcher-3-wild-hunt/guide/walkthrough/velen/the-niflgaardian-connection'];
// Inn-route objectives stay required while the route is still unknown (`undefined`), and close once "direct" is recorded.
const VIA_INN=['inn',['peace','fight',undefined]];
const rows=[
 ['travel','Travel to Velen.','Arrival',1,[]],
 ['inn','Go to the Inn at the Crossroads.','Road',2,['travel'],{branch:VIA_INN,unconfirmedOn:'direct',routeNote:'Required on the inn routes. On the direct route its journal status is unconfirmed: the wiki lists it outside the “Unless you go straight to Heatherton” group but does not say what happens to it, so it is neither required nor marked.',routeSource:ROUTE_SOURCE}],
 ['ask','Ask about the agent called Hendrik at the Inn at the Crossroads.','The Inn',3,['inn'],{choice:'inn',branch:VIA_INN,route:'inn',routeSource:ROUTE_SOURCE}],
 ['fight','Defeat the baron’s men.','The Inn',3,['ask'],{branch:['inn','fight'],route:'inn',routeSource:ROUTE_SOURCE}],
 ['finish','Finish talking to the innkeep about the agent called Hendrik.','The Inn',3,['ask'],{conditionalRequires:{inn:{fight:[Q+':fight']}},branch:VIA_INN,route:'inn',routeSource:ROUTE_SOURCE}],
 ['look','Look for the agent called Hendrik in the village of Heatherton.','Heatherton',4,[],{choice:'inn',conditionalRequires:{inn:{peace:[Q+':finish'],fight:[Q+':finish'],direct:[Q+':travel']}},routeSource:ROUTE_SOURCE}],
 ['survivor','Talk to the survivor and learn what happened in the village.','Heatherton',4,['look']],
 ['find','Find the agent called Hendrik.','Heatherton',4,['survivor']],
 ['search','Search the agent’s hut using your Witcher Senses.','Heatherton',4,['find'],{note:'Examine the candlestick in the cellar to open the hidden compartment and read Hendrik’s notes. Reading them finishes the quest.'}]
];
const objectives=rows.map(([key,label,chapter,stage,requires,extra={}])=>({id:Q+':'+key,label,chapter,stage,requires:requires.map(r=>Q+':'+r),quest:Q,region:'velen',source:SOURCE,...extra}));
const quests={[Q]:{region:'velen',level:5,source:SOURCE,objectives}};
const objectiveIndex=Object.fromEntries(objectives.map(o=>[o.id,o]));
const choices={inn:{label:'What happened at the Inn at the Crossroads?',options:[['peace','Settled peacefully with the baron’s men'],['fight','Fought the baron’s men'],['direct','Went straight to Heatherton — no inn conversation']],outcome:'Fighting the baron’s men adds the journal objective “Defeat the baron’s men.” The Baron remembers it later at Crow’s Perch. Going straight to Heatherton skips the inn conversation: “Ask about…”, “Defeat…” and “Finish talking…” are closed, not completed, and no inn outcome is recorded. The journal status of “Go to the Inn at the Crossroads.” is unconfirmed on that route, so it is neither required nor marked. None of these blocks the main story.',source:SOURCE,routeSource:ROUTE_SOURCE,routeArchive:ROUTE_ARCHIVE,routeValue:'direct'}};
const api={quest:Q,source:SOURCE,routeSource:ROUTE_SOURCE,routeArchive:ROUTE_ARCHIVE,routeCrossCheck:ROUTE_CROSSCHECK,quests,objectiveIndex,choices,milestones:{},riskQuests:[],regions:{velen:{entry:null}}};
root.PHOENIX_VELEN_NILF_PROGRESS=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
