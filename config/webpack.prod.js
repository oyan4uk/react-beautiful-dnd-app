const { merge } = require("webpack-merge");
const config = require("./webpack.config.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");
const paths = require("./paths");

module.exports = merge(config, {
    mode: "production",
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name].[hash].css",
            chunkFilename: "css/[id].[hash].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.module\.s(a|c)ss$/,
                exclude: /node_modules/,
                include: path.resolve(paths.appSrc),
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: true,
                        },
                    },
                    "sass-loader",
                ],
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: [/\.module.(s(a|c)ss)$/, /node_modules/],
                include: path.resolve(paths.appSrc),
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                    },
                    "sass-loader",
                ],
            },
        ],
    },
});
