const path = require('path')

module.exports = {
    mode: 'development', // 开发模式
    entry: './src/index.js', // 入口
    output: { // 出口
        filename: 'bundle.js'
    },
    devServer: { // 开发服务器设置
        port: 8080,
        static: 'www'
    },
    module: { // 模块
        rules: [ // 规则
            {
                test: /\.js$/,
                exclude: /node_modules/, // 排除node_modules 文件夹[下的所有js文件]
                use: {loader: "babel-loader"} // babel来解析flow
            }
        ]
    }
}