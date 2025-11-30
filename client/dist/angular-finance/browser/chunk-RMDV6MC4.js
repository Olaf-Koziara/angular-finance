import {
  MatCommonModule,
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix,
  ObserversModule
} from "./chunk-EAXI4KKJ.js";
import {
  Router
} from "./chunk-QW7CBCHC.js";
import {
  BehaviorSubject,
  DestroyRef,
  HttpBackend,
  HttpClient,
  Injectable,
  NgModule,
  Observable,
  RuntimeError,
  assertInInjectionContext,
  assertNotInReactiveContext,
  catchError,
  computed,
  inject,
  map,
  setClassMetadata,
  signal,
  takeUntil,
  tap,
  throwError,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-NSJ5WQ4A.js";

// src/environments/environment.ts
var environment = {
  API_ORIGIN: "http://localhost:3000"
};

// src/app/features/auth/services/auth.service.ts
var ACCESS_TOKEN_KEY = "auth_access_token";
var USER_KEY = "auth_user";
var AuthService = class _AuthService {
  // Use HttpBackend to bypass interceptors for auth requests
  http = new HttpClient(inject(HttpBackend));
  router = inject(Router);
  storage = getSessionStorage();
  userSubject = new BehaviorSubject(restoreUserFromStorage(this.storage));
  user$ = this.userSubject.asObservable();
  // Flag to track if a refresh is in progress
  refreshInProgress = false;
  refreshSubject = new BehaviorSubject(false);
  login(credentials) {
    return this.http.post(`${environment.API_ORIGIN}/api/auth/login`, credentials, {
      withCredentials: true
    }).pipe(tap((response) => this.setSession(response.data)), map((response) => response.data), catchError((error) => {
      this.clearSession();
      return throwError(() => error);
    }));
  }
  register(payload) {
    return this.http.post(`${environment.API_ORIGIN}/api/auth/register`, payload, {
      withCredentials: true
      // Include cookies for refresh token
    }).pipe(tap((response) => this.setSession(response.data)), map((response) => response.data), catchError((error) => throwError(() => error)));
  }
  refreshToken() {
    if (this.refreshInProgress) {
      return new Observable((subscriber) => {
        const subscription = this.refreshSubject.subscribe((completed) => {
          if (completed) {
            const token = this.getToken();
            if (token) {
              subscriber.next({ accessToken: token });
              subscriber.complete();
            } else {
              subscriber.error(new Error("Token refresh failed"));
            }
            subscription.unsubscribe();
          }
        });
      });
    }
    this.refreshInProgress = true;
    this.refreshSubject.next(false);
    return this.http.post(`${environment.API_ORIGIN}/api/auth/refresh`, {}, {
      withCredentials: true
    }).pipe(tap((response) => {
      if (this.storage && response.data.accessToken) {
        this.storage.setItem(ACCESS_TOKEN_KEY, response.data.accessToken);
      }
      this.refreshInProgress = false;
      this.refreshSubject.next(true);
    }), map((response) => response.data), catchError((error) => {
      this.refreshInProgress = false;
      this.refreshSubject.next(true);
      this.logout();
      return throwError(() => error);
    }));
  }
  logout(redirectToLogin = true) {
    this.http.post(`${environment.API_ORIGIN}/api/auth/logout`, {}, {
      withCredentials: true
    }).subscribe({
      complete: () => {
        this.clearSession();
        if (redirectToLogin) {
          this.router.navigate(["/login"]);
        }
      },
      error: () => {
        this.clearSession();
        if (redirectToLogin) {
          this.router.navigate(["/login"]);
        }
      }
    });
  }
  getToken() {
    return this.storage?.getItem(ACCESS_TOKEN_KEY) ?? null;
  }
  getUserSnapshot() {
    return this.userSubject.value;
  }
  isAuthenticated() {
    return !!this.getToken();
  }
  hasRole(role) {
    return false;
  }
  setSession(authResult) {
    if (!this.storage) {
      return;
    }
    this.storage.setItem(ACCESS_TOKEN_KEY, authResult.accessToken);
    this.storage.setItem(USER_KEY, JSON.stringify(authResult.user));
    this.userSubject.next(authResult.user);
  }
  clearSession() {
    if (!this.storage) {
      return;
    }
    this.storage.removeItem(ACCESS_TOKEN_KEY);
    this.storage.removeItem(USER_KEY);
    this.userSubject.next(null);
  }
  static \u0275fac = function AuthService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthService, factory: _AuthService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();
function restoreUserFromStorage(storage) {
  if (!storage) {
    return null;
  }
  const rawUser = storage.getItem(USER_KEY);
  if (!rawUser) {
    return null;
  }
  try {
    return JSON.parse(rawUser);
  } catch (error) {
    storage.removeItem(USER_KEY);
    return null;
  }
}
function getSessionStorage() {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return window.sessionStorage;
  } catch (error) {
    return null;
  }
}

// node_modules/@angular/core/fesm2022/rxjs-interop.mjs
function takeUntilDestroyed(destroyRef) {
  if (!destroyRef) {
    ngDevMode && assertInInjectionContext(takeUntilDestroyed);
    destroyRef = inject(DestroyRef);
  }
  const destroyed$ = new Observable((subscriber) => {
    if (destroyRef.destroyed) {
      subscriber.next();
      return;
    }
    const unregisterFn = destroyRef.onDestroy(subscriber.next.bind(subscriber));
    return unregisterFn;
  });
  return (source) => {
    return source.pipe(takeUntil(destroyed$));
  };
}
function toSignal(source, options) {
  typeof ngDevMode !== "undefined" && ngDevMode && assertNotInReactiveContext(toSignal, "Invoking `toSignal` causes new subscriptions every time. Consider moving `toSignal` outside of the reactive context and read the signal value where needed.");
  const requiresCleanup = !options?.manualCleanup;
  if (ngDevMode && requiresCleanup && !options?.injector) {
    assertInInjectionContext(toSignal);
  }
  const cleanupRef = requiresCleanup ? options?.injector?.get(DestroyRef) ?? inject(DestroyRef) : null;
  const equal = makeToSignalEqual(options?.equal);
  let state;
  if (options?.requireSync) {
    state = signal({
      kind: 0
      /* StateKind.NoValue */
    }, { equal });
  } else {
    state = signal({ kind: 1, value: options?.initialValue }, { equal });
  }
  let destroyUnregisterFn;
  const sub = source.subscribe({
    next: (value) => state.set({ kind: 1, value }),
    error: (error) => {
      state.set({ kind: 2, error });
      destroyUnregisterFn?.();
    },
    complete: () => {
      destroyUnregisterFn?.();
    }
    // Completion of the Observable is meaningless to the signal. Signals don't have a concept of
    // "complete".
  });
  if (options?.requireSync && state().kind === 0) {
    throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
  }
  destroyUnregisterFn = cleanupRef?.onDestroy(sub.unsubscribe.bind(sub));
  return computed(() => {
    const current = state();
    switch (current.kind) {
      case 1:
        return current.value;
      case 2:
        throw current.error;
      case 0:
        throw new RuntimeError(601, (typeof ngDevMode === "undefined" || ngDevMode) && "`toSignal()` called with `requireSync` but `Observable` did not emit synchronously.");
    }
  }, { equal: options?.equal });
}
function makeToSignalEqual(userEquality = Object.is) {
  return (a, b) => a.kind === 1 && b.kind === 1 && userEquality(a.value, b.value);
}

// node_modules/@angular/material/fesm2022/form-field-module.mjs
var MatFormFieldModule = class _MatFormFieldModule {
  static \u0275fac = function MatFormFieldModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatFormFieldModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatFormFieldModule,
    imports: [MatCommonModule, ObserversModule, MatFormField, MatLabel, MatError, MatHint, MatPrefix, MatSuffix],
    exports: [MatFormField, MatLabel, MatHint, MatError, MatPrefix, MatSuffix, MatCommonModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule, ObserversModule, MatFormField, MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatFormFieldModule, [{
    type: NgModule,
    args: [{
      imports: [MatCommonModule, ObserversModule, MatFormField, MatLabel, MatError, MatHint, MatPrefix, MatSuffix],
      exports: [MatFormField, MatLabel, MatHint, MatError, MatPrefix, MatSuffix, MatCommonModule]
    }]
  }], null, null);
})();

export {
  AuthService,
  takeUntilDestroyed,
  toSignal,
  MatFormFieldModule
};
/*! Bundled license information:

@angular/core/fesm2022/rxjs-interop.mjs:
  (**
   * @license Angular v20.3.9
   * (c) 2010-2025 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-RMDV6MC4.js.map
