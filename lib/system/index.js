"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var id_1 = require("./id");
var wait_1 = require("./wait");
exports.nextId = id_1.nextId;
exports.guid = id_1.guid;
exports.wait = wait_1.wait;
exports.default = {
    nextId: exports.nextId,
    guid: exports.guid,
    wait: exports.wait
};
