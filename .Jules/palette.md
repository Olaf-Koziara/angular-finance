## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).

## 2026-02-13 - [Accessibility] Semantic Elements for Color Pickers
**Learning:** The background picker used `div` elements for selection, making it completely inaccessible to keyboards and screen readers.
**Action:** Replaced with `button` elements using `mat-menu-item` and added `aria-label` with descriptive text ("Background 1", etc.) and visual selection indicators.
