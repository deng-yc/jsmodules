"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLoginedUser = exports.useAuthenticated = exports.useInitialState = exports.useApp = void 0;
const tslib_1 = require("tslib");
const react_1 = require("react");
const core_1 = require("@jsmodules/core");
const di_1 = tslib_1.__importDefault(require("@jsmodules/di"));
const context_1 = require("./context");
function useApp() {
    return (0, react_1.useContext)(context_1.AppContext);
}
exports.useApp = useApp;
function useInitialState() {
    const { loading, error, initialState, setInitialState, refreshInitialState } = useApp();
    return { loading, error, initialState, setInitialState, refreshInitialState };
}
exports.useInitialState = useInitialState;
function useAuthenticated() {
    const { loading, initialState, setInitialState } = useInitialState();
    return {
        loading,
        isAuthenticated: initialState?.isAuthenticated,
        setAuthenticated(isAuthenticated) {
            const state = { isAuthenticated };
            if (isAuthenticated) {
                const session = di_1.default.getInstance(core_1.SessionService);
                state.user = session.user;
            }
            setInitialState(state);
        },
    };
}
exports.useAuthenticated = useAuthenticated;
function useLoginedUser() {
    const { initialState } = useInitialState();
    return initialState?.user || null;
}
exports.useLoginedUser = useLoginedUser;
//# sourceMappingURL=useInitialState.js.map