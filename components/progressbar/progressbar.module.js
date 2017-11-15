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
import { ProgressBarComponent } from './progressbar.component';
var ProgressBarModule = (function () {
    function ProgressBarModule() {
    }
    return ProgressBarModule;
}());
export { ProgressBarModule };
ProgressBarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ProgressBarComponent
                ],
                imports: [
                    CommonModule
                ],
                exports: [
                    ProgressBarComponent
                ]
            },] },
];
/** @nocollapse */
ProgressBarModule.ctorParameters = function () { return []; };
//# sourceMappingURL=progressbar.module.js.map