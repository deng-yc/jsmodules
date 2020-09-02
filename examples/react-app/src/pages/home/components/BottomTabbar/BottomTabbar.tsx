import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Link } from 'react-router-dom';

interface IBottomTabbarProps {}

export const BottomTabbar = (props: IBottomTabbarProps) => {
    return (
        <View style={styles.tabbar}>
            <View style={styles.tabItem}>
                <Link to="/todos">任务</Link>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    tabbar: {
        flex: 1,
        flexDirection: "row",
    },
    tabItem: {
        flex: 1,
    },
});

export default BottomTabbar;
