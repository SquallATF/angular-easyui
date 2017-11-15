/**
 * EasyUI for Angular 0.1
 * 
 * Copyright (c) 2009-2017 www.jeasyui.com. All rights reserved.
 *
 * Licensed under the freeware license: https://www.jeasyui.com/license_freeware2.php
 * To use it on other terms please contact us: info@jeasyui.com
 *
 */
import { Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { CellTemplateDirective } from '../base/template-base';
export var CALENDAR_TEMPLATE = "\n\t<div class=\"calendar f-column f-full\" [class.calendar-noborder]=\"!border\">\n\t\t<div class=\"calendar-header f-row f-noshrink\">\n\t\t\t<div class=\"calendar-title f-row f-full f-content-center\">\n\t\t\t\t<span class=\"calendar-text\" (click)=\"showMenu=!showMenu\">{{months[month-1]}} {{year}}</span>\n\t\t\t</div>\n\t\t\t<div class=\"calendar-nav calendar-prevmonth\" (click)=\"prevMonth()\"></div>\n\t\t\t<div class=\"calendar-nav calendar-nextmonth\" (click)=\"nextMonth()\"></div>\n\t\t\t<div class=\"calendar-nav calendar-prevyear\" (click)=\"prevYear()\"></div>\n\t\t\t<div class=\"calendar-nav calendar-nextyear\" (click)=\"nextYear()\"></div>\n\t\t</div>\n\t\t<div class=\"calendar-body f-full\">\n\t\t\t<div class=\"calendar-content\">\n\t\t\t<table class=\"calendar-dtable\" cellspacing=\"0\" cellpadding=\"0\" border=\"0\">\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th *ngIf=\"showWeek\">{{weekNumberHeader}}</th>\n\t\t\t\t\t\t<th *ngFor=\"let week of headerData\">{{week}}</th>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t\t\t<tr *ngFor=\"let week of bodyData\">\n\t\t\t\t\t\t<td *ngIf=\"showWeek\" class=\"calendar-week\">{{calcWeekNumber(week)}}</td>\n\t\t\t\t\t\t<td *ngFor=\"let day of week;let dayIndex=index\" class=\"calendar-day\"\n\t\t\t\t\t\t\t\t[class.calendar-other-month]=\"day[0]!=year || day[1]!=month\"\n\t\t\t\t\t\t\t\t[class.calendar-saturday]=\"dayIndex==saIndex\"\n\t\t\t\t\t\t\t\t[class.calendar-sunday]=\"dayIndex==suIndex\"\n\t\t\t\t\t\t\t\t[class.calendar-today]=\"isToday(day)\"\n\t\t\t\t\t\t\t\t[class.calendar-selected]=\"isSelected(day)\"\n\t\t\t\t\t\t\t\t[class.calendar-disabled]=\"!isValid(day)\"\n\t\t\t\t\t\t\t\t[class.calendar-nav-hover]=\"isHighlighted(day)\"\n\t\t\t\t\t\t\t\t(mouseenter)=\"isValid(day) && highlightDay=day\"\n\t\t\t\t\t\t\t\t(mouseleave)=\"highlightDay=null\"\n\t\t\t\t\t\t\t\t(click)=\"onDayClick(day, $event)\">\n\t\t\t\t\t\t\t<ng-container *ngIf=\"!cellTemplate\">{{day[2]}}</ng-container>\n\t\t\t\t\t\t\t<ng-template *ngIf=\"cellTemplate\" [euiCalendarCellTemplate]=\"cellTemplate.template\" [date]=\"toDate(day)\"></ng-template>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</tbody>\n\t\t\t</table>\n\t\t\t</div>\n\t\t\t<div *ngIf=\"showMenu\" class=\"calendar-menu f-column\">\n\t\t\t\t<div class=\"calendar-menu-year-inner\">\n\t\t\t\t\t<span class=\"calendar-nav calendar-menu-prev\" (click)=\"prevYear()\"></span>\n\t\t\t\t\t<span><input class=\"calendar-menu-year\" type=\"text\" [(ngModel)]=\"year\"></span>\n\t\t\t\t\t<span class=\"calendar-nav calendar-menu-next\" (click)=\"nextYear()\"></span>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"calendar-menu-month-inner f-full\">\n\t\t\t\t\t<div class=\"calendar-content\">\n\t\t\t\t\t<table class=\"calendar-mtable\">\n\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t<tr *ngFor=\"let rowIndex of [0,1,2]\">\n\t\t\t\t\t\t\t\t<td *ngFor=\"let colIndex of [0,1,2,3]\" \n\t\t\t\t\t\t\t\t\t\tclass=\"calendar-nav calendar-menu-month\"\n\t\t\t\t\t\t\t\t\t\t[class.calendar-nav-hover]=\"highlightMonth==months[rowIndex*4+colIndex]\"\n\t\t\t\t\t\t\t\t\t\t[class.calendar-selected]=\"months[month-1]==months[rowIndex*4+colIndex]\"\n\t\t\t\t\t\t\t\t\t\t(mouseenter)=\"highlightMonth=months[rowIndex*4+colIndex]\"\n\t\t\t\t\t\t\t\t\t\t(mouseleave)=\"highlightMonth=null\"\n\t\t\t\t\t\t\t\t\t\t(click)=\"onMonthClick(months[rowIndex*4+colIndex], $event)\">\n\t\t\t\t\t\t\t\t\t{{months[rowIndex*4+colIndex]}}\n\t\t\t\t\t\t\t\t</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</tbody>\n\t\t\t\t\t</table>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n";
var CalendarComponent = (function () {
    function CalendarComponent() {
        //@Input() firstDay: number = 0;
        this.weeks = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.border = true;
        this.showWeek = false;
        this.weekNumberHeader = '';
        this.validator = function () { return true; };
        this.selectionChange = new EventEmitter();
        this.highlightDay = null;
        this.highlightMonth = null;
        this.headerData = [];
        this.bodyData = [];
        this.showMenu = false;
        this._firstDay = 0;
        this._year = new Date().getFullYear();
        this._month = new Date().getMonth() + 1;
    }
    Object.defineProperty(CalendarComponent.prototype, "firstDay", {
        get: function () {
            return this._firstDay;
        },
        set: function (value) {
            this._firstDay = value;
            this.headerData = this.getHeaderData();
            this.bodyData = this.getWeeks();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "year", {
        get: function () {
            return this._year;
        },
        set: function (value) {
            this._year = value;
            this.bodyData = this.getWeeks();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "month", {
        get: function () {
            return this._month;
        },
        set: function (value) {
            this._month = value;
            this.bodyData = this.getWeeks();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "saIndex", {
        get: function () {
            var index = 6 - this.firstDay;
            if (index >= 7) {
                index -= 7;
            }
            return index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CalendarComponent.prototype, "suIndex", {
        get: function () {
            var index = this.saIndex + 1;
            if (index >= 7) {
                index -= 7;
            }
            return index;
        },
        enumerable: true,
        configurable: true
    });
    CalendarComponent.prototype.ngOnInit = function () {
        this.moveTo(this.selection);
        this.headerData = this.getHeaderData();
        this.bodyData = this.getWeeks();
    };
    CalendarComponent.prototype.onDayClick = function (day, $event) {
        //event.stopPropagation();
        if (this.isValid(day)) {
            this.year = day[0];
            this.month = day[1];
            this.selectDate(new Date(day[0], day[1] - 1, day[2]));
        }
    };
    CalendarComponent.prototype.onMonthClick = function (monthName, $event) {
        event.stopPropagation();
        var index = this.months.indexOf(monthName);
        if (index >= 0) {
            this.month = index + 1;
            this.showMenu = false;
            this.highlightMonth = null;
        }
    };
    CalendarComponent.prototype.isHighlighted = function (day) {
        if (this.highlightDay) {
            if (this.highlightDay.join(',') == day.join(',')) {
                return true;
            }
        }
        return false;
    };
    CalendarComponent.prototype.isSelected = function (day) {
        if (this.selection) {
            var y = this.selection.getFullYear();
            var m = this.selection.getMonth() + 1;
            var d = this.selection.getDate();
            if (y == day[0] && m == day[1] && d == day[2]) {
                return true;
            }
        }
        return false;
    };
    CalendarComponent.prototype.isToday = function (day) {
        var now = new Date();
        var y = now.getFullYear();
        var m = now.getMonth() + 1;
        var d = now.getDate();
        if (y == day[0] && m == day[1] && d == day[2]) {
            return true;
        }
        return false;
    };
    CalendarComponent.prototype.isValid = function (day) {
        var date = new Date(day[0], day[1] - 1, day[2]);
        return this.validator(date);
    };
    CalendarComponent.prototype.isDiff = function (date1, date2) {
        if (date1 != null && date2 == null) {
            return true;
        }
        if (date1 == null && date2 != null) {
            return true;
        }
        if (date1 != null && date2 != null) {
            if (this.toArray(date1).join(',') != this.toArray(date2).join(',')) {
                return true;
            }
        }
        return false;
    };
    CalendarComponent.prototype.toDate = function (day) {
        return new Date(day[0], day[1] - 1, day[2]);
    };
    CalendarComponent.prototype.toArray = function (date) {
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
    };
    CalendarComponent.prototype.calcWeekNumber = function (week) {
        var date = new Date(week[0][0], week[0][1] - 1, week[0][2]);
        return this.getWeekNumber(date);
    };
    CalendarComponent.prototype.getWeekNumber = function (date) {
        var checkDate = new Date(date.getTime());
        checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
        var time = checkDate.getTime();
        checkDate.setMonth(0);
        checkDate.setDate(1);
        return Math.floor(Math.round((time - checkDate.getTime()) / 86400000) / 7) + 1;
    };
    CalendarComponent.prototype.getHeaderData = function () {
        var data1 = this.weeks.slice(this.firstDay, this.weeks.length);
        var data2 = this.weeks.slice(0, this.firstDay);
        return data1.concat(data2);
    };
    CalendarComponent.prototype.getWeeks = function () {
        var dates = [];
        var lastDay = new Date(this.year, this.month, 0).getDate();
        for (var i = 1; i <= lastDay; i++)
            dates.push([this.year, this.month, i]);
        // group date by week
        var weeks = [];
        var week = [];
        var memoDay = -1;
        while (dates.length > 0) {
            var date = dates.shift();
            week.push(date);
            var day = new Date(date[0], date[1] - 1, date[2]).getDay();
            if (memoDay == day) {
                day = 0;
            }
            else if (day == (this.firstDay == 0 ? 7 : this.firstDay) - 1) {
                weeks.push(week);
                week = [];
            }
            memoDay = day;
        }
        if (week.length) {
            weeks.push(week);
        }
        var firstWeek = weeks[0];
        if (firstWeek.length < 7) {
            while (firstWeek.length < 7) {
                var firstDate = firstWeek[0];
                var date = new Date(firstDate[0], firstDate[1] - 1, firstDate[2] - 1);
                firstWeek.unshift([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            }
        }
        else {
            var firstDate = firstWeek[0];
            var week_1 = [];
            for (var i = 1; i <= 7; i++) {
                var date = new Date(firstDate[0], firstDate[1] - 1, firstDate[2] - i);
                week_1.unshift([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            }
            weeks.unshift(week_1);
        }
        var lastWeek = weeks[weeks.length - 1];
        while (lastWeek.length < 7) {
            var lastDate = lastWeek[lastWeek.length - 1];
            var date = new Date(lastDate[0], lastDate[1] - 1, lastDate[2] + 1);
            lastWeek.push([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
        }
        if (weeks.length < 6) {
            var lastDate = lastWeek[lastWeek.length - 1];
            var week_2 = [];
            for (var i = 1; i <= 7; i++) {
                var date = new Date(lastDate[0], lastDate[1] - 1, lastDate[2] + i);
                week_2.push([date.getFullYear(), date.getMonth() + 1, date.getDate()]);
            }
            weeks.push(week_2);
        }
        return weeks;
    };
    CalendarComponent.prototype.nextYear = function () {
        this.year++;
    };
    CalendarComponent.prototype.prevYear = function () {
        this.year--;
    };
    CalendarComponent.prototype.nextMonth = function () {
        this.month = this.month == 12 ? 1 : this.month + 1;
    };
    CalendarComponent.prototype.prevMonth = function () {
        this.month = this.month == 1 ? 12 : this.month - 1;
    };
    CalendarComponent.prototype.moveTo = function (date) {
        if (date) {
            this.year = date.getFullYear();
            this.month = date.getMonth() + 1;
        }
    };
    CalendarComponent.prototype.highlightDate = function (date) {
        this.highlightDay = date ? this.toArray(date) : null;
    };
    CalendarComponent.prototype.selectDate = function (date) {
        if (date === void 0) { date = null; }
        if (!date) {
            if (this.highlightDay) {
                date = this.toDate(this.highlightDay);
            }
            else {
                date = this.selection;
            }
        }
        if (this.isDiff(this.selection, date)) {
            this.selection = date;
            this.selectionChange.emit(this.selection);
        }
    };
    CalendarComponent.prototype.navDate = function (step) {
        var date = this.highlightDay ? this.toDate(this.highlightDay) : this.selection;
        if (date) {
            date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + step);
        }
        else {
            date = new Date();
        }
        this.moveTo(date);
        this.highlightDate(date);
    };
    return CalendarComponent;
}());
export { CalendarComponent };
CalendarComponent.decorators = [
    { type: Component, args: [{
                selector: 'eui-calendar',
                template: CALENDAR_TEMPLATE,
                host: {
                    'class': 'f-column'
                }
            },] },
];
/** @nocollapse */
CalendarComponent.ctorParameters = function () { return []; };
CalendarComponent.propDecorators = {
    'cellTemplate': [{ type: ContentChild, args: [CellTemplateDirective,] },],
    'weeks': [{ type: Input },],
    'months': [{ type: Input },],
    'border': [{ type: Input },],
    'showWeek': [{ type: Input },],
    'weekNumberHeader': [{ type: Input },],
    'selection': [{ type: Input },],
    'validator': [{ type: Input },],
    'selectionChange': [{ type: Output },],
    'firstDay': [{ type: Input },],
    'year': [{ type: Input },],
    'month': [{ type: Input },],
};
//# sourceMappingURL=calendar.component.js.map