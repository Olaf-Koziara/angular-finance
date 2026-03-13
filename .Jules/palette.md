## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).
## 2026-03-13 - Add Tooltips to Icon-Only Buttons
**Learning:** Icon-only buttons often have `aria-label` attributes for screen readers, but lack visible tooltips for sighted users who may not understand the icon's meaning. Adding `matTooltip` using the same translation key solves this dual accessibility/usability gap.
**Action:** When creating or reviewing icon-only buttons (like those with `mat-icon-button`), ensure they have both an `aria-label` and a `matTooltip`. Remember to import `MatTooltipModule` in the component and its tests.
