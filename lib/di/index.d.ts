import { BindingScope } from "./binding";
import Container from "./container";
export declare function Register(name: any, scope?: BindingScope, ...params: any[]): (BindingClass: any) => void;
export declare function tryResolve<T>(key: any, ...args: any[]): T | null;
export declare function Resolve<T>(key: any, ...args: any[]): T;
export declare function Inject(injectKey?: any, ...args: any[]): (target: any, propertyKey: string, desc?: any) => any;
export declare type BindingClass<T> = {
    new (...args: any[]): any;
    instance?: T;
    $$di_NAME?: string;
};
export declare function getInstance<T>(Binding: BindingClass<T>, type?: BindingScope, ...args: any[]): T;
export declare function Property<T>(Binding: BindingClass<T>): (target: any, propertyKey: any, desc?: any) => any;
declare const _default: {
    container: Container;
    tryResolve: typeof tryResolve;
    Resolve: typeof Resolve;
    Inject: typeof Inject;
    Property: typeof Property;
    getInstance: typeof getInstance;
    Register: typeof Register;
};
export default _default;
