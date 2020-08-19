import axios from 'axios';

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

    private isSetup = false;

    private updateByHeader(headers) {
        try {
            let date = headers["date"] || headers["Date"] || headers["DATE"];
            if (!date) {
                for (const key in headers) {
                    if (/^date$/i.test(key)) {
                        date = headers[key];
                        break;
                    }
                }
            }
            if (date) {
                this.update(date);
            }
        } catch (ex) {}
    }

    setup() {
        if (!this.isSetup) {
            this.isSetup = true;
            axios.interceptors.response.use(
                (resp) => {
                    this.updateByHeader(resp.headers);
                    return Promise.resolve(resp);
                },
                (error) => {
                    const { response } = error;
                    if (response) {
                        this.updateByHeader(response.headers);
                    }
                    return Promise.reject(error);
                }
            );
        }
    }
}
