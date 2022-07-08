const logTypes = ["none", "debug", "info", "warn", "error"];

export type LogLevel = "none" | "debug" | "info" | "warn" | "error";
interface ILoggerAdapter {
    assert(condition?: boolean, ...data: any[]): void;
    debug(...data: any[]): void;
    error(...data: any[]): void;
    info(...data: any[]): void;
    log(...data: any[]): void;
    warn(...data: any[]): void;
}

let adapters: { [key: string]: ILoggerAdapter } = {};
let logLevel: LogLevel = "debug";

function setAdapter(name, adapter: ILoggerAdapter) {
    adapters[name] = adapter;
}

function removeAdapter(name) {
    if (adapters) {
        adapters[name] = void 0;
    }
}

class ConsoleLoggerAdapter implements ILoggerAdapter {
    assert(condition?: boolean, ...data: any[]): void {
        console.assert(condition, ...data);
    }
    debug(...data: any[]): void {
        console.debug(...data);
    }
    info(...data: any[]): void {
        console.info(...data);
    }
    log(...data: any[]): void {
        console.log(...data);
    }
    warn(...data: any[]): void {
        console.warn(...data);
    }
    error(...data: any[]): void {
        console.error(...data);
    }
}

const consoleLoggerAdapter = new ConsoleLoggerAdapter();

function applyLog(logType, tagName, ...args) {
    const logIdx = logTypes.indexOf(logType);
    const level = logTypes.indexOf(logLevel);
    if (logIdx > level) {
        return;
    }
    for (const adapterName in adapters) {
        const adapter = adapters[adapterName];
        if (adapter) {
            const logMethod = adapter[logType];
            if (logType === "assert") {
                const [condition, ...data] = args;
                logMethod(condition, `[${tagName}]`, ...data);
            } else {
                logMethod(`[${tagName}]`, ...args);
            }
        }
    }
}

interface ILogger {
    setAdapter: (name: string, adapter: ILoggerAdapter) => void;
    removeAdapter: (name: string) => void;
    useConsole: (enabled: boolean) => void;
    setLogLevel: (level: LogLevel) => void;
    tag: (tagName: string) => ILoggerAdapter;
}

export const Logger = new Proxy<ILoggerAdapter & ILogger>(
    {
        setAdapter,
        removeAdapter,
        useConsole: (enabled = true) => {
            if (enabled) {
                if (!adapters["console"]) {
                    setAdapter("console", consoleLoggerAdapter);
                }
            } else {
                adapters["console"] = undefined;
            }
        },
        setLogLevel: (level: LogLevel) => {
            logLevel = level;
        },
        tag: (tagName) => {
            return new Proxy<ILoggerAdapter>({} as any, {
                get(target, logType) {
                    return function (...args) {
                        applyLog(logType, tagName, ...args);
                    };
                },
            });
        },
    } as any,
    {
        get(target, prop) {
            if (target[prop]) {
                return target[prop];
            } else {
                return function (...args) {
                    applyLog(prop, "Default", ...args);
                };
            }
        },
    }
);
