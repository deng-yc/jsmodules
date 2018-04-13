import { Container } from './container';
export declare enum BindingScope {
    Singleton = 0,
    Request = 1,
    Transient = 2,
}
export declare class Binding<T> {
    name: any;
    container: Container;
    scope: BindingScope;
    private _createInstance;
    private _instance;
    private _params;
    constructor(name: any, container: Container);
    private _typedef;
    to(typedef: {
        new (...args: any[]): T;
    }): this;
    toValue(val: T): this;
    toFactory(factory: () => any): this;
    isSingletonScope(): void;
    isTransientScope(): void;
    isRequestScope(): void;
    params(...args: any[]): this;
    resolve(...args: any[]): any;
}
