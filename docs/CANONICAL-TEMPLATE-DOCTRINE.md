# OPERATION PHOENIX — CANONICAL TEMPLATE AND REPOSITORY DOCTRINE
**Authority:** Capt (project owner). **Recorded:** 2026-11-23. **Status:** APPROVED DESIGN AND PROCESS DOCTRINE; NOT IMPLEMENTATION OR RELEASE AUTHORIZATION.
**Command:** Capt = owner/final approval; Cmdr = ChatGPT, coordination and independent QA; LT = Grok, engineering and technical testing. PFC is retired.

## Purpose and precedence
One authoritative regional template, one coherent geographic map architecture, one clean development lineage, and a repeatable guide-wide construction process. This doctrine supersedes conflicting older template, map, branch-retention, and Progress/Constellation instructions. Preserve unrelated accepted safety, save, art, and release requirements. Current release status must be verified from PROJECT-STATUS and release records; this document does not establish that any implementation or cleanup has passed.

## Capt's 21 adopted decisions
1. Velen is the visual and functional master, incorporating specifically approved White Orchard elements.
2. Lock individual page patterns first; then lock the integrated template.
3. Future regions share framework and behavior but have unique regional content and artwork.
4. Main Map is a whole-game geographical atlas with optional layers.
5. Build the full Main Map after Velen template lock.
6. Progress is an optional Main Map overlay to be built later, not a standalone destination.
7. Regional and quest map views share canonical location data, with different scopes and presentations.
8. Selecting a marker opens relevant quest/location details and permits return to the map.
9. Offer a small, useful set of map layers with simple controls.
10. Retire redundant Progress shortcuts; preserve useful quest-level tracking.
11. Keep Unfinished, Completed, Unavailable, Missed, and Failed conceptually distinct; finalize canonical state rules before implementing Missed.
12. Use one consistent six-destination wolf navigation system guide-wide.
13. Art follows approved Velen language with White Orchard accents and two distinct metals.
14. Use curated rotating asset variations only within locked design rules.
15. Remove unused/rejected assets from production; archive only where historically valuable.
16. Establish a new clean canonical integration branch after audit.
17. Audit unique branch work and preserve accepted contributions before deleting obsolete branches.
18. Close superseded PRs and remove obsolete working instructions while retaining necessary history.
19. Template acceptance requires visual, functional, accessibility, regression, and physical iPhone Safari checks.
20. Migrate White Orchard to the locked Velen template under controlled changes preserving content and saves.
21. Sequence: lock Velen, align White Orchard, then build Main Map; future regions inherit the template.

## Target map contract
The geographical Main Map is the atlas and region entry point, not a quest journal, independent Progress page, or celestial visualization. Regional maps provide detailed exploration. Quest/location views reuse the same canonical location IDs and geography, with focused context and reliable return state. Layers remain few, understandable, and optional. Main Map Progress is **future work**; any White Orchard-only progress filtering in Order 017 is provisional, not proof that the final Main Map exists. Retire obsolete Progress button destinations where redundant, but preserve quest tracking, saves, Undo, and meaningful activity context. Legacy Velen Progress/Constellation redirects target the supported `#velen/map` route. The old White Orchard Journey panel remains retired.

### Progress semantics — proposed working definitions, not yet implementation approval
- Unfinished: not complete, potentially achievable.
- Completed: player-confirmed complete.
- Unavailable: not currently accessible due to progression/prerequisites; NOT automatically Missed.
- Missed: permanently lost opportunity in this playthrough, when reliably established.
- Failed: explicitly failed quest/objective.
Capt selected **C: revisit the Missed definition**. Do not conflate Unavailable with Missed or infer Failed/Missed from absence of completion. Require canonical data and owner review before implementing.

## Velen master-template acceptance contract
Certify page patterns individually: region console, quest hub, walkthrough, activities/discoveries, services, regional tools, maps, and relevant supporting pages. Lock shared typography, parchment/stone framing, two-metal steel/silver treatment, approved raised buttons, ornamental variants, spacing, responsive scroll/touch behavior, six-destination wolf navigation, marker behavior, quest links, Progress/Undo/save handling, and accessibility. Use accepted Velen styling with explicitly approved White Orchard contributions. Regional artwork/content may vary, shared controls and interaction rules may not drift without Capt approval. Lock the integrated Velen template only after all patterns and regression checks pass, including physical iPhone Safari. Later changes require documented impact, cross-region tests, and Capt approval.

## Branch, asset and document disposition policy
Before any destructive operation, inventory all remote branches, PRs, unique commits, tests, assets, dependencies, and documents. Classify each as **retain in canonical build**, **migrate accepted unique contribution**, **archive historical evidence**, or **retire after verification**. Branch names, test totals, or PR mergeability are insufficient evidence for deletion. Preserve a verified recovery checkpoint and exact source/deployment provenance. Select a clean V50-derived lineage only after auditing Order 017 / PR #35 and approved PR #29/#30 contributions; do not assume existing `main` or the obsolete `feature/progress-star-chart` branch is the desired base. Keep production art registry limited to approved assets with a defined component, usage/rotation rule and provenance. Remove rejected alternatives, duplicate experiments, obsolete celestial assets and contradictory live instructions from the working production tree after approval; historical records may remain clearly labeled outside production.

## Ordered milestones and STOP gates
**Phase 1 — Read-only audit:** LT delivers branch disposition register, asset register, canonical component inventory, dependency map, clean-branch proposal and acceptance checklist. Cmdr independently reviews. **STOP 1:** Capt approves disposition before deleting branches/assets or closing PRs.
**Phase 2 — Velen certification:** lock each page pattern and then integrated template. **STOP 2:** Capt accepts each pattern; **STOP 3:** full visual, functional, accessibility, regression, and physical Safari acceptance.
**Phase 3 — White Orchard alignment:** controlled migration preserving all content, progression, save keys and Undo. **STOP 4:** Capt approves migration and independent QA.
**Phase 4 — Main Map:** build geographical atlas, shared region/location model, navigation, layers, then optional Progress overlay using approved state semantics.
**Phase 5 — Regional expansion:** reuse locked framework; regional data and art vary. Template changes require deliberate review.
Production merges, deployment, publication, rollback and destructive cleanup each require explicit authorization. Order 017 / PR #35 remains a draft candidate under QA, not an accepted release. Order 014 remains paused unless Capt reauthorizes it.

## Session-start requirement
Every Cmdr/LT session reads this doctrine after PROJECT-STATUS, SESSION-CALIBRATION, and PHOENIX-SESSION-START, reconciles any conflicts by marking older text superseded, and states the applicable template and release gates before working. The 21 decisions are durable; do not reopen them as new design questions without a concrete conflict or Capt instruction.
