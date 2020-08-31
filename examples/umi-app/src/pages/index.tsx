import React from 'react';
import { Helmet } from 'umi';

import styles from './index.less';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>首页</title>
        <meta name="description" content="app介绍" />
        <meta name="keyword" content="关键字1，关键字2" />
      </Helmet>
      <h1 className={styles.title}>Page index</h1>
    </div>
  );
}

Home.getInitialProps = (ctx: any) => {
  if (ctx.isServer) {
    return {
      data: 1231,
    };
  }
  debugger;
  return {
    data: 121,
  };
};
