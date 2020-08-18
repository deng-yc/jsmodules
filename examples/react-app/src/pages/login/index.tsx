import { Button } from 'antd';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import { SessionService } from '@jsmodules/core';
import { useInitialState, useQueryParams, useResolveClass } from '@jsmodules/react';

interface ILoginProps {}

export const Login: React.FC<ILoginProps> = (props: ILoginProps) => {
    const { setInitialState } = useInitialState();
    const session = useResolveClass(SessionService);
    const history = useHistory();
    const queryParams = useQueryParams();
    const handleLogin = useCallback(() => {
        session.isAuthenticated = true;
        setInitialState({
            isAuthenticated: true,
        });

        const next = queryParams.next || "/";
        history.replace(next);
        // session
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Button onClick={handleLogin}>Login</Button>
        </div>
    );
};

export default Login;
