/**
 * EasyUI for Angular 0.2
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
var DomHelper=function(){function DomHelper(){}return DomHelper.prototype.getElement=function(element){return"string"==typeof element?document.querySelector(element):element},DomHelper.prototype.isVisible=function(element){return this.getElement(element).offsetWidth>0},DomHelper.prototype.outerWidth=function(element){var el=this.getElement(element),style=getComputedStyle(el);return el.offsetWidth+(parseInt(style.getPropertyValue("margin-left"))||0)+(parseInt(style.getPropertyValue("margin-right"))||0)},DomHelper.prototype.outerHeight=function(element){var el=this.getElement(element),style=getComputedStyle(el);return el.offsetHeight+(parseInt(style.getPropertyValue("margin-top"))||0)+(parseInt(style.getPropertyValue("margin-bottom"))||0)},DomHelper.prototype.isChild=function(element,parent){for(var p=this.getElement(parent),el=this.getElement(element);el&&el!=p;)el=el.parentNode;return el==p},DomHelper.prototype.offset=function(element){var rect=this.getElement(element).getBoundingClientRect(),left=rect.left,top=rect.top;return{left:left+this.getScrollLeft(),top:top+this.getScrollTop()}},DomHelper.prototype.getScrollLeft=function(){return Math.max(document.documentElement.scrollLeft,document.body.scrollLeft)},DomHelper.prototype.getScrollTop=function(){return Math.max(document.documentElement.scrollTop,document.body.scrollTop)},DomHelper.prototype.getViewport=function(){var de=document.documentElement,body=document.getElementsByTagName("body")[0];return{width:window.innerWidth||de.clientWidth||body.clientWidth,height:window.innerHeight||de.clientHeight||body.clientHeight}},DomHelper.prototype.isAutoSize=function(value){var v=String(value);return"auto"==v||""==v},DomHelper.prototype.toStyleValue=function(value){if(null==value)return null;var v=String(value),endchar=v.substr(v.length-1,1);return endchar>="0"&&endchar<="9"?v+"px":v},DomHelper.prototype.addClass=function(element,className){this.getElement(element).classList.add(className)},DomHelper.prototype.removeClass=function(element,className){this.getElement(element).classList.remove(className)},DomHelper.prototype.scrollTo=function(container,item){var containerOffset=domHelper.offset(container),itemOffset=domHelper.offset(item),containerHeight=domHelper.outerHeight(container),itemHeight=domHelper.outerHeight(item),offsetTop=itemOffset.top-containerOffset.top;offsetTop<0?container.scrollTop=container.scrollTop+offsetTop-1:offsetTop>containerHeight-itemHeight&&(container.scrollTop=container.scrollTop-(containerHeight-itemHeight-offsetTop-1))},DomHelper}();export{DomHelper};export var domHelper=new DomHelper;