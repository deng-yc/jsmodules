type PipeCallback<T> = (data: T) => Promise<T>;

export class Pipeline<T> {
    private callbacks = [];

    use(callbackFn: PipeCallback<T>) {
        this.callbacks.push(callbackFn);
        return this;
    }
    async exec(data?: T) {
        let result = data;
        for (const callback of this.callbacks) {
            result = await callback(result);
        }
        return result;
    }
}
