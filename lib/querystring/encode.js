"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function encode(data) {
    if (!data) {
        return '';
    }
    var pairs = [];
    for (var key in data) {
        var value = data[key];
        if (toString.call(value) == "[object Array]") {
            for (var i = 0; i < value.length; ++i) {
                pairs.push(encodeURIComponent(key + '[' + i + ']') + '=' + encodeURIComponent(value[i]));
            }
            continue;
        }
        pairs.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
    }
    return pairs.join('&');
}
exports.encode = encode;
