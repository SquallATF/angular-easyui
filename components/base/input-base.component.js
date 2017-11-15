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
import { Component, forwardRef, ViewChild, ContentChildren, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AddonComponent } from './addon.component';
import { ValueAccessorBase } from './value-accessor-base';
export var INPUT_BASE_TEMPLATE = "\n\t<span class=\"textbox f-inline-row f-full\" \n\t\t\t[ngClass]=\"cls\"\n\t\t\t[class.textbox-disabled]=\"disabled\"\n\t\t\t[class.textbox-readonly]=\"readonly\"\n\t\t\t[class.textbox-focused]=\"focused\"\n\t\t\t[class.textbox-invalid]=\"invalid\">\n\t\t<input #input *ngIf=\"!multiline\" autocomplete=\"off\" class=\"textbox-text f-full f-order3\"\n\t\t\t\t[class.validatebox-invalid]=\"invalid\"\n\t\t\t\t[attr.id]=\"inputId\"\n\t\t\t\t[attr.disabled]=\"disabled?'disabled':null\"\n\t\t\t\t[attr.readonly]=\"(readonly||!editable)?'readonly':null\"\n\t\t\t\t[attr.tabindex]=\"tabindex\"\n\t\t\t\t[ngClass]=\"inputCls\"\n\t\t\t\t[ngStyle]=\"inputStyle\"\n\t\t\t\t[(ngModel)]=\"text\"\n\t\t\t\t[placeholder]=\"placeholder\"\n\t\t\t\t(focus)=\"focus()\"\n\t\t\t\t(blur)=\"blur()\">\n\t\t<textarea #input *ngIf=\"multiline\" autocomplete=\"off\" class=\"textbox-text f-full f-order3\"\n\t\t\t\t[class.validatebox-invalid]=\"invalid\"\n\t\t\t\t[attr.id]=\"inputId\"\n\t\t\t\t[attr.disabled]=\"disabled?'disabled':null\"\n\t\t\t\t[attr.readonly]=\"(readonly||!editable)?'readonly':null\"\n\t\t\t\t[attr.tabindex]=\"tabindex\"\n\t\t\t\t[ngClass]=\"inputCls\"\n\t\t\t\t[ngStyle]=\"inputStyle\"\n\t\t\t\t[(ngModel)]=\"text\"\n\t\t\t\t[placeholder]=\"placeholder\"\n\t\t\t\t(focus)=\"focus()\"\n\t\t\t\t(blur)=\"blur()\"></textarea>\n\t\t<input class=\"textbox-value\" type=\"hidden\" [value]=\"value\" [attr.disabled]=\"disabled?'disabled':null\">\n\t\t<ng-content select=\"eui-addon\"></ng-content>\n\t\t<span #addon *ngIf=\"iconCls\" \n\t\t\t\tclass=\"textbox-addon textbox-addon-icon f-inline-row f-noshrink\" \n\t\t\t\t[class.f-order1]=\"iconAlign=='left'\"\n\t\t\t\t[class.f-order5]=\"iconAlign=='right'\">\n\t\t\t<span class=\"textbox-icon textbox-icon-disabled {{iconCls}}\"></span>\n\t\t</span>\n\t</span>\n";
var InputBaseComponent = (function (_super) {
    __extends(InputBaseComponent, _super);
    function InputBaseComponent(cdRef) {
        var _this = _super.call(this) || this;
        _this.cdRef = cdRef;
        //@Input() value: any = '';
        //@Input() text: string = '';
        _this.textFormatter = _this._defaultTextFormatter;
        _this.disabled = false;
        _this.readonly = false;
        _this.editable = true;
        _this.iconCls = null;
        _this.iconAlign = 'right';
        _this.placeholder = '';
        _this.multiline = false;
        _this.invalid = false;
        _this.tabindex = null;
        _this.cls = null;
        _this.inputCls = null;
        _this.inputId = null;
        _this.onFocus = new EventEmitter();
        _this.onBlur = new EventEmitter();
        _this._focused = false;
        return _this;
    }
    InputBaseComponent.prototype._defaultTextFormatter = function (value) {
        return value == null ? value : String(value);
    };
    InputBaseComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            if (_this.value == null) {
                _this._initialized = true;
            }
        });
    };
    Object.defineProperty(InputBaseComponent.prototype, "focused", {
        get: function () {
            return this._focused;
        },
        enumerable: true,
        configurable: true
    });
    InputBaseComponent.prototype.focus = function () {
        this.inputRef.nativeElement.focus();
        this._focused = true;
        this.onFocus.emit();
    };
    InputBaseComponent.prototype.blur = function () {
        this.inputRef.nativeElement.blur();
        this._focused = false;
        this.touched();
        this.onBlur.emit();
    };
    InputBaseComponent.prototype.getSelectionStart = function () {
        return this.getSelectionRange().start;
    };
    InputBaseComponent.prototype.getSelectionRange = function () {
        var start = 0;
        var end = 0;
        var target = this.inputRef.nativeElement;
        if (typeof target.selectionStart == 'number') {
            start = target.selectionStart;
            end = target.selectionEnd;
        }
        return { start: start, end: end };
    };
    InputBaseComponent.prototype.setSelectionRange = function (start, end) {
        var target = this.inputRef.nativeElement;
        if (target.setSelectionRange) {
            target.setSelectionRange(start, end);
        }
        else if (target.createTextRange) {
            var range = target.createTextRange();
            range.collapse();
            range.moveEnd('character', end);
            range.moveStart('character', start);
            range.select();
        }
    };
    return InputBaseComponent;
}(ValueAccessorBase));
export { InputBaseComponent };
InputBaseComponent.decorators = [
    { type: Component, args: [{
                template: INPUT_BASE_TEMPLATE,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return InputBaseComponent; }),
                        multi: true
                    }],
                host: {
                    '[class.f-inline-row]': 'true'
                }
            },] },
];
/** @nocollapse */
InputBaseComponent.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
]; };
InputBaseComponent.propDecorators = {
    'addonRef': [{ type: ViewChild, args: ['addon',] },],
    'inputRef': [{ type: ViewChild, args: ['input',] },],
    'addons': [{ type: ContentChildren, args: [AddonComponent,] },],
    'textFormatter': [{ type: Input },],
    'disabled': [{ type: Input },],
    'readonly': [{ type: Input },],
    'editable': [{ type: Input },],
    'iconCls': [{ type: Input },],
    'iconAlign': [{ type: Input },],
    'placeholder': [{ type: Input },],
    'multiline': [{ type: Input },],
    'invalid': [{ type: Input },],
    'tabindex': [{ type: Input },],
    'cls': [{ type: Input },],
    'inputCls': [{ type: Input },],
    'inputStyle': [{ type: Input },],
    'inputId': [{ type: Input },],
    'onFocus': [{ type: Output, args: ['focus',] },],
    'onBlur': [{ type: Output, args: ['blur',] },],
};
//# sourceMappingURL=input-base.component.js.map