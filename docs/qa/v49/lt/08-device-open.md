# 08 · Physical iPhone Safari and VoiceOver: **OPEN / UNTESTED**

*Author-supplied (LT). LT has no physical device. Everything in sections 01–07 is **Chrome emulation** (headless Chrome, iPhone 18.5 UA string, touch enabled, DPR 3, viewports 375×667, 390×844, 430×932, 852×393 and 932×430). WebKit was not run.*

| Item | Status | What remains for the owner or PFC on device |
|---|---|---|
| Number strip scale, wolf pointer alignment, 68×64 targets and momentum or settle behaviour in Safari (portrait and landscape) | **OPEN** | Safari's `scrollend` support and momentum differ from Chrome. Confirm a flick settles on the centred number and selects it, and that the selected number is identifiable (see LT49-NUM-01) |
| Vertical page scroll starting on the strip (`touch-action: pan-x pan-y`) | **OPEN** | Passed in emulation only |
| Forged buttons (`clip-path` with stacked `drop-shadow`) in Safari | **OPEN** | Bevel, contact shadow, no rectangular backing. Also confirm LT49-BTN-01 (Return to hub, Previous / Next chips) looks the same on device |
| Nilf hub and walkthrough reading scale, top to bottom | **OPEN** | Owner design review (LT49-NILF-01 scale, LT49-NILF-02 rail clearance) |
| Region Tools on device | **OPEN** | LT49-RT-01 reproduces from the code, so it is expected on Safari too. Confirm on device after a fix |
| Objective rail visibility on mark, the review dialog, and Undo | **OPEN** | Emulation results in 07 |
| VoiceOver | **UNTESTED** | Rotor reading order on the strip (40 named buttons), announcement of the selected number, the polite live counter, dialog focus trap, and the Region Tools tile names |

## Supplementary: Chrome accessibility tree (not a VoiceOver substitute)
`evidence/08-chrome-ax-tree.json` (script `/workspace/qa48/n20.cjs`, 390 px emulation):
- The strip is exposed as `navigation` "Jump to a numbered card" with **40** buttons named "N. Quest name". The 160 duplicate copies are hidden (`aria-hidden`, `tabindex=-1`), so they are not exposed. ✅
- The counter ("1 / 40") is `aria-live="polite"`. ✅
- The selected number carries `aria-current="true"` in the DOM. Puppeteer's AX snapshot does not surface `current`, so its announcement under VoiceOver is unverified.
- `#velen/hub/nilf` exposes 21 interesting buttons, links, headings and checkboxes. **No unnamed controls** were found on the hub or on `#velen/quest/nilf/1`. ✅
