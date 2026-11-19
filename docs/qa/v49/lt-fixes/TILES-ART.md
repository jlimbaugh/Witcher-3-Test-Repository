# RT-02 / RT-03 · Region Tools tile frames and Search / Route maps art: **PASS (fixed); art acceptance OPEN**

*Author-supplied evidence (LT, implementer). Not independent. Headless Chrome (puppeteer-core), isolated `/tmp` profiles, iPhone UA + touch emulation at 375 / 390 / 430 / 852 / 932 and desktop 1280×900. **Not physical Safari.** before = PR #24 tip `cd6783f` (= live v49 dist), after = this branch. Scripts: `evidence/scripts/tiles.cjs` (frames, art, function), `tilediff.cjs` / `tilerules.cjs` (computed-style diff and matched CSS rules). Raw data: `evidence/tiles.json`.*

**Findings (PR #25 `04-region-tools.md`):**
- **LT49-RT-02:** Warnings and Search are `<button>` tiles, so `visual-system.css` (`html body .phoenix-action.phoenix-action`, `!important`) gave them the 8 px iron `border-image` frame and `#202525` background instead of the 3 px `#98a497` frame and `#18282c` background of the Merchant link tile.
- **LT49-RT-03:** Search reused the Field Reference painting; Route maps used the plain line drawing `velen-route-map-art.svg`.

**Fix:**
- `nilf-forged.css`: `html body #velen-screen .velen-region-tools > button.art-tile.art-tile { border: 3px solid #98a497; border-image: none; border-radius: 4px; background: #18282c; box-shadow: 0 5px 8px #0009; color: #f4ead6; … }` (with `!important` where visual-system uses it). The matched-rules dump shows this is the same frame `velen-view.css .art-tile` gives the Merchant tile.
- New art: `visual-art/region-tools/search.svg` (steel lens over an open field journal, magnifying an inked wolf track) and `visual-art/region-tools/route-maps.svg` (unrolled map with an inked red route, stops, river, forest and compass). **Original code-drawn guide art by LT, not official CD PROJEKT RED art; the map is generic terrain, not in-game Velen geography.** Both files carry that label in their `aria-label` and a comment, and `ART-SOURCES.md` has a new "Region Tools tile art" section. Palette (dark vignette, parchment, steel, teal glint, red ink) follows the existing navigation and console art.
- Cache tags `velen-r18.js?v=v49-lt-fixes-3`, `nilf-forged.css?v=v49-lt-fixes-3`; seam pin updated with history; unit test `v49-lt-fixes.test.cjs` › RT-02/RT-03.

| View | before: distinct frames on the 9 tiles | after | before: tiles sharing art | after | Search opens dialog / Route maps → | Result |
|---|---|---|---|---|---|---|
| 375 | 2 (3 px `#98a497` link / 8 px iron button) | 1 | 1 (Search = Field Reference) | 0 | ✅ / `#velen/map` | PASS |
| 390 | 2 | 1 | 1 | 0 | ✅ / `#velen/map` | PASS |
| 430 | 2 | 1 | 1 | 0 | ✅ / `#velen/map` | PASS |
| 852 | 2 | 1 | 1 | 0 | ✅ / `#velen/map` | PASS |
| 932 | 2 | 1 | 1 | 0 | ✅ / `#velen/map` | PASS |
| desktop | 2 | 1 | 1 | 0 | ✅ / `#velen/map` | PASS |

After, every tile computes `3px solid rgb(152,164,151)`, no border-image, background `rgb(24,40,44)`, radius 4 px. Computed-style diff Merchant vs Search after the fix: only `min-width`/`max-width` (button UA defaults, no visual effect in the grid).

Screens (grid element captures): `evidence/tiles-{before,after}-{console,walkthrough}-{375,390,430,852,932,desktop}.jpg`.

**Open:** owner / AD visual acceptance of the two new SVGs (they are flatter than the painted navigation art; illustrated replacements can follow under issue #12's sourcing rules). Physical Safari: OPEN.
