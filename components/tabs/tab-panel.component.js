/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, ContentChild, Host, Inject, forwardRef, Input, ElementRef } from '@angular/core';
import { TabsComponent } from './tabs.component';
import { HeaderTemplateDirective } from '../base/template-base';
import { PanelComponent, PANEL_TEMPLATE } from '../panel/panel.component';
var TabPanelComponent = (function (_super) {
    __extends(TabPanelComponent, _super);
    function TabPanelComponent(tabs, hostRef) {
        var _this = _super.call(this, hostRef) || this;
        _this.tabs = tabs;
        _this.hostRef = hostRef;
        _this.closed = true;
        _this.showHeader = false;
        _this.border = false;
        _this.disabled = false;
        _this.closable = false;
        _this.isFirst = false;
        _this.isLast = false;
        _this.isUsed = true;
        return _this;
    }
    Object.defineProperty(TabPanelComponent.prototype, "selected", {
        get: function () {
            return !this.closed;
        },
        set: function (value) {
            this.closed = !value;
        },
        enumerable: true,
        configurable: true
    });
    TabPanelComponent.prototype.select = function () {
        var _this = this;
        if (this.selected || this.disabled) {
            return;
        }
        this.tabs.panels.filter(function (p) { return p != _this; }).forEach(function (p) { return p.unselect(); });
        this.selected = true;
        this.tabs.tabSelect.emit(this);
    };
    TabPanelComponent.prototype.unselect = function () {
        if (!this.selected || this.disabled) {
            return;
        }
        this.selected = false;
        this.tabs.tabUnselect.emit(this);
    };
    TabPanelComponent.prototype.close = function () {
        if (this.disabled) {
            return;
        }
        if (this.selected) {
            this.selected = false;
            this.tabs.selectedIndex = -1;
        }
        this.isUsed = false;
    };
    return TabPanelComponent;
}(PanelComponent));
export { TabPanelComponent };
TabPanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-tab-panel',
                template: PANEL_TEMPLATE,
                host: {
                    'class': 'f-column',
                    '[class.f-full]': 'selected'
                }
            },] },
];
/** @nocollapse */
TabPanelComponent.ctorParameters = function () { return [
    { type: TabsComponent, decorators: [{ type: Host }, { type: Inject, args: [forwardRef(function () { return TabsComponent; }),] },] },
    { type: ElementRef, },
]; };
TabPanelComponent.propDecorators = {
    'headerTemplate': [{ type: ContentChild, args: [HeaderTemplateDirective,] },],
    'closed': [{ type: Input },],
    'showHeader': [{ type: Input },],
    'border': [{ type: Input },],
    'disabled': [{ type: Input },],
    'closable': [{ type: Input },],
    'selected': [{ type: Input },],
};
//# sourceMappingURL=tab-panel.component.js.map