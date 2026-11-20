# NILF-01 · Nilf hub title and briefing scale: **PASS (fixed)**

*Author-supplied evidence (LT, implementer). Not independent. Headless Chrome (puppeteer-core), isolated `/tmp` profile per run, iPhone UA + touch emulation at 375×667, 390×844, 430×932, 852×393, 932×430 (DPR 2), desktop 1280×900. **Not physical Safari.** Builds served locally: v48 = `93a2cf9e2bf080cf6c4a02c21b959d1d6734e08c` (baseline scale), before = PR #24 tip `cd6783ff628801a1f84b81064a3b74de4760c2a6` (dist = live v49 `ba59252`), after = this branch. Script: `evidence/scripts/nilf.cjs`; raw data `evidence/nilf-v48-before-after.json`.*

**Finding:** the Nilf hub H1 was reduced 32 → 26.4 px and the briefing 17.6 → 16 px at 390 px by `nilf-forged.css`, against "keep the accepted scale".

**Fix:** removed the Nilf-only `.quest-hub-briefing h1` font-size override and dropped `.quest-hub-description` from the 1rem rule, so the accepted v48 rules in `quest-pages.css` apply again at every width. The group notes (`.quest-hub-group p / .quiet`, `.small-note`) keep the 1rem readability raise from commit 4382851. Cache tag `nilf-forged.css?v=v49-lt-fixes-2`. Test: `v49-lt-fixes.test.cjs` › NILF-01/NILF-02/BTN-01.

Computed `font-size` in px, `#velen/hub/nilf`:

| View | v48 H1 / briefing | before H1 / briefing | after H1 / briefing | NILF-01 |
|---|---|---|---|---|
| 375 | 32 / 17.6 | 26.4 / 16 | 32 / 17.6 | ✅ PASS |
| 390 | 32 / 17.6 | 26.4 / 16 | 32 / 17.6 | ✅ PASS |
| 430 | 32 / 17.6 | 26.4 / 16 | 32 / 17.6 | ✅ PASS |
| 852 | 42.6 / 19.2 | 38.4 / 16 | 42.6 / 19.2 | ✅ PASS |
| 932 | 46.6 / 19.2 | 38.4 / 16 | 46.6 / 19.2 | ✅ PASS |
| desktop | 56 / 19.2 | 38.4 / 16 | 56 / 19.2 | ✅ PASS |

**Phone-width read, top to bottom (Cmdr QA start action 3):** `evidence/nilf-{v48,before,after}-hub-read-390-01…04.jpg` (sequential viewport captures of `#velen/hub/nilf` at 390×844, sections closed as a reader first sees them). Per-view top captures: `evidence/nilf-{v48,before,after}-hub-top-{375,390,430,852,932,desktop}.jpg`. No clipping or horizontal overflow seen in the after captures.

Result: **PASS** at all six views (after equals v48 exactly). Owner visual acceptance and physical Safari: **OPEN**.
