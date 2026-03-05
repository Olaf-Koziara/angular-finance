## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).

## 2026-03-05 - Added Tooltips to Icon-only Buttons
**Learning:** Icon-only buttons (like edit/delete actions in tables) are visually clean but lack context for screen reader users and can be ambiguous for sighted users. Providing tooltips offers a clear affordance without cluttering the UI.
**Action:** Always add `matTooltip` (alongside `aria-label`) to icon-only buttons in data tables to ensure they are fully accessible and intuitive to all users.
