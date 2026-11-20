# 03 · Button depth (raised text-only forged buttons): **FAIL (Medium): purpose buttons lose their plate**

*Author-supplied evidence (LT). Live v49 = ba59252. iPhone emulation at 390×844 in headless Chrome. **Not physical Safari.** Script: `/workspace/qa48/n11.cjs`, `n12.cjs` and `n13.cjs`. Raw data: `evidence/03-buttons.json`.*

## What passes

| Check | Evidence | Result |
|---|---|---|
| One variant per page: B1 hub, B2 walkthrough | `--nilf-button-cut` is the 6-point `polygon(9px 0, calc(100% - 9px) 0, 100% 50% …)` on the hub and the 12-point stepped cut `polygon(6px 0 … 6px 17%)` on the walkthrough. Every forged button on a page uses that page's cut | PASS |
| No rectangular backing | All forged controls compute `background: transparent`, `box-shadow: none` and `border: 0`. The silhouette comes from the clipped `::before` | PASS |
| Bevel and contact shadow | `::before` steel gradient stack plus `filter: drop-shadow(0 1px 0 #fff3) drop-shadow(0 4px 2px …) drop-shadow(0 7px 5px …)` | PASS (visual, emulation) |
| Peer alignment: hub Reference Tools | Quest cards / Regions: both 157×44 at y=504, x 34 / 199 | PASS |
| Progress actions | Record whole quest complete / Undo last progress change: 322×44 (hub) and 272×44 (walkthrough), stacked, same x | PASS |
| Review dialog | Cancel 68×44 and Confirm update 130×44 on the same row (y=619), both clipped forged plates. Confirm stays **disabled** until a choice is picked | PASS (`03-wt-review-dialog-390.jpg`) |
| Disabled state | `opacity: .65` on Previous and Undo when nothing is undoable | PASS |
| Focus | Keyboard focus on Quest cards shows a 3 px solid `rgb(169,195,180)` outline, offset 3 px (`03-wt-tools-focus-390.jpg`). The value differs from the `#76d4c6 2px` in `nilf-forged.css` because a later rule wins, but focus is clearly visible | PASS |
| Illustrated actions keep their own art | Start walkthrough (`home-action-tile`), quest-hub cards and Region Tools tiles are excluded from the forged plate | PASS |

## Finding

**LT49-BTN-01 (Medium, v49 only). Forged plates collapse to a 27×24 px chip on every `phoenix-action[data-button-purpose]` control in the Nilf pilot.**

- **Affected controls:** walkthrough **Return to hub** (`data-button-purpose="return"`) and the hub objective-rail **Previous / Next** (`previous` / `next`). The hidden duplicates on the walkthrough carry the same rule.
- **Cause (CSS collision):** `visual-system.css:24` `.phoenix-action[data-button-purpose]:not([data-button-purpose=plain]):before{… width:27px;height:24px …}` (the purpose-icon slot) also applies to the `::before` that `nilf-forged.css` uses for the steel plate. The plate keeps `position:absolute; inset:0` but its size is pinned at 27×24. The result is a tiny steel chip at the top-left and **no raised button**. The purpose icon (`--action-icon`) is also lost, because the plate's background replaces it.
- **Measured:** Return to hub element 179×44, `::before` **27×24**. Its peer Quest cards: element 179×44, `::before` **179×44**. Hub Previous/Next: element 91×44, `::before` 27×24.
- **Repro:** open `#velen/quest/nilf/1` at 390 px and scroll to Reference tools; compare Return to hub with Quest cards (`evidence/03-wt-return-to-hub-v49-390.jpg`, and also visible in `02-v49-wt-390-3.jpg`). Open `#velen/hub/nilf`, expand Quest progress, and look at Previous / Next under the objective rail (`03-hub-progress-controls-390.jpg`). The labels overlap the chip.
- **Expected:** the same raised B1/B2 silhouette as peer controls, with aligned peers and the purpose icon kept or deliberately dropped.
- **Actual:** text-on-background with a small steel chip, so the peers look mismatched.
- **Impact:** visual and affordance only. Hit targets stay 179×44 and 91×44 and still work, so this is **not** a STOP finding.
- **v48:** does **not** reproduce. v48 shows a framed dark button with the return icon above "Return to hub" (`03-wt-return-to-hub-v48-390.jpg`).

## Not covered
- Hover states (no hover on touch emulation). Pressed state was checked only in CSS (`:active::before{filter:brightness(.85)}`), not visually.
- Physical Safari rendering of `clip-path` with stacked `drop-shadow`: **OPEN**.
