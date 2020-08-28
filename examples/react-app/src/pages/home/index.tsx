import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

import HomeBottomTabbar from './components/BottomTabbar';

export default () => {
    return (
        <>
            <Helmet>
                <title>首页</title>
            </Helmet>

            <Link to="/login">登录</Link>

            <HomeBottomTabbar />
        </>
    );
};
