Phoenix v41 — park the text-size slider

Owner reports unacceptable layout degradation beyond120%. Slider is parked alongside readability mode and VoiceOver. Appearance retains font and Day/Night choices; default scale is100% on both index and Velen even when old preferences store125–150%. New preference writes omit textSize. The v40 typography hierarchy, flourishes, purpose headings, card-label flow and button-layout improvements remain. No progression, routing or swipe-engine changes.

Regression checks: legacy sizes ignored while font/theme survive, default recovery, full suite; rendered Appearance/default scale check. Physical Safari final acceptance remains owner. Rollback checkpoint: v40 a3078179175499c534e550248220391348876923.
