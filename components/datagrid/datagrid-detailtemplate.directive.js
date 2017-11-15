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
var DataGridDetailTemplateDirective = (function () {
    function DataGridDetailTemplateDirective(viewContainer) {
        this.viewContainer = viewContainer;
    }
    DataGridDetailTemplateDirective.prototype.ngOnInit = function () {
        this.view = this.viewContainer.createEmbeddedView(this.template, {
            '\$implicit': this.row,
            'rowIndex': this.rowIndex
        });
    };
    DataGridDetailTemplateDirective.prototype.ngOnDestroy = function () {
        this.view.destroy();
    };
    return DataGridDetailTemplateDirective;
}());
export { DataGridDetailTemplateDirective };
DataGridDetailTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[euiDataGridDetailTemplate]'
            },] },
];
/** @nocollapse */
DataGridDetailTemplateDirective.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
DataGridDetailTemplateDirective.propDecorators = {
    'row': [{ type: Input },],
    'rowIndex': [{ type: Input },],
    'template': [{ type: Input, args: ['euiDataGridDetailTemplate',] },],
};
//# sourceMappingURL=datagrid-detailtemplate.directive.js.map