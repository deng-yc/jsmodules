import React, { useMemo } from 'react';

import di from '@jsmodules/di';

import styles from './index.less';

@di.injectable()
class ServiceB {
    getA() {
        return '22c';
    }
}

export default (props: any) => {
    const a = di.getInstance(ServiceB);
    const b = useMemo(() => {
        return a.getA();
    }, []);
    return (
        <div>
            <h1 className={styles.title}>Page Users {b}</h1>
            <div>{props.children}</div>
        </div>
    );
};
