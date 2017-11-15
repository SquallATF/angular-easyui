/**
 * EasyUI for Angular 0.2
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var __extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();import{Component,Host,Inject,forwardRef,Input,ElementRef,HostListener}from"@angular/core";import{LayoutComponent}from"./layout.component";import{PanelComponent,PANEL_TEMPLATE}from"../panel/panel.component";import{domHelper}from"../base/domhelper";var LayoutPanelComponent=function(_super){function LayoutPanelComponent(layout,hostRef){var _this=_super.call(this,hostRef)||this;return _this.layout=layout,_this.hostRef=hostRef,_this.title=null,_this.region="center",_this.float=!1,_this.split=!1,_this.animate=!0,_this.collapsible=!1,_this.collapseToShrinkBody=!1,_this.isExpanding=!1,_this._collapsed=!1,_this}return __extends(LayoutPanelComponent,_super),Object.defineProperty(LayoutPanelComponent.prototype,"collapsed",{get:function(){return this._collapsed},set:function(value){var _this=this;this._collapsed=value,this.layout&&value&&this.layout.updatePaddings(),this._collapsed||(this.isExpanding=!0,setTimeout(function(){return _this.isExpanding=!1}))},enumerable:!0,configurable:!0}),Object.defineProperty(LayoutPanelComponent.prototype,"hcls",{get:function(){var cls="f-column";return cls+=" layout-panel layout-panel-"+this.region,this.collapsed&&(cls+=" layout-collapsed"),this.split&&(cls+=" layout-split-"+this.region),this.animate&&(cls+=" layout-animate"),cls},enumerable:!0,configurable:!0}),Object.defineProperty(LayoutPanelComponent.prototype,"top",{get:function(){return"west"==this.region||"east"==this.region?this.layout.paddingTop:null},enumerable:!0,configurable:!0}),Object.defineProperty(LayoutPanelComponent.prototype,"bottom",{get:function(){return"west"==this.region||"east"==this.region?this.layout.paddingBottom:null},enumerable:!0,configurable:!0}),LayoutPanelComponent.prototype.ngAfterViewInit=function(){var icons={west:"left",east:"right",north:"up",south:"down"};this.expandIconCls="layout-button-"+icons[this.region],this.collapseIconCls="layout-button-"+icons[this.region]},LayoutPanelComponent.prototype.onDocumentClick=function(event){if(this.float&&!this.collapsed){if(this.isExpanding)return;domHelper.isChild(event.target,this.layout.layoutRef.nativeElement)&&(domHelper.isChild(event.target,this.hostRef.nativeElement)||(this.collapsed=!0))}},LayoutPanelComponent.prototype.onSlideEnd=function(event){this.layout.updatePaddings()},LayoutPanelComponent.prototype.onClickCollapsibleTool1=function(event){this.collapsed=!0},LayoutPanelComponent.prototype.expand=function(){this.collapsed=!1},LayoutPanelComponent.prototype.collapse=function(){this.collapsed=!0},LayoutPanelComponent}(PanelComponent);export{LayoutPanelComponent};LayoutPanelComponent.decorators=[{type:Component,args:[{selector:"eui-layout-panel",template:PANEL_TEMPLATE,host:{"[class]":"hcls","[style.top.px]":"top","[style.bottom.px]":"bottom"}}]}],LayoutPanelComponent.ctorParameters=function(){return[{type:LayoutComponent,decorators:[{type:Host},{type:Inject,args:[forwardRef(function(){return LayoutComponent})]}]},{type:ElementRef}]},LayoutPanelComponent.propDecorators={title:[{type:Input}],region:[{type:Input}],float:[{type:Input}],split:[{type:Input}],animate:[{type:Input}],collapsible:[{type:Input}],collapsed:[{type:Input}],onDocumentClick:[{type:HostListener,args:["document:click",["$event"]]}],onSlideEnd:[{type:HostListener,args:["transitionend",["$event"]]}]};