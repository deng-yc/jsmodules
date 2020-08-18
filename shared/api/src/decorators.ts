import { HttpFactory } from '@jsmodules/core';
import di from '@jsmodules/di';
import { apiHosts } from '@shared/config';

export function api(configName: string) {
    return function (target, propertyKey, desc?): any {
        const options = {
            get() {
                const key = `$$__http$${propertyKey}`;
                const baseUrl = apiHosts[configName];
                if (!target[key]) {
                    if (!baseUrl) {
                        throw new Error("api:未配置接口->" + configName);
                    }
                    target[key] = di.getInstance(HttpFactory, [baseUrl]);
                }
                return target[key];
            },
            set() {
                throw new Error("Not allowed");
            },
            enumerable: true,
            configurable: true,
        };

        if (desc) {
            return options;
        }
        Object.defineProperty(target, propertyKey, options);
        return;
    };
}
export default api;
