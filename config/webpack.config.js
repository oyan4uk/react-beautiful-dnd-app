const path = require("path");
const paths = require("./paths");

module.exports = {
    context: path.resolve(paths.appSrc),
    entry: [paths.appIndexJs],
    output: {
        path: path.resolve(paths.appDist),
        publicPath: "/",
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                include: path.resolve(paths.appSrc),
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        targets: "defaults",
                                    },
                                ],
                                "@babel/preset-react",
                            ],
                            plugins: ['@babel/plugin-transform-runtime'],
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                include: path.resolve(paths.appSrc),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                        }
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".scss"],
    },
};
