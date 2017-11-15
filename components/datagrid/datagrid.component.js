/**
 * EasyUI for Angular 0.6
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var __extends=this&&this.__extends||function(){var extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b}||function(d,b){for(var p in b)b.hasOwnProperty(p)&&(d[p]=b[p])};return function(d,b){function __(){this.constructor=d}extendStatics(d,b),d.prototype=null===b?Object.create(b):(__.prototype=b.prototype,new __)}}();import{Component,ContentChild,Input,Output,EventEmitter}from"@angular/core";import{GridBaseComponent}from"../gridbase/grid-base.component";import{GroupTemplateDirective,DetailTemplateDirective}from"../base/template-base";import{domHelper}from"../base/domhelper";export var DATAGRID_TEMPLATE='\n\t<div class="panel-body panel-body-noheader datagrid datagrid-wrap f-full f-column" \n\t\t\t[class.panel-body-noborder]="!border">\n\t\t<eui-pagination *ngIf="pagination && (pagePosition==\'both\' || pagePosition==\'top\')" class="datagrid-pager datagrid-pager-top f-noshrink" \n\t\t\t\t[total]="total" \n\t\t\t\t[pageSize]="pageSize" \n\t\t\t\t[pageNumber]="pageNumber" \n\t\t\t\t[loading]="loading"\n\t\t\t\t(pageChange)="onPageChange($event)"></eui-pagination>\n\t\t<div #view class="datagrid-view f-row f-full">\n\t\t\t<eui-datagrid-view #view1 *ngIf="leftGroup || leftColumns" \n\t\t\t\t\t[viewIndex]="1" \n\t\t\t\t\t[columnGroup]="leftGroup" \n\t\t\t\t\t[columns]="leftColumns" \n\t\t\t\t\t[rows]="!virtualScroll && rows" \n\t\t\t\t\t[footerRows]="footerRows"\n\t\t\t\t\t[style.width]="leftFrozenWidth"></eui-datagrid-view>\n\t\t\t<eui-datagrid-view #view2 \n\t\t\t\t\t[viewIndex]="2" \n\t\t\t\t\t[columnGroup]="centerGroup" \n\t\t\t\t\t[columns]="centerColumns" \n\t\t\t\t\t[rows]="rows"\n\t\t\t\t\t[footerRows]="footerRows"\n\t\t\t\t\t(bodyScroll)="onBodyScroll($event)"></eui-datagrid-view>\n\t\t\t<eui-datagrid-view #view3 *ngIf="rightGroup || rightColumns" \n\t\t\t\t\t[viewIndex]="3" \n\t\t\t\t\t[columnGroup]="rightGroup" \n\t\t\t\t\t[columns]="rightColumns" \n\t\t\t\t\t[rows]="!virtualScroll && rows" \n\t\t\t\t\t[footerRows]="footerRows"\n\t\t\t\t\t[style.width]="rightFrozenWidth"></eui-datagrid-view>\n\t\t</div>\n\t\t<eui-pagination *ngIf="pagination && (pagePosition==\'both\' || pagePosition==\'bottom\')" class="datagrid-pager f-noshrink" \n\t\t\t\t[total]="total" \n\t\t\t\t[pageSize]="pageSize" \n\t\t\t\t[pageNumber]="pageNumber" \n\t\t\t\t[loading]="loading"\n\t\t\t\t(pageChange)="onPageChange($event)"></eui-pagination>\n\t</div>\n\t<div *ngIf="loading" class="datagrid-loading f-row">\n\t\t<div class="datagrid-mask"></div>\n\t\t<div class="datagrid-mask-msg">{{loadMsg}}</div>\n\t</div>\n';var DataGridComponent=function(_super){function DataGridComponent(){var _this=null!==_super&&_super.apply(this,arguments)||this;return _this.rowCss=null,_this.idField=null,_this.groupField=null,_this.expanderWidth=30,_this.editMode=null,_this.clickToEdit=!1,_this.dblclickToEdit=!1,_this.rowDblClick=new EventEmitter,_this.cellDblClick=new EventEmitter,_this.rowContextMenu=new EventEmitter,_this.cellContextMenu=new EventEmitter,_this.rowExpand=new EventEmitter,_this.rowCollapse=new EventEmitter,_this.groupExpand=new EventEmitter,_this.groupCollapse=new EventEmitter,_this.editBegin=new EventEmitter,_this.editEnd=new EventEmitter,_this.editCancel=new EventEmitter,_this.groupData=null,_this.expandedRows=[],_this.editingItem=null,_this}return __extends(DataGridComponent,_super),DataGridComponent.prototype.setData=function(value){null==value&&(value=[]),this.groupField&&(this.isGrouped(value)||(this.groupData=this.makeGroup(value),value=this.makeGroupedRows())),_super.prototype.setData.call(this,value)},DataGridComponent.prototype.ngAfterViewInit=function(){_super.prototype.ngAfterViewInit.call(this),this.virtualScroll&&this.updateFrozenView(this.view2.body.scrollTop,this.rows)},DataGridComponent.prototype.updateFrozenView=function(scrollTop,rows){this.view1&&(this.view1.scrollTop=scrollTop,rows&&(this.view1.rows=rows)),this.view3&&(this.view3.scrollTop=scrollTop,rows&&(this.view3.rows=rows))},DataGridComponent.prototype.onBodyScroll=function(event){this.updateFrozenView(event.top,event.items)},DataGridComponent.prototype.getRowIndex=function(row){var body=this.view2.body,index=body.currRows.indexOf(row);return-1==index?-1:body.vscroll?index+body.vscroll.startIndex:this.pagination?index+(this.pageNumber-1)*this.pageSize:index},DataGridComponent.prototype.getAbsoluteIndex=function(index){var body=this.view2.body;return body.vscroll?index+body.vscroll.startIndex:this.pagination?index+(this.pageNumber-1)*this.pageSize:index},DataGridComponent.prototype.scrollTo=function(row){var index=this.view2.body.currRows.indexOf(row);if(index>=0){var body=this.view2.body.bodyRef.nativeElement,tr=body.querySelector("table>tbody>tr:nth-child("+(index+1)+")");domHelper.scrollTo(body,tr),this.updateFrozenView(this.view2.body.scrollTop,this.rows)}},DataGridComponent.prototype.sortData=function(){var _this=this;if(this.sorts&&this.sorts.length){for(var cc=[],i=0;i<this.sorts.length;i++)cc.push(this.findColumn(this.sorts[i].field));var sortFunc=function(a,b){return a==b?0:a>b?1:-1};this.data.sort(function(r1,r2){for(var r=0,i=0;i<_this.sorts.length;i++){var sort=_this.sorts[i];if(r=cc[i]&&cc[i].sorter?cc[i].sorter(r1,r2):sortFunc(r1[sort.field],r2[sort.field]),0!=(r*="asc"==sort.order?1:-1))return r}return r})}},DataGridComponent.prototype.isGroupRow=function(row){return!!row._group_row},DataGridComponent.prototype.isGrouped=function(data){return!!(data&&data.length&&this.isGroupRow(data[0]))},DataGridComponent.prototype.getGroup=function(value,groups){void 0===groups&&(groups=null),groups||(groups=this.groupData);for(var _i=0,groups_1=groups;_i<groups_1.length;_i++){var group=groups_1[_i];if(group.value==value)return group}return null},DataGridComponent.prototype.makeGroup=function(data){for(var groups=[],_i=0,data_1=data;_i<data_1.length;_i++){var row=data_1[_i];if(!this.isGroupRow(row)){var group=this.getGroup(row[this.groupField],groups);group?group.rows.push(row):(group={value:row[this.groupField],collapsed:!1,rows:[row]},groups.push(group))}}return groups},DataGridComponent.prototype.makeGroupedRows=function(){for(var rows=[],_i=0,_a=this.groupData;_i<_a.length;_i++){var group=_a[_i];rows.push({_group_row:!0,value:group.value,rows:group.rows,collapsed:group.collapsed}),group.collapsed||(rows=rows.concat(group.rows))}return rows},DataGridComponent.prototype.collapseGroup=function(value){var group=this.getGroup(value);group&&(group.collapsed=!0,this.data=this.makeGroupedRows(),this.groupCollapse.emit(group))},DataGridComponent.prototype.expandGroup=function(value){var group=this.getGroup(value);group&&(group.collapsed=!1,this.data=this.makeGroupedRows(),this.groupExpand.emit(group))},DataGridComponent.prototype.toggleGroup=function(value){var group=this.getGroup(value);group&&(group.collapsed?this.expandGroup(value):this.collapseGroup(value))},DataGridComponent.prototype.getExpandedIndex=function(row){if(this.idField){for(var i=0;i<this.expandedRows.length;i++)if(this.expandedRows[i][this.idField]==row[this.idField])return i;return-1}return this.expandedRows.indexOf(row)},DataGridComponent.prototype.isRowExpanded=function(row){return-1!=this.getExpandedIndex(row)},DataGridComponent.prototype.collapseRow=function(row){var index=this.getExpandedIndex(row);index>=0&&(this.expandedRows.splice(index,1),this.rowCollapse.emit(row))},DataGridComponent.prototype.expandRow=function(row){this.isRowExpanded(row)||(this.expandedRows.push(row),this.rowExpand.emit(row))},DataGridComponent.prototype.toggleRow=function(row){this.isRowExpanded(row)?this.collapseRow(row):this.expandRow(row)},DataGridComponent.prototype.isEditing=function(row,column){if(void 0===column&&(column=null),this.editMode&&this.editingItem){if("cell"==this.editMode&&this.editingItem.column!=column)return!1;if(this.idField){if(this.editingItem.row[this.idField]==row[this.idField])return!0}else if(this.editingItem.row==row)return!0}return!1},DataGridComponent.prototype.beginEdit=function(row,column,rowEl){var _this=this;if(void 0===column&&(column=null),void 0===rowEl&&(rowEl=null),!this.isEditing(row,column)){if(this.endEdit(),this.editingItem)return void setTimeout(function(){"row"==_this.editMode?_this.selectRow(_this.editingItem.row):"cell"==_this.editMode&&_this.selectCell(_this.editingItem.row,_this.editingItem.column)});var originalValue="row"==this.editMode?Object.assign({},row):row[column.field];this.editingItem={row:row,column:column,originalValue:originalValue,element:rowEl},this.editBegin.emit(this.editingItem)}},DataGridComponent.prototype.endEdit=function(){if(this.editingItem){var el=this.editingItem.element;if(el&&el.querySelector(".validatebox-invalid"))return;this.editEnd.emit(this.editingItem),this.editingItem=null}},DataGridComponent.prototype.cancelEdit=function(){this.editingItem&&("cell"==this.editMode?this.editingItem.row[this.editingItem.column.field]=this.editingItem.originalValue:Object.assign(this.editingItem.row,this.editingItem.originalValue),this.editCancel.emit(this.editingItem),this.editingItem=null)},DataGridComponent}(GridBaseComponent);export{DataGridComponent};DataGridComponent.decorators=[{type:Component,args:[{selector:"eui-datagrid",template:DATAGRID_TEMPLATE,host:{class:"f-column"}}]}],DataGridComponent.ctorParameters=function(){return[]},DataGridComponent.propDecorators={groupTemplate:[{type:ContentChild,args:[GroupTemplateDirective]}],detailTemplate:[{type:ContentChild,args:[DetailTemplateDirective]}],rowCss:[{type:Input}],idField:[{type:Input}],groupField:[{type:Input}],expanderWidth:[{type:Input}],editMode:[{type:Input}],clickToEdit:[{type:Input}],dblclickToEdit:[{type:Input}],rowDblClick:[{type:Output}],cellDblClick:[{type:Output}],rowContextMenu:[{type:Output}],cellContextMenu:[{type:Output}],rowExpand:[{type:Output}],rowCollapse:[{type:Output}],groupExpand:[{type:Output}],groupCollapse:[{type:Output}],editBegin:[{type:Output}],editEnd:[{type:Output}],editCancel:[{type:Output}]};