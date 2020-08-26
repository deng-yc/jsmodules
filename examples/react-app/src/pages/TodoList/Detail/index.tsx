import { Observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';

import { useDidMount } from '@jsmodules/react';
import { useRoute } from '@react-navigation/native';
import { todoList } from '@shared/models';

interface ITodoDetailProps {}

export const TodoDetail: React.FC<ITodoDetailProps> = (props: ITodoDetailProps) => {
    const route = useRoute();
    const params: any = route.params;
    const todo = useMemo(() => {
        return todoList.get(params.id);
    }, [params.id]);

    useDidMount(() => {
        todo.loadAsync();
    });

    return (
        <>
            <div>id:{params.id}</div>
            <Observer>
                {() => {
                    return <div>状态:{todo.fetchStatus}</div>;
                }}
            </Observer>
            <Observer>
                {() => {
                    return <div>昵称:{todo.nickname}</div>;
                }}
            </Observer>
        </>
    );
};

export default TodoDetail;
