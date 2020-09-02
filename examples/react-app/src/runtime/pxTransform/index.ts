import { Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get("screen");

const designWidth = 750;

type PxTransformOptions = {
    rem: boolean;
};

const defaultOptions: PxTransformOptions = { rem: true };
export function pxTransform(px: number, options?: PxTransformOptions): any {
    options = { ...defaultOptions, ...options };
    if (Platform.OS === "web") {
        if (options.rem) {
            return `${(px / (designWidth / 10)).toFixed(5)}rem`;
        }
        if (width >= 750) {
            console.log(width);
            return px;
        }
    }
    return (width * px) / designWidth;
}
