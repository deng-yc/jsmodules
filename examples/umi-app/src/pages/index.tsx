import React, { useMemo } from 'react';
import { Link } from 'umi';

import { di } from '@jsmodules/di';

import styles from './index.less';

@di.injectable()
class ServiceA {
    getA() {
        return '123';
    }
}

export default () => {
    const a = di.getInstance(ServiceA);
    const b = useMemo(() => {
        return a.getA();
    }, []);
    return (
        <div>
            <h1 className={styles.title}>Page index {b}</h1>
            <Link to={'/users'}>users</Link>
            <Link to={'/users/add'}>app1</Link>
        </div>
    );
};
