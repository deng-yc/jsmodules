import { Subscription } from './subscription';
export interface IEvents {
    on?: (events) => Subscription;
    trigger?: (events, ...rest) => any;
    addListener?: (events, callback, context?) => Events;
    removeListener?: (events, callback, content?) => Events;
    proxy?: (events) => (arg) => any;
}
export declare class Events implements IEvents {
    private callbacks;
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
