/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Component, Input, ContentChildren, ViewChild, ElementRef } from '@angular/core';
import { PanelHeaderComponent } from './panel-header.component';
import { PanelFooterComponent } from './panel-footer.component';
export var PANEL_TEMPLATE = "\n\t<div *ngIf=\"!closed\" class=\"panel f-column f-full\" [ngClass]=\"panelCls\" [ngStyle]=\"panelStyle\">\n\t\t<div #pheader *ngIf=\"hasHeader\"\n\t\t\t\tclass=\"panel-header f-noshrink\"\n\t\t\t\t[class.panel-header-noborder]=\"!border\"\n\t\t\t\t[ngClass]=\"headerCls\"\n\t\t\t\t[ngStyle]=\"headerStyle\">\n\t\t\t<ng-content select=\"eui-panel-header\"></ng-content>\n\t\t\t<div *ngIf=\"!headers.length\" class=\"panel-title\" [class.panel-with-icon]=\"iconCls\">{{title}}</div>\n\t\t\t<div *ngIf=\"iconCls\" class=\"panel-icon {{iconCls}}\"></div>\n\t\t\t<div class=\"panel-tool\" *ngIf=\"collapsible\">\n\t\t\t\t<a href=\"javascript:;\" [ngClass]=\"collapsed?expandIconCls:collapseIconCls\" (click)=\"onClickCollapsibleTool($event)\"></a>\n\t\t\t</div>\n\t\t</div>\n\t\t<div #pbody *ngIf=\"!collapsed\"\n\t\t\t\tclass=\"panel-body f-full\" \n\t\t\t\t[class.panel-body-noheader]=\"!hasHeader\" \n\t\t\t\t[class.panel-body-nobottom]=\"footers.length\" \n\t\t\t\t[class.panel-body-noborder]=\"!border\" \n\t\t\t\t[ngClass]=\"bodyCls\"\n\t\t\t\t[ngStyle]=\"bodyStyle\">\n\t\t\t<ng-content></ng-content>\n\t\t</div>\n\t\t<div #pfooter *ngIf=\"hasFooter\" \n\t\t\t\tclass=\"panel-footer\" \n\t\t\t\t[class.panel-footer-noborder]=\"!border\"\n\t\t\t\t[ngClass]=\"footerCls\"\n\t\t\t\t[ngStyle]=\"footerStyle\">\n\t\t\t<ng-content select=\"eui-panel-footer\"></ng-content>\n\t\t</div>\n\t</div>\n";
var PanelComponent = (function () {
    function PanelComponent(hostRef) {
        this.hostRef = hostRef;
        this.iconCls = null;
        this.border = true;
        this.closed = false;
        this.collapsed = false;
        this.collapsible = false;
        this.showHeader = true;
        this.showFooter = true;
        this.expandIconCls = 'panel-tool-expand';
        this.collapseIconCls = 'panel-tool-collapse';
        this.panelCls = null;
        this.headerCls = null;
        this.bodyCls = null;
        this.footerCls = null;
    }
    Object.defineProperty(PanelComponent.prototype, "hasHeader", {
        get: function () {
            if (!this.showHeader) {
                return false;
            }
            if ((this.headers && this.headers.length) || this.title != null) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PanelComponent.prototype, "hasFooter", {
        get: function () {
            if (!this.showFooter) {
                return false;
            }
            if (this.footers && this.footers.length) {
                return true;
            }
            else {
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    PanelComponent.prototype.onClickCollapsibleTool = function (event) {
        this.collapsed = !this.collapsed;
        event.preventDefault();
    };
    return PanelComponent;
}());
export { PanelComponent };
PanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-panel',
                template: PANEL_TEMPLATE,
                host: {
                    'class': 'f-column'
                }
            },] },
];
/** @nocollapse */
PanelComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
PanelComponent.propDecorators = {
    'headerRef': [{ type: ViewChild, args: ['pheader',] },],
    'bodyRef': [{ type: ViewChild, args: ['pbody',] },],
    'footerRef': [{ type: ViewChild, args: ['pfooter',] },],
    'headers': [{ type: ContentChildren, args: [PanelHeaderComponent,] },],
    'footers': [{ type: ContentChildren, args: [PanelFooterComponent,] },],
    'title': [{ type: Input },],
    'iconCls': [{ type: Input },],
    'border': [{ type: Input },],
    'closed': [{ type: Input },],
    'collapsed': [{ type: Input },],
    'collapsible': [{ type: Input },],
    'showHeader': [{ type: Input },],
    'showFooter': [{ type: Input },],
    'expandIconCls': [{ type: Input },],
    'collapseIconCls': [{ type: Input },],
    'panelCls': [{ type: Input },],
    'panelStyle': [{ type: Input },],
    'headerCls': [{ type: Input },],
    'headerStyle': [{ type: Input },],
    'bodyCls': [{ type: Input },],
    'bodyStyle': [{ type: Input },],
    'footerCls': [{ type: Input },],
    'footerStyle': [{ type: Input },],
};
//# sourceMappingURL=panel.component.js.map