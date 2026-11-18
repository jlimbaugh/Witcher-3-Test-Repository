# Filled Inventory proof with White Orchard art scheme (pass 2)

**[Download the current HTML proof](review.html)**

On the GitHub file page, use **Download raw file**, then open the saved HTML in a browser with internet access. GitHub displays HTML source on the file page. The review file loads its artwork and fonts from a pinned GitHub commit, so it works as a standalone download.

[Static render](proof.png) · HTML source: `index.html` (relative paths, for a repo checkout) · `review.html` (pinned raw URLs, shareable).

## What changed in pass 2 (Cmdr's orders after the LT and PFC reports)

The White Orchard art direction and Inventory layout are unchanged: dark stone and silver, the 7-tab strip, no Vitality or Toxicity readouts, and parchment only on the Gear guide link.

1. **Muted item-quality fills and vector socket pips.**
   - Each tile sits on a muted fill: green for weapons and armour, blue for bolts, amber for consumables, bombs and trophy, and plain dark for pockets and the other Roach items.
   - Fill hues are read from the tile backgrounds in IMG_2995. The values are muted to fit the stone and silver palette, because the camera's blue cast prevents direct colour sampling.
   - The photo crop is drawn greyscale and blended by luminosity onto the fill. The blue cast stays out of the tiles, Geralt and the scene.
   - Socket pips are drawn in CSS as crisp 8 px dots on the 1200 × 850 canvas. They are filled discs or empty rings.
   - A covering block hides the photo-baked pips so they don't double up.
   - Socket counts come from IMG_2995: steel 3, silver 3, chest 3, gloves 1, trousers 2, boots 1.
   - Filled or empty state follows how the photo looks (the weapons' pips look solid, the armour's look like rings). Actual rune and glyph occupancy is not verified, so the state is **illustrative**, and the on-screen legend says so.
2. **Geralt and the scene.**
   - Geralt is now a cutout (`geralt-cutout.png`, made by `make_geralt_cutout.py`). There is no dark matte halo and no rectangular crop edge.
   - The cutout was made by background segmentation of the owner's photo with the rembg `isnet-general-use` model, not image generation. It is converted to a warm silver monotone, and its edge is eroded 1 px and feathered.
   - The scene is shifted and darkened. A feathered dark stage sits behind the equipped columns and Geralt, so the White Orchard villager no longer competes with the consumables.
3. **Labels, quantities and frames.**
   - Bolts, Ranged weapon, Consumables, Bombs and Pockets are labelled.
   - Quantities are shown as visible in IMG_2995: bolts 76, consumables 4 / 5 / 4 / 3, bombs 4. Pockets has no visible quantity, so none is shown.
   - Opaque count badges cover the photo-baked numbers.
   - Bombs and Pockets have their own frame, like the other groups.
   - The Pocket crop is re-cut around the whole item.
   - The selected-piece panel now ends well above the panel border, giving breathing room under the last detail line.
4. **Roach group and collection.**
   - There is a compact **Roach** frame with Trophy, Saddlebags, Saddle and Horse blinders, cropped from IMG_2995.
   - The **mask slot is deferred**: it is omitted from this proof and still needs a later decision.
   - The Equipment collection now shows **alternatives**, not the equipped pieces:
     - Six upgrade tablets from the photo's left-hand collection grid, under the header *Runes & glyphs*.
     - Two unidentified items with their visible quantities (16, 12), under *Other items*.
   - Group headers stay. The *Armor* and *Weapons* headers state that no alternative pieces are visible in IMG_2995. Item type names are not transcribed. Tiles cut off at the photo's left edge are left out.
5. **Honest reference data.**
   - **Available points (4) are illustrative.** This is labelled on screen and here.
   - **Reference level 36** is labelled *transcribed from owner photos, not computed*. It is not visible in IMG_2995 itself.
   - The selected Enhanced tier is still a planning example, with an unverified v4.04 requirement.
   - No combat values, crafting totals or socket contents are fabricated. Controls are visual only, not wired.

## QA package note

LT's QA package for this pass contains:

- this README, `review.html`, `index.html`, `layout.css`, `palette.css`, `build_wo_proof.py` and `proof.png`;
- LT's headless Chrome renders;
- a copy of the owner's IMG_2995 (`IMG_2995-inventory-reference.jpg`, the same file as `../inventory-proof/inventory-reference.jpg`);
- a `PACKAGE.txt` naming the source commit.

The package is author-supplied evidence. It is not committed to the repository.

## Not yet verified

- **Safari / iPhone:** not done for this build. The formal Safari check belongs to the revised preview. PFC should capture the top and bottom at default zoom, and record the iPhone model and iOS version.
- **Phone readability:** not judged yet. The page is still a fixed 1200 × 850 canvas with no responsive layout. Readability is judged once the responsive layout is in place.
- The renders are headless Chrome on Linux, LT's own (author-supplied).
- Item art is still cropped from the photo and is provisional. Properly sourced clean production assets remain open under issue #12.
- Fill hue meanings are as seen in the photo. Their exact game semantics are not asserted.

## Reproduce

Run `python3 build_wo_proof.py` to rewrite `index.html` and `review.html` and render `proof.png` with headless Chrome over the DevTools pipe. `PIN` in the script names the commit `review.html` loads its assets from.

`make_geralt_cutout.py` rebuilds the cutout. It needs `pip install rembg`.

No application, storage, CI, hosting or production changes.
