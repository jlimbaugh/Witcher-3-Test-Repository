Phoenix v40 — themed typography and text-size control

Baseline: owner-accepted v39, 29beb3d750469f99561b448f506ed524a449bf6c. LT reported no confirmed live regressions against v39.

Scope: Appearance now folds font/theme controls into a parchment popover and adds a 100–150% text-size range in 5% increments, visible percentage, reset, and persistence in the existing appearance record. Legacy font/theme preferences survive. The HTML root provides the percentage scale. Fixed pixel font declarations in first-party styles loaded by index.html and velen.html were normalized to equivalent rem values (16px = 1rem) so they respond consistently. Third-party Leaflet CSS and baked artwork remain untouched.

Layout: illustrated card heights grow with the scale; quest category plaques flow above variable-height titles; generic buttons grow and wrap; rows stretch to equal heights. Enlarged browse controls put the hint/count above two wider buttons; walkthrough picker gets its own row at 140–150%. Purpose headings/dividers label walkthrough navigation, progress actions, reference tools. Reading headings gain restrained ink flourishes and an enlarged first initial. Two-column wolf navigation retains its artwork and uses live title-case labels. The compass, swipe engines, player progression and route handlers are unchanged.

Checks: 196/196 node tests; JS syntax and diff checks. Chromium rendered checks at 390x844, 320x844 and 844x390. Tested maximum 150%, reset to100%, intermediate125%, a font change, and150% persistence after reload across Home/quest/Velen. At320px the document width remained320px; 150% walkthrough buttons measured equal60px content height with no internal overflow. Large diagram jump and return restored railX14741. Search opened and returned results at150%. No physical Safari acceptance claimed. Readability mode and VoiceOver remain parked.

LT live QA brief is in LT-QA-V40.txt. This is a testing publication and remains subject to LT findings plus owner Safari acceptance. Rollback: v39 baseline above.
