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
import { Component, Input, Host, Inject, forwardRef } from '@angular/core';
import { PaginationComponent } from './pagination.component';
import { LinkButtonComponent, LINKBUTTON_TEMPLATE } from '../linkbutton/linkbutton.component';
var PaginationButtonComponent = (function (_super) {
    __extends(PaginationButtonComponent, _super);
    function PaginationButtonComponent(pagination) {
        var _this = _super.call(this) || this;
        _this.pagination = pagination;
        _this.plain = true;
        _this._disabled = false;
        _this.click.subscribe(function () {
            if (_this.name == 'first') {
                _this.pagination.selectPage(1);
            }
            else if (_this.name == 'prev') {
                _this.pagination.selectPage(_this.pagination.pageNumber - 1);
            }
            else if (_this.name == 'next') {
                _this.pagination.selectPage(_this.pagination.pageNumber + 1);
            }
            else if (_this.name == 'last') {
                _this.pagination.selectPage(_this.pagination.pageCount);
            }
            else if (_this.name == 'refresh') {
                _this.pagination.refreshPage();
            }
        });
        return _this;
    }
    Object.defineProperty(PaginationButtonComponent.prototype, "name", {
        get: function () {
            return this._name;
        },
        set: function (value) {
            this._name = value;
            this.iconCls = 'pagination-' + this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationButtonComponent.prototype, "iconCls", {
        get: function () {
            if (this.name == 'refresh') {
                if (this.pagination.loading) {
                    return 'pagination-loading';
                }
                else {
                    return 'pagination-load';
                }
            }
            return this._iconCls;
        },
        set: function (value) {
            this._iconCls = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationButtonComponent.prototype, "disabled", {
        get: function () {
            if (this.name == 'first' || this.name == 'prev') {
                return !this.pagination.total || this.pagination.pageNumber == 1;
            }
            else if (this.name == 'next' || this.name == 'last') {
                return this.pagination.pageNumber == this.pagination.pageCount;
            }
            return this._disabled;
        },
        set: function (value) {
            this._disabled = value;
        },
        enumerable: true,
        configurable: true
    });
    return PaginationButtonComponent;
}(LinkButtonComponent));
export { PaginationButtonComponent };
PaginationButtonComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-pagination-button',
                template: LINKBUTTON_TEMPLATE,
                host: {
                    'class': 'f-inline-row'
                }
            },] },
];
/** @nocollapse */
PaginationButtonComponent.ctorParameters = function () { return [
    { type: PaginationComponent, decorators: [{ type: Host }, { type: Inject, args: [forwardRef(function () { return PaginationComponent; }),] },] },
]; };
PaginationButtonComponent.propDecorators = {
    'plain': [{ type: Input },],
    'name': [{ type: Input },],
    'iconCls': [{ type: Input },],
    'disabled': [{ type: Input },],
};
//# sourceMappingURL=pagination-button.component.js.map