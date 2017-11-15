/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Directive, ViewContainerRef, Input } from '@angular/core';
var DataListItemTemplateDirective = (function () {
    function DataListItemTemplateDirective(viewContainer) {
        this.viewContainer = viewContainer;
    }
    DataListItemTemplateDirective.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.row,
            'rowIndex': this.rowIndex
        });
    };
    DataListItemTemplateDirective.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return DataListItemTemplateDirective;
}());
export { DataListItemTemplateDirective };
DataListItemTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[euiDataListItemTemplate]'
            },] },
];
/** @nocollapse */
DataListItemTemplateDirective.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
DataListItemTemplateDirective.propDecorators = {
    'row': [{ type: Input },],
    'rowIndex': [{ type: Input },],
    'template': [{ type: Input, args: ['euiDataListItemTemplate',] },],
};
//# sourceMappingURL=datalist-itemtemplate.directive.js.map