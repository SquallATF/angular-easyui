/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Component, ContentChild, ViewChildren, EventEmitter, Input, Output } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';
import { PageTemplateDirective } from '../base/template-base';
var ListBaseComponent = (function () {
    function ListBaseComponent() {
        this.border = true;
        this.loading = false;
        this.loadMsg = 'Processing, please wait ...';
        this.pagination = false;
        this.pagePosition = 'bottom';
        this.pageOptions = {};
        this.lazy = false;
        this.virtualScroll = false;
        this.rowHeight = 30;
        this.pageNumber = 1;
        this.pageSize = 10;
        this.total = 0;
        this.idField = null;
        this.selectionMode = null;
        this.selectionChange = new EventEmitter();
        this.pageChange = new EventEmitter();
        this.rowSelect = new EventEmitter();
        this.rowUnselect = new EventEmitter();
        this.rowClick = new EventEmitter();
        this._initialized = false;
        this.selectedRows = [];
        this.rows = [];
        this._data = [];
    }
    Object.defineProperty(ListBaseComponent.prototype, "selection", {
        get: function () {
            if (this.selectionMode == 'single') {
                return this.selectedRows[0] || null;
            }
            else if (this.selectionMode == 'multiple') {
                return this.selectedRows;
            }
            else {
                return null;
            }
        },
        set: function (value) {
            if (value == null) {
                this.selectedRows = [];
                return;
            }
            if (this.selectionMode == 'single') {
                this.selectedRows = [value];
            }
            else if (this.selectionMode == 'multiple') {
                this.selectedRows = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListBaseComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            if (this._initialized) {
                this.setData(value);
            }
            else {
                this._data = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    ListBaseComponent.prototype.ngOnInit = function () {
        if (this.pageOptions.total) {
            this.total = this.pageOptions.total;
        }
        if (this.pageOptions.pageNumber) {
            this.pageNumber = this.pageOptions.pageNumber;
        }
        if (this.pageOptions.pageSize) {
            this.pageSize = this.pageOptions.pageSize;
        }
        this.pageOptions.pageTemplate = this.pageTemplate;
    };
    ListBaseComponent.prototype.ngAfterContentInit = function () {
        this._initialized = true;
        this.data = this.data;
    };
    ListBaseComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.pageRefs.forEach(function (p) {
            Object.assign(p, _this.pageOptions);
        });
    };
    ListBaseComponent.prototype.setData = function (value) {
        if (value == null) {
            value = [];
        }
        this._data = value;
        if (!this.lazy) {
            this.sortData();
        }
        if (this.pagination) {
            if (this.lazy) {
                if (this._data.length) {
                    this.rows = this._data.slice(0, this.pageSize);
                }
                else {
                    if (this.total) {
                        this.onPageChange({
                            pageNumber: this.pageNumber,
                            pageSize: this.pageSize
                        });
                    }
                    else {
                        this.rows = [];
                    }
                }
            }
            else {
                this.total = this._data.length;
                var start = (this.pageNumber - 1) * this.pageSize;
                this.rows = this._data.slice(start, start + this.pageSize);
            }
        }
        else {
            this.rows = this._data;
        }
    };
    ListBaseComponent.prototype.onPageChange = function (event) {
        if (this.pageState != null && !event.refresh) {
            if (this.pageState.pageNumber == event.pageNumber && this.pageState.pageSize == event.pageSize) {
                return;
            }
        }
        this.pageState = event;
        this.pageNumber = event.pageNumber;
        this.pageSize = event.pageSize;
        if (!this.lazy) {
            var start = (this.pageNumber - 1) * this.pageSize;
            this.rows = this._data.slice(start, start + (+this.pageSize));
        }
        this.pageChange.emit(event);
    };
    ListBaseComponent.prototype.onVirtualPageChange = function (event) {
        this.pageChange.emit(event);
    };
    ListBaseComponent.prototype.onRowClick = function (row, event) {
        this.rowClick.emit(row);
        if (this.selectionMode == 'single') {
            this.selectRow(row);
        }
        else if (this.selectionMode == 'multiple') {
            if (this.isSelected(row)) {
                this.unselectRow(row);
            }
            else {
                this.selectRow(row);
            }
        }
    };
    ListBaseComponent.prototype.sortData = function () {
    };
    ListBaseComponent.prototype.doEnter = function () {
        if (this.highlightRow && this.selectionMode) {
            if (this.selectionMode == 'single') {
                this.selectRow(this.highlightRow);
            }
            else if (this.selectionMode == 'multiple') {
                if (this.isSelected(this.highlightRow)) {
                    this.unselectRow(this.highlightRow);
                }
                else {
                    this.selectRow(this.highlightRow);
                }
            }
        }
    };
    ListBaseComponent.prototype.getSelectedIndex = function (row) {
        if (this.idField) {
            for (var i = 0; i < this.selectedRows.length; i++) {
                if (this.selectedRows[i][this.idField] == row[this.idField]) {
                    this.selectedRows.splice(i, 1, row);
                    return i;
                }
            }
            return -1;
        }
        else {
            return this.selectedRows.indexOf(row);
        }
    };
    ListBaseComponent.prototype.isSelected = function (row) {
        var index = this.getSelectedIndex(row);
        return index != -1;
    };
    ListBaseComponent.prototype.selectRow = function (row) {
        if (!this.isSelected(row)) {
            if (this.selectionMode == 'single') {
                if (this.selection) {
                    this.rowUnselect.emit(this.selection);
                }
                this.selectedRows = [row];
            }
            else if (this.selectionMode == 'multiple') {
                this.selectedRows.push(row);
            }
            this.rowSelect.emit(row);
            this.selectionChange.emit(this.selection);
        }
    };
    ListBaseComponent.prototype.unselectRow = function (row) {
        var index = this.getSelectedIndex(row);
        if (index >= 0) {
            this.selectedRows.splice(index, 1);
            this.rowUnselect.emit(row);
            this.selectionChange.emit(this.selection);
        }
    };
    ListBaseComponent.prototype.clearSelections = function () {
        if (this.selectedRows.length) {
            this.selectedRows = [];
            this.selectionChange.emit(this.selection);
        }
    };
    ListBaseComponent.prototype.navRow = function (step) {
        if (!this.rows.length) {
            return;
        }
        var index = this.rows.indexOf(this.highlightRow);
        if (index == -1) {
            index = 0;
        }
        else {
            index += step;
            if (index >= this.rows.length) {
                index = this.rows.length - 1;
            }
            else if (index < 0) {
                index = 0;
            }
        }
        this.highlightRow = this.rows[index];
    };
    return ListBaseComponent;
}());
export { ListBaseComponent };
ListBaseComponent.decorators = [
    { type: Component, args: [{
                template: ''
            },] },
];
/** @nocollapse */
ListBaseComponent.ctorParameters = function () { return []; };
ListBaseComponent.propDecorators = {
    'pageTemplate': [{ type: ContentChild, args: [PageTemplateDirective,] },],
    'pageRefs': [{ type: ViewChildren, args: [PaginationComponent,] },],
    'border': [{ type: Input },],
    'loading': [{ type: Input },],
    'loadMsg': [{ type: Input },],
    'pagination': [{ type: Input },],
    'pagePosition': [{ type: Input },],
    'pageOptions': [{ type: Input },],
    'lazy': [{ type: Input },],
    'virtualScroll': [{ type: Input },],
    'rowHeight': [{ type: Input },],
    'pageNumber': [{ type: Input },],
    'pageSize': [{ type: Input },],
    'total': [{ type: Input },],
    'idField': [{ type: Input },],
    'selectionMode': [{ type: Input },],
    'selectionChange': [{ type: Output },],
    'pageChange': [{ type: Output },],
    'rowSelect': [{ type: Output },],
    'rowUnselect': [{ type: Output },],
    'rowClick': [{ type: Output },],
    'selection': [{ type: Input },],
    'data': [{ type: Input },],
};
//# sourceMappingURL=list-base.component.js.map