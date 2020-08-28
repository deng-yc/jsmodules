import React from 'react';

import styles from './index.module.less';

interface IHomeBottomTabbarProps {}

export const HomeBottomTabbar: React.FC<IHomeBottomTabbarProps> = (props: IHomeBottomTabbarProps) => {
    return (
        <div className={styles.bottomTabbar}>
            <div className={styles.content}></div>
        </div>
    );
};

export default HomeBottomTabbar;
