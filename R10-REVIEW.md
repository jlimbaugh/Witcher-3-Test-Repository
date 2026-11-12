# R10 weathered-template integration — review build

Baseline: R9 4015ef2613adcdc435b96da830f2fbcb0fa4e475. Review branch: phoenix/r10-weathered-templates. Main/Pages remain unchanged.

## Implemented
- Console: retained official scene, silver-framed illustrated entrances, weathered material layer.
- Regional quest bracket: landscape surface, silver plaques and expanding parchment task hubs. Existing permanent homes, windowed groups and eligibility are retained.
- Walkthroughs: short introduction before facts, stage index, preparation disclosure, dark navigation buttons. Devil by the Well has a generated decorative haunted-scroll background for review.
- Existing completion and migration storage keys/schema preserved. No imported mockup counts or invented task membership.
- Stage index now tracks real stage changes; render callbacks guard against stale navigation generations.

## Verification
- All 29 progression Node tests passed, including D1–D13 regressions, cascades, departure, branch switching and migrated marks.
- Chromium: stage Next and numbered active index agree; reload resumes selected stage.
- Chromium: only one hub expanded when switching between Hunt and Devil.
- Task link -> contract -> Return restores the open Devil hub. Repeat test with task already visible restored x=0/y=1068 exactly. An earlier comparison measured before the click automation scrolled the task into view and was not an exact-return failure.
- Optional objective update opened an impact preview, confirmed, persisted across reload, and was undone using Story & correction controls after reload. Toast is intentionally not reopened on reload.
- Native map: Show all markers reports 64/64. Fresh cluster can show zero until relevant progress is confirmed, with an explanatory message.
- Phone-sized Chromium iframe: 390px outer width, 375px layout width after scrollbar; document scrollWidth=clientWidth=375 on contract opening.
- Browser observations are Chromium only, not iPhone Safari, real touch or VoiceOver acceptance.

## Content check
Devil by the Well's client, investigation, bracelet/cave sequence, preparation before burning, noonwraith, trophy and payment/amethyst choice checked against https://www.gamebanshee.com/thewitcher3/walkthrough/contract-devilbythewell.php on 2026-11-12. Existing concise copy retained. Whole-region encounter/reward/availability validation is not claimed. Keep Xbox field acceptance pending.

## Still required before accepting the templates
- Replace generic object-study plaque pictures with individually verified quest illustrations. Current plaques share original decorative contract/map studies.
- Source and identify official quest-specific banner artwork. Existing CDPR village scene is atmospheric only.
- Match the approved compositions more closely: scroll-edge placement, regional-landscape asset selection, richer worn framing, keyed stage art, sealed spoiler artwork and fully illustrated utility tabs.
- Current generated haunted scroll is concept decoration, not a canonical creature depiction. It is not an official game asset.
- iPhone Safari/VoiceOver, larger text, low-memory performance, offline behavior and real touch testing.
- Full map-pin -> assigned hub regression and map history checks beyond the inventory smoke check.

This is an integration checkpoint, not a completed visual acceptance build. Do not merge into main until reviewed.

## Delivery blocker
Local commit 1cb8e2c. Git push failed because no HTTPS write credential is available. GitHub connector branch creation returned 403 Resource not accessible by integration. No remote branch or PR was created. Main remains R9.

## Browser upload
The authenticated owner browser can create the review branch and upload files. Assets use root-level r10- filenames to support a single atomic browser upload. The main branch remains the original R9 baseline.
