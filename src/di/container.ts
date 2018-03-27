import { Binding } from "./binding";

export class Container {
    private __all_binding__: { [name: string]: Binding<any>} = {};
    getNames() {
        return Object.getOwnPropertyNames(this.__all_binding__);
    }
    bind<T>(name): Binding<T> {
        if (!this.__all_binding__[name]) {
            var __def__ = new Binding(name, this);
            this.__all_binding__[name] = __def__;
        }
        return this.__all_binding__[name];
    }

    get<T>(name) {
        var binding = this.__all_binding__[name];
        if (binding) {
            return binding;
        }
        return null;
    }

    resolve<T>(name, ...args) {
        var binding = this.get(name);
        if (binding) {
            return binding.resolve(...args);
        }
        return null;
    }
}
