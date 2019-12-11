"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_1 = require("../type");
function Format(target) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var raw = target;
    if (args.length == 1 && type_1.default.isObject(args[0])) {
        if (type_1.default.isArray(args[0])) {
            args = args[0];
            for (var i = 0; i < args.length; i++) {
                if (args[i] == undefined) {
                    return "";
                }
                else {
                    var reg = new RegExp("({[" + (i) + "]})", "g");
                    var val = args[i];
                    if (type_1.default.isString(val)) {
                        //��ֵ����� $1 �滻�� $$1
                        val = val.replace(/\$1/g, "$$$1");
                    }
                    raw = raw.replace(reg, val);
                }
            }
        }
        else {
            var obj = args[0];
            for (var key in obj) {
                var reg = new RegExp("({" + key + "})", "g");
                var val = obj[key];
                if (type_1.default.isString(val)) {
                    //��ֵ����� $1 �滻�� $$1
                    val = val.replace(/\$1/g, "$$$1");
                }
                raw = raw.replace(reg, val);
            }
        }
    }
    else {
        for (var i = 1; i < arguments.length; i++) {
            if (arguments[i] == undefined) {
                return "";
            }
            else {
                var reg = new RegExp("({[" + (i - 1) + "]})", "g");
                var val = arguments[i];
                if (type_1.default.isString(val)) {
                    //��ֵ����� $1 �滻�� $$1
                    val = val.replace(/\$1/g, "$$$1");
                }
                raw = raw.replace(reg, val);
            }
        }
    }
    return raw;
}
exports.default = Format;
