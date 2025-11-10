import './polyfills.server.mjs';
import {
  MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER,
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle,
  MatChip,
  MatChipsModule,
  MatTooltip,
  TooltipComponent
} from "./chunk-RDUSKQAM.mjs";
import {
  A11yModule,
  CdkScrollableModule,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  CommonModule,
  Component,
  DOCUMENT,
  ElementRef,
  EventEmitter,
  InjectionToken,
  Input,
  MatButtonModule,
  MatCommonModule,
  MatIcon,
  MatIconButton,
  MatIconModule,
  NgModule,
  NgZone,
  Output,
  OverlayModule,
  Renderer2,
  TranslateModule,
  TranslatePipe,
  ViewEncapsulation,
  _getAnimationsState,
  computed,
  inject,
  input,
  numberAttribute,
  setClassMetadata,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-PXB7AALO.mjs";
import "./chunk-T2KOBY73.mjs";

// node_modules/@angular/material/fesm2022/progress-bar.mjs
function MatProgressBar_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275domElement(0, "div", 2);
  }
}
var MAT_PROGRESS_BAR_DEFAULT_OPTIONS = new InjectionToken("MAT_PROGRESS_BAR_DEFAULT_OPTIONS");
var MAT_PROGRESS_BAR_LOCATION = new InjectionToken("mat-progress-bar-location", {
  providedIn: "root",
  factory: MAT_PROGRESS_BAR_LOCATION_FACTORY
});
function MAT_PROGRESS_BAR_LOCATION_FACTORY() {
  const _document = inject(DOCUMENT);
  const _location = _document ? _document.location : null;
  return {
    // Note that this needs to be a function, rather than a property, because Angular
    // will only resolve it once, but we want the current path on each call.
    getPathname: () => _location ? _location.pathname + _location.search : ""
  };
}
var MatProgressBar = class _MatProgressBar {
  _elementRef = inject(ElementRef);
  _ngZone = inject(NgZone);
  _changeDetectorRef = inject(ChangeDetectorRef);
  _renderer = inject(Renderer2);
  _cleanupTransitionEnd;
  constructor() {
    const animationsState = _getAnimationsState();
    const defaults = inject(MAT_PROGRESS_BAR_DEFAULT_OPTIONS, {
      optional: true
    });
    this._isNoopAnimation = animationsState === "di-disabled";
    if (animationsState === "reduced-motion") {
      this._elementRef.nativeElement.classList.add("mat-progress-bar-reduced-motion");
    }
    if (defaults) {
      if (defaults.color) {
        this.color = this._defaultColor = defaults.color;
      }
      this.mode = defaults.mode || this.mode;
    }
  }
  /** Flag that indicates whether NoopAnimations mode is set to true. */
  _isNoopAnimation;
  // TODO: should be typed as `ThemePalette` but internal apps pass in arbitrary strings.
  /**
   * Theme color of the progress bar. This API is supported in M2 themes only, it
   * has no effect in M3 themes. For color customization in M3, see https://material.angular.dev/components/progress-bar/styling.
   *
   * For information on applying color variants in M3, see
   * https://material.angular.dev/guide/material-2-theming#optional-add-backwards-compatibility-styles-for-color-variants
   */
  get color() {
    return this._color || this._defaultColor;
  }
  set color(value) {
    this._color = value;
  }
  _color;
  _defaultColor = "primary";
  /** Value of the progress bar. Defaults to zero. Mirrored to aria-valuenow. */
  get value() {
    return this._value;
  }
  set value(v) {
    this._value = clamp(v || 0);
    this._changeDetectorRef.markForCheck();
  }
  _value = 0;
  /** Buffer value of the progress bar. Defaults to zero. */
  get bufferValue() {
    return this._bufferValue || 0;
  }
  set bufferValue(v) {
    this._bufferValue = clamp(v || 0);
    this._changeDetectorRef.markForCheck();
  }
  _bufferValue = 0;
  /**
   * Event emitted when animation of the primary progress bar completes. This event will not
   * be emitted when animations are disabled, nor will it be emitted for modes with continuous
   * animations (indeterminate and query).
   */
  animationEnd = new EventEmitter();
  /**
   * Mode of the progress bar.
   *
   * Input must be one of these values: determinate, indeterminate, buffer, query, defaults to
   * 'determinate'.
   * Mirrored to mode attribute.
   */
  get mode() {
    return this._mode;
  }
  set mode(value) {
    this._mode = value;
    this._changeDetectorRef.markForCheck();
  }
  _mode = "determinate";
  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      this._cleanupTransitionEnd = this._renderer.listen(this._elementRef.nativeElement, "transitionend", this._transitionendHandler);
    });
  }
  ngOnDestroy() {
    this._cleanupTransitionEnd?.();
  }
  /** Gets the transform style that should be applied to the primary bar. */
  _getPrimaryBarTransform() {
    return `scaleX(${this._isIndeterminate() ? 1 : this.value / 100})`;
  }
  /** Gets the `flex-basis` value that should be applied to the buffer bar. */
  _getBufferBarFlexBasis() {
    return `${this.mode === "buffer" ? this.bufferValue : 100}%`;
  }
  /** Returns whether the progress bar is indeterminate. */
  _isIndeterminate() {
    return this.mode === "indeterminate" || this.mode === "query";
  }
  /** Event handler for `transitionend` events. */
  _transitionendHandler = (event) => {
    if (this.animationEnd.observers.length === 0 || !event.target || !event.target.classList.contains("mdc-linear-progress__primary-bar")) {
      return;
    }
    if (this.mode === "determinate" || this.mode === "buffer") {
      this._ngZone.run(() => this.animationEnd.next({
        value: this.value
      }));
    }
  };
  static \u0275fac = function MatProgressBar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatProgressBar)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
    type: _MatProgressBar,
    selectors: [["mat-progress-bar"]],
    hostAttrs: ["role", "progressbar", "aria-valuemin", "0", "aria-valuemax", "100", "tabindex", "-1", 1, "mat-mdc-progress-bar", "mdc-linear-progress"],
    hostVars: 10,
    hostBindings: function MatProgressBar_HostBindings(rf, ctx) {
      if (rf & 2) {
        \u0275\u0275attribute("aria-valuenow", ctx._isIndeterminate() ? null : ctx.value)("mode", ctx.mode);
        \u0275\u0275classMap("mat-" + ctx.color);
        \u0275\u0275classProp("_mat-animation-noopable", ctx._isNoopAnimation)("mdc-linear-progress--animation-ready", !ctx._isNoopAnimation)("mdc-linear-progress--indeterminate", ctx._isIndeterminate());
      }
    },
    inputs: {
      color: "color",
      value: [2, "value", "value", numberAttribute],
      bufferValue: [2, "bufferValue", "bufferValue", numberAttribute],
      mode: "mode"
    },
    outputs: {
      animationEnd: "animationEnd"
    },
    exportAs: ["matProgressBar"],
    decls: 7,
    vars: 5,
    consts: [["aria-hidden", "true", 1, "mdc-linear-progress__buffer"], [1, "mdc-linear-progress__buffer-bar"], [1, "mdc-linear-progress__buffer-dots"], ["aria-hidden", "true", 1, "mdc-linear-progress__bar", "mdc-linear-progress__primary-bar"], [1, "mdc-linear-progress__bar-inner"], ["aria-hidden", "true", 1, "mdc-linear-progress__bar", "mdc-linear-progress__secondary-bar"]],
    template: function MatProgressBar_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275domElementStart(0, "div", 0);
        \u0275\u0275domElement(1, "div", 1);
        \u0275\u0275conditionalCreate(2, MatProgressBar_Conditional_2_Template, 1, 0, "div", 2);
        \u0275\u0275domElementEnd();
        \u0275\u0275domElementStart(3, "div", 3);
        \u0275\u0275domElement(4, "span", 4);
        \u0275\u0275domElementEnd();
        \u0275\u0275domElementStart(5, "div", 5);
        \u0275\u0275domElement(6, "span", 4);
        \u0275\u0275domElementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275styleProp("flex-basis", ctx._getBufferBarFlexBasis());
        \u0275\u0275advance();
        \u0275\u0275conditional(ctx.mode === "buffer" ? 2 : -1);
        \u0275\u0275advance();
        \u0275\u0275styleProp("transform", ctx._getPrimaryBarTransform());
      }
    },
    styles: [".mat-mdc-progress-bar{--mat-progress-bar-animation-multiplier: 1;display:block;text-align:start}.mat-mdc-progress-bar[mode=query]{transform:scaleX(-1)}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner{animation:none}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar{transition:transform 1ms}.mat-progress-bar-reduced-motion{--mat-progress-bar-animation-multiplier: 2}.mdc-linear-progress{position:relative;width:100%;transform:translateZ(0);outline:1px solid rgba(0,0,0,0);overflow-x:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:max(var(--mat-progress-bar-track-height, 4px),var(--mat-progress-bar-active-indicator-height, 4px))}@media(forced-colors: active){.mdc-linear-progress{outline-color:CanvasText}}.mdc-linear-progress__bar{position:absolute;top:0;bottom:0;margin:auto 0;width:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:var(--mat-progress-bar-active-indicator-height, 4px)}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}[dir=rtl] .mdc-linear-progress__bar{right:0;transform-origin:center right}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top-style:solid;border-color:var(--mat-progress-bar-active-indicator-color, var(--mat-sys-primary));border-top-width:var(--mat-progress-bar-active-indicator-height, 4px)}.mdc-linear-progress__buffer{display:flex;position:absolute;top:0;bottom:0;margin:auto 0;width:100%;overflow:hidden;height:var(--mat-progress-bar-track-height, 4px);border-radius:var(--mat-progress-bar-track-shape, var(--mat-sys-corner-none))}.mdc-linear-progress__buffer-dots{background-image:radial-gradient(circle, var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant)) calc(var(--mat-progress-bar-track-height, 4px) / 2), transparent 0);background-repeat:repeat-x;background-size:calc(calc(var(--mat-progress-bar-track-height, 4px) / 2)*5);background-position:left;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering calc(250ms*var(--mat-progress-bar-animation-multiplier)) infinite linear}@media(forced-colors: active){.mdc-linear-progress__buffer-dots{background-color:ButtonBorder}}[dir=rtl] .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse calc(250ms*var(--mat-progress-bar-animation-multiplier)) infinite linear;transform:rotate(0)}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);background-color:var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant))}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}.mdc-linear-progress__secondary-bar{display:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;display:block}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(calc(var(--mat-progress-bar-track-height, 4px) * -2.5))}}@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%)}100%{transform:translateX(-200.611057%)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%)}100%{transform:translateX(-160.277782%)}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}\n"],
    encapsulation: 2,
    changeDetection: 0
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatProgressBar, [{
    type: Component,
    args: [{
      selector: "mat-progress-bar",
      exportAs: "matProgressBar",
      host: {
        "role": "progressbar",
        "aria-valuemin": "0",
        "aria-valuemax": "100",
        // set tab index to -1 so screen readers will read the aria-label
        // Note: there is a known issue with JAWS that does not read progressbar aria labels on FireFox
        "tabindex": "-1",
        "[attr.aria-valuenow]": "_isIndeterminate() ? null : value",
        "[attr.mode]": "mode",
        "class": "mat-mdc-progress-bar mdc-linear-progress",
        "[class]": '"mat-" + color',
        "[class._mat-animation-noopable]": "_isNoopAnimation",
        "[class.mdc-linear-progress--animation-ready]": "!_isNoopAnimation",
        "[class.mdc-linear-progress--indeterminate]": "_isIndeterminate()"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      encapsulation: ViewEncapsulation.None,
      template: `<!--
  All children need to be hidden for screen readers in order to support ChromeVox.
  More context in the issue: https://github.com/angular/components/issues/22165.
-->
<div class="mdc-linear-progress__buffer" aria-hidden="true">
  <div
    class="mdc-linear-progress__buffer-bar"
    [style.flex-basis]="_getBufferBarFlexBasis()"></div>
  <!-- Remove the dots outside of buffer mode since they can cause CSP issues (see #28938) -->
  @if (mode === 'buffer') {
    <div class="mdc-linear-progress__buffer-dots"></div>
  }
</div>
<div
  class="mdc-linear-progress__bar mdc-linear-progress__primary-bar"
  aria-hidden="true"
  [style.transform]="_getPrimaryBarTransform()">
  <span class="mdc-linear-progress__bar-inner"></span>
</div>
<div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar" aria-hidden="true">
  <span class="mdc-linear-progress__bar-inner"></span>
</div>
`,
      styles: [".mat-mdc-progress-bar{--mat-progress-bar-animation-multiplier: 1;display:block;text-align:start}.mat-mdc-progress-bar[mode=query]{transform:scaleX(-1)}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner{animation:none}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar{transition:transform 1ms}.mat-progress-bar-reduced-motion{--mat-progress-bar-animation-multiplier: 2}.mdc-linear-progress{position:relative;width:100%;transform:translateZ(0);outline:1px solid rgba(0,0,0,0);overflow-x:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:max(var(--mat-progress-bar-track-height, 4px),var(--mat-progress-bar-active-indicator-height, 4px))}@media(forced-colors: active){.mdc-linear-progress{outline-color:CanvasText}}.mdc-linear-progress__bar{position:absolute;top:0;bottom:0;margin:auto 0;width:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:var(--mat-progress-bar-active-indicator-height, 4px)}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}[dir=rtl] .mdc-linear-progress__bar{right:0;transform-origin:center right}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top-style:solid;border-color:var(--mat-progress-bar-active-indicator-color, var(--mat-sys-primary));border-top-width:var(--mat-progress-bar-active-indicator-height, 4px)}.mdc-linear-progress__buffer{display:flex;position:absolute;top:0;bottom:0;margin:auto 0;width:100%;overflow:hidden;height:var(--mat-progress-bar-track-height, 4px);border-radius:var(--mat-progress-bar-track-shape, var(--mat-sys-corner-none))}.mdc-linear-progress__buffer-dots{background-image:radial-gradient(circle, var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant)) calc(var(--mat-progress-bar-track-height, 4px) / 2), transparent 0);background-repeat:repeat-x;background-size:calc(calc(var(--mat-progress-bar-track-height, 4px) / 2)*5);background-position:left;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering calc(250ms*var(--mat-progress-bar-animation-multiplier)) infinite linear}@media(forced-colors: active){.mdc-linear-progress__buffer-dots{background-color:ButtonBorder}}[dir=rtl] .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse calc(250ms*var(--mat-progress-bar-animation-multiplier)) infinite linear;transform:rotate(0)}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);background-color:var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant))}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}.mdc-linear-progress__secondary-bar{display:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;display:block}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(calc(var(--mat-progress-bar-track-height, 4px) * -2.5))}}@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%)}100%{transform:translateX(-200.611057%)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%)}100%{transform:translateX(-160.277782%)}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}\n"]
    }]
  }], () => [], {
    color: [{
      type: Input
    }],
    value: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    bufferValue: [{
      type: Input,
      args: [{
        transform: numberAttribute
      }]
    }],
    animationEnd: [{
      type: Output
    }],
    mode: [{
      type: Input
    }]
  });
})();
function clamp(v, min = 0, max = 100) {
  return Math.max(min, Math.min(max, v));
}
var MatProgressBarModule = class _MatProgressBarModule {
  static \u0275fac = function MatProgressBarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatProgressBarModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatProgressBarModule,
    imports: [MatProgressBar],
    exports: [MatProgressBar, MatCommonModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    imports: [MatCommonModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatProgressBarModule, [{
    type: NgModule,
    args: [{
      imports: [MatProgressBar],
      exports: [MatProgressBar, MatCommonModule]
    }]
  }], null, null);
})();

// src/app/features/dashboard/utils/format.utils.ts
function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);
}
function formatPercentage(value) {
  return `${value > 0 ? "+" : ""}${value.toFixed(1)}%`;
}

// src/app/features/dashboard/components/financial-summary-card/financial-summary-card.component.ts
function FinancialSummaryCardComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 7)(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275classProp("positive", (ctx_r0.card().trend ?? 0) > 0)("negative", (ctx_r0.card().trend ?? 0) < 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((ctx_r0.card().trend ?? 0) > 0 ? "trending_up" : "trending_down");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", ctx_r0.card().trend > 0 ? "+" : "", "", ctx_r0.card().trend, "%");
  }
}
function FinancialSummaryCardComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-bar", 6);
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275property("value", ctx_r0.card().budgetUsage);
  }
}
var FinancialSummaryCardComponent = class _FinancialSummaryCardComponent {
  card = input.required(...ngDevMode ? [{ debugName: "card" }] : []);
  hovered = signal(false, ...ngDevMode ? [{ debugName: "hovered" }] : []);
  formatCurrency = formatCurrency;
  getFormattedValue() {
    const card = this.card();
    if (card.type === "budget") {
      return `${card.value}%`;
    }
    return formatCurrency(card.value);
  }
  onHover(hover) {
    this.hovered.set(hover);
  }
  static \u0275fac = function FinancialSummaryCardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FinancialSummaryCardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FinancialSummaryCardComponent, selectors: [["app-financial-summary-card"]], inputs: { card: [1, "card"] }, decls: 13, vars: 11, consts: [[1, "summary-card", 3, "mouseenter", "mouseleave"], [1, "card-icon"], [1, "card-details"], [1, "card-label"], [1, "card-value"], [1, "trend-indicator", 3, "positive", "negative"], ["mode", "determinate", 1, "budget-progress", 3, "value"], [1, "trend-indicator"]], template: function FinancialSummaryCardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-card", 0);
      \u0275\u0275listener("mouseenter", function FinancialSummaryCardComponent_Template_mat_card_mouseenter_0_listener() {
        return ctx.onHover(true);
      })("mouseleave", function FinancialSummaryCardComponent_Template_mat_card_mouseleave_0_listener() {
        return ctx.onHover(false);
      });
      \u0275\u0275elementStart(1, "mat-card-content")(2, "div", 1)(3, "mat-icon");
      \u0275\u0275text(4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 2)(6, "p", 3);
      \u0275\u0275text(7);
      \u0275\u0275pipe(8, "translate");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "h2", 4);
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275conditionalCreate(11, FinancialSummaryCardComponent_Conditional_11_Template, 5, 7, "div", 5);
      \u0275\u0275conditionalCreate(12, FinancialSummaryCardComponent_Conditional_12_Template, 1, 1, "mat-progress-bar", 6);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275classProp("hovered", ctx.hovered());
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.card().type + "-icon");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.card().icon);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 9, ctx.card().label));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.getFormattedValue());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.card().trend !== void 0 ? 11 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.card().budgetUsage !== void 0 ? 12 : -1);
    }
  }, dependencies: [MatCardModule, MatCard, MatCardContent, MatIconModule, MatIcon, MatProgressBarModule, MatProgressBar, TranslateModule, TranslatePipe], styles: ["\n\n.summary-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  cursor: pointer;\n  overflow: hidden;\n}\n.summary-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n.summary-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  padding: 24px !important;\n}\n.summary-card[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%] {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n}\n.summary-card[_ngcontent-%COMP%]   .card-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n  color: white;\n}\n.summary-card[_ngcontent-%COMP%]   .balance-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n}\n.summary-card[_ngcontent-%COMP%]   .income-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4caf50 0%,\n      #8bc34a 100%);\n}\n.summary-card[_ngcontent-%COMP%]   .expenses-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f44336 0%,\n      #e91e63 100%);\n}\n.summary-card[_ngcontent-%COMP%]   .budget-icon[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ff9800 0%,\n      #ff5722 100%);\n}\n.summary-card[_ngcontent-%COMP%]   .card-details[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.summary-card[_ngcontent-%COMP%]   .card-label[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 0.875rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.summary-card[_ngcontent-%COMP%]   .card-value[_ngcontent-%COMP%] {\n  margin: 0 0 8px 0;\n  font-size: 2rem;\n  font-weight: 700;\n  color: #333;\n}\n.summary-card[_ngcontent-%COMP%]   .trend-indicator[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n.summary-card[_ngcontent-%COMP%]   .trend-indicator[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.summary-card[_ngcontent-%COMP%]   .trend-indicator.positive[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n.summary-card[_ngcontent-%COMP%]   .trend-indicator.negative[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.summary-card[_ngcontent-%COMP%]   .budget-progress[_ngcontent-%COMP%] {\n  margin-top: 8px;\n  height: 8px;\n  border-radius: 4px;\n}\n/*# sourceMappingURL=financial-summary-card.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(FinancialSummaryCardComponent, [{
    type: Component,
    args: [{ selector: "app-financial-summary-card", standalone: true, imports: [MatCardModule, MatIconModule, MatProgressBarModule, TranslateModule], template: `<mat-card
  class="summary-card"
  [class.hovered]="hovered()"
  (mouseenter)="onHover(true)"
  (mouseleave)="onHover(false)">
  <mat-card-content>
    <div class="card-icon" [class]="card().type + '-icon'">
      <mat-icon>{{ card().icon }}</mat-icon>
    </div>
    <div class="card-details">
      <p class="card-label">{{ card().label | translate }}</p>
      <h2 class="card-value">{{ getFormattedValue() }}</h2>
      @if (card().trend !== undefined) {
        <div class="trend-indicator" [class.positive]="(card().trend ?? 0) > 0" [class.negative]="(card().trend ?? 0) < 0">
          <mat-icon>{{ (card().trend ?? 0) > 0 ? 'trending_up' : 'trending_down' }}</mat-icon>
          <span>{{ card().trend! > 0 ? '+' : '' }}{{ card().trend }}%</span>
        </div>
      }
      @if (card().budgetUsage !== undefined) {
        <mat-progress-bar
          mode="determinate"
          [value]="card().budgetUsage"
          class="budget-progress"></mat-progress-bar>
      }
    </div>
  </mat-card-content>
</mat-card>

`, styles: ["/* src/app/features/dashboard/components/financial-summary-card/financial-summary-card.component.scss */\n.summary-card {\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  cursor: pointer;\n  overflow: hidden;\n}\n.summary-card:hover {\n  transform: translateY(-8px);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n.summary-card mat-card-content {\n  display: flex;\n  align-items: center;\n  gap: 20px;\n  padding: 24px !important;\n}\n.summary-card .card-icon {\n  width: 64px;\n  height: 64px;\n  border-radius: 50%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: all 0.3s ease;\n}\n.summary-card .card-icon mat-icon {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n  color: white;\n}\n.summary-card .balance-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n}\n.summary-card .income-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #4caf50 0%,\n      #8bc34a 100%);\n}\n.summary-card .expenses-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #f44336 0%,\n      #e91e63 100%);\n}\n.summary-card .budget-icon {\n  background:\n    linear-gradient(\n      135deg,\n      #ff9800 0%,\n      #ff5722 100%);\n}\n.summary-card .card-details {\n  flex: 1;\n  min-width: 0;\n}\n.summary-card .card-label {\n  margin: 0 0 8px 0;\n  color: rgba(0, 0, 0, 0.6);\n  font-size: 0.875rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.5px;\n}\n.summary-card .card-value {\n  margin: 0 0 8px 0;\n  font-size: 2rem;\n  font-weight: 700;\n  color: #333;\n}\n.summary-card .trend-indicator {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.875rem;\n  font-weight: 600;\n}\n.summary-card .trend-indicator mat-icon {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.summary-card .trend-indicator.positive {\n  color: #4caf50;\n}\n.summary-card .trend-indicator.negative {\n  color: #f44336;\n}\n.summary-card .budget-progress {\n  margin-top: 8px;\n  height: 8px;\n  border-radius: 4px;\n}\n/*# sourceMappingURL=financial-summary-card.component.css.map */\n"] }]
  }], null, { card: [{ type: Input, args: [{ isSignal: true, alias: "card", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FinancialSummaryCardComponent, { className: "FinancialSummaryCardComponent", filePath: "src/app/features/dashboard/components/financial-summary-card/financial-summary-card.component.ts", lineNumber: 24 });
})();

// src/app/features/dashboard/components/trends-section/trends-section.component.ts
var _forTrack0 = ($index, $item) => $item.label;
function TrendsSectionComponent_For_10_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const trend_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", trend_r1.value, "% ");
  }
}
function TrendsSectionComponent_For_10_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const trend_r1 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatCurrency(trend_r1.value), " ");
  }
}
function TrendsSectionComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 3)(1, "p", 4);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 5)(5, "span", 6);
    \u0275\u0275conditionalCreate(6, TrendsSectionComponent_For_10_Conditional_6_Template, 1, 1)(7, TrendsSectionComponent_For_10_Conditional_7_Template, 1, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 7)(9, "mat-icon");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const trend_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("positive", trend_r1.change > 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 8, trend_r1.label));
    \u0275\u0275advance(4);
    \u0275\u0275conditional(trend_r1.label.includes("RATE") ? 6 : 7);
    \u0275\u0275advance(2);
    \u0275\u0275classProp("negative", trend_r1.change < 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(trend_r1.change > 0 ? "arrow_upward" : "arrow_downward");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatPercentage(trend_r1.change), " ");
  }
}
var TrendsSectionComponent = class _TrendsSectionComponent {
  trends = input.required(...ngDevMode ? [{ debugName: "trends" }] : []);
  formatCurrency = formatCurrency;
  formatPercentage = formatPercentage;
  static \u0275fac = function TrendsSectionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TrendsSectionComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _TrendsSectionComponent, selectors: [["app-trends-section"]], inputs: { trends: [1, "trends"] }, decls: 11, vars: 3, consts: [[1, "trends-card"], [1, "trends-grid"], [1, "trend-item", 3, "positive"], [1, "trend-item"], [1, "trend-label"], [1, "trend-value-row"], [1, "trend-value"], [1, "trend-change"]], template: function TrendsSectionComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-card", 0)(1, "mat-card-header")(2, "mat-card-title")(3, "mat-icon");
      \u0275\u0275text(4, "trending_up");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5);
      \u0275\u0275pipe(6, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-card-content")(8, "div", 1);
      \u0275\u0275repeaterCreate(9, TrendsSectionComponent_For_10_Template, 12, 10, "div", 2, _forTrack0);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 1, "DASHBOARD.TRENDS"), " ");
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.trends());
    }
  }, dependencies: [MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatIconModule, MatIcon, TranslateModule, TranslatePipe], styles: ["\n\n.trends-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s ease;\n}\n.trends-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n.trends-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  padding: 16px 24px;\n  border-radius: 12px 12px 0 0;\n  margin: -16px -16px 16px -16px;\n}\n.trends-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n.trends-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.trends-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 24px !important;\n}\n.trends-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 24px;\n}\n.trend-item[_ngcontent-%COMP%] {\n  padding: 20px;\n  background: #f5f5f5;\n  border-radius: 8px;\n  border-left: 4px solid #4caf50;\n  transition: all 0.3s ease;\n}\n.trend-item[_ngcontent-%COMP%]:hover {\n  transform: translateX(8px);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.trend-item.positive[_ngcontent-%COMP%] {\n  border-left-color: #4caf50;\n}\n.trend-item[_ngcontent-%COMP%]   .trend-label[_ngcontent-%COMP%] {\n  margin: 0 0 12px 0;\n  font-size: 0.875rem;\n  color: rgba(0, 0, 0, 0.6);\n  font-weight: 500;\n}\n.trend-item[_ngcontent-%COMP%]   .trend-value-row[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}\n.trend-item[_ngcontent-%COMP%]   .trend-value[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #333;\n}\n.trend-item[_ngcontent-%COMP%]   .trend-change[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #4caf50;\n  padding: 4px 8px;\n  background: rgba(76, 175, 80, 0.1);\n  border-radius: 4px;\n}\n.trend-item[_ngcontent-%COMP%]   .trend-change[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.trend-item[_ngcontent-%COMP%]   .trend-change.negative[_ngcontent-%COMP%] {\n  color: #f44336;\n  background: rgba(244, 67, 54, 0.1);\n}\n/*# sourceMappingURL=trends-section.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrendsSectionComponent, [{
    type: Component,
    args: [{ selector: "app-trends-section", standalone: true, imports: [MatCardModule, MatIconModule, TranslateModule], template: `<mat-card class="trends-card">
  <mat-card-header>
    <mat-card-title>
      <mat-icon>trending_up</mat-icon>
      {{ 'DASHBOARD.TRENDS' | translate }}
    </mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <div class="trends-grid">
      @for (trend of trends(); track trend.label) {
        <div class="trend-item" [class.positive]="trend.change > 0">
          <p class="trend-label">{{ trend.label | translate }}</p>
          <div class="trend-value-row">
            <span class="trend-value">
              @if (trend.label.includes('RATE')) {
                {{ trend.value }}%
              } @else {
                {{ formatCurrency(trend.value) }}
              }
            </span>
            <span class="trend-change" [class.negative]="trend.change < 0">
              <mat-icon>{{ trend.change > 0 ? 'arrow_upward' : 'arrow_downward' }}</mat-icon>
              {{ formatPercentage(trend.change) }}
            </span>
          </div>
        </div>
      }
    </div>
  </mat-card-content>
</mat-card>

`, styles: ["/* src/app/features/dashboard/components/trends-section/trends-section.component.scss */\n.trends-card {\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s ease;\n}\n.trends-card:hover {\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n.trends-card mat-card-header {\n  background:\n    linear-gradient(\n      135deg,\n      #667eea 0%,\n      #764ba2 100%);\n  color: white;\n  padding: 16px 24px;\n  border-radius: 12px 12px 0 0;\n  margin: -16px -16px 16px -16px;\n}\n.trends-card mat-card-header mat-card-title {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n.trends-card mat-card-header mat-card-title mat-icon {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.trends-card mat-card-content {\n  padding: 24px !important;\n}\n.trends-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 24px;\n}\n.trend-item {\n  padding: 20px;\n  background: #f5f5f5;\n  border-radius: 8px;\n  border-left: 4px solid #4caf50;\n  transition: all 0.3s ease;\n}\n.trend-item:hover {\n  transform: translateX(8px);\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n}\n.trend-item.positive {\n  border-left-color: #4caf50;\n}\n.trend-item .trend-label {\n  margin: 0 0 12px 0;\n  font-size: 0.875rem;\n  color: rgba(0, 0, 0, 0.6);\n  font-weight: 500;\n}\n.trend-item .trend-value-row {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 12px;\n}\n.trend-item .trend-value {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: #333;\n}\n.trend-item .trend-change {\n  display: flex;\n  align-items: center;\n  gap: 4px;\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: #4caf50;\n  padding: 4px 8px;\n  background: rgba(76, 175, 80, 0.1);\n  border-radius: 4px;\n}\n.trend-item .trend-change mat-icon {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.trend-item .trend-change.negative {\n  color: #f44336;\n  background: rgba(244, 67, 54, 0.1);\n}\n/*# sourceMappingURL=trends-section.component.css.map */\n"] }]
  }], null, { trends: [{ type: Input, args: [{ isSignal: true, alias: "trends", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(TrendsSectionComponent, { className: "TrendsSectionComponent", filePath: "src/app/features/dashboard/components/trends-section/trends-section.component.ts", lineNumber: 15 });
})();

// src/app/features/dashboard/components/budget-chart/budget-chart.component.ts
var _forTrack02 = ($index, $item) => $item.name;
function BudgetChartComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "span", 4);
    \u0275\u0275text(3);
    \u0275\u0275pipe(4, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 5);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 6)(8, "div", 7)(9, "span", 8);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const category_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 8, category_r1.name));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r1.formatCurrency(category_r1.spent), " / ", ctx_r1.formatCurrency(category_r1.budget), " ");
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", category_r1.percentage > 100 ? 100 : category_r1.percentage, "%")("background-color", category_r1.color);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", category_r1.percentage.toFixed(0), "%");
  }
}
var BudgetChartComponent = class _BudgetChartComponent {
  categories = input.required(...ngDevMode ? [{ debugName: "categories" }] : []);
  formatCurrency = formatCurrency;
  static \u0275fac = function BudgetChartComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BudgetChartComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BudgetChartComponent, selectors: [["app-budget-chart"]], inputs: { categories: [1, "categories"] }, decls: 11, vars: 3, consts: [[1, "chart-card", "budget-chart-card"], [1, "budget-chart"], [1, "budget-category-item"], [1, "category-header"], [1, "category-name"], [1, "category-value"], [1, "category-bar-container"], [1, "category-bar"], [1, "bar-percentage"]], template: function BudgetChartComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-card", 0)(1, "mat-card-header")(2, "mat-card-title")(3, "mat-icon");
      \u0275\u0275text(4, "donut_large");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5);
      \u0275\u0275pipe(6, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-card-content")(8, "div", 1);
      \u0275\u0275repeaterCreate(9, BudgetChartComponent_For_10_Template, 11, 10, "div", 2, _forTrack02);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 1, "DASHBOARD.BUDGET_USAGE"), " ");
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.categories());
    }
  }, dependencies: [MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatIconModule, MatIcon, TranslateModule, TranslatePipe], styles: ["\n\n.chart-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s ease;\n}\n.chart-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n.chart-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #2196f3 0%,\n      #21cbf3 100%);\n  color: white;\n  padding: 16px 24px;\n  border-radius: 12px 12px 0 0;\n  margin: -16px -16px 16px -16px;\n}\n.chart-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n.chart-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.chart-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 24px !important;\n}\n.budget-chart[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.budget-category-item[_ngcontent-%COMP%]   .category-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n  font-size: 0.875rem;\n}\n.budget-category-item[_ngcontent-%COMP%]   .category-header[_ngcontent-%COMP%]   .category-name[_ngcontent-%COMP%] {\n  font-weight: 600;\n  color: #333;\n}\n.budget-category-item[_ngcontent-%COMP%]   .category-header[_ngcontent-%COMP%]   .category-value[_ngcontent-%COMP%] {\n  color: rgba(0, 0, 0, 0.6);\n  font-weight: 500;\n}\n.budget-category-item[_ngcontent-%COMP%]   .category-bar-container[_ngcontent-%COMP%] {\n  height: 32px;\n  background: #e0e0e0;\n  border-radius: 16px;\n  overflow: hidden;\n  position: relative;\n}\n.budget-category-item[_ngcontent-%COMP%]   .category-bar[_ngcontent-%COMP%] {\n  height: 100%;\n  border-radius: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 0 12px;\n  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.budget-category-item[_ngcontent-%COMP%]   .category-bar[_ngcontent-%COMP%]   .bar-percentage[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: white;\n  position: relative;\n  z-index: 1;\n}\n.budget-category-item[_ngcontent-%COMP%]:hover   .category-bar[_ngcontent-%COMP%] {\n  filter: brightness(1.1);\n  transform: scaleX(1.02);\n}\n/*# sourceMappingURL=budget-chart.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BudgetChartComponent, [{
    type: Component,
    args: [{ selector: "app-budget-chart", standalone: true, imports: [MatCardModule, MatIconModule, TranslateModule], template: `<mat-card class="chart-card budget-chart-card">
  <mat-card-header>
    <mat-card-title>
      <mat-icon>donut_large</mat-icon>
      {{ 'DASHBOARD.BUDGET_USAGE' | translate }}
    </mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <div class="budget-chart">
      @for (category of categories(); track category.name) {
        <div class="budget-category-item">
          <div class="category-header">
            <span class="category-name">{{ category.name | translate }}</span>
            <span class="category-value">
              {{ formatCurrency(category.spent) }} / {{ formatCurrency(category.budget) }}
            </span>
          </div>
          <div class="category-bar-container">
            <div
              class="category-bar"
              [style.width.%]="category.percentage > 100 ? 100 : category.percentage"
              [style.background-color]="category.color">
              <span class="bar-percentage">{{ category.percentage.toFixed(0) }}%</span>
            </div>
          </div>
        </div>
      }
    </div>
  </mat-card-content>
</mat-card>

`, styles: ["/* src/app/features/dashboard/components/budget-chart/budget-chart.component.scss */\n.chart-card {\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s ease;\n}\n.chart-card:hover {\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n.chart-card mat-card-header {\n  background:\n    linear-gradient(\n      135deg,\n      #2196f3 0%,\n      #21cbf3 100%);\n  color: white;\n  padding: 16px 24px;\n  border-radius: 12px 12px 0 0;\n  margin: -16px -16px 16px -16px;\n}\n.chart-card mat-card-header mat-card-title {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n.chart-card mat-card-header mat-card-title mat-icon {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.chart-card mat-card-content {\n  padding: 24px !important;\n}\n.budget-chart {\n  display: flex;\n  flex-direction: column;\n  gap: 20px;\n}\n.budget-category-item .category-header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 8px;\n  font-size: 0.875rem;\n}\n.budget-category-item .category-header .category-name {\n  font-weight: 600;\n  color: #333;\n}\n.budget-category-item .category-header .category-value {\n  color: rgba(0, 0, 0, 0.6);\n  font-weight: 500;\n}\n.budget-category-item .category-bar-container {\n  height: 32px;\n  background: #e0e0e0;\n  border-radius: 16px;\n  overflow: hidden;\n  position: relative;\n}\n.budget-category-item .category-bar {\n  height: 100%;\n  border-radius: 16px;\n  display: flex;\n  align-items: center;\n  justify-content: flex-end;\n  padding: 0 12px;\n  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);\n}\n.budget-category-item .category-bar .bar-percentage {\n  font-size: 0.75rem;\n  font-weight: 700;\n  color: white;\n  position: relative;\n  z-index: 1;\n}\n.budget-category-item:hover .category-bar {\n  filter: brightness(1.1);\n  transform: scaleX(1.02);\n}\n/*# sourceMappingURL=budget-chart.component.css.map */\n"] }]
  }], null, { categories: [{ type: Input, args: [{ isSignal: true, alias: "categories", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BudgetChartComponent, { className: "BudgetChartComponent", filePath: "src/app/features/dashboard/components/budget-chart/budget-chart.component.ts", lineNumber: 15 });
})();

// node_modules/@angular/material/fesm2022/tooltip-module.mjs
var MatTooltipModule = class _MatTooltipModule {
  static \u0275fac = function MatTooltipModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MatTooltipModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
    type: _MatTooltipModule,
    imports: [A11yModule, OverlayModule, MatCommonModule, MatTooltip, TooltipComponent],
    exports: [MatTooltip, TooltipComponent, MatCommonModule, CdkScrollableModule]
  });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
    providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER],
    imports: [A11yModule, OverlayModule, MatCommonModule, MatCommonModule, CdkScrollableModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MatTooltipModule, [{
    type: NgModule,
    args: [{
      imports: [A11yModule, OverlayModule, MatCommonModule, MatTooltip, TooltipComponent],
      exports: [MatTooltip, TooltipComponent, MatCommonModule, CdkScrollableModule],
      providers: [MAT_TOOLTIP_SCROLL_STRATEGY_FACTORY_PROVIDER]
    }]
  }], null, null);
})();

// src/app/features/dashboard/components/monthly-trend-chart/monthly-trend-chart.component.ts
var _forTrack03 = ($index, $item) => $item.month;
function MonthlyTrendChartComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 8);
    \u0275\u0275listener("click", function MonthlyTrendChartComponent_For_11_Template_div_click_0_listener() {
      const \u0275$index_18_r2 = \u0275\u0275restoreView(_r1).$index;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onMonthSelect(\u0275$index_18_r2));
    });
    \u0275\u0275elementStart(1, "div", 9)(2, "div", 10)(3, "span", 11);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 12)(6, "span", 11);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "span", 13);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "translate");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const data_r4 = ctx.$implicit;
    const \u0275$index_18_r2 = ctx.$index;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classProp("selected", ctx_r2.selectedMonth() === \u0275$index_18_r2);
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("height", data_r4.income / 1e4 * 100, "%");
    \u0275\u0275property("matTooltip", "Income: " + ctx_r2.formatCurrency(data_r4.income));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(data_r4.income));
    \u0275\u0275advance();
    \u0275\u0275styleProp("height", data_r4.expenses / 1e4 * 100, "%");
    \u0275\u0275property("matTooltip", "Expenses: " + ctx_r2.formatCurrency(data_r4.expenses));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(data_r4.expenses));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(10, 11, data_r4.month));
  }
}
var MonthlyTrendChartComponent = class _MonthlyTrendChartComponent {
  monthlyData = input.required(...ngDevMode ? [{ debugName: "monthlyData" }] : []);
  selectedMonth = signal(5, ...ngDevMode ? [{ debugName: "selectedMonth" }] : []);
  formatCurrency = formatCurrency;
  onMonthSelect(index) {
    this.selectedMonth.set(index);
  }
  static \u0275fac = function MonthlyTrendChartComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MonthlyTrendChartComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _MonthlyTrendChartComponent, selectors: [["app-monthly-trend-chart"]], inputs: { monthlyData: [1, "monthlyData"] }, decls: 23, vars: 9, consts: [[1, "chart-card", "monthly-chart-card"], [1, "monthly-chart"], [1, "chart-bars"], [1, "month-group", 3, "selected"], [1, "chart-legend"], [1, "legend-item"], [1, "legend-color", "income-color"], [1, "legend-color", "expenses-color"], [1, "month-group", 3, "click"], [1, "bars-container"], [1, "bar", "income-bar", 3, "matTooltip"], [1, "bar-label"], [1, "bar", "expenses-bar", 3, "matTooltip"], [1, "month-label"]], template: function MonthlyTrendChartComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-card", 0)(1, "mat-card-header")(2, "mat-card-title")(3, "mat-icon");
      \u0275\u0275text(4, "show_chart");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5);
      \u0275\u0275pipe(6, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-card-content")(8, "div", 1)(9, "div", 2);
      \u0275\u0275repeaterCreate(10, MonthlyTrendChartComponent_For_11_Template, 11, 13, "div", 3, _forTrack03);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 4)(13, "div", 5);
      \u0275\u0275element(14, "span", 6);
      \u0275\u0275elementStart(15, "span");
      \u0275\u0275text(16);
      \u0275\u0275pipe(17, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 5);
      \u0275\u0275element(19, "span", 7);
      \u0275\u0275elementStart(20, "span");
      \u0275\u0275text(21);
      \u0275\u0275pipe(22, "translate");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 3, "DASHBOARD.MONTHLY_TREND"), " ");
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.monthlyData());
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(17, 5, "DASHBOARD.INCOME"));
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(22, 7, "DASHBOARD.EXPENSES"));
    }
  }, dependencies: [MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatIconModule, MatIcon, MatTooltipModule, MatTooltip, TranslateModule, TranslatePipe], styles: ["\n\n.chart-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s ease;\n}\n.chart-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n.chart-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #2196f3 0%,\n      #21cbf3 100%);\n  color: white;\n  padding: 16px 24px;\n  border-radius: 12px 12px 0 0;\n  margin: -16px -16px 16px -16px;\n}\n.chart-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n.chart-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.chart-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 24px !important;\n}\n.monthly-chart[_ngcontent-%COMP%]   .chart-bars[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  height: 300px;\n  gap: 12px;\n  margin-bottom: 24px;\n  padding: 20px 0;\n}\n@media (max-width: 768px) {\n  .monthly-chart[_ngcontent-%COMP%]   .chart-bars[_ngcontent-%COMP%] {\n    height: 250px;\n    gap: 8px;\n  }\n}\n.monthly-chart[_ngcontent-%COMP%]   .month-group[_ngcontent-%COMP%] {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.monthly-chart[_ngcontent-%COMP%]   .month-group[_ngcontent-%COMP%]:hover {\n  transform: translateY(-8px);\n}\n.monthly-chart[_ngcontent-%COMP%]   .month-group.selected[_ngcontent-%COMP%]   .bars-container[_ngcontent-%COMP%] {\n  transform: scale(1.05);\n}\n.monthly-chart[_ngcontent-%COMP%]   .month-group.selected[_ngcontent-%COMP%]   .month-label[_ngcontent-%COMP%] {\n  color: #3f51b5;\n  font-weight: 700;\n}\n.monthly-chart[_ngcontent-%COMP%]   .month-group[_ngcontent-%COMP%]   .bars-container[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 6px;\n  align-items: flex-end;\n  height: 100%;\n  transition: all 0.3s ease;\n}\n.monthly-chart[_ngcontent-%COMP%]   .month-group[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%] {\n  width: 30px;\n  min-height: 10px;\n  border-radius: 8px 8px 0 0;\n  position: relative;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  overflow: hidden;\n}\n@media (max-width: 768px) {\n  .monthly-chart[_ngcontent-%COMP%]   .month-group[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%] {\n    width: 20px;\n  }\n}\n.monthly-chart[_ngcontent-%COMP%]   .month-group[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]:hover {\n  filter: brightness(1.2);\n  transform: scaleY(1.05);\n}\n.monthly-chart[_ngcontent-%COMP%]   .month-group[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]   .bar-label[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -25px;\n  left: 50%;\n  transform: translateX(-50%);\n  font-size: 0.65rem;\n  font-weight: 600;\n  white-space: nowrap;\n  opacity: 0;\n  transition: opacity 0.3s ease;\n  background: rgba(0, 0, 0, 0.8);\n  color: white;\n  padding: 4px 8px;\n  border-radius: 4px;\n}\n@media (max-width: 768px) {\n  .monthly-chart[_ngcontent-%COMP%]   .month-group[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]   .bar-label[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.monthly-chart[_ngcontent-%COMP%]   .month-group[_ngcontent-%COMP%]   .bar[_ngcontent-%COMP%]:hover   .bar-label[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.monthly-chart[_ngcontent-%COMP%]   .month-group[_ngcontent-%COMP%]   .income-bar[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      #4caf50 0%,\n      #8bc34a 100%);\n}\n.monthly-chart[_ngcontent-%COMP%]   .month-group[_ngcontent-%COMP%]   .expenses-bar[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      180deg,\n      #f44336 0%,\n      #e91e63 100%);\n}\n.monthly-chart[_ngcontent-%COMP%]   .month-group[_ngcontent-%COMP%]   .month-label[_ngcontent-%COMP%] {\n  margin-top: 12px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.7);\n  transition: all 0.3s ease;\n}\n.monthly-chart[_ngcontent-%COMP%]   .chart-legend[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: center;\n  gap: 32px;\n  padding: 16px;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n.monthly-chart[_ngcontent-%COMP%]   .chart-legend[_ngcontent-%COMP%]   .legend-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #333;\n}\n.monthly-chart[_ngcontent-%COMP%]   .chart-legend[_ngcontent-%COMP%]   .legend-item[_ngcontent-%COMP%]   .legend-color[_ngcontent-%COMP%] {\n  width: 16px;\n  height: 16px;\n  border-radius: 4px;\n}\n.monthly-chart[_ngcontent-%COMP%]   .chart-legend[_ngcontent-%COMP%]   .legend-item[_ngcontent-%COMP%]   .income-color[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #4caf50 0%,\n      #8bc34a 100%);\n}\n.monthly-chart[_ngcontent-%COMP%]   .chart-legend[_ngcontent-%COMP%]   .legend-item[_ngcontent-%COMP%]   .expenses-color[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #f44336 0%,\n      #e91e63 100%);\n}\n/*# sourceMappingURL=monthly-trend-chart.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MonthlyTrendChartComponent, [{
    type: Component,
    args: [{ selector: "app-monthly-trend-chart", standalone: true, imports: [MatCardModule, MatIconModule, MatTooltipModule, TranslateModule], template: `<mat-card class="chart-card monthly-chart-card">
  <mat-card-header>
    <mat-card-title>
      <mat-icon>show_chart</mat-icon>
      {{ 'DASHBOARD.MONTHLY_TREND' | translate }}
    </mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <div class="monthly-chart">
      <div class="chart-bars">
        @for (data of monthlyData(); track data.month; let i = $index) {
          <div
            class="month-group"
            (click)="onMonthSelect(i)"
            [class.selected]="selectedMonth() === i">
            <div class="bars-container">
              <div
                class="bar income-bar"
                [style.height.%]="(data.income / 10000) * 100"
                [matTooltip]="'Income: ' + formatCurrency(data.income)">
                <span class="bar-label">{{ formatCurrency(data.income) }}</span>
              </div>
              <div
                class="bar expenses-bar"
                [style.height.%]="(data.expenses / 10000) * 100"
                [matTooltip]="'Expenses: ' + formatCurrency(data.expenses)">
                <span class="bar-label">{{ formatCurrency(data.expenses) }}</span>
              </div>
            </div>
            <span class="month-label">{{ data.month | translate }}</span>
          </div>
        }
      </div>
      <div class="chart-legend">
        <div class="legend-item">
          <span class="legend-color income-color"></span>
          <span>{{ 'DASHBOARD.INCOME' | translate }}</span>
        </div>
        <div class="legend-item">
          <span class="legend-color expenses-color"></span>
          <span>{{ 'DASHBOARD.EXPENSES' | translate }}</span>
        </div>
      </div>
    </div>
  </mat-card-content>
</mat-card>

`, styles: ["/* src/app/features/dashboard/components/monthly-trend-chart/monthly-trend-chart.component.scss */\n.chart-card {\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s ease;\n}\n.chart-card:hover {\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n.chart-card mat-card-header {\n  background:\n    linear-gradient(\n      135deg,\n      #2196f3 0%,\n      #21cbf3 100%);\n  color: white;\n  padding: 16px 24px;\n  border-radius: 12px 12px 0 0;\n  margin: -16px -16px 16px -16px;\n}\n.chart-card mat-card-header mat-card-title {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n.chart-card mat-card-header mat-card-title mat-icon {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.chart-card mat-card-content {\n  padding: 24px !important;\n}\n.monthly-chart .chart-bars {\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-end;\n  height: 300px;\n  gap: 12px;\n  margin-bottom: 24px;\n  padding: 20px 0;\n}\n@media (max-width: 768px) {\n  .monthly-chart .chart-bars {\n    height: 250px;\n    gap: 8px;\n  }\n}\n.monthly-chart .month-group {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  cursor: pointer;\n  transition: all 0.3s ease;\n}\n.monthly-chart .month-group:hover {\n  transform: translateY(-8px);\n}\n.monthly-chart .month-group.selected .bars-container {\n  transform: scale(1.05);\n}\n.monthly-chart .month-group.selected .month-label {\n  color: #3f51b5;\n  font-weight: 700;\n}\n.monthly-chart .month-group .bars-container {\n  display: flex;\n  gap: 6px;\n  align-items: flex-end;\n  height: 100%;\n  transition: all 0.3s ease;\n}\n.monthly-chart .month-group .bar {\n  width: 30px;\n  min-height: 10px;\n  border-radius: 8px 8px 0 0;\n  position: relative;\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n  overflow: hidden;\n}\n@media (max-width: 768px) {\n  .monthly-chart .month-group .bar {\n    width: 20px;\n  }\n}\n.monthly-chart .month-group .bar:hover {\n  filter: brightness(1.2);\n  transform: scaleY(1.05);\n}\n.monthly-chart .month-group .bar .bar-label {\n  position: absolute;\n  top: -25px;\n  left: 50%;\n  transform: translateX(-50%);\n  font-size: 0.65rem;\n  font-weight: 600;\n  white-space: nowrap;\n  opacity: 0;\n  transition: opacity 0.3s ease;\n  background: rgba(0, 0, 0, 0.8);\n  color: white;\n  padding: 4px 8px;\n  border-radius: 4px;\n}\n@media (max-width: 768px) {\n  .monthly-chart .month-group .bar .bar-label {\n    display: none;\n  }\n}\n.monthly-chart .month-group .bar:hover .bar-label {\n  opacity: 1;\n}\n.monthly-chart .month-group .income-bar {\n  background:\n    linear-gradient(\n      180deg,\n      #4caf50 0%,\n      #8bc34a 100%);\n}\n.monthly-chart .month-group .expenses-bar {\n  background:\n    linear-gradient(\n      180deg,\n      #f44336 0%,\n      #e91e63 100%);\n}\n.monthly-chart .month-group .month-label {\n  margin-top: 12px;\n  font-size: 0.75rem;\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.7);\n  transition: all 0.3s ease;\n}\n.monthly-chart .chart-legend {\n  display: flex;\n  justify-content: center;\n  gap: 32px;\n  padding: 16px;\n  background: #f5f5f5;\n  border-radius: 8px;\n}\n.monthly-chart .chart-legend .legend-item {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: #333;\n}\n.monthly-chart .chart-legend .legend-item .legend-color {\n  width: 16px;\n  height: 16px;\n  border-radius: 4px;\n}\n.monthly-chart .chart-legend .legend-item .income-color {\n  background:\n    linear-gradient(\n      135deg,\n      #4caf50 0%,\n      #8bc34a 100%);\n}\n.monthly-chart .chart-legend .legend-item .expenses-color {\n  background:\n    linear-gradient(\n      135deg,\n      #f44336 0%,\n      #e91e63 100%);\n}\n/*# sourceMappingURL=monthly-trend-chart.component.css.map */\n"] }]
  }], null, { monthlyData: [{ type: Input, args: [{ isSignal: true, alias: "monthlyData", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(MonthlyTrendChartComponent, { className: "MonthlyTrendChartComponent", filePath: "src/app/features/dashboard/components/monthly-trend-chart/monthly-trend-chart.component.ts", lineNumber: 16 });
})();

// src/app/features/dashboard/components/alerts-list/alerts-list.component.ts
var _forTrack04 = ($index, $item) => $item.message;
function AlertsListComponent_For_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "mat-icon", 5);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 6);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "translate");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 7)(7, "mat-icon");
    \u0275\u0275text(8, "chevron_right");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const alert_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap(ctx_r1.getAlertClass(alert_r1.type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(alert_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(5, 4, alert_r1.message));
  }
}
var AlertsListComponent = class _AlertsListComponent {
  alerts = input.required(...ngDevMode ? [{ debugName: "alerts" }] : []);
  getAlertClass(type) {
    return `alert-${type}`;
  }
  static \u0275fac = function AlertsListComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AlertsListComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AlertsListComponent, selectors: [["app-alerts-list"]], inputs: { alerts: [1, "alerts"] }, decls: 13, vars: 4, consts: [[1, "alerts-card"], [1, "alert-count"], [1, "alerts-list"], [1, "alert-item", 3, "class"], [1, "alert-item"], [1, "alert-icon"], [1, "alert-message"], ["mat-icon-button", "", 1, "alert-action"]], template: function AlertsListComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-card", 0)(1, "mat-card-header")(2, "mat-card-title")(3, "mat-icon");
      \u0275\u0275text(4, "notifications_active");
      \u0275\u0275elementEnd();
      \u0275\u0275text(5);
      \u0275\u0275pipe(6, "translate");
      \u0275\u0275elementStart(7, "mat-chip", 1);
      \u0275\u0275text(8);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(9, "mat-card-content")(10, "div", 2);
      \u0275\u0275repeaterCreate(11, AlertsListComponent_For_12_Template, 9, 6, "div", 3, _forTrack04);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(6, 2, "DASHBOARD.ALERTS"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.alerts().length);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.alerts());
    }
  }, dependencies: [MatCardModule, MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatIconModule, MatIcon, MatButtonModule, MatIconButton, MatChipsModule, MatChip, TranslateModule, TranslatePipe], styles: ["\n\n.alerts-card[_ngcontent-%COMP%] {\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s ease;\n}\n.alerts-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n.alerts-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ff9800 0%,\n      #ff5722 100%);\n  color: white;\n  padding: 16px 24px;\n  border-radius: 12px 12px 0 0;\n  margin: -16px -16px 16px -16px;\n}\n.alerts-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n.alerts-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.alerts-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   .alert-count[_ngcontent-%COMP%] {\n  margin-left: auto;\n  background: rgba(255, 255, 255, 0.3);\n  color: white;\n  font-weight: 700;\n}\n.alerts-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 0 !important;\n}\n.alerts-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.alert-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 20px 24px;\n  border-bottom: 1px solid #e0e0e0;\n  transition: all 0.3s ease;\n}\n.alert-item[_ngcontent-%COMP%]:last-child {\n  border-bottom: none;\n}\n.alert-item[_ngcontent-%COMP%]:hover {\n  background: #f5f5f5;\n  padding-left: 32px;\n}\n.alert-item[_ngcontent-%COMP%]   .alert-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.alert-item[_ngcontent-%COMP%]   .alert-message[_ngcontent-%COMP%] {\n  flex: 1;\n  font-size: 0.9375rem;\n  color: #333;\n}\n.alert-item[_ngcontent-%COMP%]   .alert-action[_ngcontent-%COMP%] {\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n.alert-item[_ngcontent-%COMP%]:hover   .alert-action[_ngcontent-%COMP%] {\n  opacity: 1;\n}\n.alert-item.alert-error[_ngcontent-%COMP%] {\n  border-left: 4px solid #f44336;\n}\n.alert-item.alert-error[_ngcontent-%COMP%]   .alert-icon[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.alert-item.alert-warning[_ngcontent-%COMP%] {\n  border-left: 4px solid #ff9800;\n}\n.alert-item.alert-warning[_ngcontent-%COMP%]   .alert-icon[_ngcontent-%COMP%] {\n  color: #ff9800;\n}\n.alert-item.alert-info[_ngcontent-%COMP%] {\n  border-left: 4px solid #2196f3;\n}\n.alert-item.alert-info[_ngcontent-%COMP%]   .alert-icon[_ngcontent-%COMP%] {\n  color: #2196f3;\n}\n/*# sourceMappingURL=alerts-list.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AlertsListComponent, [{
    type: Component,
    args: [{ selector: "app-alerts-list", standalone: true, imports: [MatCardModule, MatIconModule, MatButtonModule, MatChipsModule, TranslateModule], template: `<mat-card class="alerts-card">
  <mat-card-header>
    <mat-card-title>
      <mat-icon>notifications_active</mat-icon>
      {{ 'DASHBOARD.ALERTS' | translate }}
      <mat-chip class="alert-count">{{ alerts().length }}</mat-chip>
    </mat-card-title>
  </mat-card-header>
  <mat-card-content>
    <div class="alerts-list">
      @for (alert of alerts(); track alert.message) {
        <div class="alert-item" [class]="getAlertClass(alert.type)">
          <mat-icon class="alert-icon">{{ alert.icon }}</mat-icon>
          <span class="alert-message">{{ alert.message | translate }}</span>
          <button mat-icon-button class="alert-action">
            <mat-icon>chevron_right</mat-icon>
          </button>
        </div>
      }
    </div>
  </mat-card-content>
</mat-card>

`, styles: ["/* src/app/features/dashboard/components/alerts-list/alerts-list.component.scss */\n.alerts-card {\n  border-radius: 12px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  transition: all 0.3s ease;\n}\n.alerts-card:hover {\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);\n}\n.alerts-card mat-card-header {\n  background:\n    linear-gradient(\n      135deg,\n      #ff9800 0%,\n      #ff5722 100%);\n  color: white;\n  padding: 16px 24px;\n  border-radius: 12px 12px 0 0;\n  margin: -16px -16px 16px -16px;\n}\n.alerts-card mat-card-header mat-card-title {\n  display: flex;\n  align-items: center;\n  gap: 12px;\n  margin: 0;\n  font-size: 1.25rem;\n  font-weight: 600;\n}\n.alerts-card mat-card-header mat-card-title mat-icon {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.alerts-card mat-card-header mat-card-title .alert-count {\n  margin-left: auto;\n  background: rgba(255, 255, 255, 0.3);\n  color: white;\n  font-weight: 700;\n}\n.alerts-card mat-card-content {\n  padding: 0 !important;\n}\n.alerts-list {\n  display: flex;\n  flex-direction: column;\n}\n.alert-item {\n  display: flex;\n  align-items: center;\n  gap: 16px;\n  padding: 20px 24px;\n  border-bottom: 1px solid #e0e0e0;\n  transition: all 0.3s ease;\n}\n.alert-item:last-child {\n  border-bottom: none;\n}\n.alert-item:hover {\n  background: #f5f5f5;\n  padding-left: 32px;\n}\n.alert-item .alert-icon {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.alert-item .alert-message {\n  flex: 1;\n  font-size: 0.9375rem;\n  color: #333;\n}\n.alert-item .alert-action {\n  opacity: 0;\n  transition: opacity 0.3s ease;\n}\n.alert-item:hover .alert-action {\n  opacity: 1;\n}\n.alert-item.alert-error {\n  border-left: 4px solid #f44336;\n}\n.alert-item.alert-error .alert-icon {\n  color: #f44336;\n}\n.alert-item.alert-warning {\n  border-left: 4px solid #ff9800;\n}\n.alert-item.alert-warning .alert-icon {\n  color: #ff9800;\n}\n.alert-item.alert-info {\n  border-left: 4px solid #2196f3;\n}\n.alert-item.alert-info .alert-icon {\n  color: #2196f3;\n}\n/*# sourceMappingURL=alerts-list.component.css.map */\n"] }]
  }], null, { alerts: [{ type: Input, args: [{ isSignal: true, alias: "alerts", required: true }] }] });
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AlertsListComponent, { className: "AlertsListComponent", filePath: "src/app/features/dashboard/components/alerts-list/alerts-list.component.ts", lineNumber: 16 });
})();

// src/app/features/dashboard/pages/dashboard.component.ts
var _forTrack05 = ($index, $item) => $item.type;
function DashboardComponent_For_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "app-financial-summary-card", 4);
  }
  if (rf & 2) {
    const card_r1 = ctx.$implicit;
    \u0275\u0275property("card", card_r1);
  }
}
var DashboardComponent = class _DashboardComponent {
  financialSummary = signal({
    balance: 25430.5,
    income: 8500,
    expenses: 5240.3,
    budgetUsage: 68,
    alerts: 3
  }, ...ngDevMode ? [{ debugName: "financialSummary" }] : []);
  trends = signal([
    { label: "DASHBOARD.BALANCE_CHANGE", value: 3260.2, change: 12.5 },
    { label: "DASHBOARD.STATISTICS.MONTHLY_AVERAGE", value: 6850, change: -3.2 },
    { label: "DASHBOARD.STATISTICS.SAVINGS_RATE", value: 38.4, change: 5.8 }
  ], ...ngDevMode ? [{ debugName: "trends" }] : []);
  budgetCategories = signal([
    {
      name: "DASHBOARD.CATEGORIES.FOOD",
      spent: 1200,
      budget: 1e3,
      percentage: 120,
      color: "#f44336"
    },
    {
      name: "DASHBOARD.CATEGORIES.TRANSPORT",
      spent: 450,
      budget: 600,
      percentage: 75,
      color: "#4caf50"
    },
    {
      name: "DASHBOARD.CATEGORIES.ENTERTAINMENT",
      spent: 820,
      budget: 800,
      percentage: 102.5,
      color: "#ff9800"
    },
    {
      name: "DASHBOARD.CATEGORIES.UTILITIES",
      spent: 380,
      budget: 500,
      percentage: 76,
      color: "#4caf50"
    },
    {
      name: "DASHBOARD.CATEGORIES.HEALTHCARE",
      spent: 290,
      budget: 400,
      percentage: 72.5,
      color: "#4caf50"
    },
    {
      name: "DASHBOARD.CATEGORIES.OTHER",
      spent: 180,
      budget: 300,
      percentage: 60,
      color: "#2196f3"
    }
  ], ...ngDevMode ? [{ debugName: "budgetCategories" }] : []);
  monthlyData = signal([
    { month: "DASHBOARD.MONTHS.JAN", income: 8200, expenses: 5100 },
    { month: "DASHBOARD.MONTHS.FEB", income: 8300, expenses: 5300 },
    { month: "DASHBOARD.MONTHS.MAR", income: 8100, expenses: 4900 },
    { month: "DASHBOARD.MONTHS.APR", income: 8600, expenses: 5400 },
    { month: "DASHBOARD.MONTHS.MAY", income: 8400, expenses: 5200 },
    { month: "DASHBOARD.MONTHS.JUN", income: 8500, expenses: 5240 }
  ], ...ngDevMode ? [{ debugName: "monthlyData" }] : []);
  alerts = signal([
    { type: "error", message: "DASHBOARD.ALERTS_LIST.BUDGET_EXCEEDED", icon: "error" },
    { type: "warning", message: "DASHBOARD.ALERTS_LIST.LOW_BALANCE", icon: "warning" },
    { type: "info", message: "DASHBOARD.ALERTS_LIST.UNUSUAL_SPENDING", icon: "info" }
  ], ...ngDevMode ? [{ debugName: "alerts" }] : []);
  summaryCards = computed(() => {
    const summary = this.financialSummary();
    return [
      {
        type: "balance",
        label: "DASHBOARD.BALANCE",
        value: summary.balance,
        trend: 12.5,
        icon: "account_balance_wallet"
      },
      {
        type: "income",
        label: "DASHBOARD.INCOME",
        value: summary.income,
        trend: 8.2,
        icon: "arrow_upward"
      },
      {
        type: "expenses",
        label: "DASHBOARD.EXPENSES",
        value: summary.expenses,
        trend: -3.2,
        icon: "arrow_downward"
      },
      {
        type: "budget",
        label: "DASHBOARD.BUDGET",
        value: summary.budgetUsage,
        budgetUsage: summary.budgetUsage,
        icon: "pie_chart"
      }
    ];
  }, ...ngDevMode ? [{ debugName: "summaryCards" }] : []);
  static \u0275fac = function DashboardComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardComponent, selectors: [["app-dashboard"]], decls: 15, vars: 7, consts: [[1, "dashboard-container"], [1, "dashboard-header"], [1, "dashboard-subtitle"], [1, "summary-grid"], [3, "card"], [1, "trends-section"], [3, "trends"], [1, "charts-grid"], [3, "categories"], [3, "monthlyData"], [1, "alerts-section"], [3, "alerts"]], template: function DashboardComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "p", 2);
      \u0275\u0275text(3);
      \u0275\u0275pipe(4, "translate");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 3);
      \u0275\u0275repeaterCreate(6, DashboardComponent_For_7_Template, 1, 1, "app-financial-summary-card", 4, _forTrack05);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 5);
      \u0275\u0275element(9, "app-trends-section", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 7);
      \u0275\u0275element(11, "app-budget-chart", 8)(12, "app-monthly-trend-chart", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 10);
      \u0275\u0275element(14, "app-alerts-list", 11);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(4, 5, "DASHBOARD.FINANCIAL_HEALTH"));
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.summaryCards());
      \u0275\u0275advance(3);
      \u0275\u0275property("trends", ctx.trends());
      \u0275\u0275advance(2);
      \u0275\u0275property("categories", ctx.budgetCategories());
      \u0275\u0275advance();
      \u0275\u0275property("monthlyData", ctx.monthlyData());
      \u0275\u0275advance(2);
      \u0275\u0275property("alerts", ctx.alerts());
    }
  }, dependencies: [
    CommonModule,
    TranslateModule,
    FinancialSummaryCardComponent,
    TrendsSectionComponent,
    BudgetChartComponent,
    MonthlyTrendChartComponent,
    AlertsListComponent,
    TranslatePipe
  ], styles: ["\n\n.dashboard-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  min-height: 100vh;\n  animation: _ngcontent-%COMP%_fadeIn 0.5s ease-in-out;\n}\n@media (max-width: 768px) {\n  .dashboard-container[_ngcontent-%COMP%] {\n    padding: 16px;\n  }\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.dashboard-header[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n  animation: _ngcontent-%COMP%_fadeInUp 0.6s ease-in-out;\n}\n.dashboard-header[_ngcontent-%COMP%]   .dashboard-title[_ngcontent-%COMP%] {\n  font-size: 2.5rem;\n  font-weight: 700;\n  color: #ffffff;\n  margin: 0 0 8px 0;\n  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);\n}\n@media (max-width: 768px) {\n  .dashboard-header[_ngcontent-%COMP%]   .dashboard-title[_ngcontent-%COMP%] {\n    font-size: 1.8rem;\n  }\n}\n.dashboard-header[_ngcontent-%COMP%]   .dashboard-subtitle[_ngcontent-%COMP%] {\n  font-size: 1.1rem;\n  color: rgba(255, 255, 255, 0.9);\n  margin: 0;\n}\n@keyframes _ngcontent-%COMP%_fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 24px;\n  margin-bottom: 32px;\n}\n@media (max-width: 768px) {\n  .summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n    gap: 16px;\n  }\n}\n.trends-section[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n.charts-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));\n  gap: 24px;\n  margin-bottom: 32px;\n}\n@media (max-width: 1024px) {\n  .charts-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n}\n.alerts-section[_ngcontent-%COMP%] {\n  margin-bottom: 32px;\n}\n/*# sourceMappingURL=dashboard.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DashboardComponent, [{
    type: Component,
    args: [{ selector: "app-dashboard", standalone: true, imports: [
      CommonModule,
      TranslateModule,
      FinancialSummaryCardComponent,
      TrendsSectionComponent,
      BudgetChartComponent,
      MonthlyTrendChartComponent,
      AlertsListComponent
    ], template: `<div class="dashboard-container">
  <div class="dashboard-header">
    <!-- <h1 class="dashboard-title">{{ 'DASHBOARD.TITLE' | translate }}</h1> -->
    <p class="dashboard-subtitle">{{ 'DASHBOARD.FINANCIAL_HEALTH' | translate }}</p>
  </div>

  <div class="summary-grid">
    @for (card of summaryCards(); track card.type) {
    <app-financial-summary-card [card]="card" />
    }
  </div>

  <div class="trends-section">
    <app-trends-section [trends]="trends()" />
  </div>

  <div class="charts-grid">
    <app-budget-chart [categories]="budgetCategories()" />
    <app-monthly-trend-chart [monthlyData]="monthlyData()" />
  </div>

  <div class="alerts-section">
    <app-alerts-list [alerts]="alerts()" />
  </div>
</div>
`, styles: ["/* src/app/features/dashboard/pages/dashboard.component.scss */\n.dashboard-container {\n  padding: 24px;\n  min-height: 100vh;\n  animation: fadeIn 0.5s ease-in-out;\n}\n@media (max-width: 768px) {\n  .dashboard-container {\n    padding: 16px;\n  }\n}\n@keyframes fadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.dashboard-header {\n  margin-bottom: 32px;\n  animation: fadeInUp 0.6s ease-in-out;\n}\n.dashboard-header .dashboard-title {\n  font-size: 2.5rem;\n  font-weight: 700;\n  color: #ffffff;\n  margin: 0 0 8px 0;\n  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);\n}\n@media (max-width: 768px) {\n  .dashboard-header .dashboard-title {\n    font-size: 1.8rem;\n  }\n}\n.dashboard-header .dashboard-subtitle {\n  font-size: 1.1rem;\n  color: rgba(255, 255, 255, 0.9);\n  margin: 0;\n}\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    transform: translateY(30px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.summary-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 24px;\n  margin-bottom: 32px;\n}\n@media (max-width: 768px) {\n  .summary-grid {\n    grid-template-columns: 1fr;\n    gap: 16px;\n  }\n}\n.trends-section {\n  margin-bottom: 32px;\n}\n.charts-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));\n  gap: 24px;\n  margin-bottom: 32px;\n}\n@media (max-width: 1024px) {\n  .charts-grid {\n    grid-template-columns: 1fr;\n  }\n}\n.alerts-section {\n  margin-bottom: 32px;\n}\n/*# sourceMappingURL=dashboard.component.css.map */\n"] }]
  }], null, null);
})();
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardComponent, { className: "DashboardComponent", filePath: "src/app/features/dashboard/pages/dashboard.component.ts", lineNumber: 32 });
})();
export {
  DashboardComponent
};
//# sourceMappingURL=chunk-ECQTWM2O.mjs.map
