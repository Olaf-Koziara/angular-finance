## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).

## 2023-10-24 - [Accessibility] Action Button Tooltips
**Learning:** Action buttons in data lists (like `edit` and `delete` inside transactions) were completely comprised of icons without tooltips (`[matTooltip]`), requiring users to guess the action behind the icon.
**Action:** Always complement `[attr.aria-label]` or icon-only buttons with `[matTooltip]` to provide immediate visual feedback of functionality for sighted users too.
