Phoenix v38 — bounded horizontal swipe surfaces

Baseline: v37, 0aa1b6c3f30a20f860be7f262bdff87d0b070b7c.

Card/letter rails now have framed horizontal hit areas inset from their parents. Vertical page scrolling starts in the side gutters or outside the card area. Custom transform decks no longer lose a diagonal horizontal gesture to browser vertical panning; native rails retain native horizontal scrolling. Pinch zoom remains enabled. Objective box height follows the displayed card; custom deck height fits the card artwork. No route, progress, save-schema, or artwork changes.

This intentionally replaces the prior vertical-inside-card gesture policy for the requested Safari trial. Loop/momentum/tap-stop handlers remain in place.

Validation: full node suite 193/193 passed; syntax and diff checks passed. Rendered Chromium at 390px: objective, region, and diagram framing; arrows below; objective movement; diagonal region drag; C compass jump; diagram entry return restored rail X 2456 exactly. Browser checks do not establish physical iPhone Safari touch acceptance. VoiceOver remains parked.

Owner trial: horizontal swipe/flick inside card surface; vertical swipe in the side gutters; first tap stops a spinning deck, next tap opens; test Home, WO quest selector, objectives and diagrams. Rollback to the v37 source above if needed.
