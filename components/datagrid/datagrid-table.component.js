/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Component, forwardRef, ViewChild, Input, Host, Inject } from '@angular/core';
import { DataGridBodyComponent } from './datagrid-body.component';
import { domHelper } from '../base/domhelper';
var DataGridTableComponent = (function () {
    function DataGridTableComponent(gridBody) {
        this.gridBody = gridBody;
        this.grid = gridBody.view.grid;
    }
    Object.defineProperty(DataGridTableComponent.prototype, "showExpandIcon", {
        get: function () {
            if (this.grid.leftColumns) {
                if (this.gridBody.view.viewIndex == 1) {
                    return true;
                }
            }
            else if (this.gridBody.view.viewIndex == 2) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataGridTableComponent.prototype, "groupTitleWidth", {
        get: function () {
            return domHelper.outerWidth(this.groupTitleRef.nativeElement);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataGridTableComponent.prototype, "titleLeft", {
        get: function () {
            if (this.gridBody.view.viewIndex == 2) {
                if (this.grid.leftColumns) {
                    if (this.grid.view1) {
                        var width = domHelper.outerWidth(this.grid.view1.body.bodyRef.nativeElement);
                        return width - this.grid.expanderWidth;
                    }
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    DataGridTableComponent.prototype.onRowClick = function (row, event) {
        this.grid.rowClick.emit(row);
        if (this.grid.selectionMode == 'single') {
            this.grid.selectRow(row);
        }
        else if (this.grid.selectionMode == 'multiple') {
            if (this.grid.isSelected(row)) {
                this.grid.unselectRow(row);
            }
            else {
                this.grid.selectRow(row);
            }
        }
    };
    DataGridTableComponent.prototype.onGroupExpanderClick = function (value, event) {
        event.stopPropagation();
        this.grid.toggleGroup(value);
    };
    DataGridTableComponent.prototype.onDetailExpanderClick = function (row, event) {
        event.stopPropagation();
        this.grid.toggleRow(row);
    };
    DataGridTableComponent.prototype.getRowIndex = function (rowIndex) {
        return this.grid.getAbsoluteIndex(rowIndex);
    };
    DataGridTableComponent.prototype.getCss = function (css, row, value, type) {
        if (css) {
            var cssValue = typeof css == 'function' ? css(row, value) : css;
            if (type == 'class') {
                return typeof cssValue == 'string' ? cssValue : null;
            }
            else {
                return typeof cssValue == 'object' ? cssValue : null;
            }
        }
        return null;
    };
    DataGridTableComponent.prototype.getRowClass = function (row) {
        return this.getCss(this.grid.rowCss, row, null, 'class');
    };
    DataGridTableComponent.prototype.getRowStyle = function (row) {
        return this.getCss(this.grid.rowCss, row, null, 'style');
    };
    DataGridTableComponent.prototype.getCellClass = function (column, row) {
        return this.getCss(column.cellCss, row, row[column.field], 'class');
    };
    DataGridTableComponent.prototype.getCellStyle = function (column, row) {
        return this.getCss(column.cellCss, row, row[column.field], 'style');
    };
    return DataGridTableComponent;
}());
export { DataGridTableComponent };
DataGridTableComponent.decorators = [
    { type: Component, args: [{
                selector: '[euiDataGridTable]',
                template: "\n\t\t<colgroup>\n\t\t\t<col *ngFor=\"let col of columns\" [style.width]=\"col.width\">\n\t\t</colgroup>\n\t\t<tbody>\n\t\t\t<ng-container *ngFor=\"let row of rows;let rowIndex=index\">\n\t\t\t<tr *ngIf=\"grid.isGroupRow(row)\" class=\"datagrid-row datagrid-group-row\"\n\t\t\t\t\t[ngClass]=\"grid.groupTemplate && grid.groupTemplate.groupCls\"\n\t\t\t\t\t[ngStyle]=\"grid.groupTemplate && grid.groupTemplate.groupStyle\">\n\t\t\t\t<td class=\"datagrid-td-group\" [attr.colspan]=\"columns.length\">\n\t\t\t\t\t<div class=\"datagrid-group f-row\">\n\t\t\t\t\t\t<span *ngIf=\"showExpandIcon\" \n\t\t\t\t\t\t\t\tclass=\"datagrid-group-expander f-row f-content-center f-noshrink\" \n\t\t\t\t\t\t\t\t[style.width.px]=\"grid.expanderWidth\"\n\t\t\t\t\t\t\t\t(click)=\"onGroupExpanderClick(row.value, $event)\">\n\t\t\t\t\t\t\t<span class=\"datagrid-row-expander\"\n\t\t\t\t\t\t\t\t\t[class.datagrid-row-expand]=\"row.collapsed\"\n\t\t\t\t\t\t\t\t\t[class.datagrid-row-collapse]=\"!row.collapsed\">\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<div #groupTitle class=\"datagrid-group-title\" [style.left.px]=\"-titleLeft\">\n\t\t\t\t\t\t\t<span *ngIf=\"!grid.groupTemplate\">{{row.value}}</span>\n\t\t\t\t\t\t\t<ng-template *ngIf=\"grid.groupTemplate\" [euiDataGridGroupTemplate]=\"grid.groupTemplate.template\" [value]=\"row.value\" [rows]=\"row.rows\"></ng-template>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t<tr *ngIf=\"!grid.isGroupRow(row)\" class=\"datagrid-row\"\n\t\t\t\t\t[ngClass]=\"getRowClass(row)\"\n\t\t\t\t\t[ngStyle]=\"getRowStyle(row)\"\n\t\t\t\t\t[class.datagrid-row-over]=\"row==grid.highlightRow\"\n\t\t\t\t\t[class.datagrid-row-selected]=\"grid.isSelected(row)\"\n\t\t\t\t\t(mouseenter)=\"grid.highlightRow=row\"\n\t\t\t\t\t(mouseleave)=\"grid.highlightRow=null\"\n\t\t\t\t\t(click)=\"onRowClick(row,$event)\">\n\t\t\t\t<ng-container *ngFor=\"let col of columns\">\n\t\t\t\t<td *ngIf=\"col.expander\" class=\"datagrid-td-expander\">\n\t\t\t\t\t<div class=\"datagrid-cell f-row f-content-center\">\n\t\t\t\t\t\t<span class=\"datagrid-row-expander\" (click)=\"onDetailExpanderClick(row, $event)\"\n\t\t\t\t\t\t\t\t[class.datagrid-row-collapse]=\"grid.isRowExpanded(row)\"\n\t\t\t\t\t\t\t\t[class.datagrid-row-expand]=\"!grid.isRowExpanded(row)\">\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t</td>\n\t\t\t\t<td *ngIf=\"!col.expander\"\n\t\t\t\t\t\t[ngClass]=\"getCellClass(col,row)\"\n\t\t\t\t\t\t[ngStyle]=\"getCellStyle(col,row)\">\n\t\t\t\t\t<div class=\"datagrid-cell\" [style.textAlign]=\"col.align || null\">\n\t\t\t\t\t\t<ng-container *ngIf=\"!col.cellTemplate\">{{row[col.field]}}</ng-container>\n\t\t\t\t\t\t<ng-template *ngIf=\"col.cellTemplate\" [euiGridCellTemplate]=\"col.cellTemplate.template\" [row]=\"row\" [rowIndex]=\"getRowIndex(rowIndex)\" [column]=\"col\"></ng-template>\n\t\t\t\t\t</div>\n\t\t\t\t</td>\n\t\t\t\t</ng-container>\n\t\t\t</tr>\n\t\t\t<tr *ngIf=\"grid.detailTemplate && grid.isRowExpanded(row) && !grid.isGroupRow(row)\">\n\t\t\t\t<td [attr.colspan]=\"columns.length\">\n\t\t\t\t\t<div class=\"datagrid-row-detail\" [style.height.px]=\"grid.detailTemplate.height\">\n\t\t\t\t\t\t<ng-template *ngIf=\"gridBody.view.viewIndex==2\" [euiDataGridDetailTemplate]=\"grid.detailTemplate.template\" [row]=\"row\" [rowIndex]=\"getRowIndex(rowIndex)\"></ng-template>\n\t\t\t\t\t</div>\n\t\t\t\t</td>\n\t\t\t</tr>\n\t\t\t</ng-container>\n\t\t</tbody>\n\t"
            },] },
];
/** @nocollapse */
DataGridTableComponent.ctorParameters = function () { return [
    { type: DataGridBodyComponent, decorators: [{ type: Host }, { type: Inject, args: [forwardRef(function () { return DataGridBodyComponent; }),] },] },
]; };
DataGridTableComponent.propDecorators = {
    'groupTitleRef': [{ type: ViewChild, args: ['groupTitle',] },],
    'columns': [{ type: Input },],
    'rows': [{ type: Input },],
};
//# sourceMappingURL=datagrid-table.component.js.map