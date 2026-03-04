## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).
## 2026-01-26 - [Interactive Chart Bars Keyboard Accessibility]
**Learning:** Interactive visual elements like div-based chart bars (e.g., in MonthlyTrendChartComponent) that have click events but no native semantic `button` roles are inaccessible to keyboard users and screen readers.
**Action:** Add `role="button"`, `tabindex="0"`, dynamic `aria-label`s, a `:focus-visible` state outline, and map `keydown.enter` and `keydown.space` events to the click handler to make custom visual elements fully accessible.
