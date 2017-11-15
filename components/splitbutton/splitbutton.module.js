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
import { SplitButtonComponent } from './splitbutton.component';
var SplitButtonModule = (function () {
    function SplitButtonModule() {
    }
    return SplitButtonModule;
}());
export { SplitButtonModule };
SplitButtonModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    SplitButtonComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule
                ],
                exports: [
                    SplitButtonComponent
                ]
            },] },
];
/** @nocollapse */
SplitButtonModule.ctorParameters = function () { return []; };
//# sourceMappingURL=splitbutton.module.js.map