import { nextId } from '@jsmodules/idgenerator';
import { Logger } from '@jsmodules/logger';

import Binding, { BindingScope } from './binding';
import Container from './container';

export type DiInstanceType<T extends new (...args) => any> = T extends new (...args: any[]) => infer R ? R : any;
export type BindingClass<T extends new (...args) => any> = {
    new (...args);
    instance?: DiInstanceType<T>;
    $$di_NAME?: string;
};

const logger = Logger.tag("DI");
function getNextId() {
    return nextId("di");
}

const container = new Container();

export function Register(name?, scope: BindingScope = "Singleton") {
    if (!name) {
        name = `di-autoname-${getNextId()}`;
    }
    return {
        value<T>(value: T, overwrite = true) {
            if (!container.has(name) || overwrite) {
                logger.info("注册", name);
                container.bind(name).toValue(value).setScope(scope);
            }
        },
        class(BindingClass, params: any[] = [], overwrite = true) {
            if (!container.has(name) || overwrite) {
                logger.info("注册", name);
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
                logger.info("注册", name);
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
    return function (BindingClass) {
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
    type: BindingScope = "Singleton"
): DiInstanceType<T> {
    if (Binding.$$di_NAME) {
        return Resolve(Binding.$$di_NAME, ...args);
    }
    if (type === "Singleton") {
        if (!Binding.instance) {
            Binding.instance = new Binding(...args);
        }
        return Binding.instance;
    } else {
        return new Binding(...args);
    }
}

function Inject(Binding: string | BindingClass<any>) {
    return function (target, propertyKey, desc?): any {
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

export const di = {
    injectable,
    tryResolve,
    Resolve,
    Inject,
    getInstance,
    Register,
};

export default di;
