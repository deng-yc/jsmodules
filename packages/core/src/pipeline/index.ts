type PipeCallback<T, P> = (input: P, output: T) => Promise<T>;

export class Pipeline<T, P = T> {
    private callbacks = [];

    use(callbackFn: PipeCallback<T, P>) {
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
