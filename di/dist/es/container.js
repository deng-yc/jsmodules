import { Binding } from './binding';
export default class Container {
    m = new Map();
    getNames() {
        return this.m.keys();
    }
    bind(name) {
        if (!this.m.has(name)) {
            const __def__ = new Binding(name);
            this.m.set(name, __def__);
        }
        return this.m.get(name);
    }
    has(name) {
        return this.m.has(name);
    }
    get(name) {
        if (this.has(name)) {
            return this.m.get(name);
        }
        return null;
    }
    resolve(name, ...args) {
        const binding = this.get(name);
        if (binding) {
            return binding.resolve(...args);
        }
        return null;
    }
}
//# sourceMappingURL=container.js.map