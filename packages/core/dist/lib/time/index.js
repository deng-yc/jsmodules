"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeService = void 0;
const tslib_1 = require("tslib");
const di_1 = tslib_1.__importDefault(require("@jsmodules/di"));
const startupTime = new Date();
class TimeService {
    static diOptions = di_1.default.options({
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
exports.TimeService = TimeService;
//# sourceMappingURL=index.js.map