"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var binding_1 = require("./binding");
var Container = /** @class */ (function () {
    function Container() {
        this.__defs__ = {};
    }
    Container.prototype.getNames = function () {
        return Object.getOwnPropertyNames(this.__defs__);
    };
    Container.prototype.bind = function (name) {
        if (!this.__defs__[name]) {
            var __def__ = new binding_1.Binding(name, this);
            this.__defs__[name] = __def__;
        }
        return this.__defs__[name];
    };
    Container.prototype.resolve = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.__defs__[name]) {
            var __def__ = this.__defs__[name];
            return __def__.resolve.apply(__def__, args);
        }
        return null;
    };
    return Container;
}());
exports.Container = Container;
