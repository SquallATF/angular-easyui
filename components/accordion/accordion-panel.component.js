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
import { Component, Host, Inject, forwardRef, Input, ElementRef, HostListener } from '@angular/core';
import { AccordionComponent } from './accordion.component';
import { PanelComponent, PANEL_TEMPLATE } from '../panel/panel.component';
var AccordionPanelComponent = (function (_super) {
    __extends(AccordionPanelComponent, _super);
    function AccordionPanelComponent(accordion, hostRef) {
        var _this = _super.call(this, hostRef) || this;
        _this.accordion = accordion;
        _this.hostRef = hostRef;
        _this.title = '';
        _this.collapsed = true;
        _this.collapsible = true;
        _this.expandIconCls = 'accordion-expand';
        _this.collapseIconCls = 'accordion-collapse';
        _this._panelCls = null;
        _this._headerCls = null;
        _this._bodyCls = null;
        _this.isLast = false;
        return _this;
    }
    Object.defineProperty(AccordionPanelComponent.prototype, "selected", {
        get: function () {
            return !this.collapsed;
        },
        set: function (value) {
            this.collapsed = !value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionPanelComponent.prototype, "panelCls", {
        get: function () {
            var cls = this.isLast ? 'panel-last' : '';
            cls += this._panelCls ? ' ' + this._panelCls : '';
            return cls;
        },
        set: function (value) {
            this._panelCls = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionPanelComponent.prototype, "headerCls", {
        get: function () {
            var cls = 'accordion-header';
            cls += this._headerCls ? (' ' + this._headerCls) : '';
            cls += this.selected ? ' accordion-header-selected' : '';
            return cls;
        },
        set: function (value) {
            this._headerCls = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AccordionPanelComponent.prototype, "bodyCls", {
        get: function () {
            return 'accordion-body' + (this._bodyCls ? ' ' + this._bodyCls : '');
        },
        set: function (value) {
            this._bodyCls = value;
        },
        enumerable: true,
        configurable: true
    });
    AccordionPanelComponent.prototype.isFull = function () {
        if (this.accordion.multiple) {
            return false;
        }
        else {
            return this.selected;
        }
    };
    AccordionPanelComponent.prototype.onClick = function (event) {
        var header = null;
        var target = event.target;
        while (target && target != this.hostRef.nativeElement) {
            if (target.classList.contains('accordion-header')) {
                header = target;
                break;
            }
            target = target.parentNode;
        }
        if (header) {
            var panel = this.accordion.panels.find(function (p) { return p.headerRef.nativeElement == header; });
            if (panel) {
                event.stopPropagation();
                if (panel.collapsed) {
                    panel.select();
                }
                else if (this.accordion.multiple) {
                    this.unselect();
                }
            }
        }
    };
    AccordionPanelComponent.prototype.select = function () {
        var _this = this;
        if (this.selected) {
            return;
        }
        if (!this.accordion.multiple) {
            this.accordion.panels.filter(function (p) { return p != _this; }).forEach(function (p) { return p.unselect(); });
        }
        this.collapsed = false;
        this.accordion.panelSelect.emit(this);
    };
    AccordionPanelComponent.prototype.unselect = function () {
        if (!this.selected) {
            return;
        }
        this.collapsed = true;
        this.accordion.panelUnselect.emit(this);
    };
    AccordionPanelComponent.prototype.onClickCollapsibleTool = function (event) {
        // do nothing
    };
    return AccordionPanelComponent;
}(PanelComponent));
export { AccordionPanelComponent };
AccordionPanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-accordion-panel',
                template: PANEL_TEMPLATE,
                host: {
                    'class': 'f-column',
                    '[class.f-full]': 'isFull()',
                    '[class.f-noshrink]': '!selected'
                }
            },] },
];
/** @nocollapse */
AccordionPanelComponent.ctorParameters = function () { return [
    { type: AccordionComponent, decorators: [{ type: Host }, { type: Inject, args: [forwardRef(function () { return AccordionComponent; }),] },] },
    { type: ElementRef, },
]; };
AccordionPanelComponent.propDecorators = {
    'title': [{ type: Input },],
    'collapsed': [{ type: Input },],
    'collapsible': [{ type: Input },],
    'expandIconCls': [{ type: Input },],
    'collapseIconCls': [{ type: Input },],
    'selected': [{ type: Input },],
    'panelCls': [{ type: Input },],
    'headerCls': [{ type: Input },],
    'bodyCls': [{ type: Input },],
    'onClick': [{ type: HostListener, args: ['click', ['$event'],] },],
};
//# sourceMappingURL=accordion-panel.component.js.map