/**
 * EasyUI for Angular 0.3
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var __extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();import{Component,ContentChild,Host,Inject,forwardRef,Input,ElementRef}from"@angular/core";import{TabsComponent}from"./tabs.component";import{HeaderTemplateDirective}from"../base/template-base";import{PanelComponent,PANEL_TEMPLATE}from"../panel/panel.component";var TabPanelComponent=function(_super){function TabPanelComponent(tabs,hostRef){var _this=_super.call(this,hostRef)||this;return _this.tabs=tabs,_this.hostRef=hostRef,_this.closed=!0,_this.showHeader=!1,_this.border=!1,_this.disabled=!1,_this.closable=!1,_this.isFirst=!1,_this.isLast=!1,_this.isUsed=!0,_this}return __extends(TabPanelComponent,_super),Object.defineProperty(TabPanelComponent.prototype,"selected",{get:function(){return!this.closed},set:function(value){this.closed=!value},enumerable:!0,configurable:!0}),TabPanelComponent.prototype.select=function(){var _this=this;this.selected||this.disabled||(this.tabs.panels.filter(function(p){return p!=_this}).forEach(function(p){return p.unselect()}),this.selected=!0,this.tabs.tabSelect.emit(this))},TabPanelComponent.prototype.unselect=function(){this.selected&&!this.disabled&&(this.selected=!1,this.tabs.tabUnselect.emit(this))},TabPanelComponent.prototype.close=function(){this.disabled||(this.selected&&(this.selected=!1,this.tabs.selectedIndex=-1),this.isUsed=!1)},TabPanelComponent}(PanelComponent);export{TabPanelComponent};TabPanelComponent.decorators=[{type:Component,args:[{selector:"eui-tab-panel",template:PANEL_TEMPLATE,host:{class:"f-column","[class.f-full]":"selected"}}]}],TabPanelComponent.ctorParameters=function(){return[{type:TabsComponent,decorators:[{type:Host},{type:Inject,args:[forwardRef(function(){return TabsComponent})]}]},{type:ElementRef}]},TabPanelComponent.propDecorators={headerTemplate:[{type:ContentChild,args:[HeaderTemplateDirective]}],closed:[{type:Input}],showHeader:[{type:Input}],border:[{type:Input}],disabled:[{type:Input}],closable:[{type:Input}],selected:[{type:Input}]};