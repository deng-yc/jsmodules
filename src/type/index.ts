

export type IsFunction = (obj) => boolean;


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