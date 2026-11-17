'use strict';
const M=window.PhoenixBuildDemo,$=id=>document.getElementById(id);
let draft=M.initial(),saved=M.clone(draft),baseline=M.clone(draft),selected='chest',pending=null;
const vault=[M.clone(draft)];
const names={attack:'Attack power',armor:'Armor',sign:'Sign intensity',toxicity:'Toxicity'};
function announce(s){$('status').textContent=s;}
function describe(g){return g.tier+' '+g.school;}
function composition(b){const counts={};for(const s of ['chest','gloves','trousers','boots'])counts[b.gear[s].school]=(counts[b.gear[s].school]||0)+1;return Object.entries(counts).map(([k,v])=>v+' '+k+' armor pieces').join(' · ');}
function slotButton(s){const b=document.createElement('button');b.className='slot'+(s===selected?' selected':'');b.setAttribute('aria-pressed',String(s===selected));const title=document.createElement('strong');title.textContent=M.labels[s];const meta=document.createElement('span');meta.textContent=describe(draft.gear[s]);b.append(title,meta);b.onclick=()=>{selected=s;render();$('replaceButton').focus();};return b;}
function statsInto(host,build,base,changedOnly=false){host.replaceChildren();const a=M.score(build),b=M.score(base);for(const k of Object.keys(a)){if(changedOnly&&a[k]===b[k])continue;const row=document.createElement('div');row.className='stat';const label=document.createElement('span'),value=document.createElement('span');label.textContent=names[k];const delta=a[k]-b[k];value.textContent=a[k]+(delta?' ('+(delta>0?'+':'')+delta+')':' (unchanged)');row.append(label,value);host.append(row);}if(!host.children.length)host.textContent='No synthetic numeric change. Review the equipment and composition differences.';}
function render(){for(const id of ['slotList','weaponSlots','armorSlots'])$(id).replaceChildren();for(const s of M.slots){$('slotList').append(slotButton(s));$(s==='steel'||s==='silver'?'weaponSlots':'armorSlots').append(slotButton(s));}
 $('buildName').textContent=draft.name;$('itemTitle').textContent=describe(draft.gear[selected])+' '+M.labels[selected].toLowerCase();$('itemSource').textContent='BASE GAME · DEMO CATALOGUE';$('itemSummary').textContent='Selected slot: '+M.labels[selected]+'. Individual tier changes preserve the other pieces.';$('artLabel').textContent='Illustration: '+draft.gear.chest.school+' set';$('composition').textContent=composition(draft);
 const allTiers=new Set(M.slots.map(s=>draft.gear[s].tier));$('wholeTier').value=allTiers.size===1?[...allTiers][0]:'Mixed';for(const k of ['quen','prepared'])$(k).checked=draft.conditions[k];statsInto($('stats'),draft,baseline);}
function show(id){$(id).showModal();}
function preview(next){pending=next;const before=draft.gear[selected],after=next.gear[selected];$('replacement').textContent=M.labels[selected]+': '+describe(before)+' / Upgrade '+before.upgrade+' → '+describe(after)+' / Upgrade '+after.upgrade;statsInto($('previewStats'),next,draft,true);statsInto($('allPreviewStats'),next,draft);$('previewComposition').textContent=composition(draft)+' → '+composition(next);show('preview');}
for(const id of ['wholeTier','tierChoice'])for(const t of (id==='wholeTier'?['Mixed',...M.tiers]:M.tiers)){const o=document.createElement('option');o.textContent=t;o.value=t;if(t==='Mixed')o.disabled=true;$(id).append(o);}
$('wholeTier').onchange=e=>{pending=M.wholeTier(draft,e.target.value);$('replacement').textContent='All pieces: change tier to '+e.target.value+'. Individual overrides will be replaced.';statsInto($('previewStats'),pending,draft,true);statsInto($('allPreviewStats'),pending,draft);$('previewComposition').textContent=composition(pending);show('preview');};
$('replaceButton').onclick=()=>{$('pickerTitle').textContent='Choose '+M.labels[selected].toLowerCase();$('schoolChoice').value=draft.gear[selected].school;$('tierChoice').value=draft.gear[selected].tier;show('picker');};
$('previewPiece').onclick=()=>{$('picker').close();preview(M.propose(draft,selected,{school:$('schoolChoice').value,tier:$('tierChoice').value}));};
$('upgradeButton').onclick=()=>{$('currentUpgrade').textContent='Outgoing: Upgrade '+draft.gear[selected].upgrade;show('upgrades');};
$('previewUpgrade').onclick=()=>{$('upgrades').close();preview(M.propose(draft,selected,{upgrade:'B'}));};
$('applyButton').onclick=()=>{if(!pending)return;draft=M.clone(pending);pending=null;$('preview').close();render();announce('Applied to the draft. Your saved build is unchanged until Save.');};
$('preview').addEventListener('close',()=>{pending=null;render();});
for(const b of document.querySelectorAll('[data-close]'))b.onclick=()=>$(b.dataset.close).close();
for(const k of ['quen','prepared'])$(k).onchange=e=>{draft.conditions[k]=e.target.checked;render();announce('Condition changed in this draft. Figures remain synthetic.');};
$('pinButton').onclick=()=>{baseline=M.clone(draft);render();announce('Current draft pinned as the comparison baseline.');};
$('performanceButton').onclick=()=>document.querySelector('.metrics').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
$('referenceButton').onclick=()=>show('reference');
function renderVault(){const host=$('vaultList');host.replaceChildren();vault.forEach((build,i)=>{const card=document.createElement('div');card.className='vaultCard';const label=document.createElement('span');label.textContent=build.name;const b=document.createElement('button');b.textContent='Open build';b.onclick=()=>{if(JSON.stringify(draft)!==JSON.stringify(saved)&&!confirm('Opening another demo build discards the unsaved draft. Continue?'))return;draft=M.clone(build);saved=M.clone(build);baseline=M.clone(build);$('vault').close();render();announce('Opened '+build.name+'.');};card.append(label,b);host.append(card);});}
$('vaultButton').onclick=()=>{renderVault();show('vault');};
$('saveButton').onclick=()=>{const i=vault.findIndex(b=>b.name===draft.name);if(i<0)vault.push(M.clone(draft));else vault[i]=M.clone(draft);saved=M.clone(draft);announce('Saved to the in-memory demo Vault. Refreshing clears it.');};
$('copyButton').onclick=()=>{const name=prompt('Name this experiment',draft.name+' — experiment');if(!name?.trim())return;if(vault.some(b=>b.name===name.trim())){announce('That name already exists. Choose another name; no build was overwritten.');return;}draft=M.clone(draft);draft.name=name.trim();saved=M.clone(draft);vault.push(M.clone(draft));render();announce('Saved a named demo copy. Current in-game designation was not changed.');};
$('discardButton').onclick=()=>{draft=M.clone(saved);render();announce('Draft restored to its last saved in-memory version.');};
render();
