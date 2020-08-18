export const routers = [
    {
        path: "/login",
        component: require("@/pages/login").default,
    },
    {
        path: "/",
        component: require("@/layouts").default,
        routes: [
            {
                component: require("@/pages/index"),
            },
        ],
    },
];
