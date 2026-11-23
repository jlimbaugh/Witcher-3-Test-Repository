# Production Source Inventory — Operation Phoenix

Date: 2026-11-23
Status: Stage 3 findings recorded — classification of some items still open
Branch: docs/phoenix-art-master-catalog

## Entrypoints

| File | Role | Notes |
|------|------|-------|
| `dist/index.html` | **Primary multi-region guide shell** | Loads White Orchard, Velen modules, maps, progression, search, shared walkthrough, character-entry, and the majority of CSS/JS. Title: “Witcher Field Guide · White Orchard”. |
| `dist/velen.html` | Compatibility redirect | Loads `velen-routing.js` + `velen-entry.js`; redirects into the shared shell. Not an independent regional application. |
| `dist/character.html` | Separate Character & Build Vault | Own CSS (`character.css`) and scripts (`character-vault.js`, `character-gear.js`, `character-ui.js`). |
| `dist/previews/inventory.html` | Standalone inventory preview | Classification pending (production / prototype / archive). |
| Others | Supporting | `velen-sources.html`, `wolf-dock-qa.html`, `art-white-orchard/credits.html`. |

## Counts (verified)

- Total files under `dist/`: 588
- HTML pages: 7
- JavaScript files: 57
- CSS files: 35
- Repository test files: 37

## Important Distinctions

- Region cards in the console do **not** prove completed regional content.
- Source inventory does not prove browser behavior, test results, or live deployment.
- See `DEPLOYMENT.md` for publication provenance (currently incomplete).

## Open Items

- Classify `dist/previews/inventory.html`.
- Full ordered dependency list from `dist/index.html` (scripts + styles) can be extracted later if needed.
- Region completeness markers remain for a later stage.
