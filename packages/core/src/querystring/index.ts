/* eslint-disable @typescript-eslint/no-explicit-any */
export function stringify(data) {
    if (!data) {
        return "";
    }
    const pairs: string[] = [];
    for (const key in data) {
        const value = data[key];
        if (toString.call(value) == "[object Array]") {
            for (let i = 0; i < value.length; ++i) {
                pairs.push(encodeURIComponent(key + "[" + i + "]") + "=" + encodeURIComponent(value[i]));
            }
            continue;
        }
        pairs.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }
    return pairs.join("&");
}

export function parse(url: string, toLowerCase = true): any {
    if (!url) {
        return null;
    }
    let queryString = url.replace(/#.*$/, "");
    const queryIndex = url.indexOf("?");
    if (queryIndex != -1) {
        queryString = url.substr(queryIndex + 1);
    }

    const pairs = queryString.split("&");
    const queryObject = {};
    for (const pair of pairs) {
        if (pair === "") {
            continue;
        }
        const parts = pair.split(/=(.+)?/),
            key = toLowerCase ? parts[0].toLowerCase() : parts[0],
            value = parts[1] && decodeURIComponent(parts[1].replace(/\+/g, " "));
        const existing = queryObject[key];
        if (existing) {
            if (toString.call(existing) == "[object Array]") {
                existing.push(value);
            } else {
                queryObject[key] = [existing, value];
            }
        } else {
            queryObject[key] = value;
        }
    }
    return queryObject;
}

export function format(url: string, queryParams) {
    if (!url) {
        return url;
    }
    url = url.replace(/#.*$/, "");
    let path = url,
        search = "";
    if (path.indexOf("?") > -1) {
        const urls = path.split("?");
        path = urls[0];
        search = urls[1] || "";
    }
    const params = parse(search);
    const queryString = stringify({ ...params, ...queryParams });
    return `${path}?${queryString}`;
}

export const qs = {
    stringify,
    parse,
    format,
};

export default qs;
