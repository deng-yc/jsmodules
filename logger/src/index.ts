const logTypes = ["none", "error", "warn", "info", "debug"];

export type LogLevel = "none" | "debug" | "info" | "warn" | "error";
interface ILoggerAdapter {
    assert(condition: boolean, message, ...data: any[]): void;
    debug(message, ...data: any[]): void;
    error(message, ...data: any[]): void;
    info(message, ...data: any[]): void;
    log(message, ...data: any[]): void;
    warn(message, ...data: any[]): void;
}

let adapters: { [key: string]: ILoggerAdapter } = {
    console: console,
};

const logSettings: {
    logLevel: LogLevel;
    showTimestamps: boolean;
} = {
    logLevel: "debug",
    showTimestamps: false,
};

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
    const level = logTypes.indexOf(logSettings.logLevel);
    if (logIdx > level) {
        return;
    }
    for (const adapterName in adapters) {
        const adapter = adapters[adapterName];
        if (adapter) {
            const logMethod = adapter[logType];
            let prefix = "[" + tagName + "]";
            if (logSettings.showTimestamps) {
                prefix = "[" + new Date().toLocaleTimeString() + "]" + prefix;
            }
            if (logType === "assert") {
                const condition = args[0];
                const message = args[1];
                const data = args.slice(2);
                logMethod.apply(null, [condition, prefix + " " + message].concat(data));
            } else {
                const message = args[0];
                const data = args.slice(1);
                logMethod.apply(null, [prefix + " " + message].concat(data));
            }
        }
    }
}

interface ILogger {
    setAdapter: (name: string, adapter: ILoggerAdapter) => void;
    removeAdapter: (name: string) => void;
    useConsole: (enabled: boolean) => void;
    setLogLevel: (level: LogLevel) => void;
    showTimestamps: (show: boolean) => void;
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
            logSettings.logLevel = level;
        },
        showTimestamps: (show: boolean) => {
            logSettings.showTimestamps = show;
        },
        tag: (tagName) => {
            return new Proxy<ILoggerAdapter>({} as any, {
                get(target, logType) {
                    return function (...args) {
                        applyLog.apply(null, [logType, tagName].concat(args));
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
                    applyLog.apply(null, [prop, "Default"].concat(args));
                };
            }
        },
    }
);
export default Logger;
