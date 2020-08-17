export declare type ThumbnailOptions = {
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
export declare class ImageMogr2 {
    private download_url;
    private host;
    private options;
    constructor(download_url: any, host: any);
    private thumbnailScale;
    thumbnail(options: ThumbnailOptions): this;
    cut(width: any, height: any, dx: any, dy: any): this;
    crop(width?: any, height?: any): this;
    iradius(radius: any): this;
    scrop(width: any, height: any): this;
    gravity(gravity: "northwest" | "north" | "northeast" | "west" | "center" | "east" | "southwest" | "south" | "southeast"): this;
    rotate(deg: any): this;
    autoOrient(): this;
    format(format?: "jpg" | "bmp" | "gif" | "png" | "webp" | "yjpeg"): this;
    cgif(frameNumber: number): this;
    quality(quality: any, force?: boolean): this;
    rquality(quality: any): this;
    lquality(quality: any): this;
    blur(radius: any, sigma: any): this;
    sharpen(value: any): this;
    getQuery(): string;
    render(): any;
    static src(url: any, host: any): ImageMogr2;
}
export default ImageMogr2;
