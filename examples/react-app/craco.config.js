const CracoLessPlugin = require("craco-less");
const path = require("path");
const webpack = require("webpack");
const pxtorem = require("postcss-pxtorem");

const appDirectory = __dirname;
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);

const isDev = process.env.NODE_ENV === "development";

module.exports = {
    style: {
        postcss: {
            // mode: "extends" /* (default value) */ || "file",
            plugins: [
                pxtorem({
                    rootValue: 75,
                    unitPrecision: 5,
                    propList: ["*"],
                    selectorBlackList: [],
                    replace: true,
                    mediaQuery: false,
                    minPixelValue: 0,
                    // exclude: /node_modules/i,
                }),
            ],
        },
    },
    typescript: {
        enableTypeChecking: false /* (default value)  */,
    },
    babel: {
        presets: [],
    },
    webpack: {
        alias: {
            "@": resolveApp("src"),
        },
        plugins: [
            new webpack.DefinePlugin({
                "process.env.API_ENV": JSON.stringify("dev"),
                __DEV__: isDev,
            }),
        ],
        configure: {},
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
