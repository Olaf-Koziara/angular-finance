import {
  RouterLink
} from "./chunk-QW7CBCHC.js";
import {
  CommonModule,
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-NSJ5WQ4A.js";

// src/app/features/unauthorized/unauthorized.component.ts
var UnauthorizedComponent = class _UnauthorizedComponent {
  static \u0275fac = function UnauthorizedComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _UnauthorizedComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _UnauthorizedComponent, selectors: [["app-unauthorized"]], decls: 7, vars: 0, consts: [["data-testid", "unauthorized", 1, "unauthorized"], ["routerLink", "/", 1, "link"]], template: function UnauthorizedComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "section", 0)(1, "h1");
      \u0275\u0275text(2, "Unauthorized");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p");
      \u0275\u0275text(4, "You do not have permission to access this area.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "a", 1);
      \u0275\u0275text(6, "Back to dashboard");
      \u0275\u0275elementEnd()();
    }
  }, dependencies: [CommonModule, RouterLink], styles: ["\n\n.unauthorized[_ngcontent-%COMP%] {\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.link[_ngcontent-%COMP%] {\n  color: #155eef;\n  text-decoration: underline;\n}\n/*# sourceMappingURL=unauthorized.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(UnauthorizedComponent, [{
    type: Component,
    args: [{ selector: "app-unauthorized", standalone: true, imports: [CommonModule, RouterLink], template: `
    <section class="unauthorized" data-testid="unauthorized">
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this area.</p>
      <a routerLink="/" class="link">Back to dashboard</a>
    </section>
  `, styles: ["/* angular:styles/component:scss;cdd36774fcc92f75b8fd881c13df58b39216f458ae77e56ccba431b2c37cce7a;/home/runner/work/angular-finance/angular-finance/client/src/app/features/unauthorized/unauthorized.component.ts */\n.unauthorized {\n  padding: 2rem;\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n.link {\n  color: #155eef;\n  text-decoration: underline;\n}\n/*# sourceMappingURL=unauthorized.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(UnauthorizedComponent, { className: "UnauthorizedComponent", filePath: "src/app/features/unauthorized/unauthorized.component.ts", lineNumber: 32 });
})();
export {
  UnauthorizedComponent
};
//# sourceMappingURL=chunk-6XSWKXPL.js.map
