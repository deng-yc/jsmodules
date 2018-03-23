import { Container } from './container';
export declare enum BindingScope {
    Singleton = 0,
    Transient = 1,
}
export declare class Binding<T> {
    name: any;
    container: Container;
    private _scope;
    private _createInstance;
    private _instance;
    private _params;
    constructor(name: any, container: Container);
    private _typedef;
    to(typedef: {
        new (...args: any[]): T;
    }): this;
    toValue(val: T): this;
    toFactory(factory: () => any): void;
    inSingletonScope(): void;
    inTransientScope(): void;
    params(...args: any[]): this;
    resolve(...args: any[]): any;
}
