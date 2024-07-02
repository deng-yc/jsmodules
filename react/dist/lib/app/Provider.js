"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppProvider = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const useDidMount_1 = require("../hooks/useDidMount");
const context_1 = require("./context");
const initState = {
    initialState: undefined,
    loading: true,
    error: undefined,
};
function AppProvider(props) {
    const { children, getInitialState } = props;
    const [state, setState] = react_1.default.useState(initState);
    const refreshInitialState = (0, react_1.useCallback)(async () => {
        try {
            const asyncFunc = () => new Promise(res => res(getInitialState()));
            const ret = await asyncFunc();
            setState(prevState => ({ ...prevState, initialState: ret, loading: false }));
        }
        catch (e) {
            setState(prevState => ({ ...prevState, error: e, loading: false }));
        }
    }, []);
    (0, useDidMount_1.useDidMount)(async () => {
        refreshInitialState();
    });
    const setInitialState = (0, react_1.useCallback)(initialState => {
        setState(prevState => {
            const prevInitialState = prevState.initialState;
            return { ...prevState, initialState: { ...prevInitialState, ...initialState }, loading: false };
        });
    }, [state]);
    return (react_1.default.createElement(context_1.AppContext.Provider, { value: {
            ...state,
            refreshInitialState,
            setInitialState,
        } }, children));
}
exports.AppProvider = AppProvider;
//# sourceMappingURL=Provider.js.map