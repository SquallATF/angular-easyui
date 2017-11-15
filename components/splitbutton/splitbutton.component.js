/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component } from '@angular/core';
import { MenuButtonComponent } from '../menubutton/menubutton.component';
export var SPLITBUTTON_TEMPLATE = "\n\t<a #btnRef [attr.href]=\"href||'#'\"\n\t\t\t[ngClass]=\"btnCls\"\n\t\t\t[ngStyle]=\"btnStyle\"\n\t\t\t[class]=\"getInnerCls()\" \n\t\t\t(focus)=\"focus()\" \n\t\t\t(blur)=\"blur()\" \n\t\t\t(click)=\"onClick($event)\">\n\t\t<span [class]=\"btnLeftCls\">\n\t\t\t<span #textRef class=\"l-btn-text\" [class.l-btn-empty]=\"!text\"><ng-content></ng-content></span>\n\t\t\t<span [class]=\"btnIconCls\"></span>\n\t\t\t<span class=\"m-btn-downarrow\"></span>\n\t\t\t<span class=\"m-btn-line\"\n\t\t\t\t\t(click)=\"showMenu()\"\n\t\t\t\t\t(mouseenter)=\"onMouseEnter($event)\"\n\t\t\t\t\t(mouseleave)=\"onMouseLeave($event)\"></span>\n\t\t</span>\n\t</a>\n";
var SplitButtonComponent = (function (_super) {
    __extends(SplitButtonComponent, _super);
    function SplitButtonComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SplitButtonComponent.prototype.getInnerCls = function () {
        var cls = _super.prototype.getInnerCls.call(this);
        cls += ' s-btn s-btn-' + this.size;
        if (this.menu && !this.menu.closed) {
            cls += this.plain ? ' s-btn-plain-active' : ' s-btn-active';
        }
        return cls;
    };
    return SplitButtonComponent;
}(MenuButtonComponent));
export { SplitButtonComponent };
SplitButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-splitbutton',
                template: SPLITBUTTON_TEMPLATE,
                host: {
                    'class': 'f-inline-row'
                }
            },] },
];
/** @nocollapse */
SplitButtonComponent.ctorParameters = function () { return []; };
//# sourceMappingURL=splitbutton.component.js.map