# White Orchard Coverage Ledger — LT-01

**Baseline commit:** `de288fe9f4415bef3cab0b9eae679ccdc0f35039` (R19)  
**Working branch:** `phoenix-white-orchard-completion`  
**Source of truth:** `white-orchard.js` → `window.PHOENIX_ROUTE`  
**Date:** 13 November 2026  
**Author:** LT (read-only audit)

> A completed inventory is **not** proof of complete regional coverage.  
> Cmdr owns independent gameplay research and reconciliation of missing content.

---

## 1. Recount vs prior claims (corrected per Cmdr disposition)

| Metric | Observed | Notes |
|--------|----------|-------|
| Task records | **59** | Exact match to `white-orchard.js` tasks object |
| Hubs | **13** | Named `hub-*` owners |
| Quest records | **13** | All `type: "quest"` |
| Walkthrough stages | **44** | Sum of stage arrays on the 13 quests |
| Map markers (`map-data.js`) | **64** | Cmdr count: 64 unique marker IDs, 56 distinct referenced task IDs, zero unresolved references |

**Map vs task distinction (Cmdr correction):**  
64 markers versus 59 tasks is **not** a coverage discrepancy. Multiple markers can legitimately reference the same task. Three tasks have no direct pin and need intentional mapping rationale (not invented coordinates): `q-beast`, `departure-review`, `q-incident`.

**Documented shared marker → task references (Cmdr):**  
- `gwent-start`: inn, innkeep-1  
- `q-viper`: viper-steel, viper-silver, banditcamp-5, crypt-entrance  
- `q-dirty`: banditcamp-4, hidden-2  
- `q-devil`: entrance-1, entrance-2, devil-contract, yellowed-diary

---

## 2. Type breakdown

| Type | Count | Meaning (implementation) |
|------|-------|--------------------------|
| `quest` | 13 | Full or multi-stage walkthrough; permanent owner hub |
| `service` | 9 | Merchant / forge / grindstone / herbalist / armorer table |
| `discovery` | 37 | Places of Power, nests, camps, guarded treasure, signposts, Gwent, departure review, warnings |
| **Total** | **59** | |

---

## 3. Hub inventory (13 permanent owners)

| Hub ID | Display name | Label / group | Item count (from hub.items) | Primary quest |
|--------|--------------|---------------|-----------------------------|---------------|
| hub-arrival | Lilac and Gooseberries | MAIN STORY / ARRIVAL | 10 | q-lilac |
| hub-firestarter | Twisted Firestarter | SECONDARY QUEST | 3 | q-firestarter |
| hub-missing | Missing in Action | SECONDARY QUEST | 11 | q-missing |
| hub-pan | A Frying Pan, Spick and Span | SECONDARY QUEST | 1 | q-pan |
| hub-cargo | Precious Cargo | SECONDARY QUEST | 8 | q-cargo |
| hub-death | On Death’s Bed | SECONDARY QUEST | 1 | q-death |
| hub-devil | Contract: Devil by the Well | SECONDARY QUEST | 11 | q-devil |
| hub-hunt | The Beast of White Orchard | MAIN STORY | 8 | q-beast |
| hub-viper | Scavenger Hunt: Viper School Gear | TREASURE HUNT | 4 | q-viper |
| hub-temerian | Temerian Valuables | TREASURE HUNT | 2 | q-temerian |
| hub-deserter | Deserter Gold | TREASURE HUNT | 1 | q-deserter |
| hub-dirty | Dirty Funds | TREASURE HUNT | 1 | q-dirty |
| hub-departure | The Incident at White Orchard / Review | DEPARTURE | 2 | q-incident |

All 59 tasks declare a `home` that resolves to one of the 13 hubs. No orphaned `home` values observed in static inspection.

---

## 4. Quest records (13) — stage counts

| ID | Name | Stages | Home hub | View / deep link |
|----|------|--------|----------|------------------|
| q-lilac | Lilac and Gooseberries | 4 | hub-arrival | quest-q-lilac |
| q-missing | Missing in Action | 3 | hub-missing | quest-q-missing |
| q-pan | A Frying Pan, Spick and Span | 3 | hub-pan | quest-q-pan |
| q-cargo | Precious Cargo | 3 | hub-cargo | quest-q-cargo |
| q-death | On Death’s Bed | 3 | hub-death | quest-q-death |
| q-devil | Contract: Devil by the Well | 5 | hub-devil | quest-q-devil |
| q-beast | The Beast of White Orchard | 5 | hub-hunt | quest-q-beast |
| q-viper | Scavenger Hunt: Viper School Gear | 3 | hub-viper | quest-q-viper |
| q-temerian | Temerian Valuables | 3 | hub-temerian | quest-q-temerian |
| q-deserter | Deserter Gold | 3 | hub-deserter | quest-q-deserter |
| q-dirty | Dirty Funds | 3 | hub-dirty | quest-q-dirty |
| q-firestarter | Twisted Firestarter | 4 | hub-firestarter | quest-q-firestarter |
| q-incident | The Incident at White Orchard | 2 | hub-departure | quest-q-incident |

**Stage total:** 44 (matches orders).

---

## 5. Service records (9)

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

## 6. Discovery coverage (37) — categories observed

- **Places of Power (6):** pop-cemetery, pop-north, pop-cackler, pop-sawmill, pop-bear, pop-bridge  
- **Gwent:** gwent-start  
- **Bandit camps / nests / guarded treasures:** multiple `banditcamp-*`, `monsternest-*`, `guarded-*`  
- **Abandoned sites:** abandoned-1, abandoned-2  
- **Signposts / discovery markers:** several `signpost-*`, `poi-*`  
- **Departure / warning:** departure-review, cow-pasture-warning  
- **Other:** various location markers owned by the quest hubs above

Full per-ID list is available in the companion audit file and the exported inventory.

---

## 7. Completion-meaning notes (static)

No explicit `complete` / `completion` / `mark` enum is present on individual task records in the data object at the time of LT-01. Completion semantics are enforced by the shared progress engine (owner-hub confirmation, stage-view non-completion, objective/choice tracking).  

**Ambiguous / needs Cmdr clarification (do not migrate saves):**
- Service visits (forge, grindstones, merchants) — “visited” vs “used once”
- Signpost discovery vs map pin reveal
- Place of Power — ability point drawn vs merely located
- Departure-review — informational checklist vs completable activity
- cow-pasture-warning — pure warning, no mark expected

Assignment 02 supplies the descriptive metadata definitions.

---

## 8. Content-status snapshot (engineering view)

| Status | Approximate count | Evidence |
|--------|-------------------|----------|
| Substantive guidance (multi-stage quests with intro/why/requirements) | 13 quests | Present in data |
| Compact discovery / service entries | ~37 + 9 | Short name + home + view |
| Placeholder / missing | 0 observed in data object | No empty-name or null-home tasks |
| Source references present | All sampled tasks | `hasSources: true` on every record inspected |

Source *verification* (accuracy of the cited material) remains Cmdr responsibility.

---

## 9. Map reconciliation (Cmdr-verified)

- Task object: 59 unique IDs.  
- Map markers (`map-data.js`): 64 markers, 64 unique marker IDs, 56 distinct referenced task IDs, zero unresolved task references (Cmdr independent count).  
- 64 vs 59 is explained by shared references (see §1). Multiple markers → one task is intentional.  
- Three tasks lack a direct pin: `q-beast`, `departure-review`, `q-incident`. Mapping rationale is required; coordinates must not be invented.  
- No Xbox coordinate accuracy is claimed from this ledger.

---

## 10. Known scope items for Cmdr research (not invented here)

- Faithful Friend (confirmed later-story conditional content; spoiler-gated later-return only)  
- Full missable / later-return list  
- Exhaustive random container / repeatable loot (document boundary rather than checklist)  
- Any additional Gwent opponents or notice-board contracts not present in the 59  

---

*End of coverage ledger. See WHITE-ORCHARD-AUDIT-LT-01.md for technical findings and severity.*
