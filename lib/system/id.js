"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var global_id = 1000;
function nextId() {
    global_id = global_id + 1;
    return global_id;
}
exports.nextId = nextId;
function guid(separator) {
    if (separator === void 0) { separator = "-"; }
    var d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    }).replace(/-/g, separator);
}
exports.guid = guid;
