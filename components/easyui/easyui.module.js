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
import { TextBoxModule } from '../textbox/textbox.module';
import { PasswordBoxModule } from '../passwordbox/passwordbox.module';
import { SearchBoxModule } from '../searchbox/searchbox.module';
import { NumberBoxModule } from '../numberbox/numberbox.module';
import { DateBoxModule } from '../datebox/datebox.module';
import { TimeSpinnerModule } from '../timespinner/timespinner.module';
import { DateTimeSpinnerModule } from '../datetimespinner/datetimespinner.module';
import { ComboBoxModule } from '../combobox/combobox.module';
import { ComboTreeModule } from '../combotree/combotree.module';
import { ComboGridModule } from '../combogrid/combogrid.module';
import { SwitchButtonModule } from '../switchbutton/switchbutton.module';
import { PanelModule } from '../panel/panel.module';
import { AccordionModule } from '../accordion/accordion.module';
import { TabsModule } from '../tabs/tabs.module';
import { PaginationModule } from '../pagination/pagination.module';
import { DataListModule } from '../datalist/datalist.module';
import { GridBaseModule } from '../gridbase/grid-base.module';
import { DataGridModule } from '../datagrid/datagrid.module';
import { TreeGridModule } from '../treegrid/treegrid.module';
import { LinkButtonModule } from '../linkbutton/linkbutton.module';
import { MenuButtonModule } from '../menubutton/menubutton.module';
import { SplitButtonModule } from '../splitbutton/splitbutton.module';
import { TreeModule } from '../tree/tree.module';
import { MenuModule } from '../menu/menu.module';
import { ProgressBarModule } from '../progressbar/progressbar.module';
import { CalendarModule } from '../calendar/calendar.module';
var EasyUIModule = (function () {
    function EasyUIModule() {
    }
    return EasyUIModule;
}());
export { EasyUIModule };
EasyUIModule.decorators = [
    { type: NgModule, args: [{
                declarations: [],
                imports: [
                    CommonModule,
                    FormsModule,
                    BaseModule,
                    TextBoxModule,
                    PasswordBoxModule,
                    SearchBoxModule,
                    NumberBoxModule,
                    DateBoxModule,
                    TimeSpinnerModule,
                    DateTimeSpinnerModule,
                    ComboBoxModule,
                    ComboTreeModule,
                    ComboGridModule,
                    SwitchButtonModule,
                    PanelModule,
                    AccordionModule,
                    TabsModule,
                    PaginationModule,
                    DataListModule,
                    GridBaseModule,
                    DataGridModule,
                    TreeGridModule,
                    LinkButtonModule,
                    MenuButtonModule,
                    SplitButtonModule,
                    TreeModule,
                    MenuModule,
                    ProgressBarModule,
                    CalendarModule
                ],
                exports: [
                    BaseModule,
                    TextBoxModule,
                    PasswordBoxModule,
                    SearchBoxModule,
                    NumberBoxModule,
                    DateBoxModule,
                    TimeSpinnerModule,
                    DateTimeSpinnerModule,
                    ComboBoxModule,
                    ComboTreeModule,
                    ComboGridModule,
                    SwitchButtonModule,
                    PanelModule,
                    AccordionModule,
                    TabsModule,
                    PaginationModule,
                    DataListModule,
                    GridBaseModule,
                    DataGridModule,
                    TreeGridModule,
                    LinkButtonModule,
                    MenuButtonModule,
                    SplitButtonModule,
                    TreeModule,
                    MenuModule,
                    ProgressBarModule,
                    CalendarModule
                ]
            },] },
];
/** @nocollapse */
EasyUIModule.ctorParameters = function () { return []; };
//# sourceMappingURL=easyui.module.js.map