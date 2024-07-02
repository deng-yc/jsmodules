import di from "@jsmodules/di";
const startupTime = new Date();
export class TimeService {
    static diOptions = di.options({
        name: "timeService",
    });
    enableLog = true;
    clientTime = startupTime.getTime();
    serverTime = startupTime.getTime();
    disableLog(disable = true) {
        this.enableLog = !disable;
    }
    update(serverNow) {
        this.clientTime = new Date().getTime();
        this.serverTime = new Date(serverNow).getTime();
        if (this.enableLog) {
            console.log("update time:", this.clientTime, this.serverTime);
        }
    }
    serverNow() {
        const now = new Date().getTime();
        return this.serverTime + now - this.clientTime;
    }
}
//# sourceMappingURL=index.js.map