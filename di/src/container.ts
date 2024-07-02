import { Binding } from './binding';

export default class Container {
    private m = new Map<string, Binding<any>>();

    getNames() {
        return this.m.keys();
    }

    bind<T>(name): Binding<T> {
        if (!this.m.has(name)) {
            const __def__ = new Binding(name);
            this.m.set(name, __def__);
        }
        return this.m.get(name);
    }

    has(name) {
        return this.m.has(name);
    }

    get<T>(name): Binding<T> | null {
        if (this.has(name)) {
            return this.m.get(name);
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
