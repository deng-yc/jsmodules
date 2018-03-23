"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Subscription = /** @class */ (function () {
    function Subscription(owner, events) {
        var _this = this;
        this.owner = owner;
        this.events = events;
        this.then = function (callback, context) {
            _this.callback = callback || _this.callback;
            _this.context = context || _this.context;
            if (!_this.callback) {
                return _this;
            }
            _this.owner.addListener(_this.events, _this.callback, _this.context);
            return _this;
        };
        this.on = this.then;
        this.off = function () {
            _this.owner.removeListener(_this.events, _this.callback, _this.context);
        };
    }
    return Subscription;
}());
exports.Subscription = Subscription;
