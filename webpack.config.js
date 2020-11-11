const path = require("path")
const CopyWebpackPlugin = require("copy-webpack-plugin")
module.exports = {
    target: "web",
    devtool: "inline-source-map",
    devServer: {
        https: true,
        port: 3000
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "**", context: "static" },
                { from: "**", context: "node_modules/azure-devops-extension-sdk/" }
            ]
        })],
    entry: {
        app: './src/app.ts',
        settings: './src/Settings/settings.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        devtoolModuleFilenameTemplate: "[resource-path]",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        modules: [path.resolve("./src"), path.resolve("./src/settings"), path.resolve("./node_modules")],
        alias: {
            "azure-devops-ui": path.resolve("./node_modules/azure-devops-ui"),
            "azure-devops-extension-sdk": path.resolve("./node_modules/azure-devops-extension-sdk"),
            "azure-devops-extension-api": path.resolve("./node_modules/azure-devops-extension-api")
        },
    },
    stats: {
        warnings: false
    },
    externals: [
        /^SDK\/.*/, /^VSS\/.*/, /^TFS\/.*/, /^q$/, /^ReleaseManagement\/.*/,
    ],
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
                test: /\.woff$/,
                use: [{
                    loader: 'base64-inline-loader'
                }]
            },
            {
                test: /\.html$/,
                loader: "file-loader"
            }
        ]
    }
}