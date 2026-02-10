## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).

## 2026-02-10 - [Accessibility] Mat-Checkbox Labels
**Learning:** `mat-checkbox` components require `aria-label` or `aria-labelledby` on the host element to be accessible, but in tests, accessibility assertions must target the internal `input` element (`mat-checkbox input`).
**Action:** When adding accessibility to `mat-checkbox`, ensure labels are present. When testing, query `input` inside `mat-checkbox` for attribute verification.

## 2026-02-10 - [Testing] Signal Access
**Learning:** When unit testing components using Signals (e.g. `input()`, `computed()`), access the value by invoking the signal as a function (e.g. `component.prop()`) instead of accessing property directly.
**Action:** Review test failures related to `undefined` or `function` expectations carefully when working with Signals.
