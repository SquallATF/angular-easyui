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
import { AccordionComponent } from './accordion.component';
import { AccordionPanelComponent } from './accordion-panel.component';
var AccordionModule = (function () {
    function AccordionModule() {
    }
    return AccordionModule;
}());
export { AccordionModule };
AccordionModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AccordionComponent,
                    AccordionPanelComponent
                ],
                imports: [
                    CommonModule
                ],
                exports: [
                    AccordionComponent,
                    AccordionPanelComponent
                ]
            },] },
];
/** @nocollapse */
AccordionModule.ctorParameters = function () { return []; };
//# sourceMappingURL=accordion.module.js.map