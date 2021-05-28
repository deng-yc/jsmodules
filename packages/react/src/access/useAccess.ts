import isBoolean from 'lodash/isBoolean';
import isFunction from 'lodash/isFunction';
import { useContext } from 'react';

import AccessContext from './context';

export function useAccess<T>() {
    const access = useContext(AccessContext) as T;
    return {
        access,
        hasAccess(accessName, params?, ifNoMatch = true) {
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
