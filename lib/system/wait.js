"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function wait(milliseconds) {
    return new Promise(function (resolve) {
        setTimeout(resolve, milliseconds);
    });
}
exports.wait = wait;
