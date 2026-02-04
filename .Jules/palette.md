## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).
## 2026-02-04 - [Testing] Angular Material Checkbox Accessibility
**Learning:** When testing `mat-checkbox` accessibility, the `aria-label` attribute is applied to the internal native `<input>` element, not the host `<mat-checkbox>` element. Tests must query `mat-checkbox input` to verify ARIA attributes.
**Action:** Always verify `aria-label` on the native input when testing accessible Material components.
