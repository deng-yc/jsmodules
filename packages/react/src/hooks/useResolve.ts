import { useMemo } from 'react';

import di, { BindingClass, BindingScope } from '@jsmodules/di';

export function useResolveClass<T extends new (...args) => any>(
    Binding: T,
    args: any[] = [],
    scope: BindingScope = "Singleton"
): InstanceType<T> {
    return useMemo(() => {
        return di.getInstance(Binding, args, scope);
    }, []);
}
