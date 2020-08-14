import { useContext } from 'react';

import AccessContext from './context';

export function useAccess<T>(): T {
    return useContext(AccessContext);
}
