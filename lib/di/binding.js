"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BindingScope;
(function (BindingScope) {
    BindingScope[BindingScope["Singleton"] = 0] = "Singleton";
    BindingScope[BindingScope["Request"] = 1] = "Request";
    BindingScope[BindingScope["Transient"] = 2] = "Transient";
})(BindingScope = exports.BindingScope || (exports.BindingScope = {}));
var Binding = /** @class */ (function () {
    function Binding(name, container) {
        this.name = name;
        this.container = container;
        this.scope = BindingScope.Singleton;
        this._params = [];
    }
    Binding.prototype.to = function (typedef) {
        var _this = this;
        this._typedef = typedef;
        this._createInstance = function () {
            var _a;
            var pamams = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                pamams[_i] = arguments[_i];
            }
            var instance = new ((_a = _this._typedef).bind.apply(_a, [void 0].concat(pamams)))();
            return instance;
        };
        return this;
    };
    Binding.prototype.toValue = function (val) {
        var _this = this;
        this._instance = val;
        this._createInstance = function () {
            return _this._instance;
        };
        return this;
    };
    Binding.prototype.toFactory = function (factory) {
        this._createInstance = factory;
        return this;
    };
    Binding.prototype.isSingletonScope = function () {
        this.setScope(BindingScope.Singleton);
        this.scope = BindingScope.Singleton;
    };
    Binding.prototype.isTransientScope = function () {
        this.setScope(BindingScope.Transient);
    };
    Binding.prototype.isRequestScope = function () {
        this.setScope(BindingScope.Request);
    };
    Binding.prototype.setScope = function (scope) {
        this.scope = scope;
        return this;
    };
    Binding.prototype.params = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._params = args;
        return this;
    };
    Binding.prototype.resolve = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var parmas = this._params.concat(args);
        if (this.scope == BindingScope.Singleton) {
            if (!this._instance) {
                this._instance = this._createInstance.apply(this, parmas);
            }
            return this._instance;
        }
        return this._createInstance.apply(this, parmas);
    };
    return Binding;
}());
exports.Binding = Binding;
exports.default = Binding;
