
import { Container } from './container';

export enum BindingScope {
    Singleton,
    Request,
    Transient,
}


export class Binding<T> {
    public scope: BindingScope = BindingScope.Request;
    private _createInstance: (...args) => any;
    private _instance: T;
    private _params = [];
    constructor(public name, public container: Container) { }

    private _typedef;
    to(typedef: { new(...args: any[]): T }) {
        this._typedef = typedef;
        this._createInstance = (...pamams) => {
            var instance = new this._typedef(...pamams);
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
    toFactory(factory: (...args) => any) {
        this._createInstance = factory;
        return this;
    }

    isSingletonScope() {
        this.scope = BindingScope.Singleton;
    }
    isTransientScope() {
        this.scope = BindingScope.Transient;
    }
    isRequestScope() {
        this.scope = BindingScope.Request;
    }
    params(...args) {
        this._params = args;
        return this;
    }

    resolve(...args) {
        var parmas = [...this._params, ...args];
        if (this.scope == BindingScope.Singleton) {
            if (!this._instance) {
                this._instance = this._createInstance(...parmas);
            }
            return this._instance;
        }
        return this._createInstance(...parmas);
    }
}
