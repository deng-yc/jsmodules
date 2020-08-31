import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  ssr: {},
  routes: [{ path: '/', component: '@/pages/index' }],
});
