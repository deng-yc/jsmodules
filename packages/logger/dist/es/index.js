const logTypes = ["none", "error", "warn", "info", "debug"];
let adapters = {
    console: console,
};
const logSettings = {
    logLevel: "debug",
    showTimestamps: false,
};
function setAdapter(name, adapter) {
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
            }
            else {
                const message = args[0];
                const data = args.slice(1);
                logMethod.apply(null, [prefix + " " + message].concat(data));
            }
        }
    }
}
export const Logger = new Proxy({
    setAdapter,
    removeAdapter,
    useConsole: (enabled = true) => {
        if (enabled) {
            if (!adapters["console"]) {
                setAdapter("console", console);
            }
        }
        else {
            adapters["console"] = undefined;
        }
    },
    setLogLevel: (level) => {
        logSettings.logLevel = level;
    },
    showTimestamps: (show) => {
        logSettings.showTimestamps = show;
    },
    tag: (tagName) => {
        return new Proxy({}, {
            get(target, logType) {
                return function (...args) {
                    applyLog.apply(null, [logType, tagName].concat(args));
                };
            },
        });
    },
}, {
    get(target, prop) {
        if (target[prop]) {
            return target[prop];
        }
        else {
            return function (...args) {
                applyLog.apply(null, [prop, "Default"].concat(args));
            };
        }
    },
});
export default Logger;
//# sourceMappingURL=index.js.map