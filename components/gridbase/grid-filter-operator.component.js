/**
 * EasyUI for Angular 0.4
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var __extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();import{Component,forwardRef}from"@angular/core";import{NG_VALUE_ACCESSOR}from"@angular/forms";import{ComboBoxComponent,COMBOBOX_TEMPLATE}from"../combobox/combobox.component";var GridFilterOperatorComponent=function(_super){function GridFilterOperatorComponent(){return null!==_super&&_super.apply(this,arguments)||this}return __extends(GridFilterOperatorComponent,_super),GridFilterOperatorComponent}(ComboBoxComponent);export{GridFilterOperatorComponent};GridFilterOperatorComponent.decorators=[{type:Component,args:[{selector:"eui-grid-filter-operator",template:COMBOBOX_TEMPLATE,providers:[{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(function(){return GridFilterOperatorComponent}),multi:!0}],host:{class:"f-inline-row"}}]}],GridFilterOperatorComponent.ctorParameters=function(){return[]};