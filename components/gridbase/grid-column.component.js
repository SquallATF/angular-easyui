/**
 * EasyUI for Angular 0.2
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import{Component,ContentChild,Input}from"@angular/core";import{HeaderTemplateDirective,CellTemplateDirective,EditTemplateDirective,FooterTemplateDirective}from"../base/template-base";import{domHelper}from"../base/domhelper";var GridColumnComponent=function(){function GridColumnComponent(){this.field=null,this.title=null,this.rowspan=1,this.colspan=1,this.sortable=!1,this.editable=!1,this.order="asc",this.frozen=!1,this.align=null,this.halign=null,this.sorter=null,this.headerCls=null,this.headerStyle=null,this.cellCss=null,this.expander=!1,this.currOrder=null}return GridColumnComponent.prototype.ngOnInit=function(){this.width=domHelper.toStyleValue(this.width)},GridColumnComponent}();export{GridColumnComponent};GridColumnComponent.decorators=[{type:Component,args:[{selector:"eui-grid-column",template:""}]}],GridColumnComponent.ctorParameters=function(){return[]},GridColumnComponent.propDecorators={headerTemplate:[{type:ContentChild,args:[HeaderTemplateDirective]}],cellTemplate:[{type:ContentChild,args:[CellTemplateDirective]}],editTemplate:[{type:ContentChild,args:[EditTemplateDirective]}],footerTemplate:[{type:ContentChild,args:[FooterTemplateDirective]}],field:[{type:Input}],title:[{type:Input}],width:[{type:Input}],rowspan:[{type:Input}],colspan:[{type:Input}],sortable:[{type:Input}],editable:[{type:Input}],order:[{type:Input}],frozen:[{type:Input}],align:[{type:Input}],halign:[{type:Input}],sorter:[{type:Input}],headerCls:[{type:Input}],headerStyle:[{type:Input}],cellCss:[{type:Input}],expander:[{type:Input}]};