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
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ValueAccessorBase } from '../base/value-accessor-base';
export var SWITCHBUTTON_TEMPLATE = "\n\t<span class=\"switchbutton f-inline-row f-full\"\n\t\t\t[class.switchbutton-readonly]=\"readonly\"\n\t\t\t[class.switchbutton-disabled]=\"disabled\"\n\t\t\t[class.switchbutton-checked]=\"value\" (click)=\"onClick($event)\">\n\t\t<span class=\"switchbutton-inner\">\n\t\t\t<span class=\"switchbutton-on\">\n\t\t\t\t<span class=\"f-row f-content-center\">{{onText}}</span>\n\t\t\t</span>\n\t\t\t<span class=\"switchbutton-handle\">\n\t\t\t\t<span class=\"f-row f-content-center\">{{handleText}}</span>\n\t\t\t</span>\n\t\t\t<span class=\"switchbutton-off\">\n\t\t\t\t<span class=\"f-row f-content-center\">{{offText}}</span>\n\t\t\t</span>\n\t\t\t<input class=\"switchbutton-value\" type=\"checkbox\" [attr.id]=\"inputId\">\n\t\t</span>\n\t</span>\n";
var SwitchButtonComponent = (function (_super) {
    __extends(SwitchButtonComponent, _super);
    function SwitchButtonComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onText = 'ON';
        _this.offText = 'OFF';
        _this.handleText = null;
        _this.disabled = false;
        _this.readonly = false;
        _this.inputId = null;
        _this._value = false;
        return _this;
    }
    SwitchButtonComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this._initialized = true;
        });
    };
    SwitchButtonComponent.prototype.onClick = function (event) {
        event.stopPropagation();
        if (this.disabled || this.readonly) {
            return;
        }
        this.value = !this.value;
    };
    return SwitchButtonComponent;
}(ValueAccessorBase));
export { SwitchButtonComponent };
SwitchButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-switchbutton',
                template: SWITCHBUTTON_TEMPLATE,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return SwitchButtonComponent; }),
                        multi: true
                    }],
                host: {
                    '[class.f-inline-row]': 'true'
                }
            },] },
];
/** @nocollapse */
SwitchButtonComponent.ctorParameters = function () { return []; };
SwitchButtonComponent.propDecorators = {
    'onText': [{ type: Input },],
    'offText': [{ type: Input },],
    'handleText': [{ type: Input },],
    'disabled': [{ type: Input },],
    'readonly': [{ type: Input },],
    'inputId': [{ type: Input },],
};
//# sourceMappingURL=switchbutton.component.js.map