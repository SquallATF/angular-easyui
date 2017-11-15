/**
 * EasyUI for Angular 0.7
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var __extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();import{Component,ViewChild,ContentChild,Input,ElementRef}from"@angular/core";import{DialogComponent}from"../dialog/dialog.component";import{BodyTemplateDirective}from"../base/template-base";import{MessagerService}from"./messager.service";export var MESSAGER_TEMPLATE='\n\t<div #panel *ngIf="!closed" class="panel f-column f-full" [ngClass]="panelCls" [ngStyle]="panelStyle">\n\t\t<div #pheader *ngIf="hasHeader"\n\t\t\t\tclass="panel-header f-noshrink"\n\t\t\t\t[class.panel-header-noborder]="!border"\n\t\t\t\t[ngClass]="headerCls"\n\t\t\t\t[ngStyle]="headerStyle">\n\t\t\t<ng-content select="eui-panel-header,eui-dialog-header,eui-messager-header"></ng-content>\n\t\t\t<div *ngIf="!headers.length" class="panel-title" [class.panel-with-icon]="iconCls">{{title}}</div>\n\t\t\t<div *ngIf="iconCls" class="panel-icon {{iconCls}}"></div>\n\t\t\t<div class="panel-tool" *ngIf="collapsible || closable">\n\t\t\t\t<a *ngIf="collapsible" href="javascript:;" [ngClass]="collapsed?expandIconCls:collapseIconCls" (click)="onClickCollapsibleTool($event)"></a>\n\t\t\t\t<a *ngIf="closable" href="javascript:;" [ngClass]="closeIconCls" (click)="onClickCloseTool($event)"></a>\n\t\t\t</div>\n\t\t</div>\n\t\t<div #pbody *ngIf="!isBodyCollapsed()"\n\t\t\t\tclass="panel-body f-full" \n\t\t\t\t[class.panel-body-noheader]="!hasHeader" \n\t\t\t\t[class.panel-body-nobottom]="footers.length" \n\t\t\t\t[class.panel-body-noborder]="!border" \n\t\t\t\t[ngClass]="bodyCls"\n\t\t\t\t[ngStyle]="bodyStyle">\n\t\t\t<ng-template *ngIf="bodyTemplate" [euiMessagerBodyTemplate]="bodyTemplate.template" [messager]="this"></ng-template>\n\t\t\t<ng-container *ngIf="!bodyTemplate">\n\t\t\t\t<div class="messager-body f-full f-column">\n\t\t\t\t\t<div class="f-row f-full">\n\t\t\t\t\t\t<div *ngIf="messagerIcon" class="f-noshrink messager-icon" [ngClass]="messagerIcon"></div>\n\t\t\t\t\t\t<div class="f-full" style="margin-bottom:20px">\n\t\t\t\t\t\t\t<ng-content></ng-content>\n\t\t\t\t\t\t\t{{msg}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div *ngIf="messagerType==\'prompt\'">\n\t\t\t\t\t\t<input #input class="messager-input" [(ngModel)]="inputValue">\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div *ngIf="!hasFooter && buttons.length" class="dialog-button messager-button">\n\t\t\t\t\t<eui-linkbutton *ngFor="let button of buttons" [text]="button.text" (click)="closeDialog(button)"></eui-linkbutton>\n\t\t\t\t</div>\n\t\t\t</ng-container>\n\t\t</div>\n\t\t<div #pfooter *ngIf="hasFooter" \n\t\t\t\tclass="panel-footer" \n\t\t\t\t[class.panel-footer-noborder]="!border"\n\t\t\t\t[ngClass]="footerCls"\n\t\t\t\t[ngStyle]="footerStyle">\n\t\t\t<ng-content select="eui-panel-footer,eui-dialog-footer,eui-messager-footer"></ng-content>\n\t\t</div>\n\t</div>\n';var MessagerComponent=function(_super){function MessagerComponent(hostRef,messagerService){var _this=_super.call(this,hostRef)||this;return _this.hostRef=hostRef,_this.messagerService=messagerService,_this.title=null,_this.bodyStyle={width:"360px",minHeight:"130px"},_this.modal=!0,_this.icon=null,_this.msg=null,_this.ok="Ok",_this.cancel="Cancel",_this.buttons=[],_this.messagerType=null,_this.inputValue=null,_this.resultValue=null,_this.options=null,_this.originalOptions=null,_this._closed=!0,_this._bodyCls=null,_this.messagerService.alertSubject.asObservable().subscribe(function(options){_this.openDialog(options,"alert")}),_this.messagerService.confirmSubject.asObservable().subscribe(function(options){_this.openDialog(options,"confirm")}),_this.messagerService.promptSubject.asObservable().subscribe(function(options){_this.openDialog(options,"prompt")}),_this.onClose.subscribe(function(){_this.options&&(_this.options.result&&_this.options.result(_this.resultValue),_this.restoreState())}),_this}return __extends(MessagerComponent,_super),Object.defineProperty(MessagerComponent.prototype,"bodyCls",{get:function(){var cls="window-body";return this.bodyTemplate||(cls+=" f-column"),this.hasHeader||(cls+=" window-body-noheader"),cls+=this._bodyCls?" "+this._bodyCls:""},set:function(value){this._bodyCls=value},enumerable:!0,configurable:!0}),Object.defineProperty(MessagerComponent.prototype,"messagerIcon",{get:function(){return this.icon?"messager-"+this.icon:null},enumerable:!0,configurable:!0}),MessagerComponent.prototype.openDialog=function(options,type){var _this=this;void 0===type&&(type="alert"),this.messagerType=type,this.saveState(options),"alert"==type?this.options=this.buildAlertOptions(options):"confirm"==type?this.options=this.buildConfirmOptions(options):"prompt"==type&&(this.options=this.buildPromptOptions(options)),Object.assign(this,this.options),this.resultValue=null,this.inputValue=null,this.open(),setTimeout(function(){_this.inputRef&&_this.inputRef.nativeElement.focus()})},MessagerComponent.prototype.closeDialog=function(result){void 0===result&&(result=null),"prompt"==this.messagerType&&result&&result.text==this.ok?this.resultValue=this.inputValue:this.resultValue=result?result.value:null,this.close()},MessagerComponent.prototype.saveState=function(options){var opts={};for(var p in options)null!=this[p]?opts[p]=this[p]:opts[p]=null;this.originalOptions=opts},MessagerComponent.prototype.restoreState=function(){Object.assign(this,this.originalOptions)},MessagerComponent.prototype.buildAlertOptions=function(options){return options.buttons&&options.buttons.length||(options.buttons=[{text:this.ok,value:!0}]),options},MessagerComponent.prototype.buildConfirmOptions=function(options){return options.icon||(options.icon="question"),options.buttons&&options.buttons.length||(options.buttons=[{text:this.ok,value:!0},{text:this.cancel,value:!1}]),options},MessagerComponent.prototype.buildPromptOptions=function(options){return options.icon||(options.icon="question"),options.buttons&&options.buttons.length||(options.buttons=[{text:this.ok,value:!0},{text:this.cancel,value:!1}]),options},MessagerComponent}(DialogComponent);export{MessagerComponent};MessagerComponent.decorators=[{type:Component,args:[{selector:"eui-messager",template:MESSAGER_TEMPLATE,host:{class:"f-column"}}]}],MessagerComponent.ctorParameters=function(){return[{type:ElementRef},{type:MessagerService}]},MessagerComponent.propDecorators={inputRef:[{type:ViewChild,args:["input"]}],bodyTemplate:[{type:ContentChild,args:[BodyTemplateDirective]}],title:[{type:Input}],bodyStyle:[{type:Input}],modal:[{type:Input}],icon:[{type:Input}],msg:[{type:Input}],ok:[{type:Input}],cancel:[{type:Input}],buttons:[{type:Input}],bodyCls:[{type:Input}]};