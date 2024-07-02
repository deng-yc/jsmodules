function createApp() {
    const setups = [];
    return {
        use(callback) {
            setups.push(callback);
            return Application;
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
export const Application = createApp();
//# sourceMappingURL=index.js.map