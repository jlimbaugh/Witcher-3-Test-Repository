# Velen quest and task alignment plan

Planning inventory against application 1690b41. The Velen console supplies the deck and selected-card pattern. The Nilfgaardian Connection supplies the complete walkthrough pattern. The 75 entries below are the current implementation inventory. Regional discoveries, services and other unregistered tasks still require reconciliation.

## First review group · private QA

The shared registry now remembers a separate reading stage for each quest, contract and treasure hunt. The selected card on a deck, its own detail page and the default quest map use that stage. Reading position is independent of completion. Older single-quest bookmarks are recognized when available.

At 390 × 844 in Chromium, the hub or card reopened the expected stage and the quest map rendered for Nilf, Funeral Pyres, At the Mercy of Strangers, Bloody Baron, Hunting a Witch, Contract: Shrieker and Lost Goods. Mercy has one stage. The six other samples reopened stage two. The [browser fixture](qa/v49/phone/qa-alignment-local.html) reproduces the checks. All 344 Node tests passed with the historical baselines.

Still open: the 72 registry walkthroughs use a read-only objective adapter. Their bookmarks do not supply a verified completion model. Compare objective ownership and branching before enabling completion or Next unfinished. Finish the per-entry art, content and task coverage review in the scheduled batches. Physical iPhone Safari acceptance of this first group is pending.

## Work order

1. Compare the full player journey for Bloody Baron, Funeral Pyres, one contract and one treasure hunt against Nilf. Capture the deck, hub, walkthrough, quest map and return on iPhone. Include At the Mercy of Strangers to check optional decisions and existing saves.
2. Fix shared page differences once. Registry cards currently open at step one from the card page. Audit resume, next unfinished objective, progress ownership, warnings before consequential steps, chapter navigation, Sources at the bottom and matching action artwork. Verify each behavior separately for tracked and reading-only entries.
3. Reconcile all Velen tasks against sourced regional coverage. Include encounters, notice-board leads, discoveries and places of power, merchants and services, Gwent, exploration and departure checks. Record location, unlock conditions, what counts as done, who owns progress, route stops and missing artwork. Link shared activities to their existing owner. Mark genuinely inapplicable walkthrough features explicitly.
4. Start the first review group with Nilf as reference, both Arrival activities, Bloody Baron and Hunting a Witch. Then review the remaining entries in groups of ten, keeping related quest chains together. Use the existing deck categories and flag DLC and cross-region steps.
5. For each entry, verify subject art at both crops, briefing, objective order, branch warnings, completion condition, relevant map stops, source destination and return. Exercise mark, reload and Undo wherever supported. Record each result against the candidate commit. Carry unresolved evidence forward to physical Safari and in-game review.

## Current playable entries

These are runtime stage counts, not verified in-game objective counts. The implementation column identifies the starting point for review.

| Entry | Kind | Stages | Implementation |
|---|---|---:|---|
| The Nilfgaardian Connection | Main quest | 4 | Template |
| Funeral Pyres | Side quest | 3 | Arrival hub |
| At the Mercy of Strangers | Encounter | 1 | Arrival hub |
| Bloody Baron | Main quest | 3 | Registry card |
| Hunting a Witch | Main quest | 4 | Registry card |
| A Princess in Distress | Main quest | 2 | Registry card |
| Ciri’s Room | Side quest | 2 | Registry card |
| Wandering in the Dark | Main quest | 4 | Registry card |
| Magic Lamp | Side quest | 3 | Registry card |
| Ladies of the Wood | Main quest | 4 | Registry card |
| The Whispering Hillock | Quest | 2 | Registry card |
| Ciri’s Story: The King of the Wolves | Main quest | 3 | Registry card |
| Family Matters | Main quest | 4 | Registry card |
| Ciri’s Story: The Race | Main quest | 1 | Registry card |
| Ciri’s Story: Out of the Shadows | Main quest | 2 | Registry card |
| Return to Crookback Bog | Side quest | 3 | Registry card |
| Ciri’s Story: Fleeing the Bog | Main quest | 1 | Registry card |
| An Invitation from Keira Metz | Side quest | 1 | Registry card |
| A Towerful of Mice | Side quest | 3 | Registry card |
| A Favor for a Friend | Side quest | 2 | Registry card |
| For the Advancement of Learning | Side quest | 2 | Registry card |
| Contract: Shrieker | Witcher contract | 3 | Registry card |
| Contract: Jenny o’ the Woods | Witcher contract | 3 | Registry card |
| Contract: The Merry Widow | Witcher contract | 3 | Registry card |
| Contract: Swamp Thing | Witcher contract | 3 | Registry card |
| Contract: Patrol Gone Missing | Witcher contract | 3 | Registry card |
| Contract: Mysterious Tracks | Witcher contract | 4 | Registry card |
| Contract: The Mystery of the Byways Murders | Witcher contract | 3 | Registry card |
| Contract: Phantom of the Trade Route | Witcher contract | 3 | Registry card |
| Contract: Woodland Beast | Witcher contract | 3 | Registry card |
| Contract: The Griffin from the Highlands | Witcher contract | 3 | Registry card |
| Contract: The Beast of Honorton | Witcher contract | 2 | Registry card |
| Contract: Missing Brother | Witcher contract | 3 | Registry card |
| Master Armorers | Side quest | 3 | Registry card |
| Where the Cat and Wolf Play… | Side quest | 3 | Registry card |
| Take What You Want | Side quest | 2 | Registry card |
| The Fall of the House of Reardon | Side quest | 3 | Registry card |
| Ghosts of the Past | Side quest | 3 | Registry card |
| In the Eternal Fire’s Shadow | Side quest | 4 | Registry card |
| Thou Shalt Not Pass | Side quest | 2 | Registry card |
| Fake Papers | Side quest | 1 | Registry card |
| Bitter Harvest | Side quest | 2 | Registry card |
| Wild at Heart | Side quest | 3 | Registry card |
| A Greedy God | Side quest | 2 | Registry card |
| A Dog’s Life | Side quest | 2 | Registry card |
| Forefathers’ Eve | Side quest | 3 | Registry card |
| Death by Fire | Side quest | 1 | Registry card |
| Lynch Mob | Side quest | 1 | Registry card |
| Defender of the Faith | Side quest | 2 | Registry card |
| Last Rites | Side quest | 2 | Registry card |
| Fools’ Gold | Side quest | 3 | Registry card |
| The Truth Is in the Stars | Side quest | 2 | Registry card |
| Hazardous Goods | Side quest | 1 | Registry card |
| Witcher Wannabe | Side quest | 2 | Registry card |
| Love’s Cruel Snares | Side quest | 2 | Registry card |
| Blood Ties | Side quest | 3 | Registry card |
| Races: Crow’s Perch | Side quest | 4 | Registry card |
| Fists of Fury: Velen | Side quest | 4 | Registry card |
| Lost Goods | Treasure hunt | 2 | Registry card |
| Out of the Frying Pan, into the Fire | Treasure hunt | 2 | Registry card |
| An Unfortunate Turn of Events | Treasure hunt | 2 | Registry card |
| Queen Zuleyka’s Treasure | Treasure hunt | 2 | Registry card |
| Sunken Chest | Treasure hunt | 2 | Registry card |
| Sunken Treasure | Treasure hunt | 2 | Registry card |
| Hidden from the World | Treasure hunt | 2 | Registry card |
| The Dead Have No Defense | Treasure hunt | 2 | Registry card |
| The Things Men Do for Coin… | Treasure hunt | 2 | Registry card |
| Don’t Play with the Gods | Treasure hunt | 2 | Registry card |
| Blood Gold | Treasure hunt | 2 | Registry card |
| A Costly Mistake | Treasure hunt | 2 | Registry card |
| Tough Luck | Treasure hunt | 2 | Registry card |
| Battlefield Loot | Treasure hunt | 2 | Registry card |
| A Plea Ignored | Treasure hunt | 2 | Registry card |
| Dowry | Treasure hunt | 2 | Registry card |
| Scavenger Hunt: Griffin School Gear | Treasure hunt | 3 | Registry card |
