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
import { dateHelper } from '../base/datehelper';
var TimeSpinnerComponent = (function (_super) {
    __extends(TimeSpinnerComponent, _super);
    function TimeSpinnerComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.min = null;
        _this.max = null;
        _this.increment = 1;
        _this.highlight = 0;
        _this.formatter = _this.defaultFormatter;
        _this.parser = _this.defaultParser;
        _this.selections = [[0, 2], [3, 5], [6, 8]];
        _this.highlighting = false;
        _this.inputingText = null;
        _this._text = null;
        _this._format = 'HH:mm';
        return _this;
    }
    Object.defineProperty(TimeSpinnerComponent.prototype, "text", {
        get: function () {
            var _this = this;
            this._text = this._focused ? this._text : this.textFormatter(this.value);
            if (this.focused && this.highlighting) {
                this.highlightRange(this.highlight);
                setTimeout(function () { return _this.highlighting = false; });
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
    Object.defineProperty(TimeSpinnerComponent.prototype, "format", {
        get: function () {
            return this._format;
        },
        set: function (value) {
            this._format = value;
            this.selections = dateHelper.parseSelections(this._format);
        },
        enumerable: true,
        configurable: true
    });
    TimeSpinnerComponent.prototype._defaultTextFormatter = function (value) {
        return this.formatter(this.parser(value));
    };
    TimeSpinnerComponent.prototype._transform = function (value) {
        if (this._initialized) {
            return this.formatter(this.parser(value));
        }
        else {
            return value;
        }
    };
    TimeSpinnerComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.selections = dateHelper.parseSelections(this._format);
    };
    TimeSpinnerComponent.prototype.onClickMe = function (event) {
        if (event.target == this.inputRef.nativeElement) {
            var start = this.getSelectionStart();
            for (var i = 0; i < this.selections.length; i++) {
                var range = this.selections[i];
                if (start >= range[0] && start <= range[1]) {
                    this.highlightRange(i);
                    return;
                }
            }
        }
    };
    TimeSpinnerComponent.prototype.onPressMe = function (event) {
        if (event.target == this.inputRef.nativeElement) {
            if (event.keyCode == 13) {
                event.stopPropagation();
                this.value = this.text;
                this.text = this.value;
                this.onClickMe(event);
                this.highlighting = true;
            }
        }
    };
    TimeSpinnerComponent.prototype.onTimeSpinnerBlur = function () {
        if (this.inputingText == null) {
            return;
        }
        this.value = this.inputingText;
        this.inputingText = null;
    };
    TimeSpinnerComponent.prototype.doSpin = function (down) {
        var range = this.selections[this.highlight];
        if (range) {
            var s = this.text || '';
            if (s) {
                var s1 = s.substring(0, range[0]);
                var s2 = s.substring(range[0], range[1]);
                var s3 = s.substring(range[1]);
                var v = s1 + ((parseInt(s2, 10) || 0) + this.increment * (down ? -1 : 1)) + s3;
                this.value = this.formatter(this.parser(v));
            }
            else {
                this.value = this.formatter(new Date());
            }
            this.text = this.value;
            this.focus();
            this.highlighting = true;
        }
    };
    TimeSpinnerComponent.prototype.doSpinUp = function () {
        this.doSpin(false);
    };
    TimeSpinnerComponent.prototype.doSpinDown = function () {
        this.doSpin(true);
    };
    TimeSpinnerComponent.prototype.highlightRange = function (index) {
        this.highlight = index;
        var range = this.selections[this.highlight];
        if (range) {
            this.setSelectionRange(range[0], range[1]);
            this.focus();
        }
    };
    TimeSpinnerComponent.prototype.parseD = function (value) {
        return dateHelper.parseDate(value, this.format);
    };
    TimeSpinnerComponent.prototype.defaultFormatter = function (date) {
        return dateHelper.formatDate(date, this.format);
    };
    TimeSpinnerComponent.prototype.defaultParser = function (value) {
        var date = this.parseD(value);
        if (date) {
            var min = this.parseD(this.min);
            var max = this.parseD(this.max);
            if (min && min > date) {
                date = min;
            }
            if (max && max < date) {
                date = max;
            }
        }
        return date;
    };
    return TimeSpinnerComponent;
}(SpinnerBaseComponent));
export { TimeSpinnerComponent };
TimeSpinnerComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-timespinner',
                template: SPINNER_BASE_TEMPLATE,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return TimeSpinnerComponent; }),
                        multi: true
                    }],
                host: {
                    '[class.f-inline-row]': 'true'
                }
            },] },
];
/** @nocollapse */
TimeSpinnerComponent.ctorParameters = function () { return []; };
TimeSpinnerComponent.propDecorators = {
    'min': [{ type: Input },],
    'max': [{ type: Input },],
    'increment': [{ type: Input },],
    'highlight': [{ type: Input },],
    'formatter': [{ type: Input },],
    'parser': [{ type: Input },],
    'selections': [{ type: Input },],
    'text': [{ type: Input },],
    'format': [{ type: Input },],
    'onClickMe': [{ type: HostListener, args: ['click', ['$event'],] },],
    'onPressMe': [{ type: HostListener, args: ['keydown', ['$event'],] },],
    'onTimeSpinnerBlur': [{ type: HostListener, args: ['blur',] },],
};
//# sourceMappingURL=timespinner.component.js.map