# Activities & Discoveries — full artwork pass

Baseline: eb7087c662ef3101a1b1c314f9a10d60fc252bf8.

## Delivered
All 11 A&D category cards (Diagrams plus the 10 exploration types) now have separate sourced in-game overview images. All 44 exploration activity cards have distinct image assets, bound to the same artwork on the corresponding shared page header. Regional contexts and card frames remain consistent with White Orchard. Category headers use their own category artwork; the Diagrams landing header now matches its category card.

33 task images are sourced gameplay scenes or clearly labeled nearby landmark views. 11 task images are explicitly labeled geographic map details rather than unverified scene photos: two woodland camps, the northern monster nest, two water caches, cow-pasture caution, Woesong Bridge signpost, and four equipment-enhancement stations. These use exact coordinates from the existing credited map and retain original game icons. They are not claimed to be scene screenshots. The manifest preserves the source URL, caption, credit, original dimensions or map crop, focus and content hash.

The existing individual diagram catalogue is retained; this pass replaces its A&D category/landing art, not every merchant-stock diagram’s illustration. No progress IDs, completion behavior, merchant pages, routes or Undo timing changed.

## Source handling
Captured game visuals remain © CD PROJEKT RED. Most scene captures are from Gamer Guides; the cemetery crypt capture is from Witcher 3 Guide. Links and capture credits are visible in each task’s Sources & verification section, a regional Artwork sources link, and the footer’s A&D image credits page. Local WebP files avoid hotlinks. Images were resized without invented scene content; CSS crops adapt them to cards and headers. Map coordinates/licence remain credited in MAP-SOURCES.md.

## Validation
79 automated tests passed, including existing behavior coverage plus complete credited image coverage, distinct asset/hash coverage and exact-map-coordinate validation. All 55 assets (44 tasks + 11 category images) have distinct hashes. Scene images inspected on contact sheets. Browser confirmed 11 unique category images, 44 unique activity images, zero card/header mismatches, loaded Power-stone images, matching cemetery header, readable phone card crops at 375 CSS px with no horizontal overflow, and explicitly labeled station map artwork. Temporary phone QA fixture removed before publication. Actual iPhone Safari visual acceptance remains pending.
