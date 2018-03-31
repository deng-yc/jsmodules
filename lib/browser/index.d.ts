export declare class Browser {
    info: {
        name: string;
        version: any;
        fullVersion: string;
        os: string;
    };
    userAgent: any;
    constructor();
    hasViewport(): boolean;
    isMobile(): boolean;
    isDesktop(): boolean;
    isAndroid(): any;
    isBlackBerry(): any;
    isIOS(): any;
    isFBIOS(): any;
    isMac(): any;
    isOpera(): any;
    isRetina(): boolean;
    isIPad(): boolean;
    isLandscape(): boolean;
    isChrome(): boolean;
    isFirefox(): boolean;
    isSafari(): boolean;
    isIE(): boolean;
    isOldIE(): boolean;
    private getOS();
    private getInfo();
    getClassList(): string[];
}
declare const browser: Browser;
export default browser;
