import { Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get("screen");

const designWidth = 750;

export function pxTransform(px: number): any {
    if (Platform.OS === "web") {
        return `${(px / (designWidth / 10)).toFixed(5)}rem`;
    }
    return (width * px) / designWidth;
}
