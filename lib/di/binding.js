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
        this.scope = BindingScope.Request;
        this._params = [];
    }
    Binding.prototype.to = function (typedef) {
        var _this = this;
        this._typedef = typedef;
        this._createInstance = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var params = _this._params.concat(args);
            var instance = new ((_a = _this._typedef).bind.apply(_a, [void 0].concat(params)))();
            return instance;
            var _a;
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
    };
    Binding.prototype.inSingletonScope = function () {
        this.scope = BindingScope.Singleton;
    };
    Binding.prototype.inTransientScope = function () {
        this.scope = BindingScope.Transient;
    };
    Binding.prototype.inRequestScope = function () {
        this.scope = BindingScope.Request;
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
        if (this.scope == BindingScope.Singleton) {
            if (!this._instance) {
                this._instance = this._createInstance.apply(this, args);
            }
            return this._instance;
        }
        return this._createInstance.apply(this, args);
    };
    return Binding;
}());
exports.Binding = Binding;
