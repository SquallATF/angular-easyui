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
import { Component, ViewChild, ContentChild, Input } from '@angular/core';
import { ListBaseComponent } from '../base/list-base.component';
import { ItemTemplateDirective } from '../base/template-base';
import { domHelper } from '../base/domhelper';
export var DATALIST_TEMPLATE = "\n\t<div class=\"panel-body panel-body-noheader datagrid f-full f-column\" \n\t\t\t[class.panel-body-noborder]=\"!border\">\n\t\t<eui-pagination *ngIf=\"pagination && (pagePosition=='both' || pagePosition=='top')\" class=\"datagrid-pager datagrid-pager-top f-noshrink\" \n\t\t\t\t[total]=\"total\" \n\t\t\t\t[pageSize]=\"pageSize\" \n\t\t\t\t[pageNumber]=\"pageNumber\" \n\t\t\t\t[loading]=\"loading\"\n\t\t\t\t(pageChange)=\"onPageChange($event)\"></eui-pagination>\n\t\t<div #inner class=\"f-full\" [class.f-column]=\"virtualScroll\" [style.overflow]=\"virtualScroll ? 'hidden' : 'auto'\">\n\t\t\t<ng-container *ngIf=\"!virtualScroll\">\n\t\t\t\t<div *ngFor=\"let row of rows;let rowIndex=index\"\n\t\t\t\t\t\t[ngStyle]=\"itemStyle\"\n\t\t\t\t\t\t[ngClass]=\"getItemClass(row)\"\n\t\t\t\t\t\t(mouseenter)=\"highlightRow=row\"\n\t\t\t\t\t\t(mouseleave)=\"highlightRow=null\"\n\t\t\t\t\t\t(click)=\"onRowClick(row,$event)\">\n\t\t\t\t\t<ng-template [euiDataListItemTemplate]=\"itemTemplate.template\" [row]=\"row\" [rowIndex]=\"getRowIndex(rowIndex)\"></ng-template>\n\t\t\t\t</div>\n\t\t\t</ng-container>\n\t\t\t<ng-container *ngIf=\"virtualScroll\">\n\t\t\t\t<eui-virtual-scroll #vscroll class=\"f-full\"\n\t\t\t\t\t\t[data]=\"rows\" \n\t\t\t\t\t\t[total]=\"total\" \n\t\t\t\t\t\t[pageNumber]=\"pageNumber\"\n\t\t\t\t\t\t[pageSize]=\"pageSize\" \n\t\t\t\t\t\t[rowHeight]=\"rowHeight\" \n\t\t\t\t\t\t[lazy]=\"lazy\"\n\t\t\t\t\t\t(update)=\"rows1 = $event\"\n\t\t\t\t\t\t(pageChange)=\"onVirtualPageChange($event)\">\n\t\t\t\t\t<div *ngFor=\"let row of rows1;let rowIndex=index\"\n\t\t\t\t\t\t\t[style.height.px]=\"rowHeight\"\n\t\t\t\t\t\t\t[ngStyle]=\"itemStyle\"\n\t\t\t\t\t\t\t[ngClass]=\"getItemClass(row)\"\n\t\t\t\t\t\t\t(mouseenter)=\"highlightRow=row\"\n\t\t\t\t\t\t\t(mouseleave)=\"highlightRow=null\"\n\t\t\t\t\t\t\t(click)=\"onRowClick(row,$event)\">\n\t\t\t\t\t\t<ng-template [euiDataListItemTemplate]=\"itemTemplate.template\" [row]=\"row\" [rowIndex]=\"getRowIndex(rowIndex)\"></ng-template>\n\t\t\t\t\t</div>\n\t\t\t\t</eui-virtual-scroll>\n\t\t\t</ng-container>\n\t\t</div>\n\t\t<eui-pagination *ngIf=\"pagination && (pagePosition=='both' || pagePosition=='bottom')\" class=\"datagrid-pager f-noshrink\" \n\t\t\t\t[total]=\"total\" \n\t\t\t\t[pageSize]=\"pageSize\" \n\t\t\t\t[pageNumber]=\"pageNumber\" \n\t\t\t\t[loading]=\"loading\"\n\t\t\t\t(pageChange)=\"onPageChange($event)\"></eui-pagination>\n\t</div>\n\t<div *ngIf=\"loading\" class=\"datagrid-loading f-row\">\n\t\t<div class=\"datagrid-mask\"></div>\n\t\t<div class=\"datagrid-mask-msg\">{{loadMsg}}</div>\n\t</div>\n";
var DataListComponent = (function (_super) {
    __extends(DataListComponent, _super);
    function DataListComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.itemStyle = null;
        _this.itemCls = null;
        _this.hoverCls = 'datagrid-row-over';
        _this.selectedCls = 'datagrid-row-selected';
        return _this;
    }
    DataListComponent.prototype.getItemClass = function (row) {
        var cc = [];
        if (this.itemCls) {
            cc.push(this.itemCls);
        }
        if (this.hoverCls && this.highlightRow == row) {
            cc.push(this.hoverCls);
        }
        if (this.selectedCls && this.isSelected(row)) {
            cc.push(this.selectedCls);
        }
        return cc.length ? cc.join(' ') : null;
    };
    DataListComponent.prototype.getRowIndex = function (index) {
        if (this.vscroll) {
            return index + this.vscroll.startIndex;
        }
        else if (this.pagination) {
            return index + (this.pageNumber - 1) * this.pageSize;
        }
        else {
            return index;
        }
    };
    Object.defineProperty(DataListComponent.prototype, "scrollTop", {
        get: function () {
            if (this.vscroll) {
                return this.vscroll.bodyRef.nativeElement.scrollTop;
            }
            else {
                return this.innerRef.nativeElement.scrollTop;
            }
        },
        set: function (value) {
            if (this.vscroll) {
                this.vscroll.bodyRef.nativeElement.scrollTop = value;
            }
            else {
                this.innerRef.nativeElement.scrollTop = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    DataListComponent.prototype.navRow = function (step) {
        var _this = this;
        _super.prototype.navRow.call(this, step);
        var index = this.rows.indexOf(this.highlightRow);
        if (index >= 0) {
            setTimeout(function () {
                var container = _this.vscroll ? _this.vscroll.bodyRef.nativeElement : _this.innerRef.nativeElement;
                var item = container.querySelector('.' + _this.hoverCls);
                if (item) {
                    domHelper.scrollTo(container, item);
                }
            });
        }
    };
    DataListComponent.prototype.highlightFirstRow = function () {
        this.highlightRow = this.rows.length ? this.rows[0] : null;
        this.navRow(0);
    };
    DataListComponent.prototype.scrollToSelectedRow = function () {
        var container = this.vscroll ? this.vscroll.bodyRef.nativeElement : this.innerRef.nativeElement;
        var item = container.querySelector('.' + this.selectedCls);
        if (item) {
            domHelper.scrollTo(container, item);
        }
    };
    return DataListComponent;
}(ListBaseComponent));
export { DataListComponent };
DataListComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-datalist',
                template: DATALIST_TEMPLATE,
                host: {
                    'class': 'f-column'
                }
            },] },
];
/** @nocollapse */
DataListComponent.ctorParameters = function () { return []; };
DataListComponent.propDecorators = {
    'vscroll': [{ type: ViewChild, args: ['vscroll',] },],
    'innerRef': [{ type: ViewChild, args: ['inner',] },],
    'itemTemplate': [{ type: ContentChild, args: [ItemTemplateDirective,] },],
    'itemStyle': [{ type: Input },],
    'itemCls': [{ type: Input },],
    'hoverCls': [{ type: Input },],
    'selectedCls': [{ type: Input },],
};
//# sourceMappingURL=datalist.component.js.map