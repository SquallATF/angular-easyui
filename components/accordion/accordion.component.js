/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Component, forwardRef, ContentChildren, Input, Output, EventEmitter } from '@angular/core';
import { AccordionPanelComponent } from './accordion-panel.component';
var AccordionComponent = (function () {
    function AccordionComponent() {
        this.border = true;
        this.multiple = false;
        this.panelSelect = new EventEmitter();
        this.panelUnselect = new EventEmitter();
        this._selectedIndex = 0;
    }
    Object.defineProperty(AccordionComponent.prototype, "selectedIndex", {
        get: function () {
            return this._selectedIndex;
        },
        set: function (value) {
            var _this = this;
            if (this.multiple) {
                this._selectedIndex = value instanceof Array ? value : [+value];
            }
            else {
                this._selectedIndex = value instanceof Array ? +value[0] : +value;
            }
            if (this.panels) {
                if (this.multiple) {
                    this.panels.filter(function (p, index) { return _this._selectedIndex.indexOf(index) == -1; }).forEach(function (p) { return p.unselect(); });
                    for (var _i = 0, _a = this._selectedIndex; _i < _a.length; _i++) {
                        var index = _a[_i];
                        this.select(index);
                    }
                }
                else {
                    this.select(this._selectedIndex);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    AccordionComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.initPanels();
        this.panels.changes.subscribe(function () {
            setTimeout(function () { return _this.initPanels(); });
        });
    };
    AccordionComponent.prototype.initPanels = function () {
        if (this.panels.length) {
            this.panels.forEach(function (p) { return p.isLast = false; });
            this.panels.last.isLast = true;
            this.initSelectedPanel();
        }
    };
    AccordionComponent.prototype.initSelectedPanel = function () {
        var panels = this.panels.filter(function (p) { return p.selected; });
        if (!panels.length) {
            if (this.multiple) {
                panels = this.getPanels(this.selectedIndex);
            }
            else {
                panels = this.getPanels([this.selectedIndex]);
            }
        }
        if (panels.length) {
            if (this.multiple) {
                panels.forEach(function (p) { return p.selected = true; });
            }
            else {
                panels[0].selected = true;
                panels.filter(function (p, index) { return index != 0; }).forEach(function (p) { return p.selected = false; });
            }
        }
    };
    AccordionComponent.prototype.select = function (index) {
        var panel = this.getPanel(index);
        if (panel) {
            panel.select();
        }
    };
    AccordionComponent.prototype.unselect = function (index) {
        var panel = this.getPanel(index);
        if (panel) {
            panel.unselect();
        }
    };
    AccordionComponent.prototype.getPanel = function (index) {
        return this.panels.toArray()[index];
    };
    AccordionComponent.prototype.getPanels = function (indexs) {
        var panels = [];
        for (var _i = 0, indexs_1 = indexs; _i < indexs_1.length; _i++) {
            var index = indexs_1[_i];
            var panel = this.getPanel(index);
            if (panel) {
                panels.push(panel);
            }
        }
        return panels;
    };
    AccordionComponent.prototype.getPanelIndex = function (panel) {
        var panels = this.panels.toArray();
        for (var i = 0; i < panels.length; i++) {
            if (panels[i] === panel) {
                return i;
            }
        }
        return -1;
    };
    AccordionComponent.prototype.getSelectedIndex = function () {
        var panel = this.getSelectedPanel();
        return panel ? this.getPanelIndex(panel) : -1;
    };
    AccordionComponent.prototype.getSelectedPanel = function () {
        var pp = this.getSelectedPanels();
        return pp.length ? pp[0] : null;
    };
    AccordionComponent.prototype.getSelectedPanels = function () {
        return this.panels.filter(function (p) { return p.selected; });
    };
    return AccordionComponent;
}());
export { AccordionComponent };
AccordionComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-accordion',
                template: "\n\t\t<div class=\"accordion f-column f-full\" [class.accordion-noborder]=\"!border\">\n\t\t\t<ng-content></ng-content>\n\t\t</div>\n\t",
                host: {
                    'class': 'f-column'
                }
            },] },
];
/** @nocollapse */
AccordionComponent.ctorParameters = function () { return []; };
AccordionComponent.propDecorators = {
    'panels': [{ type: ContentChildren, args: [forwardRef(function () { return AccordionPanelComponent; }),] },],
    'border': [{ type: Input },],
    'multiple': [{ type: Input },],
    'panelSelect': [{ type: Output },],
    'panelUnselect': [{ type: Output },],
    'selectedIndex': [{ type: Input },],
};
//# sourceMappingURL=accordion.component.js.map