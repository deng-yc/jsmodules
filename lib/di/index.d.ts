import { Container } from './container';
/**
 * ��������ע������������������û�ж�Ӧ�Ķ��󣬲��ᱨ��
 * @param key ����
 * @param args ����
 */
export declare function tryResolve(key: any, ...args: any[]): any;
/**
 * ��������ע������������������û�ж�Ӧ�Ķ��󣬻ᱨ��
 * @param key ����
 * @param args ����
 */
export declare function Resolve<T>(key: any, ...args: any[]): any;
/**
 * ����һ��������������ע��
 * @param injectKey ������key
 */
export declare function Inject(injectKey?: any, ...args: any[]): any;
declare const _default: {
    container: Container;
    tryResolve: (key: any, ...args: any[]) => any;
    Resolve: <T>(key: any, ...args: any[]) => any;
    Inject: (injectKey?: any, ...args: any[]) => any;
};
export default _default;
