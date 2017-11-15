/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Component, ViewChild, Input } from '@angular/core';
export var GRID_FOOTER_TEMPLATE = "\n\t<div class=\"datagrid-footer f-row\">\n\t\t<div #footer class=\"datagrid-footer-inner f-full\" id=\"f1\">\n\t\t\t<table class=\"datagrid-ftable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n\t\t\t\t<colgroup>\n\t\t\t\t\t<col *ngFor=\"let col of columns\" [style.width]=\"col.width\">\n\t\t\t\t</colgroup>\n\t\t\t\t<tbody>\n\t\t\t\t\t<ng-container *ngFor=\"let row of rows;let rowIndex=index\">\n\t\t\t\t\t<tr class=\"datagrid-row\">\n\t\t\t\t\t\t<td *ngFor=\"let col of columns\">\n\t\t\t\t\t\t\t<div class=\"datagrid-cell\" [style.textAlign]=\"col.align || null\">\n\t\t\t\t\t\t\t\t<ng-container *ngIf=\"!col.footerTemplate\">{{row[col.field]}}</ng-container>\n\t\t\t\t\t\t\t\t<ng-template *ngIf=\"col.footerTemplate\" [euiGridCellTemplate]=\"col.footerTemplate.template\" [row]=\"row\" [rowIndex]=\"rowIndex\" [column]=\"col\"></ng-template>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t</ng-container>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t</div>\n\t\t<div *ngIf=\"paddingWidth\" class=\"datagrid-header f-noshrink\" [style.width.px]=\"paddingWidth\"></div>\n\t</div>\n";
var GridFooterComponent = (function () {
    function GridFooterComponent() {
        this.paddingWidth = 0;
        this._scrollLeft = 0;
    }
    Object.defineProperty(GridFooterComponent.prototype, "scrollLeft", {
        get: function () {
            return this._scrollLeft;
        },
        set: function (value) {
            this._scrollLeft = value;
            this.footerRef.nativeElement.scrollLeft = value;
        },
        enumerable: true,
        configurable: true
    });
    return GridFooterComponent;
}());
export { GridFooterComponent };
GridFooterComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-grid-footer',
                template: GRID_FOOTER_TEMPLATE,
                host: {
                    'class': 'f-column f-noshrink'
                }
            },] },
];
/** @nocollapse */
GridFooterComponent.ctorParameters = function () { return []; };
GridFooterComponent.propDecorators = {
    'footerRef': [{ type: ViewChild, args: ['footer',] },],
    'columns': [{ type: Input },],
    'rows': [{ type: Input },],
    'paddingWidth': [{ type: Input },],
};
//# sourceMappingURL=grid-footer.component.js.map