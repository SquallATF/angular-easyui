/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Directive, Input, HostListener } from '@angular/core';
var ContextMenuDirective = (function () {
    function ContextMenuDirective() {
    }
    ContextMenuDirective.prototype.onContextMenu = function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (this.menu) {
            this.menu.showContextMenu(event.pageX, event.pageY);
        }
    };
    return ContextMenuDirective;
}());
export { ContextMenuDirective };
ContextMenuDirective.decorators = [
    { type: Directive, args: [{
                selector: '[euiContextMenu]'
            },] },
];
/** @nocollapse */
ContextMenuDirective.ctorParameters = function () { return []; };
ContextMenuDirective.propDecorators = {
    'menu': [{ type: Input, args: ['euiContextMenu',] },],
    'onContextMenu': [{ type: HostListener, args: ['contextmenu', ['$event'],] },],
};
//# sourceMappingURL=contextmenu.directive.js.map