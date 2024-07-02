import { isBoolean, isFunction } from 'lodash';
import { useContext } from 'react';
import AccessContext from './context';
export function useAccess() {
    const access = useContext(AccessContext);
    return {
        access,
        hasAccess(accessName, params, ifNoMatch = true) {
            let hasAccess = true;
            if (access[accessName]) {
                const temp = access[accessName];
                if (isBoolean(temp)) {
                    hasAccess = temp;
                }
                if (isFunction(temp)) {
                    hasAccess = temp(params);
                }
            }
            return hasAccess;
        },
    };
}
//# sourceMappingURL=useAccess.js.map