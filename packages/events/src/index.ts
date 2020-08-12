import { EventEmitter } from 'events';

export let eventCenter = new EventEmitter();

const maps = new Map<string, EventEmitter>();

export let events = {
    eventCenter,
    scope(scopeName?: string) {
        if (!scopeName) {
            return eventCenter;
        }
        if (!maps.has(scopeName)) {
            maps.set(scopeName, new EventEmitter());
        }
        return maps.get(scopeName);
    },
    remove(scopeName) {
        if (maps.has(scopeName)) {
            maps.get(scopeName).removeAllListeners();
            maps.delete(scopeName);
        }
    },
};
export default events;
