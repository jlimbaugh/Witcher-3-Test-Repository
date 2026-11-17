# Merchant repair slice — 2026-11-14

Baseline: 50bf4ca87bff173f5688b66839585fc6ef8734da (private diagram slice).

## Delivered
- Individual shared Willis, garrison quartermaster, and sawmill merchant pages, with access, capability, spending guidance, exact map links, cluster and quest connections, and individually linked provisional diagram leads.
- Legacy forge/service URLs resolve to those shared pages. Other existing merchant service URLs retain their regional service content.
- Quick Undo is a separate bottom-left control, starts fading immediately, and hides at 2000 ms. Wolf navigation stays available. Repeated updates restart the timer; a click invokes atomic Undo once. Durable correction controls remain after timeout. Legacy duplicate toast suppressed.
- Previous-page navigation preserves the source history entry and scroll; direct merchant visits fall back to their cluster. No saved-progress schema/key changes.

## Validation
72 automated checks pass across home, progression, Velen, and diagrams; JavaScript syntax checks pass. Browser checked all three merchant routes, old forge alias, phone-width worn presentation, forge map focus, diagram acquisition, separate quick Undo's 2-second CSS duration/left placement, expiry, unchanged wolf opacity, and durable Undo restoring the checkbox. Actual iPhone Safari field acceptance remains pending.

## Boundaries
Stock leads remain provisional. Exact merchant prices, opening hours/restock, full crafting recipes/costs and broader economy research remain unverified or parked. No claim of complete merchant inventories. No GitHub-main promotion in this private review slice.

## Accepted adjustment — 2026-11-13 (America/Chicago)
User approved the merchant slice and all other behavior. Quick Undo extended to 3000 ms, with its immediate fade stretched to three seconds. Updated boundary tests pass.
