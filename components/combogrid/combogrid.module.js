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
import { ComboGridComponent } from './combogrid.component';
import { DataGridModule } from '../datagrid/datagrid.module';
var ComboGridModule = (function () {
    function ComboGridModule() {
    }
    return ComboGridModule;
}());
export { ComboGridModule };
ComboGridModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ComboGridComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    DataGridModule
                ],
                exports: [
                    ComboGridComponent
                ]
            },] },
];
/** @nocollapse */
ComboGridModule.ctorParameters = function () { return []; };
//# sourceMappingURL=combogrid.module.js.map