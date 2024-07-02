export type ThumbnailOptions = {
    /**
     * 缩放比例,0-100
     */
    scale?: number;
    scale_type?: 'default' | 'width' | 'height';
    width?: number;
    height?: number;
    maxWidth?: number;
    maxHeight?: number;
    minWidth?: number;
    minHeight?: number;
    area?: number;
};
declare class ImageMogr2Creater {
    private callbacks;
    use(cb: (builder: ImageMogr2) => ImageMogr2): this;
    apply(builder: any): any;
}
export declare class ImageWatermark {
    private image;
    private options;
    constructor(image: any);
    gravity(gravity: 'northwest' | 'north' | 'northeast' | 'west' | 'center' | 'east' | 'southwest' | 'south' | 'southeast'): this;
    dx(dx: number): this;
    dy(dy: number): this;
    blogo(blogo: 1 | 2): this;
    scatype(scatype: 1 | 2 | 3): this;
    spcent(spcent: number): this;
    dissolve(dissolve: number): this;
    toString(): string;
}
export declare class TextWatermark {
    private text;
    constructor(text: any);
    toString(): string;
}
export declare class ImageMogr2Watermark {
    static image(base64: any): ImageWatermark;
    static text(text: any): TextWatermark;
}
export declare class ImageMogr2 {
    private download_url;
    private default_host;
    private hosts;
    private options;
    static Creater: ImageMogr2Creater;
    private watermarks;
    constructor(download_url: any);
    setDefaultHost(default_host: any): this;
    setHosts(hosts?: any[]): this;
    private thumbnailScale;
    thumbnail(options: ThumbnailOptions): this;
    cut(width: any, height: any, dx: any, dy: any): this;
    crop(width?: any, height?: any): this;
    iradius(radius: any): this;
    scrop(width: any, height: any): this;
    gravity(gravity: 'northwest' | 'north' | 'northeast' | 'west' | 'center' | 'east' | 'southwest' | 'south' | 'southeast'): this;
    rotate(deg: any): this;
    autoOrient(): this;
    format(format?: 'jpg' | 'bmp' | 'gif' | 'png' | 'webp' | 'yjpeg'): this;
    cgif(frameNumber: number): this;
    quality(quality: any, force?: boolean): this;
    rquality(quality: any): this;
    lquality(quality: any): this;
    blur(radius: any, sigma: any): this;
    sharpen(value: any): this;
    watermark(getWatemark: () => ImageWatermark | TextWatermark): this;
    getQuery(hasQuery?: boolean): string;
    /**
     * 获取url
     */
    getURL(): any;
    /**
     * 获取url
     * @deprecated
     */
    render(): any;
    static src(url: any, host?: any): ImageMogr2;
}
export default ImageMogr2;
//# sourceMappingURL=ImageMogr2.d.ts.map