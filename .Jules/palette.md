## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).

## 2026-02-12 - [Accessibility] Checkbox Labels
**Learning:** `mat-checkbox` components require `aria-label` input property for accessibility, not `[attr.aria-label]`. Using `[attr.aria-label]` does not propagate to the native input element.
**Action:** Always use `[aria-label]` on `mat-checkbox` when a visible label is not present.
