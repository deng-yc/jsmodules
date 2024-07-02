const cached = {};
export class Binding {
    name;
    scope = "Singleton";
    getInstance;
    _instance;
    _params = [];
    constructor(name) {
        this.name = name;
    }
    _typedef;
    to(typedef) {
        this._typedef = typedef;
        this.getInstance = (...pamams) => {
            const instance = new this._typedef(...pamams);
            return instance;
        };
        return this;
    }
    toValue(val) {
        this._instance = val;
        this.getInstance = () => {
            return this._instance;
        };
        return this;
    }
    toFactory(factory) {
        this.getInstance = factory;
        return this;
    }
    isSingletonScope() {
        this.setScope("Singleton");
    }
    isTransientScope() {
        this.setScope("Transient");
    }
    isRequestScope() {
        this.setScope("Request");
    }
    setScope(scope) {
        this.scope = scope;
        return this;
    }
    params(...args) {
        this._params = args;
        return this;
    }
    resolve(...args) {
        const params = [...this._params, ...args];
        if (this.scope == "Singleton") {
            const key = `di_${this.name}_signle`;
            let instance = cached[key];
            if (!instance) {
                instance = cached[key] = this.getInstance(...params);
            }
            return instance;
        }
        if (this.scope == "Request") {
            const key = `di_${this.name}_${params.join("-")}`;
            let instance = cached[key];
            if (!instance) {
                instance = cached[key] = this.getInstance(...params);
            }
            return instance;
        }
        return this.getInstance(...params);
    }
}
export default Binding;
//# sourceMappingURL=binding.js.map