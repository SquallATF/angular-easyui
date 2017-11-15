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
import { ComboTreeComponent } from './combotree.component';
import { TreeModule } from '../tree/tree.module';
var ComboTreeModule = (function () {
    function ComboTreeModule() {
    }
    return ComboTreeModule;
}());
export { ComboTreeModule };
ComboTreeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    ComboTreeComponent
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    TreeModule
                ],
                exports: [
                    ComboTreeComponent
                ]
            },] },
];
/** @nocollapse */
ComboTreeModule.ctorParameters = function () { return []; };
//# sourceMappingURL=combotree.module.js.map