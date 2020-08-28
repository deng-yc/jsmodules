import React from 'react';
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';

export const routers = [
    {
        path: "/login",
        component: require("@/pages/login").default,
    },
    {
        path: "/",
        component: require("@/pages/home").default,
        routes: [
            //几个Tab标签页
        ],
    },
];

export function AppRoutes() {
    return <BrowserRouter>{renderRoutes(routers)}</BrowserRouter>;
}
