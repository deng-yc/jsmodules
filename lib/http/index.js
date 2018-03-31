"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var builder_1 = require("./builder");
var str_1 = require("../str");
var HttpFactory = /** @class */ (function () {
    function HttpFactory(baseUrl, reqType, resType) {
        this.baseUrl = baseUrl;
        this.CreateReqBuilder = reqType || builder_1.JQueryAjaxBuilder;
        this.CreateResponseBuilder = resType || builder_1.ResponseBuilder;
    }
    HttpFactory.prototype.url = function (api) {
        var url = str_1.default.trimEnd(this.baseUrl, '/') + "/" + str_1.default.trimStart(api, '/');
        return new this.CreateReqBuilder(url, new this.CreateResponseBuilder());
    };
    return HttpFactory;
}());
exports.HttpFactory = HttpFactory;
exports.default = HttpFactory;
