# 01 · Number jump strip and pointer: **PASS, with one Low finding**

*Author-supplied evidence (LT). Live v49 = ba59252 (see 00). Tested in headless Chrome (puppeteer-core) with an isolated `/tmp` profile per run and iPhone UA/touch emulation at DPR 3. This is **not** physical Safari.*

## Route and setup
`https://phoenix-wo-qa-1c91b66.krwpfbtbn8.chatgpt.site/#velen`, quest deck (`[data-velen-deck=quests]`), with 40 quests. Scripts: `/workspace/qa48/n2.cjs`, `n3.cjs`, `n4.cjs` and `n6.cjs` on the LT box. Raw results: `evidence/01-strip-results.json` and `evidence/01-strip-touch.json`.

## Measurements (initial state, quest 1 selected)

| Viewport | Target size (CSS px) | Fully visible numbers | Pointer centre vs rail centre | Centred number offset |
|---|---|---|---|---|
| 375×667 (iPhone emu) | 68×64 ✅ | 3 (40, 1, 2) + 2 partial | 187.5 / 187.5 (0 px) | 0.3 px |
| 390×844 (iPhone emu) | 68×64 ✅ | 3 (40, 1, 2) + 2 partial | 195 / 195 | 0.5 px |
| 430×932 (iPhone emu) | 68×64 ✅ | 5 (39…3) | 215 / 215 | 0.5 px |
| 852×393 landscape emu | 68×64 ✅ | 9 (37…5) | 426 / 426 | 0 px |
| 932×430 landscape emu | 68×64 ✅ | 11 (36…6) | 466 / 466 | 0 px |
| 1280×900 desktop | 68×64 ✅ | 13 (35…7) | 632.5 / 632.5 | 0 px |

The pointer (`::before`) uses `visual-art/wolf-pointer.webp` at 48×46 px, horizontally centred on the frame, and the centred number sits under it at every width. Screenshots: `evidence/01-strip-{375,390,430,852-landscape,932-landscape,desktop-1280}.jpg` and `01-strip-late-390.jpg`.

## Functional checks (390 px emulation)

| Check | Steps | Expected | Actual | Result |
|---|---|---|---|---|
| Wrap backward | From 1, tap **40** | 40 = Blood Ties selected, art and briefing updated | aria-current "40. Blood Ties", counter 40/40, card art `art-velen/blood-ties.webp`, panel "Blood Ties", actions `#velen/quest/blood-ties/1`, `#velen/lead/blood-ties`, `#velen/map/blood-ties`, focus on button 40 | PASS |
| Wrap forward | From 40, tap **1** | Nilfgaardian Connection | aria-current 1, art `nilf.webp`, hub `#velen/hub/nilf` | PASS |
| Scroll settle (backward over wrap) | `scrollBy(-3×68.5)` from 1 | Centred number selected | 38 "Witcher Wannabe", counter 38/40, centred offset 0.5 px | PASS |
| Scroll settle (forward) | `scrollBy(+5×68.5)` from 38 | 3 | 3 "Bloody Baron", art `baron.webp`, `#velen/lead/baron` | PASS |
| Touch drag | Raw touch events: −150 px, then +350 px twice (across wrap), then −700 px | Settles on the centred number | 3 Bloody Baron → 36 Fools' Gold → 29 Bitter Harvest → 2 Funeral Pyres. The selected card and actions always match the centred number. Distance varies with momentum. | PASS |
| Late number → destinations | Settle on 39 "Love's Cruel Snares", open each action | Correct quest | `#velen/quest/loves-cruel-snares/1` → walkthrough "Love's Cruel Snares"; `#velen/lead/loves-cruel-snares` → lead card; `#velen/map/loves-cruel-snares` → "Quest stops" map. Back returns with 39 still selected. | PASS |
| Vertical scrolling below or over the strip | Vertical touch drag of 300 px over the strip | Page scrolls | `.phoenix-reader` scrollTop 693 → 1083, with no selection change | PASS |
| Progress neutrality | Compare localStorage before and after all selection changes | Unchanged | Identical (`progressNeutral: true`) | PASS |
| Keyboard | Tab order | Only one copy focusable | 40 focusable buttons (middle copy), 160 copies `aria-hidden` with `tabindex=-1`, each labelled "N. Quest name". Focus moves to the selected number after a tap. | PASS |

Note: CDP `Input.synthesizeScrollGesture` did not move the rail in headless Chrome, so raw `Input.dispatchTouchEvent` drags were used instead. This is a harness limitation, not a product defect.

## Findings

- **LT49-NUM-01 (Low, v49 only, new surface).** The selected number has **no visual state of its own**. Computed styles for the `aria-current` button and a neighbour are identical (background `rgb(32,37,37)`, same colour, shadow and weight). The `.deck-jump-rail > button[aria-current]` highlight in `shared-walkthrough.css` is overridden on Velen. The only cue is the wolf pointer above the centre slot, which is enough when the strip is settled but gives nothing to forced-colours or colour-independent users. Repro: open `#velen`, inspect "1" and "2". Expected: the selected number reads as selected (approved spec: "pointer art and alignment"; a highlight is not explicitly required, so this is **Low**). v48: no number strip existed on Velen. v48 used a wolf above the card deck (`evidence/01-v48-velen-deck-390.jpg`), so this does not reproduce on v48.
- **Observation (Low, also on v48).** Back from a walkthrough, hub or map opened from the deck returns to the top of the Velen page (`.phoenix-reader` scrollTop 0), not to the strip. The selection **is** preserved. This reproduces identically on v48 (`#velen` → Funeral Pyres → walkthrough → Back: scrollTop 338 → 0 on v48, 474 → 0 on v49). It is pre-existing, not a regression.
- Favicon `404` (`/favicon.ico`) on every load. Cosmetic, pre-existing.

## v48 comparison
The number strip is new in v49. v48 `#velen` has no `.deck-jump` (the wolf pointer sits above the card deck), so the strip itself has no v48 baseline.

**Physical Safari scale and alignment: OPEN (see 08).**
