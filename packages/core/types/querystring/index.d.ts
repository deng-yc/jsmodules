export declare function stringify(data: any): string;
export declare function parse(url: string, toLowerCase?: boolean): any;
export declare function format(url: string, queryParams: any): string;
export declare const qs: {
    stringify: typeof stringify;
    parse: typeof parse;
    format: typeof format;
};
export default qs;
//# sourceMappingURL=index.d.ts.map