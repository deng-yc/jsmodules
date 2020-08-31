import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Image, Switch, View } from 'react-native';
import { Link } from 'react-router-dom';

import { pxTransform } from '@/runtime/pxTransform';

import HomeBottomTabbar from './components/BottomTabbar';

export default () => {
    const [checked, setChecked] = useState(false);

    return (
        <>
            <Helmet>
                <title>首页</title>
            </Helmet>

            <View>
                <Link to="/login">登录</Link>
                <div>
                    <Image
                        style={{
                            width: pxTransform(100),
                            height: pxTransform(100),
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            shadowRadius: pxTransform(10),
                        }}
                        source={{
                            uri: "http://necolas.github.io/react-native-web/docs/static/media/hawk.0b66d0e5.png",
                        }}
                    />
                </div>
                <div>
                    <Switch value={checked} onValueChange={setChecked} shouldRasterizeIOS>
                        aaa
                    </Switch>
                </div>
            </View>

            <HomeBottomTabbar />
        </>
    );
};
