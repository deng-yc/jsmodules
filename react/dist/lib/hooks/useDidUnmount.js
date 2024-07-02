"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDidUnmount = void 0;
const react_1 = require("react");
function useDidUnmount(fn) {
    (0, react_1.useEffect)(() => {
        return fn;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
exports.useDidUnmount = useDidUnmount;
//# sourceMappingURL=useDidUnmount.js.map