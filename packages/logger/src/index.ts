interface ILoggerAdapter {
    assert(condition?: boolean, ...data: any[]): void;
    clear(): void;
    count(label?: string): void;
    countReset(label?: string): void;
    debug(...data: any[]): void;
    dir(item?: any, options?: any): void;
    dirxml(...data: any[]): void;
    error(...data: any[]): void;
    exception(message?: string, ...optionalParams: any[]): void;
    group(...data: any[]): void;
    groupCollapsed(...data: any[]): void;
    groupEnd(): void;
    info(...data: any[]): void;
    log(...data: any[]): void;
    table(tabularData?: any, properties?: string[]): void;
    time(label?: string): void;
    timeEnd(label?: string): void;
    timeLog(label?: string, ...data: any[]): void;
    timeStamp(label?: string): void;
    trace(...data: any[]): void;
    warn(...data: any[]): void;
}

const reFuncs = [
    "assert",
    "clear",
    "count",
    "countReset",
    "debug",
    "dir",
    "dirxml",
    "error",
    "exception",
    "group",
    "groupCollapsed",
    "groupEnd",
    "info",
    "log",
    "table",
    "time",
    "timeEnd",
    "timeLog",
    "timeStamp",
    "trace",
    "warn",
];

let adapters: { [key: string]: ILoggerAdapter } = {};

function applyLog(logType, tagName, ...args) {
    for (const adapterName in adapters) {
        const logMethod = adapters[adapterName][logType];
        logMethod && logMethod(tagName, ...args);
    }
}

export function setAdapter(name, adapter: ILoggerAdapter) {
    adapters[name] = adapter;
}

export function removeAdapter(name) {
    if (adapters) {
        adapters[name] = void 0;
    }
}

export function useConsole() {
    const ConsoleLoggerAdapter: any = {};
    for (const method of reFuncs) {
        const original = console[method];
        ConsoleLoggerAdapter[method] = original;
        console[method] = function (tagName, ...args) {
            applyLog(method, tagName, ...args);
        };
    }
    setAdapter("console", ConsoleLoggerAdapter);
}

export const Logger = {
    tag(tagName) {
        return new Proxy<ILoggerAdapter>({} as any, {
            get(target, name) {
                return function (...args) {
                    applyLog(name, tagName, ...args);
                };
            },
        });
    },
};
