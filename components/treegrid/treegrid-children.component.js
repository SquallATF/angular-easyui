/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Component, forwardRef, Inject, Input } from '@angular/core';
import { TreeGridBodyComponent } from './treegrid-body.component';
var TreeGridChildrenComponent = (function () {
    function TreeGridChildrenComponent(gridBody) {
        this.gridBody = gridBody;
        this.rows = [];
        this.depth = 0;
        this.grid = this.gridBody.view.grid;
    }
    TreeGridChildrenComponent.prototype.isSelected = function (node) {
        return node == this.grid.selection;
    };
    TreeGridChildrenComponent.prototype.onClickRow = function (row, event) {
        event.stopPropagation();
        this.grid.rowClick.emit(row);
        this.grid.selectRow(row);
    };
    return TreeGridChildrenComponent;
}());
export { TreeGridChildrenComponent };
TreeGridChildrenComponent.decorators = [
    { type: Component, args: [{
                selector: '[euiTreeGridChildren]',
                template: "\n\t\t<table class=\"datagrid-btable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n\t\t\t<colgroup>\n\t\t\t\t<col *ngFor=\"let col of columns\" [style.width]=\"col.width\">\n\t\t\t</colgroup>\n\t\t\t<tbody>\n\t\t\t\t<ng-container *ngFor=\"let row of rows;let index=index\">\n\t\t\t\t<tr #rowRef euiTreeGridRow [row]=\"row\" [prow]=\"prow\" [columns]=\"columns\" [depth]=\"depth\"\n\t\t\t\t\t\tclass=\"datagrid-row\"\n\t\t\t\t\t\t[class.datagrid-row-over]=\"row==grid.highlightRow\"\n\t\t\t\t\t\t[class.datagrid-row-selected]=\"isSelected(row)\"\n\t\t\t\t\t\t(mouseenter)=\"grid.highlightRow=row\"\n\t\t\t\t\t\t(mouseleave)=\"grid.highlightRow=null\"\n\t\t\t\t\t\t(click)=\"onClickRow(row,$event)\">\n\t\t\t\t</tr>\n\t\t\t\t<tr *ngIf=\"rowRef.isExpanded() && row.children && row.children.length\" class=\"treegrid-tr-tree\">\n\t\t\t\t\t<td [attr.colspan]=\"columns.length\" style=\"border:0\">\n\t\t\t\t\t\t<div euiTreeGridChildren [rows]=\"row.children\" [prow]=\"row\" [columns]=\"columns\" [depth]=\"depth+1\">\n\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</td>\n\t\t\t\t</tr>\n\t\t\t\t</ng-container>\n\t\t\t</tbody>\n\t\t</table>\n\t"
            },] },
];
/** @nocollapse */
TreeGridChildrenComponent.ctorParameters = function () { return [
    { type: TreeGridBodyComponent, decorators: [{ type: Inject, args: [forwardRef(function () { return TreeGridBodyComponent; }),] },] },
]; };
TreeGridChildrenComponent.propDecorators = {
    'rows': [{ type: Input },],
    'prow': [{ type: Input },],
    'columns': [{ type: Input },],
    'depth': [{ type: Input },],
};
//# sourceMappingURL=treegrid-children.component.js.map