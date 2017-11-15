export declare class DomHelper {
    getElement(element: any): any;
    isVisible(element: any): boolean;
    outerWidth(element: any): any;
    outerHeight(element: any): any;
    isChild(element: any, parent: any): boolean;
    offset(element: any): {
        left: any;
        top: any;
    };
    getScrollLeft(): number;
    getScrollTop(): number;
    getViewport(): {
        width: number;
        height: number;
    };
    isAutoSize(value: any): boolean;
    toStyleValue(value: any): string;
    addClass(element: any, className: string): void;
    removeClass(element: any, className: string): void;
    scrollTo(container: any, item: any): void;
}
export declare const domHelper: DomHelper;
