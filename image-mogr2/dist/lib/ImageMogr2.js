"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageMogr2 = exports.ImageMogr2Watermark = exports.TextWatermark = exports.ImageWatermark = void 0;
const tslib_1 = require("tslib");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
class ImageMogr2Creater {
    callbacks = [];
    use(cb) {
        this.callbacks.push(cb);
        return this;
    }
    apply(builder) {
        let img = builder;
        for (const cb of this.callbacks) {
            img = cb(img);
        }
        return img;
    }
}
class ImageWatermark {
    image;
    options = {};
    constructor(image) {
        this.image = image;
        this.options['image'] = image;
    }
    gravity(gravity) {
        this.options['gravity'] = gravity;
        return this;
    }
    dx(dx) {
        this.options['dx'] = dx;
        return this;
    }
    dy(dy) {
        this.options['dy'] = dy;
        return this;
    }
    blogo(blogo) {
        this.options['blogo'] = blogo;
        return this;
    }
    scatype(scatype) {
        this.options['scatype'] = scatype;
        return this;
    }
    spcent(spcent) {
        this.options['spcent'] = spcent;
        return this;
    }
    dissolve(dissolve) {
        this.options['dissolve'] = dissolve;
        return this;
    }
    toString() {
        const options = [];
        for (const key in this.options) {
            const val = this.options[key];
            if (val === true) {
                options.push(`/${key}`);
            }
            else if (lodash_1.default.isObject(val)) {
                for (const item in val) {
                    const itemVal = val[item];
                    options.push(`/${key}/${itemVal}`);
                }
            }
            else if (val) {
                options.push(`/${key}/${val}`);
            }
        }
        return `watermark/1${options.join('')}`;
    }
}
exports.ImageWatermark = ImageWatermark;
class TextWatermark {
    text;
    constructor(text) {
        this.text = text;
    }
    toString() {
        return `watermark/2/text/${this.text}`;
    }
}
exports.TextWatermark = TextWatermark;
class ImageMogr2Watermark {
    static image(base64) {
        return new ImageWatermark(base64);
    }
    static text(text) {
        return new TextWatermark(text);
    }
}
exports.ImageMogr2Watermark = ImageMogr2Watermark;
class ImageMogr2 {
    download_url;
    default_host = '';
    hosts = [];
    options = {};
    static Creater = new ImageMogr2Creater();
    watermarks = [];
    constructor(download_url) {
        this.download_url = download_url;
        this.autoOrient();
    }
    setDefaultHost(default_host) {
        this.default_host = default_host;
        return this;
    }
    setHosts(hosts = []) {
        this.hosts = hosts;
        return this;
    }
    thumbnailScale(options) {
        let scaleType = options.scale_type;
        if (!scaleType) {
            scaleType = 'default';
        }
        if (scaleType == 'default') {
            return `!${options.scale}p`;
        }
        else if (scaleType == 'width') {
            return `!${options.scale}px`;
        }
        else if (scaleType == 'height') {
            return `!x${options.scale}p`;
        }
        return null;
    }
    thumbnail(options) {
        this.options.thumbnail = this.options.thumbnail || {};
        let expr;
        if (options.scale) {
            expr = this.thumbnailScale(options);
            this.options.thumbnail['scale'] = expr;
            return this;
        }
        //指定目标图片宽度为 Width，高度等比压缩。
        if (options.width && !options.height) {
            this.options.thumbnail['wh'] = `${options.width || ''}x`;
            return this;
        }
        //指定目标图片高度为 Height，宽度等比压缩。
        if (!options.width && options.height) {
            this.options.thumbnail['wh'] = `x${options.width || ''}`;
            return this;
        }
        //忽略原图宽高比例，指定图片宽度为 Width，高度为 Height ，强行缩放图片，可能导致目标图片变形。
        if (options.width && options.height) {
            this.options.thumbnail['wh'] = `${options.width}x${options.height}!`;
            return this;
        }
        //限定缩略图的宽度和高度的最大值分别为 Width 和 Height，进行等比缩放。
        if (options.maxWidth || options.maxHeight) {
            this.options.thumbnail['max'] = `${options.maxWidth || ''}x${options.maxHeight || ''}`;
            return this;
        }
        //限定缩略图的宽度和高度的最小值分别为 Width 和 Height，进行等比缩放。
        if (options.minWidth || options.minHeight) {
            this.options.thumbnail['min'] = `!${options.minWidth || ''}x${options.minHeight || ''}r`;
            return this;
        }
        //等比缩放图片，缩放后的图像，总像素数量不超过 Area。
        if (options.area) {
            this.options.thumbnail['area'] = `${options.area}@`;
        }
        return this;
    }
    cut(width, height, dx, dy) {
        this.options.cut = `${width}x${height}x${dx}x${dy}`;
        return this;
    }
    crop(width, height) {
        if (!width && !height) {
            return this;
        }
        this.options.crop = `${width || ''}x${height || ''}`;
        return this;
    }
    iradius(radius) {
        this.options.iradius = radius;
        return this;
    }
    scrop(width, height) {
        this.options.scrop = `${width}x${height}`;
        return this;
    }
    gravity(gravity) {
        this.options.gravity = gravity;
        return this;
    }
    rotate(deg) {
        this.options.rotate = deg;
        return this;
    }
    autoOrient() {
        this.options['auto-orient'] = true;
        return this;
    }
    format(format) {
        if (format) {
            this.options.format = format;
        }
        else {
            this.options.format = null;
        }
        return this;
    }
    cgif(frameNumber) {
        this.options.cgif = frameNumber;
        return this;
    }
    quality(quality, force = false) {
        this.options.quality = `${quality}${force ? '!' : ''}`;
        return this;
    }
    rquality(quality) {
        this.options.rquality = quality;
        return this;
    }
    lquality(quality) {
        this.options.lquality = quality;
        return this;
    }
    blur(radius, sigma) {
        if (sigma <= 0) {
            return this;
        }
        this.options.blur = `${radius}x${sigma}`;
        return this;
    }
    sharpen(value) {
        if (value >= 10 && value <= 300) {
            this.options.sharpen = value;
        }
        return this;
    }
    watermark(getWatemark) {
        const mark = getWatemark();
        if (mark) {
            this.watermarks.push(mark);
        }
        return this;
    }
    getQuery(hasQuery = false) {
        const options = [];
        for (const key in this.options) {
            const val = this.options[key];
            if (val === true) {
                options.push(`/${key}`);
            }
            else if (lodash_1.default.isObject(val)) {
                for (const item in val) {
                    const itemVal = val[item];
                    options.push(`/${key}/${itemVal}`);
                }
            }
            else if (val) {
                options.push(`/${key}/${val}`);
            }
        }
        if (options.length == 0) {
            return '';
        }
        let prefix = '?';
        if (hasQuery) {
            prefix = '&';
        }
        let url = `${prefix}imageMogr2${options.join('')}`;
        for (const mark of this.watermarks) {
            url += '|' + mark.toString();
        }
        return url;
    }
    /**
     * 获取url
     */
    getURL() {
        if (!this.download_url) {
            return null;
        }
        if (/^file:\/\//.test(this.download_url)) {
            return this.download_url;
        }
        if (/\.gif$/.test(this.download_url)) {
            //强行将gif转换为16
            this.options = [];
            // this.cgif(20);
        }
        let hasQuery = false;
        if (this.download_url.indexOf('?') != -1) {
            hasQuery = true;
        }
        if (/^\/\//.test(this.download_url) || /^https?:\/\//.test(this.download_url)) {
            for (const h of this.hosts) {
                if (this.download_url.indexOf(h) != -1) {
                    return `${this.download_url}${this.getQuery(hasQuery)}`;
                }
            }
            return this.download_url;
        }
        const path = this.download_url.replace(/^\//, '');
        return `${this.default_host}/${path}${this.getQuery(hasQuery)}`;
    }
    /**
     * 获取url
     * @deprecated
     */
    render() {
        return this.getURL();
    }
    static src(url, host = null) {
        let img = new ImageMogr2(url);
        img = ImageMogr2.Creater.apply(new ImageMogr2(url));
        if (host) {
            img.setDefaultHost(host);
        }
        return img;
    }
}
exports.ImageMogr2 = ImageMogr2;
exports.default = ImageMogr2;
//# sourceMappingURL=ImageMogr2.js.map