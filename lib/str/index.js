"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Format_1 = require("./Format");
function startsWith(str, suffix) {
    return str.indexOf(suffix) === 0;
}
function endsWith(str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
function trim(str) {
    return str.replace(/^\s+|\s+$/gm, '');
}
function trimEnd(str, chars) {
    if (endsWith(str, chars)) {
        return str.substring(0, str.length - chars.length);
    }
    return str;
}
function trimStart(str, chars) {
    if (startsWith(str, chars))
        return str.substring(chars.length, str.length);
    return str;
}
function isEmptyOrNull(str) {
    return !(str && str != "");
}
exports.str = {
    format: Format_1.default,
    isEmptyOrNull: isEmptyOrNull,
    startsWith: startsWith,
    endsWith: endsWith,
    trim: trim,
    trimEnd: trimEnd,
    trimStart: trimStart
};
exports.default = exports.str;
