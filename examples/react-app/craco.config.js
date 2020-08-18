const CracoLessPlugin = require("craco-less");
const path = require("path");
const webpack = require("webpack");

const appDirectory = __dirname;
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

module.exports = {
    typescript: {
        enableTypeChecking: false /* (default value)  */,
    },
    webpack: {
        alias: {
            "@": resolveApp("src"),
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env.API_ENV": JSON.stringify("dev"),
                __DEV__: process.env.NODE_ENV === "development",
            }),
        ],
        // configure: (webpackConfig, { env, paths }) => {
        //     return webpackConfig;
        // },
    },
    devServer: {
        port: 30000,
    },
    plugins: [
        {
            plugin: CracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        javascriptEnabled: true,
                    },
                },
            },
        },
    ],
};
