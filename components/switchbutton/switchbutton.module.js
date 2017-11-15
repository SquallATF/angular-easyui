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
import { SwitchButtonComponent } from './switchbutton.component';
var SwitchButtonModule = (function () {
    function SwitchButtonModule() {
    }
    return SwitchButtonModule;
}());
export { SwitchButtonModule };
SwitchButtonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    SwitchButtonComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule
                ],
                exports: [
                    SwitchButtonComponent
                ]
            },] },
];
/** @nocollapse */
SwitchButtonModule.ctorParameters = function () { return []; };
//# sourceMappingURL=switchbutton.module.js.map