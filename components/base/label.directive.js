/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Directive, ElementRef, Input } from '@angular/core';
import { domHelper } from './domhelper';
var LabelDirective = (function () {
    function LabelDirective(hostRef) {
        this.hostRef = hostRef;
        this.align = 'left';
    }
    LabelDirective.prototype.ngAfterViewInit = function () {
        if (this.target) {
            if (this.target.hasOwnProperty('inputId')) {
                var inputId = this.initAttributes();
                this.target.inputId = inputId;
            }
            else if (this.target instanceof Element) {
                var inputId = this.initAttributes();
                var att = document.createAttribute('id');
                att.value = inputId;
                this.target.setAttributeNode(att);
            }
        }
    };
    LabelDirective.prototype.initAttributes = function () {
        domHelper.addClass(this.hostRef.nativeElement, 'textbox-label');
        domHelper.addClass(this.hostRef.nativeElement, 'textbox-label-' + this.align);
        var inputId = LabelDirective.nextId();
        var att = document.createAttribute('for');
        att.value = inputId;
        this.hostRef.nativeElement.setAttributeNode(att);
        return inputId;
    };
    LabelDirective.nextId = function () {
        return '_input_id_' + LabelDirective.index++;
    };
    return LabelDirective;
}());
export { LabelDirective };
LabelDirective.index = 1;
LabelDirective.decorators = [
    { type: Directive, args: [{
                selector: '[for]'
            },] },
];
/** @nocollapse */
LabelDirective.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
LabelDirective.propDecorators = {
    'target': [{ type: Input, args: ['for',] },],
    'align': [{ type: Input },],
};
//# sourceMappingURL=label.directive.js.map