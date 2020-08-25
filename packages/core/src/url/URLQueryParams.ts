const serializeParam = function (value) {
    return encodeURIComponent(value).replace(/%20/g, "+");
};

const deserializeParam = function (value) {
    return decodeURIComponent(String(value).replace(/\+/g, " "));
};

export class URLSearchParamsImpl {
    _entries = new Map();

    constructor(searchString?: string | Array<any> | object | URLSearchParamsImpl) {
        let ssType = typeof searchString;

        if (!searchString) {
        } else if (searchString instanceof URLSearchParamsImpl) {
            searchString.forEach(function (value, name) {
                this.append(name, value);
            });
        } else if (ssType === "string") {
            this._fromString(searchString);
        } else if (ssType === "object") {
            if (Array.isArray(searchString)) {
                for (var i = 0; i < searchString.length; i++) {
                    var entry = searchString[i];
                    if (Array.isArray(entry) || entry.length !== 2) {
                        this.append(entry[0], entry[1]);
                    } else {
                        throw new TypeError(
                            "Expected [string, any] as entry at index " + i + " of URLSearchParams's input"
                        );
                    }
                }
            } else {
                for (var key in searchString as any) {
                    if (searchString.hasOwnProperty(key)) {
                        this.append(key, searchString[key]);
                    }
                }
            }
        } else {
            throw new TypeError("Unsupported input's type for URLSearchParams");
        }
    }

    append(name, value) {
        if (this.has(name)) {
            this._entries[name].push(String(value));
        } else {
            this._entries[name] = [String(value)];
        }
    }

    delete(name) {
        this._entries.delete(name);
    }

    get(name) {
        if (this.has(name)) {
            return this._entries.get(name)[0];
        }
        return null;
    }

    getAll(name) {
        if (this.has(name)) {
            return [...this._entries.get(name)];
        }
        return null;
    }

    has(name) {
        return this._entries.has(name);
    }

    forEach(callback, thisArg?) {
        this._entries.forEach((value, key) => {
            callback.call(thisArg, value, key, this);
        });
    }

    keys() {
        return this._entries.keys();
    }

    values() {
        return this._entries.values();
    }

    entries() {
        return this._entries.entries();
    }

    toString() {
        var searchArray = [];
        this.forEach((value, name) => {
            searchArray.push(serializeParam(name) + "=" + serializeParam(value));
        });
        return searchArray.join("&");
    }
    _fromString(searchString) {
        if (this._entries.size > 0) {
            this._entries.clear();
        }
        searchString = searchString.replace(/^\?/, "");
        var attributes = searchString.split("&");
        var attribute;
        for (var i = 0; i < attributes.length; i++) {
            attribute = attributes[i].split("=");
            this.append(deserializeParam(attribute[0]), attribute.length > 1 ? deserializeParam(attribute[1]) : "");
        }
    }
    sort() {}
}
