"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useIsMounted = void 0;
const react_1 = require("react");
function useIsMounted() {
    const isMounted = (0, react_1.useRef)(false);
    (0, react_1.useEffect)(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);
    return isMounted;
}
exports.useIsMounted = useIsMounted;
//# sourceMappingURL=useIsMounted.js.map