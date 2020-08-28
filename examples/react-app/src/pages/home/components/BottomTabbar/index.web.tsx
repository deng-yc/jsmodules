import React from 'react';

import styles from './index.module.less';

interface IHomeBottomTabbarProps {}

export const HomeBottomTabbar: React.FC<IHomeBottomTabbarProps> = (props: IHomeBottomTabbarProps) => {
    return (
        <div style={styles.container}>
            <div style={styles.content}></div>
        </div>
    );
};

export default HomeBottomTabbar;
