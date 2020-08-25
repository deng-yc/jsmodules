import { useMemo } from 'react';
import { useLocation } from 'react-router';

import { URLSearchParams } from '@jsmodules/core';

export function useQueryParams() {
    const location = useLocation();
    const queryParams = useMemo(() => {
        const params = new URLSearchParams(location.search);
        return params;
    }, [location.search]);

    return queryParams;
}
