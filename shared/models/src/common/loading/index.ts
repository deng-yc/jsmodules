import { types } from 'mobx-state-tree';

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
    .actions((self) => ({
        setLoading(loading: LoadingStatusType) {
            self.loadingStatus = loading;
        },
    }));
