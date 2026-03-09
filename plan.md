1. **Understand the Goal**: Find ONE micro-UX improvement that makes the interface more intuitive, accessible, or pleasant to use. Keep changes under 50 lines.
2. **Identify Opportunity**: Looking at `client/src/app/features/auth/pages/login/login.component.html`, the "Login" button just has text `{{ loading() ? 'logging in?' : 'Login' }}`. We can add a loading spinner to the login button during the async submit, making it consistent with the register page, and adding `[disabled]="loading() || form.invalid"` to prevent multiple clicks. This gives visual feedback to the user and improves the interaction.
3. **Execution**:
    - Add `MatProgressSpinnerModule` to `imports` in `client/src/app/features/auth/pages/login/login.component.ts`.
    - Modify the login button in `client/src/app/features/auth/pages/login/login.component.html` to include the `<mat-progress-spinner>` when `loading()` is true.
    - Add `[disabled]="loading() || form.invalid"` to the login button.
4. **Pre-commit Steps**: Call `pre_commit_instructions` and follow its instructions to ensure proper testing, verification, review, and reflection are done.
5. **Submit**: Create PR.
