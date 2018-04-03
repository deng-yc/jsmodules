import { Type } from '../type';

const vaildate = async (target)=> {
    var isValid = true;
    var errors = [];
    var rules = target.__$vaildateRules__;
    var tasks = [];
    for (var propertyKey in rules) {
        var propertyRules = rules[propertyKey];
        var value = self[propertyKey];
        for (var rule of propertyRules) {
            var valid = await rule.vaildate(value, target);
            if (!valid) {
                isValid = false;
                var message = rule.message;
                if (Type.isFunction(message)) {
                    message = message(value, target)
                }
                errors.push(message);
            }
        }
    }
    return {
        isValid,
        errors
    }
}
const _rule = (rule) => {
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
    }
}

export const validator = (target) => {
    target.prototype.vaildate = function () {
        return vaildate(this);
    }
}

export const isRequired = (message?)=>{
    return _rule({
        message: message || "this field is required",
        vaildate: async (val, obj)=> {
            return val && val != ""
        }
    });
}