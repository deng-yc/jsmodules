import format from './Format';
declare function startsWith(str: any, suffix: any): boolean;
declare function endsWith(str: string, suffix: any): boolean;
declare function trim(str: string): string;
declare function trimEnd(str: string, chars: any): string;
declare function trimStart(str: string, chars: string): string;
declare function isEmptyOrNull(str: any): boolean;
export declare const str: {
    format: typeof format;
    isEmptyOrNull: typeof isEmptyOrNull;
    startsWith: typeof startsWith;
    endsWith: typeof endsWith;
    trim: typeof trim;
    trimEnd: typeof trimEnd;
    trimStart: typeof trimStart;
};
export default str;
