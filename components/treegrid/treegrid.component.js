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
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GridBaseComponent } from '../gridbase/grid-base.component';
import { treeHelper } from '../base/treehelper';
export var TREEGRID_TEMPLATE = "\n\t<div class=\"panel-body panel-body-noheader datagrid datagrid-wrap f-full f-column\" \n\t\t\t[class.panel-body-noborder]=\"!border\">\n\t\t<eui-pagination *ngIf=\"pagination && (pagePosition=='both' || pagePosition=='top')\" class=\"datagrid-pager datagrid-pager-top f-noshrink\" \n\t\t\t\t[total]=\"total\" \n\t\t\t\t[pageSize]=\"pageSize\" \n\t\t\t\t[pageNumber]=\"pageNumber\" \n\t\t\t\t[loading]=\"loading\"\n\t\t\t\t(pageChange)=\"onPageChange($event)\"></eui-pagination>\n\t\t<div #view class=\"datagrid-view f-row f-full\">\n\t\t\t<eui-treegrid-view #view1 *ngIf=\"leftGroup || leftColumns\" \n\t\t\t\t\t[viewIndex]=\"1\" \n\t\t\t\t\t[columnGroup]=\"leftGroup\" \n\t\t\t\t\t[columns]=\"leftColumns\" \n\t\t\t\t\t[rows]=\"rows\" \n\t\t\t\t\t[footerRows]=\"footerRows\"\n\t\t\t\t\t[style.width]=\"leftFrozenWidth\"></eui-treegrid-view>\n\t\t\t<eui-treegrid-view #view2 \n\t\t\t\t\t[viewIndex]=\"2\" \n\t\t\t\t\t[columnGroup]=\"centerGroup\" \n\t\t\t\t\t[columns]=\"centerColumns\" \n\t\t\t\t\t[rows]=\"rows\"\n\t\t\t\t\t[footerRows]=\"footerRows\"\n\t\t\t\t\t(bodyScroll)=\"onBodyScroll($event)\"></eui-treegrid-view>\n\t\t\t<eui-treegrid-view #view3 *ngIf=\"rightGroup || rightColumns\" \n\t\t\t\t\t[viewIndex]=\"3\" \n\t\t\t\t\t[columnGroup]=\"rightGroup\" \n\t\t\t\t\t[columns]=\"rightColumns\" \n\t\t\t\t\t[rows]=\"rows\" \n\t\t\t\t\t[footerRows]=\"footerRows\"\n\t\t\t\t\t[style.width]=\"rightFrozenWidth\"></eui-treegrid-view>\n\t\t</div>\n\t\t<eui-pagination *ngIf=\"pagination && (pagePosition=='both' || pagePosition=='bottom')\" class=\"datagrid-pager f-noshrink\" \n\t\t\t\t[total]=\"total\" \n\t\t\t\t[pageSize]=\"pageSize\" \n\t\t\t\t[pageNumber]=\"pageNumber\" \n\t\t\t\t[loading]=\"loading\"\n\t\t\t\t(pageChange)=\"onPageChange($event)\"></eui-pagination>\n\t</div>\n\t<div *ngIf=\"loading\" class=\"datagrid-loading f-row\">\n\t\t<div class=\"datagrid-mask\"></div>\n\t\t<div class=\"datagrid-mask-msg\">{{loadMsg}}</div>\n\t</div>\n";
var TreeGridComponent = (function (_super) {
    __extends(TreeGridComponent, _super);
    function TreeGridComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selectionMode = 'single';
        _this.checkbox = false;
        _this.cascadeCheck = true;
        _this.rowClick = new EventEmitter();
        _this.rowExpand = new EventEmitter();
        _this.rowCollapse = new EventEmitter();
        _this.rowCheck = new EventEmitter();
        _this.rowUncheck = new EventEmitter();
        return _this;
    }
    Object.defineProperty(TreeGridComponent.prototype, "checkedRows", {
        get: function () {
            return this.getCheckedRows();
        },
        enumerable: true,
        configurable: true
    });
    TreeGridComponent.prototype.getCheckedRows = function (state) {
        if (state === void 0) { state = 'checked'; }
        var rows = [];
        treeHelper.cascadeCheck = this.cascadeCheck;
        treeHelper.forNodes(this.data, function (row) {
            if (row.checkState == state) {
                rows.push(row);
            }
        });
        return rows;
    };
    TreeGridComponent.prototype.selectRow = function (row) {
        _super.prototype.selectRow.call(this, row);
        /*
        if (this.selection != row){
            this.selection = row;
            this.selectionChange.emit(row);
        }
        */
    };
    TreeGridComponent.prototype.checkRow = function (row) {
        var _this = this;
        treeHelper.cascadeCheck = this.cascadeCheck;
        treeHelper.checkNode(row, function () {
            _this.rowCheck.emit(row);
        });
    };
    TreeGridComponent.prototype.uncheckRow = function (row) {
        var _this = this;
        treeHelper.cascadeCheck = this.cascadeCheck;
        treeHelper.uncheckNode(row, function () {
            _this.rowUncheck.emit(row);
        });
    };
    TreeGridComponent.prototype.adjustCheck = function (row) {
        treeHelper.cascadeCheck = this.cascadeCheck;
        treeHelper.adjustCheck(row);
    };
    TreeGridComponent.prototype.sortData = function () {
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
        var _sort = function (rows) {
            rows.sort(function (r1, r2) {
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
            rows.forEach(function (row) {
                if (row.children && row.children.length) {
                    _sort(row.children);
                }
            });
        };
        _sort(this.data);
    };
    return TreeGridComponent;
}(GridBaseComponent));
export { TreeGridComponent };
TreeGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-treegrid',
                template: TREEGRID_TEMPLATE,
                host: {
                    'class': 'f-column'
                }
            },] },
];
/** @nocollapse */
TreeGridComponent.ctorParameters = function () { return []; };
TreeGridComponent.propDecorators = {
    'idField': [{ type: Input },],
    'treeField': [{ type: Input },],
    'selectionMode': [{ type: Input },],
    'checkbox': [{ type: Input },],
    'cascadeCheck': [{ type: Input },],
    'rowClick': [{ type: Output },],
    'rowExpand': [{ type: Output },],
    'rowCollapse': [{ type: Output },],
    'rowCheck': [{ type: Output },],
    'rowUncheck': [{ type: Output },],
};
//# sourceMappingURL=treegrid.component.js.map