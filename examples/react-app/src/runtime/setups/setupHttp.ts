import axios from 'axios';

import { TimeService } from '@jsmodules/core';
import di from '@jsmodules/di';

function setupTimeService() {
    const updateByHeader = (headers: any) => {
        try {
            const timeService = di.getInstance(TimeService);
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
                timeService.update(date);
            }
        } catch (ex) {}
    };

    axios.interceptors.response.use(
        (resp) => {
            updateByHeader(resp.headers);
            return Promise.resolve(resp);
        },
        (error) => {
            const { response } = error;
            if (response) {
                updateByHeader(response.headers);
            }
            return Promise.reject(error);
        }
    );
}

export function setupHttp() {
    setupTimeService();
}
