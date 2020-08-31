import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button, Image, Switch, View } from 'react-native';
import { Link } from 'react-router-dom';

import ViewShot, { ViewShotRef } from '@/components/ViewShot';
import { pxTransform } from '@/runtime/pxTransform';

import HomeBottomTabbar from './components/BottomTabbar';

export default () => {
    const [checked, setChecked] = useState(false);
    const viewShotRef = useRef<ViewShotRef>(null);

    const [url, setUrl] = useState("");

    return (
        <>
            <Helmet>
                <title>首页</title>
            </Helmet>
            <Button
                onPress={() => {
                    viewShotRef.current?.capture().then((data) => {
                        setUrl(data);
                    });
                }}
                title="截图"
            ></Button>
            <ViewShot ref={viewShotRef}>
                <View style={{ flex: 1 }}>
                    <Link to="/login">登录</Link>
                    <View>
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
                    </View>
                    <View>
                        <Switch value={checked} onValueChange={setChecked} shouldRasterizeIOS>
                            aaa
                        </Switch>
                    </View>
                </View>
            </ViewShot>
            {url && (
                <>
                    <img src={url} alt="截图" />
                    <a download href={url}>
                        保存截图
                    </a>
                </>
            )}

            <HomeBottomTabbar />
        </>
    );
};
