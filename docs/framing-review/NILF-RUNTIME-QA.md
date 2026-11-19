# Nilfgaardian Connection framing pilot

Baseline: `4fede4818f7f88df3efcbcd8272c7cec8625162c` on `velen/white-orchard-walkthroughs`. This review applies the approved framing to the actual guide pages. The fixed hub and walkthrough variants use the B1 and B2 references respectively. The perimeter, centered brace, and staggered vine ornaments were drawn for the runtime panels from the approved references. Existing illustrated actions, quest artwork, parchment copy, objective selector, and game-progress owners are reused.

## Review the pilot

Serve `dist/` with a static server and use `/#velen/hub/nilf`. Open the illustrated walkthrough action, then use Return to hub. Direct walkthrough entry is `/#velen/quest/nilf/1`. Use an isolated site origin or browser profile for progress checks.

- Compare the briefing, parchment panels, side rail stagger, and steel depth at 390 × 844 and 844 × 390. Check horizontal clearance and text wrapping.
- Confirm each standard text button follows its page's silhouette and that peer navigation buttons are the same size. Check keyboard focus, pressed state, and the progress confirmation dialog.
- Browse the objective selector and open a related task. Check return navigation, reload, and an objective mark followed immediately by Undo.
- On physical iPhone Safari, repeat the two orientations and verify touch targets around the rails and fixed wolf control.

## Initial pilot verification (historical)

The complete Node suite passed 340/340 with the v45, QA5, and QA6 baseline worktrees configured. That includes the save-protection and cache-tag gates. The application diff is limited to one stylesheet reference, the scoped stylesheet, and two decorative SVGs. Local Chromium failed to launch because process-singleton socket creation was denied. Browser rendering, returning-browser checks, physical Safari acceptance, and independent QA are pending. The live guide was not updated for this review.

## Current v49 verification

Use the [v49 release record](../RELEASE-VELEN-V49.md) and [LT QA checklist](../LT-QA-VELEN-V49.md) for the active candidate, author browser evidence, and independent review. The screenshot corrections below were included in v49.

## Owner screenshot correction pass

| Check | Expected result |
|---|---|
| Hub layout and legibility | The earlier parchment, sizing and spacing carry the new steel frame. The next-lead text is dark on parchment. |
| Sources | Objective controls contain no citation link. Nilf hub and walkthrough each end with one quiet Sources link to the shared index. White Orchard objective citations live in that index. |
| Button consistency | Text navigation, progress actions, and Previous/Next share the page silhouette, including disabled controls. |
| Button depth | The steel outline is the final perimeter. No rectangular plate appears beneath it. The bevel and contact shadow are visible. |
| Progress and navigation | Hub to walkthrough, return, objective marking, Undo and reload behave as before. |

## Number strip and Region Tools

- Velen number targets are 68 × 64 CSS px minimum. The strip uses the approved selector wolf artwork and updates the featured quest, briefing, and destination when the horizontal strip settles or a number is tapped.
- The Region Tools grid reuses the wolf menu destinations and its Search and Warnings actions. Velen maps and merchants sit in the same illustrated card format. The floating medallion artwork stays in its existing component.
- The Nilf nearby and next-lead panels use compact dimensions and a 4–5 px framing allowance. Verify on physical Safari in both orientations.
