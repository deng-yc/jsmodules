import Container from './container';

export enum BindingScope {
    Singleton,
    Request,
    Transient,
}

export class Binding<T> {
    public scope: BindingScope = BindingScope.Singleton;
    private _createInstance: (...args) => T;
    private _instance: T;
    private _params = [];
    constructor(public name, public container: Container) {}

    private _typedef;
    to(typedef: { new (...args): T }) {
        this._typedef = typedef;
        this._createInstance = (...pamams) => {
            const instance = new this._typedef(...pamams);
            return instance;
        };
        return this;
    }

    toValue(val: T) {
        this._instance = val;
        this._createInstance = () => {
            return this._instance;
        };
        return this;
    }
    toFactory(factory: (...args) => T) {
        this._createInstance = factory;
        return this;
    }

    isSingletonScope() {
        this.setScope(BindingScope.Singleton);
        this.scope = BindingScope.Singleton;
    }
    isTransientScope() {
        this.setScope(BindingScope.Transient);
    }
    isRequestScope() {
        this.setScope(BindingScope.Request);
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
        const parmas = [...this._params, ...args];
        if (this.scope == BindingScope.Singleton) {
            if (!this._instance) {
                this._instance = this._createInstance(...parmas);
            }
            return this._instance;
        }
        return this._createInstance(...parmas);
    }
}

export default Binding;
