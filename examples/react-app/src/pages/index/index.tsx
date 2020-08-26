import React from 'react';
import { Text, View } from 'react-native';

import { pxTransform } from '@/runtime/pxTransform';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Link } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

function Feed() {
    return (
        <View>
            <Text>Feed</Text>

            <Link to="/todos">TodoList</Link>
        </View>
    );
}

function Notifications() {
    return (
        <View>
            <Text>Notifications</Text>
        </View>
    );
}
function Profile() {
    return (
        <View>
            <Text>Profile</Text>
        </View>
    );
}
export default () => {
    return (
        <Tab.Navigator
            initialRouteName="Feed"
            tabBarOptions={{
                activeTintColor: "#e91e63",
            }}
        >
            <Tab.Screen
                name="Home"
                component={Feed}
                options={{
                    title: "首页",
                    tabBarLabel: "首页",
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <View
                                style={{
                                    backgroundColor: color,
                                    width: size,
                                    height: size,
                                }}
                            ></View>
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    title: "通知消息",
                    tabBarLabel: "通知消息",
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <View
                                style={{
                                    backgroundColor: color,
                                    width: size,
                                    height: size,
                                }}
                            ></View>
                        );
                    },
                    tabBarBadge: 3,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    title: "个人中心",
                    tabBarLabel: "个人中心",
                    tabBarIcon: ({ color, size }) => {
                        return (
                            <View
                                style={{
                                    backgroundColor: color,
                                    width: size,
                                    height: size,
                                }}
                            ></View>
                        );
                    },
                }}
            />
        </Tab.Navigator>
    );
};
