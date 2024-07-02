import { BindingScope as BindingScopeType } from "./binding";
export type BindingScope = BindingScopeType;
export type BindingClass<T extends new (...args: any[]) => any> = {
    new (...args: any[]): any;
    instance?: InstanceType<T>;
    $$di_NAME?: string;
    diOptions?: {
        name?: string;
        scope?: BindingScope;
    };
};
export declare function Register(name?: any, scope?: BindingScope): {
    value<T>(value: T, overwrite?: boolean): void;
    class(BindingClass: any, params?: any[], overwrite?: boolean): void;
    factory(factory: (...args: any[]) => any, params?: any[], overwrite?: boolean): void;
};
export declare function injectable(name?: any, scope?: BindingScope): (BindingClass: any) => void;
export declare function tryResolve<T>(key: any, ...args: any[]): T | null;
export declare function Resolve<T>(key: any, ...args: any[]): T;
export declare function getInstance<T extends BindingClass<T>>(Binding: T, args?: any[], scope?: BindingScope): InstanceType<T>;
/**
 * 注入一个对象
 * @deprecated
 * @param Binding
 */
declare function Inject(Binding: string | BindingClass<any>): (target: any, propertyKey: any, desc?: any) => any;
declare function Request<T extends BindingClass<T>>(Binding: T, args?: any[]): InstanceType<T>;
declare function Singleton<T extends BindingClass<T>>(Binding: T, args?: any[]): InstanceType<T>;
declare function Transient<T extends BindingClass<T>>(Binding: T, args?: any[]): InstanceType<T>;
declare function options(options: {
    name?: string;
    scope?: BindingScope;
}): {
    name?: string;
    scope?: BindingScope;
};
export declare const di: {
    injectable: typeof injectable;
    tryResolve: typeof tryResolve;
    Resolve: typeof Resolve;
    Inject: typeof Inject;
    getInstance: typeof getInstance;
    Register: typeof Register;
    Request: typeof Request;
    Singleton: typeof Singleton;
    Transient: typeof Transient;
    options: typeof options;
};
export default di;
//# sourceMappingURL=index.d.ts.map