## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).
## 2026-02-25 - [Accessibility] Material Checkbox Labels
**Learning:** Angular Material `mat-checkbox` requires `[aria-label]` input binding for accessibility. Using `[attr.aria-label]` places the label on the host element, which is less optimal than the native input.
**Action:** Use `[aria-label]="..."` binding for all `mat-checkbox` elements.

## 2026-02-25 - [Testing] Angular Signals & Material
**Learning:** When testing components with Signals, always invoke them as functions (e.g., `component.prop()`). Also, avoid `ng-reflect-*` checks for Material components as they are unreliable; check directive instances or CSS classes instead.
**Action:** Update testing patterns to strictly access Signals as functions and query directive instances for state verification.
