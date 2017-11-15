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
import { InputBaseComponent, INPUT_BASE_TEMPLATE } from '../base/input-base.component';
var TextBoxComponent = (function (_super) {
    __extends(TextBoxComponent, _super);
    function TextBoxComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(TextBoxComponent.prototype, "text", {
        get: function () {
            return this._focused ? this.value : this.textFormatter(this.value);
        },
        set: function (v) {
            this.value = v;
        },
        enumerable: true,
        configurable: true
    });
    return TextBoxComponent;
}(InputBaseComponent));
export { TextBoxComponent };
TextBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-textbox',
                template: INPUT_BASE_TEMPLATE,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return TextBoxComponent; }),
                        multi: true
                    }],
                host: {
                    '[class.f-inline-row]': 'true'
                }
            },] },
];
/** @nocollapse */
TextBoxComponent.ctorParameters = function () { return []; };
TextBoxComponent.propDecorators = {
    'text': [{ type: Input },],
};
//# sourceMappingURL=textbox.component.js.map