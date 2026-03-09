## 2026-01-26 - [Reusable Confirmation Pattern]
**Learning:** Destructive actions (delete) require consistent verification. Created a reusable `ConfirmationDialogComponent` to standardize this across single and bulk operations.
**Action:** Use `ConfirmationDialogComponent` for any future destructive actions instead of window.confirm or custom implementations.
## 2025-01-25 - [Accessibility] Hidden Action Buttons
**Learning:** Action buttons in this app's lists were hidden by default (opacity: 0) and only appeared on hover. This made them invisible and confusing for keyboard users who could focus them but not see them.
**Action:** Always ensure `opacity: 0` interactive elements have a corresponding `:focus` or `:focus-visible` state that restores visibility (`opacity: 1`).

## 2024-05-15 - Missing Async Loading State and Disabled Feedback on Form Submits
**Learning:** Found an inconsistency where the login button did not disable or show a visual loading spinner during asynchronous submission (unlike the registration page). The only feedback was a text change, leaving the button active. This can cause confusing UX for slower network connections, and allows multi-submissions.
**Action:** When implementing or reviewing auth/form screens, ensure primary action buttons use both `[disabled]` and `<mat-progress-spinner>` (with `diameter="20"`) or similar indicators to clearly convey "processing" states to all users.
