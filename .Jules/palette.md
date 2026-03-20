## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).
## 2026-03-20 - [Accessibility] Monthly Trend Chart
**Learning:** Custom interactive components (like the `div` based `.month-group` charts) built with Angular event bindings `(click)` are frequently created without native keyboard support or semantics.
**Action:** When inspecting non-native clickable elements, immediately add `role="button"`, `tabindex="0"`, `aria-label`/`aria-pressed`, and bind `(keydown.enter)` and `(keydown.space)` events. Specifically for the Spacebar keydown event, remember to call `$event.preventDefault()` to prevent unwanted page scrolling when activating the button via the keyboard.
