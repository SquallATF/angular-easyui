import { QueryList, EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';
import { GridColumnComponent } from './grid-column.component';
import { GridColumnGroupComponent } from './grid-column-group.component';
import { ListBaseComponent } from '../base/list-base.component';
export declare const GRIDBASE_TEMPLATE: string;
export declare class GridBaseComponent extends ListBaseComponent {
    cdRef: ChangeDetectorRef;
    columnRefs: QueryList<GridColumnComponent>;
    groupRefs: QueryList<GridColumnGroupComponent>;
    viewRef: ElementRef;
    view1: any;
    view2: any;
    view3: any;
    rowHeight: number;
    rowCss: any;
    frozenWidth: any;
    frozenAlign: string;
    sorts: any[];
    multiSort: boolean;
    showHeader: boolean;
    showFooter: boolean;
    pageChange: EventEmitter<{}>;
    sortChange: EventEmitter<{}>;
    leftGroup: GridColumnGroupComponent;
    rightGroup: GridColumnGroupComponent;
    centerGroup: GridColumnGroupComponent;
    leftColumns: GridColumnComponent[];
    rightColumns: GridColumnComponent[];
    centerColumns: GridColumnComponent[];
    headerHeight: number;
    footerRows: any[];
    private _rows;
    private _footerData;
    readonly leftFrozenWidth: any;
    readonly rightFrozenWidth: any;
    readonly allColumns: any[];
    rows: any[];
    footerData: any;
    constructor(cdRef: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    private headerResized;
    ngAfterViewChecked(): void;
    initHeaderHeight(): void;
    initColumns(): void;
    getColumnLayout(group: GridColumnGroupComponent): any[];
    private getColumnCount(group);
    private getColumnIndex(a);
    onBodyScroll(event: any): void;
    addSort(col: GridColumnComponent): void;
    initColumnSort(): void;
    findColumn(field: string): GridColumnComponent;
}
