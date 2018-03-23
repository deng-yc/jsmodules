import { Binding } from "./binding";


export class Container {
    private __defs__: any = {};
    getNames() {
        return Object.getOwnPropertyNames(this.__defs__);
    }
    bind<T>(name): Binding<T> {
        if (!this.__defs__[name]) {
            var __def__ = new Binding(name, this);
            this.__defs__[name] = __def__;
        }
        return this.__defs__[name];
    }
    resolve<T>(name, ...args) {
        if (this.__defs__[name]) {
            var __def__ = this.__defs__[name] as Binding<T>;
            return __def__.resolve(...args);
        }
        return null;
    }
}
