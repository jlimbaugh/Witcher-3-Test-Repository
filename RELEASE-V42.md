Phoenix v42 — Lilac essentials-first reading pilot

Baseline: accepted v41 ae7610762a9fb25d80fd554e65d47a3cb1419b6d.
Scope deliberately limited to all seven Lilac and Gooseberries walkthrough stages. No other quest receives the new reading layout or arrival cue in this pilot.

Presentation: short Do/Where/Needed essentials (Needed only when useful); complete original stage text retained in Route details; supporting paragraphs grouped by purpose without omissions. Stage1 combat/finding paragraphs are separated. Existing choices, spoilers, Optional stops, risk reminders, warning overlays and route links remain their existing owners. Per-step supporting foldouts remember open/closed states in a separate reading preference key, not progress storage; toggle writes merge current stored preferences. Optional stops retains its already-approved quest-wide preference.

Arrival: brief title/category glow on entering this quest, skipped for pop/history returns, same-root step changes and same-route refreshes. Respects reduced motion and has a bounded1500ms cleanup. Route event now carries previousRoot/mode as additive metadata; route behavior itself is unchanged.

Checks:200/200 full node suite; syntax/diff checks. Tests cover original instruction/paragraph preservation, source immutability, omitted empty categories, cue gating and preference sanitization. Rendered Chromium at390px and320px: essentials/support layout, step1 Route details state versus step2 closed default and restoration on return, saved Route details after reload, native Combat preparation control, shared departure warning overlay open/close. Existing warning notification popups remained unacknowledged during inspection. No physical Safari acceptance claimed. Slider/readability mode/VoiceOver stay parked.

LT live QA: see LT-QA-V42.txt. Keep this pilot frozen for LT review and owner Safari acceptance before spreading to other quests. Rollback to v41 above.
