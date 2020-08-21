import { addMiddleware, applyAction, types } from 'mobx-state-tree';

type LoadingStatusType = "none" | "pending" | "success" | "failed" | "local";

export const Loadable = types
    .model({
        loadingStatus: types.optional(
            types.map(
                types.enumeration<LoadingStatusType>(["none", "pending", "success", "failed", "local"])
            ),
            {}
        ),
    })
    .actions((self) => {
        addMiddleware(self, (call, next) => {
            if (/Async$/.test(call.name)) {
                const stateName = call.name.replace("Async", "");
                if (call.type === "flow_spawn") {
                    applyAction(self, { name: "setLoading", args: [stateName, "pending"] });
                } else if (call.type === "flow_return") {
                    applyAction(self, { name: "setLoading", args: [stateName, "success"] });
                } else if (call.type === "flow_throw") {
                    applyAction(self, { name: "setLoading", args: [stateName, "failed"] });
                }
            }
            return next(call);
        });
        return {
            setLoading(key, loadingStatus: LoadingStatusType) {
                self.loadingStatus.set(key, loadingStatus);
            },
        };
    });
