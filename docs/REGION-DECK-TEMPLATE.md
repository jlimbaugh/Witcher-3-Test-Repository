# Phoenix regional deck template

The owner approved two complete page templates on November 19, 2026, using QA build `1690b41`. Use the Velen region console for region pages and The Nilfgaardian Connection walkthrough for quest walkthroughs. Carry forward each page’s section order, card layout, spacing, framing, controls, navigation and interactions, including the shared Regional Tools deck. Supply the appropriate regional and quest content, artwork, destinations and objectives. Outstanding QA findings stay open.

Owner PASS · November 19, 2026. All future regions use the Regional Tools menu from candidate 1690b41: eight illustrated quest-style cards, matching selected action, quiet search field opening the search page, and no numbered jump strip. Use the shared forged silver perimeter, staggered side rails and centered lower brace. Keep the floating wolf independent.


Owner approved the Velen and White Orchard numbered strip on November 18, 2026. The initial shared implementation was `11871564b5b51dc65ffd16fc502572aa9ab098c3`. Use [Velen v49](RELEASE-VELEN-V49.md) for the taller Velen implementation. The approved Velen deck is the canonical template for new and revised regional decks, including card presentation, the numbered jump strip, and selected-card actions. Preserve the existing White Orchard implementation. Evaluate individual White Orchard elements for incorporation into the shared template with explicit owner approval.

## Required regions pattern

1. Preserve the regional card deck, its artwork, and its existing touch and keyboard interaction. Show the current card and its region-specific title.
2. Place a compact, numbers-only strip directly beneath the card deck. Visually join it to the deck with a matching border and centered marker. Preserve vertical-scroll space beneath the horizontal controls.
3. The number strip scrolls freely and wraps from the last number to the first and back. When scrolling settles, the centered number selects its card and updates the briefing and actions. Tapping a number also selects its card. Use 68 × 64 CSS px minimum number blocks in Velen with the centered [silver selector wolf](../dist/visual-art/wolf-pointer.webp). The strip adds no quest-name picker or extra visible row. Each number has a quest or task name in its accessible label.
4. Use fixed artwork for repeated navigation actions. The field journal and quill mean Open Walkthrough. The crossroads signpost and lantern mean Open Quest Hub or Open Quest Card. Each quest or activity card uses art of its actual subject. See the [card art template](QUEST-CARD-ART-TEMPLATE.md).
5. New walkthroughs reuse the shared presentation, related quest and task links, and a compact Sources link. Keep selection and browsing separate from progress. Opening a card or using the number strip must never award a completion mark.

## Implementation references

- `dist/deck-jump.js` supplies the shared numbered strip.
- `dist/velen-r18.js` connects it to the Velen card deck.
- `dist/desk-r11.js` and `dist/exploration-ui.js` show the White Orchard quest and activity integrations.
- [Shared walkthrough CSS](../dist/shared-walkthrough.css) supplies the base strip styles. [Velen pilot CSS](../dist/nilf-forged.css) supplies the taller Velen strip and selector artwork.

## Acceptance

On iPhone Safari, scroll across both wrap boundaries, confirm the centered number selects the card and updates its briefing after settling, jump from the first number to a late number, then open its walkthrough and hub. Confirm vertical scrolling below the strip, stable focus or an accessible equivalent, legible targets, and no horizontal page overflow. Repeat on a short deck and a long deck. Check keyboard reachability and accessible names separately. Confirm the existing card gesture and saved progress still behave as before.

## Current deck content

V49 combines 72 registry entries and three Arrival quests. The registry includes 12 contracts. Quest and activity categories are populated from the registry, so the numbered strip derives its range from the selected deck. For new entries, verify subject, starting location, outcome and progress ownership using the [card art template](QUEST-CARD-ART-TEMPLATE.md).

## Approved framing direction

Use the [forged steel framing standard](../ART-STANDARD.md#forged-steel-framing) and the [approved number strip concept](framing-review/number-strip.jpg). Size the relief and inlays to the deck without crowding the number controls. Use the shared wolf artwork and keep the count inside the upward-opening flourish. The reference is a visual standard for implementation and iPhone review.
