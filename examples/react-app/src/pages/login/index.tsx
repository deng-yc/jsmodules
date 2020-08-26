import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import { SessionService } from '@jsmodules/core';
import { useAuthenticated, useQueryParams, useResolveClass } from '@jsmodules/react';

interface ILoginProps {}

export const Login: React.FC<ILoginProps> = (props: ILoginProps) => {
    const history = useHistory();
    const queryParams = useQueryParams();

    const sessionService = useResolveClass(SessionService);
    const { setAuthenticated } = useAuthenticated();

    const handleLogin = useCallback(async () => {
        try {
            await sessionService.login({
                type: "password",
                data: {
                    username: "admin",
                    password: "12345abcde",
                },
            });
            setAuthenticated(true);
            const next = queryParams.get("next") || "/";
            history.replace(next);
        } catch (err) {
            console.error(err);
            alert(err.message || "登录失败");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div>登录</div>;
};

export default Login;
