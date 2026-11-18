# Filled Inventory proof with White Orchard art scheme

**[Download the current HTML proof](review.html)**

On the GitHub file page, use **Download raw file**, then open the saved HTML in a browser with internet access. GitHub displays HTML source on the file page. The review file loads its artwork and fonts from a pinned GitHub commit.

The palette revision uses dark stone, iron and worn silver, with a warm neutral filter on the equipment and Geralt crops. Vitality and Toxicity have been removed. Parchment stays on the Gear guide exit.

- LT: Check the palette, compact slots, socket-pip legibility and gear grouping against the Xbox photos.
- PFC: Open the proof in iPhone Safari landscape. Check art loading, normal-zoom readability, clipping, alignment and both removed readouts.

[Earlier static render](proof.png)

Keeps the improved landscape grouping. Fills the collection, selected-piece details,
profile, reference meters and build controls. Reuses White Orchard's actual scene,
Alegreya / IM Fell / Cinzel fonts, silver treatment, parchment guide exit and wolf.
Working panels remain dark and gear slots compact; parchment is used for the guide link.

HTML/CSS source: index.html. Static WeasyPrint render, not a browser capture or a
functional deployed app. Reproduce with build_wo_proof.py; the Inventory source image
is reused from ../inventory-proof, not duplicated. No image generation used.

Source: owner's IMG_2995 (Inventory). Character remains untouched. Artwork retains
photo perspective/blue cast; properly sourced clean production assets remain open
under issue #12. Reference level/points/vitality/toxicity are transcribed from the
owner photos, not computed. The selected Enhanced tier is a planning example;
its requirement is explicitly labelled as an unverified v4.04 reference. No current
combat values or crafting totals are fabricated. Controls are visual, not wired.

This revision follows the new request to apply WO art to the accepted layout; it is
not a claim of an exact game screenshot replica. Phone adaptation and browser/Safari
QA remain later steps. No application, storage, CI, hosting or production changes.
