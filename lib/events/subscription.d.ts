import { Events } from './index';
export declare class Subscription {
    owner: Events;
    events: any;
    constructor(owner: Events, events: any);
    callback: any;
    context: any;
    then: (callback: any, context?: any) => this;
    on: (callback: any, context?: any) => this;
    off: () => void;
}
