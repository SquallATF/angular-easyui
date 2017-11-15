import { EventEmitter, ElementRef } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';
export declare class DialogComponent extends PanelComponent {
    hostRef: ElementRef;
    title: string;
    border: boolean;
    borderType: string;
    closable: boolean;
    modal: boolean;
    onOpen: EventEmitter<{}>;
    onClose: EventEmitter<{}>;
    maskEl: HTMLElement;
    initialized: boolean;
    _panelCls: string;
    _headerCls: string;
    _bodyCls: string;
    _footerCls: string;
    _closed: boolean;
    panelCls: string;
    headerCls: string;
    bodyCls: string;
    footerCls: string;
    closed: boolean;
    constructor(hostRef: ElementRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    initDialog(): void;
    openMask(): void;
    closeMask(): void;
    open(): void;
    close(): void;
    moveToTop(): void;
    hcenter(): void;
    vcenter(): void;
    center(): void;
    static zIndex: number;
}
