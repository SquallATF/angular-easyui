import { ElementRef } from '@angular/core';
import { DataGridComponent } from './datagrid.component';
import { DataGridBodyComponent } from './datagrid-body.component';
export declare class DataGridTableComponent {
    gridBody: DataGridBodyComponent;
    groupTitleRef: ElementRef;
    columns: any;
    rows: any;
    grid: DataGridComponent;
    readonly showExpandIcon: boolean;
    readonly groupTitleWidth: any;
    readonly titleLeft: number;
    constructor(gridBody: DataGridBodyComponent);
    onRowClick(row: any, event: any): void;
    onGroupExpanderClick(value: any, event: any): void;
    onDetailExpanderClick(row: any, event: any): void;
    getRowIndex(rowIndex: number): any;
    getCss(css: any, row: any, value: any, type: string): any;
    getRowClass(row: any): any;
    getRowStyle(row: any): any;
    getCellClass(column: any, row: any): any;
    getCellStyle(column: any, row: any): any;
}
