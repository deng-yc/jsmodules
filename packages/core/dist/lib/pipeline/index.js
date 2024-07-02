"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pipeline = void 0;
class Pipeline {
    callbacks = [];
    use(callbackFn) {
        this.callbacks.push(callbackFn);
        return this;
    }
    async exec(input, output) {
        let result = output;
        for (const callback of this.callbacks) {
            result = await callback(input, result);
        }
        return result;
    }
    execSync(input, output) {
        let result = output;
        for (const callback of this.callbacks) {
            result = callback(input, result);
        }
        return result;
    }
}
exports.Pipeline = Pipeline;
//# sourceMappingURL=index.js.map