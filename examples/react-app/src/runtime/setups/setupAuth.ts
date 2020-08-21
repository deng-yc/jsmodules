import { SessionService, TokenService } from '@jsmodules/core';
import di from '@jsmodules/di';
import { UsersApi } from '@shared/api/dist/generated/identity/common/users';
import { IdentityApi } from '@shared/api/dist/identity';

export function setupAuth() {
    console.log("setup auth api");
    //检查Token是否过期，是否需要换取新的token
    TokenService.TokenGetter.use(async (_i, token) => {
        if (!token) {
            return null;
        }
        if (token.auto_login) {
            const expires_unix = token.created_unix + token.expires;
            const now_unix = Math.floor(new Date().getTime());
            if (expires_unix <= now_unix) {
                return null;
            }
            const refresh_unix = expires_unix - token.expires / 5;
            if (refresh_unix <= now_unix) {
                const api = di.getInstance(IdentityApi);
                const res = await api.connectToken().post({
                    grant_type: "refresh_token",
                    client_id: token.client_id,
                    refresh_token: token.refresh_token,
                });
                return { ...res.data, client_id: token.client_id };
            }
        }
        return token;
    });

    //添加登录方式
    TokenService.LoginMethod.use(async (options) => {
        if (options.type === "password") {
            const { username, password } = options.data;
            if (!username || !password) {
                throw new Error("用户名和密码不能未空");
            }
            const client_id = "resourceowner";
            const api = di.getInstance(IdentityApi);
            const res = await api.connectToken().post({
                client_id,
                grant_type: "password",
                username,
                password,
            });
            return { ...res.data, client_id };
        }
        return Promise.reject(new Error("不支持的登录方式"));
    });

    SessionService.UserGetter.use(async () => {
        const usersApi = di.getInstance(UsersApi);
        const res = await usersApi.me().get();
        return res.data.result;
    });
}
