# Phoenix session calibration

Owner passed Batch 14 (933a571), completing approval of all 70 batched walkthroughs. Hub progress batch 1 brings the first five Batch 1 quest cards and their Velen selected panels into sync with saved walkthrough milestones. Regional aggregate counts and the remaining hubs are pending.

Owner passed Batch 13 (f9c3834). Batch 14 closes the current list of walkthrough batches with Tough Luck, Battlefield Loot, A Plea Ignored, Dowry and Scavenger Hunt: Griffin School Gear. Eleven milestones. The four Griffin armor diagrams share one milestone. Hub totals and regional task coverage are tracked separately.

Owner passed Batch 12 (5e2a292). Batch 13 covers The Dead Have No Defense, The Things Men Do for Coin…, Don’t Play with the Gods, Blood Gold and A Costly Mistake. Each hunt tracks two milestones, securing its clue and recovering its treasure.

Owner passed Batch 11 (8a201b3). Batch 12 covers An Unfortunate Turn of Events, Queen Zuleyka’s Treasure, Sunken Chest, Sunken Treasure and Hidden from the World. Each treasure hunt tracks its clue and its treasure separately, for ten required milestones.

Owner passed Batch 10 (3ccc006). Batch 11 covers Blood Ties, Races: Crow’s Perch, Fists of Fury: Velen, Lost Goods and Out of the Frying Pan, into the Fire. Fourteen required milestones. The race introduction is available to read; each rider win counts once.

Owner passed Batch 9 (285192a). Batch 10 covers Fools’ Gold, The Truth Is in the Stars, Hazardous Goods, Witcher Wannabe and Love’s Cruel Snares. Ten required milestones. Gert’s later appearance stays optional, and either decision about the impostor satisfies the last Witcher Wannabe milestone.

Owner passed Batch 8 (1acb87e). Batch 9 covers Forefathers’ Eve, Death by Fire, Lynch Mob, Defender of the Faith and Last Rites. Nine milestones. The Forefathers’ Eve final stage describes the endpoint for either route. Defender of the Faith and Last Rites retain separate progress.

Owner passed Batch 7 (6d1b53e). Batch 8 covers Fake Papers, Bitter Harvest, Wild at Heart, A Greedy God and A Dog’s Life. Ten required milestones. Either Wild at Heart ending satisfies its final milestone.

Owner passed Batch 6 (3ffd5aa). Batch 7 covers Take What You Want, The Fall of the House of Reardon, Ghosts of the Past, In the Eternal Fire’s Shadow and Thou Shalt Not Pass. Thirteen required milestones. Investigating Reinald’s trail is available as an optional reading stage. Reardon Manor tracks either encounter under the same milestone.

Owner passed Batch 5 and the footer/checklist correction (1d6fa40). Batch 6 covers The Griffin from the Highlands, The Beast of Honorton, Missing Brother, Master Armorers and Where the Cat and Wolf Play. Thirteen required milestones count across five walkthroughs. Destroying the eggs in Missing Brother is optional. Linked quests retain separate progress.

Guide-wide footer rule: the last section flows directly into the credits. Regional Tools omits the duplicate Arrival checklist and its section jump. The quest deck and Activities retain access to all three arrival quests.

Owner passed Batch 4 (9eb7b72). Batch 5 covers Patrol Gone Missing, Mysterious Tracks, The Mystery of the Byways Murders, Phantom of the Trade Route and Woodland Beast. Review sixteen walkthrough milestones together. Woodland Beast tracks the encounter and the report for either outcome.

Owner passed Batch 3 (e6104a7). Batch 4 covers For the Advancement of Learning and four contracts: Shrieker, Jenny o’ the Woods, The Merry Widow and Swamp Thing. Review fourteen walkthrough milestones together. Keira’s possible endings and contract payment choices each share their respective final milestone.

Owner passed Batch 2 (082ebe6). Batch 3 covers Return to Crookback Bog, Fleeing the Bog, An Invitation from Keira Metz, A Towerful of Mice and A Favor for a Friend. Review their ten walkthrough milestones together.

Owner passed Batch 1 (7cbeaf2). Batch 2 covers The Whispering Hillock, The King of the Wolves, Family Matters, The Race and Out of the Shadows. Each story choice counts once regardless of outcome. The race counts either finish order.

Owner passed Hunting a Witch (6037d08). Review subsequent walkthrough changes in groups of five, with one owner approval per batch. The first group covers A Princess in Distress, Ciri’s Room, Wandering in the Dark, Magic Lamp and Ladies of the Wood.

Owner approved the card-edge gesture build 03abe77. Keep the Velen quest and activity decks and the shared Regional Tools deck scrollable vertically through both sides. Horizontal browsing starts anywhere on the middle card or within 6 CSS px of its edges. Side cards can still be tapped to center them. Use the original deck margins. Vertical finger drags within the deck move the reader at 80% of the drag distance. Outside the deck, scrolling is native.

Current Regional Tools interaction: swipe or tap a side card to browse, then tap the front card to open its tool. On quest walkthroughs the closing order is guide search, framed Regional Tools, quiet Sources link, then credits. The floating wolf operates independently.

The owner approved two complete page templates on November 19, 2026, using QA build `1690b41`. Use the Velen region console for region pages and The Nilfgaardian Connection walkthrough for quest walkthroughs. Carry forward each page’s section order, card layout, spacing, framing, controls, navigation and interactions, including the shared Regional Tools deck. Supply the appropriate regional and quest content, artwork, destinations and objectives. Outstanding QA findings stay open.


**Current QA priority** is Safari on iPhone. Check portrait, landscape, touch and saved progress. Other browsers are secondary. Xbox is for in-game verification and art references only. [Velen fixes and item-by-item evidence](qa/v49/phone/README.md).

Read [Project Status](PROJECT-STATUS.md) first, then use this page alongside [PHOENIX-SESSION-START.md](PHOENIX-SESSION-START.md). For Velen v49, use the [release record](RELEASE-VELEN-V49.md) and [LT QA checklist](LT-QA-VELEN-V49.md) for the exact release, baseline and open work.

## Carry decisions through the build

1. Before editing, collect the owner's approved decisions and reported defects in one checklist. Give each item its route, approved reference, expected result, scope, and verification method. Record open design questions separately. Compare the current rendered build with the reference before editing, especially when preserving scale, spacing, artwork or control behavior.
2. Fix related items as a batch. Before handing the build back, verify each checklist row in the actual rendered application. Open collapsed controls, exercise normal navigation, use matching viewports for before and after, and inspect the final rendered styles when legacy CSS can override them.
3. Record the exact candidate and baseline with item-level evidence. Distinguish automated tests, author browser checks, independent review, and physical iPhone Safari acceptance. Mark unverified items pending and state the blocker. A regression suite passing does not establish visual or touch acceptance.
4. Consolidate decisions, fixes, unresolved defects, and evidence in a single linked QA handoff before sending it for review. Apply later feedback to that checklist so the owner does not have to restate settled decisions. Update the page template and this startup reference when a template decision is approved.

## Template decision lookup

Start with the [page template index](PAGE-TEMPLATE-INDEX.md) for any page work, the [regional deck template](REGION-DECK-TEMPLATE.md) for deck behavior, and the [art standard](../ART-STANDARD.md) for fixed art, approved rotations and variant rules. Read the [framing gallery](framing-review/README.md) for the visual reference and the [quest card art template](QUEST-CARD-ART-TEMPLATE.md) for subject-specific cards.

| Template | Decisions to carry forward |
|---|---|
| Regional deck | Velen is the canonical deck template. Numbers only, wrap both ways, select on tap or scroll settle, and update the featured quest and its actions. Preserve vertical scroll and use the approved silver selector wolf. In v49, Velen number targets are at least 68 × 64 CSS px. |
| Framing and scale | Keep the accepted parchment, legibility, scale and layout. Add only the clearance needed for forged trim. Box flourishes A–J and original and vine rail pairs V1–V9 are approved. Use one rail style per page. The runtime forged-frame pilot covers the Nilf hub and walkthrough. |
| Buttons | Pick one stable standard text-button variant per page from B1–B10. Peer controls align. The forged rim forms the visible outer perimeter, with bevel and contact shadow and clear space around the silhouette. Illustrated hub and walkthrough actions use their approved fixed artwork. |
| Region Tools and maps | Use the approved Nilf walkthrough Regional Tools component wherever the guide shows regional shortcuts. The floating wolf has independent controls and selection. Use the quest card deck with destination-specific illustrated actions, omit the numbered strip on tools, and place a quiet search bar below it that submits to the Search page. Preserve the floating wolf artwork. The map for a quest shows its pertinent listed locations, and Region Tools opens the regional overview. |
| Quest reading and sources | Preserve objective position on mark, keep related optional tasks beneath the reading content, and use the existing progress owner. Put citations on the central Sources page and use one quiet Sources link at the end of the reading page. Guide-wide legacy citation cleanup is open. |
| Shared copy and content | Include DLC content with its label. Remove expansion toggles and routine browser-save instructions from the template. Record any leftover instances as defects. |

Record future template approvals in the relevant template and link them from the page template index and this calibration page. Record scope and verification state so approval of a mockup does not get reported as acceptance of the running guide. Physical iPhone Safari acceptance remains open.

## Nilf hub review · approved top section

- Shorten the full-width illustration banner so the briefing and walkthrough action sit higher on iPhone.
- Keep a short quest briefing above Start or Continue walkthrough.
- Keep Quest Cards below the walkthrough action. Regions is available through the wolf menu.

These are approved design choices for the next Nilf hub build. Exact banner height and the remaining hub sections are open for review.

### Questions and selected answers

| Question | Selected answer |
|---|---|
| How should the quest illustration and title fit at the top of the hub on iPhone? | **Shorter banner.** Keep the full-width illustration and bring the briefing and walkthrough action higher. |
| What should the parchment show before Start or Continue walkthrough? | **Short briefing.** Keep a one- or two-sentence quest setup above the action. |
| Where should Quest Cards and Regions sit on the hub? | **Keep Quest Cards only.** Give the hub a direct return to its quest deck and use the wolf menu for Regions. |

## Capture a decision or test result

Use the existing task PR or issue for working notes. Keep screenshots, test scripts and results together in the candidate’s evidence folder and link them by finding ID. For a reusable design decision, record the owner’s answer in the applicable template and link to it here. For a one-page decision, the question-and-answer table above is an example.

| Record | Copy these fields into the relevant thread or document |
|---|---|
| Decision | Question · owner’s answer · affected pages · approved example or screenshot · template link · open details |
| Defect | Finding ID · build and device · page/route · steps · expected · observed · evidence |
| Fix and retest | Finding ID · candidate SHA and preview · original steps retried · result (pass/fail/untested) · tester and environment · evidence · remaining checks |
| Session handoff | Active task link · last verified commit · what changed · unresolved items · next action and owner |

Example: **LT49-RT-01** — five Region Tools tiles led to Velen. The [original report](https://github.com/jlimbaugh/Witcher-3-Test-Repository/blob/af5213244960a91f239554ecb5549ab5f8ca8a60/docs/qa/v49/lt/SUMMARY.md) holds the reproduction and evidence. The [implementation assignment](https://github.com/jlimbaugh/Witcher-3-Test-Repository/pull/25#issuecomment-7014957770) names the two entry points to retest. Append candidate results to the fix PR under that same ID.

When work moves to a new PR or a release goes live, update the current-work links in [Project Status](PROJECT-STATUS.md) and the [repository front page](https://github.com/jlimbaugh/Witcher-3-Test-Repository/blob/main/README.md). A preview, a published build, and physical-device acceptance each get their own evidence.

## Future build questions · round 1

Open for owner review. A and B are options. Custom answers are welcome. Record the selected answer in the last column, then carry approved shared decisions into the applicable template.

| # | Question | A | B | Owner answer |
|---|---|---|---|---|
| 1 | On the first iPhone screen of the Nilf hub, what should fit below the banner and briefing? | The full Start/Continue button | The button and the Quest Cards link | A — Show through the full Start/Continue button at the approved reading size. |
| 2 | After you resume a quest, which section should come first beneath those actions? | Quest progress | Preparation and quest details | A — Quest Progress first, then Preparation & Quest Details. |
| 3 | With Quest Progress collapsed, what should its summary show? | Count and next objective | Count only | A — Show count and a short next-objective line while collapsed. |
| 4 | When you expand Preparation mid-quest, which advice should appear first? | What matters at the current step | The original pre-quest checklist | Open |
| 5 | If several nearby activities are available, which should lead the list after time-sensitive warnings? | Activities at your current quest stop | Activities closest to your level | Open |
| 6 | After Hendrik’s notes, what would help you choose between Bloody Baron and Hunting a Witch? | One short line under each card explaining the lead | Title and artwork alone | Open |
| 7 | When you finish a quest and revisit its hub, what should the main button do? | Open the next-leads section | Reopen the completed walkthrough | Open |
| 8 | If two stops on a quest map overlap at phone scale, what should a tap do? | Open a small list of the stops | Zoom in until the pins separate | Open |
| 9 | For an underground objective, what should the first map view show? | The surface entrance | The objective floor, with an entrance link | Open |
| 10 | If you open a merchant from a quest, what should appear first? | The service relevant to this quest | The merchant’s full service list | Open |
| 11 | When several craftsmen qualify for an item, which should the guide list first? | One near the current quest | One the player has already unlocked | Open |
| 12 | For a verified crafting price that varies, what helps most? | A range with the reason it varies | One observed price with its conditions | Open |
| 13 | If you return to a region after leaving it, what should its console lead with? | Unfinished local opportunities | The last quest you viewed there | Open |
| 14 | When a quest continues outside Velen, what should the regional summary say? | “Velen steps complete” with the next region named | The next objective and region together | Open |
| 15 | If you discard an unsaved build comparison, where should you land? | The saved build you started from | The list of saved builds | Open |
| 16 | When two builds have a long comparison, which stats should appear first? | Stats that changed most | Your pinned stats | Open |
| 17 | In a crafting plan, how should you expand a missing crafted component? | Show its ingredients inline | Open its recipe with a return link | Open |
| 18 | For a Gwent opponent with several possible rewards, what belongs on the route card? | A short reward category; reveal cards on tap | The possible cards up front | Open |
| 19 | When you have several copies of a Gwent card, how should the deck builder show them? | One card with owned and in-deck counts | A separate card for each copy | Open |
| 20 | When two quests match a search term, which result should come first? | The quest in the current region | The quest you most recently opened | Open |
| 21 | When reviewing a batch of ten approved quest designs, what should the QA handoff open with? | A contact sheet linking to each playable page | A playable quest list with visual references beside each entry | Open |

The shared Regional Tools menu uses the Nilfgaardian forged silver perimeter, staggered side rails and centered lower brace around the card deck. The illustrated cards retain their individual frames. The wolf is independent.
