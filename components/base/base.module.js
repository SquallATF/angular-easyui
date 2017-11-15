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
import { InputBaseComponent } from './input-base.component';
import { SpinnerBaseComponent } from './spinner-base.component';
import { ComboBaseComponent } from './combo-base.component';
import { ListBaseComponent } from './list-base.component';
import { AddonComponent } from './addon.component';
import { VirtualScrollComponent } from './virtual-scroll.component';
import { ItemTemplateDirective } from './template-base';
import { HeaderTemplateDirective } from './template-base';
import { CellTemplateDirective } from './template-base';
import { FooterTemplateDirective } from './template-base';
import { GroupTemplateDirective } from './template-base';
import { DetailTemplateDirective } from './template-base';
import { PageTemplateDirective } from './template-base';
import { LabelDirective } from './label.directive';
var BaseModule = (function () {
    function BaseModule() {
    }
    return BaseModule;
}());
export { BaseModule };
BaseModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    InputBaseComponent,
                    SpinnerBaseComponent,
                    ComboBaseComponent,
                    ListBaseComponent,
                    AddonComponent,
                    VirtualScrollComponent,
                    ItemTemplateDirective,
                    HeaderTemplateDirective,
                    CellTemplateDirective,
                    FooterTemplateDirective,
                    GroupTemplateDirective,
                    DetailTemplateDirective,
                    PageTemplateDirective,
                    LabelDirective
                ],
                imports: [
                    CommonModule,
                    FormsModule
                ],
                exports: [
                    InputBaseComponent,
                    SpinnerBaseComponent,
                    ComboBaseComponent,
                    ListBaseComponent,
                    AddonComponent,
                    VirtualScrollComponent,
                    ItemTemplateDirective,
                    HeaderTemplateDirective,
                    CellTemplateDirective,
                    FooterTemplateDirective,
                    GroupTemplateDirective,
                    DetailTemplateDirective,
                    PageTemplateDirective,
                    LabelDirective
                ]
            },] },
];
/** @nocollapse */
BaseModule.ctorParameters = function () { return []; };
//# sourceMappingURL=base.module.js.map