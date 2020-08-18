import { Button } from 'antd';
import React, { useCallback } from 'react';

import { SessionService } from '@jsmodules/core';
import { useInitialState, useResolveClass } from '@jsmodules/react';

interface ILoginProps {}

export const Login: React.FC<ILoginProps> = (props: ILoginProps) => {
    const { refreshInitialState } = useInitialState();
    const session = useResolveClass(SessionService);

    const handleLogin = useCallback(() => {
        session.isAuthenticated = true;
        refreshInitialState();
        // session
    }, [refreshInitialState, session.isAuthenticated]);

    return (
        <div>
            <Button onClick={handleLogin}>Login</Button>
        </div>
    );
};

export default Login;
