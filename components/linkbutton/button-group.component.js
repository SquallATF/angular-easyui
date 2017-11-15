/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Component, ContentChildren, forwardRef, Input } from '@angular/core';
import { LinkButtonComponent } from './linkbutton.component';
var ButtonGroupComponent = (function () {
    function ButtonGroupComponent() {
        this.selectionMode = 'multi'; // or single
    }
    ButtonGroupComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.initButtons();
        this.buttons.changes.subscribe(function () { return _this.initButtons(); });
    };
    ButtonGroupComponent.prototype.initButtons = function () {
        var _this = this;
        if (this.buttons.length) {
            this.buttons.forEach(function (btn) {
                btn.click.subscribe(function () {
                    if (_this.selectionMode == 'single') {
                        _this.buttons.filter(function (b) { return b != btn; }).forEach(function (b) {
                            b.selected = false;
                        });
                    }
                });
            });
        }
    };
    return ButtonGroupComponent;
}());
export { ButtonGroupComponent };
ButtonGroupComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-button-group',
                template: '<ng-content></ng-content>',
                host: {
                    'class': 'f-inline-row'
                }
            },] },
];
/** @nocollapse */
ButtonGroupComponent.ctorParameters = function () { return []; };
ButtonGroupComponent.propDecorators = {
    'buttons': [{ type: ContentChildren, args: [forwardRef(function () { return LinkButtonComponent; }),] },],
    'selectionMode': [{ type: Input },],
};
//# sourceMappingURL=button-group.component.js.map