# Diagram directory refinement

User requirements: distinguish whole-guide Gear from the currently built White Orchard diagram content, sort diagram entries alphabetically by the first word in their displayed title, and provide a letter jump.

## Result

Gear → Diagrams now opens `#gear-diagram-regions`. This uses the shared geographic region inventory and existing illustrated card style. White Orchard is available; other regional diagram directories are disabled and labeled Not built yet. Existing White Orchard regional shortcuts still open `#gear-diagrams` directly. Existing exact shared-entry URLs and acquisition records are preserved.

The canonical diagram catalog sorts full displayed names with English, case-insensitive natural collation; it does not remove prefixes such as Greater or Lesser. Directory cards, the named-item selector, merchant lists and active cluster diagram rails inherit this order. The A–Z letter selector jumps to the first matching visible card, disables letters absent from the selected source filter, and brings the deck into view. Return from an entry restores source filter, selected letter, named selection, deck offset and page scroll.

## Verification

93 automated checks passed. Phone-width browser QA confirmed Gear → regional diagrams → White Orchard, visibly disabled regional placeholders, alphabetical titles, V jumping to Velen longsword under All and Viper silver under Fixed, unavailable letter disabling, selected filter/letter/item restoration after a diagram visit, no horizontal page overflow, and alphabetical cluster diagram cards. Approved artwork and saved acquisition IDs unchanged.

Remaining: content outside White Orchard remains unbuilt. Wolf overlap is still a separate recorded correction slice.
