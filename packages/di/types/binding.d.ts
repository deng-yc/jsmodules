export declare type BindingScope = 
/**
 * 全局单例
 */
"Singleton"
/**
 * 根据请求参数单例
 * 注意: 参数只能是基础类型,string,number,bool
 */
 | "Request" | "Transient";
export declare class Binding<T> {
    name: any;
    scope: BindingScope;
    private getInstance;
    private _instance;
    private _params;
    constructor(name: any);
    private _typedef;
    to(typedef: {
        new (...args: any[]): T;
    }): this;
    toValue(val: T): this;
    toFactory(factory: (...args: any[]) => T): this;
    isSingletonScope(): void;
    isTransientScope(): void;
    isRequestScope(): void;
    setScope(scope: any): this;
    params(...args: any[]): this;
    resolve(...args: any[]): any;
}
export default Binding;
//# sourceMappingURL=binding.d.ts.map