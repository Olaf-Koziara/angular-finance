export default `<!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8">
  <title>AngularFinance</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&amp;display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link rel="stylesheet" href="styles.css"><style ng-app-id="ng">

[_nghost-ng-c1974852249] {
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
}
/*# sourceMappingURL=/app.css.map */</style><style ng-app-id="ng">

.sidenav-container[_ngcontent-ng-c463973037] {
  height: 100%;
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
}
.sidenav[_ngcontent-ng-c463973037] {
  width: 200px;
  background: transparent;
  --mat-sys-on-surface: #fff !important;
}
.sidenav[_ngcontent-ng-c463973037]   .mat-toolbar[_ngcontent-ng-c463973037] {
  background: transparent;
}
.mat-toolbar.mat-primary[_ngcontent-ng-c463973037] {
  position: sticky;
  top: 0;
  z-index: 1;
  background: transparent;
}
/*# sourceMappingURL=/sidebar.component.css.map */</style><style ng-app-id="ng">.mat-drawer-container{position:relative;z-index:1;color:var(--mat-sidenav-content-text-color, var(--mat-sys-on-background));background-color:var(--mat-sidenav-content-background-color, var(--mat-sys-background));box-sizing:border-box;display:block;overflow:hidden}.mat-drawer-container[fullscreen]{top:0;left:0;right:0;bottom:0;position:absolute}.mat-drawer-container[fullscreen].mat-drawer-container-has-open{overflow:hidden}.mat-drawer-container.mat-drawer-container-explicit-backdrop .mat-drawer-side{z-index:3}.mat-drawer-container.ng-animate-disabled .mat-drawer-backdrop,.mat-drawer-container.ng-animate-disabled .mat-drawer-content,.ng-animate-disabled .mat-drawer-container .mat-drawer-backdrop,.ng-animate-disabled .mat-drawer-container .mat-drawer-content{transition:none}.mat-drawer-backdrop{top:0;left:0;right:0;bottom:0;position:absolute;display:block;z-index:3;visibility:hidden}.mat-drawer-backdrop.mat-drawer-shown{visibility:visible;background-color:var(--mat-sidenav-scrim-color, color-mix(in srgb, var(--mat-sys-neutral-variant20) 40%, transparent))}.mat-drawer-transition .mat-drawer-backdrop{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:background-color,visibility}@media(forced-colors: active){.mat-drawer-backdrop{opacity:.5}}.mat-drawer-content{position:relative;z-index:1;display:block;height:100%;overflow:auto}.mat-drawer-content.mat-drawer-content-hidden{opacity:0}.mat-drawer-transition .mat-drawer-content{transition-duration:400ms;transition-timing-function:cubic-bezier(0.25, 0.8, 0.25, 1);transition-property:transform,margin-left,margin-right}.mat-drawer{position:relative;z-index:4;color:var(--mat-sidenav-container-text-color, var(--mat-sys-on-surface-variant));box-shadow:var(--mat-sidenav-container-elevation-shadow, none);background-color:var(--mat-sidenav-container-background-color, var(--mat-sys-surface));border-top-right-radius:var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));border-bottom-right-radius:var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));width:var(--mat-sidenav-container-width, 360px);display:block;position:absolute;top:0;bottom:0;z-index:3;outline:0;box-sizing:border-box;overflow-y:auto;transform:translate3d(-100%, 0, 0)}@media(forced-colors: active){.mat-drawer,[dir=rtl] .mat-drawer.mat-drawer-end{border-right:solid 1px currentColor}}@media(forced-colors: active){[dir=rtl] .mat-drawer,.mat-drawer.mat-drawer-end{border-left:solid 1px currentColor;border-right:none}}.mat-drawer.mat-drawer-side{z-index:2}.mat-drawer.mat-drawer-end{right:0;transform:translate3d(100%, 0, 0);border-top-left-radius:var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));border-bottom-left-radius:var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));border-top-right-radius:0;border-bottom-right-radius:0}[dir=rtl] .mat-drawer{border-top-left-radius:var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));border-bottom-left-radius:var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));border-top-right-radius:0;border-bottom-right-radius:0;transform:translate3d(100%, 0, 0)}[dir=rtl] .mat-drawer.mat-drawer-end{border-top-right-radius:var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));border-bottom-right-radius:var(--mat-sidenav-container-shape, var(--mat-sys-corner-large));border-top-left-radius:0;border-bottom-left-radius:0;left:0;right:auto;transform:translate3d(-100%, 0, 0)}.mat-drawer-transition .mat-drawer{transition:transform 400ms cubic-bezier(0.25, 0.8, 0.25, 1)}.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating){visibility:hidden;box-shadow:none}.mat-drawer:not(.mat-drawer-opened):not(.mat-drawer-animating) .mat-drawer-inner-container{display:none}.mat-drawer.mat-drawer-opened.mat-drawer-opened{transform:none}.mat-drawer-side{box-shadow:none;border-right-color:var(--mat-sidenav-container-divider-color, transparent);border-right-width:1px;border-right-style:solid}.mat-drawer-side.mat-drawer-end{border-left-color:var(--mat-sidenav-container-divider-color, transparent);border-left-width:1px;border-left-style:solid;border-right:none}[dir=rtl] .mat-drawer-side{border-left-color:var(--mat-sidenav-container-divider-color, transparent);border-left-width:1px;border-left-style:solid;border-right:none}[dir=rtl] .mat-drawer-side.mat-drawer-end{border-right-color:var(--mat-sidenav-container-divider-color, transparent);border-right-width:1px;border-right-style:solid;border-left:none}.mat-drawer-inner-container{width:100%;height:100%;overflow:auto}.mat-sidenav-fixed{position:fixed}
</style><style ng-app-id="ng">.cdk-visually-hidden{border:0;clip:rect(0 0 0 0);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;white-space:nowrap;outline:0;-webkit-appearance:none;-moz-appearance:none;left:0}[dir=rtl] .cdk-visually-hidden{left:auto;right:0}
</style><style ng-app-id="ng">.mat-toolbar{background:var(--mat-toolbar-container-background-color, var(--mat-sys-surface));color:var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface))}.mat-toolbar,.mat-toolbar h1,.mat-toolbar h2,.mat-toolbar h3,.mat-toolbar h4,.mat-toolbar h5,.mat-toolbar h6{font-family:var(--mat-toolbar-title-text-font, var(--mat-sys-title-large-font));font-size:var(--mat-toolbar-title-text-size, var(--mat-sys-title-large-size));line-height:var(--mat-toolbar-title-text-line-height, var(--mat-sys-title-large-line-height));font-weight:var(--mat-toolbar-title-text-weight, var(--mat-sys-title-large-weight));letter-spacing:var(--mat-toolbar-title-text-tracking, var(--mat-sys-title-large-tracking));margin:0}@media(forced-colors: active){.mat-toolbar{outline:solid 1px}}.mat-toolbar .mat-form-field-underline,.mat-toolbar .mat-form-field-ripple,.mat-toolbar .mat-focused .mat-form-field-ripple{background-color:currentColor}.mat-toolbar .mat-form-field-label,.mat-toolbar .mat-focused .mat-form-field-label,.mat-toolbar .mat-select-value,.mat-toolbar .mat-select-arrow,.mat-toolbar .mat-form-field.mat-focused .mat-select-arrow{color:inherit}.mat-toolbar .mat-input-element{caret-color:currentColor}.mat-toolbar .mat-mdc-button-base.mat-mdc-button-base.mat-unthemed{--mat-button-text-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface));--mat-button-outlined-label-text-color: var(--mat-toolbar-container-text-color, var(--mat-sys-on-surface))}.mat-toolbar-row,.mat-toolbar-single-row{display:flex;box-sizing:border-box;padding:0 16px;width:100%;flex-direction:row;align-items:center;white-space:nowrap;height:var(--mat-toolbar-standard-height, 64px)}@media(max-width: 599px){.mat-toolbar-row,.mat-toolbar-single-row{height:var(--mat-toolbar-mobile-height, 56px)}}.mat-toolbar-multiple-rows{display:flex;box-sizing:border-box;flex-direction:column;width:100%;min-height:var(--mat-toolbar-standard-height, 64px)}@media(max-width: 599px){.mat-toolbar-multiple-rows{min-height:var(--mat-toolbar-mobile-height, 56px)}}
</style><style ng-app-id="ng">.mdc-list{margin:0;padding:8px 0;list-style-type:none}.mdc-list:focus{outline:none}.mdc-list-item{display:flex;position:relative;justify-content:flex-start;overflow:hidden;padding:0;align-items:stretch;cursor:pointer;padding-left:16px;padding-right:16px;background-color:var(--mat-list-list-item-container-color, transparent);border-radius:var(--mat-list-list-item-container-shape, var(--mat-sys-corner-none))}.mdc-list-item.mdc-list-item--selected{background-color:var(--mat-list-list-item-selected-container-color)}.mdc-list-item:focus{outline:0}.mdc-list-item.mdc-list-item--disabled{cursor:auto}.mdc-list-item.mdc-list-item--with-one-line{height:var(--mat-list-list-item-one-line-container-height, 48px)}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__start{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-one-line .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-two-lines{height:var(--mat-list-list-item-two-line-container-height, 64px)}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-two-lines .mdc-list-item__end{align-self:center;margin-top:0}.mdc-list-item.mdc-list-item--with-three-lines{height:var(--mat-list-list-item-three-line-container-height, 88px)}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__start{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:16px}.mdc-list-item.mdc-list-item--selected::before,.mdc-list-item.mdc-list-item--selected:focus::before,.mdc-list-item:not(.mdc-list-item--selected):focus::before{position:absolute;box-sizing:border-box;width:100%;height:100%;top:0;left:0;content:"";pointer-events:none}a.mdc-list-item{color:inherit;text-decoration:none}.mdc-list-item__start{fill:currentColor;flex-shrink:0;pointer-events:none}.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mat-list-list-item-leading-icon-color, var(--mat-sys-on-surface-variant));width:var(--mat-list-list-item-leading-icon-size, 24px);height:var(--mat-list-list-item-leading-icon-size, 24px);margin-left:16px;margin-right:32px}[dir=rtl] .mdc-list-item--with-leading-icon .mdc-list-item__start{margin-left:32px;margin-right:16px}.mdc-list-item--with-leading-icon:hover .mdc-list-item__start{color:var(--mat-list-list-item-hover-leading-icon-color)}.mdc-list-item--with-leading-avatar .mdc-list-item__start{width:var(--mat-list-list-item-leading-avatar-size, 40px);height:var(--mat-list-list-item-leading-avatar-size, 40px);margin-left:16px;margin-right:16px;border-radius:50%}.mdc-list-item--with-leading-avatar .mdc-list-item__start,[dir=rtl] .mdc-list-item--with-leading-avatar .mdc-list-item__start{margin-left:16px;margin-right:16px;border-radius:50%}.mdc-list-item__end{flex-shrink:0;pointer-events:none}.mdc-list-item--with-trailing-meta .mdc-list-item__end{font-family:var(--mat-list-list-item-trailing-supporting-text-font, var(--mat-sys-label-small-font));line-height:var(--mat-list-list-item-trailing-supporting-text-line-height, var(--mat-sys-label-small-line-height));font-size:var(--mat-list-list-item-trailing-supporting-text-size, var(--mat-sys-label-small-size));font-weight:var(--mat-list-list-item-trailing-supporting-text-weight, var(--mat-sys-label-small-weight));letter-spacing:var(--mat-list-list-item-trailing-supporting-text-tracking, var(--mat-sys-label-small-tracking))}.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mat-list-list-item-trailing-icon-color, var(--mat-sys-on-surface-variant));width:var(--mat-list-list-item-trailing-icon-size, 24px);height:var(--mat-list-list-item-trailing-icon-size, 24px)}.mdc-list-item--with-trailing-icon:hover .mdc-list-item__end{color:var(--mat-list-list-item-hover-trailing-icon-color)}.mdc-list-item.mdc-list-item--with-trailing-meta .mdc-list-item__end{color:var(--mat-list-list-item-trailing-supporting-text-color, var(--mat-sys-on-surface-variant))}.mdc-list-item--selected.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mat-list-list-item-selected-trailing-icon-color, var(--mat-sys-primary))}.mdc-list-item__content{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;align-self:center;flex:1;pointer-events:none}.mdc-list-item--with-two-lines .mdc-list-item__content,.mdc-list-item--with-three-lines .mdc-list-item__content{align-self:stretch}.mdc-list-item__primary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;color:var(--mat-list-list-item-label-text-color, var(--mat-sys-on-surface));font-family:var(--mat-list-list-item-label-text-font, var(--mat-sys-body-large-font));line-height:var(--mat-list-list-item-label-text-line-height, var(--mat-sys-body-large-line-height));font-size:var(--mat-list-list-item-label-text-size, var(--mat-sys-body-large-size));font-weight:var(--mat-list-list-item-label-text-weight, var(--mat-sys-body-large-weight));letter-spacing:var(--mat-list-list-item-label-text-tracking, var(--mat-sys-body-large-tracking))}.mdc-list-item:hover .mdc-list-item__primary-text{color:var(--mat-list-list-item-hover-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item:focus .mdc-list-item__primary-text{color:var(--mat-list-list-item-focus-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-three-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-three-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item__secondary-text{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;display:block;margin-top:0;color:var(--mat-list-list-item-supporting-text-color, var(--mat-sys-on-surface-variant));font-family:var(--mat-list-list-item-supporting-text-font, var(--mat-sys-body-medium-font));line-height:var(--mat-list-list-item-supporting-text-line-height, var(--mat-sys-body-medium-line-height));font-size:var(--mat-list-list-item-supporting-text-size, var(--mat-sys-body-medium-size));font-weight:var(--mat-list-list-item-supporting-text-weight, var(--mat-sys-body-medium-weight));letter-spacing:var(--mat-list-list-item-supporting-text-tracking, var(--mat-sys-body-medium-tracking))}.mdc-list-item__secondary-text::before{display:inline-block;width:0;height:20px;content:"";vertical-align:0}.mdc-list-item--with-three-lines .mdc-list-item__secondary-text{white-space:normal;line-height:20px}.mdc-list-item--with-overline .mdc-list-item__secondary-text{white-space:nowrap;line-height:auto}.mdc-list-item--with-leading-radio.mdc-list-item,.mdc-list-item--with-leading-checkbox.mdc-list-item,.mdc-list-item--with-leading-icon.mdc-list-item,.mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:0;padding-right:16px}[dir=rtl] .mdc-list-item--with-leading-radio.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-checkbox.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-icon.mdc-list-item,[dir=rtl] .mdc-list-item--with-leading-avatar.mdc-list-item{padding-left:16px;padding-right:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text{display:block;margin-top:0;line-height:normal;margin-bottom:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines .mdc-list-item__primary-text::after{display:inline-block;width:0;height:20px;content:"";vertical-align:-20px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end{display:block;margin-top:0;line-height:normal}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-icon.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before,.mdc-list-item--with-leading-avatar.mdc-list-item--with-two-lines.mdc-list-item--with-trailing-meta .mdc-list-item__end::before{display:inline-block;width:0;height:32px;content:"";vertical-align:0}.mdc-list-item--with-trailing-icon.mdc-list-item,[dir=rtl] .mdc-list-item--with-trailing-icon.mdc-list-item{padding-left:0;padding-right:0}.mdc-list-item--with-trailing-icon .mdc-list-item__end{margin-left:16px;margin-right:16px}.mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:16px;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-meta.mdc-list-item{padding-left:0;padding-right:16px}.mdc-list-item--with-trailing-meta .mdc-list-item__end{-webkit-user-select:none;user-select:none;margin-left:28px;margin-right:16px}[dir=rtl] .mdc-list-item--with-trailing-meta .mdc-list-item__end{margin-left:16px;margin-right:28px}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end,.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end{display:block;line-height:normal;align-self:flex-start;margin-top:0}.mdc-list-item--with-trailing-meta.mdc-list-item--with-three-lines .mdc-list-item__end::before,.mdc-list-item--with-trailing-meta.mdc-list-item--with-two-lines .mdc-list-item__end::before{display:inline-block;width:0;height:28px;content:"";vertical-align:0}.mdc-list-item--with-leading-radio .mdc-list-item__start,.mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:8px;margin-right:24px}[dir=rtl] .mdc-list-item--with-leading-radio .mdc-list-item__start,[dir=rtl] .mdc-list-item--with-leading-checkbox .mdc-list-item__start{margin-left:24px;margin-right:8px}.mdc-list-item--with-leading-radio.mdc-list-item--with-two-lines .mdc-list-item__start,.mdc-list-item--with-leading-checkbox.mdc-list-item--with-two-lines .mdc-list-item__start{align-self:flex-start;margin-top:8px}.mdc-list-item--with-trailing-radio.mdc-list-item,.mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:16px;padding-right:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item{padding-left:0;padding-right:16px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon,.mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar{padding-left:0}[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-icon,[dir=rtl] .mdc-list-item--with-trailing-radio.mdc-list-item--with-leading-avatar,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-icon,[dir=rtl] .mdc-list-item--with-trailing-checkbox.mdc-list-item--with-leading-avatar{padding-right:0}.mdc-list-item--with-trailing-radio .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:24px;margin-right:8px}[dir=rtl] .mdc-list-item--with-trailing-radio .mdc-list-item__end,[dir=rtl] .mdc-list-item--with-trailing-checkbox .mdc-list-item__end{margin-left:8px;margin-right:24px}.mdc-list-item--with-trailing-radio.mdc-list-item--with-three-lines .mdc-list-item__end,.mdc-list-item--with-trailing-checkbox.mdc-list-item--with-three-lines .mdc-list-item__end{align-self:flex-start;margin-top:8px}.mdc-list-group__subheader{margin:.75rem 16px}.mdc-list-item--disabled .mdc-list-item__start,.mdc-list-item--disabled .mdc-list-item__content,.mdc-list-item--disabled .mdc-list-item__end{opacity:1}.mdc-list-item--disabled .mdc-list-item__primary-text,.mdc-list-item--disabled .mdc-list-item__secondary-text{opacity:var(--mat-list-list-item-disabled-label-text-opacity, 0.3)}.mdc-list-item--disabled.mdc-list-item--with-leading-icon .mdc-list-item__start{color:var(--mat-list-list-item-disabled-leading-icon-color, var(--mat-sys-on-surface));opacity:var(--mat-list-list-item-disabled-leading-icon-opacity, 0.38)}.mdc-list-item--disabled.mdc-list-item--with-trailing-icon .mdc-list-item__end{color:var(--mat-list-list-item-disabled-trailing-icon-color, var(--mat-sys-on-surface));opacity:var(--mat-list-list-item-disabled-trailing-icon-opacity, 0.38)}.mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing,[dir=rtl] .mat-mdc-list-item.mat-mdc-list-item-both-leading-and-trailing{padding-left:0;padding-right:0}.mdc-list-item.mdc-list-item--disabled .mdc-list-item__primary-text{color:var(--mat-list-list-item-disabled-label-text-color, var(--mat-sys-on-surface))}.mdc-list-item:hover::before{background-color:var(--mat-list-list-item-hover-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-list-list-item-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mdc-list-item.mdc-list-item--disabled::before{background-color:var(--mat-list-list-item-disabled-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-list-list-item-disabled-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-list-item:focus::before{background-color:var(--mat-list-list-item-focus-state-layer-color, var(--mat-sys-on-surface));opacity:var(--mat-list-list-item-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-list-item--disabled .mdc-radio,.mdc-list-item--disabled .mdc-checkbox{opacity:var(--mat-list-list-item-disabled-label-text-opacity, 0.3)}.mdc-list-item--with-leading-avatar .mat-mdc-list-item-avatar{border-radius:var(--mat-list-list-item-leading-avatar-shape, var(--mat-sys-corner-full));background-color:var(--mat-list-list-item-leading-avatar-color, var(--mat-sys-primary-container))}.mat-mdc-list-item-icon{font-size:var(--mat-list-list-item-leading-icon-size, 24px)}@media(forced-colors: active){a.mdc-list-item--activated::after{content:"";position:absolute;top:50%;right:16px;transform:translateY(-50%);width:10px;height:0;border-bottom:solid 10px;border-radius:10px}a.mdc-list-item--activated [dir=rtl]::after{right:auto;left:16px}}.mat-mdc-list-base{display:block}.mat-mdc-list-base .mdc-list-item__start,.mat-mdc-list-base .mdc-list-item__end,.mat-mdc-list-base .mdc-list-item__content{pointer-events:auto}.mat-mdc-list-item,.mat-mdc-list-option{width:100%;box-sizing:border-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-list-item:not(.mat-mdc-list-item-interactive),.mat-mdc-list-option:not(.mat-mdc-list-item-interactive){cursor:default}.mat-mdc-list-item .mat-divider-inset,.mat-mdc-list-option .mat-divider-inset{position:absolute;left:0;right:0;bottom:0}.mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,.mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-left:72px}[dir=rtl] .mat-mdc-list-item .mat-mdc-list-item-avatar~.mat-divider-inset,[dir=rtl] .mat-mdc-list-option .mat-mdc-list-item-avatar~.mat-divider-inset{margin-right:72px}.mat-mdc-list-item-interactive::before{top:0;left:0;right:0;bottom:0;position:absolute;content:"";opacity:0;pointer-events:none;border-radius:inherit}.mat-mdc-list-item>.mat-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-mdc-list-item:focus>.mat-focus-indicator::before{content:""}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-line.mdc-list-item__secondary-text{white-space:nowrap;line-height:normal}.mat-mdc-list-item.mdc-list-item--with-three-lines .mat-mdc-list-item-unscoped-content.mdc-list-item__secondary-text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2}mat-action-list button{background:none;color:inherit;border:none;font:inherit;outline:inherit;-webkit-tap-highlight-color:rgba(0,0,0,0);text-align:start}mat-action-list button::-moz-focus-inner{border:0}.mdc-list-item--with-leading-icon .mdc-list-item__start{margin-inline-start:var(--mat-list-list-item-leading-icon-start-space, 16px);margin-inline-end:var(--mat-list-list-item-leading-icon-end-space, 16px)}.mat-mdc-nav-list .mat-mdc-list-item{border-radius:var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full));--mat-focus-indicator-border-radius: var(--mat-list-active-indicator-shape, var(--mat-sys-corner-full))}.mat-mdc-nav-list .mat-mdc-list-item.mdc-list-item--activated{background-color:var(--mat-list-active-indicator-color, var(--mat-sys-secondary-container))}
</style><style ng-app-id="ng">.mat-focus-indicator{position:relative}.mat-focus-indicator::before{top:0;left:0;right:0;bottom:0;position:absolute;box-sizing:border-box;pointer-events:none;display:var(--mat-focus-indicator-display, none);border-width:var(--mat-focus-indicator-border-width, 3px);border-style:var(--mat-focus-indicator-border-style, solid);border-color:var(--mat-focus-indicator-border-color, transparent);border-radius:var(--mat-focus-indicator-border-radius, 4px)}.mat-focus-indicator:focus::before{content:""}@media(forced-colors: active){html{--mat-focus-indicator-display: block}}
</style><style ng-app-id="ng">.mat-ripple{overflow:hidden;position:relative}.mat-ripple:not(:empty){transform:translateZ(0)}.mat-ripple.mat-ripple-unbounded{overflow:visible}.mat-ripple-element{position:absolute;border-radius:50%;pointer-events:none;transition:opacity,transform 0ms cubic-bezier(0, 0, 0.2, 1);transform:scale3d(0, 0, 0);background-color:var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent))}@media(forced-colors: active){.mat-ripple-element{display:none}}.cdk-drag-preview .mat-ripple-element,.cdk-drag-placeholder .mat-ripple-element{display:none}
</style><style ng-app-id="ng">

[_nghost-ng-c1946550011] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0 0 16px 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2.5px);
  -webkit-backdrop-filter: blur(1.7px);
  width: 100%;
  padding: 0 1rem;
}
[_nghost-ng-c1946550011]   header[_ngcontent-ng-c1946550011] {
  display: flex;
  align-items: center;
}
/*# sourceMappingURL=/header.component.css.map */</style><style ng-app-id="ng">

.language-switcher[_ngcontent-ng-c2987055692] {
  padding: 16px;
}
.language-switcher[_ngcontent-ng-c2987055692]   [mat-button][_ngcontent-ng-c2987055692] {
  background-color: rgba(255, 255, 255, 0.3);
}
/*# sourceMappingURL=/language-switcher.component.css.map */</style><style ng-app-id="ng">.mat-mdc-button-base{text-decoration:none}.mat-mdc-button-base .mat-icon{min-height:fit-content;flex-shrink:0}.mdc-button{-webkit-user-select:none;user-select:none;position:relative;display:inline-flex;align-items:center;justify-content:center;box-sizing:border-box;min-width:64px;border:none;outline:none;line-height:inherit;-webkit-appearance:none;overflow:visible;vertical-align:middle;background:rgba(0,0,0,0);padding:0 8px}.mdc-button::-moz-focus-inner{padding:0;border:0}.mdc-button:active{outline:none}.mdc-button:hover{cursor:pointer}.mdc-button:disabled{cursor:default;pointer-events:none}.mdc-button[hidden]{display:none}.mdc-button .mdc-button__label{position:relative}.mat-mdc-button{padding:0 var(--mat-button-text-horizontal-padding, 12px);height:var(--mat-button-text-container-height, 40px);font-family:var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));letter-spacing:var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));text-transform:var(--mat-button-text-label-text-transform);font-weight:var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight))}.mat-mdc-button,.mat-mdc-button .mdc-button__ripple{border-radius:var(--mat-button-text-container-shape, var(--mat-sys-corner-full))}.mat-mdc-button:not(:disabled){color:var(--mat-button-text-label-text-color, var(--mat-sys-primary))}.mat-mdc-button[disabled],.mat-mdc-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-button:has(.material-icons,mat-icon,[matButtonIcon]){padding:0 var(--mat-button-text-with-icon-horizontal-padding, 16px)}.mat-mdc-button>.mat-icon{margin-right:var(--mat-button-text-icon-spacing, 8px);margin-left:var(--mat-button-text-icon-offset, -4px)}[dir=rtl] .mat-mdc-button>.mat-icon{margin-right:var(--mat-button-text-icon-offset, -4px);margin-left:var(--mat-button-text-icon-spacing, 8px)}.mat-mdc-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-text-icon-offset, -4px);margin-left:var(--mat-button-text-icon-spacing, 8px)}[dir=rtl] .mat-mdc-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-text-icon-spacing, 8px);margin-left:var(--mat-button-text-icon-offset, -4px)}.mat-mdc-button .mat-ripple-element{background-color:var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-text-state-layer-color, var(--mat-sys-primary))}.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-button:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-button.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-button.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-button.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-button:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-button-text-touch-target-size, 48px);display:var(--mat-button-text-touch-target-display, block);left:0;right:0;transform:translateY(-50%)}.mat-mdc-unelevated-button{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);height:var(--mat-button-filled-container-height, 40px);font-family:var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));letter-spacing:var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));text-transform:var(--mat-button-filled-label-text-transform);font-weight:var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));padding:0 var(--mat-button-filled-horizontal-padding, 24px)}.mat-mdc-unelevated-button>.mat-icon{margin-right:var(--mat-button-filled-icon-spacing, 8px);margin-left:var(--mat-button-filled-icon-offset, -8px)}[dir=rtl] .mat-mdc-unelevated-button>.mat-icon{margin-right:var(--mat-button-filled-icon-offset, -8px);margin-left:var(--mat-button-filled-icon-spacing, 8px)}.mat-mdc-unelevated-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-filled-icon-offset, -8px);margin-left:var(--mat-button-filled-icon-spacing, 8px)}[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-filled-icon-spacing, 8px);margin-left:var(--mat-button-filled-icon-offset, -8px)}.mat-mdc-unelevated-button .mat-ripple-element{background-color:var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary))}.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-unelevated-button:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-unelevated-button.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-unelevated-button:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-unelevated-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-button-filled-touch-target-size, 48px);display:var(--mat-button-filled-touch-target-display, block);left:0;right:0;transform:translateY(-50%)}.mat-mdc-unelevated-button:not(:disabled){color:var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));background-color:var(--mat-button-filled-container-color, var(--mat-sys-primary))}.mat-mdc-unelevated-button,.mat-mdc-unelevated-button .mdc-button__ripple{border-radius:var(--mat-button-filled-container-shape, var(--mat-sys-corner-full))}.mat-mdc-unelevated-button[disabled],.mat-mdc-unelevated-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));background-color:var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-raised-button{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);box-shadow:var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));height:var(--mat-button-protected-container-height, 40px);font-family:var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));letter-spacing:var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));text-transform:var(--mat-button-protected-label-text-transform);font-weight:var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));padding:0 var(--mat-button-protected-horizontal-padding, 24px)}.mat-mdc-raised-button>.mat-icon{margin-right:var(--mat-button-protected-icon-spacing, 8px);margin-left:var(--mat-button-protected-icon-offset, -8px)}[dir=rtl] .mat-mdc-raised-button>.mat-icon{margin-right:var(--mat-button-protected-icon-offset, -8px);margin-left:var(--mat-button-protected-icon-spacing, 8px)}.mat-mdc-raised-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-protected-icon-offset, -8px);margin-left:var(--mat-button-protected-icon-spacing, 8px)}[dir=rtl] .mat-mdc-raised-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-protected-icon-spacing, 8px);margin-left:var(--mat-button-protected-icon-offset, -8px)}.mat-mdc-raised-button .mat-ripple-element{background-color:var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-protected-state-layer-color, var(--mat-sys-primary))}.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-raised-button:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-raised-button.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-raised-button:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-raised-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-button-protected-touch-target-size, 48px);display:var(--mat-button-protected-touch-target-display, block);left:0;right:0;transform:translateY(-50%)}.mat-mdc-raised-button:not(:disabled){color:var(--mat-button-protected-label-text-color, var(--mat-sys-primary));background-color:var(--mat-button-protected-container-color, var(--mat-sys-surface))}.mat-mdc-raised-button,.mat-mdc-raised-button .mdc-button__ripple{border-radius:var(--mat-button-protected-container-shape, var(--mat-sys-corner-full))}.mat-mdc-raised-button:hover{box-shadow:var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2))}.mat-mdc-raised-button:focus{box-shadow:var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1))}.mat-mdc-raised-button:active,.mat-mdc-raised-button:focus:active{box-shadow:var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1))}.mat-mdc-raised-button[disabled],.mat-mdc-raised-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));background-color:var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-mdc-raised-button[disabled].mat-mdc-button-disabled,.mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled{box-shadow:var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0))}.mat-mdc-raised-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-outlined-button{border-style:solid;transition:border 280ms cubic-bezier(0.4, 0, 0.2, 1);height:var(--mat-button-outlined-container-height, 40px);font-family:var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));letter-spacing:var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));text-transform:var(--mat-button-outlined-label-text-transform);font-weight:var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));border-radius:var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));border-width:var(--mat-button-outlined-outline-width, 1px);padding:0 var(--mat-button-outlined-horizontal-padding, 24px)}.mat-mdc-outlined-button>.mat-icon{margin-right:var(--mat-button-outlined-icon-spacing, 8px);margin-left:var(--mat-button-outlined-icon-offset, -8px)}[dir=rtl] .mat-mdc-outlined-button>.mat-icon{margin-right:var(--mat-button-outlined-icon-offset, -8px);margin-left:var(--mat-button-outlined-icon-spacing, 8px)}.mat-mdc-outlined-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-outlined-icon-offset, -8px);margin-left:var(--mat-button-outlined-icon-spacing, 8px)}[dir=rtl] .mat-mdc-outlined-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-outlined-icon-spacing, 8px);margin-left:var(--mat-button-outlined-icon-offset, -8px)}.mat-mdc-outlined-button .mat-ripple-element{background-color:var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary))}.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-outlined-button:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-outlined-button.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-outlined-button:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-outlined-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-button-outlined-touch-target-size, 48px);display:var(--mat-button-outlined-touch-target-display, block);left:0;right:0;transform:translateY(-50%)}.mat-mdc-outlined-button:not(:disabled){color:var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));border-color:var(--mat-button-outlined-outline-color, var(--mat-sys-outline))}.mat-mdc-outlined-button[disabled],.mat-mdc-outlined-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));border-color:var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-tonal-button{transition:box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);height:var(--mat-button-tonal-container-height, 40px);font-family:var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));font-size:var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));letter-spacing:var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));text-transform:var(--mat-button-tonal-label-text-transform);font-weight:var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));padding:0 var(--mat-button-tonal-horizontal-padding, 24px)}.mat-tonal-button:not(:disabled){color:var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));background-color:var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container))}.mat-tonal-button,.mat-tonal-button .mdc-button__ripple{border-radius:var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full))}.mat-tonal-button[disabled],.mat-tonal-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));background-color:var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-tonal-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-tonal-button>.mat-icon{margin-right:var(--mat-button-tonal-icon-spacing, 8px);margin-left:var(--mat-button-tonal-icon-offset, -8px)}[dir=rtl] .mat-tonal-button>.mat-icon{margin-right:var(--mat-button-tonal-icon-offset, -8px);margin-left:var(--mat-button-tonal-icon-spacing, 8px)}.mat-tonal-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-tonal-icon-offset, -8px);margin-left:var(--mat-button-tonal-icon-spacing, 8px)}[dir=rtl] .mat-tonal-button .mdc-button__label+.mat-icon{margin-right:var(--mat-button-tonal-icon-spacing, 8px);margin-left:var(--mat-button-tonal-icon-offset, -8px)}.mat-tonal-button .mat-ripple-element{background-color:var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-tonal-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container))}.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-tonal-button:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-tonal-button.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-tonal-button.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-tonal-button.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-tonal-button:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-tonal-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-button-tonal-touch-target-size, 48px);display:var(--mat-button-tonal-touch-target-display, block);left:0;right:0;transform:translateY(-50%)}.mat-mdc-button,.mat-mdc-unelevated-button,.mat-mdc-raised-button,.mat-mdc-outlined-button,.mat-tonal-button{-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple,.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,.mat-tonal-button .mat-mdc-button-ripple,.mat-tonal-button .mat-mdc-button-persistent-ripple,.mat-tonal-button .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-button .mat-mdc-button-ripple,.mat-mdc-unelevated-button .mat-mdc-button-ripple,.mat-mdc-raised-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-tonal-button .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,.mat-tonal-button .mat-mdc-button-persistent-ripple::before{content:"";opacity:0}.mat-mdc-button .mdc-button__label,.mat-mdc-button .mat-icon,.mat-mdc-unelevated-button .mdc-button__label,.mat-mdc-unelevated-button .mat-icon,.mat-mdc-raised-button .mdc-button__label,.mat-mdc-raised-button .mat-icon,.mat-mdc-outlined-button .mdc-button__label,.mat-mdc-outlined-button .mat-icon,.mat-tonal-button .mdc-button__label,.mat-tonal-button .mat-icon{z-index:1;position:relative}.mat-mdc-button .mat-focus-indicator,.mat-mdc-unelevated-button .mat-focus-indicator,.mat-mdc-raised-button .mat-focus-indicator,.mat-mdc-outlined-button .mat-focus-indicator,.mat-tonal-button .mat-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit}.mat-mdc-button:focus>.mat-focus-indicator::before,.mat-mdc-unelevated-button:focus>.mat-focus-indicator::before,.mat-mdc-raised-button:focus>.mat-focus-indicator::before,.mat-mdc-outlined-button:focus>.mat-focus-indicator::before,.mat-tonal-button:focus>.mat-focus-indicator::before{content:"";border-radius:inherit}.mat-mdc-button._mat-animation-noopable,.mat-mdc-unelevated-button._mat-animation-noopable,.mat-mdc-raised-button._mat-animation-noopable,.mat-mdc-outlined-button._mat-animation-noopable,.mat-tonal-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-button>.mat-icon,.mat-mdc-unelevated-button>.mat-icon,.mat-mdc-raised-button>.mat-icon,.mat-mdc-outlined-button>.mat-icon,.mat-tonal-button>.mat-icon{display:inline-block;position:relative;vertical-align:top;font-size:1.125rem;height:1.125rem;width:1.125rem}.mat-mdc-outlined-button .mat-mdc-button-ripple,.mat-mdc-outlined-button .mdc-button__ripple{top:-1px;left:-1px;bottom:-1px;right:-1px}.mat-mdc-unelevated-button .mat-focus-indicator::before,.mat-tonal-button .mat-focus-indicator::before,.mat-mdc-raised-button .mat-focus-indicator::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px)*-1)}.mat-mdc-outlined-button .mat-focus-indicator::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px)*-1)}
</style><style ng-app-id="ng">@media(forced-colors: active){.mat-mdc-button:not(.mdc-button--outlined),.mat-mdc-unelevated-button:not(.mdc-button--outlined),.mat-mdc-raised-button:not(.mdc-button--outlined),.mat-mdc-outlined-button:not(.mdc-button--outlined),.mat-mdc-button-base.mat-tonal-button,.mat-mdc-icon-button.mat-mdc-icon-button,.mat-mdc-outlined-button .mdc-button__ripple{outline:solid 1px}}
</style><style ng-app-id="ng">mat-icon,mat-icon.mat-primary,mat-icon.mat-accent,mat-icon.mat-warn{color:var(--mat-icon-color, inherit)}.mat-icon{-webkit-user-select:none;user-select:none;background-repeat:no-repeat;display:inline-block;fill:currentColor;height:24px;width:24px;overflow:hidden}.mat-icon.mat-icon-inline{font-size:inherit;height:inherit;line-height:inherit;width:inherit}.mat-icon.mat-ligature-font[fontIcon]::before{content:attr(fontIcon)}[dir=rtl] .mat-icon-rtl-mirror{transform:scale(-1, 1)}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon{display:block}.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-prefix .mat-icon-button .mat-icon,.mat-form-field:not(.mat-form-field-appearance-legacy) .mat-form-field-suffix .mat-icon-button .mat-icon{margin:auto}
</style><style ng-app-id="ng">mat-menu{display:none}.mat-mdc-menu-content{margin:0;padding:8px 0;outline:0}.mat-mdc-menu-content,.mat-mdc-menu-content .mat-mdc-menu-item .mat-mdc-menu-item-text{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;flex:1;white-space:normal;font-family:var(--mat-menu-item-label-text-font, var(--mat-sys-label-large-font));line-height:var(--mat-menu-item-label-text-line-height, var(--mat-sys-label-large-line-height));font-size:var(--mat-menu-item-label-text-size, var(--mat-sys-label-large-size));letter-spacing:var(--mat-menu-item-label-text-tracking, var(--mat-sys-label-large-tracking));font-weight:var(--mat-menu-item-label-text-weight, var(--mat-sys-label-large-weight))}@keyframes _mat-menu-enter{from{opacity:0;transform:scale(0.8)}to{opacity:1;transform:none}}@keyframes _mat-menu-exit{from{opacity:1}to{opacity:0}}.mat-mdc-menu-panel{min-width:112px;max-width:280px;overflow:auto;box-sizing:border-box;outline:0;animation:_mat-menu-enter 120ms cubic-bezier(0, 0, 0.2, 1);border-radius:var(--mat-menu-container-shape, var(--mat-sys-corner-extra-small));background-color:var(--mat-menu-container-color, var(--mat-sys-surface-container));box-shadow:var(--mat-menu-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));will-change:transform,opacity}.mat-mdc-menu-panel.mat-menu-panel-exit-animation{animation:_mat-menu-exit 100ms 25ms linear forwards}.mat-mdc-menu-panel.mat-menu-panel-animations-disabled{animation:none}.mat-mdc-menu-panel.mat-menu-panel-animating{pointer-events:none}.mat-mdc-menu-panel.mat-menu-panel-animating:has(.mat-mdc-menu-content:empty){display:none}@media(forced-colors: active){.mat-mdc-menu-panel{outline:solid 1px}}.mat-mdc-menu-panel .mat-divider{color:var(--mat-menu-divider-color, var(--mat-sys-surface-variant));margin-bottom:var(--mat-menu-divider-bottom-spacing, 8px);margin-top:var(--mat-menu-divider-top-spacing, 8px)}.mat-mdc-menu-item{display:flex;position:relative;align-items:center;justify-content:flex-start;overflow:hidden;padding:0;cursor:pointer;width:100%;text-align:left;box-sizing:border-box;color:inherit;font-size:inherit;background:none;text-decoration:none;margin:0;min-height:48px;padding-left:var(--mat-menu-item-leading-spacing, 12px);padding-right:var(--mat-menu-item-trailing-spacing, 12px);-webkit-user-select:none;user-select:none;cursor:pointer;outline:none;border:none;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-menu-item::-moz-focus-inner{border:0}[dir=rtl] .mat-mdc-menu-item{padding-left:var(--mat-menu-item-trailing-spacing, 12px);padding-right:var(--mat-menu-item-leading-spacing, 12px)}.mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon]){padding-left:var(--mat-menu-item-with-icon-leading-spacing, 12px);padding-right:var(--mat-menu-item-with-icon-trailing-spacing, 12px)}[dir=rtl] .mat-mdc-menu-item:has(.material-icons,mat-icon,[matButtonIcon]){padding-left:var(--mat-menu-item-with-icon-trailing-spacing, 12px);padding-right:var(--mat-menu-item-with-icon-leading-spacing, 12px)}.mat-mdc-menu-item,.mat-mdc-menu-item:visited,.mat-mdc-menu-item:link{color:var(--mat-menu-item-label-text-color, var(--mat-sys-on-surface))}.mat-mdc-menu-item .mat-icon-no-color,.mat-mdc-menu-item .mat-mdc-menu-submenu-icon{color:var(--mat-menu-item-icon-color, var(--mat-sys-on-surface-variant))}.mat-mdc-menu-item[disabled]{cursor:default;opacity:.38}.mat-mdc-menu-item[disabled]::after{display:block;position:absolute;content:"";top:0;left:0;bottom:0;right:0}.mat-mdc-menu-item:focus{outline:0}.mat-mdc-menu-item .mat-icon{flex-shrink:0;margin-right:var(--mat-menu-item-spacing, 12px);height:var(--mat-menu-item-icon-size, 24px);width:var(--mat-menu-item-icon-size, 24px)}[dir=rtl] .mat-mdc-menu-item{text-align:right}[dir=rtl] .mat-mdc-menu-item .mat-icon{margin-right:0;margin-left:var(--mat-menu-item-spacing, 12px)}.mat-mdc-menu-item:not([disabled]):hover{background-color:var(--mat-menu-item-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent))}.mat-mdc-menu-item:not([disabled]).cdk-program-focused,.mat-mdc-menu-item:not([disabled]).cdk-keyboard-focused,.mat-mdc-menu-item:not([disabled]).mat-mdc-menu-item-highlighted{background-color:var(--mat-menu-item-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent))}@media(forced-colors: active){.mat-mdc-menu-item{margin-top:1px}}.mat-mdc-menu-submenu-icon{width:var(--mat-menu-item-icon-size, 24px);height:10px;fill:currentColor;padding-left:var(--mat-menu-item-spacing, 12px)}[dir=rtl] .mat-mdc-menu-submenu-icon{padding-right:var(--mat-menu-item-spacing, 12px);padding-left:0}[dir=rtl] .mat-mdc-menu-submenu-icon polygon{transform:scaleX(-1);transform-origin:center}@media(forced-colors: active){.mat-mdc-menu-submenu-icon{fill:CanvasText}}.mat-mdc-menu-item .mat-mdc-menu-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}
</style><style ng-app-id="ng">

.dashboard-container[_ngcontent-ng-c1044424293] {
  padding: 24px;
  min-height: 100vh;
  animation: _ngcontent-ng-c1044424293_fadeIn 0.5s ease-in-out;
}
@media (max-width: 768px) {
  .dashboard-container[_ngcontent-ng-c1044424293] {
    padding: 16px;
  }
}
@keyframes _ngcontent-ng-c1044424293_fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.dashboard-header[_ngcontent-ng-c1044424293] {
  margin-bottom: 32px;
  animation: _ngcontent-ng-c1044424293_fadeInUp 0.6s ease-in-out;
}
.dashboard-header[_ngcontent-ng-c1044424293]   .dashboard-title[_ngcontent-ng-c1044424293] {
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}
@media (max-width: 768px) {
  .dashboard-header[_ngcontent-ng-c1044424293]   .dashboard-title[_ngcontent-ng-c1044424293] {
    font-size: 1.8rem;
  }
}
.dashboard-header[_ngcontent-ng-c1044424293]   .dashboard-subtitle[_ngcontent-ng-c1044424293] {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
}
@keyframes _ngcontent-ng-c1044424293_fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.summary-grid[_ngcontent-ng-c1044424293] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}
@media (max-width: 768px) {
  .summary-grid[_ngcontent-ng-c1044424293] {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
.trends-section[_ngcontent-ng-c1044424293] {
  margin-bottom: 32px;
}
.charts-grid[_ngcontent-ng-c1044424293] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: 24px;
  margin-bottom: 32px;
}
@media (max-width: 1024px) {
  .charts-grid[_ngcontent-ng-c1044424293] {
    grid-template-columns: 1fr;
  }
}
.alerts-section[_ngcontent-ng-c1044424293] {
  margin-bottom: 32px;
}
/*# sourceMappingURL=/dashboard.component.css.map */</style><style ng-app-id="ng">

.trends-card[_ngcontent-ng-c420538357] {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.trends-card[_ngcontent-ng-c420538357]:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
.trends-card[_ngcontent-ng-c420538357]   mat-card-header[_ngcontent-ng-c420538357] {
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
  color: white;
  padding: 16px 24px;
  border-radius: 12px 12px 0 0;
  margin: -16px -16px 16px -16px;
}
.trends-card[_ngcontent-ng-c420538357]   mat-card-header[_ngcontent-ng-c420538357]   mat-card-title[_ngcontent-ng-c420538357] {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}
.trends-card[_ngcontent-ng-c420538357]   mat-card-header[_ngcontent-ng-c420538357]   mat-card-title[_ngcontent-ng-c420538357]   mat-icon[_ngcontent-ng-c420538357] {
  font-size: 24px;
  width: 24px;
  height: 24px;
}
.trends-card[_ngcontent-ng-c420538357]   mat-card-content[_ngcontent-ng-c420538357] {
  padding: 24px !important;
}
.trends-grid[_ngcontent-ng-c420538357] {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}
.trend-item[_ngcontent-ng-c420538357] {
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  border-left: 4px solid #4caf50;
  transition: all 0.3s ease;
}
.trend-item[_ngcontent-ng-c420538357]:hover {
  transform: translateX(8px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.trend-item.positive[_ngcontent-ng-c420538357] {
  border-left-color: #4caf50;
}
.trend-item[_ngcontent-ng-c420538357]   .trend-label[_ngcontent-ng-c420538357] {
  margin: 0 0 12px 0;
  font-size: 0.875rem;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
}
.trend-item[_ngcontent-ng-c420538357]   .trend-value-row[_ngcontent-ng-c420538357] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.trend-item[_ngcontent-ng-c420538357]   .trend-value[_ngcontent-ng-c420538357] {
  font-size: 1.5rem;
  font-weight: 700;
  color: #333;
}
.trend-item[_ngcontent-ng-c420538357]   .trend-change[_ngcontent-ng-c420538357] {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #4caf50;
  padding: 4px 8px;
  background: rgba(76, 175, 80, 0.1);
  border-radius: 4px;
}
.trend-item[_ngcontent-ng-c420538357]   .trend-change[_ngcontent-ng-c420538357]   mat-icon[_ngcontent-ng-c420538357] {
  font-size: 16px;
  width: 16px;
  height: 16px;
}
.trend-item[_ngcontent-ng-c420538357]   .trend-change.negative[_ngcontent-ng-c420538357] {
  color: #f44336;
  background: rgba(244, 67, 54, 0.1);
}
/*# sourceMappingURL=/trends-section.component.css.map */</style><style ng-app-id="ng">

.chart-card[_ngcontent-ng-c198939795] {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.chart-card[_ngcontent-ng-c198939795]:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
.chart-card[_ngcontent-ng-c198939795]   mat-card-header[_ngcontent-ng-c198939795] {
  background:
    linear-gradient(
      135deg,
      #2196f3 0%,
      #21cbf3 100%);
  color: white;
  padding: 16px 24px;
  border-radius: 12px 12px 0 0;
  margin: -16px -16px 16px -16px;
}
.chart-card[_ngcontent-ng-c198939795]   mat-card-header[_ngcontent-ng-c198939795]   mat-card-title[_ngcontent-ng-c198939795] {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}
.chart-card[_ngcontent-ng-c198939795]   mat-card-header[_ngcontent-ng-c198939795]   mat-card-title[_ngcontent-ng-c198939795]   mat-icon[_ngcontent-ng-c198939795] {
  font-size: 24px;
  width: 24px;
  height: 24px;
}
.chart-card[_ngcontent-ng-c198939795]   mat-card-content[_ngcontent-ng-c198939795] {
  padding: 24px !important;
}
.budget-chart[_ngcontent-ng-c198939795] {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.budget-category-item[_ngcontent-ng-c198939795]   .category-header[_ngcontent-ng-c198939795] {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 0.875rem;
}
.budget-category-item[_ngcontent-ng-c198939795]   .category-header[_ngcontent-ng-c198939795]   .category-name[_ngcontent-ng-c198939795] {
  font-weight: 600;
  color: #333;
}
.budget-category-item[_ngcontent-ng-c198939795]   .category-header[_ngcontent-ng-c198939795]   .category-value[_ngcontent-ng-c198939795] {
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
}
.budget-category-item[_ngcontent-ng-c198939795]   .category-bar-container[_ngcontent-ng-c198939795] {
  height: 32px;
  background: #e0e0e0;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
}
.budget-category-item[_ngcontent-ng-c198939795]   .category-bar[_ngcontent-ng-c198939795] {
  height: 100%;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 12px;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.budget-category-item[_ngcontent-ng-c198939795]   .category-bar[_ngcontent-ng-c198939795]   .bar-percentage[_ngcontent-ng-c198939795] {
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  position: relative;
  z-index: 1;
}
.budget-category-item[_ngcontent-ng-c198939795]:hover   .category-bar[_ngcontent-ng-c198939795] {
  filter: brightness(1.1);
  transform: scaleX(1.02);
}
/*# sourceMappingURL=/budget-chart.component.css.map */</style><style ng-app-id="ng">

.chart-card[_ngcontent-ng-c1918002196] {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.chart-card[_ngcontent-ng-c1918002196]:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
.chart-card[_ngcontent-ng-c1918002196]   mat-card-header[_ngcontent-ng-c1918002196] {
  background:
    linear-gradient(
      135deg,
      #2196f3 0%,
      #21cbf3 100%);
  color: white;
  padding: 16px 24px;
  border-radius: 12px 12px 0 0;
  margin: -16px -16px 16px -16px;
}
.chart-card[_ngcontent-ng-c1918002196]   mat-card-header[_ngcontent-ng-c1918002196]   mat-card-title[_ngcontent-ng-c1918002196] {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}
.chart-card[_ngcontent-ng-c1918002196]   mat-card-header[_ngcontent-ng-c1918002196]   mat-card-title[_ngcontent-ng-c1918002196]   mat-icon[_ngcontent-ng-c1918002196] {
  font-size: 24px;
  width: 24px;
  height: 24px;
}
.chart-card[_ngcontent-ng-c1918002196]   mat-card-content[_ngcontent-ng-c1918002196] {
  padding: 24px !important;
}
.monthly-chart[_ngcontent-ng-c1918002196]   .chart-bars[_ngcontent-ng-c1918002196] {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  height: 300px;
  gap: 12px;
  margin-bottom: 24px;
  padding: 20px 0;
}
@media (max-width: 768px) {
  .monthly-chart[_ngcontent-ng-c1918002196]   .chart-bars[_ngcontent-ng-c1918002196] {
    height: 250px;
    gap: 8px;
  }
}
.monthly-chart[_ngcontent-ng-c1918002196]   .month-group[_ngcontent-ng-c1918002196] {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}
.monthly-chart[_ngcontent-ng-c1918002196]   .month-group[_ngcontent-ng-c1918002196]:hover {
  transform: translateY(-8px);
}
.monthly-chart[_ngcontent-ng-c1918002196]   .month-group.selected[_ngcontent-ng-c1918002196]   .bars-container[_ngcontent-ng-c1918002196] {
  transform: scale(1.05);
}
.monthly-chart[_ngcontent-ng-c1918002196]   .month-group.selected[_ngcontent-ng-c1918002196]   .month-label[_ngcontent-ng-c1918002196] {
  color: #3f51b5;
  font-weight: 700;
}
.monthly-chart[_ngcontent-ng-c1918002196]   .month-group[_ngcontent-ng-c1918002196]   .bars-container[_ngcontent-ng-c1918002196] {
  display: flex;
  gap: 6px;
  align-items: flex-end;
  height: 100%;
  transition: all 0.3s ease;
}
.monthly-chart[_ngcontent-ng-c1918002196]   .month-group[_ngcontent-ng-c1918002196]   .bar[_ngcontent-ng-c1918002196] {
  width: 30px;
  min-height: 10px;
  border-radius: 8px 8px 0 0;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}
@media (max-width: 768px) {
  .monthly-chart[_ngcontent-ng-c1918002196]   .month-group[_ngcontent-ng-c1918002196]   .bar[_ngcontent-ng-c1918002196] {
    width: 20px;
  }
}
.monthly-chart[_ngcontent-ng-c1918002196]   .month-group[_ngcontent-ng-c1918002196]   .bar[_ngcontent-ng-c1918002196]:hover {
  filter: brightness(1.2);
  transform: scaleY(1.05);
}
.monthly-chart[_ngcontent-ng-c1918002196]   .month-group[_ngcontent-ng-c1918002196]   .bar[_ngcontent-ng-c1918002196]   .bar-label[_ngcontent-ng-c1918002196] {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.65rem;
  font-weight: 600;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
}
@media (max-width: 768px) {
  .monthly-chart[_ngcontent-ng-c1918002196]   .month-group[_ngcontent-ng-c1918002196]   .bar[_ngcontent-ng-c1918002196]   .bar-label[_ngcontent-ng-c1918002196] {
    display: none;
  }
}
.monthly-chart[_ngcontent-ng-c1918002196]   .month-group[_ngcontent-ng-c1918002196]   .bar[_ngcontent-ng-c1918002196]:hover   .bar-label[_ngcontent-ng-c1918002196] {
  opacity: 1;
}
.monthly-chart[_ngcontent-ng-c1918002196]   .month-group[_ngcontent-ng-c1918002196]   .income-bar[_ngcontent-ng-c1918002196] {
  background:
    linear-gradient(
      180deg,
      #4caf50 0%,
      #8bc34a 100%);
}
.monthly-chart[_ngcontent-ng-c1918002196]   .month-group[_ngcontent-ng-c1918002196]   .expenses-bar[_ngcontent-ng-c1918002196] {
  background:
    linear-gradient(
      180deg,
      #f44336 0%,
      #e91e63 100%);
}
.monthly-chart[_ngcontent-ng-c1918002196]   .month-group[_ngcontent-ng-c1918002196]   .month-label[_ngcontent-ng-c1918002196] {
  margin-top: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.7);
  transition: all 0.3s ease;
}
.monthly-chart[_ngcontent-ng-c1918002196]   .chart-legend[_ngcontent-ng-c1918002196] {
  display: flex;
  justify-content: center;
  gap: 32px;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 8px;
}
.monthly-chart[_ngcontent-ng-c1918002196]   .chart-legend[_ngcontent-ng-c1918002196]   .legend-item[_ngcontent-ng-c1918002196] {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
}
.monthly-chart[_ngcontent-ng-c1918002196]   .chart-legend[_ngcontent-ng-c1918002196]   .legend-item[_ngcontent-ng-c1918002196]   .legend-color[_ngcontent-ng-c1918002196] {
  width: 16px;
  height: 16px;
  border-radius: 4px;
}
.monthly-chart[_ngcontent-ng-c1918002196]   .chart-legend[_ngcontent-ng-c1918002196]   .legend-item[_ngcontent-ng-c1918002196]   .income-color[_ngcontent-ng-c1918002196] {
  background:
    linear-gradient(
      135deg,
      #4caf50 0%,
      #8bc34a 100%);
}
.monthly-chart[_ngcontent-ng-c1918002196]   .chart-legend[_ngcontent-ng-c1918002196]   .legend-item[_ngcontent-ng-c1918002196]   .expenses-color[_ngcontent-ng-c1918002196] {
  background:
    linear-gradient(
      135deg,
      #f44336 0%,
      #e91e63 100%);
}
/*# sourceMappingURL=/monthly-trend-chart.component.css.map */</style><style ng-app-id="ng">

.alerts-card[_ngcontent-ng-c2410019262] {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}
.alerts-card[_ngcontent-ng-c2410019262]:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
.alerts-card[_ngcontent-ng-c2410019262]   mat-card-header[_ngcontent-ng-c2410019262] {
  background:
    linear-gradient(
      135deg,
      #ff9800 0%,
      #ff5722 100%);
  color: white;
  padding: 16px 24px;
  border-radius: 12px 12px 0 0;
  margin: -16px -16px 16px -16px;
}
.alerts-card[_ngcontent-ng-c2410019262]   mat-card-header[_ngcontent-ng-c2410019262]   mat-card-title[_ngcontent-ng-c2410019262] {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}
.alerts-card[_ngcontent-ng-c2410019262]   mat-card-header[_ngcontent-ng-c2410019262]   mat-card-title[_ngcontent-ng-c2410019262]   mat-icon[_ngcontent-ng-c2410019262] {
  font-size: 24px;
  width: 24px;
  height: 24px;
}
.alerts-card[_ngcontent-ng-c2410019262]   mat-card-header[_ngcontent-ng-c2410019262]   mat-card-title[_ngcontent-ng-c2410019262]   .alert-count[_ngcontent-ng-c2410019262] {
  margin-left: auto;
  background: rgba(255, 255, 255, 0.3);
  color: white;
  font-weight: 700;
}
.alerts-card[_ngcontent-ng-c2410019262]   mat-card-content[_ngcontent-ng-c2410019262] {
  padding: 0 !important;
}
.alerts-list[_ngcontent-ng-c2410019262] {
  display: flex;
  flex-direction: column;
}
.alert-item[_ngcontent-ng-c2410019262] {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #e0e0e0;
  transition: all 0.3s ease;
}
.alert-item[_ngcontent-ng-c2410019262]:last-child {
  border-bottom: none;
}
.alert-item[_ngcontent-ng-c2410019262]:hover {
  background: #f5f5f5;
  padding-left: 32px;
}
.alert-item[_ngcontent-ng-c2410019262]   .alert-icon[_ngcontent-ng-c2410019262] {
  font-size: 24px;
  width: 24px;
  height: 24px;
}
.alert-item[_ngcontent-ng-c2410019262]   .alert-message[_ngcontent-ng-c2410019262] {
  flex: 1;
  font-size: 0.9375rem;
  color: #333;
}
.alert-item[_ngcontent-ng-c2410019262]   .alert-action[_ngcontent-ng-c2410019262] {
  opacity: 0;
  transition: opacity 0.3s ease;
}
.alert-item[_ngcontent-ng-c2410019262]:hover   .alert-action[_ngcontent-ng-c2410019262] {
  opacity: 1;
}
.alert-item.alert-error[_ngcontent-ng-c2410019262] {
  border-left: 4px solid #f44336;
}
.alert-item.alert-error[_ngcontent-ng-c2410019262]   .alert-icon[_ngcontent-ng-c2410019262] {
  color: #f44336;
}
.alert-item.alert-warning[_ngcontent-ng-c2410019262] {
  border-left: 4px solid #ff9800;
}
.alert-item.alert-warning[_ngcontent-ng-c2410019262]   .alert-icon[_ngcontent-ng-c2410019262] {
  color: #ff9800;
}
.alert-item.alert-info[_ngcontent-ng-c2410019262] {
  border-left: 4px solid #2196f3;
}
.alert-item.alert-info[_ngcontent-ng-c2410019262]   .alert-icon[_ngcontent-ng-c2410019262] {
  color: #2196f3;
}
/*# sourceMappingURL=/alerts-list.component.css.map */</style><style ng-app-id="ng">.mat-mdc-card{display:flex;flex-direction:column;box-sizing:border-box;position:relative;border-style:solid;border-width:0;background-color:var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));border-color:var(--mat-card-elevated-container-color, var(--mat-sys-surface-container-low));border-radius:var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium));box-shadow:var(--mat-card-elevated-container-elevation, var(--mat-sys-level1))}.mat-mdc-card::after{position:absolute;top:0;left:0;width:100%;height:100%;border:solid 1px rgba(0,0,0,0);content:"";display:block;pointer-events:none;box-sizing:border-box;border-radius:var(--mat-card-elevated-container-shape, var(--mat-sys-corner-medium))}.mat-mdc-card-outlined{background-color:var(--mat-card-outlined-container-color, var(--mat-sys-surface));border-radius:var(--mat-card-outlined-container-shape, var(--mat-sys-corner-medium));border-width:var(--mat-card-outlined-outline-width, 1px);border-color:var(--mat-card-outlined-outline-color, var(--mat-sys-outline-variant));box-shadow:var(--mat-card-outlined-container-elevation, var(--mat-sys-level0))}.mat-mdc-card-outlined::after{border:none}.mat-mdc-card-filled{background-color:var(--mat-card-filled-container-color, var(--mat-sys-surface-container-highest));border-radius:var(--mat-card-filled-container-shape, var(--mat-sys-corner-medium));box-shadow:var(--mat-card-filled-container-elevation, var(--mat-sys-level0))}.mdc-card__media{position:relative;box-sizing:border-box;background-repeat:no-repeat;background-position:center;background-size:cover}.mdc-card__media::before{display:block;content:""}.mdc-card__media:first-child{border-top-left-radius:inherit;border-top-right-radius:inherit}.mdc-card__media:last-child{border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.mat-mdc-card-actions{display:flex;flex-direction:row;align-items:center;box-sizing:border-box;min-height:52px;padding:8px}.mat-mdc-card-title{font-family:var(--mat-card-title-text-font, var(--mat-sys-title-large-font));line-height:var(--mat-card-title-text-line-height, var(--mat-sys-title-large-line-height));font-size:var(--mat-card-title-text-size, var(--mat-sys-title-large-size));letter-spacing:var(--mat-card-title-text-tracking, var(--mat-sys-title-large-tracking));font-weight:var(--mat-card-title-text-weight, var(--mat-sys-title-large-weight))}.mat-mdc-card-subtitle{color:var(--mat-card-subtitle-text-color, var(--mat-sys-on-surface));font-family:var(--mat-card-subtitle-text-font, var(--mat-sys-title-medium-font));line-height:var(--mat-card-subtitle-text-line-height, var(--mat-sys-title-medium-line-height));font-size:var(--mat-card-subtitle-text-size, var(--mat-sys-title-medium-size));letter-spacing:var(--mat-card-subtitle-text-tracking, var(--mat-sys-title-medium-tracking));font-weight:var(--mat-card-subtitle-text-weight, var(--mat-sys-title-medium-weight))}.mat-mdc-card-title,.mat-mdc-card-subtitle{display:block;margin:0}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle{padding:16px 16px 0}.mat-mdc-card-header{display:flex;padding:16px 16px 0}.mat-mdc-card-content{display:block;padding:0 16px}.mat-mdc-card-content:first-child{padding-top:16px}.mat-mdc-card-content:last-child{padding-bottom:16px}.mat-mdc-card-title-group{display:flex;justify-content:space-between;width:100%}.mat-mdc-card-avatar{height:40px;width:40px;border-radius:50%;flex-shrink:0;margin-bottom:16px;object-fit:cover}.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-avatar~.mat-mdc-card-header-text .mat-mdc-card-title{line-height:normal}.mat-mdc-card-sm-image{width:80px;height:80px}.mat-mdc-card-md-image{width:112px;height:112px}.mat-mdc-card-lg-image{width:152px;height:152px}.mat-mdc-card-xl-image{width:240px;height:240px}.mat-mdc-card-subtitle~.mat-mdc-card-title,.mat-mdc-card-title~.mat-mdc-card-subtitle,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-title,.mat-mdc-card-header .mat-mdc-card-header-text .mat-mdc-card-subtitle,.mat-mdc-card-title-group .mat-mdc-card-title,.mat-mdc-card-title-group .mat-mdc-card-subtitle{padding-top:0}.mat-mdc-card-content>:last-child:not(.mat-mdc-card-footer){margin-bottom:0}.mat-mdc-card-actions-align-end{justify-content:flex-end}
</style><style ng-app-id="ng">.mdc-evolution-chip,.mdc-evolution-chip__cell,.mdc-evolution-chip__action{display:inline-flex;align-items:center}.mdc-evolution-chip{position:relative;max-width:100%}.mdc-evolution-chip__cell,.mdc-evolution-chip__action{height:100%}.mdc-evolution-chip__cell--primary{flex-basis:100%;overflow-x:hidden}.mdc-evolution-chip__cell--trailing{flex:1 0 auto}.mdc-evolution-chip__action{align-items:center;background:none;border:none;box-sizing:content-box;cursor:pointer;display:inline-flex;justify-content:center;outline:none;padding:0;text-decoration:none;color:inherit}.mdc-evolution-chip__action--presentational{cursor:auto}.mdc-evolution-chip--disabled,.mdc-evolution-chip__action:disabled{pointer-events:none}@media(forced-colors: active){.mdc-evolution-chip--disabled,.mdc-evolution-chip__action:disabled{forced-color-adjust:none}}.mdc-evolution-chip__action--primary{font:inherit;letter-spacing:inherit;white-space:inherit;overflow-x:hidden}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary::before{border-width:var(--mat-chip-outline-width, 1px);border-radius:var(--mat-chip-container-shape-radius, 8px);box-sizing:border-box;content:"";height:100%;left:0;position:absolute;pointer-events:none;top:0;width:100%;z-index:1;border-style:solid}.mat-mdc-standard-chip .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:12px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:0}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--primary::before{border-color:var(--mat-chip-outline-color, var(--mat-sys-outline))}.mdc-evolution-chip__action--primary:not(.mdc-evolution-chip__action--presentational):not(.mdc-ripple-upgraded):focus::before{border-color:var(--mat-chip-focus-outline-color, var(--mat-sys-on-surface-variant))}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--primary::before{border-color:var(--mat-chip-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__action--primary::before{border-width:var(--mat-chip-flat-selected-outline-width, 0)}.mat-mdc-basic-chip .mdc-evolution-chip__action--primary{font:inherit}.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:0}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:0}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}.mat-mdc-standard-chip.mdc-evolution-chip--with-leading-action.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:0;padding-right:12px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__action--primary{padding-left:12px;padding-right:0}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--primary{padding-left:0;padding-right:0}.mdc-evolution-chip__action--secondary{position:relative;overflow:visible}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__action--secondary{color:var(--mat-chip-with-trailing-icon-trailing-icon-color, var(--mat-sys-on-surface-variant))}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__action--secondary{color:var(--mat-chip-with-trailing-icon-disabled-trailing-icon-color, var(--mat-sys-on-surface))}.mat-mdc-standard-chip.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary{padding-left:8px;padding-right:8px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary{padding-left:8px;padding-right:8px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary{padding-left:8px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__action--secondary{padding-left:8px;padding-right:8px}.mdc-evolution-chip__text-label{-webkit-user-select:none;user-select:none;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.mat-mdc-standard-chip .mdc-evolution-chip__text-label{font-family:var(--mat-chip-label-text-font, var(--mat-sys-label-large-font));line-height:var(--mat-chip-label-text-line-height, var(--mat-sys-label-large-line-height));font-size:var(--mat-chip-label-text-size, var(--mat-sys-label-large-size));font-weight:var(--mat-chip-label-text-weight, var(--mat-sys-label-large-weight));letter-spacing:var(--mat-chip-label-text-tracking, var(--mat-sys-label-large-tracking))}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label{color:var(--mat-chip-label-text-color, var(--mat-sys-on-surface-variant))}.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__text-label{color:var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container))}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label,.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__text-label{color:var(--mat-chip-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mdc-evolution-chip__graphic{align-items:center;display:inline-flex;justify-content:center;overflow:hidden;pointer-events:none;position:relative;flex:1 0 auto}.mat-mdc-standard-chip .mdc-evolution-chip__graphic{width:var(--mat-chip-with-avatar-avatar-size, 24px);height:var(--mat-chip-with-avatar-avatar-size, 24px);font-size:var(--mat-chip-with-avatar-avatar-size, 24px)}.mdc-evolution-chip--selecting .mdc-evolution-chip__graphic{transition:width 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selectable:not(.mdc-evolution-chip--selected):not(.mdc-evolution-chip--with-primary-icon) .mdc-evolution-chip__graphic{width:0}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic .mdc-evolution-chip__graphic{padding-left:8px;padding-right:4px}.mat-mdc-standard-chip.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:6px;padding-right:6px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:4px;padding-right:8px}[dir=rtl] .mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-trailing-action .mdc-evolution-chip__graphic{padding-left:8px;padding-right:4px}.mdc-evolution-chip--with-avatar.mdc-evolution-chip--with-primary-graphic.mdc-evolution-chip--with-leading-action .mdc-evolution-chip__graphic{padding-left:0}.mdc-evolution-chip__checkmark{position:absolute;opacity:0;top:50%;left:50%;height:20px;width:20px}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__checkmark{color:var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container))}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__checkmark{color:var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface))}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark{transition:transform 150ms 0ms cubic-bezier(0.4, 0, 0.2, 1);transform:translate(-75%, -50%)}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark{transform:translate(-50%, -50%);opacity:1}.mdc-evolution-chip__checkmark-svg{display:block}.mdc-evolution-chip__checkmark-path{stroke-width:2px;stroke-dasharray:29.7833385;stroke-dashoffset:29.7833385;stroke:currentColor}.mdc-evolution-chip--selecting .mdc-evolution-chip__checkmark-path{transition:stroke-dashoffset 150ms 45ms cubic-bezier(0.4, 0, 0.2, 1)}.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark-path{stroke-dashoffset:0}@media(forced-colors: active){.mdc-evolution-chip__checkmark-path{stroke:CanvasText !important}}.mat-mdc-standard-chip .mdc-evolution-chip__icon--trailing{height:18px;width:18px;font-size:18px}.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove{opacity:calc(var(--mat-chip-trailing-action-opacity, 1)*var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38))}.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing.mat-mdc-chip-remove:focus{opacity:calc(var(--mat-chip-trailing-action-focus-opacity, 1)*var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38))}.mat-mdc-standard-chip{border-radius:var(--mat-chip-container-shape-radius, 8px);height:var(--mat-chip-container-height, 32px)}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled){background-color:var(--mat-chip-elevated-container-color, transparent)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{background-color:var(--mat-chip-elevated-disabled-container-color)}.mat-mdc-standard-chip.mdc-evolution-chip--selected:not(.mdc-evolution-chip--disabled){background-color:var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container))}.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled{background-color:var(--mat-chip-flat-disabled-selected-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent))}@media(forced-colors: active){.mat-mdc-standard-chip{outline:solid 1px}}.mat-mdc-standard-chip .mdc-evolution-chip__icon--primary{border-radius:var(--mat-chip-with-avatar-avatar-shape-radius, 24px);width:var(--mat-chip-with-icon-icon-size, 18px);height:var(--mat-chip-with-icon-icon-size, 18px);font-size:var(--mat-chip-with-icon-icon-size, 18px)}.mdc-evolution-chip--selected .mdc-evolution-chip__icon--primary{opacity:0}.mat-mdc-standard-chip:not(.mdc-evolution-chip--disabled) .mdc-evolution-chip__icon--primary{color:var(--mat-chip-with-icon-icon-color, var(--mat-sys-on-surface-variant))}.mat-mdc-standard-chip.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--primary{color:var(--mat-chip-with-icon-disabled-icon-color, var(--mat-sys-on-surface))}.mat-mdc-chip-highlighted{--mat-chip-with-icon-icon-color: var(--mat-chip-with-icon-selected-icon-color, var(--mat-sys-on-secondary-container));--mat-chip-elevated-container-color: var(--mat-chip-elevated-selected-container-color, var(--mat-sys-secondary-container));--mat-chip-label-text-color: var(--mat-chip-selected-label-text-color, var(--mat-sys-on-secondary-container));--mat-chip-outline-width: var(--mat-chip-flat-selected-outline-width, 0)}.mat-mdc-chip-focus-overlay{background:var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-chip-selected .mat-mdc-chip-focus-overlay,.mat-mdc-chip-highlighted .mat-mdc-chip-focus-overlay{background:var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container))}.mat-mdc-chip:hover .mat-mdc-chip-focus-overlay{background:var(--mat-chip-hover-state-layer-color, var(--mat-sys-on-surface-variant));opacity:var(--mat-chip-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-chip-focus-overlay .mat-mdc-chip-selected:hover,.mat-mdc-chip-highlighted:hover .mat-mdc-chip-focus-overlay{background:var(--mat-chip-selected-hover-state-layer-color, var(--mat-sys-on-secondary-container));opacity:var(--mat-chip-selected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-chip.cdk-focused .mat-mdc-chip-focus-overlay{background:var(--mat-chip-focus-state-layer-color, var(--mat-sys-on-surface-variant));opacity:var(--mat-chip-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-chip-selected.cdk-focused .mat-mdc-chip-focus-overlay,.mat-mdc-chip-highlighted.cdk-focused .mat-mdc-chip-focus-overlay{background:var(--mat-chip-selected-focus-state-layer-color, var(--mat-sys-on-secondary-container));opacity:var(--mat-chip-selected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mdc-evolution-chip--disabled:not(.mdc-evolution-chip--selected) .mat-mdc-chip-avatar{opacity:var(--mat-chip-with-avatar-disabled-avatar-opacity, 0.38)}.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing{opacity:var(--mat-chip-with-trailing-icon-disabled-trailing-icon-opacity, 0.38)}.mdc-evolution-chip--disabled.mdc-evolution-chip--selected .mdc-evolution-chip__checkmark{opacity:var(--mat-chip-with-icon-disabled-icon-opacity, 0.38)}.mat-mdc-standard-chip.mdc-evolution-chip--disabled{opacity:var(--mat-chip-disabled-container-opacity, 1)}.mat-mdc-standard-chip.mdc-evolution-chip--selected .mdc-evolution-chip__icon--trailing,.mat-mdc-standard-chip.mat-mdc-chip-highlighted .mdc-evolution-chip__icon--trailing{color:var(--mat-chip-selected-trailing-icon-color, var(--mat-sys-on-secondary-container))}.mat-mdc-standard-chip.mdc-evolution-chip--selected.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing,.mat-mdc-standard-chip.mat-mdc-chip-highlighted.mdc-evolution-chip--disabled .mdc-evolution-chip__icon--trailing{color:var(--mat-chip-selected-disabled-trailing-icon-color, var(--mat-sys-on-surface))}.mat-mdc-chip-edit,.mat-mdc-chip-remove{opacity:var(--mat-chip-trailing-action-opacity, 1)}.mat-mdc-chip-edit:focus,.mat-mdc-chip-remove:focus{opacity:var(--mat-chip-trailing-action-focus-opacity, 1)}.mat-mdc-chip-edit::after,.mat-mdc-chip-remove::after{background-color:var(--mat-chip-trailing-action-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-chip-edit:hover::after,.mat-mdc-chip-remove:hover::after{opacity:var(--mat-chip-trailing-action-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-chip-edit:focus::after,.mat-mdc-chip-remove:focus::after{opacity:var(--mat-chip-trailing-action-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-chip-selected .mat-mdc-chip-remove::after,.mat-mdc-chip-highlighted .mat-mdc-chip-remove::after{background-color:var(--mat-chip-selected-trailing-action-state-layer-color, var(--mat-sys-on-secondary-container))}.mat-mdc-standard-chip{-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-standard-chip .mdc-evolution-chip__cell--primary,.mat-mdc-standard-chip .mdc-evolution-chip__action--primary,.mat-mdc-standard-chip .mat-mdc-chip-action-label{overflow:visible}.mat-mdc-standard-chip .mat-mdc-chip-graphic,.mat-mdc-standard-chip .mat-mdc-chip-trailing-icon{box-sizing:content-box}.mat-mdc-standard-chip._mat-animation-noopable,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__graphic,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark,.mat-mdc-standard-chip._mat-animation-noopable .mdc-evolution-chip__checkmark-path{transition-duration:1ms;animation-duration:1ms}.mat-mdc-chip-focus-overlay{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;opacity:0;border-radius:inherit;transition:opacity 150ms linear}._mat-animation-noopable .mat-mdc-chip-focus-overlay{transition:none}.mat-mdc-basic-chip .mat-mdc-chip-focus-overlay{display:none}.mat-mdc-chip .mat-ripple.mat-mdc-chip-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-chip-avatar{text-align:center;line-height:1;color:var(--mat-chip-with-icon-icon-color, currentColor)}.mat-mdc-chip{position:relative;z-index:0}.mat-mdc-chip-action-label{text-align:left;z-index:1}[dir=rtl] .mat-mdc-chip-action-label{text-align:right}.mat-mdc-chip.mdc-evolution-chip--with-trailing-action .mat-mdc-chip-action-label{position:relative}.mat-mdc-chip-action-label .mat-mdc-chip-primary-focus-indicator{position:absolute;top:0;right:0;bottom:0;left:0;pointer-events:none}.mat-mdc-chip-action-label .mat-focus-indicator::before{margin:calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px)*-1)}.mat-mdc-chip-edit::before,.mat-mdc-chip-remove::before{margin:calc(var(--mat-focus-indicator-border-width, 3px)*-1);left:8px;right:8px}.mat-mdc-chip-edit::after,.mat-mdc-chip-remove::after{content:"";display:block;opacity:0;position:absolute;top:-3px;bottom:-3px;left:5px;right:5px;border-radius:50%;box-sizing:border-box;padding:12px;margin:-12px;background-clip:content-box}.mat-mdc-chip-edit .mat-icon,.mat-mdc-chip-remove .mat-icon{width:18px;height:18px;font-size:18px;box-sizing:content-box}.mat-chip-edit-input{cursor:text;display:inline-block;color:inherit;outline:0}@media(forced-colors: active){.mat-mdc-chip-selected:not(.mat-mdc-chip-multiple){outline-width:3px}}.mat-mdc-chip-action:focus .mat-focus-indicator::before{content:""}.mdc-evolution-chip__icon,.mat-mdc-chip-edit .mat-icon,.mat-mdc-chip-remove .mat-icon{min-height:fit-content}
</style><style ng-app-id="ng">

.summary-card[_ngcontent-ng-c1366973070] {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
}
.summary-card[_ngcontent-ng-c1366973070]:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
.summary-card[_ngcontent-ng-c1366973070]   mat-card-content[_ngcontent-ng-c1366973070] {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px !important;
}
.summary-card[_ngcontent-ng-c1366973070]   .card-icon[_ngcontent-ng-c1366973070] {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}
.summary-card[_ngcontent-ng-c1366973070]   .card-icon[_ngcontent-ng-c1366973070]   mat-icon[_ngcontent-ng-c1366973070] {
  font-size: 32px;
  width: 32px;
  height: 32px;
  color: white;
}
.summary-card[_ngcontent-ng-c1366973070]   .balance-icon[_ngcontent-ng-c1366973070] {
  background:
    linear-gradient(
      135deg,
      #667eea 0%,
      #764ba2 100%);
}
.summary-card[_ngcontent-ng-c1366973070]   .income-icon[_ngcontent-ng-c1366973070] {
  background:
    linear-gradient(
      135deg,
      #4caf50 0%,
      #8bc34a 100%);
}
.summary-card[_ngcontent-ng-c1366973070]   .expenses-icon[_ngcontent-ng-c1366973070] {
  background:
    linear-gradient(
      135deg,
      #f44336 0%,
      #e91e63 100%);
}
.summary-card[_ngcontent-ng-c1366973070]   .budget-icon[_ngcontent-ng-c1366973070] {
  background:
    linear-gradient(
      135deg,
      #ff9800 0%,
      #ff5722 100%);
}
.summary-card[_ngcontent-ng-c1366973070]   .card-details[_ngcontent-ng-c1366973070] {
  flex: 1;
  min-width: 0;
}
.summary-card[_ngcontent-ng-c1366973070]   .card-label[_ngcontent-ng-c1366973070] {
  margin: 0 0 8px 0;
  color: rgba(0, 0, 0, 0.6);
  font-size: 0.875rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.summary-card[_ngcontent-ng-c1366973070]   .card-value[_ngcontent-ng-c1366973070] {
  margin: 0 0 8px 0;
  font-size: 2rem;
  font-weight: 700;
  color: #333;
}
.summary-card[_ngcontent-ng-c1366973070]   .trend-indicator[_ngcontent-ng-c1366973070] {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.875rem;
  font-weight: 600;
}
.summary-card[_ngcontent-ng-c1366973070]   .trend-indicator[_ngcontent-ng-c1366973070]   mat-icon[_ngcontent-ng-c1366973070] {
  font-size: 18px;
  width: 18px;
  height: 18px;
}
.summary-card[_ngcontent-ng-c1366973070]   .trend-indicator.positive[_ngcontent-ng-c1366973070] {
  color: #4caf50;
}
.summary-card[_ngcontent-ng-c1366973070]   .trend-indicator.negative[_ngcontent-ng-c1366973070] {
  color: #f44336;
}
.summary-card[_ngcontent-ng-c1366973070]   .budget-progress[_ngcontent-ng-c1366973070] {
  margin-top: 8px;
  height: 8px;
  border-radius: 4px;
}
/*# sourceMappingURL=/financial-summary-card.component.css.map */</style><style ng-app-id="ng">.mat-mdc-progress-bar{--mat-progress-bar-animation-multiplier: 1;display:block;text-align:start}.mat-mdc-progress-bar[mode=query]{transform:scaleX(-1)}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner{animation:none}.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar{transition:transform 1ms}.mat-progress-bar-reduced-motion{--mat-progress-bar-animation-multiplier: 2}.mdc-linear-progress{position:relative;width:100%;transform:translateZ(0);outline:1px solid rgba(0,0,0,0);overflow-x:hidden;transition:opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:max(var(--mat-progress-bar-track-height, 4px),var(--mat-progress-bar-active-indicator-height, 4px))}@media(forced-colors: active){.mdc-linear-progress{outline-color:CanvasText}}.mdc-linear-progress__bar{position:absolute;top:0;bottom:0;margin:auto 0;width:100%;animation:none;transform-origin:top left;transition:transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);height:var(--mat-progress-bar-active-indicator-height, 4px)}.mdc-linear-progress--indeterminate .mdc-linear-progress__bar{transition:none}[dir=rtl] .mdc-linear-progress__bar{right:0;transform-origin:center right}.mdc-linear-progress__bar-inner{display:inline-block;position:absolute;width:100%;animation:none;border-top-style:solid;border-color:var(--mat-progress-bar-active-indicator-color, var(--mat-sys-primary));border-top-width:var(--mat-progress-bar-active-indicator-height, 4px)}.mdc-linear-progress__buffer{display:flex;position:absolute;top:0;bottom:0;margin:auto 0;width:100%;overflow:hidden;height:var(--mat-progress-bar-track-height, 4px);border-radius:var(--mat-progress-bar-track-shape, var(--mat-sys-corner-none))}.mdc-linear-progress__buffer-dots{background-image:radial-gradient(circle, var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant)) calc(var(--mat-progress-bar-track-height, 4px) / 2), transparent 0);background-repeat:repeat-x;background-size:calc(calc(var(--mat-progress-bar-track-height, 4px) / 2)*5);background-position:left;flex:auto;transform:rotate(180deg);animation:mdc-linear-progress-buffering calc(250ms*var(--mat-progress-bar-animation-multiplier)) infinite linear}@media(forced-colors: active){.mdc-linear-progress__buffer-dots{background-color:ButtonBorder}}[dir=rtl] .mdc-linear-progress__buffer-dots{animation:mdc-linear-progress-buffering-reverse calc(250ms*var(--mat-progress-bar-animation-multiplier)) infinite linear;transform:rotate(0)}.mdc-linear-progress__buffer-bar{flex:0 1 100%;transition:flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);background-color:var(--mat-progress-bar-track-color, var(--mat-sys-surface-variant))}.mdc-linear-progress__primary-bar{transform:scaleX(0)}.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{left:-145.166611%}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation:mdc-linear-progress-primary-indeterminate-translate calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-primary-indeterminate-scale calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar{animation-name:mdc-linear-progress-primary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar{right:-145.166611%;left:auto}.mdc-linear-progress__secondary-bar{display:none}.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{left:-54.888891%;display:block}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation:mdc-linear-progress-secondary-indeterminate-translate calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar>.mdc-linear-progress__bar-inner{animation:mdc-linear-progress-secondary-indeterminate-scale calc(2s*var(--mat-progress-bar-animation-multiplier)) infinite linear}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar{animation-name:mdc-linear-progress-secondary-indeterminate-translate-reverse}[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar{right:-54.888891%;left:auto}@keyframes mdc-linear-progress-buffering{from{transform:rotate(180deg) translateX(calc(var(--mat-progress-bar-track-height, 4px) * -2.5))}}@keyframes mdc-linear-progress-primary-indeterminate-translate{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(83.67142%)}100%{transform:translateX(200.611057%)}}@keyframes mdc-linear-progress-primary-indeterminate-scale{0%{transform:scaleX(0.08)}36.65%{animation-timing-function:cubic-bezier(0.334731, 0.12482, 0.785844, 1);transform:scaleX(0.08)}69.15%{animation-timing-function:cubic-bezier(0.06, 0.11, 0.6, 1);transform:scaleX(0.661479)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(84.386165%)}100%{transform:translateX(160.277782%)}}@keyframes mdc-linear-progress-secondary-indeterminate-scale{0%{animation-timing-function:cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);transform:scaleX(0.08)}19.15%{animation-timing-function:cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);transform:scaleX(0.457104)}44.15%{animation-timing-function:cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);transform:scaleX(0.72796)}100%{transform:scaleX(0.08)}}@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse{0%{transform:translateX(0)}20%{animation-timing-function:cubic-bezier(0.5, 0, 0.701732, 0.495819);transform:translateX(0)}59.15%{animation-timing-function:cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);transform:translateX(-83.67142%)}100%{transform:translateX(-200.611057%)}}@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse{0%{animation-timing-function:cubic-bezier(0.15, 0, 0.515058, 0.409685);transform:translateX(0)}25%{animation-timing-function:cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);transform:translateX(-37.651913%)}48.35%{animation-timing-function:cubic-bezier(0.4, 0.627035, 0.6, 0.902026);transform:translateX(-84.386165%)}100%{transform:translateX(-160.277782%)}}@keyframes mdc-linear-progress-buffering-reverse{from{transform:translateX(-10px)}}
</style><style ng-app-id="ng">.mat-mdc-icon-button{-webkit-user-select:none;user-select:none;display:inline-block;position:relative;box-sizing:border-box;border:none;outline:none;background-color:rgba(0,0,0,0);fill:currentColor;text-decoration:none;cursor:pointer;z-index:0;overflow:visible;border-radius:var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));flex-shrink:0;text-align:center;width:var(--mat-icon-button-state-layer-size, 40px);height:var(--mat-icon-button-state-layer-size, 40px);padding:calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);font-size:var(--mat-icon-button-icon-size, 24px);color:var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-mdc-icon-button .mat-mdc-button-ripple,.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none;border-radius:inherit}.mat-mdc-icon-button .mat-mdc-button-ripple{overflow:hidden}.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before{content:"";opacity:0}.mat-mdc-icon-button .mdc-button__label,.mat-mdc-icon-button .mat-icon{z-index:1;position:relative}.mat-mdc-icon-button .mat-focus-indicator{top:0;left:0;right:0;bottom:0;position:absolute;border-radius:inherit}.mat-mdc-icon-button:focus>.mat-focus-indicator::before{content:"";border-radius:inherit}.mat-mdc-icon-button .mat-ripple-element{background-color:var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent))}.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before{background-color:var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant))}.mat-mdc-icon-button:hover>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity))}.mat-mdc-icon-button.cdk-program-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-icon-button.cdk-keyboard-focused>.mat-mdc-button-persistent-ripple::before,.mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity))}.mat-mdc-icon-button:active>.mat-mdc-button-persistent-ripple::before{opacity:var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity))}.mat-mdc-icon-button .mat-mdc-button-touch-target{position:absolute;top:50%;height:var(--mat-icon-button-touch-target-size, 48px);display:var(--mat-icon-button-touch-target-display, block);left:50%;width:var(--mat-icon-button-touch-target-size, 48px);transform:translate(-50%, -50%)}.mat-mdc-icon-button._mat-animation-noopable{transition:none !important;animation:none !important}.mat-mdc-icon-button[disabled],.mat-mdc-icon-button.mat-mdc-button-disabled{cursor:default;pointer-events:none;color:var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent))}.mat-mdc-icon-button.mat-mdc-button-disabled-interactive{pointer-events:auto}.mat-mdc-icon-button img,.mat-mdc-icon-button svg{width:var(--mat-icon-button-icon-size, 24px);height:var(--mat-icon-button-icon-size, 24px);vertical-align:baseline}.mat-mdc-icon-button .mat-mdc-button-persistent-ripple{border-radius:var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%))}.mat-mdc-icon-button[hidden]{display:none}.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before,.mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before{background:rgba(0,0,0,0);opacity:1}
</style></head>
<body><!--nghm--><script type="text/javascript" id="ng-event-dispatch-contract">(()=>{function p(t,n,r,o,e,i,f,m){return{eventType:t,event:n,targetElement:r,eic:o,timeStamp:e,eia:i,eirp:f,eiack:m}}function u(t){let n=[],r=e=>{n.push(e)};return{c:t,q:n,et:[],etc:[],d:r,h:e=>{r(p(e.type,e,e.target,t,Date.now()))}}}function s(t,n,r){for(let o=0;o<n.length;o++){let e=n[o];(r?t.etc:t.et).push(e),t.c.addEventListener(e,t.h,r)}}function c(t,n,r,o,e=window){let i=u(t);e._ejsas||(e._ejsas={}),e._ejsas[n]=i,s(i,r),s(i,o,!0)}window.__jsaction_bootstrap=c;})();
</script><script>window.__jsaction_bootstrap(document.body,"ng",["click","mousedown","keydown"],[]);</script>
  <app-root ng-version="20.3.9" _nghost-ng-c1974852249="" ngh="18" ng-server-context="ssg"><app-sidebar _ngcontent-ng-c1974852249="" _nghost-ng-c463973037="" ngh="6"><mat-sidenav-container _ngcontent-ng-c463973037="" class="mat-drawer-container mat-sidenav-container sidenav-container" ngh="0"><!--container--><mat-sidenav _ngcontent-ng-c463973037="" fixedinviewport="" class="mat-drawer mat-sidenav sidenav mat-drawer-opened mat-drawer-side mat-sidenav-fixed" role="navigation" style="top: 0px; bottom: 0px;" ngh="1"><div cdkscrollable="" class="mat-drawer-inner-container"><mat-toolbar _ngcontent-ng-c463973037="" class="mat-toolbar mat-toolbar-single-row" ngh="1">Menu</mat-toolbar><mat-nav-list _ngcontent-ng-c463973037="" role="navigation" class="mat-mdc-nav-list mat-mdc-list-base mdc-list" aria-disabled="false" ngh="1"><a _ngcontent-ng-c463973037="" mat-list-item="" routerlink="/" class="mat-mdc-list-item mdc-list-item mat-mdc-list-item-interactive _mat-animation-noopable mat-mdc-list-item-single-line mdc-list-item--with-one-line" aria-disabled="false" href="/" ngh="2" jsaction="click:;"><span class="mdc-list-item__content"><span class="mat-mdc-list-item-unscoped-content mdc-list-item__primary-text">SIDEBAR.DASHBOARD</span></span><div class="mat-focus-indicator"></div></a><a _ngcontent-ng-c463973037="" mat-list-item="" routerlink="/transactions" class="mat-mdc-list-item mdc-list-item mat-mdc-list-item-interactive _mat-animation-noopable mat-mdc-list-item-single-line mdc-list-item--with-one-line" aria-disabled="false" href="/transactions" ngh="2" jsaction="click:;"><span class="mdc-list-item__content"><span class="mat-mdc-list-item-unscoped-content mdc-list-item__primary-text">SIDEBAR.TRANSACTIONS</span></span><div class="mat-focus-indicator"></div></a><a _ngcontent-ng-c463973037="" mat-list-item="" routerlink="/reports" class="mat-mdc-list-item mdc-list-item mat-mdc-list-item-interactive _mat-animation-noopable mat-mdc-list-item-single-line mdc-list-item--with-one-line" aria-disabled="false" href="/reports" ngh="2" jsaction="click:;"><span class="mdc-list-item__content"><span class="mat-mdc-list-item-unscoped-content mdc-list-item__primary-text">SIDEBAR.REPORTS</span></span><div class="mat-focus-indicator"></div></a><a _ngcontent-ng-c463973037="" mat-list-item="" routerlink="/settings" class="mat-mdc-list-item mdc-list-item mat-mdc-list-item-interactive _mat-animation-noopable mat-mdc-list-item-single-line mdc-list-item--with-one-line" aria-disabled="false" href="/settings" ngh="2" jsaction="click:;"><span class="mdc-list-item__content"><span class="mat-mdc-list-item-unscoped-content mdc-list-item__primary-text">SIDEBAR.SETTINGS</span></span><div class="mat-focus-indicator"></div></a></mat-nav-list></div></mat-sidenav><mat-sidenav-content _ngcontent-ng-c463973037="" class="mat-drawer-content mat-sidenav-content mat-drawer-content-hidden" ngh="1"><mat-toolbar _ngcontent-ng-c463973037="" color="primary" class="mat-toolbar mat-primary mat-toolbar-single-row" ngh="1"><!--container--><app-header _ngcontent-ng-c463973037="" _nghost-ng-c1946550011="" ngh="1"><header _ngcontent-ng-c1946550011="" class="app-header"><h1 _ngcontent-ng-c1946550011="">DASHBOARD.TITLE</h1><div _ngcontent-ng-c1946550011="" class="header-actions"><app-language-switcher _ngcontent-ng-c1946550011="" _nghost-ng-c2987055692="" ngh="5"><div _ngcontent-ng-c2987055692="" class="language-switcher"><button _ngcontent-ng-c2987055692="" mat-button="" class="mdc-button mat-mdc-button-base mat-mdc-menu-trigger lang-button mat-mdc-button mat-unthemed _mat-animation-noopable" mat-ripple-loader-uninitialized="" mat-ripple-loader-class-name="mat-mdc-button-ripple" aria-haspopup="menu" aria-expanded="false" ngh="3" jsaction="click:;mousedown:;keydown:;"><span class="mat-mdc-button-persistent-ripple mdc-button__ripple"></span><mat-icon _ngcontent-ng-c2987055692="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">language</mat-icon><mat-icon _ngcontent-ng-c2987055692="" role="img" class="mat-icon notranslate arrow-icon material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">arrow_drop_down</mat-icon><span class="mdc-button__label"><span _ngcontent-ng-c2987055692="">GENERAL.ENGLISH</span></span><span class="mat-focus-indicator"></span><span class="mat-mdc-button-touch-target"></span></button><!--container--><mat-menu _ngcontent-ng-c2987055692="" ngh="4"><!--container--></mat-menu></div></app-language-switcher></div></header></app-header></mat-toolbar><div _ngcontent-ng-c463973037="" class="content"><router-outlet _ngcontent-ng-c1974852249=""></router-outlet><app-dashboard _nghost-ng-c1044424293="" ngh="17"><div _ngcontent-ng-c1044424293="" class="dashboard-container"><div _ngcontent-ng-c1044424293="" class="dashboard-header"><p _ngcontent-ng-c1044424293="" class="dashboard-subtitle">DASHBOARD.FINANCIAL_HEALTH</p></div><div _ngcontent-ng-c1044424293="" class="summary-grid"><app-financial-summary-card _ngcontent-ng-c1044424293="" _nghost-ng-c1366973070="" ngh="7"><mat-card _ngcontent-ng-c1366973070="" class="mat-mdc-card mdc-card summary-card" ngh="1"><mat-card-content _ngcontent-ng-c1366973070="" class="mat-mdc-card-content"><div _ngcontent-ng-c1366973070="" class="card-icon balance-icon"><mat-icon _ngcontent-ng-c1366973070="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">account_balance_wallet</mat-icon></div><div _ngcontent-ng-c1366973070="" class="card-details"><p _ngcontent-ng-c1366973070="" class="card-label">DASHBOARD.BALANCE</p><h2 _ngcontent-ng-c1366973070="" class="card-value">\$25,430.50</h2><div _ngcontent-ng-c1366973070="" class="trend-indicator positive"><mat-icon _ngcontent-ng-c1366973070="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">trending_up</mat-icon><span _ngcontent-ng-c1366973070="">+12.5%</span></div><!--container--><!--container--></div></mat-card-content></mat-card></app-financial-summary-card><app-financial-summary-card _ngcontent-ng-c1044424293="" _nghost-ng-c1366973070="" ngh="7"><mat-card _ngcontent-ng-c1366973070="" class="mat-mdc-card mdc-card summary-card" ngh="1"><mat-card-content _ngcontent-ng-c1366973070="" class="mat-mdc-card-content"><div _ngcontent-ng-c1366973070="" class="card-icon income-icon"><mat-icon _ngcontent-ng-c1366973070="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">arrow_upward</mat-icon></div><div _ngcontent-ng-c1366973070="" class="card-details"><p _ngcontent-ng-c1366973070="" class="card-label">DASHBOARD.INCOME</p><h2 _ngcontent-ng-c1366973070="" class="card-value">\$8,500.00</h2><div _ngcontent-ng-c1366973070="" class="trend-indicator positive"><mat-icon _ngcontent-ng-c1366973070="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">trending_up</mat-icon><span _ngcontent-ng-c1366973070="">+8.2%</span></div><!--container--><!--container--></div></mat-card-content></mat-card></app-financial-summary-card><app-financial-summary-card _ngcontent-ng-c1044424293="" _nghost-ng-c1366973070="" ngh="7"><mat-card _ngcontent-ng-c1366973070="" class="mat-mdc-card mdc-card summary-card" ngh="1"><mat-card-content _ngcontent-ng-c1366973070="" class="mat-mdc-card-content"><div _ngcontent-ng-c1366973070="" class="card-icon expenses-icon"><mat-icon _ngcontent-ng-c1366973070="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">arrow_downward</mat-icon></div><div _ngcontent-ng-c1366973070="" class="card-details"><p _ngcontent-ng-c1366973070="" class="card-label">DASHBOARD.EXPENSES</p><h2 _ngcontent-ng-c1366973070="" class="card-value">\$5,240.30</h2><div _ngcontent-ng-c1366973070="" class="trend-indicator negative"><mat-icon _ngcontent-ng-c1366973070="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">trending_down</mat-icon><span _ngcontent-ng-c1366973070="">-3.2%</span></div><!--container--><!--container--></div></mat-card-content></mat-card></app-financial-summary-card><app-financial-summary-card _ngcontent-ng-c1044424293="" _nghost-ng-c1366973070="" ngh="9"><mat-card _ngcontent-ng-c1366973070="" class="mat-mdc-card mdc-card summary-card" ngh="1"><mat-card-content _ngcontent-ng-c1366973070="" class="mat-mdc-card-content"><div _ngcontent-ng-c1366973070="" class="card-icon budget-icon"><mat-icon _ngcontent-ng-c1366973070="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">pie_chart</mat-icon></div><div _ngcontent-ng-c1366973070="" class="card-details"><p _ngcontent-ng-c1366973070="" class="card-label">DASHBOARD.BUDGET</p><h2 _ngcontent-ng-c1366973070="" class="card-value">68%</h2><!--container--><mat-progress-bar _ngcontent-ng-c1366973070="" role="progressbar" aria-valuemin="0" aria-valuemax="100" tabindex="-1" mode="determinate" class="mat-mdc-progress-bar mdc-linear-progress budget-progress mat-primary _mat-animation-noopable" aria-valuenow="68" ngh="8"><div aria-hidden="true" class="mdc-linear-progress__buffer"><div class="mdc-linear-progress__buffer-bar" style="flex-basis: 100%;"></div><!--container--></div><div aria-hidden="true" class="mdc-linear-progress__bar mdc-linear-progress__primary-bar" style="transform: scaleX(0.68);"><span class="mdc-linear-progress__bar-inner"></span></div><div aria-hidden="true" class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar"><span class="mdc-linear-progress__bar-inner"></span></div></mat-progress-bar><!--container--></div></mat-card-content></mat-card></app-financial-summary-card><!--container--></div><div _ngcontent-ng-c1044424293="" class="trends-section"><app-trends-section _ngcontent-ng-c1044424293="" _nghost-ng-c420538357="" ngh="11"><mat-card _ngcontent-ng-c420538357="" class="mat-mdc-card mdc-card trends-card" ngh="1"><mat-card-header _ngcontent-ng-c420538357="" class="mat-mdc-card-header" ngh="10"><div class="mat-mdc-card-header-text"><mat-card-title _ngcontent-ng-c420538357="" class="mat-mdc-card-title"><mat-icon _ngcontent-ng-c420538357="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">trending_up</mat-icon> DASHBOARD.TRENDS </mat-card-title></div></mat-card-header><mat-card-content _ngcontent-ng-c420538357="" class="mat-mdc-card-content"><div _ngcontent-ng-c420538357="" class="trends-grid"><div _ngcontent-ng-c420538357="" class="trend-item positive"><p _ngcontent-ng-c420538357="" class="trend-label">DASHBOARD.BALANCE_CHANGE</p><div _ngcontent-ng-c420538357="" class="trend-value-row"><span _ngcontent-ng-c420538357="" class="trend-value"><!--container--> \$3,260.20 <!--container--></span><span _ngcontent-ng-c420538357="" class="trend-change"><mat-icon _ngcontent-ng-c420538357="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">arrow_upward</mat-icon> +12.5% </span></div></div><div _ngcontent-ng-c420538357="" class="trend-item"><p _ngcontent-ng-c420538357="" class="trend-label">DASHBOARD.STATISTICS.MONTHLY_AVERAGE</p><div _ngcontent-ng-c420538357="" class="trend-value-row"><span _ngcontent-ng-c420538357="" class="trend-value"><!--container--> \$6,850.00 <!--container--></span><span _ngcontent-ng-c420538357="" class="trend-change negative"><mat-icon _ngcontent-ng-c420538357="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">arrow_downward</mat-icon> -3.2% </span></div></div><div _ngcontent-ng-c420538357="" class="trend-item positive"><p _ngcontent-ng-c420538357="" class="trend-label">DASHBOARD.STATISTICS.SAVINGS_RATE</p><div _ngcontent-ng-c420538357="" class="trend-value-row"><span _ngcontent-ng-c420538357="" class="trend-value"> 38.4% <!--container--><!--container--></span><span _ngcontent-ng-c420538357="" class="trend-change"><mat-icon _ngcontent-ng-c420538357="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">arrow_upward</mat-icon> +5.8% </span></div></div><!--container--></div></mat-card-content></mat-card></app-trends-section></div><div _ngcontent-ng-c1044424293="" class="charts-grid"><app-budget-chart _ngcontent-ng-c1044424293="" _nghost-ng-c198939795="" ngh="12"><mat-card _ngcontent-ng-c198939795="" class="mat-mdc-card mdc-card chart-card budget-chart-card" ngh="1"><mat-card-header _ngcontent-ng-c198939795="" class="mat-mdc-card-header" ngh="10"><div class="mat-mdc-card-header-text"><mat-card-title _ngcontent-ng-c198939795="" class="mat-mdc-card-title"><mat-icon _ngcontent-ng-c198939795="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">donut_large</mat-icon> DASHBOARD.BUDGET_USAGE </mat-card-title></div></mat-card-header><mat-card-content _ngcontent-ng-c198939795="" class="mat-mdc-card-content"><div _ngcontent-ng-c198939795="" class="budget-chart"><div _ngcontent-ng-c198939795="" class="budget-category-item"><div _ngcontent-ng-c198939795="" class="category-header"><span _ngcontent-ng-c198939795="" class="category-name">DASHBOARD.CATEGORIES.FOOD</span><span _ngcontent-ng-c198939795="" class="category-value"> \$1,200.00 / \$1,000.00 </span></div><div _ngcontent-ng-c198939795="" class="category-bar-container"><div _ngcontent-ng-c198939795="" class="category-bar" style="width: 100%; background-color: #f44336;"><span _ngcontent-ng-c198939795="" class="bar-percentage">120%</span></div></div></div><div _ngcontent-ng-c198939795="" class="budget-category-item"><div _ngcontent-ng-c198939795="" class="category-header"><span _ngcontent-ng-c198939795="" class="category-name">DASHBOARD.CATEGORIES.TRANSPORT</span><span _ngcontent-ng-c198939795="" class="category-value"> \$450.00 / \$600.00 </span></div><div _ngcontent-ng-c198939795="" class="category-bar-container"><div _ngcontent-ng-c198939795="" class="category-bar" style="width: 75%; background-color: #4caf50;"><span _ngcontent-ng-c198939795="" class="bar-percentage">75%</span></div></div></div><div _ngcontent-ng-c198939795="" class="budget-category-item"><div _ngcontent-ng-c198939795="" class="category-header"><span _ngcontent-ng-c198939795="" class="category-name">DASHBOARD.CATEGORIES.ENTERTAINMENT</span><span _ngcontent-ng-c198939795="" class="category-value"> \$820.00 / \$800.00 </span></div><div _ngcontent-ng-c198939795="" class="category-bar-container"><div _ngcontent-ng-c198939795="" class="category-bar" style="width: 100%; background-color: #ff9800;"><span _ngcontent-ng-c198939795="" class="bar-percentage">103%</span></div></div></div><div _ngcontent-ng-c198939795="" class="budget-category-item"><div _ngcontent-ng-c198939795="" class="category-header"><span _ngcontent-ng-c198939795="" class="category-name">DASHBOARD.CATEGORIES.UTILITIES</span><span _ngcontent-ng-c198939795="" class="category-value"> \$380.00 / \$500.00 </span></div><div _ngcontent-ng-c198939795="" class="category-bar-container"><div _ngcontent-ng-c198939795="" class="category-bar" style="width: 76%; background-color: #4caf50;"><span _ngcontent-ng-c198939795="" class="bar-percentage">76%</span></div></div></div><div _ngcontent-ng-c198939795="" class="budget-category-item"><div _ngcontent-ng-c198939795="" class="category-header"><span _ngcontent-ng-c198939795="" class="category-name">DASHBOARD.CATEGORIES.HEALTHCARE</span><span _ngcontent-ng-c198939795="" class="category-value"> \$290.00 / \$400.00 </span></div><div _ngcontent-ng-c198939795="" class="category-bar-container"><div _ngcontent-ng-c198939795="" class="category-bar" style="width: 72.5%; background-color: #4caf50;"><span _ngcontent-ng-c198939795="" class="bar-percentage">73%</span></div></div></div><div _ngcontent-ng-c198939795="" class="budget-category-item"><div _ngcontent-ng-c198939795="" class="category-header"><span _ngcontent-ng-c198939795="" class="category-name">DASHBOARD.CATEGORIES.OTHER</span><span _ngcontent-ng-c198939795="" class="category-value"> \$180.00 / \$300.00 </span></div><div _ngcontent-ng-c198939795="" class="category-bar-container"><div _ngcontent-ng-c198939795="" class="category-bar" style="width: 60%; background-color: #2196f3;"><span _ngcontent-ng-c198939795="" class="bar-percentage">60%</span></div></div></div><!--container--></div></mat-card-content></mat-card></app-budget-chart><app-monthly-trend-chart _ngcontent-ng-c1044424293="" _nghost-ng-c1918002196="" ngh="13"><mat-card _ngcontent-ng-c1918002196="" class="mat-mdc-card mdc-card chart-card monthly-chart-card" ngh="1"><mat-card-header _ngcontent-ng-c1918002196="" class="mat-mdc-card-header" ngh="10"><div class="mat-mdc-card-header-text"><mat-card-title _ngcontent-ng-c1918002196="" class="mat-mdc-card-title"><mat-icon _ngcontent-ng-c1918002196="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">show_chart</mat-icon> DASHBOARD.MONTHLY_TREND </mat-card-title></div></mat-card-header><mat-card-content _ngcontent-ng-c1918002196="" class="mat-mdc-card-content"><div _ngcontent-ng-c1918002196="" class="monthly-chart"><div _ngcontent-ng-c1918002196="" class="chart-bars"><div _ngcontent-ng-c1918002196="" class="month-group" jsaction="click:;"><div _ngcontent-ng-c1918002196="" class="bars-container"><div _ngcontent-ng-c1918002196="" class="mat-mdc-tooltip-trigger bar income-bar" style="height: 82%;"><span _ngcontent-ng-c1918002196="" class="bar-label">\$8,200.00</span></div><!--container--><div _ngcontent-ng-c1918002196="" class="mat-mdc-tooltip-trigger bar expenses-bar" style="height: 51%;"><span _ngcontent-ng-c1918002196="" class="bar-label">\$5,100.00</span></div><!--container--></div><span _ngcontent-ng-c1918002196="" class="month-label">DASHBOARD.MONTHS.JAN</span></div><div _ngcontent-ng-c1918002196="" class="month-group" jsaction="click:;"><div _ngcontent-ng-c1918002196="" class="bars-container"><div _ngcontent-ng-c1918002196="" class="mat-mdc-tooltip-trigger bar income-bar" style="height: 83%;"><span _ngcontent-ng-c1918002196="" class="bar-label">\$8,300.00</span></div><!--container--><div _ngcontent-ng-c1918002196="" class="mat-mdc-tooltip-trigger bar expenses-bar" style="height: 53%;"><span _ngcontent-ng-c1918002196="" class="bar-label">\$5,300.00</span></div><!--container--></div><span _ngcontent-ng-c1918002196="" class="month-label">DASHBOARD.MONTHS.FEB</span></div><div _ngcontent-ng-c1918002196="" class="month-group" jsaction="click:;"><div _ngcontent-ng-c1918002196="" class="bars-container"><div _ngcontent-ng-c1918002196="" class="mat-mdc-tooltip-trigger bar income-bar" style="height: 81%;"><span _ngcontent-ng-c1918002196="" class="bar-label">\$8,100.00</span></div><!--container--><div _ngcontent-ng-c1918002196="" class="mat-mdc-tooltip-trigger bar expenses-bar" style="height: 49%;"><span _ngcontent-ng-c1918002196="" class="bar-label">\$4,900.00</span></div><!--container--></div><span _ngcontent-ng-c1918002196="" class="month-label">DASHBOARD.MONTHS.MAR</span></div><div _ngcontent-ng-c1918002196="" class="month-group" jsaction="click:;"><div _ngcontent-ng-c1918002196="" class="bars-container"><div _ngcontent-ng-c1918002196="" class="mat-mdc-tooltip-trigger bar income-bar" style="height: 86%;"><span _ngcontent-ng-c1918002196="" class="bar-label">\$8,600.00</span></div><!--container--><div _ngcontent-ng-c1918002196="" class="mat-mdc-tooltip-trigger bar expenses-bar" style="height: 54%;"><span _ngcontent-ng-c1918002196="" class="bar-label">\$5,400.00</span></div><!--container--></div><span _ngcontent-ng-c1918002196="" class="month-label">DASHBOARD.MONTHS.APR</span></div><div _ngcontent-ng-c1918002196="" class="month-group" jsaction="click:;"><div _ngcontent-ng-c1918002196="" class="bars-container"><div _ngcontent-ng-c1918002196="" class="mat-mdc-tooltip-trigger bar income-bar" style="height: 84%;"><span _ngcontent-ng-c1918002196="" class="bar-label">\$8,400.00</span></div><!--container--><div _ngcontent-ng-c1918002196="" class="mat-mdc-tooltip-trigger bar expenses-bar" style="height: 52%;"><span _ngcontent-ng-c1918002196="" class="bar-label">\$5,200.00</span></div><!--container--></div><span _ngcontent-ng-c1918002196="" class="month-label">DASHBOARD.MONTHS.MAY</span></div><div _ngcontent-ng-c1918002196="" class="month-group selected" jsaction="click:;"><div _ngcontent-ng-c1918002196="" class="bars-container"><div _ngcontent-ng-c1918002196="" class="mat-mdc-tooltip-trigger bar income-bar" style="height: 85%;"><span _ngcontent-ng-c1918002196="" class="bar-label">\$8,500.00</span></div><!--container--><div _ngcontent-ng-c1918002196="" class="mat-mdc-tooltip-trigger bar expenses-bar" style="height: 52.400000000000006%;"><span _ngcontent-ng-c1918002196="" class="bar-label">\$5,240.00</span></div><!--container--></div><span _ngcontent-ng-c1918002196="" class="month-label">DASHBOARD.MONTHS.JUN</span></div><!--container--></div><div _ngcontent-ng-c1918002196="" class="chart-legend"><div _ngcontent-ng-c1918002196="" class="legend-item"><span _ngcontent-ng-c1918002196="" class="legend-color income-color"></span><span _ngcontent-ng-c1918002196="">DASHBOARD.INCOME</span></div><div _ngcontent-ng-c1918002196="" class="legend-item"><span _ngcontent-ng-c1918002196="" class="legend-color expenses-color"></span><span _ngcontent-ng-c1918002196="">DASHBOARD.EXPENSES</span></div></div></div></mat-card-content></mat-card></app-monthly-trend-chart></div><div _ngcontent-ng-c1044424293="" class="alerts-section"><app-alerts-list _ngcontent-ng-c1044424293="" _nghost-ng-c2410019262="" ngh="16"><mat-card _ngcontent-ng-c2410019262="" class="mat-mdc-card mdc-card alerts-card" ngh="1"><mat-card-header _ngcontent-ng-c2410019262="" class="mat-mdc-card-header" ngh="10"><div class="mat-mdc-card-header-text"><mat-card-title _ngcontent-ng-c2410019262="" class="mat-mdc-card-title"><mat-icon _ngcontent-ng-c2410019262="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">notifications_active</mat-icon> DASHBOARD.ALERTS <mat-chip _ngcontent-ng-c2410019262="" class="mat-mdc-chip alert-count mat-primary mdc-evolution-chip mat-mdc-standard-chip _mat-animation-noopable" mat-ripple-loader-uninitialized="" mat-ripple-loader-class-name="mat-mdc-chip-ripple" mat-ripple-loader-disabled="" id="mat-mdc-chip-0" ngh="14" jsaction="keydown:;"><span class="mat-mdc-chip-focus-overlay"></span><span class="mdc-evolution-chip__cell mdc-evolution-chip__cell--primary"><span matchipaction="" class="mdc-evolution-chip__action mat-mdc-chip-action mdc-evolution-chip__action--primary mdc-evolution-chip__action--presentational" aria-disabled="false" jsaction="click:;keydown:;"><!--container--><span class="mdc-evolution-chip__text-label mat-mdc-chip-action-label">3<span class="mat-mdc-chip-primary-focus-indicator mat-focus-indicator"></span></span></span></span><!--container--></mat-chip></mat-card-title></div></mat-card-header><mat-card-content _ngcontent-ng-c2410019262="" class="mat-mdc-card-content"><div _ngcontent-ng-c2410019262="" class="alerts-list"><div _ngcontent-ng-c2410019262="" class="alert-item alert-error"><mat-icon _ngcontent-ng-c2410019262="" role="img" class="mat-icon notranslate alert-icon material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">error</mat-icon><span _ngcontent-ng-c2410019262="" class="alert-message">DASHBOARD.ALERTS_LIST.BUDGET_EXCEEDED</span><button _ngcontent-ng-c2410019262="" mat-icon-button="" class="mdc-icon-button mat-mdc-icon-button mat-mdc-button-base alert-action mat-unthemed _mat-animation-noopable" mat-ripple-loader-uninitialized="" mat-ripple-loader-class-name="mat-mdc-button-ripple" mat-ripple-loader-centered="" ngh="15"><span class="mat-mdc-button-persistent-ripple mdc-icon-button__ripple"></span><mat-icon _ngcontent-ng-c2410019262="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">chevron_right</mat-icon><span class="mat-focus-indicator"></span><span class="mat-mdc-button-touch-target"></span></button></div><div _ngcontent-ng-c2410019262="" class="alert-item alert-warning"><mat-icon _ngcontent-ng-c2410019262="" role="img" class="mat-icon notranslate alert-icon material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">warning</mat-icon><span _ngcontent-ng-c2410019262="" class="alert-message">DASHBOARD.ALERTS_LIST.LOW_BALANCE</span><button _ngcontent-ng-c2410019262="" mat-icon-button="" class="mdc-icon-button mat-mdc-icon-button mat-mdc-button-base alert-action mat-unthemed _mat-animation-noopable" mat-ripple-loader-uninitialized="" mat-ripple-loader-class-name="mat-mdc-button-ripple" mat-ripple-loader-centered="" ngh="15"><span class="mat-mdc-button-persistent-ripple mdc-icon-button__ripple"></span><mat-icon _ngcontent-ng-c2410019262="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">chevron_right</mat-icon><span class="mat-focus-indicator"></span><span class="mat-mdc-button-touch-target"></span></button></div><div _ngcontent-ng-c2410019262="" class="alert-item alert-info"><mat-icon _ngcontent-ng-c2410019262="" role="img" class="mat-icon notranslate alert-icon material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">info</mat-icon><span _ngcontent-ng-c2410019262="" class="alert-message">DASHBOARD.ALERTS_LIST.UNUSUAL_SPENDING</span><button _ngcontent-ng-c2410019262="" mat-icon-button="" class="mdc-icon-button mat-mdc-icon-button mat-mdc-button-base alert-action mat-unthemed _mat-animation-noopable" mat-ripple-loader-uninitialized="" mat-ripple-loader-class-name="mat-mdc-button-ripple" mat-ripple-loader-centered="" ngh="15"><span class="mat-mdc-button-persistent-ripple mdc-icon-button__ripple"></span><mat-icon _ngcontent-ng-c2410019262="" role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" ngh="1">chevron_right</mat-icon><span class="mat-focus-indicator"></span><span class="mat-mdc-button-touch-target"></span></button></div><!--container--></div></mat-card-content></mat-card></app-alerts-list></div></div></app-dashboard><!--container--></div></mat-sidenav-content><!--container--></mat-sidenav-container></app-sidebar></app-root>
<link rel="modulepreload" href="chunk-7FDXRGRC.js"><link rel="modulepreload" href="chunk-PPMWDZ7D.js"><script src="main.js" type="module"></script>
<link rel="modulepreload" href="chunk-SWWWRI2I.js">
<link rel="modulepreload" href="chunk-HHNGV5JG.js">


</body></html>`;