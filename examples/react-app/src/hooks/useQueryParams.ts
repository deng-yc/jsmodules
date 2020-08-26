import { useMemo } from 'react';
import { useLocation } from 'react-router';

import { URLSearchParams } from '@jsmodules/core';

export function useQueryParams(): URLSearchParams {
    const location = useLocation();
    const queryParams = useMemo(() => {
        return new URLSearchParams(location.search);
    }, [location.search]);

    return queryParams as any;
}
