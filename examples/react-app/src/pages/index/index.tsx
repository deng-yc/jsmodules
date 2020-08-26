import { Observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import logo from '@/logo.svg';
import { pxTransform } from '@/runtime/pxTransform';
import { SessionService } from '@jsmodules/core';
import { useAuthenticated, useResolveClass } from '@jsmodules/react';
import { Link } from '@react-navigation/native';
import { todoList } from '@shared/models';

export default () => {
    const sessionService = useResolveClass(SessionService);

    const { setAuthenticated } = useAuthenticated();

    const handleLogout = useCallback(async () => {
        await sessionService.logout();
        setAuthenticated(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log("renderPage");
    return (
        <View style={styles.page}>
            <View>
                <Observer>
                    {() => {
                        const { pageStatus, page, total_count } = todoList;
                        console.log("renderObserver", pageStatus, page, total_count);
                        return (
                            <View>
                                <Text style={styles.title}>
                                    {pageStatus}-{page}-{total_count}
                                </Text>
                            </View>
                        );
                    }}
                </Observer>
                <Link to={"/todos"}>TodoList</Link>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <p>{process.env.REACT_APP_PAYPAL_CLIENT_ID}</p>
                <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
                    Learn React - {process.env.API_ENV}
                </a>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    page: {
        flex: 1,
    },
    title: {
        fontSize: pxTransform(32),
    },
});
