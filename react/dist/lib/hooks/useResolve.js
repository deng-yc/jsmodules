"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useResolveClass = void 0;
const tslib_1 = require("tslib");
const react_1 = require("react");
const di_1 = tslib_1.__importDefault(require("@jsmodules/di"));
function useResolveClass(Binding, args = [], scope) {
    return (0, react_1.useMemo)(() => {
        return di_1.default.getInstance(Binding, args, scope);
    }, []);
}
exports.useResolveClass = useResolveClass;
//# sourceMappingURL=useResolve.js.map