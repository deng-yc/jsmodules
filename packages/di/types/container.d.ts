import { Binding } from './binding';
export default class Container {
    private m;
    getNames(): IterableIterator<string>;
    bind<T>(name: any): Binding<T>;
    has(name: any): boolean;
    get<T>(name: any): Binding<T> | null;
    resolve<T>(name: any, ...args: any[]): T | null;
}
