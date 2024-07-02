"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleepAsync = void 0;
function sleepAsync(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
exports.sleepAsync = sleepAsync;
//# sourceMappingURL=index.js.map