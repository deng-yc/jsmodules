import { Observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { useParams } from 'react-router';

import { useMst } from '@/stores';
import { useDidMount } from '@jsmodules/react';

interface ITodoDetailProps {}

export const TodoDetail: React.FC<ITodoDetailProps> = (props: ITodoDetailProps) => {
    const params: any = useParams();
    const { todosStore } = useMst();

    const todo = useMemo(() => {
        return todosStore.getOrCreate(params.id);
    }, [params.id, todosStore]);

    useDidMount(() => {
        todo?.loadAsync();
    });

    const a = () => {
        todo?.updateAsync();
    };

    return (
        <>
            <div>id:{params.id}</div>
            <Observer>
                {() => {
                    return <div onClick={a}>状态:{todo?.fetchStatus}</div>;
                }}
            </Observer>
            <Observer>
                {() => {
                    return <div>昵称:{todo?.nickname}</div>;
                }}
            </Observer>
        </>
    );
};

export default TodoDetail;
