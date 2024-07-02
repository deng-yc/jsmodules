import { EventEmitter } from "events";
export class EventSubscription {
    emmiter;
    eventName;
    constructor(emmiter, eventName) {
        this.emmiter = emmiter;
        this.eventName = eventName;
    }
    callbacks = [];
    then(callback) {
        this.callbacks.push(callback);
        this.emmiter.on(this.eventName, callback);
        return this;
    }
    once(callback) {
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
    emitter;
    constructor() {
        this.emitter = new EventEmitter();
    }
    on(eventName, callback) {
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
//# sourceMappingURL=index.js.map