import { Observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { todoList } from '@shared/models';

interface ITodoListProps {}

export const TodoList: React.FC<ITodoListProps> = (props: ITodoListProps) => {
    useEffect(() => {
        todoList.fetchAsync({ page: 1 });
    }, []);

    return (
        <div>
            <Observer>
                {() => {
                    const { items } = todoList;
                    return (
                        <>
                            {items.map((item) => {
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
