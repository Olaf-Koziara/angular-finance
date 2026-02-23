## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).

## 2026-02-23 - [Accessibility] Icon-Only Buttons
**Learning:** Icon-only buttons (like Edit/Delete) lack context for both screen readers and mouse users.
**Action:** Always add `[attr.aria-label]` for screen readers and `[matTooltip]` for mouse users to provide accessible names and visual cues.

## 2026-02-23 - [Testing] Angular Signals in Mocks
**Learning:** When mocking a component that uses `input()` signals, the mock component must also use `input()` (e.g., `loading = input(false)`), not `signal()`. Using `signal()` causes `NG0303` errors because `signal()` properties are not bindable inputs.
**Action:** Use `input()` in mock components when the original component uses signal inputs.
