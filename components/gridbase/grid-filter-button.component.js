/**
 * EasyUI for Angular 0.5
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var __extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();import{Component,forwardRef,Input}from"@angular/core";import{NG_VALUE_ACCESSOR}from"@angular/forms";import{ComboBoxComponent,COMBOBOX_TEMPLATE}from"../combobox/combobox.component";var GridFilterButtonComponent=function(_super){function GridFilterButtonComponent(){var _this=null!==_super&&_super.apply(this,arguments)||this;return _this.arrowIconCls="icon-filter",_this.panelStyle={height:"auto",width:"150px"},_this.inputStyle={display:"none"},_this.editable=!1,_this.column=null,_this}return __extends(GridFilterButtonComponent,_super),GridFilterButtonComponent.prototype.ngAfterViewInit=function(){var _this=this;if(this.column.filterOperators&&this.column.filterOperators.length){var filterOperators_1=this.column.grid.filterOperators;this.data=this.column.filterOperators.map(function(op){return{value:op,text:filterOperators_1[op].text}});var rule=this.column.grid.getFilterRule(this.column.field);this.column.filterOperator=rule?rule.op:null}setTimeout(function(){_this.selectionChange.subscribe(function(selection){if(!selection)return _this.column._filterOperator=null,_this.column._filterValue=null,void _this.column.grid.removeFilterRule(_this.column.field);"nofilter"==selection.value?(_this.column._filterOperator=null,_this.column._filterValue=null,_this.column.grid.removeFilterRule(_this.column.field)):null!=_this.column.filterValue&&""!=_this.column.filterValue&&(_this.column.filterOperator=selection.value,_this.column.grid.addFilterRule({field:_this.column.field,op:selection.value,value:_this.column.filterValue}),_this.column.grid.doFilter())})})},GridFilterButtonComponent}(ComboBoxComponent);export{GridFilterButtonComponent};GridFilterButtonComponent.decorators=[{type:Component,args:[{selector:"eui-grid-filter-button",template:COMBOBOX_TEMPLATE,providers:[{provide:NG_VALUE_ACCESSOR,useExisting:forwardRef(function(){return GridFilterButtonComponent}),multi:!0}],host:{class:"f-inline-row f-noshrink"}}]}],GridFilterButtonComponent.ctorParameters=function(){return[]},GridFilterButtonComponent.propDecorators={arrowIconCls:[{type:Input}],panelStyle:[{type:Input}],inputStyle:[{type:Input}],editable:[{type:Input}],column:[{type:Input}]};