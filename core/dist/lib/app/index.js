"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
function createApp() {
    const setups = [];
    return {
        use(callback) {
            setups.push(callback);
            return exports.Application;
        },
        async initAsync() {
            let initialState = {};
            for (const setup of setups) {
                const state = await setup(initialState);
                initialState = { ...initialState, ...state };
            }
            return initialState;
        },
    };
}
exports.Application = createApp();
//# sourceMappingURL=index.js.map