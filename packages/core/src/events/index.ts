import { EventEmitter } from 'events';

type EventCallback = (...args) => void;

export class EventSubscription {
    constructor(public emmiter: EventEmitter, public eventName: string) {}
    private callbacks = [];

    then(callback: EventCallback) {
        this.callbacks.push(callback);
        this.emmiter.on(this.eventName, callback);
        return this;
    }

    once(callback: EventCallback) {
        const onceCallback = (...args) => {
            callback(...args);
            this.callbacks = this.callbacks.filter((f) => f != onceCallback);
        };
        this.callbacks.push(onceCallback);
        this.emmiter.once(this.eventName, onceCallback);
        return this;
    }

    count() {
        return this.emmiter.listenerCount(this.eventName);
    }

    remove() {
        for (const callback of this.callbacks) {
            this.emmiter.removeListener(this.eventName, callback);
        }
    }
}

export class Events {
    private emitter: EventEmitter;
    constructor() {
        this.emitter = new EventEmitter();
    }

    on(eventName, callback?: EventCallback) {
        const subscription = new EventSubscription(this.emitter, eventName);
        if (callback) {
            return subscription.then(callback);
        }
        return subscription;
    }

    removeAllSubscription(eventName) {
        this.emitter.removeAllListeners(eventName);
    }

    emit(eventName, ...args) {
        this.emitter.emit(eventName, ...args);
    }

    proxy(eventName) {
        return (...args) => {
            this.emit(eventName, ...args);
        };
    }
}

export const eventCenter = new Events();
export const events = {
    eventCenter,
    emitter() {
        return new EventEmitter();
    },
};
