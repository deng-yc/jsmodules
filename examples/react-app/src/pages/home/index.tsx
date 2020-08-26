import React from "react";
import { Helmet } from "react-helmet";

import HomeBottomTabbar from "./components/BottomTabbar";

export default () => {
    return (
        <>
            <Helmet>
                <title>首页</title>
            </Helmet>
            首页
            <HomeBottomTabbar />
        </>
    );
};
