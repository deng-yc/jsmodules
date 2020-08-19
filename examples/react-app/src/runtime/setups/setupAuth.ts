import { SessionService, TokenService } from '@jsmodules/core';
import di from '@jsmodules/di';
import { UsersApi } from '@shared/api/dist/generated/identity/common/users';
import { IdentityApi } from '@shared/api/dist/identity';

export function setupAuth() {
    console.log("setup auth api");
    //检查Token是否过期，是否需要换取新的token
    TokenService.TokenGetter.use(async (_i, token) => {
        return token;
    });

    TokenService.LoginMethod.use(async (options) => {
        if (options.type === "password") {
            const { username, password } = options.data;
            if (!username || !password) {
                throw new Error("用户名和密码不能未空");
            }
            const api = di.getInstance(IdentityApi);
            const res = await api
                .connectToken()
                .headers({
                    Authorization: "Basic cmVzb3VyY2Vvd25lcjpzb3VubWF0ZQ==",
                })
                .post({
                    grant_type: "password",
                    username,
                    password,
                });
            return res.data;
        }
        return Promise.reject(new Error("不支持的登录方式"));
    });

    SessionService.UserGetter.use(async () => {
        const usersApi = di.getInstance(UsersApi);
        const res = await usersApi.me().get();
        return res.data.result;
    });
}
