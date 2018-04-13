"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var container_1 = require("./container");
var binding_1 = require("./binding");
var container = new container_1.Container();
/**
 * 解析依赖注入对象，如果容器中没有对应的对象，不会报错
 * @param key 名称
 * @param args 参数
 */
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
/**
 * 解析依赖注入对象，如果容器中没有对应的对象，会报错
 * @param key 名称
 * @param args 参数
 */
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
        console.error("Context has no bean with name " + key + ". \n      Available beans: " + container.getNames().join(", "));
    }
}
exports.Resolve = Resolve;
/**
 * 定义一个修饰器，依赖注入
 * @param injectKey 对象的key
 */
function Inject(injectKey) {
    if (injectKey === void 0) { injectKey = null; }
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return function (target, propertyKey) {
        Object.defineProperty(target, propertyKey, {
            get: function () {
                var key = injectKey || propertyKey;
                var binding = container.get(key);
                var bean;
                if (binding.scope == binding_1.BindingScope.Transient) {
                    bean = binding.resolve.apply(binding, args);
                }
                else {
                    var targetKey = "__diImport__" + key + "__";
                    if (!target[targetKey]) {
                        target[targetKey] = binding.resolve.apply(binding, args);
                    }
                    bean = target[targetKey];
                }
                return bean;
            },
            set: function () {
                throw new Error("Not allowed");
            },
            enumerable: true,
            configurable: true
        });
    };
}
exports.Inject = Inject;
exports.default = {
    container: container,
    tryResolve: tryResolve,
    Resolve: Resolve,
    Inject: Inject
};
