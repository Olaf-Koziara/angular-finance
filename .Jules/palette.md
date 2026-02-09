## 2026-02-09 - [Accessible Charts]
**Learning:** Custom SVG or div-based charts are often inaccessible to keyboard and screen reader users. The Monthly Trend Chart was completely skipped by keyboard navigation.
**Action:** When creating custom interactive visualizations, always add `role="button"` (or appropriate role), `tabindex="0"`, and `aria-label` summarizing the data point to the interactive container. Ensure `:focus-visible` styles are distinct.

## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.

## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).
