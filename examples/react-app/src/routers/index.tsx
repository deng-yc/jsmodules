import React from "react";
import { Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const linking = {
    prefixes: ["http://localhost:3010", "local3010://"],
    config: {
        screens: {
            TodoDetail: "/todos/:id",
            TodoList: "/todos",
            Home: {
                path: "/",
                screens: {
                    Home: "/home",
                    Notifications: "/messages",
                    Profile: "/profile",
                },
            },
        },
    },
};

const MainStack = createStackNavigator();

export function AppRoutes() {
    return (
        <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
            <MainStack.Navigator
                screenOptions={{
                    headerShown: false,
                    animationEnabled: false,
                    // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}
            >
                <MainStack.Screen
                    name="Home"
                    options={{ title: "首页" }}
                    component={require("@/pages/index").default}
                />
                <MainStack.Screen
                    name="TodoList"
                    options={{ title: "任务列表" }}
                    component={require("@/pages/TodoList").default}
                />
                <MainStack.Screen
                    name="TodoDetail"
                    options={{ title: "任务详情" }}
                    component={require("@/pages/TodoList/Detail").default}
                />
            </MainStack.Navigator>
        </NavigationContainer>
    );
}
