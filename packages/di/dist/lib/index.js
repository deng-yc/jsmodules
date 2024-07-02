"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.di = exports.getInstance = exports.Resolve = exports.tryResolve = exports.injectable = exports.Register = void 0;
const tslib_1 = require("tslib");
const container_1 = tslib_1.__importDefault(require("./container"));
let tempId = 0;
function getNextId() {
    return tempId++;
}
const container = new container_1.default();
function Register(name, scope = "Singleton") {
    if (!name) {
        name = `di-autoname-${getNextId()}`;
    }
    return {
        value(value, overwrite = true) {
            if (!container.has(name) || overwrite) {
                container.bind(name).toValue(value).setScope(scope);
            }
        },
        class(BindingClass, params = [], overwrite = true) {
            if (!container.has(name) || overwrite) {
                container
                    .bind(name)
                    .to(BindingClass)
                    .params(...params)
                    .setScope(scope);
                BindingClass.$$di_NAME = name;
            }
        },
        factory(factory, params = [], overwrite = true) {
            if (!container.has(name) || overwrite) {
                container
                    .bind(name)
                    .toFactory(factory)
                    .params(...params)
                    .setScope(scope);
            }
        },
    };
}
exports.Register = Register;
function injectable(name, scope = "Singleton") {
    return function (BindingClass) {
        Register(name, scope).class(BindingClass, [], false);
    };
}
exports.injectable = injectable;
function tryResolve(key, ...args) {
    const bean = container.resolve(key, ...args);
    if (bean) {
        return bean;
    }
    return null;
}
exports.tryResolve = tryResolve;
function Resolve(key, ...args) {
    const bean = tryResolve(key, ...args);
    if (bean) {
        return bean;
    }
    else {
        throw new Error(`Context has no bean with name ${key}.
      Available beans: ${[...container.getNames()].join(", ")}`);
    }
}
exports.Resolve = Resolve;
function getInstance(Binding, args = [], scope) {
    if (!Binding.$$di_NAME) {
        const options = Binding.diOptions || {};
        let name = options.name;
        if (!scope) {
            scope = options.scope || "Singleton";
        }
        Register(name, scope).class(Binding);
    }
    return Resolve(Binding.$$di_NAME, ...args);
}
exports.getInstance = getInstance;
/**
 * 注入一个对象
 * @deprecated
 * @param Binding
 */
function Inject(Binding) {
    return function (target, propertyKey, desc) {
        const options = {
            get() {
                if (typeof Binding == "string") {
                    return tryResolve(Binding);
                }
                else {
                    return getInstance(Binding);
                }
            },
            set() {
                throw new Error("Not allowed");
            },
            enumerable: true,
            configurable: true,
        };
        if (desc) {
            return options;
        }
        Object.defineProperty(target, propertyKey, options);
        return;
    };
}
function Request(Binding, args = []) {
    return getInstance(Binding, args, "Request");
}
function Singleton(Binding, args = []) {
    return getInstance(Binding, args, "Singleton");
}
function Transient(Binding, args = []) {
    return getInstance(Binding, args, "Transient");
}
function options(options) {
    if (!options.name) {
        options.name = `$$di_auto_${getNextId()}`;
    }
    if (!options.scope) {
        options.scope = "Singleton";
    }
    return options;
}
exports.di = {
    injectable,
    tryResolve,
    Resolve,
    Inject,
    getInstance,
    Register,
    Request,
    Singleton,
    Transient,
    options,
};
exports.default = exports.di;
//# sourceMappingURL=index.js.map