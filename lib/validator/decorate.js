"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var type_1 = require("../type");
var vaildate = function (target) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var isValid, errors, rules, tasks, _a, _b, _i, propertyKey, propertyRules, value, _c, propertyRules_1, rule, valid, message;
    return tslib_1.__generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                isValid = true;
                errors = [];
                rules = target.__$vaildateRules__;
                tasks = [];
                _a = [];
                for (_b in rules)
                    _a.push(_b);
                _i = 0;
                _d.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 6];
                propertyKey = _a[_i];
                propertyRules = rules[propertyKey];
                value = self[propertyKey];
                _c = 0, propertyRules_1 = propertyRules;
                _d.label = 2;
            case 2:
                if (!(_c < propertyRules_1.length)) return [3 /*break*/, 5];
                rule = propertyRules_1[_c];
                return [4 /*yield*/, rule.vaildate(value, target)];
            case 3:
                valid = _d.sent();
                if (!valid) {
                    isValid = false;
                    message = rule.message;
                    if (type_1.Type.isFunction(message)) {
                        message = message(value, target);
                    }
                    errors.push(message);
                }
                _d.label = 4;
            case 4:
                _c++;
                return [3 /*break*/, 2];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/, {
                    isValid: isValid,
                    errors: errors
                }];
        }
    });
}); };
var _rule = function (rule) {
    return function (target, propertyKey) {
        if (!target.__$vaildateRules__) {
            target.__$vaildateRules__ = {};
        }
        var rules = target.__$vaildateRules__;
        if (!rules[propertyKey]) {
            rules[propertyKey] = [];
        }
        var propertyRules = rules[propertyKey];
        propertyRules.push(rule);
    };
};
exports.validator = function (target) {
    target.prototype.vaildate = function () {
        return vaildate(this);
    };
};
exports.isRequired = function (message) {
    return _rule({
        message: message || "this field is required",
        vaildate: function (val, obj) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, val && val != ""];
            });
        }); }
    });
};
