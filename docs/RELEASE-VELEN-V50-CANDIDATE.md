# Velen v50 quest update candidate

- Frozen reviewed application source: `e8b818492bbc71450453a69686bf1a7f0d3042ac` (draft PR #26).
- Frozen application Git tree: `c176469c1c39d072a74b89aaf10e5763d0be5b1e`. Matches the accepted batch 14 application byte-for-byte.
- Scope: the 70 accepted walkthrough and hub-progress entries and earlier shared changes already present in the same private candidate. Regional aggregate progress and the coverage audit are follow-up work.
- Public baseline and intended rollback: Sites v49, source `02daa30f3799a45cd5b01433e777c1ac39d0b804`, deployment `appgdep_6afe992d558c8191ad23907f78478800` (succeeded), archive hash `sha256:530c58907607680141cee53be76ded7c81211478ce73e14ebdeccfe9665f885f`. GitHub application baseline `ba59252cb65800225a68297b6ce7068d3b91ff9b`.
- Local release-preparation check: `node scripts/ci-verify.cjs test dist 344` with the v45, QA5 and QA6 baseline directories. 344 passed, zero failures or skips. Includes source checks for LT49-RT-01 and automated save-guard, migration, and Undo checks. No physical-device or independent exact-candidate retest was run here.

## Release checks still open

- Independent exact-candidate retest of PR #25 findings, starting with LT49-RT-01 from the Velen console and walkthrough. Record pass/fail or explicit deferral by finding ID.
- Returning iPhone Safari upgrade from v49 with a disposable existing-save profile, including caching, retained progress, and Undo. Prior batch passes are quest-page acceptance evidence.
- Verify v49 rollback against progress written by this candidate without changing the public deployment. The saved rollback version is available; a complete rehearsal remains open.
- Record the bounded release decision and publish only after these checks. The public site still serves v49.

## Cross-version storage rehearsal

The public build marker still identifies v49 application commit `ba59252cb65800225a68297b6ce7068d3b91ff9b`. Using the exact v49 and v50 source modules with disposable storage, v49 created an existing Nilf record, v50 read it and recorded progress, and v49 read and undid the v50 write for the peace, fight, and direct routes. The legacy Arrival record remained byte-for-byte identical. A new Griffin School Gear objective record remained in storage during the v49 module rollback and was visible again in v50. v49 does not display that new tracker.

This completes the targeted storage rehearsal for those paths. It leaves the returning-browser cache and interaction checks, physical Safari upgrade, and independent candidate retest open. No public release or rollback was performed.

## Owner iPhone acceptance

The owner reported PASS on all four requested device checks against the private v50 preview: Region Tools destinations and Safari Back; deck touch interaction, Warnings and Search; Nilf portrait/landscape layout and framed controls; and the number strip and VoiceOver checklist. These owner checks are closed. This records the owner's overall result for each checklist row. The same-origin v49-to-v50 upgrade and independent finding-by-finding retest remain open.

## Same-origin Safari rehearsal

Private rehearsal origin: https://phoenix-v50-upgrade-qa.krwpfbtbn8.chatgpt.site. v49 baseline source `762ac596b1215aa1189071eb0b052a07058976d2` deployed successfully as `appgdep_6affceddd5ec8191beea3079a154da0e`. The application is the v49 GitHub baseline with a rehearsal build marker. Frozen v50 application files are staged in rehearsal source commit `b86737112f6d66dda2791efb354231b3096d281a`, pending a v49 sample save on the owner's iPhone. The public guide and existing private review preview were untouched.

Local preflight: every changed script and stylesheet linked in both v49 and v50 entry pages received a different URL. The actual frozen Region Tools click handlers, executed with a minimal DOM stand-in, dispatched Home, Regions, Field Reference, Progress, and Constellation correctly. Source inspection confirmed console and Nilf walkthrough reuse those handlers. This complements the owner's Safari navigation pass. It does not close independent reviewer sign-off or measure Safari cache behavior.

### Owner returning Safari result

The owner reported PASS after the same private origin was switched from v49 to frozen v50. The requested check covered the retained Travel to Velen mark, new Regional Tools deck with Search, and a second mark surviving reload and being undone without removing the original mark. Private v50 rehearsal deployment: `appgdep_6affcf6ee8608191bc1aee5add7c257c`. Public v49 was not changed.

## Independent retest handoff

Use the exact application candidate `e8b818492bbc71450453a69686bf1a7f0d3042ac`, the [private v50 preview](https://phoenix-nilf-framing-qa.krwpfbtbn8.chatgpt.site/#velen), and the [original findings](https://github.com/jlimbaugh/Witcher-3-Test-Repository/pull/25). For baseline comparisons, use public v49 and the original v48 evidence when applicable. Log pass, fail or explicit deferral against each finding ID in [draft PR #26](https://github.com/jlimbaugh/Witcher-3-Test-Repository/pull/26), with route, device and observed result.

1. Start with **LT49-RT-01**. On both the Velen console and Nilf walkthrough, activate all five shared destinations and exercise Back. Check **RT-02/03** for the approved deck and Search treatment.
2. Retest **PRG-01 through PRG-04 and N1** with disposable saves. Cover unreadable/denied storage feedback, choice correction and Undo ownership. Use the exact original reproductions in PR #25 and its linked v48 reports.
3. Record the remaining visual, Sources and accuracy findings by ID (**NUM**, **NILF**, **BTN**, **SRC**, **ACC**). Ground explicit deferrals in the original severity and evidence. Treat the owner’s device pass and local checks as supporting evidence.

Independent sign-off is pending. The public release decision follows recorded disposition of the remaining findings.
