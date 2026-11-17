# Search slice — QA candidate, unpublished

Base: owner-accepted Phoenix v36, 760988f854e0be7188a9bcec7412217e4df2e5ee.

Approved behavior: Search bar above wolf-menu art buttons; empty Search shows recent searches and entries; results show title, category, region, recorded completion. Recents are stored only in phoenix.search.history.v1. Searches never complete activities, acknowledge warnings, or change the progress schema. Existing Home Search placeholder is now functional.

Scope: White Orchard tasks and individual walkthrough steps, diagrams, services, built Field Reference pages. Existing Region, Content type, Completion filters included. No expansion entries or other region content are claimed. Explicit spoiler-only branch text is excluded. Shared routes and existing status owners supply results; no second content database.

Return: result opens existing shared entry with Return to Search. Query, filters, filter expansion, result focus and list position are retained. Source details and rails are restored; diagram directory uses its existing snapshot logic via two narrow public wrappers. Source scrolling is not restored onto destination pages. Menu reopens after the closing event to avoid outside-click races. Native scrollbar gutter stays stable while overlays lock the reader.

Evidence: Full suite 181/181. Runnable subset: 17/17 (12 model, 5 actual UI factory). Navigation renderer tests also cover bar order and menu callbacks. Rendered Chromium 390x844: result list 7873 -> 7873; source page Y 961 -> 961; diagram rail X 15155 -> 15155; selected letter V and source filter retained. Result opened at Y0. Shared diagram and merchant routes, same-page result, persisted recents, empty results, filters, Close, and Escape exercised. At 844x390, Search fits y8..382 with results area 107px and filter area capped to100px; closing unlocks reader. Final production style check: result background is parchment and filter text is dark ink.

Limits: physical iPhone Safari keyboard/gesture acceptance not claimed. VisualViewport resize support is implemented but not device-tested. Full multi-hop warning/optional journeys are left to the broader periodic LT audit. VoiceOver permanently parked by owner.

Freeze: QA build only. No Sites version saved or deployed. Live v36 stays unchanged. Rollback to v36 removes this slice.

Roles: Cmdr handles normal builds and immediate checks. LT handles periodic broader QA every few accepted slices, targeted high-risk QA, research, and large builds likely to strain usage. Separate assignments should use explicit frozen source checkpoints.
