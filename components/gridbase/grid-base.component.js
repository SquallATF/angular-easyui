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
import { Component, ViewChild, ContentChildren, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { GridColumnComponent } from './grid-column.component';
import { GridColumnGroupComponent } from './grid-column-group.component';
import { ListBaseComponent } from '../base/list-base.component';
import { domHelper } from '../base/domhelper';
export var GRIDBASE_TEMPLATE = "\n\t<div class=\"panel-body panel-body-noheader datagrid datagrid-wrap f-full f-column\" \n\t\t\t[class.panel-body-noborder]=\"!border\">\n\t\t<eui-pagination *ngIf=\"pagination && (pagePosition=='both' || pagePosition=='top')\" class=\"datagrid-pager datagrid-pager-top\" \n\t\t\t\t[total]=\"total\" \n\t\t\t\t[pageSize]=\"pageSize\" \n\t\t\t\t[pageNumber]=\"pageNumber\" \n\t\t\t\t[loading]=\"loading\"\n\t\t\t\t(pageChange)=\"onPageChange($event)\"></eui-pagination>\n\t\t<div #view class=\"datagrid-view f-row f-full\">\n\t\t\t<eui-grid-view #view1 *ngIf=\"leftGroup || leftColumns\" \n\t\t\t\t\t[viewIndex]=\"1\" \n\t\t\t\t\t[columnGroup]=\"leftGroup\" \n\t\t\t\t\t[columns]=\"leftColumns\" \n\t\t\t\t\t[rows]=\"rows\" \n\t\t\t\t\t[style.width]=\"leftFrozenWidth\"></eui-grid-view>\n\t\t\t<eui-grid-view #view2 \n\t\t\t\t\t[viewIndex]=\"2\" \n\t\t\t\t\t[columnGroup]=\"centerGroup\" \n\t\t\t\t\t[columns]=\"centerColumns\" \n\t\t\t\t\t[rows]=\"rows\" \n\t\t\t\t\t(bodyScroll)=\"onBodyScroll($event)\"></eui-grid-view>\n\t\t\t<eui-grid-view #view3 *ngIf=\"rightGroup || rightColumns\" \n\t\t\t\t\t[viewIndex]=\"3\" \n\t\t\t\t\t[columnGroup]=\"rightGroup\" \n\t\t\t\t\t[columns]=\"rightColumns\" \n\t\t\t\t\t[rows]=\"rows\" \n\t\t\t\t\t[style.width]=\"rightFrozenWidth\"></eui-grid-view>\n\t\t</div>\n\t\t<eui-pagination *ngIf=\"pagination && (pagePosition=='both' || pagePosition=='bottom')\" class=\"datagrid-pager\" \n\t\t\t\t[total]=\"total\" \n\t\t\t\t[pageSize]=\"pageSize\" \n\t\t\t\t[pageNumber]=\"pageNumber\" \n\t\t\t\t[loading]=\"loading\"\n\t\t\t\t(pageChange)=\"onPageChange($event)\"></eui-pagination>\n\t</div>\n\t<div *ngIf=\"loading\" class=\"datagrid-loading f-row\">\n\t\t<div class=\"datagrid-mask\"></div>\n\t\t<div class=\"datagrid-mask-msg\">{{loadMsg}}</div>\n\t</div>\n";
var GridBaseComponent = (function (_super) {
    __extends(GridBaseComponent, _super);
    function GridBaseComponent(cdRef) {
        var _this = _super.call(this) || this;
        _this.cdRef = cdRef;
        _this.rowHeight = 28;
        _this.frozenWidth = '200px';
        _this.frozenAlign = 'left';
        _this.sorts = [];
        _this.multiSort = false;
        _this.showHeader = true;
        _this.showFooter = false;
        _this.pageChange = new EventEmitter;
        _this.sortChange = new EventEmitter;
        _this.footerRows = [];
        _this._rows = [];
        _this._footerData = [];
        _this.headerResized = false;
        return _this;
    }
    Object.defineProperty(GridBaseComponent.prototype, "leftFrozenWidth", {
        get: function () {
            var width = this.leftGroup ? this.leftGroup.width : 0;
            return width ? width : this.frozenWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridBaseComponent.prototype, "rightFrozenWidth", {
        get: function () {
            var width = this.rightGroup ? this.rightGroup.width : 0;
            return width ? width : this.frozenWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridBaseComponent.prototype, "allColumns", {
        get: function () {
            var cc = [];
            if (this.leftColumns) {
                cc = cc.concat(this.leftColumns);
            }
            if (this.centerColumns) {
                cc = cc.concat(this.centerColumns);
            }
            if (this.rightColumns) {
                cc = cc.concat(this.rightColumns);
            }
            return cc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridBaseComponent.prototype, "rows", {
        get: function () {
            return this._rows;
        },
        set: function (value) {
            this._rows = value || [];
            if (this.viewRef && this.cdRef) {
                this.cdRef.detectChanges();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GridBaseComponent.prototype, "footerData", {
        get: function () {
            return this._footerData;
        },
        set: function (value) {
            value = value || [];
            if (value instanceof Array) {
                this._footerData = value;
            }
            else {
                this._footerData = [value];
            }
            this.footerRows = this._footerData;
        },
        enumerable: true,
        configurable: true
    });
    GridBaseComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
        this.frozenWidth = domHelper.toStyleValue(this.frozenWidth);
    };
    GridBaseComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.initColumns();
        this.groupRefs.changes.subscribe(function () {
            _this.initColumns();
            _this.initHeaderHeight();
        });
        this.columnRefs.changes.subscribe(function () {
            _this.initColumns();
            _this.initHeaderHeight();
        });
        _super.prototype.ngAfterContentInit.call(this);
    };
    GridBaseComponent.prototype.ngAfterViewChecked = function () {
        if (!this.headerResized) {
            if (domHelper.isVisible(this.viewRef.nativeElement)) {
                this.initHeaderHeight();
                this.headerResized = true;
            }
        }
    };
    GridBaseComponent.prototype.initHeaderHeight = function () {
        if (this.view1) {
            this.view1.headerHeight = null;
        }
        if (this.view2) {
            this.view2.headerHeight = null;
        }
        if (this.view3) {
            this.view3.headerHeight = null;
        }
        this.cdRef.detectChanges();
        var h1 = this.view1 ? this.view1.headerHeight : 0;
        var h2 = this.view2 ? this.view2.headerHeight : 0;
        var h3 = this.view3 ? this.view3.headerHeight : 0;
        this.headerHeight = Math.max(h1, h2, h3);
        if (this.view1) {
            this.view1.headerHeight = this.headerHeight;
        }
        if (this.view2) {
            this.view2.headerHeight = this.headerHeight;
        }
        if (this.view3) {
            this.view3.headerHeight = this.headerHeight;
        }
    };
    GridBaseComponent.prototype.initColumns = function () {
        var _this = this;
        this.leftGroup = null;
        this.leftColumns = null;
        this.rightGroup = null;
        this.rightColumns = null;
        this.centerGroup = null;
        this.centerColumns = null;
        if (this.groupRefs && this.groupRefs.length) {
            this.groupRefs.forEach(function (g) {
                var cc = _this.getColumnLayout(g);
                var columns = cc[cc.length - 1];
                if (g.frozen) {
                    if (g.align == 'left') {
                        _this.leftGroup = g;
                        _this.leftColumns = columns;
                    }
                    else {
                        _this.rightGroup = g;
                        _this.rightColumns = columns;
                    }
                }
                else {
                    _this.centerGroup = g;
                    _this.centerColumns = columns;
                }
            });
        }
        if (!this.centerColumns) {
            this.centerColumns = this.columnRefs.filter(function (c) {
                return !c.frozen;
            });
            var frozenColumns = this.columnRefs.filter(function (c) {
                return c.frozen;
            });
            if (frozenColumns.length) {
                if (this.frozenAlign == 'left') {
                    this.leftColumns = frozenColumns;
                }
                else {
                    this.rightColumns = frozenColumns;
                }
            }
        }
        this.initColumnSort();
    };
    GridBaseComponent.prototype.getColumnLayout = function (group) {
        var _this = this;
        var aa = [];
        var count = this.getColumnCount(group);
        for (var i = 0; i < group.rows.length; i++) {
            aa[i] = new Array(count);
        }
        group.rows.forEach(function (row, rowIndex) {
            row.columns.forEach(function (col) {
                var colIndex = _this.getColumnIndex(aa[rowIndex]);
                if (colIndex >= 0) {
                    for (var c = 0; c < col.colspan; c++) {
                        for (var r = 0; r < col.rowspan; r++) {
                            aa[rowIndex + r][colIndex] = col || '';
                        }
                    }
                }
            });
        });
        return aa;
    };
    GridBaseComponent.prototype.getColumnCount = function (group) {
        var count = 0;
        group.rows.first.columns.forEach(function (col) {
            count += +col.colspan;
        });
        return count;
    };
    GridBaseComponent.prototype.getColumnIndex = function (a) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] == undefined) {
                return i;
            }
        }
        return -1;
    };
    GridBaseComponent.prototype.onBodyScroll = function (event) {
        var top = event ? event.top : this.view2.scrollTop;
        if (this.view1) {
            this.view1.scrollTop = top;
        }
        if (this.view3) {
            this.view3.scrollTop = top;
        }
    };
    GridBaseComponent.prototype.addSort = function (col) {
        var index = -1;
        for (var i = 0; i < this.sorts.length; i++) {
            if (this.sorts[i].field == col.field) {
                index = i;
                break;
            }
        }
        if (index >= 0) {
            var nextOrder = this.sorts[index].order == 'asc' ? 'desc' : 'asc';
            if (this.multiSort && nextOrder == col.order) {
                this.sorts.splice(index, 1);
            }
            else {
                this.sorts[index].order = nextOrder;
            }
        }
        else {
            if (this.multiSort) {
                this.sorts.push({
                    field: col.field,
                    order: col.order
                });
            }
            else {
                this.sorts = [{
                        field: col.field,
                        order: col.order
                    }];
            }
        }
        this.initColumnSort();
    };
    GridBaseComponent.prototype.initColumnSort = function () {
        this.sorts = this.sorts || [];
        if (!(this.sorts instanceof Array)) {
            this.sorts = [this.sorts];
        }
        if (!this.multiSort) {
            this.sorts = this.sorts.slice(0, 1);
        }
        for (var c = 0; c < this.allColumns.length; c++) {
            var col = this.allColumns[c];
            col.currOrder = null;
            for (var s = 0; s < this.sorts.length; s++) {
                var sort = this.sorts[s];
                if (sort.field == col.field) {
                    col.currOrder = sort.order;
                    break;
                }
            }
        }
    };
    GridBaseComponent.prototype.findColumn = function (field) {
        var cc = this.allColumns;
        for (var i = 0; i < cc.length; i++) {
            if (cc[i].field == field) {
                return cc[i];
            }
        }
        return null;
    };
    return GridBaseComponent;
}(ListBaseComponent));
export { GridBaseComponent };
GridBaseComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-grid-base',
                template: GRIDBASE_TEMPLATE,
                host: {
                    'class': 'f-column'
                }
            },] },
];
/** @nocollapse */
GridBaseComponent.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
]; };
GridBaseComponent.propDecorators = {
    'columnRefs': [{ type: ContentChildren, args: [GridColumnComponent,] },],
    'groupRefs': [{ type: ContentChildren, args: [GridColumnGroupComponent,] },],
    'viewRef': [{ type: ViewChild, args: ['view',] },],
    'view1': [{ type: ViewChild, args: ['view1',] },],
    'view2': [{ type: ViewChild, args: ['view2',] },],
    'view3': [{ type: ViewChild, args: ['view3',] },],
    'rowHeight': [{ type: Input },],
    'frozenWidth': [{ type: Input },],
    'frozenAlign': [{ type: Input },],
    'sorts': [{ type: Input },],
    'multiSort': [{ type: Input },],
    'showHeader': [{ type: Input },],
    'showFooter': [{ type: Input },],
    'pageChange': [{ type: Output },],
    'sortChange': [{ type: Output },],
    'footerData': [{ type: Input },],
};
//# sourceMappingURL=grid-base.component.js.map