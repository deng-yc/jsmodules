import di from '@jsmodules/di';
import { kvStore } from '@jsmodules/storage';
import { IKeyValueStorage } from '@jsmodules/storage/src/KeyValueStorage/types';

@di.injectable("TokenService")
export class TokenService {
    @kvStore("tk_2sxrcl9dh", { encrypted: true }) private tokenStore: IKeyValueStorage;

    constructor(private skey = "at_i6lkasaa0") {}

    initAsync() {
        this.tokenStore.getAsync(this.skey);
    }
}
