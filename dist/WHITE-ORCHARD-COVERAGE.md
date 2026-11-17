# White Orchard Coverage Ledger — LT-01 (corrected LT-02)

**Baseline commit:** `de288fe9f4415bef3cab0b9eae679ccdc0f35039` (R19)  
**Working branch:** `phoenix-white-orchard-completion`  
**Source of truth:** `white-orchard.js` → `window.PHOENIX_ROUTE`  
**Date:** 13 November 2026  
**Author:** LT

> A completed inventory is **not** proof of complete regional coverage.  
> “No empty fields in the data object” is not the same as “content completeness assessed.”  
> Cmdr owns independent gameplay research and reconciliation of missing content.

---

## 1. Recount (Cmdr disposition applied)

| Metric | Observed | Notes |
|--------|----------|-------|
| Task records | **59** | Exact match to tasks object |
| Hubs | **13** | Named `hub-*` owners |
| Quest records | **13** | All `type: "quest"` |
| Walkthrough stages | **44** | Sum of stage arrays on the 13 quests |
| Map markers (`map-data.js`) | **64** | Cmdr: 64 unique marker IDs, 56 distinct referenced task IDs, zero unresolved |

**Map vs task:** 64 markers vs 59 tasks is **not** a discrepancy. Shared references are intentional. Three tasks lack a direct pin and need mapping rationale (not invented coordinates): `q-beast`, `departure-review`, `q-incident`.

**Shared marker → task (Cmdr):**  
- `gwent-start`: inn, innkeep-1  
- `q-viper`: viper-steel, viper-silver, banditcamp-5, crypt-entrance  
- `q-dirty`: banditcamp-4, hidden-2  
- `q-devil`: entrance-1, entrance-2, devil-contract, yellowed-diary

---

## 2. Type breakdown

| Type | Count |
|------|-------|
| quest | 13 |
| service | 9 |
| discovery | 37 |
| **Total** | **59** |

---

## 3. Hub inventory (accurate item counts from baseline)

| Hub ID | Display name | Item count | Items |
|--------|--------------|------------|-------|
| hub-arrival | Lilac and Gooseberries | 10 | q-lilac, gwent-start, q-firestarter, q-missing, q-pan, q-cargo, poi-4, shopkeeper-1, signpost-3, cow-pasture-warning |
| hub-firestarter | Twisted Firestarter | 3 | loc-forge, q-firestarter, grindstone-village |
| hub-missing | Missing in Action | 11 | q-missing, poi-1, monsternest-3, pop-cackler, monsternest-2, banditcamp-6, guarded-5, signpost-7, signpost-8, signpost-9, signpost-10 |
| hub-pan | A Frying Pan, Spick and Span | **2** | q-pan, q-cargo |
| hub-cargo | Precious Cargo | 8 | q-cargo, pop-sawmill, abandoned-2, banditcamp-3, grindstone-3, guarded-2, shopkeeper-2, signpost-4 |
| hub-hunt | The Beast of White Orchard | **13** | q-death, q-devil, q-viper, q-beast, q-dirty, pop-cemetery, q-temerian, armourerstable-1, blacksmith-1, grindstone-4, guarded-4, signpost-6, spoils-1 |
| hub-death | On Death’s Bed | 1 | q-death |
| hub-devil | Contract: Devil by the Well | 11 | q-devil, pop-bear, pop-bridge, abandoned-1, banditcamp-1, banditcamp-2, guarded-1, herbalist-2, signpost-1, signpost-2, smugglers-1 |
| hub-viper | Scavenger Hunt: Viper School Gear | **5** | pop-cemetery, q-viper, pop-north, monsternest-1, guarded-3 |
| hub-temerian | Temerian Valuables | **3** | q-temerian, q-deserter, signpost-5 |
| hub-deserter | Deserter Gold | **2** | q-deserter, q-temerian |
| hub-dirty | Dirty Funds | 1 | q-dirty |
| hub-departure | The Incident at White Orchard | **7** | q-firestarter, q-missing, q-pan, q-cargo, q-death, departure-review, q-incident |

All 59 tasks declare a `home` that resolves to one of the 13 hubs.

---

## 4. Quest records (13)

| ID | Name | Stages | Home |
|----|------|--------|------|
| q-lilac | Lilac and Gooseberries | 4 | hub-arrival |
| q-missing | Missing in Action | 3 | hub-missing |
| q-pan | A Frying Pan, Spick and Span | 3 | hub-pan |
| q-cargo | Precious Cargo | 3 | hub-cargo |
| q-death | On Death’s Bed | 3 | hub-death |
| q-devil | Contract: Devil by the Well | 5 | hub-devil |
| q-beast | The Beast of White Orchard | 5 | hub-hunt |
| q-viper | Scavenger Hunt: Viper School Gear | 3 | hub-viper |
| q-temerian | Temerian Valuables | 3 | hub-temerian |
| q-deserter | Deserter Gold | 3 | hub-deserter |
| q-dirty | Dirty Funds | 3 | hub-dirty |
| q-firestarter | Twisted Firestarter | 4 | hub-firestarter |
| q-incident | The Incident at White Orchard | 2 | hub-departure |

Stage total: 44.

---

## 5. Service records (9) — completion definition (shared)

**Definition:** Reviewed service — checked the service/location and what it offers. Purchase, repair, crafting or a Gwent win is never required.

| ID | Name | Home |
|----|------|------|
| loc-forge | Willis’s forge | hub-firestarter |
| armourerstable-1 | Armorer’s table · Near Nilfgaardian Garrison | hub-hunt |
| blacksmith-1 | Garrison blacksmith · Near Nilfgaardian Garrison | hub-hunt |
| grindstone-village | Grindstone · West of Woesong Bridge | hub-firestarter |
| grindstone-3 | Grindstone · West of Sawmill | hub-cargo |
| grindstone-4 | Grindstone · Near Nilfgaardian Garrison | hub-hunt |
| herbalist-2 | Shrine herbalist · Southwest of Ford | hub-devil |
| shopkeeper-1 | Bram · cards and riding supplies | hub-arrival |
| shopkeeper-2 | Sawmill merchant | hub-cargo |

---

## 6. Full discovery inventory (37) with completion definitions

| ID | Name | Home | Completion definition |
|----|------|------|----------------------|
| gwent-start | Play the scholar and check inn cards | hub-arrival | Reviewed Gwent stop — the scholar/card-shopping guidance was reviewed. This mark is not proof of winning a specific card or buying every card. |
| pop-cemetery | Cemetery Place of Power | hub-hunt | Ability point drawn — the first ability point has been received in game. Visiting or viewing the guide alone is not enough. |
| pop-north | Northern woods Place of Power | hub-viper | Ability point drawn — the first ability point has been received in game. Visiting or viewing the guide alone is not enough. |
| pop-cackler | Cackler Bridge Place of Power | hub-missing | Ability point drawn — the first ability point has been received in game. Visiting or viewing the guide alone is not enough. |
| pop-sawmill | Sawmill Place of Power | hub-cargo | Ability point drawn — the first ability point has been received in game. Visiting or viewing the guide alone is not enough. |
| pop-bear | Southern bear-guarded Place of Power | hub-devil | Ability point drawn — the first ability point has been received in game. Visiting or viewing the guide alone is not enough. |
| pop-bridge | Broken Bridge Place of Power | hub-devil | Ability point drawn — the first ability point has been received in game. Visiting or viewing the guide alone is not enough. |
| departure-review | Review before leaving White Orchard | hub-departure | Reviewed departure checklist — the checklist was reviewed. This does not mean every listed activity was finished. |
| abandoned-1 | Abandoned shrine · southeast road | hub-devil | Threats cleared and residents returned. |
| abandoned-2 | Abandoned site · west of Sawmill | hub-cargo | Threats cleared and residents returned. |
| banditcamp-1 | Bandit camp · Southwest of Broken Bridge | hub-devil | Camp cleared and listed loot collected. |
| banditcamp-2 | Bandit camp · South of Ford | hub-devil | Camp cleared and listed loot collected. |
| banditcamp-3 | Bandit camp · Northwest of Sawmill | hub-cargo | Camp cleared and listed loot collected. |
| banditcamp-6 | Bandit camp · Southwest of Crossroads | hub-missing | Camp cleared and listed loot collected. |
| guarded-1 | Guarded treasure · Southeast of Woesong Bridge | hub-devil | Guarded site cleared and listed containers searched. |
| guarded-2 | Guarded treasure · Southwest of Nilfgaardian Garrison | hub-cargo | Guarded site cleared and listed containers searched. |
| guarded-3 | Guarded treasure · North of Mill | hub-viper | Guarded site cleared and listed containers searched. |
| guarded-4 | Guarded treasure · Southeast of Nilfgaardian Garrison | hub-hunt | Guarded site cleared and listed containers searched. |
| guarded-5 | Guarded treasure · South of Ransacked Village | hub-missing | Guarded site cleared and listed containers searched. |
| monsternest-1 | Ghoul nest · north of the cemetery | hub-viper | Nest destroyed and remains looted; killing nearby enemies alone is insufficient. |
| monsternest-2 | Ghoul nest · Cackler Bridge | hub-missing | Nest destroyed and remains looted; killing nearby enemies alone is insufficient. |
| monsternest-3 | Ghoul nest · east of Crossroads | hub-missing | Nest destroyed and remains looted; killing nearby enemies alone is insufficient. |
| poi-1 | Battlefield search · north of Ransacked Village | hub-missing | Battlefield loot search performed; Missing in Action objectives remain separate. |
| poi-4 | Yennefer’s crystal skull | hub-arrival | Collected — Yennefer’s crystal skull was collected in game. |
| signpost-1 | Abandoned Village signpost | hub-devil | Discovered — the fast-travel signpost was unlocked in game. |
| signpost-2 | Broken Bridge signpost | hub-devil | Discovered — the fast-travel signpost was unlocked in game. |
| signpost-3 | Woesong Bridge signpost | hub-arrival | Discovered — the fast-travel signpost was unlocked in game. |
| signpost-4 | Sawmill signpost | hub-cargo | Discovered — the fast-travel signpost was unlocked in game. |
| signpost-5 | Mill signpost | hub-temerian | Discovered — the fast-travel signpost was unlocked in game. |
| signpost-6 | Nilfgaardian Garrison signpost | hub-hunt | Discovered — the fast-travel signpost was unlocked in game. |
| signpost-7 | Cackler Bridge signpost | hub-missing | Discovered — the fast-travel signpost was unlocked in game. |
| signpost-8 | Crossroads signpost | hub-missing | Discovered — the fast-travel signpost was unlocked in game. |
| signpost-9 | Ford signpost | hub-missing | Discovered — the fast-travel signpost was unlocked in game. |
| signpost-10 | Ransacked Village signpost | hub-missing | Discovered — the fast-travel signpost was unlocked in game. |
| smugglers-1 | Smugglers’ cache · South of Ford | hub-devil | Listed cache containers looted. |
| spoils-1 | Spoils of war · East of Nilfgaardian Garrison | hub-hunt | Listed cache containers looted. |
| cow-pasture-warning | Cow pasture · farming warning | hub-arrival | Read warning — the warning was acknowledged. Cow farming is never a completion requirement. |

---

## 7. Content status distinction

| Finding | Meaning |
|---------|---------|
| No empty name / null-home fields | Data-object structural integrity only |
| Content completeness | **Unassessed** — Cmdr owns accuracy, missing content, and route verification |

---

## 8. Faithful Friend

Confirmed by Cmdr as conditional later-story content. Absent from prologue inventory. Spoiler-gated later-return only. Not imported in Assignment 02.

---

*End of corrected coverage ledger.*
