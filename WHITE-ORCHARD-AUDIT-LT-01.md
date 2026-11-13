# White Orchard Audit — LT-01 (Technical)

**Baseline SHA:** `de288fe9f4415bef3cab0b9eae679ccdc0f35039`  
**Branch:** `phoenix-white-orchard-completion`  
**Date:** 13 November 2026  
**Scope:** Read-only inventory, link/ownership, save-schema risk inspection.  
**STOP boundary observed:** No application code, artwork, guidance text, save keys, IDs, main, hosting, or Velen changes.

---

## Commands & results

```text
# Source retrieval
curl -sL https://raw.githubusercontent.com/jlimbaugh/Witcher-3-Test-Repository/de288fe9f4415bef3cab0b9eae679ccdc0f35039/white-orchard.js -o /tmp/wo.js
wc -l /tmp/wo.js          # 2237 lines

# Static parse
node -e '… extract window.PHOENIX_ROUTE …'
# → tasks: 59 | hubs: 13 | stages: 44 | types: quest 13 / service 9 / discovery 37
```

Existing progression tests and JS syntax were not re-executed in this sandbox session (no local node test runner against the full suite). Prior R19 claim of 38 passing tests is accepted as baseline status; any new fixture changes are out of scope.

Browser observation (Chromium):
- Selection-in-place, Open selected, Return to exact hub, and hash routing continue to function on the live R19 deployment.
- Physical iPhone / VoiceOver / blocked-storage not available.

---

## Findings by severity

### Critical
*None observed.* No broken task→hub ownership, no duplicate IDs, no missing `home` values in the 59-task object.

### High
*None observed in static data.*  

### Medium

1. **Completion-meaning ambiguity on non-quest records (addressed by Assignment 02)**  
   - IDs: all `service` and many `discovery` entries (grindstones, merchants, signposts, departure-review, cow-pasture-warning, Places of Power).  
   - Observation: Descriptive metadata was not yet present at the time of LT-01. Engine already supports objective/choice tracking; owner-hub Confirm is not the sole mechanism.  
   - Impact: Player-facing labels needed clarity.  
   - Disposition: Assignment 02 supplies the explicit descriptive definitions without changing saved Booleans or schema.

### Low / Informational

2. **Map markers vs task records (corrected)**  
   - Cmdr independent count: 64 markers, 64 unique marker IDs, 56 distinct referenced task IDs, zero unresolved references.  
   - 64 vs 59 is explained by shared references; not a discrepancy.  
   - Three tasks lack a direct pin (`q-beast`, `departure-review`, `q-incident`) and require intentional mapping rationale.

3. **Numeric hub indices**  
   - Ordinary array storage; `hub.id` resolution works. Not a defect (Cmdr disposition).

4. **Source references present but unverified**  
   - All sampled tasks report source fields. Verification remains Cmdr scope.

5. **Faithful Friend**  
   - Confirmed by Cmdr as conditional later-story content, absent from prologue inventory. Spoiler-gated later-return guidance only; not an arrival task. Not imported in Assignment 02.

---

## Ownership & link integrity (static)

- Every task has a non-null `home` that matches a hub `id`.  
- Every task has a unique `view` deep-link string.  
- Hub `.items` arrays reference task IDs that exist in the tasks object (spot-checked; no orphans found in sampled hubs).  
- No duplicate task IDs.

Map → task → owner chain requires the map data layer (not fully parsed in this pass). Coordinate bounds checks were not performed; no Xbox accuracy claim is made.

---

## Save / progress engine inspection (read-only)

- White Orchard continues to use its own key (`phoenix.whiteorchard.interaction.v1`).  
- Velen uses a separate key (`phoenix.velen.arrival.v1`).  
- Stage viewing is documented as non-completing; owner-hub Confirm is required.  
- Objective/choice tracking already exists in progression-data.js / progression-engine.js / progression-ui.js.  
- Undo field exists in the save shape.  
- No schema modification performed or proposed in this assignment.

Risks noted for later implementation orders only:
- Any expansion of completion meaning on service/discovery records must preserve existing saved marks.  
- Future region integration must keep both save formats explicit.

---

## Browser / device limits of this audit

| Check | Result |
|-------|--------|
| Selection stays in place | Observed (R19 live) |
| Selected actions match selection | Observed |
| Exact hub return | Observed |
| Back / Forward | Observed on sample paths |
| Refresh / resume | Not exhaustively re-tested |
| Keyboard focus order | Not fully mapped |
| 390 px layout | Prior R19 narrow checks accepted |
| Map filters / completed-state visibility | Not re-exercised |
| Physical iPhone Safari / VoiceOver | **Unavailable** |
| Blocked-storage | **Unavailable** |

Chromium is not a substitute for CaptDrunk’s device acceptance.

---

## Proposed first repair slice (for Cmdr order only)

1. Cmdr confirms or updates the intended completion semantics for the 9 services + key discovery records (Places of Power, departure-review, pure warnings).  
2. Cmdr supplies the reconciled missing-content list (Faithful Friend, any additional missables, later-return items) with source citations.  
3. Only after the above, LT receives a bounded implementation order for any data or UI adjustments.  

No code or content changes are proposed or performed under Assignment 01. Assignment 02 proceeds under separate orders.

---

## Changed files (this assignment)

- `WHITE-ORCHARD-COVERAGE.md` (new)
- `WHITE-ORCHARD-AUDIT-LT-01.md` (this file)

No other files modified.

---

## Limits & explicit non-claims

- White Orchard is **not** labelled complete.  
- No advance to Velen.  
- No Xbox coordinate accuracy asserted.  
- No invented stages, coordinates, or ownership for missing content.  
- Source accuracy verification remains Cmdr responsibility.

Awaiting Cmdr’s next bounded implementation order.
