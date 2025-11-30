import {
  TextFieldModule
} from "./chunk-L6PFYFIQ.js";
import {
  AuthService,
  MatFormFieldModule,
  takeUntilDestroyed
} from "./chunk-RMDV6MC4.js";
import {
  DefaultValueAccessor,
  FormControlName,
  FormGroupDirective,
  MatButton,
  MatButtonModule,
  MatLabel,
  NgControlStatus,
  NgControlStatusGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-EAXI4KKJ.js";
import {
  ActivatedRoute,
  Router,
  RouterLink
} from "./chunk-QW7CBCHC.js";
import {
  CommonModule,
  Component,
  DestroyRef,
  NgIf,
  finalize,
  inject,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-NSJ5WQ4A.js";

// src/app/features/auth/pages/login/login.component.ts
var _c0 = () => ["/register"];
function LoginComponent_Conditional_8_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 8);
    \u0275\u0275text(1, "Email is required");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 8);
    \u0275\u0275text(1, "Wrong email");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LoginComponent_Conditional_8_Conditional_0_Template, 2, 0, "small", 8);
    \u0275\u0275conditionalCreate(1, LoginComponent_Conditional_8_Conditional_1_Template, 2, 0, "small", 8);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional((ctx_r0.email == null ? null : ctx_r0.email.errors == null ? null : ctx_r0.email.errors["required"]) ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.email == null ? null : ctx_r0.email.errors == null ? null : ctx_r0.email.errors["email"]) ? 1 : -1);
  }
}
function LoginComponent_Conditional_13_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 8);
    \u0275\u0275text(1, "Password is required");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_13_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 8);
    \u0275\u0275text(1, "Minimum length is 6");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_13_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "small", 8);
    \u0275\u0275text(1, "Maximum length is 20");
    \u0275\u0275elementEnd();
  }
}
function LoginComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275conditionalCreate(0, LoginComponent_Conditional_13_Conditional_0_Template, 2, 0, "small", 8);
    \u0275\u0275conditionalCreate(1, LoginComponent_Conditional_13_Conditional_1_Template, 2, 0, "small", 8);
    \u0275\u0275conditionalCreate(2, LoginComponent_Conditional_13_Conditional_2_Template, 2, 0, "small", 8);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275conditional((ctx_r0.password == null ? null : ctx_r0.password.errors == null ? null : ctx_r0.password.errors["required"]) ? 0 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.password == null ? null : ctx_r0.password.errors == null ? null : ctx_r0.password.errors["minlength"]) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional((ctx_r0.password == null ? null : ctx_r0.password.errors == null ? null : ctx_r0.password.errors["maxlength"]) ? 2 : -1);
  }
}
function LoginComponent_p_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 8);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r0.error());
  }
}
var LoginComponent = class _LoginComponent {
  fb = inject(NonNullableFormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);
  loading = signal(false, ...ngDevMode ? [{ debugName: "loading" }] : []);
  error = signal(null, ...ngDevMode ? [{ debugName: "error" }] : []);
  form = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
  });
  ngOnInit() {
  }
  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }
  submit() {
    this.form.updateValueAndValidity();
    if (this.form.invalid) {
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") ?? "/";
    this.authService.login(this.form.getRawValue()).pipe(takeUntilDestroyed(this.destroyRef), finalize(() => this.loading.set(false))).subscribe({
      next: () => {
        this.router.navigateByUrl(returnUrl || "/");
      },
      error: (err) => {
        const message = err?.error?.message || "Unable to sign in. Try again later.";
        this.error.set(message);
      }
    });
  }
  static \u0275fac = function LoginComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LoginComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LoginComponent, selectors: [["app-login"]], decls: 19, vars: 7, consts: [["data-testid", "login", 1, "auth-container"], [3, "ngSubmit", "formGroup"], [1, "form-field"], ["type", "email", "formControlName", "email", "autocomplete", "username"], ["type", "password", "formControlName", "password", "autocomplete", "current-password"], ["matButton", "elevated", "type", "submit"], ["matButton", "elevated", 3, "routerLink"], ["class", "error", 4, "ngIf"], [1, "error"]], template: function LoginComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "h1");
      \u0275\u0275text(2, "Sign in");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "form", 1);
      \u0275\u0275listener("ngSubmit", function LoginComponent_Template_form_ngSubmit_3_listener() {
        return ctx.submit();
      });
      \u0275\u0275elementStart(4, "label", 2)(5, "span");
      \u0275\u0275text(6, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275element(7, "input", 3);
      \u0275\u0275conditionalCreate(8, LoginComponent_Conditional_8_Template, 2, 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "label", 2)(10, "mat-label");
      \u0275\u0275text(11, "Password");
      \u0275\u0275elementEnd();
      \u0275\u0275element(12, "input", 4);
      \u0275\u0275conditionalCreate(13, LoginComponent_Conditional_13_Template, 3, 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "button", 5);
      \u0275\u0275text(15);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "a", 6);
      \u0275\u0275text(17, "Register");
      \u0275\u0275elementEnd();
      \u0275\u0275template(18, LoginComponent_p_18_Template, 2, 1, "p", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275property("formGroup", ctx.form);
      \u0275\u0275advance(5);
      \u0275\u0275conditional((ctx.email == null ? null : ctx.email.touched) && (ctx.email == null ? null : ctx.email.invalid) ? 8 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275conditional((ctx.password == null ? null : ctx.password.touched) && (ctx.password == null ? null : ctx.password.invalid) ? 13 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" ", ctx.loading() ? "logging in?" : "Login", " ");
      \u0275\u0275advance();
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(6, _c0));
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.error());
    }
  }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName, MatButtonModule, MatButton, RouterLink, MatFormFieldModule, MatLabel, TextFieldModule], styles: ["\n\n.auth-container[_ngcontent-%COMP%] {\n  max-width: 360px;\n  margin: 0 auto;\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\nform[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.form-field[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\ninput[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  border: 1px solid #d0d5dd;\n  border-radius: 0.5rem;\n  font-size: 1rem;\n}\ninput[aria-invalid=true][_ngcontent-%COMP%] {\n  border-color: #f97066;\n}\nbutton[_ngcontent-%COMP%] {\n  padding: 0.75rem;\n  border-radius: 0.5rem;\n  border: none;\n  background: #155eef;\n  color: white;\n  font-weight: 600;\n  cursor: pointer;\n}\nbutton[disabled][_ngcontent-%COMP%] {\n  background: #94a3b8;\n  cursor: not-allowed;\n}\n.error[_ngcontent-%COMP%] {\n  color: #f97066;\n}\n/*# sourceMappingURL=login.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(LoginComponent, [{
    type: Component,
    args: [{ selector: "app-login", standalone: true, imports: [CommonModule, ReactiveFormsModule, MatButtonModule, RouterLink, MatFormFieldModule, MatLabel, TextFieldModule], template: `<section class="auth-container" data-testid="login">
  <h1>Sign in</h1>

  <form [formGroup]="form"  (ngSubmit)="submit()">
    <label class="form-field">
      <span>Email</span>
      <input
        type="email"
        formControlName="email"
        autocomplete="username"
        >
        @if(email?.touched && email?.invalid){
          @if(email?.errors?.['required']){
            <small class="error">Email is required</small>
          }
          @if(email?.errors?.['email']){
            <small class="error">Wrong email</small>
          }
        }
    </label>

    <label class="form-field">
      <mat-label>Password</mat-label>
      <input
        type="password"
        formControlName="password"
        autocomplete="current-password"
      />
      @if(password?.touched && password?.invalid){
        @if(password?.errors?.['required']){
          <small class="error">Password is required</small>
        }
        @if(password?.errors?.['minlength']){
          <small class="error">Minimum length is 6</small>
        }
        @if(password?.errors?.['maxlength']){
          <small class="error">Maximum length is 20</small>
        }
      }
    </label>

    <button matButton="elevated" type="submit">
      {{ loading() ? 'logging in?' : 'Login' }}
    </button>
  </form>
  <a matButton="elevated" [routerLink]="['/register']">Register</a>

  <p class="error" *ngIf="error()">{{ error() }}</p>
</section>
`, styles: ["/* src/app/features/auth/pages/login/login.component.scss */\n.auth-container {\n  max-width: 360px;\n  margin: 0 auto;\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1.5rem;\n}\nform {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.form-field {\n  display: flex;\n  flex-direction: column;\n  gap: 0.5rem;\n}\ninput {\n  padding: 0.75rem;\n  border: 1px solid #d0d5dd;\n  border-radius: 0.5rem;\n  font-size: 1rem;\n}\ninput[aria-invalid=true] {\n  border-color: #f97066;\n}\nbutton {\n  padding: 0.75rem;\n  border-radius: 0.5rem;\n  border: none;\n  background: #155eef;\n  color: white;\n  font-weight: 600;\n  cursor: pointer;\n}\nbutton[disabled] {\n  background: #94a3b8;\n  cursor: not-allowed;\n}\n.error {\n  color: #f97066;\n}\n/*# sourceMappingURL=login.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LoginComponent, { className: "LoginComponent", filePath: "src/app/features/auth/pages/login/login.component.ts", lineNumber: 19 });
})();
export {
  LoginComponent
};
//# sourceMappingURL=chunk-DTIJRTLR.js.map
