import React from 'react';
import { Helmet } from 'umi';

import styles from './index.less';

interface IProps {
  initialData: number;
}

export default function Home(props: IProps) {
  return (
    <div>
      <Helmet>
        <title>首页</title>
        <meta name="description" content="app介绍" />
        <meta name="keyword" content="关键字1，关键字2" />
      </Helmet>
      <h1 className={styles.title}>Page index:{props.initialData}</h1>
    </div>
  );
}

Home.getInitialProps = async (ctx: any) => {
  if (ctx.isServer) {
    return {
      initialData: 1231,
    };
  }
};
