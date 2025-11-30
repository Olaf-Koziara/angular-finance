import {
  SidebarComponent
} from "./chunk-LWCRV5M5.js";
import "./chunk-273QOBHI.js";
import "./chunk-FSBXJBV3.js";
import "./chunk-2M23OOSM.js";
import "./chunk-RMDV6MC4.js";
import "./chunk-EAXI4KKJ.js";
import {
  RouterOutlet
} from "./chunk-QW7CBCHC.js";
import {
  Component,
  setClassMetadata,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart
} from "./chunk-NSJ5WQ4A.js";

// src/app/core/layout/authenticated-template/authenticated-template.ts
var AuthenticatedTemplateComponent = class _AuthenticatedTemplateComponent {
  static \u0275fac = function AuthenticatedTemplateComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuthenticatedTemplateComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AuthenticatedTemplateComponent, selectors: [["authenticated-template"]], decls: 2, vars: 0, template: function AuthenticatedTemplateComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "app-sidebar");
      \u0275\u0275element(1, "router-outlet");
      \u0275\u0275elementEnd();
    }
  }, dependencies: [RouterOutlet, SidebarComponent], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AuthenticatedTemplateComponent, [{
    type: Component,
    args: [{ selector: "authenticated-template", imports: [RouterOutlet, SidebarComponent], template: "<app-sidebar>\n    <router-outlet></router-outlet>\n</app-sidebar> " }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AuthenticatedTemplateComponent, { className: "AuthenticatedTemplateComponent", filePath: "src/app/core/layout/authenticated-template/authenticated-template.ts", lineNumber: 10 });
})();
export {
  AuthenticatedTemplateComponent
};
//# sourceMappingURL=chunk-D3MA6SJK.js.map
