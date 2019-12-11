/* eslint-disable @typescript-eslint/no-explicit-any */
import { Binding } from './binding';

export default class Container {
    private __all_binding__: { [name: string]: Binding<any> } = {};
    getNames() {
        return Object.getOwnPropertyNames(this.__all_binding__);
    }
    bind<T>(name): Binding<T> {
        if (!this.__all_binding__[name]) {
            const __def__ = new Binding(name, this);
            this.__all_binding__[name] = __def__;
        }
        return this.__all_binding__[name];
    }

    has(name) {
        if (this.__all_binding__[name]) {
            return true;
        }
        return false;
    }

    get<T>(name): Binding<T> | null {
        const binding: Binding<T> = this.__all_binding__[name];
        if (binding) {
            return binding;
        }
        return null;
    }

    resolve<T>(name, ...args): T | null {
        const binding: Binding<T> = this.get(name);
        if (binding) {
            return binding.resolve(...args);
        }
        return null;
    }
}
