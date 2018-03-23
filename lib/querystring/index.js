"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var encode_1 = require("./encode");
var decode_1 = require("./decode");
exports.encode = encode_1.encode;
exports.decode = decode_1.decode;
exports.default = {
    encode: exports.encode,
    decode: exports.decode
};
