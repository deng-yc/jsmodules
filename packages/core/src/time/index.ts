import di from '@jsmodules/di';

const startupTime = new Date();

@di.injectable("timeService")
export class TimeService {
    private clientTime = startupTime.getTime();
    private serverTime = startupTime.getTime();

    update(serverNow) {
        this.clientTime = new Date().getTime();
        this.serverTime = new Date(serverNow).getTime();
        console.log("update time");
    }

    serverNow() {
        const now = new Date().getTime();
        return this.serverTime + now - this.clientTime;
    }
}
