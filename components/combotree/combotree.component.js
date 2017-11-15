/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
/*
  EasyUI for Angular
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
import { TreeComponent } from '../tree/tree.component';
import { treeHelper } from '../base/treehelper';
export var COMBOTREE_TEMPLATE = "\n\t<span class=\"textbox f-inline-row f-full\" \n\t\t\t[ngClass]=\"cls\"\n\t\t\t[class.textbox-disabled]=\"disabled\"\n\t\t\t[class.textbox-readonly]=\"readonly\"\n\t\t\t[class.textbox-focused]=\"focused\"\n\t\t\t[class.textbox-invalid]=\"invalid\">\n\t\t<input #input *ngIf=\"!multiline\" autocomplete=\"off\" class=\"textbox-text f-full f-order3\"\n\t\t\t\t[class.validatebox-invalid]=\"invalid\"\n\t\t\t\t[attr.id]=\"inputId\"\n\t\t\t\t[attr.disabled]=\"disabled?'disabled':null\"\n\t\t\t\t[attr.readonly]=\"(readonly||!editable)?'readonly':null\"\n\t\t\t\t[attr.tabindex]=\"tabindex\"\n\t\t\t\t[ngClass]=\"inputCls\"\n\t\t\t\t[ngStyle]=\"inputStyle\"\n\t\t\t\t[(ngModel)]=\"text\"\n\t\t\t\t[placeholder]=\"placeholder\"\n\t\t\t\t(focus)=\"focus()\"\n\t\t\t\t(blur)=\"blur()\">\n\t\t<textarea #input *ngIf=\"multiline\" autocomplete=\"off\" class=\"textbox-text f-full f-order3\"\n\t\t\t\t[class.validatebox-invalid]=\"invalid\"\n\t\t\t\t[attr.id]=\"inputId\"\n\t\t\t\t[attr.disabled]=\"disabled?'disabled':null\"\n\t\t\t\t[attr.readonly]=\"(readonly||!editable)?'readonly':null\"\n\t\t\t\t[attr.tabindex]=\"tabindex\"\n\t\t\t\t[ngClass]=\"inputCls\"\n\t\t\t\t[ngStyle]=\"inputStyle\"\n\t\t\t\t[(ngModel)]=\"text\"\n\t\t\t\t[placeholder]=\"placeholder\"\n\t\t\t\t(focus)=\"focus()\"\n\t\t\t\t(blur)=\"blur()\"></textarea>\n\t\t<ng-content select=\"eui-addon\"></ng-content>\n\t\t<span #addon *ngIf=\"iconCls\" \n\t\t\t\tclass=\"textbox-addon textbox-addon-icon f-inline-row f-noshrink\" \n\t\t\t\t[class.f-order1]=\"iconAlign=='left'\"\n\t\t\t\t[class.f-order5]=\"iconAlign=='right'\">\n\t\t\t<span class=\"textbox-icon textbox-icon-disabled {{iconCls}}\"></span>\n\t\t</span>\n\t\t<span #arrow *ngIf=\"hasDownArrow\" (click)=\"togglePanel()\"\n\t\t\t\tclass=\"textbox-addon f-column f-noshrink\"\n\t\t\t\t[class.f-order0]=\"arrowAlign=='left'\"\n\t\t\t\t[class.f-order6]=\"arrowAlign=='right'\">\n\t\t\t<span class=\"textbox-icon combo-arrow f-full\"></span>\n\t\t</span>\n\t</span>\n\n\t<div #panel *ngIf=\"!panelClosed\" \n\t\t\tclass=\"panel-body panel-body-noheader combo-panel combo-p\"\n\t\t\t[style.left.px]=\"panelLeft\"\n\t\t\t[style.top.px]=\"panelTop\"\n\t\t\t[ngStyle]=\"panelStyle\">\n\t\t<ng-content select=\"eui-tree\"></ng-content>\n\t</div>\n";
var ComboTreeComponent = (function (_super) {
    __extends(ComboTreeComponent, _super);
    function ComboTreeComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.valueField = 'id';
        _this.textField = 'text';
        _this.editable = false;
        _this.mappingTexts = {};
        _this.displayingText = null;
        _this.inputingText = null;
        _this.updatingText = false;
        _this._data = [];
        _this._text = null;
        _this._multiple = null;
        return _this;
    }
    Object.defineProperty(ComboTreeComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            if (value == null) {
                value = [];
            }
            this._data = value;
            if (this.tree) {
                this.tree.data = this._data;
            }
            this.updateText();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComboTreeComponent.prototype, "text", {
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
    Object.defineProperty(ComboTreeComponent.prototype, "multiple", {
        get: function () {
            return this.tree ? this.tree.checkbox : this._multiple;
        },
        set: function (value) {
            this._multiple = value;
            if (this.tree && value != null) {
                this.tree.checkbox = this._multiple;
            }
        },
        enumerable: true,
        configurable: true
    });
    ComboTreeComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.valueChange.subscribe(function () {
            if (!_this.updatingText) {
                _this.updateText();
            }
        });
        if (this.tree) {
            if (this._multiple != null) {
                this.tree.checkbox = this._multiple;
            }
            this.tree.data = this.data;
            this.tree.selectionChange.subscribe(function (node) {
                if (!_this.multiple) {
                    _this.value = node[_this.valueField];
                    _this.closePanel();
                }
            });
            this.tree.checkChange.subscribe(function (nodes) {
                if (_this.multiple && !_this.updatingText) {
                    _this.value = nodes.map(function (node) { return node[_this.valueField]; });
                }
            });
        }
    };
    ComboTreeComponent.prototype.onComboTreeBlur = function () {
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
    ComboTreeComponent.prototype.doFilter = function (value) {
        if (!this.tree) {
            return;
        }
        if (value) {
            if (this.multiple) {
                var tt = value.trim().split(this.separator);
                var val = tt[tt.length - 1];
                this.tree.doFilter(val);
            }
            else {
                this.tree.doFilter(value);
            }
        }
        else {
            this.tree.doFilter('');
        }
    };
    ComboTreeComponent.prototype.openPanel = function () {
        if (this.panelClosed) {
            _super.prototype.openPanel.call(this);
            if (this.editable) {
                this.doFilter('');
            }
        }
    };
    ComboTreeComponent.prototype.updateText = function () {
        var _this = this;
        if (!this.tree) {
            return;
        }
        this.updatingText = true;
        if (this.value == null) {
            this.mappingTexts = {};
            this.displayingText = null;
            this.tree.selection = null;
            if (this.tree.checkbox) {
                this.tree.uncheckAllNodes();
            }
        }
        else {
            var mt_1 = {};
            var tt_1 = [];
            if (this.multiple) {
                this.tree.uncheckAllNodes();
                for (var _i = 0, _a = this.value; _i < _a.length; _i++) {
                    var val = _a[_i];
                    var node = treeHelper.findNode(this.tree.data, this.valueField, val);
                    if (node) {
                        this.tree.checkNode(node);
                    }
                }
                var vv_1 = [];
                this.tree.checkedNodes.forEach(function (node) {
                    vv_1.push(node[_this.valueField]);
                    mt_1[node[_this.valueField]] = node[_this.textField];
                    tt_1.push(node[_this.textField]);
                });
                this.value.filter(function (val) { return vv_1.indexOf(val) == -1; }).forEach(function (val) {
                    vv_1.push(val);
                    mt_1[val] = _this.mappingTexts[val] || val;
                    tt_1.push(mt_1[val]);
                });
                this.value = vv_1;
            }
            else {
                var node = treeHelper.findNode(this.tree.data, this.valueField, this.value);
                if (node) {
                    mt_1[this.value] = node[this.textField];
                    this.tree.selection = node;
                }
                else {
                    mt_1[this.value] = this.mappingTexts[this.value] || this.value;
                }
                tt_1.push(mt_1[this.value]);
            }
            this.mappingTexts = mt_1;
            this.displayingText = tt_1.join(this.separator);
        }
        this.updatingText = false;
    };
    return ComboTreeComponent;
}(ComboBaseComponent));
export { ComboTreeComponent };
ComboTreeComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-combotree',
                template: COMBOTREE_TEMPLATE,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return ComboTreeComponent; }),
                        multi: true
                    }],
                host: {
                    'class': 'f-inline-row'
                }
            },] },
];
/** @nocollapse */
ComboTreeComponent.ctorParameters = function () { return []; };
ComboTreeComponent.propDecorators = {
    'tree': [{ type: ContentChild, args: [TreeComponent,] },],
    'valueField': [{ type: Input },],
    'textField': [{ type: Input },],
    'editable': [{ type: Input },],
    'data': [{ type: Input },],
    'text': [{ type: Input },],
    'multiple': [{ type: Input },],
    'onComboTreeBlur': [{ type: HostListener, args: ['blur',] },],
};
//# sourceMappingURL=combotree.component.js.map