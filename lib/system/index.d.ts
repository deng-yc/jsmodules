import { nextId as _nextId, guid as _guid } from './id';
import { wait as _wait } from './wait';
export declare const nextId: typeof _nextId;
export declare const guid: typeof _guid;
export declare const wait: typeof _wait;
declare const _default: {
    nextId: () => number;
    guid: (separator?: string) => string;
    wait: (milliseconds: any) => Promise<{}>;
};
export default _default;
