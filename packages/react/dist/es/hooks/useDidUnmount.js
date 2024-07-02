import { useEffect } from 'react';
export function useDidUnmount(fn) {
    useEffect(() => {
        return fn;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
//# sourceMappingURL=useDidUnmount.js.map