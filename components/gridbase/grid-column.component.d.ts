import { HeaderTemplateDirective, CellTemplateDirective, EditTemplateDirective, FooterTemplateDirective } from '../base/template-base';
export declare class GridColumnComponent {
    headerTemplate: HeaderTemplateDirective;
    cellTemplate: CellTemplateDirective;
    editTemplate: EditTemplateDirective;
    footerTemplate: FooterTemplateDirective;
    field: string;
    title: string;
    width: any;
    rowspan: number;
    colspan: number;
    sortable: boolean;
    editable: boolean;
    order: string;
    frozen: boolean;
    align: string;
    halign: string;
    sorter: Function;
    headerCls: string;
    headerStyle: Object;
    cellCss: any;
    expander: boolean;
    currOrder: string;
    ngOnInit(): void;
}
