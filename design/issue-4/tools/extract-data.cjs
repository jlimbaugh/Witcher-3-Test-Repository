'use strict';
// Issue #4 mockup data. Reads the shipped data files in dist/ (read-only) and writes prototype/mockup-data.js.
// No storage access, no quest-content edits. The objective-to-stage map for White Orchard is an LT PROPOSAL
// (dist has no such map); Velen rows already carry a stage index in velen-nilf-objectives.js.
const fs=require('fs'),path=require('path'),vm=require('vm');
const dist=path.resolve(__dirname,'../../../dist');
const ctx={console};ctx.window=ctx;ctx.globalThis=ctx;vm.createContext(ctx);
for(const f of ['white-orchard.js','progression-data.js','progression-engine.js','warning-details.js','velen-data-r18.js','velen-nilf-objectives.js'])
  vm.runInContext(fs.readFileSync(path.join(dist,f),'utf8'),ctx,{filename:f});
const {tasks}=ctx.PHOENIX_ROUTE,PD=ctx.PHOENIX_PROGRESS_DATA,catalog=ctx.PhoenixWarningCatalog,V=ctx.PHOENIX_VELEN,N=ctx.PHOENIX_VELEN_NILF_PROGRESS;
const sentences=t=>(t||'').match(/[^.!?]+[.!?]+(?=\s|$)|[^.!?]+$/g).map(s=>s.trim()).filter(Boolean);
const engine=(data)=>ctx.createPhoenixProgress(data,tasks,[]);
// ---- White Orchard: The Beast of White Orchard
const beast=tasks['q-beast'];
const WO_MAP={herbalist:'2',buckthorn:'river',hunter:'3',ask:'3',dogs:'3',talk:'3',follow:'patrol',site:'patrol',tracks:'patrol',nest:'nest',vesemir:'4',prepare:'4',field:'ambush',kill:'5',trophy:'trophy',reward:'payment'};
const woEngine=engine(PD),woP=woEngine.init();
const woReq=new Set(woEngine.required('q-beast',woP).map(o=>o.id));
const woStage=id=>beast.stages.find(s=>s.id===id);
function woReading(st){
  const warnId=catalog.context('q-beast',st.id);const w=warnId?catalog.get(warnId,tasks):null;
  const warning=w?{id:warnId,short:w.short,sections:[['Consequence',w.consequence],['Cutoff',w.cutoff],['How to avoid it',w.prevention]],source:'warning-details.js catalog '+warnId}:(st.warning?{id:'wo.q-beast.stage-'+st.id,short:st.warning,sections:[],source:'white-orchard.js stage '+st.id+' warning'}:null);
  const details=(st.details||[]).map(d=>({title:d.title,paragraphs:d.paragraphs}));
  const explanation=st.spoiler?[st.spoiler]:(details.length?details[0].paragraphs:[]);
  const info=(st.spoiler?details:details.slice(1));
  return {stageId:st.id,title:st.title,actions:sentences(st.text),choices:st.options||[],explanation,
    // Q2 (Cmdr, 2026-11-17): WO stage detours are the WO "nearby" entries and go in the Nearby group.
    nearby:(st.detours||[]).map(d=>({label:d.label,target:tasks[d.task]?.name||d.task,kind:tasks[d.task]?.type||'entry',source:'white-orchard.js stage '+st.id+' detours'})),
    info,warning};
}
const woObjectives=PD.quests['q-beast'].objectives.map(o=>{const key=o.id.split(':')[1];return {id:o.id,key,label:o.label,chapter:o.chapter,optional:o.optional===true,conditional:!o.optional&&!woReq.has(o.id),stage:WO_MAP[key]};});
const wo={region:'White Orchard',quest:beast.name,kind:'Main quest',level:beast.level,art:'art-r13/q-beast-card.webp',artPosition:'center 30%',intro:beast.intro,
  questInfo:[{title:'Rewards & conditions',paragraphs:[beast.requirements,beast.reward]},{title:'Sources & verification',links:beast.sources}],
  objectives:woObjectives,stages:Object.fromEntries(beast.stages.map(s=>[s.id,woReading(s)])),
  counts:woEngine.counts('q-beast',woP),unmappedStages:beast.stages.filter(s=>!Object.values(WO_MAP).includes(s.id)).map(s=>({id:s.id,title:s.title}))};
// ---- Velen: The Nilfgaardian Connection (same shape; Velen-only hub features are NOT carried over)
const nilf=V.quests.nilf,nEngine=engine({quests:N.quests,objectiveIndex:N.objectiveIndex,choices:N.choices,milestones:{},riskQuests:[]}),nP=nEngine.init();
const nReq=new Set(nEngine.required('velen.nilf',nP).map(o=>o.id));
// Q2 (Cmdr, 2026-11-17): Velen nearby activities. Names come from velen-data-r18.js; the context lines are the
// nearbyCard text in velen-nilf-ui.js (hub rails, read-only). Placing each entry on a stage by its place is an LT proposal.
const UI='velen-nilf-ui.js nearbyCard';
const V_NEARBY={
  '2':[{label:V.quests.pyres.name,target:V.quests.pyres.name,kind:V.quests.pyres.kind.toLowerCase(),context:'Fits the road: the priest west of Mulbrydale offers it. Completion is recorded in its own hub.',source:UI},
       {label:V.quests.mercy.name,target:V.quests.mercy.name,kind:V.quests.mercy.kind.toLowerCase(),context:'Fits the road: the riverbank on the approach to the inn. Its decision is recorded in its own hub.',source:UI}],
  '3':[{label:'Innkeeper',target:'Innkeeper',kind:'service',context:'At the Inn at the Crossroads: food, drink and a shop conversation.',source:UI},
       {label:'Collected notices',target:'Collected notices',kind:'notices',context:'Notices from the inn board, kept for later. Collecting a notice is not completing it.',source:UI}]};
const vStages=Object.fromEntries(nilf.stages.map((s,i)=>[String(i+1),{stageId:String(i+1),title:s.title,place:s.place,actions:sentences(s.text),choices:[],explanation:s.prep?[s.prep]:[],nearby:V_NEARBY[String(i+1)]||[],
  info:s.choice==='inn'?[{title:'What the inn choice changes',paragraphs:[N.choices.inn.outcome]}]:[],
  warning:s.warning?{id:'velen.nilf.stage-'+(i+1),short:s.warning,sections:[],source:'velen-data-r18.js stage '+(i+1)+' warning'}:null}]));
const vObjectives=N.quests['velen.nilf'].objectives.map(o=>({id:o.id,key:o.id.split(':')[1],label:o.label,chapter:o.chapter,optional:o.optional===true,conditional:!o.optional&&!nReq.has(o.id),branch:o.branch?[].concat(o.branch[1]).map(String):null,stage:String(o.stage),note:o.routeNote||o.note||null}));
const velen={region:'Velen',quest:nilf.name,kind:nilf.kind,level:nilf.level,art:'velen-landscape-r18.webp',artPosition:nilf.position,intro:nilf.intro,
  questInfo:[{title:'Rewards & conditions',paragraphs:['No reward or requirement text is recorded for this quest in velen-data-r18.js.']},{title:'Sources & verification',links:[nilf.source,N.source,N.routeSource]}],
  objectives:vObjectives,stages:vStages,counts:nEngine.counts('velen.nilf',nP),unmappedStages:[]};
const out='// GENERATED by design/issue-4/tools/extract-data.cjs from dist/ data files. Do not edit by hand.\nwindow.MOCKUP_DATA='+JSON.stringify({wo,velen},null,1)+';\n';
fs.writeFileSync(path.resolve(__dirname,'../prototype/mockup-data.js'),out);
console.log('WO objectives',woObjectives.length,'required',woReq.size,'counts',JSON.stringify(wo.counts),'unmapped stages',JSON.stringify(wo.unmappedStages));
console.log('Velen objectives',vObjectives.length,'required (route undecided)',nReq.size,'counts',JSON.stringify(velen.counts));
