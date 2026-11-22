# Phoenix art asset catalog

**Required guide-wide art standard.** All owner-approved Phoenix assets are required across all pages, regions, templates and overlays wherever their asset family applies. Use the approved defaults or variants for the surface and control, and follow the recorded placement, scale and rotation rules. Reuse the approved artwork for the same destination across menus. New or replacement designs require owner approval before use.

| Asset family | Reference |
| --- | --- |
| Guide-wide material, typography, and art rules | [Art standard](../ART-STANDARD.md) |
| Frames, side rails, flourishes and forged buttons | [Approved framing gallery](framing-review/README.md) |
| Section dividers and heading ornaments | [Approved parchment and dark-stone sets](framing-review/dividers/README.md) |
| Objective warning wolf | [Approved default variants and pulse rule](framing-review/warning-wolf/README.md) |
| Numbered objective rail | [Approved default variants](framing-review/objective-rail/README.md) |
| Next unfinished | [Approved default variants](framing-review/next-unfinished/README.md) |
| Inline Show on Map | [Approved default variants](framing-review/show-on-map/README.md) |
| Related optional tasks | [Approved default disclosure variants](framing-review/related-optional-tasks/README.md) |
| Information disclosure | [Approved default disclosure variants](framing-review/information-disclosure/README.md) |
| Consequences · Spoilers | [Approved default disclosure variants](framing-review/spoiler-disclosure/README.md) |
| Story & correction controls | [Approved default disclosure variants](framing-review/story-correction-controls/README.md) |
| Undo last progress change | [Approved default variants](framing-review/undo-progress/README.md) |
| Return to hub | [Approved default variants](framing-review/return-to-hub/README.md) |
| Quest cards control | [Approved default variants](framing-review/quest-cards-control/README.md) |
| Sources link | [Approved default variants](framing-review/sources-link/README.md) |
| Map Back | [Approved default variants](framing-review/map-back/README.md) |
| Map Layers | [Approved default variants](framing-review/map-layers/README.md) |
| Map Recenter | [Approved default variants](framing-review/map-recenter/README.md) |
| Status marks for risk, completion and missed outcomes | [Approved status marks](framing-review/status-marks/README.md) |
| Runtime illustrations and asset provenance | [Art sources](../dist/ART-SOURCES.md) |
| Map legend trim | [Approved legend treatments](framing-review/map-legends/README.md) |
| Selected map marker surrounds | [Approved selection surrounds](framing-review/map-marker-surrounds/README.md) |
| Map location card frames | [Approved location card frames](framing-review/map-location-cards/README.md) |
| Map route lines | [Approved route line patterns](framing-review/map-route-lines/README.md) |
| Map compass roses | [Approved compass rose designs](framing-review/map-compass-roses/README.md) |
| Terrain and map symbols | [Map sources](../dist/MAP-SOURCES.md) |

The catalog links to the approved reference for each family. Present proposed additions in sets of six per background shade for owner review. When dark, parchment, and light are in scope, present six on each background for 18 options total. Record approved designs by stable ID and retain the accepted reference sheets. Use the approved artwork on the matching surface. Treat older studies as historical references.

## Binary assets (art and fonts) in the v45 snapshot

The v45 **code kit** never contained the site's binary art and fonts. To make the branch testable and renderable, the
snapshot commit adds them alongside the kit:

- 300 files, 128,165,162 bytes total, largest 4,016,813 bytes (`dist/white-orchard-scene.png`); none near GitHub's
  100 MB file limit. Listed with sha256 in `docs/v45-assets.sha256` (`sha256sum -c docs/v45-assets.sha256` → 300 OK).
- Source: read-only HTTP GETs from the accepted v45 site
  `https://phoenix-wo-qa-1c91b66.krwpfbtbn8.chatgpt.site/<path without dist/>`, all matching the sha256 values in the
  art `manifest.json` files under `dist/` at fetch time. They are unchanged by Slice 2.
- Not part of the 220-file code-kit manifest (`docs/v45-snapshot.sha256`), which stays exactly the verified kit.

Directories / files: `dist/art-diagrams/` (84), `dist/art-white-orchard/` (55), `dist/art-white-orchard-illustrated/` (56),
`dist/art-white-orchard-variety/` (29), `dist/art-r13/` (26), `dist/gwent-r15/` (6), `dist/navigation-art-v26/` (6),
`dist/visual-art/` (2), 22 `dist/map-icon-*.png`, 4 fonts (`*.woff2`, `fondamento-r16.ttf`), and the scene images
(`white-orchard-*`, `velen-*-r18.webp`, `cdpr-witcher3-keyart.png`, `curled-vellum-r16.webp`,
`r10-haunted-scroll-concept.webp`, `wolf-medallion-silver.png`).

## Effect on testing
With the assets present the full suite has no art failures. Without them (code kit only) exactly 5 tests fail on
`existsSync(item.art)` / ENOENT: one each in `diagrams-art`, `exploration-art`, `navigation-art`, `visual-system`,
`warning-center` (`*.test.cjs`). Nothing is excluded from this branch; see `docs/TESTING.md`.
