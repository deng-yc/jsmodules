import { useMemo } from 'react';

import di, { BindingClass, DiInstanceType } from '@jsmodules/di';
import { BindingScope } from '@jsmodules/di/dist/binding';

export function useResolveClass<T extends BindingClass<T>>(
    Binding: T,
    args: any[] = [],
    scope: BindingScope = "Singleton"
): DiInstanceType<T> {
    return useMemo(() => {
        return di.getInstance(Binding, args, scope);
    }, []);
}