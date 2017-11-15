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
import { TabsComponent } from './tabs.component';
import { TabPanelComponent } from './tab-panel.component';
import { TabHeaderTemplateDirective } from './tab-headertemplate.directive';
var TabsModule = (function () {
    function TabsModule() {
    }
    return TabsModule;
}());
export { TabsModule };
TabsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    TabsComponent,
                    TabPanelComponent,
                    TabHeaderTemplateDirective
                ],
                imports: [
                    CommonModule
                ],
                exports: [
                    TabsComponent,
                    TabPanelComponent,
                    TabHeaderTemplateDirective
                ]
            },] },
];
/** @nocollapse */
TabsModule.ctorParameters = function () { return []; };
//# sourceMappingURL=tabs.module.js.map