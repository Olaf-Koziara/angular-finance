## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).

## 2026-02-05 - [Testing] Mocking Signal Components
**Learning:** When overriding components in Angular tests (using `overrideComponent`), if the original component uses Signal Inputs (`input()`), the mock component MUST also use Signal Inputs. A mismatch (e.g., using `signal()` or standard property) results in `NG0303: Can't bind to 'prop' since it isn't a known property`.
**Action:** Always mirror the Input/Output API structure exactly (including Signals vs Decorators) when creating mock components for tests.
