/**
 * EasyUI for Angular 0.5
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import{NgModule}from"@angular/core";import{CommonModule}from"@angular/common";import{FormsModule}from"@angular/forms";import{BaseModule}from"../base/base.module";import{PaginationModule}from"../pagination/pagination.module";import{ComboBoxModule}from"../combobox/combobox.module";import{DataListModule}from"../datalist/datalist.module";import{GridBaseComponent}from"./grid-base.component";import{GridColumnComponent}from"./grid-column.component";import{GridHeaderComponent}from"./grid-header.component";import{GridBodyComponent}from"./grid-body.component";import{GridFooterComponent}from"./grid-footer.component";import{GridColumnGroupComponent}from"./grid-column-group.component";import{GridHeaderRowComponent}from"./grid-header-row.component";import{GridFilterRowComponent}from"./grid-filter-row.component";import{GridViewComponent}from"./grid-view.component";import{GridHeaderTemplateDirective}from"./grid-headertemplate.directive";import{GridCellTemplateDirective}from"./grid-celltemplate.directive";import{GridFilterTemplateDirective}from"./grid-filtertemplate.directive";import{GridFilterButtonComponent}from"./grid-filter-button.component";var GridBaseModule=function(){return function(){}}();export{GridBaseModule};GridBaseModule.decorators=[{type:NgModule,args:[{declarations:[GridBaseComponent,GridColumnComponent,GridHeaderComponent,GridBodyComponent,GridFooterComponent,GridColumnGroupComponent,GridHeaderRowComponent,GridFilterRowComponent,GridViewComponent,GridHeaderTemplateDirective,GridCellTemplateDirective,GridFilterTemplateDirective,GridFilterButtonComponent],imports:[CommonModule,FormsModule,BaseModule,PaginationModule,ComboBoxModule,DataListModule],exports:[GridBaseComponent,GridColumnComponent,GridHeaderComponent,GridBodyComponent,GridFooterComponent,GridColumnGroupComponent,GridHeaderRowComponent,GridFilterRowComponent,GridViewComponent,GridHeaderTemplateDirective,GridCellTemplateDirective,GridFilterTemplateDirective,GridFilterButtonComponent]}]}],GridBaseModule.ctorParameters=function(){return[]};