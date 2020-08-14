import { defineConfig } from 'umi';

export default defineConfig({
    title: 'Sounmate',
    // dynamicImport: {
    //     // loading: 'ssss',
    // },
    nodeModulesTransform: {
        type: 'none',
    },
    qiankun: {
        master: {
            // 注册子应用信息
            apps: [
                {
                    name: 'reactapp1', // 唯一 id
                    entry: '//localhost:7100', // html entry
                },
            ],
        },
    },
    routes: [
        { path: '/login', component: '@/pages/login' },
        {
            path: '/',
            component: '@/layouts/index',
            wrappers: ['@/wrappers/auth'],
            routes: [
                { path: '/', component: '@/pages/index' },
                {
                    path: '/users',
                    component: '@/pages/users',
                },
            ],
        },
    ],
    proxy: {
        '/identity-api': {
            target: 'https://identity-api.sounmate.com/',
            changeOrigin: true,
            pathRewrite: { '^/identity-api': '' },
        },
    },
});
