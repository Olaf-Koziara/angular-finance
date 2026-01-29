## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).

## 2026-01-29 - [Form Accessibility & Affordance]
**Learning:** `mat-button-toggle-group` lacks inherent context for screen readers. Explicitly linking it to a visible label via `aria-labelledby` ensures users know *what* they are toggling. Also, character count hints on text inputs provide immediate, non-intrusive feedback that prevents validation frustration.
**Action:** Always verify `aria-labelledby` on group inputs (radio, toggle) and include character counters for fixed-length text fields.
