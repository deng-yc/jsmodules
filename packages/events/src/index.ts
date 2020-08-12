import E from 'events';

export let eventCenter = new E.EventEmitter();

const maps = new Map<string, E.EventEmitter>();

export let events = {
    eventCenter,
    scope(scopeName?: string) {
        if (!scopeName) {
            return eventCenter;
        }
        if (!maps.has(scopeName)) {
            maps.set(scopeName, new E.EventEmitter());
        }
        return maps.get(scopeName);
    },
};
export default events;
