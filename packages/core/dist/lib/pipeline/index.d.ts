type PipeCallback<P, T> = (input: P, output: T) => T | Promise<T>;
export declare class Pipeline<P, T = P> {
    private callbacks;
    use(callbackFn: PipeCallback<P, T>): this;
    exec(input?: P, output?: T): Promise<T>;
    execSync(input?: P, output?: T): T;
}
export {};
//# sourceMappingURL=index.d.ts.map