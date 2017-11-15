/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Directive, Input, TemplateRef } from '@angular/core';
var ItemTemplateDirective = (function () {
    function ItemTemplateDirective(template) {
        this.template = template;
    }
    return ItemTemplateDirective;
}());
export { ItemTemplateDirective };
ItemTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[euiItemTemplate]'
            },] },
];
/** @nocollapse */
ItemTemplateDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
]; };
var HeaderTemplateDirective = (function () {
    function HeaderTemplateDirective(template) {
        this.template = template;
    }
    return HeaderTemplateDirective;
}());
export { HeaderTemplateDirective };
HeaderTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[euiHeaderTemplate]'
            },] },
];
/** @nocollapse */
HeaderTemplateDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
]; };
var CellTemplateDirective = (function () {
    function CellTemplateDirective(template) {
        this.template = template;
    }
    return CellTemplateDirective;
}());
export { CellTemplateDirective };
CellTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[euiCellTemplate]'
            },] },
];
/** @nocollapse */
CellTemplateDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
]; };
var FooterTemplateDirective = (function () {
    function FooterTemplateDirective(template) {
        this.template = template;
    }
    return FooterTemplateDirective;
}());
export { FooterTemplateDirective };
FooterTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[euiFooterTemplate]'
            },] },
];
/** @nocollapse */
FooterTemplateDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
]; };
var GroupTemplateDirective = (function () {
    function GroupTemplateDirective(template) {
        this.template = template;
    }
    return GroupTemplateDirective;
}());
export { GroupTemplateDirective };
GroupTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[euiGroupTemplate]'
            },] },
];
/** @nocollapse */
GroupTemplateDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
]; };
GroupTemplateDirective.propDecorators = {
    'groupCls': [{ type: Input },],
    'groupStyle': [{ type: Input },],
};
var DetailTemplateDirective = (function () {
    function DetailTemplateDirective(template) {
        this.template = template;
        this.height = null;
    }
    return DetailTemplateDirective;
}());
export { DetailTemplateDirective };
DetailTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[euiDetailTemplate]'
            },] },
];
/** @nocollapse */
DetailTemplateDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
]; };
DetailTemplateDirective.propDecorators = {
    'height': [{ type: Input },],
};
var PageTemplateDirective = (function () {
    function PageTemplateDirective(template) {
        this.template = template;
    }
    return PageTemplateDirective;
}());
export { PageTemplateDirective };
PageTemplateDirective.decorators = [
    { type: Directive, args: [{
                selector: '[euiPageTemplate]'
            },] },
];
/** @nocollapse */
PageTemplateDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
]; };
//# sourceMappingURL=template-base.js.map