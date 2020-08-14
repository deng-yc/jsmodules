declare function use(callback: (state: any) => {
    [key: string]: any;
}): {
    use: typeof use;
    initAsync: typeof initAsync;
};
declare function initAsync(): Promise<{}>;
export declare const Application: {
    use: typeof use;
    initAsync: typeof initAsync;
};
export {};
//# sourceMappingURL=index.d.ts.map