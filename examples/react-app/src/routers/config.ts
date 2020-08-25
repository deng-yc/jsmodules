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
                path: "/todos/:id",
                component: require("@/pages/TodoList/Detail").default,
            },
            {
                path: "/todos",
                component: require("@/pages/TodoList").default,
            },
            {
                component: require("@/pages/index").default,
            },
        ],
    },
];
