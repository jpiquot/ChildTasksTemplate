var path = require("path");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var distPath = path.resolve(__dirname, "dist");
var rootPath = path.resolve(__dirname, ".");
var CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    target: "web",
    devtool: "inline-source-map",
    devServer: {
        contentBase: rootPath,
        https: true,
        port: 6221
    },
    plugins: [
        new CleanWebpackPlugin.CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            chunks: ["extension"],
            filename: "extension.html",
            template: 'src/extension/extension.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ["chooseTemplatePanel"],
            filename: "chooseTemplatePanel.html",
            template: 'src/chooseTemplatePanel/chooseTemplatePanel.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ["settings"],
            filename: "settings.html",
            template: 'src/settings/settings.html'
        }),
        new CopyPlugin({
            patterns: [
                { from: "doc", to: "doc" },
                { from: "src/settings/templateSetupSample.json", to: "doc" },
            ],
        }),
    ],
    entry: {
        chooseTemplatePanel: './src/chooseTemplatePanel/ChooseTemplatePanel.tsx',
        extension: './src/extension/extension.ts',
        settings: './src/settings/settings.ts'
    },
    output: {
        path: distPath,
        filename: '[name].js',
        devtoolModuleFilenameTemplate: "../src/[resource-path]",
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
};