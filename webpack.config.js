const path = require('path');

module.exports = {
    entry: './src/client/index.js', // エントリーポイント
    output: {
        filename: 'bundle.js', // 出力ファイル名
        path: path.resolve(__dirname, 'public') // 出力ディレクトリ
    },
    module: {
        rules: [
            {
                test: /\.js$/, // .jsファイルを対象にする
                exclude: /node_modules/, // node_modulesディレクトリは除外する
                use: {
                    loader: 'babel-loader' // Babelを使用する
                }
            }
        ]
    }
};