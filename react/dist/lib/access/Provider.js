"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessProvider = void 0;
const tslib_1 = require("tslib");
const react_1 = tslib_1.__importStar(require("react"));
const useInitialState_1 = require("../app/useInitialState");
const context_1 = require("./context");
function AccessProvider(props) {
    const { children, accessFactory } = props;
    const { initialState } = (0, useInitialState_1.useInitialState)();
    const access = (0, react_1.useMemo)(() => {
        return accessFactory(initialState);
    }, [initialState]);
    return react_1.default.createElement(context_1.AccessContext.Provider, { value: access }, children);
}
exports.AccessProvider = AccessProvider;
//# sourceMappingURL=Provider.js.map