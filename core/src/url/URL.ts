import { URLSearchParamsImpl } from './URLSearchParams';

function removeUsername(match, username, password) {
    if (password === "@") {
        return "";
    } else {
        return password;
    }
}
class URLImpl {
    polyfill = true;

    private _hash;
    private _hostname;
    private _password;
    private _pathname;
    private _port;
    private _protocol;
    private _username;

    searchParams: URLSearchParamsImpl;

    constructor(private url: string | URLImpl, private base?) {
        this.searchParams = new URLSearchParamsImpl();
        if (typeof url === "string") {
            const urlIsValid = /^[a-zA-z]+:\/\/.*/.test(url);
            const baseIsValid = /^[a-zA-z]+:\/\/.*/.test(base);
            if (urlIsValid) {
                this.href = url;
            } else if (baseIsValid) {
                this.href = base.replace(/\/$/, "") + "/" + url.replace(/^\//, "");
            } else {
                throw new TypeError(
                    'URL string is not valid. If using a relative url, a second argument needs to be passed representing the base URL. Example: new URL("relative/path", "http://www.example.com");'
                );
            }
        } else if (url instanceof URLImpl) {
            // Copy all of the location or link properties to the
            // new URL instance.
            // this._hash = url.hash;
            // this._hostname = url.hostname;
            // this._password = url.password ? url.password : "";
            // this._pathname = url.pathname;
            // this._port = url.port;
            // this._protocol = url.protocol;
            // this._username = url.username ? url.username : "";
            this.href = url.href;
        }
    }

    get hash() {
        return this._hash;
    }
    set hash(value: string) {
        this._hash = value.length > 0 ? "#" + value.match(/^#*(.*)/)[1] : "";
    }

    get host() {
        return this._port.length > 0 ? this._hostname + ":" + this._port : this._hostname;
    }
    set host(value) {
        const parts = value.split(":");
        this.hostname = parts[0];
        this.port = parts[1];
    }

    get hostname() {
        return this._hostname;
    }

    set hostname(value) {
        this._hostname = value.length > 0 ? encodeURIComponent(value) : this._hostname;
    }

    get href() {
        let hrefStr = this.protocol + "//";
        if (this.username.length > 0 || this.password.length > 0) {
            if (this.username.length > 0) {
                hrefStr += this.username;
            }
            if (this._password.length > 0) {
                hrefStr += ":" + this.password;
            }
            hrefStr += "@";
        }
        hrefStr += this.hostname;
        if (this.port.length > 0) {
            hrefStr += ":" + this.port;
        }
        hrefStr += this.pathname + this.search + this.hash;
        return hrefStr;
    }
    set href(value) {
        this.protocol = value;
        value = value.replace(/.*?:\/*/, "");
        const usernameMatch = value.match(/([^:]*).*@/);
        this.username = usernameMatch ? usernameMatch[1] : "";
        value = value.replace(/([^:]*):?(.*@)/, removeUsername);
        const passwordMatch = value.match(/.*(?=@)/);
        this.password = passwordMatch ? passwordMatch[0] : "";
        value = value.replace(/.*@/, "");
        this.hostname = value.match(/[^:/?]*/);
        const portMatch = value.match(/:(\d+)/);
        this.port = portMatch ? portMatch[1] : "";
        const pathnameMatch = value.match(/\/([^?#]*)/);
        this.pathname = pathnameMatch ? pathnameMatch[1] : "";
        const searchMatch = value.match(/\?[^#]*/);
        this.search = searchMatch ? searchMatch[0] : "";
        const hashMatch = value.match(/\#.*/);
        this.hash = hashMatch ? hashMatch[0] : "";
    }

    get origin() {
        let originStr = this._protocol + "//" + this._hostname;
        if (this._port.length > 0) {
            originStr += ":" + this._port;
        }
        return originStr;
    }
    set origin(value) {
        this.protocol = value;
        value = value.replace(/.*?:\/*/, "");
        this.hostname = value.match(/[^:/?]*/);
        const portMatch = value.match(/:(\d+)/);
        this.port = portMatch ? portMatch[1] : "";
    }

    get password() {
        return this._password;
    }
    set password(value) {
        this._password = encodeURIComponent(value);
    }

    get pathname() {
        return this._pathname;
    }
    set pathname(value) {
        this._pathname = "/" + value.match(/\/?(.*)/)[1];
    }

    get port() {
        return this._port;
    }
    set port(value) {
        if (isNaN(value) || value === "") {
            this._port = "";
        } else {
            this._port = Math.min(65535, value).toString();
        }
    }

    get protocol() {
        return this._protocol;
    }
    set protocol(value) {
        this._protocol = value.match(/[^/:]*/)[0] + ":";
    }

    get search() {
        return "?" + this.searchParams.toString();
    }
    set search(value) {
        this.searchParams._fromString(value);
    }

    get username() {
        return this._username;
    }
    set username(v) {
        this._username = v;
    }
}

const $scope = typeof global !== "undefined" ? global : typeof window !== "undefined" ? window : this;

var NativeURL = (function () {
    try {
        if ($scope.URL) {
            let url = new $scope.URL("/foo?foo=bar");
            if (url.searchParams && url.searchParams.get("foo") === "bar") {
                return $scope.URL;
            }
        }
        return URLImpl;
    } catch (e) {}
    return URLImpl;
})();

export const URL = NativeURL;
