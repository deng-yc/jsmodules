import { Observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useMst } from '@/stores';

interface ITodoListProps {}

export const TodoList: React.FC<ITodoListProps> = (props: ITodoListProps) => {
    const { todosStore } = useMst();
    useEffect(() => {
        todosStore.fetchAsync({ skip: 0 });
    }, []);

    return (
        <div>
            <Observer>
                {() => {
                    const { displayItems } = todosStore;
                    return (
                        <>
                            {displayItems.map((item) => {
                                return (
                                    <Observer key={item.id}>
                                        {() => {
                                            console.log("renderItem");
                                            return (
                                                <div>
                                                    <Link to={`/todos/${item.id}`}>{item.nickname}</Link>
                                                </div>
                                            );
                                        }}
                                    </Observer>
                                );
                            })}
                        </>
                    );
                }}
            </Observer>
        </div>
    );
};

export default TodoList;
