import { encode as _encode } from './encode';
import { decode as _decode } from './decode';
export declare const encode: typeof _encode;
export declare const decode: typeof _decode;
declare const _default: {
    encode: (data: any) => string;
    decode: (url: string, toLowerCase?: boolean) => any;
};
export default _default;
