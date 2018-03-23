import { Binding } from "./binding";
export declare class Container {
    private __defs__;
    getNames(): string[];
    bind<T>(name: any): Binding<T>;
    resolve<T>(name: any, ...args: any[]): any;
}
