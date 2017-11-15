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
import { MenuComponent } from './menu.component';
import { SubMenuComponent } from './submenu.component';
import { MenuItemComponent } from './menu-item.component';
import { MenuSepComponent } from './menu-sep.component';
import { MenuItemTemplateDirective } from './menu-item-template.directive';
import { ContextMenuDirective } from './contextmenu.directive';
var MenuModule = (function () {
    function MenuModule() {
    }
    return MenuModule;
}());
export { MenuModule };
MenuModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    MenuComponent,
                    SubMenuComponent,
                    MenuItemComponent,
                    MenuSepComponent,
                    MenuItemTemplateDirective,
                    ContextMenuDirective
                ],
                imports: [
                    CommonModule,
                    FormsModule
                ],
                exports: [
                    MenuComponent,
                    SubMenuComponent,
                    MenuItemComponent,
                    MenuSepComponent,
                    MenuItemTemplateDirective,
                    ContextMenuDirective
                ]
            },] },
];
/** @nocollapse */
MenuModule.ctorParameters = function () { return []; };
//# sourceMappingURL=menu.module.js.map