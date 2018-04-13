import { Container } from './container';
/**
 * 解析依赖注入对象，如果容器中没有对应的对象，不会报错
 * @param key 名称
 * @param args 参数
 */
export declare function tryResolve(key: any, ...args: any[]): any;
/**
 * 解析依赖注入对象，如果容器中没有对应的对象，会报错
 * @param key 名称
 * @param args 参数
 */
export declare function Resolve<T>(key: any, ...args: any[]): any;
/**
 * 定义一个修饰器，依赖注入
 * @param injectKey 对象的key
 */
export declare function Inject(injectKey?: any, ...args: any[]): any;
declare const _default: {
    container: Container;
    tryResolve: (key: any, ...args: any[]) => any;
    Resolve: <T>(key: any, ...args: any[]) => any;
    Inject: (injectKey?: any, ...args: any[]) => any;
};
export default _default;
