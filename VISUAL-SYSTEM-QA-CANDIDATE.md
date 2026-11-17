# Unified guide visuals — frozen QA candidate, unpublished

Immediate base: frozen Search candidate df6ae2cb95842fdeb015626150f1a2f5ee7351b0.
Published baseline remains owner-accepted v36, 760988f854e0be7188a9bcec7412217e4df2e5ee.

Approved implementation
- Objective completed/total and chapter sit directly on parchment; the inserted blue-gray header is removed visually.
- One original engraved silver wolf pointer with an integrated downward point replaces existing scroll pointers and is added above horizontal menus and decks.
- Final owner clarification: radio-tuner mounting. The head rests on a fixed top rail; its point projects into the card edge as cards move beneath it. On the alphabet compass it aligns with the fixed letter position. Markers do not intercept taps or own scrolling.
- Category-colored eyes wake on user interaction and settle after 850ms. Repeated activity uses one timer per pointer. Programmatic restoration alone does not wake a pointer. Reduced motion removes transitions, glows and press brightness.
- Generic action controls use a nine-slice worn-silver / dark-iron frame, live text labels and approved journal, map, return and direction symbols. Illustrated navigation/card artwork, alphabet buttons, Search results, checkboxes and native selects retain their existing treatment. Hidden controls stay hidden.
- Narrow controls retain 44px+ targets. At <=360px, the swipe hint/count gets its own line, with Previous/Next beneath.

Architecture and scope
Presentation component only. Existing routing and action handlers retained. No completion, branch, save-schema, deck-motion or compass-controller changes. It observes new controls and decorates idempotently. Protected Search result buttons do not trigger repeated enhancement work. Narrow diagram snapshot wrappers remain those from the Search candidate, unchanged here.

Generated production artwork: visual-art/wolf-pointer.webp and iron-button-frame.webp, transparent 512px derivatives of the approved generated design board. Additional purpose symbols and ornament are native SVG. Combined new bitmap delivery about 141KB. Original generated previews were retained separately.

Verification
Full site suite: 187/187. Standalone visual subset: 6/6. Combined Search + visual subset: 23/23.
Rendered Chromium: 390x844, 320x740 and 844x390 iframe viewports.
- Inventory: 95 horizontal rails/decks, 94 wolf markers; alphabet and diagram cards share one compass marker. No uncovered menus, no duplicate cues after repeated rendering/returns.
- Visible controls >=44px; objective arrows 68x66. At 320px, full-width hint and both arrow labels fit without horizontal overflow. Hidden action controls compute display:none.
- Objective header background transparent, obsolete triangle suppressed. PointerEvents:none. Final tuner mount: objective pointer box overlaps card top while staying above objective text. Pointer horizontal x stays151.5 as the card rail moves0 ->233; completion remains0.
- Continue primary classifies as continue even when title and step are nested children; journal symbol renders. Map and direction symbols render, labels readable.
- Diagram letter jump leaves the full wolf visible. Filter, selected V, loop and 44px letter targets retained.
- Search results remain parchment. Search destination Y0; source page950 ->950 and rail15155 ->15155 on return; Search query retained and wolf toggle closes/unlocks.
- Landscape Search fits y8..382 with103px results area; Escape closes and unlocks.
Physical iPhone Safari eye strength, touch feel, keyboard layout and final aesthetic acceptance remain owner checks. VoiceOver permanently parked.

Freeze and rollback
No Sites version saved or deployed. Live v36 unchanged. This candidate includes frozen Search plus the visual slice. Revert to Search checkpoint to remove only visuals; revert to v36 to remove both candidates.
