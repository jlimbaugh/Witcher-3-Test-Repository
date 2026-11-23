# OPERATION PHOENIX — ART ASSET CREATION & REUSE TEMPLATE v1.0

**Owner direction:** 2026-11-23. **Status:** TEMPLATE RULES LOCKED; individual mappings remain subject to source verification.  
**Authority:** [Owner Visual Authority](PHOENIX-OWNER-VISUAL-AUTHORITY.md) (ten iPhone screenshots); [Page Template Index](../PAGE-TEMPLATE-INDEX.md); [Master Catalog](PHOENIX-MASTER-ASSET-CATALOG.md).

## Principle: fixed functional components; optional six-member ornamental families

**NO CREATIVE MODE.** The original, actually rendered Velen/White Orchard artwork is the visual source. The template governs identification, extraction, reuse, sizing, naming, and usage. It does **not** authorize generating new artwork or inventing visual alternatives. When a genuinely new asset is required, stop for a separate owner authorization and approved visual reference. Do not use the rejected generated parchment mockup.

### A. FIXED — ONE SPECIFIC APPROVED TREATMENT PER FUNCTION

| Token / role | Locked usage rule | Reference from owner's screenshots | Verification gate |
|---|---|---|---|
| `PARCHMENT_READING` | Original rolled, weathered scroll reading surface; maintain original edge treatment and side ornamentation | IMG_3054, IMG_3038, IMG_3033 | Identify canonical file/CSS, exact crop and selector |
| `PARCHMENT_INSET` | Original pale inset reading/objective panel; only where existing UI uses inset | IMG_3088, IMG_3033 | Source and selector match |
| `PARCHMENT_MENU` | Original cream accordion header with thin metal double rim and circular +/- | IMG_3102, IMG_3056, IMG_3033 | Source, states and dimensions |
| `TYPE_BODY` | Existing Velen/WO reading body style; no replacement typeface or invented size | IMG_3102, IMG_3088 | Actual font and computed size |
| `TYPE_HEADING` | Existing calligraphic quest and section heading hierarchy | IMG_3054, IMG_3088 | CSS selector by heading role |
| `TYPE_OBJECTIVE` | Existing objective labels, numbers and step instructions | IMG_3088, IMG_3038 | CSS selector and readable scaling |
| `TYPE_META` | Existing small-caps labels, progress and secondary status | IMG_3038, IMG_3042 | CSS selector |
| `BUTTON_PRIMARY_ILLUSTRATED` | Existing dark framed wide illustrated action | IMG_3054, IMG_3058 | Actual background/frame and state |
| `BUTTON_FORGED_ACTION` | Existing steel/blue-gray raised beveled action; use by semantic role, not random styling | IMG_3088, IMG_3056 | Actual CSS/assets and interaction states |
| `BUTTON_SECONDARY` | Existing compact steel text button; aligned peer sizes | IMG_3054 | Actual CSS/assets |
| `BUTTON_PROGRESS` | Existing Record/Undo treatment, including distinct enabled/disabled states | IMG_3056 | Preserve state semantics |
| `MENU_ACCORDION` | Original cream bordered menu with circular green +/- | IMG_3058, IMG_3033 | Open/closed states, 44px targets |
| `CARD_QUEST` | Existing illustrated tarot/quest card, silver filigree and label plates | IMG_3042 | Source-specific art and frame |
| `CARD_SHORTCUT` | Existing illustrated region/merchant/field-reference tile | IMG_3043, IMG_3030 | Source-specific art and frame |
| `OBJECTIVE_RAIL` | Existing horizontal carousel, wolf marker, checkbox card and progress summary | IMG_3038, IMG_3033 | Scroll/selection/progress behavior |
| `NAV_WOLF` | Existing detailed silver wolf medallion, floating navigation control | IMG_3054, IMG_3030 | Source and positioning |
| `MAP_UI` | Existing map panel, place labels and approved control roles | IMG_3030, IMG_3058 | Functional map audit; no invented cartography |

**Fixed** means one canonical component **per semantic function**; it does not mean all button functions or all parchment uses must look identical. Preserve the differences visibly present in the source screenshots.

### B. VARIANT FAMILIES — SIX WHEN USEFUL, NEVER SIX BY FORCE

Only **nonfunctional decorative treatments** may rotate within an approved family: bottom flourishes, decorative corner accents, side ornaments, and separators. Existing variants remain subject to source identification. A family may contain 1, 3, 6, 9, 10 or 12 existing approved members; **do not discard already-approved variants solely to force six**. For a future owner-authorized family, prefer a sheet of six for efficient review. A functional menu, typography or button role never receives random variations.

- Six-member batch labels: `FAMILY-01` … `FAMILY-06`. Numbering is **not approval**.
- Existing B1–B10, V1–V9 and A–J are historical approval references, **not automatically production-ready exports**. Their prior rotations remain documented; current production use requires the exact screenshot-compatible source and owner confirmation. No new B/V/A variants are authorized by this template.
- Use stable deterministic assignment (page ID / component ID) rather than random on reload. Keep mirrored rail pairs together; never place ornaments over text, controls or touch targets.
- Variant differences may be **ornamental only**. They must not change component height, width, contrast, label typography, hit area, interactive state or layout.

### C. REQUIRED ASSET CARD (COPY FOR EACH VERIFIED ASSET)

```yaml
asset_id: PENDING
family: PENDING
role_token: PENDING
variant_id: FIXED # or existing approved member ID
approval: SOURCE_MATCH_PENDING # SOURCE_MATCHED | OWNER_ACCEPTED | RETIRED
screenshot_reference: PENDING
source_file: PENDING
source_blob_sha: PENDING
source_selector: PENDING # CSS-native components stay CSS-native
format: PENDING
dimensions_or_viewbox: PENDING
transparent_or_background: PENDING
runtime_routes: []
interaction_states: [] # default, hover, focus, pressed, disabled, open, closed, selected as applicable
mobile_portrait_verified: false
mobile_landscape_verified: false
physical_safari_accepted: false
dependencies: []
sha256: PENDING
notes: PENDING
```

### D. EXTRACTION AND PRODUCTION GATES

1. **Locate:** match an owner screenshot element to exact original Velen/WO source file and controlling CSS; capture SHA and route. Unknown = `BLOCKED — SOURCE UNRESOLVED`.
2. **Classify:** assign exactly one fixed functional role or an approved decorative family; avoid ambiguous multi-purpose aliases.
3. **Normalize technically, not artistically:** preserve source pixels/vector paths and CSS appearance; only make lossless packaging, deterministic references, shared sizing tokens or verified CSS deduplication. No invented textures, recoloring, edge redraw, new font metrics or simulated metal.
4. **Compare:** before/after actual runtime screenshots at phone portrait and landscape; check card borders, scroll edges, wrapping, states and safe areas.
5. **Accept:** owner reviews exact runtime match; physical Safari acceptance separate from headless QA.
6. **Prune:** build explicit dependency graph and proposed deletion manifest. No removal of files still used by published, review or rollback paths. **Delete only after per-file owner approval**, on an isolated branch, with rollback verified.

### E. REQUIRED PER-PAGE USAGE MAP

Record `page_type`, `reference_route`, `parchment_role`, `body_style`, `heading_style`, `menu_role`, `button_roles`, `card_roles`, `decorative_family_and_variant`, `navigation_role`, `source_file_paths`, `qa_status`. Page types include Region Console, Quest Hub, Walkthrough, Activity/Discovery, Map, Field Reference and Progress. Use the existing [Page Template Index](../PAGE-TEMPLATE-INDEX.md) for behavior; this document governs art reuse only.

## STOP

This document **locks the template methodology**, not unresolved file mappings or any newly invented artwork. No CSS/runtime/asset edits, deletions, merges or publication. Published V49/V50 frozen; Nilf Order 014 separate. No creative generation unless the owner explicitly changes this rule.
