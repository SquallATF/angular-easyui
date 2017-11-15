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
import { Component, Host, Inject, forwardRef } from '@angular/core';
import { GridViewComponent } from '../gridbase/grid-view.component';
import { TreeGridComponent } from './treegrid.component';
var TreeGridViewComponent = (function (_super) {
    __extends(TreeGridViewComponent, _super);
    function TreeGridViewComponent(grid) {
        var _this = _super.call(this) || this;
        _this.grid = grid;
        return _this;
    }
    TreeGridViewComponent.prototype.onHeaderCellClick = function (event) {
        event.originalEvent.preventDefault();
        var col = event.column;
        if (col.sortable) {
            this.grid.addSort(event.column);
            this.grid.data = this.grid.data;
            this.grid.sortChange.emit(this.grid.sorts);
        }
    };
    return TreeGridViewComponent;
}(GridViewComponent));
export { TreeGridViewComponent };
TreeGridViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-treegrid-view',
                template: "\n\t\t<eui-grid-header *ngIf=\"grid.showHeader\" #header \n\t\t\t\t[columnGroup]=\"columnGroup\" \n\t\t\t\t[columns]=\"columns\" \n\t\t\t\t[paddingWidth]=\"headerPaddingWidth\"\n\t\t\t\t(cellClick)=\"onHeaderCellClick($event)\"></eui-grid-header>\n\t\t<eui-treegrid-body #body [columns]=\"columns\" align=\"center\" \n\t\t\t\t[rows]=\"rows\" \n\t\t\t\t(bodyScroll)=\"onBodyScroll($event)\"></eui-treegrid-body>\n\t\t<eui-grid-footer *ngIf=\"grid.showFooter\" #footer \n\t\t\t\t[columns]=\"columns\" \n\t\t\t\t[paddingWidth]=\"headerPaddingWidth\"\n\t\t\t\t[rows]=\"footerRows\"></eui-grid-footer>\n\t",
                host: {
                    '[class]': 'viewCls'
                }
            },] },
];
/** @nocollapse */
TreeGridViewComponent.ctorParameters = function () { return [
    { type: TreeGridComponent, decorators: [{ type: Host }, { type: Inject, args: [forwardRef(function () { return TreeGridComponent; }),] },] },
]; };
//# sourceMappingURL=treegrid-view.component.js.map