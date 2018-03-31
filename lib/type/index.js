"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nativeIsArray = Array.isArray;
exports.Type = {
    isBoolean: function (obj) {
        return typeof (obj) === "boolean";
    },
    isObject: function (obj) {
        return obj === Object(obj);
    },
    isArray: nativeIsArray || function (obj) {
        return toString.call(obj) == '[object Array]';
    }
};
var isChecks = ['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'];
function makeIsFunction(name) {
    var value = "[object " + name + "]";
    exports.Type["is" + name] = function (obj) {
        return toString.call(obj) == value;
    };
}
for (var _i = 0, isChecks_1 = isChecks; _i < isChecks_1.length; _i++) {
    var check = isChecks_1[_i];
    makeIsFunction(check);
}
exports.default = exports.Type;
