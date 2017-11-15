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
import { Component, forwardRef, Input, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SpinnerBaseComponent, SPINNER_BASE_TEMPLATE } from '../base/spinner-base.component';
var NumberBoxComponent = (function (_super) {
    __extends(NumberBoxComponent, _super);
    function NumberBoxComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.min = null;
        _this.max = null;
        _this.increment = 1;
        _this.precision = 0;
        _this.decimalSeparator = '.';
        _this.groupSeparator = '';
        _this.prefix = '';
        _this.suffix = '';
        _this._text = null;
        return _this;
    }
    Object.defineProperty(NumberBoxComponent.prototype, "text", {
        get: function () {
            this._text = this._focused ? this._text : this.textFormatter.call(this, this.value);
            return this._text;
        },
        set: function (v) {
            this._text = v;
        },
        enumerable: true,
        configurable: true
    });
    NumberBoxComponent.prototype._defaultTextFormatter = function (value) {
        return this.formatter.call(this, value);
    };
    NumberBoxComponent.prototype.ngOnInit = function () {
        this.value = this.parser.call(this, this.value);
    };
    NumberBoxComponent.prototype._onKeypress = function (event) {
        if (this.focused) {
            return this.filter.call(this, event);
        }
    };
    NumberBoxComponent.prototype._onBlur = function () {
        this.value = this.parser.call(this, this._text);
    };
    NumberBoxComponent.prototype.filter = function (e) {
        var s = this.text;
        if (e.metaKey || e.ctrlKey) {
            return true;
        }
        if (['46', '8', '13', '0'].indexOf(String(e.which)) !== -1) {
            return true;
        }
        var c = String.fromCharCode(e.which);
        if (!c) {
            return true;
        }
        if (c == '-' || c == this.decimalSeparator) {
            return (s.indexOf(c) == -1) ? true : false;
        }
        else if (c == this.groupSeparator) {
            return true;
        }
        else if ('0123456789'.indexOf(c) >= 0) {
            return true;
        }
        else {
            return false;
        }
    };
    NumberBoxComponent.prototype.formatter = function (value) {
        if (value == null) {
            return null;
        }
        value = parseFloat(value + '');
        var s = value.toFixed(this.precision);
        var s1 = s;
        var s2 = '';
        var dpos = s.indexOf('.');
        if (dpos >= 0) {
            s1 = s.substring(0, dpos);
            s2 = s.substring(dpos + 1, s.length);
        }
        if (this.groupSeparator) {
            var p = /(\d+)(\d{3})/;
            while (p.test(s1)) {
                s1 = s1.replace(p, '$1' + this.groupSeparator + '$2');
            }
        }
        if (s2) {
            return this.prefix + s1 + this.decimalSeparator + s2 + this.suffix;
        }
        else {
            return this.prefix + s1 + this.suffix;
        }
    };
    NumberBoxComponent.prototype.parser = function (s) {
        if (s == null) {
            return null;
        }
        s = (s + '').trim();
        if (this.prefix) {
            s = s.replace(new RegExp('\\' + this.prefix, 'g'), '');
        }
        if (this.suffix) {
            s = s.replace(new RegExp('\\' + this.suffix, 'g'), '');
        }
        if (this.groupSeparator) {
            s = s.replace(new RegExp('\\' + this.groupSeparator, 'g'), '');
        }
        if (this.decimalSeparator) {
            s = s.replace(new RegExp('\\' + this.decimalSeparator, 'g'), '.');
        }
        s = s.replace(/\s/g, '');
        var v = parseFloat(s);
        if (isNaN(v)) {
            return null;
        }
        else {
            v = parseFloat(v.toFixed(this.precision));
            if (this.min != null && this.min > v) {
                v = this.min;
            }
            if (this.max != null && this.max < v) {
                v = this.max;
            }
            return v;
        }
    };
    NumberBoxComponent.prototype.doSpinUp = function () {
        var v = (this.value || 0) + this.increment;
        this.value = this.parser(String(v));
    };
    NumberBoxComponent.prototype.doSpinDown = function () {
        var v = (this.value || 0) - this.increment;
        this.value = this.parser(String(v));
    };
    return NumberBoxComponent;
}(SpinnerBaseComponent));
export { NumberBoxComponent };
NumberBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-numberbox',
                template: SPINNER_BASE_TEMPLATE,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return NumberBoxComponent; }),
                        multi: true
                    }],
                host: {
                    '[class.f-inline-row]': 'true'
                }
            },] },
];
/** @nocollapse */
NumberBoxComponent.ctorParameters = function () { return []; };
NumberBoxComponent.propDecorators = {
    'min': [{ type: Input },],
    'max': [{ type: Input },],
    'increment': [{ type: Input },],
    'precision': [{ type: Input },],
    'decimalSeparator': [{ type: Input },],
    'groupSeparator': [{ type: Input },],
    'prefix': [{ type: Input },],
    'suffix': [{ type: Input },],
    'text': [{ type: Input },],
    '_onKeypress': [{ type: HostListener, args: ['keypress', ['$event'],] },],
    '_onBlur': [{ type: HostListener, args: ['blur',] },],
};
//# sourceMappingURL=numberbox.component.js.map