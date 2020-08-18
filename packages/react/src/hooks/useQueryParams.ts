import { useMemo } from 'react';
import { useLocation } from 'react-router';

import { qs } from '@jsmodules/core';

export function useQueryParams() {
    const location = useLocation();

    const queryParams = useMemo(() => {
        return qs.parse(location.search);
    }, [location.search]);

    return queryParams;
}
