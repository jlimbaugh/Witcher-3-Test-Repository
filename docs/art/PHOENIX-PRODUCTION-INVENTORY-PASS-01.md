# Phoenix Art — Production Inventory Pass 1

Date: 2026-11-22
Branch baseline: docs/phoenix-art-master-catalog
Scope: Verified asset references from Nilfgaardian framing, typography, and Velen view stylesheets. This is a partial source inventory, not an exhaustive repository tree.

## Verified source files
| Asset | Repository path | Blob SHA | Usage |
|---|---|---|---|
| Nilf rail | `dist/visual-art/nilf-forged/rail.svg` | `f8aca00b4a6d7e3e521f29e06da5956e5d38f77f` | Framing rail |
| Nilf brace | `dist/visual-art/nilf-forged/brace.svg` | `c40875774388bd0dfb41f52e423af582b398716c` | Framing brace |
| Ink rule | `dist/visual-art/ink-rule.svg` | `ecc91a28bddb5720f919c85763df275deaaaabbf` | Walkthrough heading separator |
| Silver frame | `dist/silver-frame-r15.svg` | `e9d7fed5f33af360f3d563c1057f16434166ba98` | Quest cards/art tiles |
| Silver rule | `dist/silver-rule-r15.svg` | `a03b3f791b500d3468d4d421476f0da4b13ebf4e` | Decorative rule |
| Worn vellum | `dist/worn-vellum-r15.svg` | `aa849f892f8337e7f4b28f901fa3aac84ed4f175` | Parchment surface |
| Metal surface | `dist/r10-metal.svg` | `babbce77208fdf5229dbe610ecf09f1d1e4f89b9` | Existing control material |
| Velen timber | `dist/velen-timber-r18.svg` | `ba487c026f485ae4febf34f54bea35a23ddf16e7` | Regional background |

## Referenced binary files — not yet verified
- `dist/visual-art/wolf-pointer.webp`
- `dist/curled-vellum-r16.webp`
- `dist/velen-landscape-r18.webp`

These were referenced in CSS, but the GitHub text-file fetch did not verify their bytes. Do not mark them missing without a binary-aware inventory.

## Implementation evidence
- `dist/nilf-forged.css`: Nilfgaardian hub and walkthrough framing, including rails/brace and dimensional steel button treatment.
- `dist/velen-view.css`: existing parchment, silver-framed cards, Velen backgrounds and controls.
- `dist/typography.css`: heading ink rule, reading-font controls and responsive text behavior.
- `docs/framing-review/NILF-RUNTIME-QA.md`: records pilot B1 hub/B2 walkthrough, test history, and pending browser/Safari/independent QA gates.

## Open production gates
1. Enumerate full repository art tree, including binary assets and approved reference exports.
2. Map each approved sheet/variant in the master catalog to a concrete canonical file.
3. Recover earlier button, inset, vertical ornament, and wolf approvals not fully represented in the November 22 session record.
4. Confirm file readiness, usage scope, and mobile visual acceptance; do not confuse file presence with user approval.
5. Do not alter guide styles, artwork, or release branches during inventory.
