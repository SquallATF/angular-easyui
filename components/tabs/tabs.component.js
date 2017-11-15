/**
 * EasyUI for Angular 0.5
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import{Component,forwardRef,ViewChild,ContentChildren,Input,Output,EventEmitter}from"@angular/core";import{TabPanelComponent}from"./tab-panel.component";var TabsComponent=function(){function TabsComponent(){this.headerWidth=150,this.headerHeight=35,this.tabWidth=null,this.tabHeight=32,this.tabPosition="top",this.plain=!1,this.narrow=!1,this.justified=!1,this.border=!0,this.tabSelect=new EventEmitter,this.tabUnselect=new EventEmitter,this.tabClose=new EventEmitter,this.selectedIndexChange=new EventEmitter,this._selectedIndex=0}return Object.defineProperty(TabsComponent.prototype,"containerCls",{get:function(){return this.isHorizontal()?"f-row":"f-column"},enumerable:!0,configurable:!0}),Object.defineProperty(TabsComponent.prototype,"headerCls",{get:function(){return"bottom"==this.tabPosition?"tabs-header-bottom f-order2":"left"==this.tabPosition?"tabs-header-left f-column":"right"==this.tabPosition?"tabs-header-right f-column f-order2":null},enumerable:!0,configurable:!0}),Object.defineProperty(TabsComponent.prototype,"bodyCls",{get:function(){return"bottom"==this.tabPosition?"tabs-panels-top":"left"==this.tabPosition?"tabs-panels-right":"right"==this.tabPosition?"tabs-panels-left":null},enumerable:!0,configurable:!0}),TabsComponent.prototype.isHorizontal=function(){return"left"==this.tabPosition||"right"==this.tabPosition},Object.defineProperty(TabsComponent.prototype,"selectedIndex",{get:function(){return this._selectedIndex},set:function(value){null==value&&(value=-1),this._selectedIndex=value,this.panels&&this.select(value)},enumerable:!0,configurable:!0}),Object.defineProperty(TabsComponent.prototype,"usedPanels",{get:function(){return this.panels.filter(function(p){return p.isUsed})},enumerable:!0,configurable:!0}),TabsComponent.prototype.ngAfterViewInit=function(){var _this=this;this.initPanels(),this.panels.changes.subscribe(function(){_this.initPanels()})},TabsComponent.prototype.onClickTab=function(panel,event){event.stopPropagation(),panel.select()},TabsComponent.prototype.onCloseTab=function(panel,event){event.stopPropagation();var prevPanel=this.getSelectedPanel();panel.close(),this.tabClose.emit(panel),this.initPanels();var selectedPanel=this.getSelectedPanel();selectedPanel?selectedPanel!=prevPanel&&this.tabSelect.emit(selectedPanel):this.select(0)},TabsComponent.prototype.initPanels=function(){if(this.panels.length){this.panels.forEach(function(p){p.isFirst=!1,p.isLast=!1});var pp=this.panels.filter(function(p){return p.isUsed});pp.length&&(pp[0].isFirst=!0,pp[pp.length-1].isLast=!0),this.initSelectedPanel()}},TabsComponent.prototype.initSelectedPanel=function(){var panel=this.getSelectedPanel();panel||(panel=this.getPanel(this.selectedIndex)),panel&&(this.usedPanels.filter(function(p){return p!=panel}).forEach(function(p){return p.selected=!1}),panel.selected=!0)},TabsComponent.prototype.select=function(index){var panel=this.getPanel(index);panel&&panel.select()},TabsComponent.prototype.unselect=function(index){var panel=this.getPanel(index);panel&&panel.unselect()},TabsComponent.prototype.getPanel=function(index){return this.usedPanels[index]},TabsComponent.prototype.getPanelIndex=function(tab){for(var pp=this.usedPanels,i=0;i<pp.length;i++)if(pp[i]==tab)return i;return-1},TabsComponent.prototype.getSelectedPanel=function(){var pp=this.usedPanels.filter(function(p){return p.selected&&!p.disabled});return pp.length?pp[0]:null},TabsComponent}();export{TabsComponent};TabsComponent.decorators=[{type:Component,args:[{selector:"eui-tabs",template:'\n\t\t<div #container class="tabs-container f-full" [ngClass]="containerCls">\n\t\t\t<div #header class="tabs-header f-column f-noshrink"\n\t\t\t\t\t[style.width.px]="isHorizontal() ? headerWidth : null"\n\t\t\t\t\t[style.height.px]="!isHorizontal() ? headerHeight : null"\n\t\t\t\t\t[class.tabs-header-plain]="plain"\n\t\t\t\t\t[class.tabs-header-narrow]="narrow"\n\t\t\t\t\t[class.tabs-header-noborder]="!border"\n\t\t\t\t\t[ngClass]="headerCls">\n\t\t\t\t<div class="tabs-wrap f-column f-full">\n\t\t\t\t\t<ul class="tabs f-full"\n\t\t\t\t\t\t\t[class.f-row]="!isHorizontal()"\n\t\t\t\t\t\t\t[class.f-column]="isHorizontal()"\n\t\t\t\t\t\t\t[class.tabs-narrow]="narrow">\n\t\t\t\t\t\t<li class="f-inline-row" *ngFor="let panel of usedPanels"\n\t\t\t\t\t\t\t\t[class.f-full]="justified"\n\t\t\t\t\t\t\t\t[class.tabs-selected]="panel.selected"\n\t\t\t\t\t\t\t\t[class.tabs-disabled]="panel.disabled"\n\t\t\t\t\t\t\t\t[class.tabs-first]="panel.isFirst"\n\t\t\t\t\t\t\t\t[class.tabs-last]="panel.isLast"\n\t\t\t\t\t\t\t\t(click)="onClickTab(panel,$event)">\n\t\t\t\t\t\t\t<a href="javascript:;" class="tabs-inner f-inline-row f-full"\n\t\t\t\t\t\t\t\t\t[style.width.px]="!isHorizontal() ? tabWidth : null"\n\t\t\t\t\t\t\t\t\t[style.height.px]="isHorizontal() ? tabHeight : null"\n\t\t\t\t\t\t\t\t\t[ngClass]="panel.headerCls"\n\t\t\t\t\t\t\t\t\t[ngStyle]="panel.headerStyle">\n\t\t\t\t\t\t\t\t<span *ngIf="!panel.headerTemplate" class="tabs-title"\n\t\t\t\t\t\t\t\t\t\t[class.tabs-with-icon]="panel.iconCls"\n\t\t\t\t\t\t\t\t\t\t[class.tabs-closable]="panel.closable">{{panel.title}}</span>\n\t\t\t\t\t\t\t\t<ng-template *ngIf="panel.headerTemplate" [euiTabHeaderTemplate]="panel.headerTemplate.template" [tab]="panel"></ng-template>\n\t\t\t\t\t\t\t\t<span *ngIf="panel.iconCls" class="tabs-icon" [ngClass]="panel.iconCls"></span>\n\t\t\t\t\t\t\t\t<a *ngIf="panel.closable" href="javascript:;" class="tabs-close" tabindex="-1" (click)="onCloseTab(panel,$event)"></a>\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t\t</li>\n\t\t\t\t\t</ul>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="tabs-panels f-column f-full" [class.tabs-panels-noborder]="!border" [ngClass]="bodyCls">\n\t\t\t\t<ng-content></ng-content>\n\t\t\t</div>\n\t\t</div>\n\t',host:{class:"f-column"}}]}],TabsComponent.ctorParameters=function(){return[]},TabsComponent.propDecorators={panels:[{type:ContentChildren,args:[forwardRef(function(){return TabPanelComponent})]}],containerRef:[{type:ViewChild,args:["container"]}],headerRef:[{type:ViewChild,args:["header"]}],headerWidth:[{type:Input}],headerHeight:[{type:Input}],tabWidth:[{type:Input}],tabHeight:[{type:Input}],tabPosition:[{type:Input}],plain:[{type:Input}],narrow:[{type:Input}],justified:[{type:Input}],border:[{type:Input}],tabSelect:[{type:Output}],tabUnselect:[{type:Output}],tabClose:[{type:Output}],selectedIndexChange:[{type:Output}],selectedIndex:[{type:Input}]};