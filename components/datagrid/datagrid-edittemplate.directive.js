/**
 * EasyUI for Angular 0.7
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import{Directive,ViewContainerRef,Input}from"@angular/core";var DataGridEditTemplateDirective=function(){function DataGridEditTemplateDirective(viewContainer){this.viewContainer=viewContainer}return DataGridEditTemplateDirective.prototype.ngOnInit=function(){this.view=this.viewContainer.createEmbeddedView(this.template,{$implicit:this.column,row:this.row,rowIndex:this.rowIndex})},DataGridEditTemplateDirective.prototype.ngOnDestroy=function(){this.view.destroy()},DataGridEditTemplateDirective}();export{DataGridEditTemplateDirective};DataGridEditTemplateDirective.decorators=[{type:Directive,args:[{selector:"[euiDataGridEditTemplate]"}]}],DataGridEditTemplateDirective.ctorParameters=function(){return[{type:ViewContainerRef}]},DataGridEditTemplateDirective.propDecorators={column:[{type:Input}],row:[{type:Input}],rowIndex:[{type:Input}],template:[{type:Input,args:["euiDataGridEditTemplate"]}]};