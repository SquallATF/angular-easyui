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
var AddonComponent = (function () {
    function AddonComponent() {
        this.align = 'right';
    }
    return AddonComponent;
}());
export { AddonComponent };
AddonComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-addon',
                template: '<ng-content></ng-content>',
                host: {
                    'class': 'textbox-addon f-inline-row f-noshrink',
                    '[class.f-order2]': "align=='left'",
                    '[class.f-order4]': "align=='right'"
                }
            },] },
];
/** @nocollapse */
AddonComponent.ctorParameters = function () { return []; };
AddonComponent.propDecorators = {
    'align': [{ type: Input },],
};
//# sourceMappingURL=addon.component.js.map