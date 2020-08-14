const setups = [];
function use(callback: (state) => { [key: string]: any }) {
    setups.push(callback);
    return Application;
}
async function initAsync() {
    let initialState = {};
    for (const setup of setups) {
        const state = await setup(initialState);
        initialState = { ...initialState, ...state };
    }
    return initialState;
}
export const Application = {
    use,
    initAsync,
};
