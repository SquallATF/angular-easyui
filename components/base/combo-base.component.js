/**
 * EasyUI for Angular 0.2
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var __extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();import{Component,ChangeDetectorRef,ViewChild,ElementRef,forwardRef,Input,HostListener}from"@angular/core";import{NG_VALUE_ACCESSOR}from"@angular/forms";import{InputBaseComponent}from"../base/input-base.component";import{domHelper}from"./domhelper";export var COMBO_BASE_TEMPLATE='\n\t<span class="textbox f-inline-row f-full" \n\t\t\t[ngClass]="cls"\n\t\t\t[class.textbox-disabled]="disabled"\n\t\t\t[class.textbox-readonly]="readonly"\n\t\t\t[class.textbox-focused]="focused"\n\t\t\t[class.textbox-invalid]="invalid">\n\t\t<input #input *ngIf="!multiline" autocomplete="off" class="textbox-text f-full f-order3"\n\t\t\t\t[class.validatebox-invalid]="invalid"\n\t\t\t\t[attr.id]="inputId"\n\t\t\t\t[attr.disabled]="disabled?\'disabled\':null"\n\t\t\t\t[attr.readonly]="(readonly||!editable)?\'readonly\':null"\n\t\t\t\t[attr.tabindex]="tabindex"\n\t\t\t\t[ngClass]="inputCls"\n\t\t\t\t[ngStyle]="inputStyle"\n\t\t\t\t[(ngModel)]="text"\n\t\t\t\t[placeholder]="placeholder"\n\t\t\t\t(focus)="focus()"\n\t\t\t\t(blur)="blur()">\n\t\t<textarea #input *ngIf="multiline" autocomplete="off" class="textbox-text f-full f-order3"\n\t\t\t\t[class.validatebox-invalid]="invalid"\n\t\t\t\t[attr.id]="inputId"\n\t\t\t\t[attr.disabled]="disabled?\'disabled\':null"\n\t\t\t\t[attr.readonly]="(readonly||!editable)?\'readonly\':null"\n\t\t\t\t[attr.tabindex]="tabindex"\n\t\t\t\t[ngClass]="inputCls"\n\t\t\t\t[ngStyle]="inputStyle"\n\t\t\t\t[(ngModel)]="text"\n\t\t\t\t[placeholder]="placeholder"\n\t\t\t\t(focus)="focus()"\n\t\t\t\t(blur)="blur()"></textarea>\n\t\t<input class="textbox-value" type="hidden" [value]="value" [attr.disabled]="disabled?\'disabled\':null">\n\t\t<ng-content select="eui-addon"></ng-content>\n\t\t<span #addon *ngIf="iconCls" \n\t\t\t\tclass="textbox-addon textbox-addon-icon f-inline-row f-noshrink" \n\t\t\t\t[class.f-order1]="iconAlign==\'left\'"\n\t\t\t\t[class.f-order5]="iconAlign==\'right\'">\n\t\t\t<span class="textbox-icon textbox-icon-disabled {{iconCls}}"></span>\n\t\t</span>\n\t\t<span #arrow *ngIf="hasDownArrow" (click)="togglePanel()"\n\t\t\t\tclass="textbox-addon f-column f-noshrink"\n\t\t\t\t[class.f-order0]="arrowAlign==\'left\'"\n\t\t\t\t[class.f-order6]="arrowAlign==\'right\'">\n\t\t\t<span class="textbox-icon combo-arrow f-full"></span>\n\t\t</span>\n\t</span>\n\t<div #panel *ngIf="!panelClosed" \n\t\t\tclass="panel-body panel-body-noheader combo-panel"\n\t\t\t[style.left.px]="panelLeft"\n\t\t\t[style.top.px]="panelTop"\n\t\t\t[ngStyle]="panelStyle">\n\t</div>\n';var ComboBaseComponent=function(_super){function ComboBaseComponent(hostRef,cdRef){var _this=_super.call(this,cdRef)||this;return _this.hostRef=hostRef,_this.cdRef=cdRef,_this.hasDownArrow=!0,_this.arrowAlign="right",_this.panelAlign="left",_this.panelStyle=null,_this.multiple=!1,_this.separator=",",_this.delay=200,_this._cls=null,_this.panelClosed=!0,_this.panelLeft=0,_this.panelTop=0,_this.scrollTop=0,_this}return __extends(ComboBaseComponent,_super),Object.defineProperty(ComboBaseComponent.prototype,"cls",{get:function(){return"combo"+(this._cls?" "+this._cls:"")},set:function(value){this._cls=value},enumerable:!0,configurable:!0}),ComboBaseComponent.prototype.ngOnDestroy=function(){this.panelRef&&this.hostRef.nativeElement.appendChild(this.panelRef.nativeElement)},ComboBaseComponent.prototype.onDocumentClick=function(event){if(!this.disabled&&!this.editable&&domHelper.isChild(event.target,this.inputRef.nativeElement))return event.stopPropagation(),this.togglePanel(),!1;if(this.panelRef){if(event.stopPropagation(),domHelper.isChild(event.target,this.hostRef.nativeElement))return!1;domHelper.isChild(event.target,this.panelRef.nativeElement)||this.closePanel()}},ComboBaseComponent.prototype.onDocumentScroll=function(event){this.panelRef&&(event.stopPropagation(),domHelper.isChild(event.target,this.panelRef.nativeElement)||this.closePanel())},ComboBaseComponent.prototype.alignPanel=function(){var view=domHelper.getViewport(),pos=domHelper.offset(this.hostRef.nativeElement),hwidth=domHelper.outerWidth(this.hostRef.nativeElement),pwidth=domHelper.outerWidth(this.panelRef.nativeElement),hheight=domHelper.outerHeight(this.hostRef.nativeElement),pheight=domHelper.outerHeight(this.panelRef.nativeElement),left=pos.left;"right"==this.panelAlign&&(left+=hwidth-pwidth),left+pwidth>view.width+domHelper.getScrollLeft()&&(left=view.width+domHelper.getScrollLeft()-pwidth),left<0&&(left=0);var top=pos.top+hheight;top+pheight>view.height+domHelper.getScrollTop()&&(top=pos.top-pheight),top<domHelper.getScrollTop()&&(top=pos.top+hheight),this.panelTop=top,this.panelLeft=left},ComboBaseComponent.prototype.openPanel=function(){if(this.panelClosed){this.panelClosed=!1,this.cdRef.detectChanges(),document.body.appendChild(this.panelRef.nativeElement);var hwidth=domHelper.outerWidth(this.hostRef.nativeElement);(domHelper.outerWidth(this.panelRef.nativeElement)<hwidth||!this.panelStyle||!this.panelStyle.width)&&(this.panelRef.nativeElement.style.width=hwidth+"px"),this.alignPanel(),this.panelRef.nativeElement.scrollTop=this.scrollTop}},ComboBaseComponent.prototype.closePanel=function(){this.panelClosed||(this.scrollTop=this.panelRef.nativeElement.scrollTop,this.panelClosed=!0)},ComboBaseComponent.prototype.togglePanel=function(){this.disabled||this.readonly||(this.panelClosed?this.openPanel():this.closePanel(),this.focus())},ComboBaseComponent}(InputBaseComponent);export{ComboBaseComponent};ComboBaseComponent.decorators=[{type:Component,args:[{template:COMBO_BASE_TEMPLATE,providers:[{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(function(){return ComboBaseComponent}),multi:!0}],host:{class:"f-inline-row"}}]}],ComboBaseComponent.ctorParameters=function(){return[{type:ElementRef},{type:ChangeDetectorRef}]},ComboBaseComponent.propDecorators={arrowRef:[{type:ViewChild,args:["arrow"]}],panelRef:[{type:ViewChild,args:["panel"]}],hasDownArrow:[{type:Input}],arrowAlign:[{type:Input}],panelAlign:[{type:Input}],panelStyle:[{type:Input}],multiple:[{type:Input}],separator:[{type:Input}],delay:[{type:Input}],cls:[{type:Input}],onDocumentClick:[{type:HostListener,args:["document:click",["$event"]]}],onDocumentScroll:[{type:HostListener,args:["document:mousewheel",["$event"]]}]};