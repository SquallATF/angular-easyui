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
import { Component, forwardRef, ContentChild, Input, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComboBaseComponent } from '../base/combo-base.component';
import { DataGridComponent } from '../datagrid/datagrid.component';
export var COMBOGRID_TEMPLATE = "\n\t<span class=\"textbox f-inline-row f-full\" \n\t\t\t[ngClass]=\"cls\"\n\t\t\t[class.textbox-disabled]=\"disabled\"\n\t\t\t[class.textbox-readonly]=\"readonly\"\n\t\t\t[class.textbox-focused]=\"focused\"\n\t\t\t[class.textbox-invalid]=\"invalid\">\n\t\t<input #input *ngIf=\"!multiline\" autocomplete=\"off\" class=\"textbox-text f-full f-order3\"\n\t\t\t\t[class.validatebox-invalid]=\"invalid\"\n\t\t\t\t[attr.id]=\"inputId\"\n\t\t\t\t[attr.disabled]=\"disabled?'disabled':null\"\n\t\t\t\t[attr.readonly]=\"(readonly||!editable)?'readonly':null\"\n\t\t\t\t[attr.tabindex]=\"tabindex\"\n\t\t\t\t[ngClass]=\"inputCls\"\n\t\t\t\t[ngStyle]=\"inputStyle\"\n\t\t\t\t[(ngModel)]=\"text\"\n\t\t\t\t[placeholder]=\"placeholder\"\n\t\t\t\t(focus)=\"focus()\"\n\t\t\t\t(blur)=\"blur()\">\n\t\t<textarea #input *ngIf=\"multiline\" autocomplete=\"off\" class=\"textbox-text f-full f-order3\"\n\t\t\t\t[class.validatebox-invalid]=\"invalid\"\n\t\t\t\t[attr.id]=\"inputId\"\n\t\t\t\t[attr.disabled]=\"disabled?'disabled':null\"\n\t\t\t\t[attr.readonly]=\"(readonly||!editable)?'readonly':null\"\n\t\t\t\t[attr.tabindex]=\"tabindex\"\n\t\t\t\t[ngClass]=\"inputCls\"\n\t\t\t\t[ngStyle]=\"inputStyle\"\n\t\t\t\t[(ngModel)]=\"text\"\n\t\t\t\t[placeholder]=\"placeholder\"\n\t\t\t\t(focus)=\"focus()\"\n\t\t\t\t(blur)=\"blur()\"></textarea>\n\t\t<ng-content select=\"eui-addon\"></ng-content>\n\t\t<span #addon *ngIf=\"iconCls\" \n\t\t\t\tclass=\"textbox-addon textbox-addon-icon f-inline-row f-noshrink\" \n\t\t\t\t[class.f-order1]=\"iconAlign=='left'\"\n\t\t\t\t[class.f-order5]=\"iconAlign=='right'\">\n\t\t\t<span class=\"textbox-icon textbox-icon-disabled {{iconCls}}\"></span>\n\t\t</span>\n\t\t<span #arrow *ngIf=\"hasDownArrow\" (click)=\"togglePanel()\"\n\t\t\t\tclass=\"textbox-addon f-column f-noshrink\"\n\t\t\t\t[class.f-order0]=\"arrowAlign=='left'\"\n\t\t\t\t[class.f-order6]=\"arrowAlign=='right'\">\n\t\t\t<span class=\"textbox-icon combo-arrow f-full\"></span>\n\t\t</span>\n\t</span>\n\n\t<div #panel *ngIf=\"!panelClosed\" \n\t\t\tclass=\"panel-body panel-body-noheader combo-panel combo-p\"\n\t\t\t[style.left.px]=\"panelLeft\"\n\t\t\t[style.top.px]=\"panelTop\"\n\t\t\t[ngStyle]=\"panelStyle\">\n\t\t<ng-content select=\"eui-datagrid\"></ng-content>\n\t</div>\n";
var ComboGridComponent = (function (_super) {
    __extends(ComboGridComponent, _super);
    function ComboGridComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.valueField = 'id';
        _this.textField = 'text';
        _this.editable = false;
        _this.mappingTexts = {};
        _this.displayingText = null;
        _this.inputingText = null;
        _this.datagridScrollTop = 0;
        _this._data = [];
        _this._text = null;
        _this._multiple = false;
        return _this;
    }
    Object.defineProperty(ComboGridComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            if (value == null) {
                value = [];
            }
            this._data = value;
            if (this.datagrid) {
                this.datagrid.data = this._data;
            }
            this.updateText();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboGridComponent.prototype, "text", {
        get: function () {
            if (!this.focused) {
                if (this.value != null && this.displayingText == null) {
                    this.updateText();
                }
                this._text = this.textFormatter(this.displayingText);
            }
            return this._text;
        },
        set: function (value) {
            var _this = this;
            this._text = value;
            if (this.focused) {
                this.inputingText = value;
                this.openPanel();
                clearTimeout(this.timer);
                this.timer = setTimeout(function () {
                    _this.doFilter(value);
                }, this.delay);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboGridComponent.prototype, "multiple", {
        get: function () {
            return this._multiple;
        },
        set: function (value) {
            this._multiple = value;
            if (this.datagrid) {
                this.datagrid.selectionMode = value ? 'multiple' : 'single';
            }
        },
        enumerable: true,
        configurable: true
    });
    ComboGridComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.valueChange.subscribe(function () { return _this.updateText(); });
        if (this.datagrid) {
            this.datagrid.border = false;
            this.datagrid.selectionMode = this.multiple ? 'multiple' : 'single';
            this.datagrid.data = this.data;
            this.datagrid.selectionChange.subscribe(function (selection) {
                if (selection) {
                    if (_this.multiple) {
                        _this.value = selection.map(function (row) { return row[_this.valueField]; });
                    }
                    else {
                        _this.value = selection[_this.valueField];
                        _this.closePanel();
                    }
                }
                else {
                    _this.value = null;
                }
            });
        }
    };
    ComboGridComponent.prototype.onComboGridBlur = function () {
        if (this.inputingText == null) {
            return;
        }
        var text = this.inputingText.trim();
        if (!text) {
            this.value = null;
            return;
        }
        if (this.multiple) {
            var vv = [];
            var tt = text.split(this.separator);
            for (var _i = 0, _a = this.value; _i < _a.length; _i++) {
                var val = _a[_i];
                var text_1 = this.mappingTexts[val];
                if (tt.indexOf(text_1) != -1) {
                    vv.push(val);
                }
            }
            if (this.value.length != vv.length) {
                this.value = vv;
            }
        }
        else {
            if (this.inputingText != this.displayingText) {
                this.value = null;
            }
        }
        this.inputingText = null;
    };
    ComboGridComponent.prototype.doFilter = function (value) {
    };
    ComboGridComponent.prototype.openPanel = function () {
        if (this.panelClosed) {
            _super.prototype.openPanel.call(this);
            if (this.datagrid) {
                this.datagrid.view2.body.bodyRef.nativeElement.scrollTop = this.datagridScrollTop;
                if (this.datagrid.selection) {
                    var row = this.multiple ? this.datagrid.selection[0] : this.datagrid.selection;
                    if (row) {
                        this.datagrid.scrollTo(row);
                    }
                }
            }
            if (this.editable) {
                this.doFilter('');
            }
        }
    };
    ComboGridComponent.prototype.closePanel = function () {
        if (!this.panelClosed) {
            this.datagridScrollTop = this.datagrid.view2.body.scrollTop;
            _super.prototype.closePanel.call(this);
        }
    };
    ComboGridComponent.prototype.updateText = function () {
        if (!this.datagrid) {
            return;
        }
        if (this.value == null) {
            this.mappingTexts = {};
            this.displayingText = null;
            this.datagrid.selection = null;
        }
        else {
            var mt = {};
            var tt = [];
            var ss = [];
            if (this.multiple) {
                for (var _i = 0, _a = this.value; _i < _a.length; _i++) {
                    var val = _a[_i];
                    var row = this.findRow(val);
                    if (row) {
                        mt[val] = row[this.textField];
                        ss.push(row);
                    }
                    else {
                        mt[val] = this.mappingTexts[val] || val;
                    }
                    tt.push(mt[val]);
                }
                this.datagrid.selection = ss;
            }
            else {
                var row = this.findRow(this.value);
                if (row) {
                    mt[this.value] = row[this.textField];
                    ss.push(row);
                }
                else {
                    mt[this.value] = this.mappingTexts[this.value] || this.value;
                }
                tt.push(mt[this.value]);
                this.datagrid.selection = ss.length ? ss[0] : null;
            }
            this.mappingTexts = mt;
            this.displayingText = tt.join(this.separator);
        }
    };
    ComboGridComponent.prototype.findRow = function (value) {
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var row = _a[_i];
            if (row[this.valueField] == value) {
                return row;
            }
        }
        return null;
    };
    return ComboGridComponent;
}(ComboBaseComponent));
export { ComboGridComponent };
ComboGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-combogrid',
                template: COMBOGRID_TEMPLATE,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return ComboGridComponent; }),
                        multi: true
                    }],
                host: {
                    'class': 'f-inline-row'
                }
            },] },
];
/** @nocollapse */
ComboGridComponent.ctorParameters = function () { return []; };
ComboGridComponent.propDecorators = {
    'datagrid': [{ type: ContentChild, args: [DataGridComponent,] },],
    'valueField': [{ type: Input },],
    'textField': [{ type: Input },],
    'editable': [{ type: Input },],
    'data': [{ type: Input },],
    'text': [{ type: Input },],
    'multiple': [{ type: Input },],
    'onComboGridBlur': [{ type: HostListener, args: ['blur',] },],
};
//# sourceMappingURL=combogrid.component.js.map