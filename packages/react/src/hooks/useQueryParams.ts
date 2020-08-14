import { useMemo } from 'react';
import { useLocation } from 'react-router';

export function useQueryParmas() {
    const location = useLocation();

    const queryParams = useMemo(() => {
        return URL.toString();
    }, [location.search]);

    return queryParams;
}
