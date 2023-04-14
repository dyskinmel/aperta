const path = require('path');

module.exports = {
    entry: {
        webdesign: './views/webdesign.js', // エントリーポイント
        dashboard: './views/dashboard.js',
    },
    output: {
        filename: '[name]/bundle.js', // 出力ファイル名
        path: path.resolve(__dirname, 'public') // 出力ディレクトリ
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.svelte$/,
                use: 'svelte-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte'),
        },
        extensions: ['.mjs', '.js', '.svelte'],
        mainFields: ['svelte', 'browser', 'module', 'main'],
        conditionNames: ['svelte'],
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'public'),
        },
        compress: true,
        port: 9000,
    },
};