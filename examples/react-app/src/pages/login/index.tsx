import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useHistory } from 'react-router';

import { SessionService } from '@jsmodules/core';
import { useAuthenticated, useResolveClass } from '@jsmodules/react';

interface ILoginProps {}

export const Login: React.FC<ILoginProps> = (props: ILoginProps) => {
    const sessionService = useResolveClass(SessionService);
    const { setAuthenticated } = useAuthenticated();

    const history = useHistory();

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
            history.replace("/");
        } catch (err) {
            console.error(err);
            alert(err.message || "登录失败");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <View>
            <TouchableOpacity onPress={handleLogin}>
                <Text>登录</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Login;
