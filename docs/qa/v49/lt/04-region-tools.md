# 04 · Region Tools: **FAIL (High). STOP finding: 5 of 9 tiles go to the wrong place (blocked navigation)**

*Author-supplied evidence (LT). Live v49 = ba59252. iPhone emulation at 390×844, tapped with touch emulation, in headless Chrome. **Not physical Safari.** Scripts: `/workspace/qa48/n14.cjs` and `n15.cjs`. Raw data: `evidence/04-region-tools.json` and `04-wolf-and-v48.json`.*

## STOP: LT49-RT-01 (High, v49 only). Home, Regions, Field Reference, Progress and Constellation tiles all link to `#velen`

- **Routes:** the console `#velen` (Region Tools grid near the bottom) and the walkthrough `#velen/quest/nilf/3`. Both use the same `regionTools()` grid.
- **Steps:** scroll to Region Tools and tap **Home**, then repeat for Regions, Field Reference, Progress and Constellation.
- **Expected:** `#home`, `#regions`, `#field-reference`, `#progress` and `#whiteorchard-constellation`, the same destinations as the wolf menu (`navigation-art.js` `entries`).
- **Actual:** every one of the five tiles has `href="#velen"` and opens the **Velen console**. From the console nothing visibly happens except the scroll resetting to the top. From the walkthrough the reader leaves the quest and lands on the Velen console.
- **Cause (source read, not modified):** `velen-r18.js` `regionTools()` builds these tiles with `artTile(item.label,item.href,…)`. `artTile` calls `link()`, which passes every `#…` href through `routeModel.sharedHash()`. `sharedHash` (`velen-routing.js:4`) rewrites any hash that is not a valid Velen sub-route to `'#velen'`. The global destinations are not Velen sub-routes, so they collapse to `#velen`.
- **Workaround:** the floating wolf menu reaches all five destinations correctly: Home → `#home` "The Path", Regions → `#regions`, Field Reference → `#field-reference`, Progress → `#progress` "Recorded journey", Constellation → `#whiteorchard-constellation`. That is why this is a navigation block on this control, not a dead end for the reader.
- **v48:** does not reproduce. v48 has **no** Region Tools grid: the console shows only Open walkthrough / Open quest hub, and the walkthrough only Return to hub / Quest cards.
- **Author evidence gap:** the release record lists author Chromium checks of Search and Warnings only. The five link tiles were not covered.

## Per-destination results

| Tile | Console `#velen` | Walkthrough `#velen/quest/nilf/3` | Return / dismissal | Result |
|---|---|---|---|---|
| Home | → `#velen` ✗ | → `#velen` ✗ | Back → same quest, same scroll (2309) | **FAIL** |
| Regions | → `#velen` ✗ | → `#velen` ✗ | Back OK | **FAIL** |
| Field Reference | → `#velen` ✗ | → `#velen` ✗ | Back OK | **FAIL** |
| Progress | → `#velen` ✗ | → `#velen` ✗ | Back OK | **FAIL** |
| Constellation | → `#velen` ✗ | → `#velen` ✗ | Back OK | **FAIL** |
| Warnings | Opens the medallion warning fan (`phoenix-medallion fan-open`), hash unchanged | same | Has a visible "← Return". Tapping the medallion or pressing Escape closes it, and scroll is preserved (2617 / 2309) | PASS |
| Search | Opens `guide-search-dialog` ("Search the guide", with Close ×), hash unchanged | same | Escape closes it, scroll preserved | PASS |
| Route maps | → `#velen/map` "Velen route maps · Browse quest routes" | same | Back → same quest and scroll | PASS |
| Merchants | → `#velen/merchants` "Innkeeper & notices · Services at this stop" | same | Back OK | PASS |

## Option parity with the wolf menu
Wolf menu: Search the guide, Home, Regions, Field Reference, Progress, Constellation and Warnings. Region Tools offers the same seven plus Route maps and Merchants, as the checklist requires. **Labels match. Five targets do not** (above).

## Tile art and alignment (`evidence/04-tools-walkthrough-390.jpg` and `04-tools-console-390.jpg`)
- All nine tiles are 152×132 in a 2-column grid at x = 38 / 200, so the grid is aligned ✅.
- **LT49-RT-02 (Low):** the two **button** tiles (Warnings, Search) get a different frame from the seven link tiles: 8 px border, `rgb(32,37,37)` background and a darker, heavier rim, against 3 px and `rgb(24,40,44)`. The grid looks uneven, which conflicts with the checklist's "reuse the Merchant tile treatment, with aligned sizes".
- **LT49-RT-03 (Low):** the **Search** tile reuses the Field Reference artwork (`navigation-art-v26/reference.webp`), and **Route maps** uses the plain line-drawing `velen-route-map-art.svg` rather than illustrated art. The checklist asks for illustrated art.
- Floating wolf: present, keeps its own artwork, and opens and closes normally (`04-wolf-menu-390.jpg` and `04-warnings-open-390.jpg`).

## Map relevance (spot check)
`#velen/map/nilf` and `#velen/map/loves-cruel-snares` open a per-quest "Quest stops" map (seen in 01). A full check that each quest map lists only that quest's card destinations across all 40 quests was **not done**: **UNTESTED**.
