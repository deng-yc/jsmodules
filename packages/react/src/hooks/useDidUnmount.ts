import { useEffect } from 'react';

export function useDidUnmount(fn: () => void) {
    useEffect(() => {
        return fn;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
