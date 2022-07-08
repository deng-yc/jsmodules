const logTypes = ["none", "debug", "info", "warn", "error"];

export type LogLevel = "none" | "debug" | "info" | "warn" | "error";
interface ILoggerAdapter {
    assert(condition: boolean, message, ...data: any[]): void;
    debug(message, ...data: any[]): void;
    error(message, ...data: any[]): void;
    info(message, ...data: any[]): void;
    log(message, ...data: any[]): void;
    warn(message, ...data: any[]): void;
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
                const [condition, message, ...data] = args;
                logMethod(condition, `[${tagName}] ${message}`, ...data);
            } else {
                const [message, ...data] = args;
                logMethod(`[${tagName}] ${message}`, ...data);
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
                    setAdapter("console", console);
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
