import { ElementRef, EventEmitter } from '@angular/core';
import { GridColumnComponent } from './grid-column.component';
import { GridColumnGroupComponent } from './grid-column-group.component';
export declare const GRID_HEADER_TEMPLATE: string;
export declare class GridHeaderComponent {
    headerRef: ElementRef;
    contentRef: ElementRef;
    columns: GridColumnComponent[];
    columnGroup: GridColumnGroupComponent;
    paddingWidth: number;
    cellClick: EventEmitter<{}>;
    hoverColumn: GridColumnComponent;
    _height: number;
    height: number;
    private _scrollLeft;
    scrollLeft: number;
    onCellClick(event: any, col: any): void;
}
