/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Component, Renderer2, ViewChild, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';
import { domHelper } from './domhelper';
var VirtualScrollComponent = (function () {
    function VirtualScrollComponent(cdRef, render) {
        this.cdRef = cdRef;
        this.render = render;
        this.width = null;
        this.minWidth = null;
        this.maxWidth = null;
        this.height = null;
        this.minHeight = null;
        this.maxHeight = null;
        this.lazy = false;
        this.rowHeight = 30;
        this.maxDivHeight = 10000000;
        this.maxVisibleHeight = 15000000;
        this.pageNumber = 1;
        this.pageSize = 10;
        this.total = 0;
        this.onUpdate = new EventEmitter();
        this.onPageChange = new EventEmitter();
        this.bodyScroll = new EventEmitter();
        this._data = [];
        this.items = [];
        this.waitingPage = 1;
        this.startIndex = 0;
        this.deltaTopHeight = 0;
        this.topHeights = [];
        this.bottomHeights = [];
        this.isUpdating = false;
        this.isNewFetching = false;
        // prevent to fetch multiple times
        this.fetchingPage = 0;
    }
    Object.defineProperty(VirtualScrollComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            if (value == null) {
                value = [];
            }
            this._data = value;
            this.fetchingPage = 0;
            if (this.lazy) {
                if (this._data.length) {
                    this.waitingPage = this.pageNumber;
                    this.loadPage(this._data);
                }
                else {
                    if (this.total > 0) {
                        this.fetchPage(this.waitingPage);
                    }
                    else {
                        this.loadPage(this._data);
                    }
                }
            }
            else {
                this.total = this._data.length;
                this.pageNumber = 1;
                this.waitingPage = 1;
                this.startIndex = 0;
                this.loadPage(this._data);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScrollComponent.prototype, "scrollTop", {
        get: function () {
            return this.bodyRef.nativeElement.scrollTop - this.startIndex * this.rowHeight + this.deltaTopHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(VirtualScrollComponent.prototype, "scrollbarWidth", {
        get: function () {
            return domHelper.outerWidth(this.bodyRef.nativeElement) - domHelper.outerWidth(this.contentRef.nativeElement);
        },
        enumerable: true,
        configurable: true
    });
    VirtualScrollComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.render.listen(this.bodyRef.nativeElement, 'scroll', function (event) {
            event.stopPropagation();
            if (!_this.isUpdating) {
                _this.scrolling();
            }
            _this.bodyScroll.emit({
                left: _this.bodyRef.nativeElement.scrollLeft,
                top: _this.scrollTop,
                items: _this.items
            });
        });
    };
    VirtualScrollComponent.prototype.scrolling = function () {
        this.isNewFetching = false;
        var bodyHeight = domHelper.outerHeight(this.bodyRef.nativeElement);
        var bodyOffset = domHelper.offset(this.bodyRef.nativeElement);
        var contentOffset = domHelper.offset(this.contentRef.nativeElement);
        var top = contentOffset.top - bodyOffset.top;
        var bottom = top + domHelper.outerHeight(this.contentRef.nativeElement);
        if (top > bodyHeight || bottom < 0) {
            var scrollTop = this.bodyRef.nativeElement.scrollTop;
            var index = Math.floor((scrollTop + this.deltaTopHeight) / this.rowHeight);
            var page = Math.floor(index / this.pageSize) + 1;
            if (page > 0) {
                this.isNewFetching = true;
                this.startIndex = (page - 1) * this.pageSize;
                this.waitingPage = page;
                this.items = [];
                this.fetchPage(this.waitingPage);
            }
        }
        else if (top > 0) {
            if (this.startIndex == 0) {
                return;
            }
            var page = Math.floor(this.startIndex / this.pageSize) + 1;
            this.waitingPage = page - 1;
            this.fetchPage(this.waitingPage);
        }
        else if (bottom < bodyHeight) {
            if (this.startIndex + this.items.length >= this.total) {
                return;
            }
            var page = Math.floor(this.startIndex / this.pageSize) + 1;
            if (this.items.length >= this.pageSize * 2) {
                this.waitingPage = page + 2;
            }
            else {
                this.waitingPage = page + 1;
            }
            this.fetchPage(this.waitingPage);
        }
    };
    VirtualScrollComponent.prototype.populate = function () {
        var _this = this;
        this.isUpdating = true;
        var bodyHeight = domHelper.outerHeight(this.bodyRef.nativeElement);
        var topHeight = this.startIndex * this.rowHeight;
        var bottomHeight = this.total * this.rowHeight - topHeight - this.items.length * this.rowHeight;
        this.topHeights = this.splitHeights(topHeight);
        this.bottomHeights = this.splitHeights(bottomHeight);
        var spos = this.bodyRef.nativeElement.scrollTop + this.deltaTopHeight;
        if (topHeight > this.maxVisibleHeight) {
            this.deltaTopHeight = topHeight - this.maxVisibleHeight;
            this.topHeights = this.splitHeights(this.maxVisibleHeight);
        }
        else {
            this.deltaTopHeight = 0;
        }
        if (bottomHeight > this.maxVisibleHeight) {
            this.bottomHeights = this.splitHeights(this.maxVisibleHeight);
        }
        else if (bottomHeight == 0) {
            var lastCount = this.total % this.pageSize;
            if (lastCount) {
                this.bottomHeights = this.splitHeights(bodyHeight - lastCount * this.rowHeight);
            }
        }
        this.bodyRef.nativeElement.scrollTop = spos - this.deltaTopHeight;
        this.onUpdate.emit(this.items);
        clearTimeout(this.populateTimer);
        this.populateTimer = setTimeout(function () {
            if (_this.isNewFetching) {
                _this.bodyRef.nativeElement.scrollTop = spos - _this.deltaTopHeight;
            }
            _this.isUpdating = false;
            _this.scrolling();
        });
    };
    VirtualScrollComponent.prototype.splitHeights = function (height) {
        var count = Math.floor(height / this.maxDivHeight);
        var leftHeight = height - this.maxDivHeight * count;
        if (height < 0) {
            leftHeight = 0;
        }
        var heights = [];
        for (var i = 0; i < count; i++) {
            heights.push(this.maxDivHeight);
        }
        heights.push(leftHeight);
        return heights;
    };
    VirtualScrollComponent.prototype.loadPage = function (items) {
        if (this.pageNumber != this.waitingPage) {
            return;
        }
        /*
        if (!items.length){
            return;
        }
        */
        items = items.slice(0, this.pageSize);
        var page = Math.floor(this.startIndex / this.pageSize) + 1;
        if (page == this.waitingPage) {
            this.items = items;
            this.populate();
            /*
            if (this.startIndex + this.items.length < this.total){
                this.waitingPage++;
                this.fetchPage(this.waitingPage);
            }
            */
        }
        else if (this.waitingPage == page + 1) {
            this.items = this.items.slice(0, this.pageSize).concat(items);
            this.populate();
        }
        else if (this.waitingPage == page + 2) {
            this.startIndex += this.pageSize;
            this.items = this.items.slice(this.pageSize, this.pageSize * 2).concat(items);
            this.populate();
        }
        else if (this.waitingPage == page - 1) {
            this.startIndex -= this.pageSize;
            this.items = items.concat(this.items.slice(0, this.pageSize));
            this.populate();
        }
        else {
            this.startIndex = (this.pageNumber - 1) * this.pageSize;
            this.items = items;
            this.populate();
        }
    };
    VirtualScrollComponent.prototype.fetchPage = function (page) {
        if (this.fetchingPage != page) {
            this.fetchingPage = page;
            if (!this.lazy) {
                var start = (page - 1) * this.pageSize;
                var items = this.data.slice(start, start + this.pageSize);
                this.pageNumber = page;
                this.loadPage(items);
            }
            this.onPageChange.emit({
                pageNumber: page,
                pageSize: this.pageSize
            });
        }
    };
    VirtualScrollComponent.prototype.gotoPage = function (page) {
        this.startIndex = (page - 1) * this.pageSize;
        this.waitingPage = page;
        this.populate();
        this.bodyRef.nativeElement.scrollTop = this.startIndex * this.rowHeight - this.deltaTopHeight;
        this.fetchPage(page);
    };
    VirtualScrollComponent.prototype.refresh = function () {
        var page = Math.floor(this.startIndex / this.pageSize) + 1;
        this.waitingPage = page;
        this.fetchingPage = 0;
        this.fetchPage(page);
    };
    return VirtualScrollComponent;
}());
export { VirtualScrollComponent };
VirtualScrollComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-virtual-scroll',
                template: "\n\t\t<div #body class=\"scroll-body f-full\">\n\t\t\t<div #top class=\"scroll-top\">\n\t\t\t\t<div *ngFor=\"let h of topHeights\" [style.height.px]=\"h\"></div>\n\t\t\t</div>\n\t\t\t<div #content class=\"scroll-content\">\n\t\t\t\t<ng-content></ng-content>\n\t\t\t</div>\n\t\t\t<div #bottom class=\"scroll-bottom\">\n\t\t\t\t<div *ngFor=\"let h of bottomHeights\" [style.height.px]=\"h\"></div>\n\t\t\t</div>\n\t\t</div>\n\t",
                host: {
                    'class': 'f-column'
                }
            },] },
];
/** @nocollapse */
VirtualScrollComponent.ctorParameters = function () { return [
    { type: ChangeDetectorRef, },
    { type: Renderer2, },
]; };
VirtualScrollComponent.propDecorators = {
    'bodyRef': [{ type: ViewChild, args: ['body',] },],
    'topRef': [{ type: ViewChild, args: ['top',] },],
    'bottomRef': [{ type: ViewChild, args: ['bottom',] },],
    'contentRef': [{ type: ViewChild, args: ['content',] },],
    'width': [{ type: Input },],
    'minWidth': [{ type: Input },],
    'maxWidth': [{ type: Input },],
    'height': [{ type: Input },],
    'minHeight': [{ type: Input },],
    'maxHeight': [{ type: Input },],
    'lazy': [{ type: Input },],
    'rowHeight': [{ type: Input },],
    'maxDivHeight': [{ type: Input },],
    'maxVisibleHeight': [{ type: Input },],
    'pageNumber': [{ type: Input },],
    'pageSize': [{ type: Input },],
    'total': [{ type: Input },],
    'onUpdate': [{ type: Output, args: ['update',] },],
    'onPageChange': [{ type: Output, args: ['pageChange',] },],
    'bodyScroll': [{ type: Output },],
    'data': [{ type: Input },],
};
//# sourceMappingURL=virtual-scroll.component.js.map