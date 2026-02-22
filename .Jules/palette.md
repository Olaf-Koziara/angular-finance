## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).

## 2026-02-22 - [Accessibility] Checkbox Labels
**Learning:** Angular Material `mat-checkbox` components do not propagate `[attr.aria-label]` to the native input element. They require the `[aria-label]` input property to be set explicitly.
**Action:** Always use `[aria-label]` (not `[attr.aria-label]`) for icon-only or label-less `mat-checkbox` components to ensure screen reader accessibility.
