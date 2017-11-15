/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Component, Input } from '@angular/core';
var ProgressBarComponent = (function () {
    function ProgressBarComponent() {
        this.value = 0;
        this.showValue = false;
        this.barCls = null;
        this.barStyle = null;
    }
    return ProgressBarComponent;
}());
export { ProgressBarComponent };
ProgressBarComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-progressbar',
                template: "\n\t\t<div class=\"progressbar f-row f-full\">\n\t\t\t<div class=\"progressbar-value f-row f-content-center\" [ngClass]=\"barCls\" [ngStyle]=\"barStyle\" [style.width.%]=\"value\">\n\t\t\t\t<span *ngIf=\"showValue\">{{value}}%</span>\n\t\t\t\t<ng-content></ng-content>\n\t\t\t</div>\n\t\t</div>\n\t",
                host: {
                    '[class.f-row]': 'true'
                }
            },] },
];
/** @nocollapse */
ProgressBarComponent.ctorParameters = function () { return []; };
ProgressBarComponent.propDecorators = {
    'value': [{ type: Input },],
    'showValue': [{ type: Input },],
    'barCls': [{ type: Input },],
    'barStyle': [{ type: Input },],
};
//# sourceMappingURL=progressbar.component.js.map