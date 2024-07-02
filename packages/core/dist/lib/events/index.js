"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.events = exports.eventCenter = exports.Events = exports.EventSubscription = void 0;
const events_1 = require("events");
class EventSubscription {
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
exports.EventSubscription = EventSubscription;
class Events {
    emitter;
    constructor() {
        this.emitter = new events_1.EventEmitter();
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
exports.Events = Events;
exports.eventCenter = new Events();
exports.events = {
    eventCenter: exports.eventCenter,
    emitter() {
        return new events_1.EventEmitter();
    },
};
//# sourceMappingURL=index.js.map