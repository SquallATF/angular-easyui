import { HeaderTemplateDirective, CellTemplateDirective, FooterTemplateDirective } from '../base/template-base';
export declare class GridColumnComponent {
    headerTemplate: HeaderTemplateDirective;
    cellTemplate: CellTemplateDirective;
    footerTemplate: FooterTemplateDirective;
    field: string;
    title: string;
    width: any;
    rowspan: number;
    colspan: number;
    sortable: boolean;
    order: string;
    frozen: boolean;
    align: string;
    halign: string;
    sorter: Function;
    headerCls: string;
    headerStyle: any;
    cellCss: any;
    expander: boolean;
    currOrder: string;
    ngOnInit(): void;
}
