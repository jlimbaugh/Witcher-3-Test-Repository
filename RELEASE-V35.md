# Phoenix v35 — objective completion banner

Owner accepted v34. Replace Current objective with the canonical completed/total count, matching Quest progress. Optional completion remains separately labeled. The chapter name follows the browsed card; browsing does not increment completion. Add a centered downward pointer from the banner into the objective rail. Completion corrections and Undo update the banner in reflectUI, using existing progress counts. No state-schema or engine changes. VoiceOver remains permanently parked.

Base and rollback: v34, 905eb468a5ba9d8b9aed14dc1eb171c6a3376de4.

Verification: 163/163 automated tests. Rendered 390x844 local preview: browsing preserves 0/5; recording one objective displays 1/5; Undo restores 0/5. Pointer computed border-top is 13px. Screenshot capture timed out; DOM and normal UI checks completed.
