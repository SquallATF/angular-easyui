/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Component, ContentChildren } from '@angular/core';
import { GridColumnComponent } from './grid-column.component';
var GridHeaderRowComponent = (function () {
    function GridHeaderRowComponent() {
    }
    return GridHeaderRowComponent;
}());
export { GridHeaderRowComponent };
GridHeaderRowComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-grid-header-row',
                template: ''
            },] },
];
/** @nocollapse */
GridHeaderRowComponent.ctorParameters = function () { return []; };
GridHeaderRowComponent.propDecorators = {
    'columns': [{ type: ContentChildren, args: [GridColumnComponent,] },],
};
//# sourceMappingURL=grid-header-row.component.js.map