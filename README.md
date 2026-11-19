# Operation Phoenix · Witcher 3 Field Guide

[Open the published guide](https://phoenix-wo-qa-1c91b66.krwpfbtbn8.chatgpt.site/#velen) · [Current project status](https://github.com/jlimbaugh/Witcher-3-Test-Repository/blob/review/nilf-forged-framing/docs/PROJECT-STATUS.md)

| Looking for | Start here |
|---|---|
| What players have | [Velen v49 release and rollback record](https://github.com/jlimbaugh/Witcher-3-Test-Repository/blob/review/nilf-forged-framing/docs/RELEASE-VELEN-V49.md). Sites publishes the guide in a separate deployment step. The files on `main` preserve the older R-series guide. |
| What LT is fixing | [Implementation assignment](https://github.com/jlimbaugh/Witcher-3-Test-Repository/pull/25#issuecomment-7014957770). The fix PR will carry the preview and candidate commit for retesting. |
| What failed and how to reproduce it | [LT’s v49 results](https://github.com/jlimbaugh/Witcher-3-Test-Repository/blob/af5213244960a91f239554ecb5549ab5f8ca8a60/docs/qa/v49/lt/SUMMARY.md) · [QA evidence PR #25](https://github.com/jlimbaugh/Witcher-3-Test-Repository/pull/25) |
| Reporting a problem | [Report a guide problem](https://github.com/jlimbaugh/Witcher-3-Test-Repository/issues/new?template=guide-problem.yml). Group observations from the same page in one report. |
| Preparing a fix for QA | [Fix PR template](.github/PULL_REQUEST_TEMPLATE.md). Use the same finding IDs for implementation and independent retesting. |
| Starting a session | [Session start](https://github.com/jlimbaugh/Witcher-3-Test-Repository/blob/review/nilf-forged-framing/docs/PHOENIX-SESSION-START.md) · [Calibration and approved decisions](https://github.com/jlimbaugh/Witcher-3-Test-Repository/blob/review/nilf-forged-framing/docs/SESSION-CALIBRATION.md) |
| Building a guide page | [Page template index](https://github.com/jlimbaugh/Witcher-3-Test-Repository/blob/review/nilf-forged-framing/docs/PAGE-TEMPLATE-INDEX.md) · [Approved framing examples](https://github.com/jlimbaugh/Witcher-3-Test-Repository/blob/review/nilf-forged-framing/docs/framing-review/README.md) |
| Recording a decision, defect, or test | [Copyable records and a worked example](https://github.com/jlimbaugh/Witcher-3-Test-Repository/blob/review/nilf-forged-framing/docs/SESSION-CALIBRATION.md#capture-a-decision-or-test-result) |

Use the published guide to reproduce a player’s report. Use the fix PR’s preview for candidate testing. Cite the build and finding ID so the next session can pick up the same case.

## After v49 fix acceptance

Reconcile the accepted application and current documentation onto `main` through a reviewed PR. For each Sites publication, tag the matching GitHub application commit and include the tag, Sites deployment, and rollback target in the release record.
