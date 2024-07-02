import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

export function useQueryParams(): URLSearchParams {
  const location = useLocation();
  const queryParams = useMemo(() => {
    return new URLSearchParams(location.search);
  }, [location.search]);
  return queryParams;
}
