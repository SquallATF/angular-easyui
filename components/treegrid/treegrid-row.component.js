/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Component, forwardRef, Input, Inject } from '@angular/core';
import { TreeGridBodyComponent } from './treegrid-body.component';
var TreeGridRowComponent = (function () {
    function TreeGridRowComponent(gridBody) {
        this.gridBody = gridBody;
        this.depth = 0;
        this.rowIndex = 0;
        this.loading = false;
        this.grid = this.gridBody.view.grid;
    }
    Object.defineProperty(TreeGridRowComponent.prototype, "indentWidth", {
        get: function () {
            if (this.isLeaf()) {
                return (this.depth + 1) * 16;
            }
            else {
                return this.depth * 16;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeGridRowComponent.prototype, "checkboxClass", {
        get: function () {
            var cc = ['unchecked', 'checked', 'indeterminate'];
            var index = cc.indexOf(this.row.checkState);
            if (index == -1) {
                index = 0;
            }
            return 'tree-checkbox' + index;
        },
        enumerable: true,
        configurable: true
    });
    TreeGridRowComponent.prototype.isTreeField = function (field) {
        return field == this.gridBody.view.grid.treeField;
    };
    TreeGridRowComponent.prototype.isExpanded = function () {
        if (!this.row.state || this.row.state == 'open') {
            return true;
        }
        else {
            return false;
        }
    };
    TreeGridRowComponent.prototype.isCollapsed = function () {
        if (this.row.state && this.row.state == 'closed') {
            return true;
        }
        else {
            return false;
        }
    };
    TreeGridRowComponent.prototype.isLeaf = function () {
        if (this.row.state == 'closed') {
            return false;
        }
        else {
            if (this.row.children && this.row.children.length) {
                this.loading = false;
                return false;
            }
            else {
                if (this.loading) {
                    return false;
                }
                return true;
            }
        }
    };
    TreeGridRowComponent.prototype.ngOnInit = function () {
        this.row.parent = this.prow;
    };
    TreeGridRowComponent.prototype.toggle = function (event) {
        event.stopPropagation();
        if (this.isExpanded()) {
            this.row.state = 'closed';
            this.grid.rowCollapse.emit(this.row);
        }
        else {
            this.loading = true;
            this.row.state = 'open';
            this.grid.rowExpand.emit(this.row);
        }
        this.grid.cdRef.detectChanges();
    };
    TreeGridRowComponent.prototype.onCheckRow = function (event) {
        event.stopPropagation();
        if (this.row.checkState == 'checked') {
            this.grid.uncheckRow(this.row);
        }
        else {
            this.grid.checkRow(this.row);
        }
    };
    return TreeGridRowComponent;
}());
export { TreeGridRowComponent };
TreeGridRowComponent.decorators = [
    { type: Component, args: [{
                selector: '[euiTreeGridRow]',
                template: "\n\t\t<td *ngFor=\"let col of columns\">\n\t\t\t<div *ngIf=\"isTreeField(col.field)\" class=\"datagrid-cell\" [style.textAlign]=\"col.align || null\">\n\t\t\t\t<span class=\"tree-indent\" [style.width.px]=\"indentWidth\"></span\n\t\t\t\t><span *ngIf=\"!isLeaf()\" class=\"tree-hit\" \n\t\t\t\t\t\t[class.tree-expanded]=\"isExpanded()\" \n\t\t\t\t\t\t[class.tree-collapsed]=\"isCollapsed()\"\n\t\t\t\t\t\t(click)=\"toggle($event)\"></span\n\t\t\t\t><span class=\"tree-icon tree-folder\" \n\t\t\t\t\t\t[ngClass]=\"row.iconCls\"\n\t\t\t\t\t\t[class.tree-folder-open]=\"isExpanded()\"\n\t\t\t\t\t\t[class.tree-file]=\"isLeaf()\"\n\t\t\t\t\t\t[class.tree-loading]=\"loading\"></span\n\t\t\t\t><span *ngIf=\"grid.checkbox\" class=\"tree-checkbox\" [ngClass]=\"checkboxClass\" (click)=\"onCheckRow($event)\"></span\n\t\t\t\t><span class=\"tree-title\">\n\t\t\t\t\t<ng-container *ngIf=\"!col.cellTemplate\">{{row[col.field]}}</ng-container>\n\t\t\t\t\t<ng-template *ngIf=\"col.cellTemplate\" [euiGridCellTemplate]=\"col.cellTemplate.template\" [row]=\"row\" [rowIndex]=\"rowIndex\" [column]=\"col\"></ng-template>\n\t\t\t\t</span>\n\t\t\t</div>\n\t\t\t<div *ngIf=\"!isTreeField(col.field)\" class=\"datagrid-cell\" [style.textAlign]=\"col.align || null\">\n\t\t\t\t<ng-container *ngIf=\"!col.cellTemplate\">{{row[col.field]}}</ng-container>\n\t\t\t\t<ng-template *ngIf=\"col.cellTemplate\" [euiGridCellTemplate]=\"col.cellTemplate.template\" [row]=\"row\" [rowIndex]=\"rowIndex\" [column]=\"col\"></ng-template>\n\t\t\t</div>\n\t\t</td>\n\t"
            },] },
];
/** @nocollapse */
TreeGridRowComponent.ctorParameters = function () { return [
    { type: TreeGridBodyComponent, decorators: [{ type: Inject, args: [forwardRef(function () { return TreeGridBodyComponent; }),] },] },
]; };
TreeGridRowComponent.propDecorators = {
    'row': [{ type: Input },],
    'prow': [{ type: Input },],
    'columns': [{ type: Input },],
    'depth': [{ type: Input },],
    'rowIndex': [{ type: Input },],
};
//# sourceMappingURL=treegrid-row.component.js.map