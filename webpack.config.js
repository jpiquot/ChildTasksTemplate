const path = require("path")
var HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    target: "web",
    devtool: "inline-source-map",
    devServer: {
        https: true,
        port: 3000
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks:["extension"],
            filename:"extension.html",
            template: 'src/extension/extension.html'
        }),
        new HtmlWebpackPlugin({
            chunks:["settings"],
            filename:"settings.html",
            template: 'src/settings/settings.html'
        })
    ],
    entry: {
        extension: './src/extension/extension.ts',
        settings: './src/settings/settings.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        devtoolModuleFilenameTemplate: "[resource-path]",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: [path.resolve("./src"), path.resolve("./node_modules")],
        alias: {
            "azure-devops-ui": path.resolve("./node_modules/azure-devops-ui"),
            "azure-devops-extension-sdk": path.resolve("./node_modules/azure-devops-extension-sdk"),
            "azure-devops-extension-api": path.resolve("./node_modules/azure-devops-extension-api")
        },
    },
    stats: {
        warnings: false
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "azure-devops-ui/buildScripts/css-variables-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(woff|png|jpg|gif|svg)$/,
                use: ['url-loader']
            }
        ]
    }
}