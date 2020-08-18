import { Button } from 'antd';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import { useInitialState, useQueryParams, useResolveClass } from '@jsmodules/react';
import { IdentityService } from '@shared/services';

interface ILoginProps {}

export const Login: React.FC<ILoginProps> = (props: ILoginProps) => {
    const history = useHistory();
    const queryParams = useQueryParams();

    const { setInitialState } = useInitialState();
    const identityService = useResolveClass(IdentityService);

    const handleLogin = useCallback(async () => {
        try {
            await identityService.login();
            setInitialState({
                isAuthenticated: true,
            });
            const next = queryParams?.next || "/";
            history.replace(next);
        } catch (err) {}
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Button onClick={handleLogin}>Login</Button>
        </div>
    );
};

export default Login;
