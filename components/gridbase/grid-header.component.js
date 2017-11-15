/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { domHelper } from '../base/domhelper';
export var GRID_HEADER_TEMPLATE = "\n\t<div class=\"datagrid-header f-row\">\n\t\t<div #header class=\"datagrid-header-inner f-full\" [style.height.px]=\"_height\">\n\t\t\t<table #content class=\"datagrid-htable\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\">\n\t\t\t\t<colgroup>\n\t\t\t\t\t<col *ngFor=\"let col of columns\" [style.width]=\"col.width\">\n\t\t\t\t</colgroup>\n\t\t\t\t<tbody *ngIf=\"columnGroup\">\n\t\t\t\t\t<tr *ngFor=\"let row of columnGroup.rows\" class=\"datagrid-header-row\">\n\t\t\t\t\t\t<td *ngFor=\"let col of row.columns\"\n\t\t\t\t\t\t\t\t[attr.rowspan]=\"col.rowspan\"\n\t\t\t\t\t\t\t\t[attr.colspan]=\"col.colspan\"\n\t\t\t\t\t\t\t\t[class.datagrid-field-td]=\"col.field\"\n\t\t\t\t\t\t\t\t[class.datagrid-header-over]=\"hoverColumn==col && col.sortable\"\n\t\t\t\t\t\t\t\t(mouseenter)=\"hoverColumn=col\"\n\t\t\t\t\t\t\t\t(mouseleave)=\"hoverColumn=null\"\n\t\t\t\t\t\t\t\t(click)=\"onCellClick($event,col)\">\n\t\t\t\t\t\t\t<div class=\"datagrid-cell\" \n\t\t\t\t\t\t\t\t\t[class.datagrid-cell-group]=\"!col.field\"\n\t\t\t\t\t\t\t\t\t[class.datagrid-sort]=\"col.field && col.sortable\"\n\t\t\t\t\t\t\t\t\t[class.datagrid-sort-asc]=\"col.currOrder=='asc'\"\n\t\t\t\t\t\t\t\t\t[class.datagrid-sort-desc]=\"col.currOrder=='desc'\"\n\t\t\t\t\t\t\t\t\t[style.textAlign]=\"col.halign || col.align || null\">\n\t\t\t\t\t\t\t\t<span *ngIf=\"!col.headerTemplate\">{{col.title}}</span>\n\t\t\t\t\t\t\t\t<ng-template *ngIf=\"col.headerTemplate\" [euiGridHeaderTemplate]=\"col.headerTemplate.template\" [column]=\"col\"></ng-template>\n\t\t\t\t\t\t\t\t<span class=\"datagrid-sort-icon\"></span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t\t<tbody *ngIf=\"!columnGroup\">\n\t\t\t\t\t<tr class=\"datagrid-header-row\">\n\t\t\t\t\t\t<td *ngFor=\"let col of columns\" \n\t\t\t\t\t\t\t\tclass=\"datagrid-field-td\"\n\t\t\t\t\t\t\t\t[class.datagrid-header-over]=\"hoverColumn==col && col.sortable\"\n\t\t\t\t\t\t\t\t(mouseenter)=\"hoverColumn=col\"\n\t\t\t\t\t\t\t\t(mouseleave)=\"hoverColumn=null\"\n\t\t\t\t\t\t\t\t(click)=\"onCellClick($event,col)\">\n\t\t\t\t\t\t\t<div class=\"datagrid-cell\"\n\t\t\t\t\t\t\t\t\t[class.datagrid-sort]=\"col.field && col.sortable\"\n\t\t\t\t\t\t\t\t\t[class.datagrid-sort-asc]=\"col.currOrder=='asc'\"\n\t\t\t\t\t\t\t\t\t[class.datagrid-sort-desc]=\"col.currOrder=='desc'\"\n\t\t\t\t\t\t\t\t\t[style.textAlign]=\"col.halign || col.align || null\">\n\t\t\t\t\t\t\t\t<span *ngIf=\"!col.headerTemplate\">{{col.title}}</span>\n\t\t\t\t\t\t\t\t<ng-template *ngIf=\"col.headerTemplate\" [euiGridHeaderTemplate]=\"col.headerTemplate.template\" [column]=\"col\"></ng-template>\n\t\t\t\t\t\t\t\t<span class=\"datagrid-sort-icon\"></span>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t</div>\n\t\t<div *ngIf=\"paddingWidth\" class=\"datagrid-header f-noshrink\" [style.width.px]=\"paddingWidth\"></div>\n\t</div>\n";
var GridHeaderComponent = (function () {
    function GridHeaderComponent() {
        this.paddingWidth = 0;
        this.cellClick = new EventEmitter;
        this._scrollLeft = 0;
    }
    Object.defineProperty(GridHeaderComponent.prototype, "height", {
        get: function () {
            return domHelper.outerHeight(this.contentRef.nativeElement);
        },
        set: function (value) {
            this._height = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridHeaderComponent.prototype, "scrollLeft", {
        get: function () {
            return this._scrollLeft;
        },
        set: function (value) {
            this._scrollLeft = value;
            this.headerRef.nativeElement.scrollLeft = value;
        },
        enumerable: true,
        configurable: true
    });
    GridHeaderComponent.prototype.onCellClick = function (event, col) {
        this.cellClick.emit({ column: col, originalEvent: event });
    };
    return GridHeaderComponent;
}());
export { GridHeaderComponent };
GridHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-grid-header',
                template: GRID_HEADER_TEMPLATE,
                host: {
                    'class': 'f-column f-noshrink'
                }
            },] },
];
/** @nocollapse */
GridHeaderComponent.ctorParameters = function () { return []; };
GridHeaderComponent.propDecorators = {
    'headerRef': [{ type: ViewChild, args: ['header',] },],
    'contentRef': [{ type: ViewChild, args: ['content',] },],
    'columns': [{ type: Input },],
    'columnGroup': [{ type: Input },],
    'paddingWidth': [{ type: Input },],
    'cellClick': [{ type: Output },],
};
//# sourceMappingURL=grid-header.component.js.map