import Type from '../type';

export default function Format(target: string, ...args) {
    var raw = target;
    if (args.length == 1 && Type.isObject(args[0])) {
        if (Type.isArray(args[0])) {
            args = args[0];
            for (var i = 0; i < args.length; i++) {
                if (args[i] == undefined) {
                    return "";
                }
                else {
                    var reg = new RegExp("({[" + (i) + "]})", "g");
                    var val = args[i];
                    if (Type.isString(val)) {
                        //将值里面的 $1 替换成 $$1
                        val = val.replace(/\$1/g, "$$$1");
                    }
                    raw = raw.replace(reg, val);
                }
            }
        } else {
            var obj = args[0];
            for (var key in obj) {
                var reg = new RegExp("({" + key + "})", "g");
                var val = obj[key];
                if (Type.isString(val)) {
                    //将值里面的 $1 替换成 $$1
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
                if (Type.isString(val)) {
                    //将值里面的 $1 替换成 $$1
                    val = val.replace(/\$1/g, "$$$1");
                }
                raw = raw.replace(reg, val);
            }
        }
    }
    return raw;
}
