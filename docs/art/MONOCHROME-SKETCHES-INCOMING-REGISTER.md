# Monochrome sketches — incoming art register

**Status:** REVIEWED UPLOAD; **BINARY INGEST PENDING**. This is an inventory, **not** an approval or deployment certificate.

- Source: user-uploaded `monochrome-sketches-compressed.zip`, reviewed 2026-11-23.
- 59 distinct WebP portraits, each 600 × 894 pixels; total uncompressed image bytes: 5,901,468.
- Style: monochrome pencil/ink character and NPC sketches; visually coherent on a contact sheet.
- Intended production location: `dist/art-velen/monochrome-sketches/` (one `sketch-<name>.webp` per portrait).
- Existing `dist/art-velen/monochrome-sketches.zip` is a 50-byte placeholder, and existing `sketch-anna.webp` / `sketch-archer.webp` are 16-/18-byte placeholders. **Do not mistake these for uploaded artwork.**
- Separate `assets/parchment-sketches/sketch-detlaff.webp` is 200 bytes and not a validated upload of this collection.
- Uploading the binary ZIP and WebPs has **not been completed** by this register. Do not bind runtime pages to placeholder files.
- Approval status: candidate collection pending explicit owner lock for production; review does not silently approve portraits.

## Source files
- `sketch-anna.webp`
- `sketch-archer.webp`
- `sketch-avallach.webp`
- `sketch-bandit.webp`
- `sketch-baron.webp`
- `sketch-blacksmith.webp`
- `sketch-boy.webp`
- `sketch-brewess.webp`
- `sketch-caranthir.webp`
- `sketch-cerys.webp`
- `sketch-ciri.webp`
- `sketch-crach.webp`
- `sketch-crone.webp`
- `sketch-dandelion.webp`
- `sketch-detlaff.webp`
- `sketch-dijkstra.webp`
- `sketch-dudu.webp`
- `sketch-dwarf-craftsman.webp`
- `sketch-emhyr.webp`
- `sketch-eredin.webp`
- `sketch-eskel.webp`
- `sketch-fisherman.webp`
- `sketch-gaunter.webp`
- `sketch-guard-captain.webp`
- `sketch-herbalist.webp`
- `sketch-hjalmar.webp`
- `sketch-hooded.webp`
- `sketch-imlerith.webp`
- `sketch-iris.webp`
- `sketch-johnny.webp`
- `sketch-keira.webp`
- `sketch-lambert.webp`
- `sketch-nilfgaardian.webp`
- `sketch-noblewoman.webp`
- `sketch-olgierd.webp`
- `sketch-peasant.webp`
- `sketch-pellar.webp`
- `sketch-philippa.webp`
- `sketch-priest.webp`
- `sketch-priscilla.webp`
- `sketch-radovid.webp`
- `sketch-regis.webp`
- `sketch-roche.webp`
- `sketch-shani.webp`
- `sketch-soldier.webp`
- `sketch-syanna.webp`
- `sketch-tamara.webp`
- `sketch-traveler.webp`
- `sketch-triss.webp`
- `sketch-uma.webp`
- `sketch-ves.webp`
- `sketch-vesemir.webp`
- `sketch-village-woman.webp`
- `sketch-weavess.webp`
- `sketch-whispess.webp`
- `sketch-witcher.webp`
- `sketch-yennefer.webp`
- `sketch-young-woman.webp`
- `sketch-zoltan.webp`

## Release gate
Upload actual binary WebPs and optionally the source ZIP to the intended directory, compare SHA-256 with the original archive, verify all 59 decode, then obtain owner approval before changing guide references.

## Production conversion — 2026-11-23
- Owner authorized use as production artwork.
- **59 original WebP images verified**, each 600 × 894 px, and repackaged with an asset manifest containing paths, dimensions, byte lengths, and SHA-256 checksums.
- Production ZIP prepared in the session: `Phoenix-Monochrome-Sketches-Production.zip`; contents target `dist/art-velen/monochrome-sketches/`.
- **GitHub binary ingestion still pending**: this commit records the package readiness only. Existing repository placeholder images have NOT been replaced. Do not activate them until the real files are uploaded and checksums verified.
