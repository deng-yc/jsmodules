"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function decode(url, toLowerCase) {
    if (toLowerCase === void 0) { toLowerCase = true; }
    if (!url) {
        return null;
    }
    var queryString = url;
    var queryIndex = url.indexOf("?");
    if (queryIndex != -1) {
        queryString = url.substr(queryIndex + 1);
    }
    var pairs = queryString.split('&');
    var queryObject = {};
    for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
        var pair = pairs_1[_i];
        if (pair === '') {
            continue;
        }
        var parts = pair.split(/=(.+)?/), key = toLowerCase ? parts[0].toLowerCase() : parts[0], value = parts[1] && decodeURIComponent(parts[1].replace(/\+/g, ' '));
        var existing = queryObject[key];
        if (existing) {
            if (toString.call(existing) == "[object Array]") {
                existing.push(value);
            }
            else {
                queryObject[key] = [existing, value];
            }
        }
        else {
            queryObject[key] = value;
        }
    }
    return queryObject;
}
exports.decode = decode;
