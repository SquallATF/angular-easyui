/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LinkButtonComponent } from './linkbutton.component';
import { ButtonGroupComponent } from './button-group.component';
var LinkButtonModule = (function () {
    function LinkButtonModule() {
    }
    return LinkButtonModule;
}());
export { LinkButtonModule };
LinkButtonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    LinkButtonComponent,
                    ButtonGroupComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule
                ],
                exports: [
                    LinkButtonComponent,
                    ButtonGroupComponent
                ]
            },] },
];
/** @nocollapse */
LinkButtonModule.ctorParameters = function () { return []; };
//# sourceMappingURL=linkbutton.module.js.map