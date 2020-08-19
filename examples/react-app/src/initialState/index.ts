import { Application, SessionService } from '@jsmodules/core';
import di from '@jsmodules/di';

export async function getInitialState() {
    return Application.use(async () => {
        const sessionService = di.getInstance(SessionService);
        await sessionService.initAsync();
        return {
            isAuthenticated: sessionService.isAuthenticated,
            user: sessionService.user,
        };
    }).initAsync();
}
