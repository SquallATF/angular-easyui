/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Component, ViewChildren, ContentChild, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { PaginationButtonComponent } from './pagination-button.component';
import { PageTemplateDirective } from '../base/template-base';
var PaginationComponent = (function () {
    function PaginationComponent() {
        this.pageList = [10, 20, 30, 40, 50];
        this.loading = false;
        this.showPageList = true;
        this.showPageInfo = true;
        this.showPageRefresh = true;
        this.links = 10;
        this.beforePageText = 'Page';
        this.afterPageText = 'of {pages}';
        this.displayMsg = 'Displaying {from} to {to} of {total} items';
        //@Input() layout: string[] = ['list','sep','first','prev','sep','tpl','sep','next','last','sep','refresh','info'];
        this.layout = ['first', 'prev', 'links', 'next', 'last', 'refresh'];
        this.pageChange = new EventEmitter();
        this.state = null;
        this._initialized = false;
        this._total = 1;
        this._pageSize = 10;
        this._pageNumber = 1;
    }
    Object.defineProperty(PaginationComponent.prototype, "total", {
        get: function () {
            return this._total;
        },
        set: function (value) {
            this._total = value;
            this.adjustPage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "pageSize", {
        get: function () {
            return this._pageSize;
        },
        set: function (value) {
            this._pageSize = +value;
            this.adjustPage();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "pageNumber", {
        get: function () {
            return this._pageNumber;
        },
        set: function (value) {
            this._pageNumber = +value;
            this.adjustPage();
        },
        enumerable: true,
        configurable: true
    });
    PaginationComponent.prototype.ngAfterViewInit = function () {
        this._initialized = true;
        this.state = {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize
        };
    };
    Object.defineProperty(PaginationComponent.prototype, "pageInfo", {
        get: function () {
            var info = this.displayMsg;
            info = info.replace(/{from}/, String(this.total == 0 ? 0 : this.pageSize * (this.pageNumber - 1) + 1));
            info = info.replace(/{to}/, String(Math.min(this.pageSize * (this.pageNumber), this.total)));
            info = info.replace(/{total}/, String(this.total));
            return info;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "pageCount", {
        get: function () {
            return !this.total ? 0 : Math.ceil(this.total / this.pageSize) || 1;
        },
        enumerable: true,
        configurable: true
    });
    PaginationComponent.prototype.isButton = function (name) {
        var aa = ['first', 'prev', 'next', 'last', 'refresh'];
        var index = aa.indexOf(name);
        return index >= 0;
    };
    PaginationComponent.prototype.adjustPage = function () {
        if (!this._initialized) {
            return;
        }
        if (this._pageNumber < 1) {
            this._pageNumber = 1;
        }
        if (this._pageNumber > this.pageCount) {
            this._pageNumber = this.pageCount;
        }
        if (this._total == 0) {
            this._pageNumber = 0;
        }
        var state = { pageNumber: this.pageNumber, pageSize: this.pageSize };
        if (this.state != null) {
            if (this.state.pageNumber != state.pageNumber || this.state.pageSize != state.pageSize) {
                this.state = state;
                this.pageChange.emit(this.state);
            }
        }
    };
    PaginationComponent.prototype.selectPage = function (page) {
        this.pageNumber = page;
    };
    PaginationComponent.prototype.refreshPage = function () {
        var state = Object.assign({ refresh: true }, this.state);
        if (state.pageNumber <= 0) {
            state.pageNumber = 1;
        }
        this.pageChange.emit(state);
    };
    return PaginationComponent;
}());
export { PaginationComponent };
PaginationComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-pagination',
                template: "\n\t\t<ng-container *ngFor=\"let name of layout\">\n\t\t\t<eui-pagination-list *ngIf=\"name=='list'\"></eui-pagination-list>\n\t\t\t<eui-pagination-link *ngIf=\"name=='links'\"></eui-pagination-link>\n\t\t\t<div class=\"pagination-btn-separator\" *ngIf=\"name=='sep'\"></div>\n\t\t\t<eui-pagination-button [name]=\"name\" *ngIf=\"isButton(name)\"></eui-pagination-button>\n\t\t\t<ng-template *ngIf=\"pageTemplate && name=='tpl'\" [euiPaginationTemplate]=\"pageTemplate.template\" [pagination]=\"this\"></ng-template>\n\t\t\t<div class=\"f-full\" *ngIf=\"name=='info'\">\n\t\t\t\t<div class=\"pagination-info\">{{pageInfo}}</div>\n\t\t\t</div>\n\t\t</ng-container>\n\t",
                host: {
                    'class': 'f-row f-content-center'
                }
            },] },
];
/** @nocollapse */
PaginationComponent.ctorParameters = function () { return []; };
PaginationComponent.propDecorators = {
    'buttons': [{ type: ViewChildren, args: [forwardRef(function () { return PaginationButtonComponent; }),] },],
    'pageTemplate': [{ type: ContentChild, args: [PageTemplateDirective,] },],
    'pageList': [{ type: Input },],
    'loading': [{ type: Input },],
    'showPageList': [{ type: Input },],
    'showPageInfo': [{ type: Input },],
    'showPageRefresh': [{ type: Input },],
    'links': [{ type: Input },],
    'beforePageText': [{ type: Input },],
    'afterPageText': [{ type: Input },],
    'displayMsg': [{ type: Input },],
    'layout': [{ type: Input },],
    'pageChange': [{ type: Output },],
    'total': [{ type: Input },],
    'pageSize': [{ type: Input },],
    'pageNumber': [{ type: Input },],
};
//# sourceMappingURL=pagination.component.js.map