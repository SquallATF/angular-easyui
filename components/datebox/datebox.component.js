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
import { CellTemplateDirective } from '../base/template-base';
import { dateHelper } from '../base/datehelper';
export var DATEBOX_TEMPLATE = "\n\t<span class=\"textbox f-inline-row f-full\" \n\t\t\t[ngClass]=\"cls\"\n\t\t\t[class.textbox-disabled]=\"disabled\"\n\t\t\t[class.textbox-readonly]=\"readonly\"\n\t\t\t[class.textbox-focused]=\"focused\"\n\t\t\t[class.textbox-invalid]=\"invalid\">\n\t\t<input #input *ngIf=\"!multiline\" autocomplete=\"off\" class=\"textbox-text f-full f-order3\"\n\t\t\t\t[class.validatebox-invalid]=\"invalid\"\n\t\t\t\t[attr.id]=\"inputId\"\n\t\t\t\t[attr.disabled]=\"disabled?'disabled':null\"\n\t\t\t\t[attr.readonly]=\"(readonly||!editable)?'readonly':null\"\n\t\t\t\t[attr.tabindex]=\"tabindex\"\n\t\t\t\t[ngClass]=\"inputCls\"\n\t\t\t\t[ngStyle]=\"inputStyle\"\n\t\t\t\t[(ngModel)]=\"text\"\n\t\t\t\t[placeholder]=\"placeholder\"\n\t\t\t\t(focus)=\"focus()\"\n\t\t\t\t(blur)=\"blur()\">\n\t\t<textarea #input *ngIf=\"multiline\" autocomplete=\"off\" class=\"textbox-text f-full f-order3\"\n\t\t\t\t[class.validatebox-invalid]=\"invalid\"\n\t\t\t\t[attr.id]=\"inputId\"\n\t\t\t\t[attr.disabled]=\"disabled?'disabled':null\"\n\t\t\t\t[attr.readonly]=\"(readonly||!editable)?'readonly':null\"\n\t\t\t\t[attr.tabindex]=\"tabindex\"\n\t\t\t\t[ngClass]=\"inputCls\"\n\t\t\t\t[ngStyle]=\"inputStyle\"\n\t\t\t\t[(ngModel)]=\"text\"\n\t\t\t\t[placeholder]=\"placeholder\"\n\t\t\t\t(focus)=\"focus()\"\n\t\t\t\t(blur)=\"blur()\"></textarea>\n\t\t<ng-content select=\"eui-addon\"></ng-content>\n\t\t<span #addon *ngIf=\"iconCls\" \n\t\t\t\tclass=\"textbox-addon textbox-addon-icon f-inline-row f-noshrink\" \n\t\t\t\t[class.f-order1]=\"iconAlign=='left'\"\n\t\t\t\t[class.f-order5]=\"iconAlign=='right'\">\n\t\t\t<span class=\"textbox-icon textbox-icon-disabled {{iconCls}}\"></span>\n\t\t</span>\n\t\t<span #arrow *ngIf=\"hasDownArrow\" (click)=\"togglePanel()\"\n\t\t\t\tclass=\"textbox-addon f-column f-noshrink\"\n\t\t\t\t[class.f-order0]=\"arrowAlign=='left'\"\n\t\t\t\t[class.f-order6]=\"arrowAlign=='right'\">\n\t\t\t<span class=\"textbox-icon combo-arrow f-full\"></span>\n\t\t</span>\n\t</span>\n\n\t<div #panel *ngIf=\"!panelClosed\" \n\t\t\tclass=\"panel-body panel-body-noheader combo-panel combo-p f-column\"\n\t\t\t[style.left.px]=\"panelLeft\"\n\t\t\t[style.top.px]=\"panelTop\"\n\t\t\t[ngStyle]=\"panelStyle\">\n\t\t<eui-calendar #calendar class=\"f-full\" [border]=\"false\"\n\t\t\t\t[(selection)]=\"selection\"\n\t\t\t\t(selectionChange)=\"onSelectionChange($event)\">\n\t\t\t<ng-template euiCellTemplate let-date>\n\t\t\t\t<ng-container *ngIf=\"!cellTemplate\">{{date.getDate()}}</ng-container>\n\t\t\t\t<ng-template *ngIf=\"cellTemplate\" [euiDateBoxCellTemplate]=\"cellTemplate.template\" [date]=\"date\"></ng-template>\n\t\t\t</ng-template>\n\t\t</eui-calendar>\n\t\t<div class=\"datebox-button f-row\">\n\t\t\t<a href=\"javascript:;\" class=\"datebox-button-a f-full\" (click)=\"selectToday()\">Today</a>\n\t\t\t<a href=\"javascript:;\" class=\"datebox-button-a f-full\" (click)=\"closePanel()\">Close</a>\n\t\t</div>\n\t</div>\n";
var DateBoxComponent = (function (_super) {
    __extends(DateBoxComponent, _super);
    function DateBoxComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.format = 'MM/dd/yyyy';
        _this.formatter = _this.defaultFormatter;
        _this.parser = _this.defaultParser;
        _this.selectionChange = new EventEmitter();
        _this.cls = 'datebox';
        _this.inputingText = null;
        _this._text = null;
        return _this;
    }
    Object.defineProperty(DateBoxComponent.prototype, "text", {
        get: function () {
            if (!this.focused && this.panelClosed) {
                this._text = this.formatter(this.value);
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
    DateBoxComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.valueChange.subscribe(function () {
            _this.selection = _this.value;
        });
    };
    DateBoxComponent.prototype.onKeyDown = function (event) {
        if (this.panelClosed && event.which == 40) {
            this.openPanel();
            event.preventDefault();
            return;
        }
        if (this.panelClosed) {
            return;
        }
        switch (event.which) {
            case 40:
                this.calendar.navDate(7);
                event.preventDefault();
                break;
            case 38:
                this.calendar.navDate(-7);
                event.preventDefault();
                break;
            case 37:
                this.calendar.navDate(-1);
                event.preventDefault();
                break;
            case 39:
                this.calendar.navDate(1);
                event.preventDefault();
                break;
            case 13:
                this.calendar.selectDate();
                this.closePanel();
                this._text = this.formatter(this.value);
                event.preventDefault();
                break;
        }
    };
    DateBoxComponent.prototype.onDateBoxBlur = function () {
        if (this.panelClosed) {
            return;
        }
        if (this.inputingText == null) {
            return;
        }
        if (!this.inputingText.trim()) {
            this.value = null;
        }
        this.inputingText = null;
    };
    DateBoxComponent.prototype.onSelectionChange = function (event) {
        this.inputingText = null;
        this.value = event;
        this.selectionChange.emit(event);
    };
    DateBoxComponent.prototype.doFilter = function (value) {
        var date = this.parser(value);
        if (!date) {
            date = this.selection;
        }
        this.calendar.moveTo(date);
        this.calendar.highlightDate(date);
    };
    DateBoxComponent.prototype.defaultFormatter = function (date) {
        return dateHelper.formatDate(date, this.format);
    };
    DateBoxComponent.prototype.defaultParser = function (value) {
        return dateHelper.parseDate(value, this.format);
    };
    DateBoxComponent.prototype.openPanel = function () {
        if (this.panelClosed) {
            _super.prototype.openPanel.call(this);
            this.selection = this.value;
            this.calendar.moveTo(this.selection);
        }
    };
    DateBoxComponent.prototype.selectToday = function () {
        this.value = new Date();
        this.closePanel();
    };
    return DateBoxComponent;
}(ComboBaseComponent));
export { DateBoxComponent };
DateBoxComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-datebox',
                template: DATEBOX_TEMPLATE,
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return DateBoxComponent; }),
                        multi: true
                    }],
                host: {
                    'class': 'f-inline-row'
                }
            },] },
];
/** @nocollapse */
DateBoxComponent.ctorParameters = function () { return []; };
DateBoxComponent.propDecorators = {
    'calendar': [{ type: ViewChild, args: ['calendar',] },],
    'cellTemplate': [{ type: ContentChild, args: [CellTemplateDirective,] },],
    'selection': [{ type: Input },],
    'format': [{ type: Input },],
    'formatter': [{ type: Input },],
    'parser': [{ type: Input },],
    'selectionChange': [{ type: Output },],
    'text': [{ type: Input },],
    'onKeyDown': [{ type: HostListener, args: ['keydown', ['$event'],] },],
    'onDateBoxBlur': [{ type: HostListener, args: ['blur',] },],
};
//# sourceMappingURL=datebox.component.js.map