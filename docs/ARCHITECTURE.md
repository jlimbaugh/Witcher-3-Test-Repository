# Phoenix architecture (canonical/phoenix)

> **Status:** descriptive record of the code at `canonical/phoenix` `2dbc0bc` (application identical to PR #35 `19c4d3d`). It is not design approval. Target design: [doctrine](CANONICAL-TEMPLATE-DOCTRINE.md). Reusable contracts: [REGION-CONTRACT.md](REGION-CONTRACT.md). Decisions: [DECISIONS.md](DECISIONS.md).

## Shell
- `dist/index.html` is the single application page. It loads **55 scripts and 34 stylesheets in a fixed order**. Cascade order is load-bearing: 257 class names are styled in more than one stylesheet, and several files use `!important`. Do not reorder links without screenshot comparison.
- Every changed script or stylesheet gets a new `?v=` cache tag in the same commit (`slice2-cache-tags.test.cjs`, `order017-regression.test.cjs`). Untagged vendor files: `leaflet.css` and `leaflet.js`.
- Other pages: `character.html` (parked Character feature), `velen.html` (legacy redirect), `velen-sources.html` (sources), `wolf-dock-qa.html` (QA aid).

## Routes
| Area | Hashes | Owner |
|---|---|---|
| White Orchard | `#whiteorchard`, `#whiteorchard-console`, `#whiteorchard-tree`, `#whiteorchard-map`, `#whiteorchard-pois`, `#whiteorchard-preparation-tools` | `app.js` |
| Velen | `#velen`, `#velen/quest/<id>/<stage>`, `#velen/hub/<id>`, `#velen/lead/<id>`, `#velen/map[/<id>[/<stage>]]`, `#velen/merchants`, `#velen/deferred` | `velen-routing.js` (grammar), `velen-r18.js` (render) |
| Search | `#guide-search/…` | `search-ui.js` |
| Redirects | `#progress`, `#star-chart`, `#whiteorchard-constellation` → `#whiteorchard-map`; legacy Velen Constellation links → `#velen/map` | `app.js:417-418` |

## Surface owners
| Surface | White Orchard | Velen |
|---|---|---|
| Region console | `main-console.js`, `console-r16.js`, `home-*.js` | `velen-r18.js` `consoleView()` |
| Quest hub | `app.js` tree, `desk-r11.js`, `quest-hubs.js` | `velen-r18.js` hubs, `velen-quest-cards.js` |
| Walkthrough | `weathered-r10.js`, `quest-pages.js`, `reading-pilot.js` | `shared-walkthrough.js`, `velen-nilf-ui.js`, `velen-nilf-objectives.js` |
| Activities / discoveries | `exploration-*.js`, `diagrams-*.js` | `velen-r18.js` activity decks |
| Regional Tools | `search-ui.js`, `deck-jump.js` | `velen-r18.js` tools rail |
| Wolf navigation | `navigation-art.js` (six destinations), `guide-viewport.js`, `medallion.js` | shared |
| Maps | `map-ui.js` + `map-data.js` (Leaflet, 64 markers with ids; provisional Progress layer) | `velen-nilf-map.js` (Leaflet, name-keyed stops), `velen-r18.js` `regionalMap()` and route pins |
| Progress | `progression-engine.js`, `progression-data.js`, `progression-ui.js` | `velen-nilf-progress.js`, `velen-migration.js`, `velen-r18.js` `regionalProgress()` |
| Registry | – | `regional-registry.js` (data only; no UI reads it yet) |

Known duplication, to be resolved through pattern certification and not ad hoc: two console renderers, two walkthrough stacks, and two Leaflet map renderers plus one pin renderer.

## Storage (protected; never rename or change schema without migration and Undo coverage)
| Key | Writers |
|---|---|
| `phoenix.whiteorchard.interaction.v1` (schema 1), `.pilot.v1`, `.warningHistory.v1`, `.pendingWarnings.v1` | `app.js` |
| `phoenix.region.velen.v1` | `app.js`, `velen-migration.js`, `velen-nilf-progress.js` |
| `phoenix.velen.arrival.v1` | `app.js`, `velen-data-r18.js`, `velen-migration.js`, `velen-nilf-progress.js`, `velen-r18.js` |
| `phoenix.velen.<id>.objectives.v1` | `velen-quest-cards.js` |
| `phoenix.velen.reading.v1` | `velen-r18.js` |
| `phoenix.velen.map.progress` | `velen-nilf-map.js` |
| `phoenix.guide.resume.v1` | `main-console.js`, `velen-r18.js` |
| `phoenix.search.history.v1` | `search-ui.js` |
| `phoenix.reading-foldouts.v1` | `reading-pilot.js` |
| `phoenix.character.build-vault.v1` | `character-ui.js`, `character-vault.js` (parked feature) |
| `phoenix-appearance-v1` | `appearance.js` |

**Invariants:**
- Unreadable or unsupported saves are never overwritten.
- Denied `localStorage` must not blank the start page.
- UI-only state (for example the map `progressFilter`) lives in `history.state`, never in saves.
- Last-progress-change Undo is preserved.

## Lineage and recovery
`canonical/phoenix` descends from V50 (`v50-public`). Checkpoints: `v50-release-record`, `v49-app`, `qa6`, `order017-candidate`, `archive/<branch>`.

**Public surfaces (two, separate):** (1) **Velen v50 on ChatGPT Sites.** Its publication and deployment provenance is author-supplied in the [V50 release record](RELEASE-VELEN-V50-CANDIDATE.md) (Sites source `bcc83936…`, deployment `appgdep_6affe300…`). The `v50-public` tag identifies the GitHub application source; it does not prove what Sites serves. (2) **GitHub Pages** still serves the older `main` branch (`2ed8b86`), not V50. `canonical/phoenix` does **not** auto-publish to either surface: a Sites release needs a separately authorized Sites push and deployment, and Pages is frozen.
