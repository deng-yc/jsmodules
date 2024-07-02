import { useEffect } from 'react';

export function useDidMount(fn: () => any) {
    useEffect(() => {
        fn();
    }, []);
}
