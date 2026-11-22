# Velen visual audit · November 21, 2026

Audited application `bb1f962de1d5696a3cced04e195d4b9a8324ed93` at development branch head `1dfea180d1f060f1fd25fc2c95664ba22f55628e`. The owner selected White Orchard as the visual reference for Velen’s buttons and card menus. The screenshots and route inventory establish a baseline for the next implementation pass.

## Recommended visual rules

| Control | Reference | Rule for Velen |
| --- | --- | --- |
| Major quest actions | White Orchard Lilac and Gooseberries briefing, IMG_3085 | Use full-width illustrated actions on parchment with the silver perimeter, dark text backing, a centered ivory label, and equal spacing. Use consistent art for each action and the same visual weight for peers. |
| Compact page actions | Nilf Inn step, IMG_3088, and its Reference Tools row, IMG_3089 | Keep the existing raised steel silhouette and ivory labels for inline actions, search submit, and short navigation actions. Use the page’s assigned forged style for every peer in a row. Keep the objective text and Show on Map together. |
| Quest, activity and regional tool cards | White Orchard Dirty Funds and Signposts, IMG_3091 and IMG_3092 | Use the bright, framed center card and dimmed neighbors, clear title placement and a readable count. Put the selected briefing immediately below its deck with the same parchment spacing. Retain Velen’s artwork, stable selection and accessible numbered jump interaction. |
| Map disclosures and quiet links | White Orchard map, IMG_3087 | Use low-emphasis panels for legend and accessible marker list. Keep credits and source links secondary. Give return and map controls a consistent hierarchy with other page actions. |

The White Orchard Reference Tools row in IMG_3086 uses a flatter, icon-led button treatment. The two treatments differ in elevation, decoration and size. Use the raised steel buttons for compact actions and the White Orchard illustrated plates for major actions. Keep approved B1–B10 page-level variants under [the art standard](../ART-STANDARD.md#standard-text-only-buttons), with a single variant per page. This recommendation uses White Orchard’s visual hierarchy while preserving Velen’s accepted navigation, art and progress behavior.

## Findings by page family

| Priority | Surface and scope | Finding and evidence | Proposed alignment |
| --- | --- | --- | --- |
| 1 | Shared Region Tools on the console and walkthroughs | IMG_3089 shows a clipped Merchants neighbor, empty center, and a 1/8 count. IMG_3086 shows a centered card on another host. The Velen DOM probe found the selected Home card and its image reference on all 186 tested host routes. Investigate the computed position, visibility, image load state and repaint on iPhone before attributing the fault to a specific rule. | Fix the front card before restyling. Verify first load, swipe, selection, Back, portrait and landscape. Preserve the forged outer frame and compare against the healthy White Orchard carousel. |
| 1 | Walkthrough-to-map return | Tapping Show on Map from Inn `/3` reached the expected map. A simulated DOM click captured empty Velen navigation options because the parent handler runs in the capture phase. The visible map Back button uses the custom history flag to restore the originating entry. | Carry the origin through the shared handler and validate scroll and step restoration from the map’s own Back button on iPhone. Preserve the owner’s navigation pass for destination routing. |
| 2 | Console, quest deck and selected briefing | IMG_3090 and IMG_3091 show similar silver cards with different number-strip presentation and transition into the briefing. Velen’s selected panel already uses the same illustrated action class as White Orchard. | Reuse the White Orchard styling for title placement, neighboring cards and the deck-to-briefing transition. Keep Velen’s centered number, wrap and selected-card behavior. Match action widths, height, inset and label emphasis. |
| 2 | Activities and Discoveries | White Orchard’s Signposts card is a dedicated framed category entry. Velen currently uses a disclosure with six text tabs and a task deck inside it. Rendering both regions’ cards relies on different components. | Give Velen the White Orchard category-card presentation. Preserve the six Velen categories and their existing routes, counters, card art and progress owners. |
| 2 | Three arrival hubs and 72 quest/activity cards | Nilf has a dedicated forged title, actions, progress and preparation. Funeral Pyres and Mercy use the legacy parchment-and-checkbox hub. The other 72 use the registry’s lightweight card detail, whose two major actions share the illustrated component. | Align arrangement and visual hierarchy by action role, using the WO briefing actions where destinations exist. Preserve preparation, source links, progress counts and the legacy owner controls. |
| 2 | 185 walkthrough stages | All tested stages enter the shared walkthrough renderer. Four Nilf stages have the polished Show on Map action, with the dedicated forged wrapper. The other 181 stages use the registry or legacy reading adapter and lack that action. The compact styles in IMG_3086 and IMG_3088 demonstrate the current inconsistency. | Unify objective, inline actions, receipts, Reference Tools and Search presentation on one reusable walkthrough family. Keep stage-specific map actions limited to approved coverage while the shared map is a pilot. |
| 3 | Regional map, focused Nilf map and 255 other route listings | Six URLs use the current Velen map renderer. The other 255 present parchment route listings. Velen’s pilot shows Back, Layers and Recenter; the White Orchard reference also provides legend and accessible marker list. | Give both Velen map entries the same control treatment and add the reference accessibility affordances where data supports them. Keep text listings useful, with an explicit text-route label, until verified map coverage exists. |
| 3 | Merchants, Collected Notices, Sources, old entry and unknown routes | Merchants and Notices are simple text-led pages. The source index uses its own restrained link styling. The old entry redirects into the shared app. The ambiguity fallback has a single return action. | Match visible user actions and related cards to their counterparts. Keep external source references quiet and retain the existing destinations. |
| 3 | Shared surfaces linked from Velen | Search, Warnings, the floating wolf, Progress, Constellation and Field Reference also serve other regions. The blank Region Tools defect can affect those shared hosts using the same menu. | Test Velen entries and their return paths. Keep any shared design change tied to a verified defect or a reviewed template decision. |

## First implementation batch

Review five surfaces together on iPhone before changing the rest of the region.

1. Velen console and its selected Nilf briefing. Compare the center card, side peeks, centered numbered strip and action plates with the White Orchard reference.
2. Velen Activities & Discoveries, beginning with Contracts. Compare the category menu with the White Orchard Signposts example.
3. Nilf hub. Compare briefing, progress and action hierarchy on the first screen.
4. Nilf Inn walkthrough. Compare Show on Map, Next unfinished, Reference Tools and Search. Verify the Regional Tools center card on first entry and after Back.
5. Velen map, entered both broadly and from the Inn. Check map controls, legend and marker list placement, plus return to the same objective and scroll.

Then extend approved components to Funeral Pyres, Mercy, Bloody Baron, Hunting a Witch and a contract such as Shrieker. Subsequent content spot checks can use the existing groups of five. Cross-check treasure, gear, encounters and competition examples before closing the remaining visual audit. Verify long labels at normal and large text sizes. Verify sides of carousels permit vertical scrolling, and keep touch targets at least 44 CSS pixels where practical.

## Coverage and limits

The route inventory below was generated from both Velen registries. The isolated DOM exercise used the deployed Velen, shared walkthrough, progress and routing modules on empty test storage. It opened 524 route forms and verified a heading with no recorded script errors on each. Those forms include 75 hub/detail routes, 185 walkthrough stages, 261 map or route-list forms, and the console, Merchants and Notices. Source entry behavior was checked separately in code. The exercise did not render pixels or test Safari gestures. Physical visual evidence is from the supplied screenshots. A visual pass for every page remains open.

The registry represents the implemented guide, with unregistered locations and services outside the count. For each owner row, the walkthrough pattern is `#velen/quest/<id>/<step>`; the map patterns are `#velen/map/<id>` and `#velen/map/<id>/<step>`.

| Quest or activity | Owner route | Walkthrough steps | Map family |
| --- | --- | ---: | --- |
| The Nilfgaardian Connection | `#velen/hub/nilf` | 4 | Interactive pilot |
| Funeral Pyres | `#velen/hub/pyres` | 3 | Text route |
| At the Mercy of Strangers | `#velen/hub/mercy` | 1 | Text route |
| Bloody Baron | `#velen/lead/baron` | 3 | Text route |
| Hunting a Witch | `#velen/lead/witch` | 4 | Text route |
| A Princess in Distress | `#velen/lead/princess` | 2 | Text route |
| Ciri’s Room | `#velen/lead/ciris-room` | 2 | Text route |
| Wandering in the Dark | `#velen/lead/wandering-in-the-dark` | 4 | Text route |
| Magic Lamp | `#velen/lead/magic-lamp` | 3 | Text route |
| Ladies of the Wood | `#velen/lead/ladies-of-the-wood` | 4 | Text route |
| The Whispering Hillock | `#velen/lead/whispering-hillock` | 2 | Text route |
| Ciri’s Story: The King of the Wolves | `#velen/lead/king-of-the-wolves` | 3 | Text route |
| Family Matters | `#velen/lead/family-matters` | 4 | Text route |
| Ciri’s Story: The Race | `#velen/lead/ciris-race` | 1 | Text route |
| Ciri’s Story: Out of the Shadows | `#velen/lead/out-of-the-shadows` | 2 | Text route |
| Return to Crookback Bog | `#velen/lead/return-to-crookback-bog` | 3 | Text route |
| Ciri’s Story: Fleeing the Bog | `#velen/lead/fleeing-the-bog` | 1 | Text route |
| An Invitation from Keira Metz | `#velen/lead/keira-invitation` | 1 | Text route |
| A Towerful of Mice | `#velen/lead/towerful-of-mice` | 3 | Text route |
| A Favor for a Friend | `#velen/lead/favor-for-a-friend` | 2 | Text route |
| For the Advancement of Learning | `#velen/lead/advancement-of-learning` | 2 | Text route |
| Contract: Shrieker | `#velen/lead/shrieker` | 3 | Text route |
| Contract: Jenny o’ the Woods | `#velen/lead/jenny-o-the-woods` | 3 | Text route |
| Contract: The Merry Widow | `#velen/lead/merry-widow` | 3 | Text route |
| Contract: Swamp Thing | `#velen/lead/swamp-thing` | 3 | Text route |
| Contract: Patrol Gone Missing | `#velen/lead/patrol-gone-missing` | 3 | Text route |
| Contract: Mysterious Tracks | `#velen/lead/mysterious-tracks` | 4 | Text route |
| Contract: The Mystery of the Byways Murders | `#velen/lead/byways-murders` | 3 | Text route |
| Contract: Phantom of the Trade Route | `#velen/lead/phantom-of-the-trade-route` | 3 | Text route |
| Contract: Woodland Beast | `#velen/lead/woodland-beast` | 3 | Text route |
| Contract: The Griffin from the Highlands | `#velen/lead/griffin-from-the-highlands` | 3 | Text route |
| Contract: The Beast of Honorton | `#velen/lead/beast-of-honorton` | 2 | Text route |
| Contract: Missing Brother | `#velen/lead/missing-brother` | 3 | Text route |
| Master Armorers | `#velen/lead/master-armorers` | 3 | Text route |
| Where the Cat and Wolf Play… | `#velen/lead/where-the-cat-and-wolf-play` | 3 | Text route |
| Take What You Want | `#velen/lead/take-what-you-want` | 2 | Text route |
| The Fall of the House of Reardon | `#velen/lead/fall-of-the-house-of-reardon` | 3 | Text route |
| Ghosts of the Past | `#velen/lead/ghosts-of-the-past` | 3 | Text route |
| In the Eternal Fire’s Shadow | `#velen/lead/eternal-fires-shadow` | 4 | Text route |
| Thou Shalt Not Pass | `#velen/lead/thou-shalt-not-pass` | 2 | Text route |
| Fake Papers | `#velen/lead/fake-papers` | 1 | Text route |
| Bitter Harvest | `#velen/lead/bitter-harvest` | 2 | Text route |
| Wild at Heart | `#velen/lead/wild-at-heart` | 3 | Text route |
| A Greedy God | `#velen/lead/a-greedy-god` | 2 | Text route |
| A Dog’s Life | `#velen/lead/a-dogs-life` | 2 | Text route |
| Forefathers’ Eve | `#velen/lead/forefathers-eve` | 3 | Text route |
| Death by Fire | `#velen/lead/death-by-fire` | 1 | Text route |
| Lynch Mob | `#velen/lead/lynch-mob` | 1 | Text route |
| Defender of the Faith | `#velen/lead/defender-of-the-faith` | 2 | Text route |
| Last Rites | `#velen/lead/last-rites` | 2 | Text route |
| Fools’ Gold | `#velen/lead/fools-gold` | 3 | Text route |
| The Truth Is in the Stars | `#velen/lead/truth-is-in-the-stars` | 2 | Text route |
| Hazardous Goods | `#velen/lead/hazardous-goods` | 1 | Text route |
| Witcher Wannabe | `#velen/lead/witcher-wannabe` | 2 | Text route |
| Love’s Cruel Snares | `#velen/lead/loves-cruel-snares` | 2 | Text route |
| Blood Ties | `#velen/lead/blood-ties` | 3 | Text route |
| Races: Crow’s Perch | `#velen/lead/races-crows-perch` | 4 | Text route |
| Fists of Fury: Velen | `#velen/lead/fists-of-fury-velen` | 4 | Text route |
| Lost Goods | `#velen/lead/lost-goods` | 2 | Text route |
| Out of the Frying Pan, into the Fire | `#velen/lead/out-of-the-frying-pan-into-the-fire` | 2 | Text route |
| An Unfortunate Turn of Events | `#velen/lead/an-unfortunate-turn-of-events` | 2 | Text route |
| Queen Zuleyka’s Treasure | `#velen/lead/queen-zuleykas-treasure` | 2 | Text route |
| Sunken Chest | `#velen/lead/sunken-chest` | 2 | Text route |
| Sunken Treasure | `#velen/lead/sunken-treasure` | 2 | Text route |
| Hidden from the World | `#velen/lead/hidden-from-the-world` | 2 | Text route |
| The Dead Have No Defense | `#velen/lead/the-dead-have-no-defense` | 2 | Text route |
| The Things Men Do for Coin… | `#velen/lead/the-things-men-do-for-coin` | 2 | Text route |
| Don’t Play with the Gods | `#velen/lead/dont-play-with-the-gods` | 2 | Text route |
| Blood Gold | `#velen/lead/blood-gold` | 2 | Text route |
| A Costly Mistake | `#velen/lead/a-costly-mistake` | 2 | Text route |
| Tough Luck | `#velen/lead/tough-luck` | 2 | Text route |
| Battlefield Loot | `#velen/lead/battlefield-loot` | 2 | Text route |
| A Plea Ignored | `#velen/lead/a-plea-ignored` | 2 | Text route |
| Dowry | `#velen/lead/dowry` | 2 | Text route |
| Scavenger Hunt: Griffin School Gear | `#velen/lead/griffin-school-gear` | 3 | Text route |
