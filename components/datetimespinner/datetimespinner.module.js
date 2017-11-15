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
import { DateTimeSpinnerComponent } from './datetimespinner.component';
var DateTimeSpinnerModule = (function () {
    function DateTimeSpinnerModule() {
    }
    return DateTimeSpinnerModule;
}());
export { DateTimeSpinnerModule };
DateTimeSpinnerModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DateTimeSpinnerComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule
                ],
                exports: [
                    DateTimeSpinnerComponent
                ]
            },] },
];
/** @nocollapse */
DateTimeSpinnerModule.ctorParameters = function () { return []; };
//# sourceMappingURL=datetimespinner.module.js.map