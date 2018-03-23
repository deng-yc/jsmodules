



export function encode(data) {
    if (!data) {
        return '';
    }
    var pairs = [];
    for (var key in data) {
        var value = data[key];
        if (toString.call(value) == "[object Array]") {
            for (var i = 0; i < value.length; ++i) {
                pairs.push(encode(key + '[' + i + ']') + '=' + encode(value[i]));
            }
            continue;
        }
        pairs.push(encode(key) + '=' + encode(data[key]));
    }
    return pairs.join('&');
}