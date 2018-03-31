

export class Browser {

    info: {
        name: string,
        version: any,
        fullVersion: string,
        os: string
    };

    userAgent;

    constructor() {
        this.userAgent = navigator.userAgent;
        this.info = this.getInfo();
    }

    hasViewport() {
        var doc = window.document;
        var metaEl = doc.querySelector('meta[name="viewport"]');
        if (metaEl) {
            //var match = metaEl.getAttribute('content').match(/width=.+/);
            //if (match&&match.length > 0) {
            return true;
            //}
        }
        return false;
    }

    isMobile() {
        return this.userAgent.match(
            /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i
        ) !== null;
    }

    isDesktop() {
        return !this.isMobile();
    }
    isAndroid() {
        return this.userAgent.match(/Android/i);
    }

    isBlackBerry() {
        return this.userAgent.match(/BlackBerry/i);
    }

    isIOS() {
        return this.userAgent.match(/iPhone|iPad|iPod/i);
    }
    isFBIOS() {
        return this.userAgent.match(/FBAN\/FBIOS/i);
    }
    isMac() {
        return this.userAgent.match(/Macintosh/i);
    }

    isOpera() {
        return this.userAgent.match(/Opera Mini/i);
    }

    isRetina() {
        return window.devicePixelRatio && window.devicePixelRatio > 1;
    }

    isIPad() {
        return (/ipad/gi).test(this.userAgent());
    }

    isLandscape() {
        return window.matchMedia('(orientation: landscape)').matches && !this.isDesktop;
    }

    isChrome() {
        const isChrome = (/Chrome/gi).test(navigator.appVersion);
        const isSafari = (/Safari/gi).test(navigator.appVersion);

        return isChrome && isSafari;
    }

    isFirefox() {
        const isFirefox = (/Firefox/gi).test(navigator.userAgent);
        return isFirefox;
    }

    isSafari() {
        const isSafari = (/Safari/gi).test(navigator.appVersion);
        const isChrome = (/Chrome/gi).test(navigator.appVersion);

        return !isChrome && isSafari;
    }

    isIE() {
        return (/msie/gi).test(this.userAgent);
    }

    isOldIE() {
        var info = this.info;
        return info.name == "MSIE" && info.version < 9;
    }


    private getOS() {
        var userAgent = this.userAgent;
        if (userAgent.indexOf('Windows Phone') !== -1) {
            return 'Windows Phone';
        }
        if (userAgent.indexOf('Win') !== -1) {
            return 'Windows';
        }
        if (userAgent.indexOf('Android') !== -1) {
            return 'Android';
        }
        if (userAgent.indexOf('Linux') !== -1) {
            return 'Linux';
        }
        if (userAgent.indexOf('X11') !== -1) {
            return 'UNIX';
        }
        if (/iPad|iPhone|iPod/i.test(userAgent)) {
            return 'iOS';
        }
        if (userAgent.indexOf('Mac') !== -1) {
            return 'OS X';
        }
        return "Other";
    }

    private getInfo() {
        var ua = navigator.userAgent;
        var tem;
        var os = this.getOS();
        var match = ua.match(/(opera|coast|chrome|safari|firefox|edge|trident(?=\/))\/?\s*?(\S+)/i) || [];

        tem = ua.match(/\bIEMobile\/(\S+[0-9])/);
        if (tem !== null) {
            return {
                name: 'IEMobile',
                version: tem[1].split('.')[0],
                fullVersion: tem[1],
                os: os
            };
        }

        if (/trident/i.test(match[1])) {
            tem = /\brv[ :]+(\S+[0-9])/g.exec(ua) || [];
            return {
                name: 'IE',
                version: tem[1] && tem[1].split('.')[0],
                fullVersion: tem[1],
                os: os
            };
        }

        if (match[1] === 'Chrome') {
            tem = ua.match(/\bOPR\/(\d+)/);
            if (tem !== null) {
                return {
                    name: 'Opera',
                    version: tem[1].split('.')[0],
                    fullVersion: tem[1],
                    os: os
                };
            }

            tem = ua.match(/\bEdge\/(\S+)/);
            if (tem !== null) {
                return {
                    name: 'Edge',
                    version: tem[1].split('.')[0],
                    fullVersion: tem[1],
                    os: os
                };
            }
        }
        match = match[2] ? [match[1], match[2]] : [navigator.appName, navigator.appVersion, '-?'];

        if (match[0] === 'Coast') {
            match[0] = 'OperaCoast';
        }

        if (match[0] !== 'Chrome') {
            tem = ua.match(/version\/(\S+)/i)
            if (tem !== null && tem !== '') {
                match.splice(1, 1, tem[1]);
            }
        }
        return {
            name: match[0],
            version: match[1].split('.')[0],
            fullVersion: match[1],
            os: os
        };
    }


    getClassList() {
        var info = this.info;
        var classList = [`platform-${navigator.platform}`, `os-${info.os.replace(/\s+/g, "-")}`, info.name, `${info.name}-${info.version}`];
        this.isIPad() && classList.push("ipad");
        this.isMobile() && classList.push("mobile");
        return classList.map((cls: string) => cls.toLowerCase());
    }
}
const browser = new Browser();
export default browser;