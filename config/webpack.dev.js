const { merge } = require("webpack-merge");
const webpack = require("webpack");
const config = require("./webpack.config.js");

const path = require("path");
const paths = require("./paths");

module.exports = merge(config, {
    target: "web",
    context: path.resolve(paths.appSrc),
    mode: "development",
    devtool: "inline-source-map",
    plugins: [new webpack.HotModuleReplacementPlugin()],
    devServer: {
        publicPath: "/",
        contentBase: path.resolve(paths.appDist),
        open: true,
        clientLogLevel: "silent",
        port: 8080,
        liveReload: false,
        watchContentBase: true,
        hot: true,
        compress: true,
    },
    module: {
        rules: [
            {
                test: /\.module\.s(a|c)ss$/,
                exclude: /node_modules/,
                include: path.resolve(paths.appSrc),
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                            sourceMap: true,
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: [/\.module.(s(a|c)ss)$/, /node_modules/],
                include: path.resolve(paths.appSrc),
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
});
