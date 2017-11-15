/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Component, ViewChild, ContentChildren, forwardRef, Input, Output, EventEmitter, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';
import { MenuItemComponent } from './menu-item.component';
import { domHelper } from '../base/domhelper';
var MenuComponent = (function () {
    function MenuComponent(hostRef, renderer, cdRef) {
        this.hostRef = hostRef;
        this.renderer = renderer;
        this.cdRef = cdRef;
        this.menuCls = null;
        this.left = null;
        this.top = null;
        this.zIndex = MenuComponent.zIndex++;
        this.inline = false;
        this.noline = false;
        this.closed = true;
        this.itemClick = new EventEmitter();
        this.timer = null;
        this.duration = 100;
    }
    MenuComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.menuWidth = domHelper.toStyleValue(this.menuWidth);
        this.initItems();
        this.subItems.changes.subscribe(function () {
            _this.initItems();
        });
    };
    MenuComponent.prototype.ngOnDestroy = function () {
        if (this.containerRef) {
            this.hostRef.nativeElement.appendChild(this.containerRef.nativeElement);
        }
    };
    MenuComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (!this.inline) {
            document.body.appendChild(this.containerRef.nativeElement);
            this.renderer.listen('document', 'click', function (event) {
                if (!_this.closed) {
                    event.preventDefault();
                    event.stopPropagation();
                    if (domHelper.isChild(event.target, _this.containerRef.nativeElement)) {
                        return;
                    }
                    _this.hide();
                }
            });
        }
    };
    MenuComponent.prototype.onMouseOver = function (event) {
        this.closed = false;
        clearTimeout(this.timer);
    };
    MenuComponent.prototype.onMouseOut = function (event) {
        this.delayHide();
    };
    MenuComponent.prototype.initItems = function () {
        var _this = this;
        this.subItems.forEach(function (item) {
            item.parentMenu = _this;
        });
    };
    MenuComponent.prototype.findItem = function (value) {
        var finder = function (items, field) {
            if (field === void 0) { field = 'value'; }
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var item_1 = items_1[_i];
                if (item_1[field] == value) {
                    return item_1;
                }
                else if (item_1.subMenu) {
                    item_1 = finder(item_1.subMenu.subItems.toArray());
                    if (item_1) {
                        return item_1;
                    }
                }
            }
            return null;
        };
        var item = finder(this.subItems.toArray(), 'value');
        if (!item) {
            item = finder(this.subItems.toArray(), 'text');
        }
        return item;
    };
    MenuComponent.prototype.unhighlight = function () {
        this.subItems.forEach(function (item) {
            item.unhighlight();
        });
    };
    MenuComponent.prototype.show = function (left, top) {
        this.closed = false;
        this.left = left;
        this.top = top;
        this.zIndex = MenuComponent.zIndex++;
        clearTimeout(this.timer);
    };
    MenuComponent.prototype.showAt = function (target, align) {
        if (align === void 0) { align = 'left'; }
        this.show(0, 0);
        this.alignTo(target, align);
    };
    MenuComponent.prototype.showContextMenu = function (left, top) {
        this.show(left, top);
        this.alignContextMenu();
    };
    MenuComponent.prototype.hide = function () {
        this.closed = true;
    };
    MenuComponent.prototype.delayHide = function () {
        var _this = this;
        this.timer = setTimeout(function () {
            _this.closed = true;
        }, this.duration);
    };
    MenuComponent.prototype.alignTo = function (target, align) {
        if (align === void 0) { align = 'left'; }
        this.cdRef.detectChanges();
        var view = domHelper.getViewport();
        var pos = domHelper.offset(target);
        var targetWidth = domHelper.outerWidth(target);
        var targetHeight = domHelper.outerHeight(target);
        var menuWidth = domHelper.outerWidth(this.containerRef.nativeElement);
        var menuHeight = domHelper.outerHeight(this.containerRef.nativeElement);
        var left = align == 'left' ? pos.left : pos.left + targetWidth - menuWidth;
        var top = pos.top + targetHeight;
        if (left + menuWidth > view.width + domHelper.getScrollLeft()) {
            left = pos.left + targetWidth - menuWidth;
        }
        else if (left < 0) {
            left = pos.left;
        }
        if (top + menuHeight > view.height + domHelper.getScrollTop()) {
            top = pos.top - menuHeight - 1;
        }
        if (top < domHelper.getScrollTop()) {
            top = domHelper.getScrollTop() + 1;
        }
        this.left = left;
        this.top = top;
    };
    MenuComponent.prototype.alignContextMenu = function () {
        this.cdRef.detectChanges();
        var view = domHelper.getViewport();
        var width = domHelper.outerWidth(this.containerRef.nativeElement);
        var height = domHelper.outerHeight(this.containerRef.nativeElement);
        if (this.left + width > view.width + domHelper.getScrollLeft()) {
            this.left -= width;
        }
        if (height > view.height + domHelper.getScrollTop()) {
            this.top = domHelper.getScrollTop() + 1;
        }
        else {
            if (this.top + height > view.height + domHelper.getScrollTop()) {
                this.top = view.height + domHelper.getScrollTop() - height - 1;
            }
        }
    };
    return MenuComponent;
}());
export { MenuComponent };
MenuComponent.zIndex = 99999;
MenuComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-menu',
                template: "\n\t\t<div #container class=\"menu-container f-inline-row\"\n\t\t\t\t[class.menu-noline]=\"noline\"\n\t\t\t\t[style.width]=\"menuWidth\"\n\t\t\t\t[style.left.px]=\"left\"\n\t\t\t\t[style.top.px]=\"top\"\n\t\t\t\t[style.zIndex]=\"zIndex\"\n\t\t\t\t[style.display]=\"inline ? null : (closed ? 'none' : 'block')\"\n\t\t\t\t(mouseover)=\"onMouseOver($event)\"\n\t\t\t\t(mouseout)=\"onMouseOut($event)\">\n\t\t\t<div class=\"menu-shadow\"></div>\n\t\t\t<div class=\"menu-line\"></div>\n\t\t\t<div class=\"menu f-column f-full\" [ngClass]=\"menuCls\" [ngStyle]=\"menuStyle\">\n\t\t\t\t<ng-content></ng-content>\n\t\t\t</div>\n\t\t</div>\n\t",
                host: {
                    'class': 'menu-inline'
                }
            },] },
];
/** @nocollapse */
MenuComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer2, },
    { type: ChangeDetectorRef, },
]; };
MenuComponent.propDecorators = {
    'containerRef': [{ type: ViewChild, args: ['container',] },],
    'subItems': [{ type: ContentChildren, args: [forwardRef(function () { return MenuItemComponent; }),] },],
    'menuCls': [{ type: Input },],
    'menuStyle': [{ type: Input },],
    'menuWidth': [{ type: Input },],
    'left': [{ type: Input },],
    'top': [{ type: Input },],
    'zIndex': [{ type: Input },],
    'inline': [{ type: Input },],
    'noline': [{ type: Input },],
    'closed': [{ type: Input },],
    'itemClick': [{ type: Output },],
};
//# sourceMappingURL=menu.component.js.map