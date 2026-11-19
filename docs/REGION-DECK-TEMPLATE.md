# Phoenix regional deck template

Owner approved the Velen and White Orchard numbered strip on November 18, 2026. The reference implementation is commit `11871564b5b51dc65ffd16fc502572aa9ab098c3`. The approved Velen deck is the canonical template for new and revised regional decks, including card presentation, the numbered jump strip, and selected-card actions. Preserve the existing White Orchard implementation. Evaluate individual White Orchard elements for incorporation into the shared template with explicit owner approval.

## Required regions pattern

1. Preserve the regional card deck, its artwork, and its existing touch and keyboard interaction. Show the current card and its region-specific title.
2. Place a compact, numbers-only strip directly beneath the card deck. Visually join it to the deck with a matching border and centered marker. Preserve vertical-scroll space beneath the horizontal controls.
3. The number strip scrolls freely and wraps from the last number to the first and back. When scrolling settles, the centered number selects its card and updates the briefing and actions. Tapping a number also selects its card. Use 64 × 56 CSS px minimum number blocks in Velen with a centered silver wolf pointer. The strip adds no quest-name picker or extra visible row. Each number has a quest or task name in its accessible label.
4. Use fixed artwork for repeated navigation actions. The field journal and quill mean Open Walkthrough. The crossroads signpost and lantern mean Open Quest Hub or Open Quest Card. Each quest or activity card uses art of its actual subject. See the [card art template](QUEST-CARD-ART-TEMPLATE.md).
5. New walkthroughs reuse the shared presentation, related quest and task links, and a compact Sources link. Keep selection and browsing separate from progress. Opening a card or using the number strip must never award a completion mark.

## Implementation references

- `dist/deck-jump.js` supplies the shared numbered strip.
- `dist/velen-r18.js` connects it to the Velen card deck.
- `dist/desk-r11.js` and `dist/exploration-ui.js` show the White Orchard quest and activity integrations.
- `dist/shared-walkthrough.css` supplies strip framing and the existing walkthrough styles.

## Acceptance

On iPhone Safari, scroll across both wrap boundaries, confirm the centered number selects the card and updates its briefing after settling, jump from the first number to a late number, then open its walkthrough and hub. Confirm vertical scrolling below the strip, stable focus or an accessible equivalent, legible targets, and no horizontal page overflow. Repeat on a short deck and a long deck. Check keyboard reachability and accessible names separately. Confirm the existing card gesture and saved progress still behave as before.

## Next Velen content pass

The approved candidate contains 25 Velen walkthroughs, including four contracts with target-specific art. Continue with the remaining ledger contracts. Verify target, starting location, completion conditions and ownership before adding each entry. The numbered strip derives its range from the deck, so added cards require no hard-coded count.

## Approved framing direction

Use the [forged steel framing standard](../ART-STANDARD.md#forged-steel-framing) and the [approved number strip concept](framing-review/number-strip.jpg). Size the relief and inlays to the deck without crowding the number controls. Use the shared wolf artwork and keep the count inside the upward-opening flourish. The reference is a visual standard for implementation and iPhone review.
