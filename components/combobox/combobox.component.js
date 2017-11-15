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
import { Component, forwardRef, ViewChild, ContentChild, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComboBaseComponent } from '../base/combo-base.component';
import { ItemTemplateDirective } from '../base/template-base';
export var COMBOBOX_TEMPLATE = "\n\t<span class=\"textbox f-inline-row f-full\" \n\t\t\t[ngClass]=\"cls\"\n\t\t\t[class.textbox-disabled]=\"disabled\"\n\t\t\t[class.textbox-readonly]=\"readonly\"\n\t\t\t[class.textbox-focused]=\"focused\"\n\t\t\t[class.textbox-invalid]=\"invalid\">\n\t\t<input #input *ngIf=\"!multiline\" autocomplete=\"off\" class=\"textbox-text f-full f-order3\"\n\t\t\t\t[class.validatebox-invalid]=\"invalid\"\n\t\t\t\t[attr.id]=\"inputId\"\n\t\t\t\t[attr.disabled]=\"disabled?'disabled':null\"\n\t\t\t\t[attr.readonly]=\"(readonly||!editable)?'readonly':null\"\n\t\t\t\t[attr.tabindex]=\"tabindex\"\n\t\t\t\t[ngClass]=\"inputCls\"\n\t\t\t\t[ngStyle]=\"inputStyle\"\n\t\t\t\t[(ngModel)]=\"text\"\n\t\t\t\t[placeholder]=\"placeholder\"\n\t\t\t\t(focus)=\"focus()\"\n\t\t\t\t(blur)=\"blur()\">\n\t\t<textarea #input *ngIf=\"multiline\" autocomplete=\"off\" class=\"textbox-text f-full f-order3\"\n\t\t\t\t[class.validatebox-invalid]=\"invalid\"\n\t\t\t\t[attr.id]=\"inputId\"\n\t\t\t\t[attr.disabled]=\"disabled?'disabled':null\"\n\t\t\t\t[attr.readonly]=\"(readonly||!editable)?'readonly':null\"\n\t\t\t\t[attr.tabindex]=\"tabindex\"\n\t\t\t\t[ngClass]=\"inputCls\"\n\t\t\t\t[ngStyle]=\"inputStyle\"\n\t\t\t\t[(ngModel)]=\"text\"\n\t\t\t\t[placeholder]=\"placeholder\"\n\t\t\t\t(focus)=\"focus()\"\n\t\t\t\t(blur)=\"blur()\"></textarea>\n\t\t<ng-content select=\"eui-addon\"></ng-content>\n\t\t<span #addon *ngIf=\"iconCls\" \n\t\t\t\tclass=\"textbox-addon textbox-addon-icon f-inline-row f-noshrink\" \n\t\t\t\t[class.f-order1]=\"iconAlign=='left'\"\n\t\t\t\t[class.f-order5]=\"iconAlign=='right'\">\n\t\t\t<span class=\"textbox-icon textbox-icon-disabled {{iconCls}}\"></span>\n\t\t</span>\n\t\t<span #arrow *ngIf=\"hasDownArrow\" (click)=\"togglePanel()\"\n\t\t\t\tclass=\"textbox-addon f-column f-noshrink\"\n\t\t\t\t[class.f-order0]=\"arrowAlign=='left'\"\n\t\t\t\t[class.f-order6]=\"arrowAlign=='right'\">\n\t\t\t<span class=\"textbox-icon combo-arrow f-full\"></span>\n\t\t</span>\n\t</span>\n\n\t<div #panel *ngIf=\"!panelClosed\" \n\t\t\tclass=\"panel-body panel-body-noheader combo-panel combo-p f-row\"\n\t\t\t[style.left.px]=\"panelLeft\"\n\t\t\t[style.top.px]=\"panelTop\"\n\t\t\t[ngStyle]=\"panelStyle\">\n\t\t<eui-datalist #datalist class=\"f-full\" itemCls=\"combobox-item\" hoverCls=\"combobox-item-hover\" selectedCls=\"combobox-item-selected\"\n\t\t\t\t[border]=\"false\"\n\t\t\t\t[data]=\"items\"\n\t\t\t\t[lazy]=\"lazy\"\n\t\t\t\t[virtualScroll]=\"virtualScroll\"\n\t\t\t\t[total]=\"total\"\n\t\t\t\t[pageNumber]=\"pageNumber\"\n\t\t\t\t[pageSize]=\"pageSize\"\n\t\t\t\t[rowHeight]=\"rowHeight\"\n\t\t\t\t[selectionMode]=\"multiple ? 'multiple' : 'single'\"\n\t\t\t\t[idField]=\"valueField\"\n\t\t\t\t[(selection)]=\"selection\"\n\t\t\t\t(rowClick)=\"onRowClick($event)\"\n\t\t\t\t(selectionChange)=\"onSelectionChange($event)\"\n\t\t\t\t(pageChange)=\"onPageChange($event)\">\n\t\t\t<ng-template euiItemTemplate let-row let-rowIndex=\"rowIndex\">\n\t\t\t\t<ng-container *ngIf=\"!itemTemplate\">{{row[textField]}}</ng-container>\n\t\t\t\t<ng-template *ngIf=\"itemTemplate\" [euiComboBoxItemTemplate]=\"itemTemplate.template\" [row]=\"row\" [rowIndex]=\"rowIndex\"></ng-template>\n\t\t\t</ng-template>\n\t\t</eui-datalist>\n\t</div>\n";
var ComboBoxComponent = (function (_super) {
    __extends(ComboBoxComponent, _super);
    function ComboBoxComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.valueField = 'value';
        _this.textField = 'text';
        _this.groupField = null;
        _this.limitToList = true;
        _this.lazy = false;
        _this.virtualScroll = false;
        _this.rowHeight = 30;
        _this.pageNumber = 1;
        _this.pageSize = 10;
        _this.total = 0;
        _this.filterChange = new EventEmitter();
        _this.selectionChange = new EventEmitter();
        _this.mappingTexts = {};
        _this.inputingText = null;
        _this.displayingText = null;
        _this.lastFilterValue = null;
        _this.items = [];
        _this._data = [];
        _this._text = null;
        return _this;
    }
    Object.defineProperty(ComboBoxComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            if (value == null) {
                value = [];
            }
            this._data = value;
            this.items = value;
            this.updateText();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboBoxComponent.prototype, "text", {
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
    ComboBoxComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.valueChange.subscribe(function () {
            _this.updateText();
        });
        this.initTextMapping();
    };
    ComboBoxComponent.prototype.initTextMapping = function () {
        var _this = this;
        if (this.selection) {
            if (this.selection instanceof Array) {
                this.selection.forEach(function (row) {
                    var v = row[_this.valueField];
                    var t = row[_this.textField];
                    _this.mappingTexts[v] = t;
                });
            }
            else {
                var v = this.selection[this.valueField];
                var t = this.selection[this.textField];
                this.mappingTexts[v] = t;
            }
        }
    };
    ComboBoxComponent.prototype.onRowClick = function (event) {
        if (!this.multiple) {
            this.closePanel();
        }
    };
    ComboBoxComponent.prototype.onSelectionChange = function (event) {
        var _this = this;
        this.selectionChange.emit(event);
        this.inputingText = null;
        if (event == null) {
            this.value = null;
            return;
        }
        if (this.multiple) {
            this.value = event.map(function (row) { return row[_this.valueField]; });
        }
        else {
            this.value = event[this.valueField];
        }
    };
    ComboBoxComponent.prototype.onPageChange = function (event) {
        this.filterChange.emit(Object.assign(event, {
            filterValue: this.lastFilterValue
        }));
    };
    ComboBoxComponent.prototype.onKeyDown = function (event) {
        if (this.panelClosed && event.which == 40) {
            this.openPanel();
            event.preventDefault();
            return;
        }
        switch (event.which) {
            case 40:
                this.datalist.navRow(1);
                event.preventDefault();
                break;
            case 38:
                this.datalist.navRow(-1);
                event.preventDefault();
                break;
            case 13:
                if (this.datalist && this.datalist.highlightRow) {
                    this.datalist.doEnter();
                    if (!this.multiple) {
                        this.closePanel();
                    }
                    this._text = this.displayingText;
                }
                event.preventDefault();
                break;
            case 9:
                this.fixValue();
                this.closePanel();
                break;
            case 27:
                this.closePanel();
                this._text = this.displayingText;
                event.preventDefault();
                break;
        }
    };
    ComboBoxComponent.prototype.onComboBoxBlur = function () {
        if (!this.panelClosed) {
            this.fixValue();
        }
    };
    ComboBoxComponent.prototype.fixValue = function () {
        if (this.inputingText == null) {
            return;
        }
        var text = this.inputingText.trim();
        if (!text) {
            this.value = null;
            this.clearSelections();
            return;
        }
        if (this.multiple) {
            var vv = [];
            var used_1 = [];
            var tt = text.split(this.separator).filter(function (t) { return t.trim() != ''; });
            for (var _i = 0, _a = this.value; _i < _a.length; _i++) {
                var val = _a[_i];
                var text_1 = this.mappingTexts[val];
                if (tt.indexOf(text_1) != -1) {
                    vv.push(val);
                    used_1.push(text_1);
                }
            }
            if (!this.limitToList) {
                tt = tt.filter(function (t) { return used_1.indexOf(t) == -1; });
                if (tt.length) {
                    vv = vv.concat(tt);
                }
            }
            this.value = this.value || [];
            if (this.value.join('') != vv.join('')) {
                this.value = vv;
            }
        }
        else {
            if (this.inputingText != this.displayingText) {
                this.clearSelections();
                this.value = this.limitToList ? null : this.inputingText;
            }
        }
        this.inputingText = null;
    };
    ComboBoxComponent.prototype.doFilter = function (value) {
        var _this = this;
        if (this.lastFilterValue == value) {
            return;
        }
        this.datalist.scrollTop = 0;
        value = (value || '').trim();
        if (!this.lazy) {
            if (value) {
                var val_1 = value;
                if (this.multiple) {
                    var tt = value.split(this.separator);
                    val_1 = tt[tt.length - 1] || '';
                }
                this.items = this.data.filter(function (item) {
                    var index = String(item[_this.textField]).toLowerCase().indexOf(val_1.trim().toLowerCase());
                    return index == -1 ? false : true;
                });
            }
            else {
                this.items = this.data;
            }
            this.total = this.items.length;
            setTimeout(function () { return _this.datalist.highlightFirstRow(); });
        }
        this.lastFilterValue = value;
        this.filterChange.emit({
            pageNumber: 1,
            pageSize: this.pageSize,
            filterValue: value
        });
    };
    ComboBoxComponent.prototype.openPanel = function () {
        var _this = this;
        if (this.panelClosed) {
            _super.prototype.openPanel.call(this);
            this.datalist.scrollTop = this.datalistScrollTop;
            if (this.editable) {
                this.doFilter('');
            }
            setTimeout(function () {
                _this.datalist.scrollToSelectedRow();
            }, 50);
        }
    };
    ComboBoxComponent.prototype.closePanel = function () {
        if (!this.panelClosed) {
            this.datalistScrollTop = this.datalist.scrollTop;
            _super.prototype.closePanel.call(this);
        }
    };
    ComboBoxComponent.prototype.updateText = function () {
        if (this.value == null) {
            if (this.datalist) {
                this.mappingTexts = {};
            }
            this.displayingText = null;
        }
        else {
            var mt = {};
            var tt = [];
            if (this.multiple) {
                var rows = [];
                for (var i = 0; i < this.value.length; i++) {
                    var val = this.value[i];
                    var item = this.findItem(val);
                    if (item) {
                        mt[val] = item[this.textField];
                        rows.push(item);
                    }
                    else {
                        mt[val] = this.mappingTexts[val] || val;
                        var row = {};
                        row[this.valueField] = val;
                        row[this.textField] = mt[val];
                        rows.push(row);
                    }
                    tt.push(mt[val]);
                }
                this.updateSelection(rows);
            }
            else {
                var item = this.findItem(this.value);
                if (item) {
                    mt[this.value] = item[this.textField];
                    this.updateSelection(item);
                }
                else {
                    mt[this.value] = this.mappingTexts[this.value] || this.value;
                    var row = {};
                    row[this.valueField] = this.value;
                    row[this.textField] = mt[this.value];
                    this.updateSelection(row);
                }
                tt.push(mt[this.value]);
            }
            this.mappingTexts = mt;
            this.displayingText = tt.join(this.separator);
        }
    };
    ComboBoxComponent.prototype.findItem = function (value) {
        var _this = this;
        var finder = function (value, items) {
            if (items === void 0) { items = null; }
            if (!items) {
                items = _this.data || [];
            }
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item_1 = items_1[_i];
                if (item_1[_this.valueField] == value) {
                    return item_1;
                }
            }
            return null;
        };
        var item = finder(value);
        if (!item && this.selection) {
            var items = this.selection instanceof Array ? this.selection : [this.selection];
            item = finder(value, items);
        }
        return item;
    };
    ComboBoxComponent.prototype.updateSelection = function (rows) {
        if (!rows) {
            rows = [];
        }
        else {
            rows = rows instanceof Array ? rows : [rows];
        }
        var items = [];
        if (this.selection) {
            items = this.selection instanceof Array ? this.selection : [this.selection];
        }
        if (this.multiple) {
            this.selection = rows;
        }
        else {
            this.selection = rows[0] || null;
        }
        if (items.length != rows.length) {
            this.selectionChange.emit(this.selection);
        }
    };
    ComboBoxComponent.prototype.clearSelections = function () {
        if (this.selection) {
            if (this.multiple) {
                if (this.selection.length) {
                    this.selection = [];
                    this.selectionChange.emit(this.selection);
                }
            }
            else {
                this.selection = null;
                this.selectionChange.emit(this.selection);
            }
        }
    };
    return ComboBoxComponent;
}(ComboBaseComponent));
export { ComboBoxComponent };
ComboBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-combobox',
                template: COMBOBOX_TEMPLATE,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return ComboBoxComponent; }),
                        multi: true
                    }],
                host: {
                    'class': 'f-inline-row'
                }
            },] },
];
/** @nocollapse */
ComboBoxComponent.ctorParameters = function () { return []; };
ComboBoxComponent.propDecorators = {
    'datalist': [{ type: ViewChild, args: ['datalist',] },],
    'itemTemplate': [{ type: ContentChild, args: [ItemTemplateDirective,] },],
    'valueField': [{ type: Input },],
    'textField': [{ type: Input },],
    'groupField': [{ type: Input },],
    'limitToList': [{ type: Input },],
    'lazy': [{ type: Input },],
    'virtualScroll': [{ type: Input },],
    'rowHeight': [{ type: Input },],
    'pageNumber': [{ type: Input },],
    'pageSize': [{ type: Input },],
    'total': [{ type: Input },],
    'selection': [{ type: Input },],
    'filterChange': [{ type: Output },],
    'selectionChange': [{ type: Output },],
    'data': [{ type: Input },],
    'text': [{ type: Input },],
    'onKeyDown': [{ type: HostListener, args: ['keydown', ['$event'],] },],
    'onComboBoxBlur': [{ type: HostListener, args: ['blur',] },],
};
//# sourceMappingURL=combobox.component.js.map