import { BindingScope as BindingScopeType } from './binding';
import Container from './container';

export type BindingScope = BindingScopeType;

export type BindingClass<T extends new (...args) => any> = {
    new (...args);
    instance?: InstanceType<T>;
    $$di_NAME?: string;
    diOptions?: {
        name?: string;
        scope?: BindingScope;
    };
};

let tempId = 0;
function getNextId() {
    return tempId++;
}

const container = new Container();

export function Register(name?, scope: BindingScope = "Singleton") {
    if (!name) {
        name = `di-autoname-${getNextId()}`;
    }
    return {
        value<T>(value: T, overwrite = true) {
            if (!container.has(name) || overwrite) {
                container
                    .bind(name)
                    .toValue(value)
                    .setScope(scope);
            }
        },
        class(BindingClass, params: any[] = [], overwrite = true) {
            if (!container.has(name) || overwrite) {
                container
                    .bind(name)
                    .to(BindingClass)
                    .params(...params)
                    .setScope(scope);
                BindingClass.$$di_NAME = name;
            }
        },
        factory(factory: (...args) => any, params: any[] = [], overwrite = true) {
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

export function injectable(name?, scope: BindingScope = "Singleton") {
    return function(BindingClass) {
        Register(name, scope).class(BindingClass, [], false);
    };
}

export function tryResolve<T>(key, ...args): T | null {
    const bean = container.resolve<T>(key, ...args);
    if (bean) {
        return bean;
    }
    return null;
}

export function Resolve<T>(key, ...args): T {
    const bean = tryResolve<T>(key, ...args);
    if (bean) {
        return bean;
    } else {
        throw new Error(`Context has no bean with name ${key}.
      Available beans: ${[...container.getNames()].join(", ")}`);
    }
}

export function getInstance<T extends BindingClass<T>>(
    Binding: T,
    args: any[] = [],
    scope?: BindingScope
): InstanceType<T> {
    if (!Binding.$$di_NAME) {
        let name = Binding.diOptions?.name;
        if (!scope) {
            scope = Binding.diOptions?.scope || "Singleton";
        }
        Register(name, scope).class(Binding);
    }
    return Resolve(Binding.$$di_NAME, ...args);
}

/**
 * 注入一个对象
 * @deprecated
 * @param Binding
 */
function Inject(Binding: string | BindingClass<any>) {
    return function(target, propertyKey, desc?): any {
        const options = {
            get() {
                if (typeof Binding == "string") {
                    return tryResolve(Binding);
                } else {
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

function Request<T extends BindingClass<T>>(Binding: T, args: any[] = []) {
    return getInstance(Binding, args, "Request");
}

function Singleton<T extends BindingClass<T>>(Binding: T, args: any[] = []) {
    return getInstance(Binding, args, "Singleton");
}

function Transient<T extends BindingClass<T>>(Binding: T, args: any[] = []) {
    return getInstance(Binding, args, "Transient");
}

function options(options: { name?: string; scope?: BindingScope }) {
    if (!options.name) {
        options.name = `$$di_auto_${getNextId()}`;
    }
    if (!options.scope) {
        options.scope = "Singleton";
    }
    return options;
}

export const di = {
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

export default di;
