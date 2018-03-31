

export type IsFunction = (obj) => boolean;


export interface IsType {
    /*
     *  isArguments
     */
    isArguments?: IsFunction;
    /*
     * 是否函数
     */
    isFunction?: IsFunction;
    /*
     * 是否String
     */
    isString?: IsFunction;
    /*
     * 是否数字
     */
    isNumber?: IsFunction;
    /*
     * 是否日期
     */
    isDate?: IsFunction;
    /*
     * 是否正则
     */
    isRegExp?: IsFunction;
    /*
     * 是否布尔
     */
    isBoolean?: IsFunction;
    /*
     * 是否对象
     */
    isObject?: IsFunction;
    /*
     * 是否数组
     */
    isArray?: IsFunction;
}
const nativeIsArray = Array.isArray;

export const Type: IsType = {
    isBoolean: function (obj) {
        return typeof (obj) === "boolean";
    },
    isObject: function (obj) {
        return obj === Object(obj);
    },
    isArray: nativeIsArray || function (obj) {
        return toString.call(obj) == '[object Array]';
    }
}

var isChecks = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'];
function makeIsFunction(name) {
    var value = `[object ${name}]`;
    Type[`is${name}`] = function (obj) {
        return toString.call(obj) == value;
    };
}
for (var check of isChecks) {
    makeIsFunction(check);
}

export default Type