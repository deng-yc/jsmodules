import { useEffect } from 'react';
export function useDidMount(fn) {
    useEffect(() => {
        fn();
    }, []);
}
//# sourceMappingURL=useDidMount.js.map