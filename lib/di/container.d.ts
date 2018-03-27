import { Binding } from "./binding";
export declare class Container {
    private __all_binding__;
    getNames(): string[];
    bind<T>(name: any): Binding<T>;
    get<T>(name: any): Binding<any>;
    resolve<T>(name: any, ...args: any[]): any;
}
