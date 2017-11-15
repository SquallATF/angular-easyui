/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var DomHelper = (function () {
    function DomHelper() {
    }
    DomHelper.prototype.getElement = function (element) {
        return (typeof element === 'string') ? document.querySelector(element) : element;
    };
    DomHelper.prototype.isVisible = function (element) {
        var el = this.getElement(element);
        return el.offsetWidth > 0;
    };
    DomHelper.prototype.outerWidth = function (element) {
        var el = this.getElement(element);
        var style = getComputedStyle(el);
        return el.offsetWidth + (parseInt(style.getPropertyValue('margin-left')) || 0) + (parseInt(style.getPropertyValue('margin-right')) || 0);
    };
    DomHelper.prototype.outerHeight = function (element) {
        var el = this.getElement(element);
        var style = getComputedStyle(el);
        return el.offsetHeight + (parseInt(style.getPropertyValue('margin-top')) || 0) + (parseInt(style.getPropertyValue('margin-bottom')) || 0);
    };
    DomHelper.prototype.isChild = function (element, parent) {
        var p = this.getElement(parent);
        var el = this.getElement(element);
        while (el && el != p) {
            el = el.parentNode;
        }
        return el == p;
    };
    DomHelper.prototype.offset = function (element) {
        var el = this.getElement(element);
        var rect = el.getBoundingClientRect();
        var left = rect.left;
        var top = rect.top;
        return { left: left + this.getScrollLeft(), top: top + this.getScrollTop() };
    };
    DomHelper.prototype.getScrollLeft = function () {
        return Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
    };
    DomHelper.prototype.getScrollTop = function () {
        return Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    };
    DomHelper.prototype.getViewport = function () {
        var de = document.documentElement;
        var body = document.getElementsByTagName('body')[0];
        return {
            width: window.innerWidth || de.clientWidth || body.clientWidth,
            height: window.innerHeight || de.clientHeight || body.clientHeight
        };
    };
    DomHelper.prototype.isAutoSize = function (value) {
        var v = String(value);
        if (v == 'auto' || v == '') {
            return true;
        }
        else {
            return false;
        }
    };
    DomHelper.prototype.toStyleValue = function (value) {
        if (value == null) {
            return null;
        }
        var v = String(value);
        var endchar = v.substr(v.length - 1, 1);
        if (endchar >= '0' && endchar <= '9') {
            return v + 'px';
        }
        else {
            return v;
        }
    };
    DomHelper.prototype.addClass = function (element, className) {
        var el = this.getElement(element);
        el.classList.add(className);
    };
    DomHelper.prototype.removeClass = function (element, className) {
        var el = this.getElement(element);
        el.classList.remove(className);
    };
    DomHelper.prototype.scrollTo = function (container, item) {
        var containerOffset = domHelper.offset(container);
        var itemOffset = domHelper.offset(item);
        var containerHeight = domHelper.outerHeight(container);
        var itemHeight = domHelper.outerHeight(item);
        var offsetTop = itemOffset.top - containerOffset.top;
        if (offsetTop < 0) {
            container.scrollTop = container.scrollTop + offsetTop - 1;
        }
        else if (offsetTop > containerHeight - itemHeight) {
            container.scrollTop = container.scrollTop - (containerHeight - itemHeight - offsetTop - 1);
        }
    };
    return DomHelper;
}());
export { DomHelper };
export var domHelper = new DomHelper();
//# sourceMappingURL=domhelper.js.map