"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var binding_1 = require("./binding");
var container_1 = require("./container");
var container = new container_1.default();
function Register(name, scope) {
    if (scope === void 0) { scope = binding_1.BindingScope.Singleton; }
    var params = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        params[_i - 2] = arguments[_i];
    }
    return function (BindingClass) {
        var _a;
        if (!container.has(name)) {
            (_a = container
                .bind(name)
                .to(BindingClass)).params.apply(_a, params).setScope(scope);
            BindingClass.$$di_NAME = name;
        }
        // return container.get(name);
    };
}
exports.Register = Register;
function tryResolve(key) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var bean = container.resolve.apply(container, [key].concat(args));
    if (bean) {
        return bean;
    }
    return null;
}
exports.tryResolve = tryResolve;
function Resolve(key) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var bean = tryResolve.apply(void 0, [key].concat(args));
    if (bean) {
        return bean;
    }
    else {
        throw new Error("Context has no bean with name " + key + ".\n      Available beans: " + container.getNames().join(", "));
    }
}
exports.Resolve = Resolve;
function Inject(injectKey) {
    if (injectKey === void 0) { injectKey = null; }
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function (target, propertyKey, desc) {
        var options = {
            get: function () {
                var key = injectKey || propertyKey;
                var binding = container.get(key);
                if (!binding) {
                    throw new Error("di:\u672A\u6CE8\u518C " + key);
                }
                var bean = binding.resolve.apply(binding, args);
                return bean;
            },
            set: function () {
                throw new Error("Not allowed");
            },
            enumerable: true,
            configurable: true
        };
        if (desc) {
            return options;
        }
        Object.defineProperty(target, propertyKey, options);
    };
}
exports.Inject = Inject;
function getInstance(Binding, type) {
    if (type === void 0) { type = binding_1.BindingScope.Singleton; }
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    if (Binding.$$di_NAME) {
        return Resolve(Binding.$$di_NAME);
    }
    if (type === binding_1.BindingScope.Singleton) {
        if (!Binding.instance) {
            Binding.instance = new (Binding.bind.apply(Binding, [void 0].concat(args)))();
        }
        return Binding.instance;
    }
    else {
        return new (Binding.bind.apply(Binding, [void 0].concat(args)))();
    }
}
exports.getInstance = getInstance;
function Property(Binding) {
    return function (target, propertyKey, desc) {
        var options = {
            get: function () {
                return getInstance(Binding);
            },
            set: function () {
                throw new Error("Not allowed");
            },
            enumerable: true,
            configurable: true
        };
        if (desc) {
            return options;
        }
        Object.defineProperty(target, propertyKey, options);
        return;
    };
}
exports.Property = Property;
exports.default = {
    container: container,
    tryResolve: tryResolve,
    Resolve: Resolve,
    Inject: Inject,
    Property: Property,
    getInstance: getInstance,
    Register: Register
};
