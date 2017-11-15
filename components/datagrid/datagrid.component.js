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
import { Component, ContentChild, Input, Output, EventEmitter } from '@angular/core';
import { GridBaseComponent } from '../gridbase/grid-base.component';
import { GroupTemplateDirective, DetailTemplateDirective } from '../base/template-base';
import { domHelper } from '../base/domhelper';
export var DATAGRID_TEMPLATE = "\n\t<div class=\"panel-body panel-body-noheader datagrid datagrid-wrap f-full f-column\" \n\t\t\t[class.panel-body-noborder]=\"!border\">\n\t\t<eui-pagination *ngIf=\"pagination && (pagePosition=='both' || pagePosition=='top')\" class=\"datagrid-pager datagrid-pager-top f-noshrink\" \n\t\t\t\t[total]=\"total\" \n\t\t\t\t[pageSize]=\"pageSize\" \n\t\t\t\t[pageNumber]=\"pageNumber\" \n\t\t\t\t[loading]=\"loading\"\n\t\t\t\t(pageChange)=\"onPageChange($event)\"></eui-pagination>\n\t\t<div #view class=\"datagrid-view f-row f-full\">\n\t\t\t<eui-datagrid-view #view1 *ngIf=\"leftGroup || leftColumns\" \n\t\t\t\t\t[viewIndex]=\"1\" \n\t\t\t\t\t[columnGroup]=\"leftGroup\" \n\t\t\t\t\t[columns]=\"leftColumns\" \n\t\t\t\t\t[rows]=\"!virtualScroll && rows\" \n\t\t\t\t\t[footerRows]=\"footerRows\"\n\t\t\t\t\t[style.width]=\"leftFrozenWidth\"></eui-datagrid-view>\n\t\t\t<eui-datagrid-view #view2 \n\t\t\t\t\t[viewIndex]=\"2\" \n\t\t\t\t\t[columnGroup]=\"centerGroup\" \n\t\t\t\t\t[columns]=\"centerColumns\" \n\t\t\t\t\t[rows]=\"rows\"\n\t\t\t\t\t[footerRows]=\"footerRows\"\n\t\t\t\t\t(bodyScroll)=\"onBodyScroll($event)\"></eui-datagrid-view>\n\t\t\t<eui-datagrid-view #view3 *ngIf=\"rightGroup || rightColumns\" \n\t\t\t\t\t[viewIndex]=\"3\" \n\t\t\t\t\t[columnGroup]=\"rightGroup\" \n\t\t\t\t\t[columns]=\"rightColumns\" \n\t\t\t\t\t[rows]=\"!virtualScroll && rows\" \n\t\t\t\t\t[footerRows]=\"footerRows\"\n\t\t\t\t\t[style.width]=\"rightFrozenWidth\"></eui-datagrid-view>\n\t\t</div>\n\t\t<eui-pagination *ngIf=\"pagination && (pagePosition=='both' || pagePosition=='bottom')\" class=\"datagrid-pager f-noshrink\" \n\t\t\t\t[total]=\"total\" \n\t\t\t\t[pageSize]=\"pageSize\" \n\t\t\t\t[pageNumber]=\"pageNumber\" \n\t\t\t\t[loading]=\"loading\"\n\t\t\t\t(pageChange)=\"onPageChange($event)\"></eui-pagination>\n\t</div>\n\t<div *ngIf=\"loading\" class=\"datagrid-loading f-row\">\n\t\t<div class=\"datagrid-mask\"></div>\n\t\t<div class=\"datagrid-mask-msg\">{{loadMsg}}</div>\n\t</div>\n";
var DataGridComponent = (function (_super) {
    __extends(DataGridComponent, _super);
    function DataGridComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.expanderWidth = 30;
        _this.rowExpand = new EventEmitter();
        _this.rowCollapse = new EventEmitter();
        _this.groupExpand = new EventEmitter();
        _this.groupCollapse = new EventEmitter();
        _this.groupData = null;
        _this.expandedRows = [];
        return _this;
    }
    DataGridComponent.prototype.setData = function (value) {
        if (value == null) {
            value = [];
        }
        if (this.groupField) {
            if (!this.isGrouped(value)) {
                this.groupData = this.makeGroup(value);
                value = this.makeGroupedRows();
            }
        }
        _super.prototype.setData.call(this, value);
    };
    DataGridComponent.prototype.ngAfterViewInit = function () {
        _super.prototype.ngAfterViewInit.call(this);
        if (this.virtualScroll) {
            this.updateFrozenView(this.view2.body.scrollTop, this.rows);
        }
    };
    DataGridComponent.prototype.updateFrozenView = function (scrollTop, rows) {
        if (this.view1) {
            this.view1.scrollTop = scrollTop;
            if (rows) {
                this.view1.rows = rows;
            }
        }
        if (this.view3) {
            this.view3.scrollTop = scrollTop;
            if (rows) {
                this.view3.rows = rows;
            }
        }
    };
    DataGridComponent.prototype.onBodyScroll = function (event) {
        this.updateFrozenView(event.top, event.items);
    };
    DataGridComponent.prototype.getRowIndex = function (row) {
        var body = this.view2.body;
        var index = body.currRows.indexOf(row);
        if (index == -1) {
            return -1;
        }
        if (body.vscroll) {
            return index + body.vscroll.startIndex;
        }
        else if (this.pagination) {
            return index + (this.pageNumber - 1) * this.pageSize;
        }
        else {
            return index;
        }
    };
    DataGridComponent.prototype.getAbsoluteIndex = function (index) {
        var body = this.view2.body;
        if (body.vscroll) {
            return index + body.vscroll.startIndex;
        }
        else if (this.pagination) {
            return index + (this.pageNumber - 1) * this.pageSize;
        }
        else {
            return index;
        }
    };
    DataGridComponent.prototype.scrollTo = function (row) {
        var index = this.view2.body.currRows.indexOf(row);
        if (index >= 0) {
            var body = this.view2.body.bodyRef.nativeElement;
            var tr = body.querySelector('table>tbody>tr:nth-child(' + (index + 1) + ')');
            domHelper.scrollTo(body, tr);
            this.updateFrozenView(this.view2.body.scrollTop, this.rows);
        }
    };
    DataGridComponent.prototype.sortData = function () {
        var _this = this;
        if (!this.sorts || !this.sorts.length) {
            return;
        }
        var cc = [];
        for (var i = 0; i < this.sorts.length; i++) {
            cc.push(this.findColumn(this.sorts[i].field));
        }
        var sortFunc = function (a, b) {
            return a == b ? 0 : (a > b ? 1 : -1);
        };
        this.data.sort(function (r1, r2) {
            var r = 0;
            for (var i = 0; i < _this.sorts.length; i++) {
                var sort = _this.sorts[i];
                if (cc[i] && cc[i].sorter) {
                    r = cc[i].sorter(r1, r2);
                }
                else {
                    r = sortFunc(r1[sort.field], r2[sort.field]);
                }
                r = r * (sort.order == 'asc' ? 1 : -1);
                if (r != 0) {
                    return r;
                }
            }
            return r;
        });
    };
    DataGridComponent.prototype.isGroupRow = function (row) {
        return row._group_row ? true : false;
    };
    DataGridComponent.prototype.isGrouped = function (data) {
        if (data && data.length) {
            if (this.isGroupRow(data[0])) {
                return true;
            }
        }
        return false;
    };
    DataGridComponent.prototype.getGroup = function (value, groups) {
        if (groups === void 0) { groups = null; }
        if (!groups) {
            groups = this.groupData;
        }
        for (var _i = 0, groups_1 = groups; _i < groups_1.length; _i++) {
            var group = groups_1[_i];
            if (group.value == value) {
                return group;
            }
        }
        return null;
    };
    DataGridComponent.prototype.makeGroup = function (data) {
        var groups = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var row = data_1[_i];
            if (!this.isGroupRow(row)) {
                var group = this.getGroup(row[this.groupField], groups);
                if (group) {
                    group.rows.push(row);
                }
                else {
                    group = {
                        value: row[this.groupField],
                        collapsed: false,
                        rows: [row]
                    };
                    groups.push(group);
                }
            }
        }
        return groups;
    };
    DataGridComponent.prototype.makeGroupedRows = function () {
        var rows = [];
        for (var _i = 0, _a = this.groupData; _i < _a.length; _i++) {
            var group = _a[_i];
            rows.push({
                _group_row: true,
                value: group.value,
                rows: group.rows,
                collapsed: group.collapsed
            });
            if (!group.collapsed) {
                rows = rows.concat(group.rows);
            }
        }
        return rows;
    };
    DataGridComponent.prototype.collapseGroup = function (value) {
        var group = this.getGroup(value);
        if (group) {
            group.collapsed = true;
            this.data = this.makeGroupedRows();
            this.groupCollapse.emit(group);
        }
    };
    DataGridComponent.prototype.expandGroup = function (value) {
        var group = this.getGroup(value);
        if (group) {
            group.collapsed = false;
            this.data = this.makeGroupedRows();
            this.groupExpand.emit(group);
        }
    };
    DataGridComponent.prototype.toggleGroup = function (value) {
        var group = this.getGroup(value);
        if (group) {
            if (group.collapsed) {
                this.expandGroup(value);
            }
            else {
                this.collapseGroup(value);
            }
            /*
            group.collapsed = !group.collapsed;
            this.data = this.makeGroupedRows();
            */
        }
    };
    DataGridComponent.prototype.getExpandedIndex = function (row) {
        if (this.idField) {
            for (var i = 0; i < this.expandedRows.length; i++) {
                if (this.expandedRows[i][this.idField] == row[this.idField]) {
                    return i;
                }
            }
            return -1;
        }
        else {
            return this.expandedRows.indexOf(row);
        }
    };
    DataGridComponent.prototype.isRowExpanded = function (row) {
        var index = this.getExpandedIndex(row);
        return index != -1;
    };
    DataGridComponent.prototype.collapseRow = function (row) {
        var index = this.getExpandedIndex(row);
        if (index >= 0) {
            this.expandedRows.splice(index, 1);
            this.rowCollapse.emit(row);
        }
    };
    DataGridComponent.prototype.expandRow = function (row) {
        if (!this.isRowExpanded(row)) {
            this.expandedRows.push(row);
            this.rowExpand.emit(row);
        }
    };
    DataGridComponent.prototype.toggleRow = function (row) {
        if (this.isRowExpanded(row)) {
            this.collapseRow(row);
        }
        else {
            this.expandRow(row);
        }
    };
    return DataGridComponent;
}(GridBaseComponent));
export { DataGridComponent };
DataGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-datagrid',
                template: DATAGRID_TEMPLATE,
                host: {
                    'class': 'f-column'
                }
            },] },
];
/** @nocollapse */
DataGridComponent.ctorParameters = function () { return []; };
DataGridComponent.propDecorators = {
    'groupTemplate': [{ type: ContentChild, args: [GroupTemplateDirective,] },],
    'detailTemplate': [{ type: ContentChild, args: [DetailTemplateDirective,] },],
    'rowCss': [{ type: Input },],
    'idField': [{ type: Input },],
    'groupField': [{ type: Input },],
    'expanderWidth': [{ type: Input },],
    'rowExpand': [{ type: Output },],
    'rowCollapse': [{ type: Output },],
    'groupExpand': [{ type: Output },],
    'groupCollapse': [{ type: Output },],
};
//# sourceMappingURL=datagrid.component.js.map