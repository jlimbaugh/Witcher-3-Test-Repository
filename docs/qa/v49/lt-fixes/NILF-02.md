# NILF-02 · Vine rails clear of hub controls: **PASS (fixed)**

*Author-supplied evidence (LT, implementer). Not independent. Headless Chrome (puppeteer-core), isolated `/tmp` profile per run, iPhone UA + touch emulation at 375×667, 390×844, 430×932, 852×393, 932×430 (DPR 2), desktop 1280×900. **Not physical Safari.** Builds served locally: v48 = `93a2cf9e2bf080cf6c4a02c21b959d1d6734e08c` (baseline scale), before = PR #24 tip `cd6783ff628801a1f84b81064a3b74de4760c2a6` (dist = live v49 `ba59252`), after = this branch. Script: `evidence/scripts/nilf.cjs`; raw data `evidence/nilf-v48-before-after.json`.*

**Finding:** the 11×75 px `rail.svg` ornaments overlapped Start walkthrough / Reference tools (left) and Preparation & quest details (right) by about 4 px at 375–430, flush at wider views.

**Fix:** on the hub only, the rail pseudo-elements on `.quest-hub-paper` move from `inset-inline: -7px` to `-15px`, putting each rail on the parchment's 22 px deckled border, outside the content box. Walkthrough rails (which did not hit content) and the bottom brace are unchanged.

Gap between each rail and the nearest control it sits beside (negative = overlap). Rail position computed from the pseudo-element's computed inset and background position:

| View | before rails: nearest gap (px) | after rails: nearest gap (px) | NILF-02 |
|---|---|---|---|
| 375 | left -4 (Start walkthroughStep ); right -4 (Preparation & quest de) | left 4 (Start walkthroughStep ); right 4 (Preparation & quest de) | ✅ PASS |
| 390 | left -4 (Start walkthroughStep ); right -4 (Preparation & quest de) | left 4 (Start walkthroughStep ); right 4 (Preparation & quest de) | ✅ PASS |
| 430 | left -4 (Start walkthroughStep ); right -4 (Preparation & quest de) | left 4 (Start walkthroughStep ); right 4 (Preparation & quest de) | ✅ PASS |
| 852 | left 0 (Start walkthroughStep ); right 0 (Preparation & quest de) | left 8 (Start walkthroughStep ); right 8 (Preparation & quest de) | ✅ PASS |
| 932 | left 0 (Start walkthroughStep ); right 0 (Preparation & quest de) | left 8 (Start walkthroughStep ); right 8 (Preparation & quest de) | ✅ PASS |
| desktop | left 0 (Start walkthroughStep ); right 0 (Preparation & quest de) | left 8 (Start walkthroughStep ); right 8 (Preparation & quest de) | ✅ PASS |

Screens: `evidence/nilf-{before,after}-hub-tools-{375,390,430,852,932,desktop}.jpg` (Start walkthrough, Reference tools and Preparation in view).

Result: **PASS** (4 px clearance on phones, 8 px on wider views). Owner visual acceptance: **OPEN**.
