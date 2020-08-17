export declare const Application: {
    use(callback: (state: any) => {
        [key: string]: any;
    }): any;
    initAsync(): Promise<{}>;
};
