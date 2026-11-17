Phoenix v39 — extend accepted swipe boxes

Baseline: accepted v38 c9473efe4844cfd3a70c5b56913c10fae62aed3a.

Inventory: main application already applies shared boxes to Home/Regions and WO quest decks; nearby quests, diagrams and exploration rails; reference/shortcut rails; objective cards; diagram compass; existing stage ribbons and scroll indexes. The separate Velen pilot did not load the shared controller or CSS.

Changes: Velen now loads the same swipe boxes and initializes the controller after its first render. Its quest selector accepts diagonal horizontal movement inside the enclosure, suppresses accidental activation after movement, ignores non-primary pointers, captures the active horizontal pointer and cancels safely. Existing Velen selection/route/progress semantics remain unchanged; no new looping/momentum behavior is claimed. Native stage ribbons use horizontal-only touch areas with vertical scrolling in the side gutters. Mutation observation covers newly rendered menus.

Excluded: maps, constellation and two-dimensional tree/canvas views; vertical overlay content; static grids and native input menus. No save schema, artwork or quest content changes.

Validation: full suite 194/194; syntax/diff checks. Rendered Chromium 390px: Velen deck width327px/height318px with pinch-zoom; stage ribbon pan-x pinch-zoom; diagonal drag selected Funeral Pyres without opening its route; stage links advanced to The pyres and retained shared boxing. Nearby rails and reference rail computed 12px margins and pan-x pinch-zoom; reference Next moved210px. Physical iPhone Safari remains owner acceptance. VoiceOver remains parked.

Rollback: restore v38 checkpoint above.
