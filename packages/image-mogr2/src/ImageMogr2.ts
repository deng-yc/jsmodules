import isObject from "lodash/isObject";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ThumbnailOptions = {
    /**
     * 缩放比例,0-100
     */
    scale?: number;
    scale_type?: "default" | "width" | "height";
    width?: number;
    height?: number;
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;
    area?: number;
};

export class ImageMogr2 {
    private options: any = {};
    constructor(private download_url, private host) {
        this.autoOrient();
    }

    private thumbnailScale(options: ThumbnailOptions) {
        let scaleType = options.scale_type;
        if (!scaleType) {
            scaleType = "default";
        }
        if (scaleType == "default") {
            return `!${options.scale}p`;
        } else if (scaleType == "width") {
            return `!${options.scale}px`;
        } else if (scaleType == "height") {
            return `!x${options.scale}p`;
        }
        return null;
    }

    thumbnail(options: ThumbnailOptions) {
        this.options.thumbnail = this.options.thumbnail || {};
        let expr;
        if (options.scale) {
            expr = this.thumbnailScale(options);
            this.options.thumbnail["scale"] = expr;
            return this;
        }
        //指定目标图片宽度为 Width，高度等比压缩。
        if (options.width && !options.height) {
            this.options.thumbnail["wh"] = `${options.width}x`;
            return this;
        }
        //指定目标图片高度为 Height，宽度等比压缩。
        if (!options.width && options.height) {
            this.options.thumbnail["wh"]`x${options.width}`;
            return this;
        }
        //忽略原图宽高比例，指定图片宽度为 Width，高度为 Height ，强行缩放图片，可能导致目标图片变形。
        if (options.width && options.height) {
            this.options.thumbnail["wh"] = `${options.width}x${options.height}!`;
            return this;
        }

        //限定缩略图的宽度和高度的最大值分别为 Width 和 Height，进行等比缩放。
        if (options.maxWidth || options.maxHeight) {
            this.options.thumbnail["max"] = `${options.maxWidth}x${options.maxHeight}`;
            return this;
        }
        //限定缩略图的宽度和高度的最小值分别为 Width 和 Height，进行等比缩放。
        if (options.minWidth || options.minHeight) {
            this.options.thumbnail["min"] = `!${options.minWidth}x${options.minHeight}r`;
            return this;
        }
        //等比缩放图片，缩放后的图像，总像素数量不超过 Area。
        if (options.area) {
            this.options.thumbnail["area"] = `${options.area}@`;
        }
        return this;
    }

    cut(width, height, dx, dy) {
        this.options.cut = `${width}x${height}x${dx}x${dy}`;
        return this;
    }

    crop(width?, height?) {
        if (!width && !height) {
            return this;
        }
        this.options.crop = `${width || ""}x${height || ""}`;
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
    gravity(
        gravity: "northwest" | "north" | "northeast" | "west" | "center" | "east" | "southwest" | "south" | "southeast"
    ) {
        this.options.gravity = gravity;
        return this;
    }

    rotate(deg) {
        this.options.rotate = deg;
        return this;
    }

    autoOrient() {
        this.options["auto-orient"] = true;
        return this;
    }

    format(format?: "jpg" | "bmp" | "gif" | "png" | "webp" | "yjpeg") {
        if (format) {
            this.options.format = format;
        } else {
            this.options.format = null;
        }
        return this;
    }

    cgif(frameNumber: number) {
        this.options.cgif = frameNumber;
        return this;
    }

    quality(quality, force = false) {
        this.options.quality = `${quality}${force ? "!" : ""}`;
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

    getQuery() {
        const options: string[] = [];
        for (const key in this.options) {
            const val = this.options[key];
            if (val === true) {
                options.push(`/${key}`);
            } else if (isObject(val)) {
                for (const item in val) {
                    const itemVal = val[item];
                    options.push(`/${key}/${itemVal}`);
                }
            } else if (val) {
                options.push(`/${key}/${val}`);
            }
        }
        if (options.length == 0) {
            return "";
        }
        return `imageMogr2${options.join("")}`;
    }

    render() {
        if (!this.download_url) {
            return null;
        }
        if (/^file:\/\//.test(this.download_url)) {
            return this.download_url;
        }
        if (/\.gif$/.test(this.download_url)) {
            //强行将gif转换为16
            this.options = [];
            this.cgif(20);
        }
        if (/^https?:\/\//.test(this.download_url)) {
            if (this.download_url.indexOf(this.host) != 0) {
                return this.download_url;
            }
            const url = this.download_url.replace(/\?.+$/, "");
            return `${url}?${this.getQuery()}`;
        }
        const path = this.download_url.replace(/^\//, "");
        return `${this.host}/${path}?${this.getQuery()}`;
    }

    static src(url, host) {
        return new ImageMogr2(url, host);
    }
}

export default ImageMogr2;
