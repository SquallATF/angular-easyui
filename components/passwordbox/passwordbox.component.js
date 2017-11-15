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
import { InputBaseComponent } from '../base/input-base.component';
export var PASSWORDBOX_TEMPLATE = "\n\t<span class=\"textbox f-inline-row f-full\" \n\t\t\t[ngClass]=\"cls\"\n\t\t\t[class.textbox-disabled]=\"disabled\"\n\t\t\t[class.textbox-readonly]=\"readonly\"\n\t\t\t[class.textbox-focused]=\"focused\"\n\t\t\t[class.textbox-invalid]=\"invalid\">\n\t\t<input #input *ngIf=\"!multiline\" autocomplete=\"off\" class=\"textbox-text f-full f-order3\"\n\t\t\t\t[class.validatebox-invalid]=\"invalid\"\n\t\t\t\t[attr.id]=\"inputId\"\n\t\t\t\t[attr.disabled]=\"disabled?'disabled':null\"\n\t\t\t\t[attr.readonly]=\"(readonly||!editable)?'readonly':null\"\n\t\t\t\t[attr.tabindex]=\"tabindex\"\n\t\t\t\t[ngClass]=\"inputCls\"\n\t\t\t\t[ngStyle]=\"inputStyle\"\n\t\t\t\t[(ngModel)]=\"text\"\n\t\t\t\t[placeholder]=\"placeholder\"\n\t\t\t\t(focus)=\"focus()\"\n\t\t\t\t(blur)=\"blur()\">\n\t\t<textarea #input *ngIf=\"multiline\" autocomplete=\"off\" class=\"textbox-text f-full f-order3\"\n\t\t\t\t[class.validatebox-invalid]=\"invalid\"\n\t\t\t\t[attr.id]=\"inputId\"\n\t\t\t\t[attr.disabled]=\"disabled?'disabled':null\"\n\t\t\t\t[attr.readonly]=\"(readonly||!editable)?'readonly':null\"\n\t\t\t\t[attr.tabindex]=\"tabindex\"\n\t\t\t\t[ngClass]=\"inputCls\"\n\t\t\t\t[ngStyle]=\"inputStyle\"\n\t\t\t\t[(ngModel)]=\"text\"\n\t\t\t\t[placeholder]=\"placeholder\"\n\t\t\t\t(focus)=\"focus()\"\n\t\t\t\t(blur)=\"blur()\"></textarea>\n\t\t<input class=\"textbox-value\" type=\"hidden\" [value]=\"value\" [attr.disabled]=\"disabled?'disabled':null\">\n\t\t<ng-content select=\"eui-addon\"></ng-content>\n\t\t<span #addon *ngIf=\"iconCls\" \n\t\t\t\tclass=\"textbox-addon textbox-addon-icon f-inline-row f-noshrink\" \n\t\t\t\t[class.f-order1]=\"iconAlign=='left'\"\n\t\t\t\t[class.f-order5]=\"iconAlign=='right'\">\n\t\t\t<span class=\"textbox-icon textbox-icon-disabled {{iconCls}}\"></span>\n\t\t</span>\n\t\t<span *ngIf=\"showEye\" class=\"textbox-addon f-column f-noshrink\"\n\t\t\t\t[class.f-order0]=\"eyeAlign=='left'\"\n\t\t\t\t[class.f-order6]=\"eyeAlign=='right'\"\n\t\t\t\t(click)=\"revealed=!revealed\">\n\t\t\t<span class=\"textbox-icon f-full\" [ngClass]=\"eyeCls\"></span>\n\t\t</span>\n\t</span>\n";
var PasswordBoxComponent = (function (_super) {
    __extends(PasswordBoxComponent, _super);
    function PasswordBoxComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.passwordChar = '●'; // %u25CF;
        _this.checkInterval = 200;
        _this.lastDelay = 500;
        _this.showEye = true;
        _this.eyeAlign = 'right';
        _this.revealed = false;
        _this.lastTimer = null;
        _this.cursorPos = -1;
        _this.inputingText = null;
        _this._text = null;
        return _this;
    }
    Object.defineProperty(PasswordBoxComponent.prototype, "text", {
        get: function () {
            var _this = this;
            if (!this.focused) {
                this._text = this.revealed ? this.value : (this.value || '').replace(/./ig, this.passwordChar);
            }
            if (this.focused && this.cursorPos != -1) {
                this.setSelectionRange(this.cursorPos, this.cursorPos);
                setTimeout(function () { return _this.cursorPos = -1; });
            }
            return this._text;
        },
        set: function (value) {
            this._text = value;
            if (this.focused) {
                this.inputingText = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PasswordBoxComponent.prototype, "eyeCls", {
        get: function () {
            return this.revealed ? 'passwordbox-open' : 'passwordbox-close';
        },
        enumerable: true,
        configurable: true
    });
    PasswordBoxComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.onFocus.subscribe(function () {
            _this.processing();
        });
        this.onBlur.subscribe(function () {
            clearTimeout(_this.lastTimer);
            if (_this.inputingText != null) {
                _this.convert(_this.inputingText, true);
                _this.inputingText = null;
            }
        });
    };
    PasswordBoxComponent.prototype.processing = function () {
        var _this = this;
        var originalText = this.text;
        var proc = function () {
            if (!_this.focused) {
                return;
            }
            if (originalText != _this.text) {
                originalText = _this.text;
                clearTimeout(_this.lastTimer);
                _this.convert(_this.text);
                _this.lastTimer = setTimeout(function () {
                    _this.convert(_this.text, true);
                }, _this.lastDelay);
            }
            setTimeout(function () {
                proc();
            }, _this.checkInterval);
        };
        proc();
    };
    PasswordBoxComponent.prototype.convert = function (value, all) {
        if (all === void 0) { all = false; }
        if (this.revealed) {
            this.value = value;
            return;
        }
        if (!value) {
            this.value = value;
            return;
        }
        var pchar = this.passwordChar;
        var cc = value.split('');
        var vv = this.value ? this.value.split('') : [];
        for (var i_1 = 0; i_1 < cc.length; i_1++) {
            var c = cc[i_1];
            if (c != vv[i_1]) {
                if (c != pchar) {
                    vv.splice(i_1, 0, c);
                }
            }
        }
        var pos = this.getSelectionStart();
        if (cc.length < vv.length) {
            vv.splice(pos, vv.length - cc.length, '');
        }
        for (var i = 0; i < cc.length; i++) {
            if (all || i != pos - 1) {
                cc[i] = pchar;
            }
        }
        this.value = vv.join('');
        this.text = cc.join('');
        this.cursorPos = pos;
    };
    return PasswordBoxComponent;
}(InputBaseComponent));
export { PasswordBoxComponent };
PasswordBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-passwordbox',
                template: PASSWORDBOX_TEMPLATE,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return PasswordBoxComponent; }),
                        multi: true
                    }],
                host: {
                    '[class.f-inline-row]': 'true'
                }
            },] },
];
/** @nocollapse */
PasswordBoxComponent.ctorParameters = function () { return []; };
PasswordBoxComponent.propDecorators = {
    'passwordChar': [{ type: Input },],
    'checkInterval': [{ type: Input },],
    'lastDelay': [{ type: Input },],
    'showEye': [{ type: Input },],
    'eyeAlign': [{ type: Input },],
    'revealed': [{ type: Input },],
    'text': [{ type: Input },],
};
//# sourceMappingURL=passwordbox.component.js.map