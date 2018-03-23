import { Subscription } from './subscription';

var eventSplitter = /\s+/;


export interface IEvents {
    on?: (events) => Subscription;
    trigger?: (events, ...rest) => any;
    addListener?: (events, callback, context?) => Events;
    removeListener?: (events, callback, content?) => Events;
    proxy?: (events) => (arg) => any;
}

export class Events implements IEvents {

    private callbacks;

    on(events): Subscription {
        return new Subscription(this, events);
    }

    addListener(events, callback, context?) {
        var calls, event, list;
        calls = this.callbacks || (this.callbacks = {});
        events = events.split(eventSplitter);

        while (event = events.shift()) {
            list = calls[event] || (calls[event] = []);
            list.push(callback, context);
        }
        return this;
    }

    removeListener(events, callback, context) {
        var event, calls, list, i;
        if (!(calls = this.callbacks)) {
            return this;
        }
        if (!(events || callback || context)) {
            delete this.callbacks;
            return this;
        }
        events = events ? events.split(eventSplitter) : Object.keys(calls);
        while (event = events.shift()) {
            if (!(list = calls[event]) || !(callback || context)) {
                delete calls[event];
                continue;
            }

            for (i = list.length - 2; i >= 0; i -= 2) {
                if (!(callback && list[i] !== callback || context && list[i + 1] !== context)) {
                    list.splice(i, 2);
                }
            }
        }

        return this;
    }

    trigger(events, ...rest) {
        var event, calls, list, i, length, args, all;
        if (!(calls = this.callbacks)) {
            return this;
        }
        events = events.split(eventSplitter);
        while (event = events.shift()) {
            if (all = calls.all) {
                all = all.slice();
            }
            if (list = calls[event]) {
                list = list.slice();
            }
            if (list) {
                for (i = 0, length = list.length; i < length; i += 2) {
                    list[i].apply(list[i + 1] || this, rest);
                }
            }
            if (all) {
                args = [event].concat(rest);
                for (i = 0, length = all.length; i < length; i += 2) {
                    all[i].apply(all[i + 1] || this, args);
                }
            }
        }

        return this;
    }

    proxy(events) {
        var that = this;
        return (function (...args) {
            that.trigger(events, ...args);
        });
    }

    static include(targetObject) {
        targetObject.on = Events.prototype.on;
        targetObject.addListener = Events.prototype.addListener;
        targetObject.removeListener = Events.prototype.removeListener;
        targetObject.trigger = Events.prototype.trigger;
        targetObject.proxy = Events.prototype.proxy;
    }
}