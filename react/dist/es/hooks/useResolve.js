import { useMemo } from 'react';
import di from '@jsmodules/di';
export function useResolveClass(Binding, args = [], scope) {
    return useMemo(() => {
        return di.getInstance(Binding, args, scope);
    }, []);
}
//# sourceMappingURL=useResolve.js.map