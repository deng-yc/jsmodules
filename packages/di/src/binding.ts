export type BindingScope =
    /**
     * 全局单例
     */
    | "Singleton"
    /**
     * 根据请求参数单例
     * 注意: 参数只能是基础类型,string,number,bool
     */
    | "Request"
    | "Transient";

const cached = {};

export class Binding<T> {
    public scope: BindingScope = "Singleton";
    private getInstance: (...args) => T;
    private _instance: T;
    private _params = [];

    constructor(public name) {}

    private _typedef;
    to(typedef: { new (...args): T }) {
        this._typedef = typedef;
        this.getInstance = (...pamams) => {
            const instance = new this._typedef(...pamams);
            return instance;
        };
        return this;
    }

    toValue(val: T) {
        this._instance = val;
        this.getInstance = () => {
            return this._instance;
        };
        return this;
    }
    toFactory(factory: (...args) => T) {
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
