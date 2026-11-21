# Progress star chart · build and acceptance plan

[Decision report](PROGRESS-STAR-CHART-DECISIONS.md) · [Current project status](PROJECT-STATUS.md)

## Ownership and review cadence

This leg has two participants. **Capt (ChatGPT)** owns implementation, source verification, automated and browser checks, the private preview, and the GitHub record. **Jess (project owner)** owns design decisions, physical iPhone Safari acceptance, and the release decision. Capt's test evidence is implementer evidence. Jess's device results are field acceptance. No LT or PFC report is required for this leg. Reopen the design only where a test or owner observation calls for it.

For each review, Capt supplies one private build, the commit SHA, a route, and a short pass checklist. Jess can pass the slice or send screenshots and observed behavior. Capt records the result, fixes the affected slice, and returns it for retest before widening scope. Track any unrelated observations separately. Preserve the public guide and returning-user saves throughout private review.

## Starting point and scope

- Public baseline: Sites v50, frozen application `e8b818492bbc71450453a69686bf1a7f0d3042ac`. See the [release and rollback record](RELEASE-VELEN-V50-CANDIDATE.md#public-release--november-20-2026-americachicago).
- Private functional reference: `7d2a80f263e8228dd6d7c544319cf9ef12d10fb4`, with the existing 75-entry Velen Progress ledger. Preserve this as the comparison for totals and links.
- Begin on a dedicated feature branch from that private reference. Use the existing Progress entry point and existing owner routes for quest hubs and linked activities. Use separate UI state for filter, camera and selection, with no writes to quest records from browsing. Keep Constellation and the regional route map available as existing independent tools.

## Build and acceptance sequence

| Slice | Capt builds and verifies | Jess tests on iPhone Safari | Gate |
|---|---|---|---|
| 1. End-to-end prototype | Reuse the region deck's browse and focus behavior. Show category counts from the existing ledger. Add a dedicated Velen map with Nilf, the Baron and Witch branches, and a few verified linked moons. Wire quest and activity links and exact Back restoration. Keep all other regions outside the pilot scope. | Swipe to Velen, open it, pan and pinch, select Nilf, open a linked activity, and go Back. Follow a branch to a quest hub and return to the same camera state. | Owner accepts the navigation model and first visual direction. |
| 2. Filters and legibility | Apply shared category filters to counts and map bodies. Prototype withdrawal, route continuity, spacing, and a no-results state. Give rings and symbols accessible labels. Verify pan and pinch, touch targets, keyboard navigation, focus restoration, and reduced-motion behavior. | Toggle multiple categories and Unresolved. Check whether remaining bodies, labels, and routes are readable in portrait and landscape. Test Back, Filters, and Recenter one-handed. | Owner chooses the withdrawal behavior and accepts control placement. |
| 3. Velen build-out | Map remaining tracked entries in small story or category batches. Verify branch relationships and owner links against existing source records. Keep one count per stable activity identity when the map shows a shared moon more than once. Mark progress unavailable on read failure. Add verified tasks as data becomes available. | Spot-check one active quest, one alternate route, a shared moon, and any unresolved entry in each batch. Compare card and hub totals after mark, Undo, and reload. | Each batch gets its own owner pass. No invented story edges or unconditional completion rules. |
| 4. Whole-game integration | Once Velen passes, bring White Orchard onto the reusable system contract and add regions in coverage order. Show partial coverage honestly, with expansion content on its appropriate branch. Check navigation, filtered denominators, saved-route compatibility, and accessibility across regions. | Compare White Orchard and Velen on the same filter, return to each system, and confirm older progress still reads correctly. | Owner accepts cross-region behavior and chooses what to release. |
| 5. Release and follow-through | Run the applicable regression suite, verify upgrade behavior and assets on private preview, record the exact commit, publish after approval, and verify the public marker and representative paths. Keep the previously accepted public version available for rollback. | Reopen the public Progress entry in the regular Safari session and confirm saved progress and a representative map journey. | Record release and field results in GitHub. Regional coverage work can continue in later slices. |

## Implementation and evidence checklist

- Identify each planet and moon by an existing stable quest or activity ID. Keep location and source attribution in the data. The map never creates duplicate progress records.
- Use the existing quest owner calculations for required objectives and alternate paths. A higher walkthrough stage alone does not change completion. Category denominators cover tracked entries. For a shared moon, count its completion once wherever the totals aggregate the same set of activities.
- Save return state by region and history entry. Verify both browser Back and in-product return. A deliberate Recenter action is distinct from Back restoration.
- Compare the filtered UI to baseline counts. Check no matches, unavailable storage, zoom limits, panning at map edges, label visibility, touch and keyboard operation, refresh, and repeat entry.
- Keep temporary test data and fixtures isolated. Public build changes follow the owner's release approval. Record any skipped checks and limitations with the preview.
- Open design call for slice 2: when celestial bodies withdraw, test whether retaining route geometry helps orientation and whether the remaining gaps are acceptable. Bring that behavior back for owner selection before applying it in all systems.

**Immediate next build:** slice 1 on the private preview. Start with verified links and readable routes. Tune art and interaction after the owner walks the complete loop on iPhone.
