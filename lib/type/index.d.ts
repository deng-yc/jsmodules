export declare type IsFunction = (obj) => boolean;
export interface IsType {
    isArguments?: IsFunction;
    isFunction?: IsFunction;
    isString?: IsFunction;
    isNumber?: IsFunction;
    isDate?: IsFunction;
    isRegExp?: IsFunction;
    isBoolean?: IsFunction;
    isObject?: IsFunction;
    isArray?: IsFunction;
}
export declare const Type: IsType;
export default Type;
