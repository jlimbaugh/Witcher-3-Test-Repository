# Binary assets (art and fonts) in the v45 snapshot

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
