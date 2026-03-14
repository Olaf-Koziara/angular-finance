## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).
## 2024-05-18 - Clickable div accessibility
**Learning:** Found interactive elements (like `div.month-group` and `div.background-item`) that relied on `(click)` handlers but lacked keyboard support and ARIA semantics. Angular components without explicit roles and keyboard event handlers drop accessibility for keyboard-only and screen reader users. Also learned that when handling `(keydown.space)` in an angular app, it's critical to include `$event.preventDefault()` to prevent the page from scrolling down when interacting with the element.
**Action:** When adding `(click)` to non-button elements, ensure they either use native `<button>` or include `role="button"`, `tabindex="0"`, `aria-label`, and handle both `(keydown.enter)` and `(keydown.space)`. For spacebar handlers, explicitly call `$event.preventDefault()`.
