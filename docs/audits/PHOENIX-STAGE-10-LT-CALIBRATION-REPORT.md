# Operation Phoenix — Stage 10 LT Calibration Report

**Date:** 2026-11-23  
**Author:** LT / Grok (read-only technical calibration)  
**Baseline:** `docs/phoenix-art-master-catalog` @ `e9c506565972af1ceb1425921cf1f5ed46286c6f`  
**Status:** Documentation and investigation only. No code, merges, deployments, or published guide changes.  
**Evidence labels used throughout:** source inspected · independently tested · historical record · owner approved · unverified

---

## 1. Verified Source and Release Matrix

| Item | Value | Evidence | Notes / Limits |
|------|--------|----------|----------------|
| Active working / art / QA branch | `docs/phoenix-art-master-catalog` | source inspected (BRANCH-AUTHORITY.md, HEAD SHA) | Protected branch. Primary development catalog. |
| Catalog branch HEAD (this audit) | `e9c506565972af1ceb1425921cf1f5ed46286c6f` | source inspected | Full SHA recorded. |
| GitHub `main` | `2ed8b866291dde2ca7758a64e3bf3091639ce63c` | source inspected | Older root-level baseline. `index.html` redirects to published Sites guide. Not the current production source. |
| Common ancestor | `de288fe9` (R19, 2026-11-13) | source inspected (BRANCH-AUTHORITY.md) | Catalog ahead ~138 commits; trees largely disjoint after `dist/` restructuring. |
| Public published guide | Velen v49 (Nov 19, 2026) | historical record + source inspected (RELEASE-VELEN-V49.md, PROJECT-STATUS.md) | Live URL: https://phoenix-wo-qa-1c91b66.krwpfbtbn8.chatgpt.site/#velen |
| GitHub application candidate (v49) | `ba59252cb65800225a68297b6ce7068d3b91ff9b` | source inspected (RELEASE-VELEN-V49.md, PR #24) | Draft PR #24. |
| Sites source commit (v49) | `02daa30f3799a45cd5b01433e777c1ac39d0b804` | source inspected (RELEASE-VELEN-V49.md) | Separate Sites repository. Not automatically equivalent to any GitHub branch. |
| Sites saved version / deployment | `appgprj_6af75db3...` / `appgdep_6afe992d...` (succeeded) | source inspected | Recorded in release note. |
| Previous release / rollback target | Sites v48, source `2d14fa6e75c4b1d5b1991564fe8fd75edd075177` | source inspected | Explicit rollback target recorded for v49. |
| Release archive SHA-256 | `cfb81c4d699673d8933a037c7778d99d4d3e3978c977771bcf2711eda65a3656` | source inspected | Recorded. |
| DEPLOYMENT.md status | Incomplete — matching GitHub SHA unknown in that file | source inspected | File predates or does not fully incorporate the v49 release record details. **Gate A remains unresolved** per Stage 09. |
| Stage 09 / Gate A | **NOT PASSED** | source inspected (PHOENIX-REPO-AUDIT-STAGE-09-GATE-A.md) | Release provenance (exact deployed SHA ↔ GitHub, full rollback safety) not fully closed. Catalog branch is active working source, not proven deployed source. |
| Open / relevant PRs | #24 (v49 candidate), #25 (LT QA evidence), #26 (v49 fixes — partial) | source inspected (PROJECT-STATUS.md, bot transcript history, branch list) | Fix branch `fix/v49-lt-findings` @ `189ab5a677e566e9766093699376d1b460e2720d`. Items 1–3 of the fix list addressed; 4–7 status mixed / later commits present. |
| Rollback & save-preservation safeguards | Documented in QA6, RELEASE-VELEN-V49, REMEDIATION-INDEX, Stage 05–08 | source inspected | Existing guards for unreadable/corrupt records, empty-string preservation, no silent overwrite. Physical Safari acceptance and full independent live verification remain open. |
| Sites vs GitHub distinction | Explicitly separate. Automatic publish disabled. `main` does not control deployment. | source inspected (PROJECT-STATUS.md, DEPLOYMENT.md, PHOENIX-SESSION-START.md) | Confirmed across multiple records. |

**Unknowns / Blockers (Phase A):** Exact live Sites deployment artifact byte-for-byte match to a single GitHub tree beyond the recorded candidate and release notes is not independently re-verified in this pass. Stage 09 Gate A remains open. No production authorization exists.

---

## 2. Accepted-versus-Implemented Feature Matrix (summary)

| Feature / Decision | Accepted (owner / template) | Implemented on candidate / catalog | Evidence | Gaps |
|--------------------|-----------------------------|------------------------------------|----------|------|
| Velen as canonical regional deck template | Yes | Partial (numbers-only strip, wrap, select-in-place present) | owner approved + source inspected (REGION-DECK-TEMPLATE.md, SESSION-CALIBRATION.md) | Full region coverage incomplete; White Orchard remains behavioral reference for non-deck elements. |
| White Orchard behavioral reference | Yes | Yes (historical + retained) | owner approved | Not to be overwritten by Velen template without explicit approval. |
| Nilfgaardian Connection as representative full-flow quest | Yes | Pilot implemented (hub + walkthrough + framing) | owner approved + source inspected | Physical iPhone Safari acceptance open. Top-to-bottom hub review pending. |
| Forged steel framing (B1–B10 buttons, A–J flourishes, V1–V9 rails) | Locked | Pilot on Nilf hub/walkthrough only | owner approved + source inspected (ART-STANDARD.md, NILF-RUNTIME-QA.md) | Not rolled out guide-wide. Raised-button experiments are **not** the production standard. |
| Parchment family (`curled-vellum-r16.webp` default) | Locked | Present | owner approved | Inventory hold on other parchment assets; Set 05 open. |
| Number strip (68×64 targets, wolf pointer) | Yes (v49) | Implemented | source inspected (RELEASE-VELEN-V49.md, LT-QA) | Physical Safari verification open. |
| Region Tools grid | Yes | Implemented with known defects (LT49-RT-01 navigation rewrite) | source inspected + historical LT findings | Fix partially applied on #26; retest required. |
| Progress ownership / save guards | Yes | Guards present (D1/D2/D4 corrected in prior QA) | source inspected | N1 (global Undo ambiguity) deferred. Pyres/Mercy incomplete at objective level. |
| Sources centralization | Yes | Partial (Nilf + some WO) | source inspected | Guide-wide legacy citation cleanup open. |
| Physical iPhone Safari acceptance | Required | Open | multiple records | Owner field acceptance remains the final gate. |

---

## 3. Art Approval-to-Runtime Matrix (excerpt — locked families)

| Family | Locked status | Source / reference path | Exported / runtime status | Visual / Safari verification | Notes |
|--------|---------------|-------------------------|---------------------------|------------------------------|-------|
| Standard text-only buttons B1–B10 | LOCKED (original treatment) | `docs/framing-review/text-only-buttons.jpg` + b7-b10 | Pilot on Nilf (B1 hub, B2 walkthrough) | Unverified on physical Safari | Raised-bevel experiments in `velen-buttons-batch-02/raised-*.jpg` are **explicitly not production standard**. Do not promote. |
| Bottom flourishes A–J | LOCKED | framing-review gallery | Pilot (centered brace on Nilf) | Unverified | Rotation A→J preserved. |
| Vertical rails V1–V9 (original + vine) | LOCKED | framing-review README | Pilot (one vine pair on Nilf) | Unverified | Interleaved rotation retained. One style per page. |
| Parchment (curled-vellum-r16.webp) | LOCKED default | ART-STANDARD.md | In use on reading surfaces | Historical | Inventory of full parchment family still open (Set 05). `dist/worn-vellum-r15.svg` is **not accepted**. |
| Walkthrough corners, warning stamps, map controls, typography sets | LOCKED (various) | Master Asset Catalog + session records | Mostly production/export unverified | Unverified | Catalog explicitly marks most as production/export unverified. |
| Nilfgaardian framing pilot | PILOT IMPLEMENTED | `review/nilf-forged-framing` + NILF-RUNTIME-QA.md | Code exists | Author checks recorded; physical Safari open | Not a full guide rollout. |
| Monochrome sketch archive (59 images) | Historical | Stage 1–4 / 8 | Tiny placeholders; real binaries not fully ingested | N/A | P0-03 in Stage 8 register. |

**Key art rule (owner locked 2026-11-22):** Original B1–B10 treatment only. Later raised-button experiments must not be treated as the production standard. Parchment-family inventory hold remains active.

---

## 4. Open Defect Register (ranked)

**P0 — Release / provenance blockers**
- **P0-01** Exact deployed SHA ↔ GitHub tree match and full rollback provenance not closed (Stage 09 Gate A NOT PASSED). Evidence: Stage 09 report, DEPLOYMENT.md, RELEASE-VELEN-V49.md.
- **P0-02** Progress ownership split (legacy Pyres/Mercy vs canonical Nilf). Rollback risks. Evidence: Stage 6–8, PROJECT-STATUS.md.
- **P0-03** Approved monochrome art binaries not fully ingested as production assets. Evidence: Stage 1/4/8.
- **P0-04** Current candidate independent QA + physical iPhone Safari + served-asset integrity not certified. Evidence: multiple QA records.

**P1 — High (required for standardized region acceptance)**
- **LT49-RT-01** Region Tools tiles rewrite links to `#velen` (historical High on v49). Partial fix on #26; retest required. Evidence: LT QA history, SESSION-CALIBRATION.md.
- **NILF-01 / BTN-01** Nilf scale and tiny button chips (Medium, partially addressed). Evidence: LT findings.
- Locked art families lack verified source → export → integrated → Safari mapping (Stage 4/8 P1-01).
- Navigation / deep-link / map coverage divergences (Stage 7).
- Quest coverage and gameplay accuracy not fully certified (Stage 6).

**P2 — Medium**
- Guide-wide legacy citation cleanup.
- CI / pinned QA6 gate may not cover current candidate.
- Search / Warnings / Undo session-only or storage-denial behavior incompletely verified.
- Branch sprawl and unclassified inventory modules.

All defects above are drawn from existing Stage 1–9 reports, PROJECT-STATUS, LT-QA-VELEN-V49, and release records. None were newly introduced or re-tested as runtime defects in this read-only pass.

---

## 5. Work Dependencies and Technical Risks

- **Provenance first:** No deployment authorization until Gate A is explicitly closed or waived by owner.
- **Save safety:** Any progress-related work must preserve existing unreadable-record guards and test on disposable copies. No silent migrations.
- **Art fidelity:** Do not discard or silently replace locked B1–B10, parchment family, or prior approvals. Raised-button experiments stay out of production standard.
- **Template boundary:** Velen deck is canonical; White Orchard remains behavioral reference. Shared components only after explicit agreement.
- **Device verification:** Physical iPhone Safari remains the final acceptance gate for visual, touch, and VoiceOver items.
- **Branch discipline:** Catalog branch is the working source. `main` is redirect only. Sites is a separate deployment step.

---

## 6. Recommended Development Batch Order (planning hypothesis only)

Aligned with the Stage 10 draft sequence and Stage 8 Gates. Not binding until owner approval after this calibration.

1. **Close Gate A** — Finalize source/deployment/rollback matrix with explicit unknowns recorded.  
2. **Finish approved Nilfgaardian hub + walkthrough template** (including scale, framing pilot acceptance, sources).  
3. **Complete Velen art integration** for locked families (buttons B1–B10 original, parchment, frames, controls) with Safari verification.  
4. **Finish Velen quest-route and regional mapping behavior.**  
5. **Audit and complete Velen content / progress consistency** (including Pyres/Mercy ownership).  
6. **Compare Velen with White Orchard**, select final shared template elements, align both.  
7. **Main map + other regions + Field Reference systems.**

Each batch requires its own SHA-pinned tests, independent review, and owner visual acceptance where applicable.

---

## 7. Tests and Acceptance Checks Required for Each Batch

- Automated: full Node suite against current baselines (v45/QA5/QA6 + current).  
- Author browser checks (Chromium) on affected surfaces.  
- Independent reviewer pass (Capt).  
- Physical iPhone Safari (portrait + landscape) + VoiceOver where touch/visual.  
- Save-protection probes on isolated profiles.  
- Returning-browser / cache-tag verification for any entry-point or asset change.  
- Explicit “also fails on baseline?” for every defect.  
- Evidence labeled (source inspected / independently tested / author-supplied / unverified).

---

## 8. Explicit Unknowns and Blockers

- Live Sites deployment byte-for-byte identity beyond recorded candidate and release notes (Gate A).  
- Full physical iPhone Safari + VoiceOver acceptance for v49 and framing pilot.  
- Complete production inventory and binary export status for most locked art families.  
- Status of remaining v49 fix items 4–7 on the current tip of `fix/v49-lt-findings`.  
- Stage 8 consolidated register has not received a final independent Grok verdict in this pass (prior stages await review).  
- Exact mapping of every approved mockup to runtime CSS/selector on non-Nilf pages.

---

## Handoff and STOP

This report is returned to Capt for independent reconciliation against locked design records, owner decisions, and Stage 1–9 audits.  

No implementation, release PR, merge, or publication is authorized.  
V49/V50 published guide and Sites configuration remain untouched.  
Owner approval of the Master Plan is required before any subsequent build stage.

**Evidence basis:** All claims above are labeled. Primary sources: BRANCH-AUTHORITY.md, DEPLOYMENT.md, PROJECT-STATUS.md, SESSION-CALIBRATION.md, PHOENIX-SESSION-START.md, ART-STANDARD.md, PHOENIX-MASTER-ASSET-CATALOG.md, RELEASE-VELEN-V49.md, LT-QA-VELEN-V49.md, VELEN-COMPLETION-PLAN.md, NILF-RUNTIME-QA.md, Stage 08 and Stage 09 audit reports. Full SHAs recorded where available.

End of Stage 10 LT Calibration Report.
