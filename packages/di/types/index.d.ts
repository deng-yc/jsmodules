import { BindingScope } from './binding';
export declare type DiInstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : any;
export declare type BindingClass<T extends new (...args: any[]) => any> = {
    new (...args: any[]): any;
    instance?: DiInstanceType<T>;
    $$di_NAME?: string;
};
export declare function Register(name?: any, scope?: BindingScope): {
    value<T>(value: T, overwrite?: boolean): void;
    class(BindingClass: any, params?: any[], overwrite?: boolean): void;
    factory(factory: (...args: any[]) => any, params?: any[], overwrite?: boolean): void;
};
export declare function injectable(name?: any, scope?: BindingScope): (BindingClass: any) => void;
export declare function tryResolve<T>(key: any, ...args: any[]): T | null;
export declare function Resolve<T>(key: any, ...args: any[]): T;
export declare function getInstance<T extends BindingClass<T>>(Binding: T, args?: any[], type?: BindingScope): DiInstanceType<T>;
declare function Inject(Binding: string | BindingClass<any>): (target: any, propertyKey: any, desc?: any) => any;
export declare const di: {
    injectable: typeof injectable;
    tryResolve: typeof tryResolve;
    Resolve: typeof Resolve;
    Inject: typeof Inject;
    getInstance: typeof getInstance;
    Register: typeof Register;
};
export default di;
//# sourceMappingURL=index.d.ts.map