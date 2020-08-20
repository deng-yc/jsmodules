import { addMiddleware, applyAction, types } from 'mobx-state-tree';

type LoadingStatusType = "none" | "loading" | "success" | "failed" | "local";

export const Loadable = types
    .model("Loadable", {
        loadingStatus: types.enumeration<LoadingStatusType>("LoadingStatus", [
            "none",
            "loading",
            "success",
            "failed",
            "local",
        ]),
    })
    .actions((self) => {
        addMiddleware(self, (call, next) => {
            debugger;
            if (/Async$/.test(call.name)) {
                if (call.type === "flow_spawn") {
                    applyAction(self, { name: "setLoading", args: ["loading"] });
                } else if (call.type === "flow_return") {
                    applyAction(self, { name: "setLoading", args: ["success"] });
                } else if (call.type === "flow_throw") {
                    applyAction(self, { name: "setLoading", args: ["failed"] });
                }
            }
            return next(call);
        });
        return {
            setLoading(loading: LoadingStatusType) {
                self.loadingStatus = loading;
            },
        };
    });
