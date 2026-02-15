## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).
## 2026-02-15 - [Accessibility] Checkbox Labels
**Learning:** `mat-checkbox` components in data tables were missing accessible labels, making it impossible for screen reader users to know what they were selecting (all rows vs single row). Used `[aria-label]` with `translate` pipe to provide context.
**Action:** Always ensure checkboxes in tables have unique `aria-label`s, especially when visible labels are absent.
