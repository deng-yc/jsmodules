import { SessionService, TokenService } from '@jsmodules/core';
import di from '@jsmodules/di';
import { MatesApi } from '@shared/api/dist/generated/content/common/mates';
import { SoulsApi } from '@shared/api/dist/generated/content/common/souls';
import { UsersApi } from '@shared/api/dist/generated/identity/common/users';

export function setupAuth() {
    console.log("setup auth api");
    //处理token
    TokenService.Getter.use(async (token) => {
        return token;
    });

    SessionService.UserGetter.use(async () => {
        const api = di.getInstance(UsersApi);
        const res = await api.me().get();
        const { result } = res.data;
        return result;
    })
        .use(async () => {
            const api = di.getInstance(MatesApi);
            const res = await api.me().get();
            const { result } = res.data;
            return { mate: result };
        })
        .use(async () => {
            // {id:1,mate:1}
            const api = di.getInstance(SoulsApi);
            const res = await api.me().get();
            const { result } = res.data;
            return { soul: result };
        });
}
