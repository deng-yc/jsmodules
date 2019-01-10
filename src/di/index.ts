import { Container } from './container';
import { BindingScope } from './binding';



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
export function Resolve<T>(key, ...args) {
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
export function Inject(injectKey = null, ...args): any {
    return function (target: any, propertyKey: string,desc?):any {
        let options = {
            get() {
                var key = injectKey || propertyKey;
                var binding = container.get(key);
                let bean;
                if (binding.scope == BindingScope.Transient) {
                    bean = binding.resolve(...args);
                } else {
                    var targetKey = `__diImport__${key}__`;
                    if (!target[targetKey]) {
                        target[targetKey] = binding.resolve(...args);
                    }
                    bean = target[targetKey];
                }
                return bean;
            },
            set(value) {
                throw new Error("Not allowed");
            },
            enumerable: true,
            configurable: true
        }
        if (desc) {
            return options;
        }

        Object.defineProperty(target, propertyKey, options);
    };
}
export default {
    container,
    tryResolve,
    Resolve,
    Inject
}
