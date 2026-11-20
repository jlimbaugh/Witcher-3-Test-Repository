# BTN-01 · Return to hub and hub Previous/Next plates: **PASS (fixed)**

*Author-supplied evidence (LT, implementer). Not independent. Headless Chrome (puppeteer-core), isolated `/tmp` profile per run, iPhone UA + touch emulation at 375×667, 390×844, 430×932, 852×393, 932×430 (DPR 2), desktop 1280×900. **Not physical Safari.** Builds served locally: v48 = `93a2cf9e2bf080cf6c4a02c21b959d1d6734e08c` (baseline scale), before = PR #24 tip `cd6783ff628801a1f84b81064a3b74de4760c2a6` (dist = live v49 `ba59252`), after = this branch. Script: `evidence/scripts/nilf.cjs`; raw data `evidence/nilf-v48-before-after.json`.*

**Finding:** `visual-system.css` `.phoenix-action[data-button-purpose]:not([data-button-purpose=plain]):before{display:block;flex:none;width:27px;height:24px;…}` (the purpose-icon slot) also sized the `::before` that `nilf-forged.css` uses as the steel plate, so the plate collapsed to a 27×24 chip.

**Fix:** a scoped rule in `nilf-forged.css` (`html body #velen-screen [data-velen-nilf] .phoenix-action[data-button-purpose]:not([data-button-purpose=plain], …)::before { width:auto; height:auto; margin:0 }`) lets the plate fill its `inset:0` box again. `visual-system.css` is untouched. The purpose icon is deliberately dropped on these forged buttons, which are text-only B1/B2 plates like their peers.

`::before` plate size vs element size (px):

| View | before Return to hub plate | after | before hub Previous / Next plate | after | BTN-01 |
|---|---|---|---|---|---|
| 375 | 27×24 on 172×44 | 172×44 on 172×44 | 27×24 on 83×44 / 27×24 on 83×44 | 83×44 on 83×44 / 83×44 on 83×44 | ✅ PASS |
| 390 | 27×24 on 179×44 | 179×44 on 179×44 | 27×24 on 91×44 / 27×24 on 91×44 | 91×44 on 91×44 / 91×44 on 91×44 | ✅ PASS |
| 430 | 27×24 on 199×44 | 199×44 on 199×44 | 27×24 on 111×44 / 27×24 on 111×44 | 111×44 on 111×44 / 111×44 on 111×44 | ✅ PASS |
| 852 | 27×24 on 279×44 | 279×44 on 279×44 | 27×24 on 272×44 / 27×24 on 272×44 | 272×44 on 272×44 / 272×44 on 272×44 | ✅ PASS |
| 932 | 27×24 on 314×44 | 314×44 on 314×44 | 27×24 on 312×44 / 27×24 on 312×44 | 312×44 on 312×44 / 312×44 on 312×44 | ✅ PASS |
| desktop | 27×24 on 396×44 | 396×44 on 396×44 | 27×24 on 396×44 / 27×24 on 396×44 | 396×44 on 396×44 / 396×44 on 396×44 | ✅ PASS |

Screens: `evidence/btn01-{before,after}-walk-return-{375,390,430,852,932,desktop}.jpg` (walkthrough Reference tools row) and `evidence/btn01-{before,after}-hub-prevnext-{…}.jpg` (hub objective-rail controls).

Result: **PASS** at all six views. Hit targets unchanged (44 px tall). Physical Safari rendering of `clip-path` + stacked `drop-shadow`: **OPEN**.
