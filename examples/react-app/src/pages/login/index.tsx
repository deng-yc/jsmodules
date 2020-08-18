import { Button, message } from 'antd';
import React, { useCallback } from 'react';
import { useHistory } from 'react-router';

import { SessionService } from '@jsmodules/core';
import { useInitialState, useQueryParams, useResolveClass } from '@jsmodules/react';

interface ILoginProps {}

export const Login: React.FC<ILoginProps> = (props: ILoginProps) => {
    const history = useHistory();
    const queryParams = useQueryParams();

    const { setInitialState } = useInitialState();
    const sessionService = useResolveClass(SessionService);

    const handleLogin = useCallback(async () => {
        const remove = message.loading("正在登录...");
        try {
            await sessionService.login({
                type: "password",
                data: {
                    username: "admin",
                    password: "12345abcde",
                },
            });
            setInitialState({
                isAuthenticated: true,
            });
            const next = queryParams?.next || "/";
            history.replace(next);
            remove();
        } catch (err) {
            remove();
            console.error(err);
            alert(err.message || "登录失败");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <Button onClick={handleLogin}>Login</Button>
        </div>
    );
};

export default Login;
