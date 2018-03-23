import { Container } from './container';

const container = new Container();

/**
 * 解析依赖注入对象，如果容器中没有对应的对象，不会报错
 * @param key 名称  
 * @param args 参数
 */
export function tryResolve(key, ...args) {
    const bean = container.resolve(key, ...args);
    if (bean) {
        return bean;
    }
    return null;
}

/**
 * 解析依赖注入对象，如果容器中没有对应的对象，会报错
 * @param key 名称  
 * @param args 参数
 */
export function diResolve<T>(key, ...args) {
    const bean = tryResolve(key, ...args);
    if (bean) {
        return bean;
    } else {
        console.error(`Context has no bean with name ${key}. 
      Available beans: ${container.getNames().join(", ")}`);
    }
}

/**
 * 定义一个修饰器，依赖注入
 * @param injectKey 对象的key 
 */
export function diInject(injectKey = null, ...args): any {
    return function (target: any, propertyKey: string) {
        Object.defineProperty(target, propertyKey, {
            get() {
                var key = injectKey || propertyKey;
                if (!target[`__diInject__${key}__`]) {
                    target[`__diInject__${key}__`] = diResolve(key, ...args);
                }
                const bean = target[`__diInject__${key}__`];
                return bean;
            },
            set() {
                throw new Error("Not allowed");
            },
            enumerable: true,
            configurable: true
        });
    };
}

export default container;
