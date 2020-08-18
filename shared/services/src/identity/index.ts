import { SessionService } from '@jsmodules/core';
import di from '@jsmodules/di';

@di.injectable("IdentityService")
export class IdentityService {
    @di.Inject(SessionService) private session: SessionService;

    async login() {
        this.session.isAuthenticated = true;
    }
}
