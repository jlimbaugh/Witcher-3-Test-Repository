# Operation Phoenix — approved illustration standard

Approved by CaptDrunk, November 14, 2026. Supersedes the landscape-dominant A&D art direction. The six approved samples establish the visual baseline: ghoul, bandits, treasure chest, submerged cache, Igni stone and grindstone.

## Subject selection

Choose the subject that identifies the actual task. Mix creature and human portraits, contextual action, treasure and equipment studies, underwater salvage, services and recognizable landmarks. Do not turn every card into a landscape or repeat the same composition throughout a deck. Regional context belongs in the background when the encounter or object is the subject.

Use the actual encounter roster and source-backed location. Pirates, Redanian guards and witch hunters belong only where the relevant content supports them. No invented encounters, named rewards, or faction assignments for visual variety. Unverified details remain provisional; an illustration is an interpretation, not exact navigation evidence.

## Visual treatment and framing

Sharp painterly realism; tactile worn materials; charcoal, cold silver, moss and earth tones with restrained warm accents. Vary distance, silhouette, pose and lighting while keeping this family resemblance. Strong subjects should occupy most of the composition. Avoid generic environmental panoramas where an encounter or object is more informative.

Use one image for a task's card and page header. Keep essential faces and objects within crop-safe central space and away from the lower title area. Test both portrait cards and wide headers. Existing worn frames, controls, layout and navigation remain the presentation layer; do not bake text, HUD, frames or plaques into the illustration.

## Production and review

1. Read the canonical task and its encounter/location sources.
2. Assign a main subject and composition; review deck-level variety.
3. Generate one distinct image per entry using the approved style; keep prompt provenance.
4. Inspect anatomy, objects, faction/location fidelity and crop safety.
5. Bind the same asset to card and shared header; retain source references and illustration labeling.
6. Check registry completeness and distinct assets, then inspect the phone layout.
7. Publish the bounded slice for CaptDrunk's visual acceptance. Do not treat automated checks as art approval.

For a substantial new art direction, review six varied samples before expanding the set. Preserve saved progress and existing task IDs throughout art-only work.

## Diagram and nest refinement

Named diagram entries require distinct illustrations of the named equipment or crafting subject; never use one generic Viper image throughout the deck. Creature-site decks should vary encounter portraits with nest structure and relevant preparation/object studies rather than repeat creature portraits on every card. Keep the actual encounter roster unchanged.


### Reading surfaces — approved 14 November 2026
Use the established White Orchard curled parchment (`curled-vellum-r16.webp`) as the default body material for text-reading pages, with dark ink and restrained ink dividers. Quest hubs place their briefing on a scroll and nearby illustrated decks below on the regional backdrop. Walkthroughs use one reading scroll; step navigation follows step text. Keep existing approved deck artwork and silver frames; do not reinterpret cards as parchment sketches. Maps, Constellation, illustrated cards, and navigation chrome are purposeful material exceptions.


### Shared parchment controls — approved site-wide
`parchment-controls.css` is the canonical shared control treatment. Apply outlined parchment tabs with slate/silver embossed plus/minus markers to disclosures on paper surfaces; use framed stamp-box checkboxes and bordered paper selectors. Covers quest hubs and walkthroughs, Progress, diagram and exploration records, merchant/reference disclosures, map paper controls and parchment confirmation dialogs. Scope by material rather than route, so future paper sections inherit it automatically. Keep native controls, keyboard focus, disabled states and confirmation behavior. Dark chrome, the wolf overlay, illustrated card decks and Constellation controls retain their existing treatments. Reserve warning red for risks.

## Primary quest and map actions

The White Orchard selected-quest action in the accepted Lilac and Gooseberries screenshot is the template. Use the shared `home-action-tile` class and the rules in `dist/home-rebuild.css`. Fill the button with art, put the dark overlay behind the centered ivory label, and draw the silver frame with `silver-frame-r15.svg`. Stack action groups on phones. Give a lone Resume action the full content width.

Use `action-walkthrough.webp` for walkthroughs and `action-quest-hub.webp` for quest hubs and cards. Use map art for map actions. Apply this pattern to primary quest destinations in regional consoles, Resume panels and quest hubs. Keep the original action's destination and accessible text.

## Quest route maps and progress copy

Use a separate illustrated map action on the quest card and a region route index action in Region Tools. Open the quest map at its current route step. Draw route relationships as a field sketch and use the guide’s in-game marker assets as links. Show only the quest’s own steps and the linked stops documented on its card. Distinguish route sketches from scaled terrain maps.

Keep successful progress writes silent. Omit browser-storage instructions from guide templates. Show a status message only when it helps the player understand an error or resolve a problem.

## Forged steel framing

Owner-approved direction, November 18, 2026. Use the [number strip reference](docs/framing-review/number-strip.jpg) as the material and scale reference. The [other framing concepts](docs/framing-review/README.md) are for visual review.

- Use physically dimensional hammered silver and blackened steel, with broad primary bands, thinner interlaced blue-steel bands, bevel highlights, and deep shadows at overlaps.
- Recess petrol-blue and muted jade inlays into selected spans. Keep silver and steel dominant. Avoid gold and brass.
- Give the number strip a substantial frame on all four sides and an upward-opening forged flourish around the count. Enlarge the assembly and number targets together. Keep the shared wolf pointer artwork at `dist/visual-art/wolf-pointer.webp`, preserving its proportions and sizing it per control. The concept wolf is a placeholder.
- Adjust band depth, inlay coverage, and ornament scale to the framed content and available space. Keep reading space, touch targets, and existing artwork legible. Review one surface at a time before implementation.

### Box-frame bottom flourishes

Use a single centered forged flourish on the lower rail of a framed box where there is clearance. Scale its depth and width to the box and keep the motif clear of the contents and controls. Blue and jade are the current adjustable accents.

Use a fixed A–J rotation in display order for repeated boxes, wrapping to A. Assign the initial sequence once per collection and keep each variant with its box through filtering, reordering, and reload. Keep a single box's assignment stable across visits. All ten bottom-flourish designs (A–J) are approved for this rotation. See the [flourish gallery](docs/framing-review/README.md#seven-additional-bottom-flourishes).

### Vertical side rails

Use an asymmetrical pair of forged steel rails. Stagger ornaments at different heights and retain stretches of plain steel between them. Keep vines and leaves close to the rail and clear of the content and touch targets. Scale the ornament density to the height and width of the frame.

The review rotation interleaves the three original pairs with six vine pairs: V1 → V4 → V5 → V2 → V6 → V7 → V3 → V8 → V9 → V1. Assign the two rails as a pair, independently of the A–J bottom flourish rotation. Keep the pair with its box through filtering, reordering, and reload. The [vertical rail concepts](docs/framing-review/README.md#vine-inspired-vertical-rails) are approved for the Nilfgaardian Connection pilot.

### Standard text-only buttons

Use a dark hammered-steel face with centered ivory text and compact silver end details. Keep ornament clear of the text and focus indicator. Scale the bezel to the button height and leave enough room for long labels. Use optional blue and jade inlays sparingly.

All ten standard text-only button variants (B1–B10) are owner-approved. Rotate the variants between pages in the initial template order, then wrap from B10 to B1. Assign one variant to each stable page identity and use it for every standard text-only button on that page, including standard buttons in its panels. Retain the assignment across navigation, reload, filtering, and reordering. Match the dimensions of peer actions in a group. Preserve the assigned style through hover, focus, pressed, and disabled states, and retain the semantic treatments for warnings, confirmations, and destructive actions. See the [approved text-only button designs](docs/framing-review/README.md#standard-text-only-buttons).
