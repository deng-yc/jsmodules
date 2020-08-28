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
                    exclude: /node_modules/i,
                }),
                pxtorem({
                    rootValue: 37.5,
                    unitPrecision: 5,
                    propList: ["*"],
                    selectorBlackList: [],
                    replace: true,
                    mediaQuery: false,
                    minPixelValue: 0,
                    exclude: /^((?!antd).)*$/i,
                }),
            ],
        },
    },
    typescript: {
        enableTypeChecking: false /* (default value)  */,
    },
    babel: {
        presets: [],
        plugins: [
            "@babel/plugin-proposal-class-properties",
            "@babel/plugin-transform-react-jsx",
            "@babel/plugin-transform-flow-strip-types",
        ],
    },
    webpack: {
        alias: {
            "@": resolveApp("src"),
            react: resolveApp("../../node_modules/react"),
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
        {
            plugin: CracoLessPlugin,
            options: {
                modifyLessRule: function (lessRule, _context) {
                    lessRule.test = /\.(module)\.(less)$/;
                    lessRule.exclude = /node_modules/;
                    return lessRule;
                },
                cssLoaderOptions: {
                    modules: {
                        localIdentName: "[path][name]__[local]--[hash:base64:5]",
                        context: path.resolve(__dirname, "src"),
                        exportGlobals: true,
                    },
                },
            },
        },
    ],
};
