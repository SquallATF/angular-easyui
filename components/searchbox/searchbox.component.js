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
import { Component, forwardRef, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBaseComponent } from '../base/input-base.component';
export var SEARCHBOX_TEMPLATE = "\n\t<span class=\"textbox f-inline-row f-full\" \n\t\t\t[ngClass]=\"cls\"\n\t\t\t[class.textbox-disabled]=\"disabled\"\n\t\t\t[class.textbox-readonly]=\"readonly\"\n\t\t\t[class.textbox-focused]=\"focused\"\n\t\t\t[class.textbox-invalid]=\"invalid\">\n\t\t<input #input *ngIf=\"!multiline\" autocomplete=\"off\" class=\"textbox-text f-full f-order3\"\n\t\t\t\t[class.validatebox-invalid]=\"invalid\"\n\t\t\t\t[attr.id]=\"inputId\"\n\t\t\t\t[attr.disabled]=\"disabled?'disabled':null\"\n\t\t\t\t[attr.readonly]=\"(readonly||!editable)?'readonly':null\"\n\t\t\t\t[attr.tabindex]=\"tabindex\"\n\t\t\t\t[ngClass]=\"inputCls\"\n\t\t\t\t[ngStyle]=\"inputStyle\"\n\t\t\t\t[(ngModel)]=\"text\"\n\t\t\t\t[placeholder]=\"placeholder\"\n\t\t\t\t(focus)=\"focus()\"\n\t\t\t\t(blur)=\"blur()\">\n\t\t<textarea #input *ngIf=\"multiline\" autocomplete=\"off\" class=\"textbox-text f-full f-order3\"\n\t\t\t\t[class.validatebox-invalid]=\"invalid\"\n\t\t\t\t[attr.id]=\"inputId\"\n\t\t\t\t[attr.disabled]=\"disabled?'disabled':null\"\n\t\t\t\t[attr.readonly]=\"(readonly||!editable)?'readonly':null\"\n\t\t\t\t[attr.tabindex]=\"tabindex\"\n\t\t\t\t[ngClass]=\"inputCls\"\n\t\t\t\t[ngStyle]=\"inputStyle\"\n\t\t\t\t[(ngModel)]=\"text\"\n\t\t\t\t[placeholder]=\"placeholder\"\n\t\t\t\t(focus)=\"focus()\"\n\t\t\t\t(blur)=\"blur()\"></textarea>\n\t\t<input class=\"textbox-value\" type=\"hidden\" [value]=\"value\" [attr.disabled]=\"disabled?'disabled':null\">\n\t\t<ng-content select=\"eui-addon\"></ng-content>\n\t\t<span *ngIf=\"iconCls\" \n\t\t\t\tclass=\"textbox-addon textbox-addon-icon f-inline-row f-noshrink\" \n\t\t\t\t[class.f-order1]=\"iconAlign=='left'\"\n\t\t\t\t[class.f-order5]=\"iconAlign=='right'\">\n\t\t\t<span class=\"textbox-icon textbox-icon-disabled {{iconCls}}\"></span>\n\t\t</span>\n\t\t<eui-menubutton *ngIf=\"menu\"  class=\"f-noshrink\"\n\t\t\t\t[class.f-order0]=\"menuAlign=='left'\"\n\t\t\t\t[class.f-order7]=\"menuAlign=='right'\"\n\t\t\t\t[text]=\"menuBtnText\"\n\t\t\t\t[iconCls]=\"menuBtnIcon\"\n\t\t\t\t[menu]=\"menu\" \n\t\t\t\t[disabled]=\"disabled\"\n\t\t\t\t[btnCls]=\"menuBtnCls\"></eui-menubutton>\n\t\t<span class=\"textbox-addon f-column f-noshrink\"\n\t\t\t\t[class.f-order0]=\"buttonAlign=='left'\"\n\t\t\t\t[class.f-order6]=\"buttonAlign=='right'\"\n\t\t\t\t(click)=\"doSearch()\">\n\t\t\t<span class=\"textbox-icon f-full\" [ngClass]=\"buttonIconCls\"></span>\n\t\t</span>\n\t</span>\n";
var SearchBoxComponent = (function (_super) {
    __extends(SearchBoxComponent, _super);
    function SearchBoxComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.menuAlign = 'left';
        _this.buttonAlign = 'right';
        _this.buttonIconCls = 'icon-search';
        _this.search = new EventEmitter();
        _this.cls = 'searchbox';
        _this.menuBtnText = null;
        _this.menuBtnIcon = null;
        return _this;
    }
    Object.defineProperty(SearchBoxComponent.prototype, "text", {
        get: function () {
            return this._focused ? this.value : this.textFormatter(this.value);
        },
        set: function (v) {
            this.value = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SearchBoxComponent.prototype, "menuBtnCls", {
        get: function () {
            return 'textbox-button textbox-button-' + this.menuAlign;
        },
        enumerable: true,
        configurable: true
    });
    SearchBoxComponent.prototype.ngAfterViewInit = function () {
        this.initMenu();
    };
    SearchBoxComponent.prototype.onKeyDown = function (event) {
        if (event.which == 13) {
            event.stopPropagation();
            event.preventDefault();
            this.doSearch();
        }
    };
    SearchBoxComponent.prototype.doSearch = function () {
        if (this.disabled || this.readonly) {
            return;
        }
        this.search.emit({
            value: this.value,
            category: this.category
        });
    };
    SearchBoxComponent.prototype.initMenu = function () {
        var _this = this;
        if (this.menu) {
            this.setCategory(this.category);
            this.menu.itemClick.subscribe(function (value) {
                if (!_this.disabled && !_this.readonly) {
                    _this.setCategory(value);
                }
            });
        }
    };
    SearchBoxComponent.prototype.setCategory = function (value) {
        var item = this.menu.findItem(value);
        if (!item) {
            item = this.menu.subItems.first;
        }
        this.category = item.value || item.text;
        this.menuBtnText = item.text;
        this.menuBtnIcon = item.iconCls;
    };
    return SearchBoxComponent;
}(InputBaseComponent));
export { SearchBoxComponent };
SearchBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-searchbox',
                template: SEARCHBOX_TEMPLATE,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return SearchBoxComponent; }),
                        multi: true
                    }],
                host: {
                    '[class.f-inline-row]': 'true'
                }
            },] },
];
/** @nocollapse */
SearchBoxComponent.ctorParameters = function () { return []; };
SearchBoxComponent.propDecorators = {
    'menu': [{ type: Input },],
    'menuAlign': [{ type: Input },],
    'category': [{ type: Input },],
    'buttonAlign': [{ type: Input },],
    'buttonIconCls': [{ type: Input },],
    'search': [{ type: Output },],
    'text': [{ type: Input },],
    'onKeyDown': [{ type: HostListener, args: ['keydown', ['$event'],] },],
};
//# sourceMappingURL=searchbox.component.js.map