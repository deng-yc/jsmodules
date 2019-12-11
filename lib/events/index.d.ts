import { Subscription } from './subscription';
export interface IEvents {
    subcount: number;
    on?: (events: any) => Subscription;
    trigger?: (events: any, ...rest: any[]) => any;
    addListener?: (events: any, callback: any, context?: any) => Events;
    removeListener?: (events: any, callback: any, content?: any) => Events;
    proxy?: (events: any) => (arg: any) => any;
}
export declare class Events implements IEvents {
    private __callbacks__;
    subcount: number;
    on(events: any): Subscription;
    addListener(events: any, callback: any, context?: any): this;
    removeListener(events: any, callback: any, context: any): this;
    trigger(events: any, ...rest: any[]): this;
    proxy(events: any): (...args: any[]) => void;
    static include(targetObject: any): void;
}
declare const _default: {
    Subscription: typeof Subscription;
    Events: typeof Events;
};
export default _default;
