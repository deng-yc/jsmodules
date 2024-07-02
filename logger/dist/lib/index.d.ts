export type LogLevel = "none" | "debug" | "info" | "warn" | "error";
interface ILoggerAdapter {
    assert(condition: boolean, message: any, ...data: any[]): void;
    debug(message: any, ...data: any[]): void;
    error(message: any, ...data: any[]): void;
    info(message: any, ...data: any[]): void;
    log(message: any, ...data: any[]): void;
    warn(message: any, ...data: any[]): void;
}
interface ILogger {
    setAdapter: (name: string, adapter: ILoggerAdapter) => void;
    removeAdapter: (name: string) => void;
    useConsole: (enabled: boolean) => void;
    setLogLevel: (level: LogLevel) => void;
    showTimestamps: (show: boolean) => void;
    tag: (tagName: string) => ILoggerAdapter;
}
export declare const Logger: ILoggerAdapter & ILogger;
export default Logger;
//# sourceMappingURL=index.d.ts.map