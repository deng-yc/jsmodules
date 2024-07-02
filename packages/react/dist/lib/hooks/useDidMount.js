"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDidMount = void 0;
const react_1 = require("react");
function useDidMount(fn) {
    (0, react_1.useEffect)(() => {
        fn();
    }, []);
}
exports.useDidMount = useDidMount;
//# sourceMappingURL=useDidMount.js.map