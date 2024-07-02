"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAppEvents = exports.useEvents = void 0;
const react_1 = require("react");
const hubs_1 = require("../events/hubs");
function useEvents(eventObj, name, fn) {
    (0, react_1.useEffect)(() => {
        const sub = eventObj.on(name).then(fn);
        return () => {
            sub.remove();
        };
    }, [eventObj, fn, name]);
}
exports.useEvents = useEvents;
function useAppEvents(name, fn) {
    useEvents(hubs_1.AppEventsHub, name, fn);
}
exports.useAppEvents = useAppEvents;
//# sourceMappingURL=events.js.map