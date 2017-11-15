/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Component, ContentChild, Input } from '@angular/core';
import { HeaderTemplateDirective, CellTemplateDirective, FooterTemplateDirective } from '../base/template-base';
import { domHelper } from '../base/domhelper';
//import { GridBaseComponent } from './grid-base.component';
var GridColumnComponent = (function () {
    function GridColumnComponent() {
        this.field = null;
        this.title = null;
        this.rowspan = 1;
        this.colspan = 1;
        this.sortable = false;
        this.order = 'asc';
        this.frozen = false;
        this.align = null;
        this.halign = null;
        this.sorter = null;
        this.expander = false;
        this.currOrder = null;
    }
    /*
    calcWidth(value): number {
        let delta = 28;	// scrollbar size
        let s = String(value);
        let endchar = s.substr(s.length-1, 1);
        if (endchar == '%'){
            let parentWidth = domHelper.outerWidth(this.dg.dgView.nativeElement);
            let v = parseFloat(s.substr(0, s.length-1));
            v = Math.floor((parentWidth-delta) * v / 100.0);
            return v;
        } else {
            return parseInt(s) || null;
        }
    }
    */
    //constructor(@Inject(forwardRef(() => GridBaseComponent)) public grid: GridBaseComponent) {}
    GridColumnComponent.prototype.ngOnInit = function () {
        this.width = domHelper.toStyleValue(this.width);
    };
    return GridColumnComponent;
}());
export { GridColumnComponent };
GridColumnComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-grid-column',
                template: ''
            },] },
];
/** @nocollapse */
GridColumnComponent.ctorParameters = function () { return []; };
GridColumnComponent.propDecorators = {
    'headerTemplate': [{ type: ContentChild, args: [HeaderTemplateDirective,] },],
    'cellTemplate': [{ type: ContentChild, args: [CellTemplateDirective,] },],
    'footerTemplate': [{ type: ContentChild, args: [FooterTemplateDirective,] },],
    'field': [{ type: Input },],
    'title': [{ type: Input },],
    'width': [{ type: Input },],
    'rowspan': [{ type: Input },],
    'colspan': [{ type: Input },],
    'sortable': [{ type: Input },],
    'order': [{ type: Input },],
    'frozen': [{ type: Input },],
    'align': [{ type: Input },],
    'halign': [{ type: Input },],
    'sorter': [{ type: Input },],
    'headerCls': [{ type: Input },],
    'headerStyle': [{ type: Input },],
    'cellCss': [{ type: Input },],
    'expander': [{ type: Input },],
};
//# sourceMappingURL=grid-column.component.js.map