type PipeCallback<P, T> = (input: P, output: T) => Promise<T>;

export class Pipeline<P, T = P> {
    private callbacks = [];

    use(callbackFn: PipeCallback<P, T>) {
        this.callbacks.push(callbackFn);
        return this;
    }
    async exec(input?: P, output?: T): Promise<T> {
        let result: any = output;
        for (const callback of this.callbacks) {
            result = await callback(input, result);
        }
        return result as T;
    }
}
