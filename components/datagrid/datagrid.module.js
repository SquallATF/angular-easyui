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
import { BaseModule } from '../base/base.module';
import { PaginationModule } from '../pagination/pagination.module';
import { GridBaseModule } from '../gridbase/grid-base.module';
import { DataGridComponent } from './datagrid.component';
import { DataGridBodyComponent } from './datagrid-body.component';
import { DataGridViewComponent } from './datagrid-view.component';
import { DataGridTableComponent } from './datagrid-table.component';
import { DataGridGroupTemplateDirective } from './datagrid-grouptemplate.directive';
import { DataGridDetailTemplateDirective } from './datagrid-detailtemplate.directive';
var DataGridModule = (function () {
    function DataGridModule() {
    }
    return DataGridModule;
}());
export { DataGridModule };
DataGridModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DataGridComponent,
                    DataGridBodyComponent,
                    DataGridViewComponent,
                    DataGridTableComponent,
                    DataGridGroupTemplateDirective,
                    DataGridDetailTemplateDirective
                ],
                imports: [
                    CommonModule,
                    FormsModule,
                    BaseModule,
                    PaginationModule,
                    GridBaseModule
                ],
                exports: [
                    DataGridComponent,
                    DataGridBodyComponent,
                    DataGridViewComponent,
                    DataGridTableComponent,
                    DataGridGroupTemplateDirective,
                    DataGridDetailTemplateDirective
                ]
            },] },
];
/** @nocollapse */
DataGridModule.ctorParameters = function () { return []; };
//# sourceMappingURL=datagrid.module.js.map