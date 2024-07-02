"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useQueryParams = void 0;
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
function useQueryParams() {
    const location = (0, react_router_dom_1.useLocation)();
    const queryParams = (0, react_1.useMemo)(() => {
        return new URLSearchParams(location.search);
    }, [location.search]);
    return queryParams;
}
exports.useQueryParams = useQueryParams;
//# sourceMappingURL=useQueryParams.js.map