import { useEffect } from 'react';

export function useDidUpdate(fn: () => void) {
    useEffect(fn);
}
