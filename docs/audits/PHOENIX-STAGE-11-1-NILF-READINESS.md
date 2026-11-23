# Operation Phoenix — Stage 11.1 Nilfgaardian Connection Readiness Report

**Date:** 2026-11-23  
**Author:** LT / Grok (engineering investigation only)  
**Baseline branch:** `docs/phoenix-art-master-catalog`  
**Baseline full SHA:** `e9c506565972af1ceb1425921cf1f5ed46286c6f`  
**Status:** Read-only. No application edits, asset replacement, merges, or publication.  
**Evidence labels:** source inspected · historical record · owner approved · unverified

---

## Baseline and scope

Current development baseline is the catalog branch above (not the published V49/V50 Sites deployment).  
This investigation reuses Stage 10 calibration, LT-QA-VELEN-V49, NILF-RUNTIME-QA, SESSION-CALIBRATION, VELEN-COMPLETION-PLAN, PAGE-TEMPLATE-INDEX, and the master art catalog. No new runtime testing was performed.

Nilfgaardian Connection remains the representative full-flow quest. Routes of interest: `/#velen/hub/nilf` and `/#velen/quest/nilf/1`.

---

## Existing functionality to preserve

- Shared progress ownership and save-protection guards (unreadable/corrupt/empty-string records preserved; no silent overwrite). Evidence: source inspected (prior QA6 / Stage 6–8 / PROJECT-STATUS).
- Objective mark + immediate Undo, reload persistence, and return navigation to the same hub/stage. Evidence: historical record (NILF-RUNTIME-QA, LT-QA).
- Quiet Sources links at the end of Nilf hub and walkthrough to the central index (no inline objective citations). Evidence: source inspected (LT-QA, SESSION-CALIBRATION).
- Framing pilot (B1 on hub, B2 on walkthrough; vine rail pair + centered flourish) as implemented, without promoting raised-button experiments. Evidence: owner approved + source inspected (ART-STANDARD, master catalog Set 01).
- Number strip (68×64 minimum targets, wolf pointer, select-on-tap/settle, wrap both ways). Evidence: owner approved + source inspected.
- Illustrated hub/walkthrough action art and parchment reading surfaces (`curled-vellum-r16.webp` default). Evidence: owner approved.
- Arrival / region ownership counts and DLC labeling where present. Evidence: source inspected.

---

## Confirmed defects and evidence gaps

| ID / item | Description | Evidence | Status on current baseline |
|-----------|-------------|----------|----------------------------|
| NILF-01 | Hub title/briefing scale reduced vs prior (v48) after framing; first-screen fit of shorter banner + short briefing + full Start/Continue not fully verified. | historical LT findings + owner approved (SESSION-CALIBRATION shorter banner / first-screen decisions) | Partially addressed in v49; exact first-screen layout unverified on physical Safari. |
| BTN-01 | Return-to-hub / Previous / Next rendered as tiny chips (legacy CSS override). | historical LT findings | Partial fix on fix/v49-lt-findings; original B1–B10 silhouette (not raised-bevel) must be confirmed. |
| LT49-RT-01 | Region Tools tiles rewrite external links to `#velen`. | historical LT findings (High) | Partial fix on #26; retest required from both console and walkthrough. |
| Hub section order | Quest Progress must appear before Preparation & Quest Details; collapsed progress shows count + short next-objective. | owner approved (SESSION-CALIBRATION Q1–Q3) | Implementation alignment unverified in this pass. |
| Route sketch | Whole-route view with current step highlighted; only pertinent stops; tappable markers. | owner approved (VELEN-COMPLETION-PLAN) | Behavior unverified on current candidate. |
| Physical Safari | Portrait + landscape acceptance of scale, rails, touch targets, wolf control, Sources, progress/Undo. | multiple records | Open (unverified). |
| Button family | Original B1–B10 treatment only; raised experiments are not production standard. | owner approved (master catalog Set 01) | Must not be silently promoted. |

No new independently tested runtime defects are claimed. All items above are drawn from existing evidence.

---

## Proposed minimal implementation batch (11.1 / 11.2)

Scope limited to Nilf hub + walkthrough alignment. No unrelated Velen pages, no progress schema changes, no asset redesign.

**Exact files (candidate, subject to confirmation on isolated branch):**
- `dist/velen-r18.js` / hub rendering logic (banner height, briefing placement, section order).
- Scoped Nilf stylesheet (or shared parchment/forged CSS) for scale, button silhouettes (original B1/B2), rail clearance.
- Sources link placement if any residual inline citations remain.
- Region Tools destination handling (only if LT49-RT-01 still reproduces on current tip).
- Route sketch entry from hub/walkthrough (verify/adjust open behavior only).

**Dependencies:** Existing shared-walkthrough, progression owner, and framing pilot modules. No new storage keys.

**Expected visual changes:**
- Shorter full-width banner so briefing + full Start/Continue sit higher on iPhone (first screen).
- Quest Progress before Preparation; collapsed summary shows count + next-objective line.
- Standard text buttons use original B1 (hub) / B2 (walkthrough) silhouettes with forged rim as outer perimeter.
- Sources remain quiet end-of-page links.
- Rails and flourish remain clear of content/controls.

**Required tests:**
- Existing Node suite (progress, save guards, cache tags) against current baselines — must remain green.
- Author Chromium checks at 390×844 and 844×390: hub first screen, walkthrough entry/return, objective mark + Undo, Sources links, Region Tools destinations, route sketch open.
- Isolated browser profile for any progress writes.
- Explicit “also fails on v48 baseline?” for any residual scale/button issues.

---

## Owner visual acceptance checklist (physical iPhone Safari)

- [ ] First screen: shorter banner + short briefing + full Start/Continue at approved reading size (portrait).
- [ ] Quest Progress appears before Preparation & Quest Details; collapsed state shows count + next-objective.
- [ ] Button silhouettes match original B1/B2 (forged rim outer, no rectangular plate, peer alignment).
- [ ] Rails/flourish clear of text and touch targets; parchment contrast and wrapping acceptable.
- [ ] Quiet Sources link at end of hub and walkthrough lands on correct index entry.
- [ ] Region Tools destinations correct from hub and walkthrough; Search/Warnings dismiss and return.
- [ ] Route sketch opens with current step highlighted; only pertinent stops shown.
- [ ] Mark objective → Undo restores; reload preserves state; no save overwrite.
- [ ] Landscape orientation and VoiceOver labels pass.

---

## Risks to saved progress and rollback

- **Low** if batch stays within CSS/layout and verified navigation fixes. Existing save guards and progress owners must be left untouched.
- No migrations, no new storage keys, no clearing of browser data.
- Rollback is code-only (branch revert); prior user progress remains compatible.
- Physical Safari remains the acceptance gate; do not treat author Chromium results as final.

---

## STOP

Readiness report returned to Capt for reconciliation against locked Nilf template decisions.  
No implementation authorized until owner reviews this report and Capt issues the coordinated implementation recommendation.  
V49/V50 published guide remains untouched.

**Primary sources:** docs/SESSION-CALIBRATION.md, docs/VELEN-COMPLETION-PLAN.md, docs/PAGE-TEMPLATE-INDEX.md, docs/LT-QA-VELEN-V49.md, docs/framing-review/NILF-RUNTIME-QA.md, docs/art/PHOENIX-MASTER-ASSET-CATALOG.md, Stage 10 report. Full baseline SHA recorded.
