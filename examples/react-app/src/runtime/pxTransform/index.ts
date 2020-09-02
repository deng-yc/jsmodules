import { Dimensions, Platform } from 'react-native';

const { width: screenWidth } = Dimensions.get("screen");
const { width: windowWidth } = Dimensions.get("window");

const designWidth = 750;

type PxTransformOptions = {
    /**
     * only web,default:true
     */
    rem: boolean;
};

const defaultOptions: PxTransformOptions = { rem: true };
export function pxTransform(px: number, options?: PxTransformOptions): any {
    options = { ...defaultOptions, ...options };
    if (Platform.OS === "web") {
        if (options.rem) {
            return `${(px / (designWidth / 10)).toFixed(5)}rem`;
        }
        if (windowWidth >= 750) {
            return px;
        }
        return (windowWidth * px) / designWidth;
    }
    return (screenWidth * px) / designWidth;
}
