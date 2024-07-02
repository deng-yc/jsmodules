import { useEffect } from 'react';
import { AppEventsHub } from '../events/hubs';
export function useEvents(eventObj, name, fn) {
    useEffect(() => {
        const sub = eventObj.on(name).then(fn);
        return () => {
            sub.remove();
        };
    }, [eventObj, fn, name]);
}
export function useAppEvents(name, fn) {
    useEvents(AppEventsHub, name, fn);
}
//# sourceMappingURL=events.js.map