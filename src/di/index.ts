import { BindingScope } from "./binding";
import Container from "./container";

const container = new Container();

export function Register(name, scope = BindingScope.Singleton, ...params) {
    return function(BindingClass) {
        if (!container.has(name)) {
            container
                .bind(name)
                .to(BindingClass)
                .params(...params)
                .setScope(scope);
            BindingClass.$$di_NAME = name;
        }
        // return container.get(name);
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
      Available beans: ${container.getNames().join(", ")}`);
    }
}

export function Inject(injectKey = null, ...args) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return function(target, propertyKey: string, desc?): any {
        const options = {
            get() {
                const key = injectKey || propertyKey;
                const binding = container.get(key);
                if (!binding) {
                    throw new Error(`di:未注册 ${key}`);
                }
                const bean = binding.resolve(...args);
                return bean;
            },
            set() {
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

export type BindingClass<T> = {
    new (...args);
    instance?: T;
    $$di_NAME?: string;
};

export function getInstance<T>(Binding: BindingClass<T>, type = BindingScope.Singleton, ...args): T {
    if (Binding.$$di_NAME) {
        return Resolve(Binding.$$di_NAME);
    }
    if (type === BindingScope.Singleton) {
        if (!Binding.instance) {
            Binding.instance = new Binding(...args);
        }
        return Binding.instance as T;
    } else {
        return new Binding(...args);
    }
}

export function Property<T>(Binding: BindingClass<T>) {
    return function(target, propertyKey, desc?): any {
        const options = {
            get() {
                return getInstance(Binding);
            },
            set() {
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

export default {
    container,
    tryResolve,
    Resolve,
    Inject,
    Property,
    getInstance,
    Register
};
