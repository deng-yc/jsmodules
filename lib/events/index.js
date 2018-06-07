"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var subscription_1 = require("./subscription");
var eventSplitter = /\s+/;
var Events = /** @class */ (function () {
    function Events() {
        this.subcount = 0;
    }
    Events.prototype.on = function (events) {
        return new subscription_1.Subscription(this, events);
    };
    Events.prototype.addListener = function (events, callback, context) {
        var calls, event, list;
        calls = this.__callbacks__ || (this.__callbacks__ = {});
        events = events.split(eventSplitter);
        while (event = events.shift()) {
            list = calls[event] || (calls[event] = []);
            list.push(callback, context);
            this.subcount += 1;
        }
        return this;
    };
    Events.prototype.removeListener = function (events, callback, context) {
        var event, calls, list, i;
        if (!(calls = this.__callbacks__)) {
            return this;
        }
        if (!(events || callback || context)) {
            delete this.__callbacks__;
            this.subcount = 0;
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
                    this.subcount -= 1;
                }
            }
        }
        return this;
    };
    Events.prototype.trigger = function (events) {
        var rest = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            rest[_i - 1] = arguments[_i];
        }
        var event, calls, list, i, length, args, all;
        if (!(calls = this.__callbacks__)) {
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
    };
    Events.prototype.proxy = function (events) {
        var that = this;
        return (function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            that.trigger.apply(that, [events].concat(args));
        });
    };
    Events.include = function (targetObject) {
        targetObject.on = Events.prototype.on;
        targetObject.addListener = Events.prototype.addListener;
        targetObject.removeListener = Events.prototype.removeListener;
        targetObject.trigger = Events.prototype.trigger;
        targetObject.proxy = Events.prototype.proxy;
    };
    return Events;
}());
exports.Events = Events;
exports.default = {
    Subscription: subscription_1.Subscription,
    Events: Events
};
