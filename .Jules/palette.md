## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).

## 2026-02-07 - [Accessibility] Material Checkbox Labels
**Learning:** `mat-checkbox` components do not propagate `[attr.aria-label]` to the native input. They require the `[aria-label]` input property to be set explicitly for screen reader accessibility.
**Action:** Always bind `[aria-label]` (or `[aria-labelledby]`) directly as an input on `mat-checkbox`, not as an attribute.

## 2026-02-07 - [Testing] Angular Signals in Tests
**Learning:** Components using Angular Signals require updated testing patterns. Signal properties must be invoked as functions (e.g., `component.prop()`) in assertions. Mock components must use `input()` instead of `signal()` for inputs.
**Action:** Update tests to access signal values by calling them and ensure mocks match the signal-based API of the component.
