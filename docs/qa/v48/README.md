# Phoenix v48 — LT independent QA

[Master tracker #15](https://github.com/jlimbaugh/Witcher-3-Test-Repository/issues/15) · [Live guide](https://phoenix-wo-qa-1c91b66.krwpfbtbn8.chatgpt.site) · [Report template](REPORT-TEMPLATE.md) · [Coverage matrix](COVERAGE.md) · [Release record](RELEASE.md)

Audit the entire shipped guide through v48. Start from the frozen release and identify every additional build you test. The guide is still in development. Treat genuinely missing coverage as a finding or an improvement, according to what the current interface promises.

| Category | Report location | Tracking |
| --- | --- | --- |
| Art | [Art](art/README.md) | #20 |
| Navigation | [Navigation](navigation/README.md) | #22 |
| Layout | [Layout](layout/README.md) | #19, #22 |
| Accuracy of information | [Accuracy](accuracy/README.md) | #16, #21 |
| Suggestions for improvement | [Improvements](improvements/README.md) | #15 |
| Accessibility and device compatibility | [Accessibility](accessibility/README.md) | #19, #22 |
| Progress, saves and Undo | [Progress](progress/README.md) | #17 |
| Release and regressions | [Release QA](release/README.md) | #18, #21 |

Post each report as a Markdown file in its category on a PR targeting `qa/v48-lt-reviews`. Use a report comment on the relevant issue if a PR is inconvenient. Link reports from the master tracker or their specific issue. Include a final summary with coverage, open findings and retest results. Use isolated browser storage for destructive fixtures.
