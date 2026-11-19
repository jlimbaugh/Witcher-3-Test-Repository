# 02 · Nilf hub and walkthrough scale and readability: **FAIL (Medium): scale reduced against the owner's "keep prior scale" rule; readability itself passes**

*Author-supplied evidence (LT). Live v49 = ba59252, compared with v48 `93a2cf9` served locally from the box. iPhone emulation in headless Chrome at DPR 3 with isolated profiles. **Not physical Safari.***

Routes: `#velen/hub/nilf` (hub) and `#velen/quest/nilf/1` (walkthrough). Scripts: `/workspace/qa48/n7.cjs`, `n8.cjs`, `n9.cjs` and `n10.cjs`. Raw data: `evidence/02-nilf-metrics.json`, `02-contrast.json` and `02-rail-clearance.json`. Screens: `evidence/02-v49-{hub,wt}-390-N.jpg` and `02-v48-{hub,wt}-390-N.jpg`, with side-by-side contact sheets `02-sheet-v4{8,9}-{hub,wt}.jpg`.

## Measurements (390×844 unless noted)

| Metric | v48 | v49 | Note |
|---|---|---|---|
| Hub page height (`.phoenix-reader` scrollHeight) | 3009 | 3017 | +0.3%. Layout and spacing are essentially preserved |
| Hub side margins (375 / 390 / 430 / 852 / 1280) | 12 / 12 / 12 / 40 / 123–138 | identical | ✅ |
| Hub H1 "The Nilfgaardian Connection" | **32 px** | **26.4 px** | **−17.5%** (`clamp(1.65rem,5vw,2.4rem)` in `nilf-forged.css`) |
| Hub briefing `.quest-hub-description` | **17.6 px** | **16 px** | **−9%** (`font-size:1rem`) |
| Hub `.quiet` notes | 13 px `rgb(81,72,59)` | 13 px `rgb(75,57,45)` | Darker. Approx. contrast 4.9 → 5.1 |
| Body text median / min (hub) | 13 / 12 px | 13 / 12 px | unchanged |
| Walkthrough reading list | 20 px | 20 px | unchanged. Approx. contrast 11.4 / 11.3 |
| Walkthrough page height | 2640 | 3480 | +840 px, from the new Region Tools grid (see 04), not from text scale |
| Next-lead cards (Bloody Baron, Hunting a Witch) | fluid: 146×165 (390), 328×200 (852), 452×200 (desktop) | **fixed 163×142 at every width** | Compact, as the checklist asks ✅ |
| Horizontal overflow or clipped text | only the intended objective rail | same | ✅ no clipping found at 375 / 390 / 430 / 852 / desktop |
| Obsolete "Your Velen progress saves in this browser." | shown on hub and walkthrough | **removed** | ✅ matches the source and save-copy cleanup |

Approximate contrast (pixel-sampled, dark text on parchment): hub briefing 9.8:1 and walkthrough reading 11.3:1, so dark-on-parchment readability **passes**. The heuristic is unreliable for thin light-on-dark text such as the quiet "Sources" link. That link was legible in the screenshots, but its contrast still needs a proper check.

## Findings

- **LT49-NILF-01 (Medium, v49 only). The hub title and briefing were scaled down.** Session calibration (`docs/SESSION-CALIBRATION.md`) and the checklist say: "Keep the accepted parchment, legibility, scale and layout. Add only the clearance needed for forged trim." The briefing shrank 17.6 → 16 px and the H1 32 → 26.4 px at 390 px. That is a type change, not a frame allowance. Repro: open `#velen/hub/nilf` at 390 px on v48 and v49 and compare computed `font-size` for `.quest-hub-description` and `.quest-hub-briefing h1` (screens `02-v48-hub-390-1.jpg` and `02-v49-hub-390-1.jpg`). Expected: v48 scale ±frame allowance. Actual: −9% and −17.5%. v48: not applicable (this is the baseline). **Owner judgment needed.** It may have been intended by commit 4382851 "Fix Nilf hub readability", but no approval for smaller type is recorded.
- **LT49-NILF-02 (Low, v49 only). The vine rails touch content on the hub.** The ornament boxes (11×75 px `rail.svg`, positioned inside the parchment's 22 px border-image) overlap the left edge of **Start walkthrough** and **Reference tools** and the right edge of **Preparation & quest details** by about 4 px at 375 / 390 / 430. At 852 they are flush (0 px). The checklist asks for "staggered ornaments clear of the content." Crops: `02-v49-hub-rail-left-crop.jpg` and `02-v49-hub-rail-right-crop.jpg`. The walkthrough rails do not hit content (they land beside the objective rail). v48 had no rails.
- Next-lead cards: compact and legible. Both link to `#velen/lead/baron` and `#velen/lead/witch` on v48 and v49.

**Physical Safari review and the owner's top-to-bottom design review: OPEN.**
