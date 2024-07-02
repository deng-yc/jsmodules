"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.idgenerator = void 0;
const scopes = {
    default: 1000,
};
function nextId(scope = "default") {
    scopes[scope] = scopes[scope] || 0;
    scopes[scope]++;
    return scopes[scope];
}
function guid(separator = "-") {
    let d = new Date().getTime();
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
        .replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == "x" ? r : (r & 0x7) | 0x8).toString(16);
    })
        .replace(/-/g, separator);
}
exports.idgenerator = {
    nextId,
    guid,
};
//# sourceMappingURL=index.js.map