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
import { Component, ViewChild, Input, Output, Inject, Host, forwardRef, EventEmitter } from '@angular/core';
import { GridBodyComponent } from '../gridbase/grid-body.component';
import { DataGridViewComponent } from './datagrid-view.component';
import { domHelper } from '../base/domhelper';
export var DATAGRID_BODY_TEMPLATE = "\n\t<div #body class=\"datagrid-body f-full\" style=\"margin-top:0\"\n\t\t\t[ngClass]=\"{'datagrid-vbody f-column':isVirtualScroll}\"\n\t\t\t(scroll)=\"onScroll($event)\">\n\t\t<div #inner class=\"datagrid-body-inner\"\n\t\t\t\t[style.marginTop.px]=\"marginTop\"\n\t\t\t\t[ngClass]=\"{'f-column f-full':isVirtualScroll}\">\n\t\t\t<ng-container *ngIf=\"!isVirtualScroll\">\n\t\t\t\t<table class=\"datagrid-btable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"\n\t\t\t\t\t\teuiDataGridTable [columns]=\"columns\" [rows]=\"currRows\">\n\t\t\t\t</table>\n\t\t\t</ng-container>\n\t\t\t<ng-container *ngIf=\"isVirtualScroll\">\n\t\t\t\t<eui-virtual-scroll #vscroll \n\t\t\t\t\t\t[data]=\"rows\" \n\t\t\t\t\t\t[total]=\"view.grid.total\" \n\t\t\t\t\t\t[pageSize]=\"view.grid.pageSize\" \n\t\t\t\t\t\t[rowHeight]=\"view.grid.rowHeight\" \n\t\t\t\t\t\t[lazy]=\"view.grid.lazy\"\n\t\t\t\t\t\t[pageNumber]=\"view.grid.pageNumber\"\n\t\t\t\t\t\t(update)=\"onVirtualPageUpdate($event)\"\n\t\t\t\t\t\t(bodyScroll)=\"onVirtualScroll($event)\"\n\t\t\t\t\t\t(pageChange)=\"onVirtualPageChange($event)\">\n\t\t\t\t<table class=\"datagrid-btable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\"\n\t\t\t\t\t\teuiDataGridTable [columns]=\"columns\" [rows]=\"currRows\">\n\t\t\t\t</table>\n\t\t\t\t</eui-virtual-scroll>\n\t\t\t</ng-container>\n\t\t</div>\n\t</div>\n";
var DataGridBodyComponent = (function (_super) {
    __extends(DataGridBodyComponent, _super);
    function DataGridBodyComponent(view) {
        var _this = _super.call(this) || this;
        _this.view = view;
        _this.virtualPageChange = new EventEmitter();
        _this.virtualPageUpdate = new EventEmitter();
        _this.marginTop = 0;
        _this.currRows = [];
        _this._rows = [];
        return _this;
    }
    Object.defineProperty(DataGridBodyComponent.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        set: function (value) {
            this._rows = value || [];
            this.currRows = this._rows;
            if (this.view.grid.virtualScroll && this.view.viewIndex != 2) {
                this.currRows = this._rows.slice(0, this.view.grid.pageSize * 2);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataGridBodyComponent.prototype, "isVirtualScroll", {
        get: function () {
            if (this.view.grid.virtualScroll && this.view.viewIndex == 2) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataGridBodyComponent.prototype, "scrollTop", {
        get: function () {
            if (this.isVirtualScroll) {
                return this.vscroll.scrollTop;
            }
            else {
                return this.bodyRef.nativeElement.scrollTop;
            }
        },
        set: function (value) {
            if (!this.isVirtualScroll) {
                this.marginTop = -value;
            }
        },
        enumerable: true,
        configurable: true
    });
    DataGridBodyComponent.prototype.onVirtualScroll = function (event) {
        this.bodyScroll.emit(event);
    };
    DataGridBodyComponent.prototype.onVirtualPageChange = function (event) {
        this.view.grid.pageChange.emit(event);
    };
    DataGridBodyComponent.prototype.onVirtualPageUpdate = function (event) {
        this.currRows = event;
        this.view.grid.updateFrozenView(this.vscroll ? this.vscroll.scrollTop : 0, this.currRows);
    };
    Object.defineProperty(DataGridBodyComponent.prototype, "scrollbarWidth", {
        get: function () {
            if (this.vscroll) {
                return this.vscroll.scrollbarWidth;
            }
            else {
                return domHelper.outerWidth(this.bodyRef.nativeElement) - domHelper.outerWidth(this.innerRef.nativeElement);
            }
        },
        enumerable: true,
        configurable: true
    });
    return DataGridBodyComponent;
}(GridBodyComponent));
export { DataGridBodyComponent };
DataGridBodyComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-datagrid-body',
                template: DATAGRID_BODY_TEMPLATE,
                host: {
                    'class': 'f-column f-full'
                }
            },] },
];
/** @nocollapse */
DataGridBodyComponent.ctorParameters = function () { return [
    { type: DataGridViewComponent, decorators: [{ type: Host }, { type: Inject, args: [forwardRef(function () { return DataGridViewComponent; }),] },] },
]; };
DataGridBodyComponent.propDecorators = {
    'vscroll': [{ type: ViewChild, args: ['vscroll',] },],
    'virtualPageChange': [{ type: Output },],
    'virtualPageUpdate': [{ type: Output },],
    'rows': [{ type: Input },],
};
//# sourceMappingURL=datagrid-body.component.js.map