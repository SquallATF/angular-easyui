/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Component, ViewChild, Input, Output, EventEmitter } from '@angular/core';
var GridViewComponent = (function () {
    function GridViewComponent() {
        this.viewIndex = 2;
        this.bodyScroll = new EventEmitter();
    }
    Object.defineProperty(GridViewComponent.prototype, "viewCls", {
        get: function () {
            return 'f-column datagrid-view' + this.viewIndex + (this.viewIndex == 2 ? ' f-full' : ' f-noshrink');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridViewComponent.prototype, "scrollTop", {
        get: function () {
            return this.body.scrollTop;
        },
        set: function (value) {
            this.body.scrollTop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridViewComponent.prototype, "headerHeight", {
        get: function () {
            return this.header.height;
        },
        set: function (value) {
            this.header.height = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridViewComponent.prototype, "headerPaddingWidth", {
        get: function () {
            if (this.viewIndex == 2) {
                var width = this.body.scrollbarWidth;
                if (width > 0) {
                    return width;
                }
            }
            return null;
        },
        enumerable: true,
        configurable: true
    });
    GridViewComponent.prototype.onBodyScroll = function (event) {
        if (this.header) {
            this.header.scrollLeft = event.left;
        }
        if (this.footer) {
            this.footer.scrollLeft = event.left;
        }
        this.bodyScroll.emit(event);
    };
    return GridViewComponent;
}());
export { GridViewComponent };
GridViewComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-grid-view',
                template: "\n\t\t<eui-grid-header #header [columnGroup]=\"columnGroup\" [columns]=\"columns\" [paddingWidth]=\"headerPaddingWidth\"></eui-grid-header>\n\t\t<eui-grid-body #body [columns]=\"columns\" align=\"center\" [rows]=\"rows\" (bodyScroll)=\"onBodyScroll($event)\"></eui-grid-body>\n\t\t<eui-grid-footer #footer [columns]=\"columns\" [rows]=\"footerRows\"></eui-grid-footer>\n\t",
                host: {
                    '[class]': 'viewCls'
                }
            },] },
];
/** @nocollapse */
GridViewComponent.ctorParameters = function () { return []; };
GridViewComponent.propDecorators = {
    'header': [{ type: ViewChild, args: ['header',] },],
    'footer': [{ type: ViewChild, args: ['footer',] },],
    'body': [{ type: ViewChild, args: ['body',] },],
    'columns': [{ type: Input },],
    'columnGroup': [{ type: Input },],
    'viewIndex': [{ type: Input },],
    'rows': [{ type: Input },],
    'footerRows': [{ type: Input },],
    'bodyScroll': [{ type: Output },],
};
//# sourceMappingURL=grid-view.component.js.map