## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).
## 2024-05-22 - [Testing Material Tooltips]
**Learning:** Angular Material tooltips create duplicate DOM elements (a hidden ARIA description and the visible overlay), which causes Playwright "strict mode" violations when searching by text.
**Action:** When testing Material tooltips, target the `.mat-mdc-tooltip-surface` class or use `.first()`/`.last()` to distinguish the visual element from the ARIA description.
