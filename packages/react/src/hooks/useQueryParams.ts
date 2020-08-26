import { useMemo } from 'react';

import { URLSearchParams } from '@jsmodules/core';

export function useQueryParams(): URLSearchParams {
    const queryParams = useMemo(() => {
        return new URLSearchParams("");
    }, []);

    return queryParams;
}
