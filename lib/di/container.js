"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var binding_1 = require("./binding");
var Container = /** @class */ (function () {
    function Container() {
        this.__all_binding__ = {};
    }
    Container.prototype.getNames = function () {
        return Object.getOwnPropertyNames(this.__all_binding__);
    };
    Container.prototype.bind = function (name) {
        if (!this.__all_binding__[name]) {
            var __def__ = new binding_1.Binding(name, this);
            this.__all_binding__[name] = __def__;
        }
        return this.__all_binding__[name];
    };
    Container.prototype.get = function (name) {
        var binding = this.__all_binding__[name];
        if (binding) {
            return binding;
        }
        return null;
    };
    Container.prototype.resolve = function (name) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var binding = this.get(name);
        if (binding) {
            return binding.resolve.apply(binding, args);
        }
        return null;
    };
    return Container;
}());
exports.Container = Container;
