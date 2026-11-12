# White Orchard quest routes — R3

Approved baseline: acaa2d8. This build expands the accepted connected-box pilot and adopts the subsequent horizontal-bracket direction.

## Delivered

- 13 fixed quest hubs: three main-story stops, five secondary quests, one contract and four treasure hunts.
- 22 activity identities, each owned by exactly one hub. Recommendations route to that home; they do not create a second completion control.
- 44 short walkthrough stages across the quest pages. Each quest remembers its own last stage; Next/Previous remain navigation only.
- Six individual Place of Power pages, one Gwent stop, the forge service note and the departure review.
- Horizontal story rounds with connected main-story boxes and optional branches below. The initial window remains current + next; all quests are reachable from the quest picker.
- Exact return snapshots now include horizontal bracket offset as well as vertical page position, expanded hub and focused link.
- Existing completion identifiers, storage key, Firestarter stage identifiers and established content URLs are retained. The old pilot key is read only for legacy import.
- Content comes from one route registry in white-orchard.js. Page generation, activity ownership, map routing links and saved-content validation use that registry. Runtime checks reject disconnected homes or missing views.

## Content basis

Each destination links its references. Main reference set: GameBanshee’s individual quest walkthroughs; Gamer Guides and Witcher 3 Life for Place of Power locations; the missables checklist at witcher3.th.gl and Neoseeker’s White Orchard quest inventory for the departure review. Cluster order is editorial guidance, not a claim that a source published this exact route.

Some references disagree on suggested levels for the short unlevelled errands. Those hubs intentionally show no numeric level. The griffin hunt is the level-3 anchor; a level-6 scavenger hunt and the referenced level-7 cemetery encounter fit its +5 ceiling, but readiness and access remain separate checks. The +5 rule is hand-curated, not an automated eligibility engine.

Temerian Valuables and Deserter Gold remain separate game quests and separate completion records, with explicit text explaining that they share a treasure stash. No duplicate reward is promised. All six stones have independent completion records; uncertain Sign labels are omitted.

## Boundaries

This is the prologue quest route, not the later White Orchard epilogue or every regional map marker. No other region is populated. The map remains a labelled routing index, not a geographic map. All pages retain the official CDPR scene already approved; this pass adds no new art or font claims. No repository settings or permissions change.

Browser history still records stage navigation as in the approved build. Art originals remain PNG. The earlier optional proposals to change history behavior and produce WebP derivatives are not included.

## Validation

JavaScript syntax and route ownership checks passed. Browser QA covers all generated IDs/link roots, one-open-hub behavior, shared completion, contract stages and reload resume, explicit return to the same expanded hub at y=559, quest-picker access between hidden groups, and narrow 390px layout checks. The narrow check uses a Chromium iframe with a 390×844 CSS viewport; it is not a real iPhone or touch/Safari certification. Real iPhone Safari and Xbox content acceptance remain pending.

Horizontal follow-up: narrow-layout bracket scrolling was exercised through keyboard input (x=0 → x=80). The page itself had no horizontal overflow (375px client and scroll widths); the bracket had its own 359px horizontal range. Returning from the departure walkthrough restored that rightmost 359px offset and its open departure hub. This verifies layout/keyboard behavior in Chromium, not native touch swiping.
