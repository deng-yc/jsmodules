import { SessionService, TokenService } from '@jsmodules/core';

export function setupAuth() {
    console.log("setup auth api");
    //处理token
    TokenService.Getter.use(async (token) => {
        return token;
    });

    SessionService.UserGetter.use(async () => {
        return { id: 1 };
    })
        .use(async (user) => {
            //getMateByUserId( user.id)
            return { mate: 1 };
        })
        .use(async (user) => {
            // {id:1,mate:1}
            return { soul: 1 };
        });
    //得到 {id:1,mate:1,soul:1}
}
