export declare const str: {
    format: (target: string, ...args: any[]) => string;
    isEmptyOrNull: (str: any) => boolean;
    startsWith: (str: any, suffix: any) => boolean;
    endsWith: (str: string, suffix: any) => boolean;
    trim: (str: string) => string;
    trimEnd: (str: string, chars: any) => string;
    trimStart: (str: string, chars: string) => string;
};
export default str;
