"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAccess = void 0;
const tslib_1 = require("tslib");
const lodash_1 = require("lodash");
const react_1 = require("react");
const context_1 = tslib_1.__importDefault(require("./context"));
function useAccess() {
    const access = (0, react_1.useContext)(context_1.default);
    return {
        access,
        hasAccess(accessName, params, ifNoMatch = true) {
            let hasAccess = true;
            if (access[accessName]) {
                const temp = access[accessName];
                if ((0, lodash_1.isBoolean)(temp)) {
                    hasAccess = temp;
                }
                if ((0, lodash_1.isFunction)(temp)) {
                    hasAccess = temp(params);
                }
            }
            return hasAccess;
        },
    };
}
exports.useAccess = useAccess;
//# sourceMappingURL=useAccess.js.map