import { EventEmitter } from "events";
type EventCallback = (...args: any[]) => void;
export declare class EventSubscription {
    emmiter: EventEmitter;
    eventName: string;
    constructor(emmiter: EventEmitter, eventName: string);
    private callbacks;
    then(callback: EventCallback): this;
    once(callback: EventCallback): this;
    count(): any;
    remove(): void;
}
export declare class Events {
    private emitter;
    constructor();
    on(eventName: any, callback?: EventCallback): EventSubscription;
    removeAllSubscription(eventName: any): void;
    emit(eventName: any, ...args: any[]): void;
    proxy(eventName: any): (...args: any[]) => void;
}
export declare const eventCenter: Events;
export declare const events: {
    eventCenter: Events;
    emitter(): any;
};
export {};
//# sourceMappingURL=index.d.ts.map