import React from 'react';
import { StyleSheet, View } from 'react-native';

import { pxTransform } from '@/runtime/pxTransform';

// import styles from './index.module.less';

interface IHomeBottomTabbarProps {}

export const HomeBottomTabbar: React.FC<IHomeBottomTabbarProps> = (props: IHomeBottomTabbarProps) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}></View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        paddingBottom: "env(safe-area-inset-bottom)",
    },
    content: {
        width: pxTransform(750),
        height: pxTransform(120),
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#f00",
    },
});

export default HomeBottomTabbar;
