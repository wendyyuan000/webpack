const path = require('path')
// HMR在webpack中内置了,热模块更替第二步就要用到HMR构造函数
const webpack = require('webpack')
//在内存中创建 生成 html 下载并引入html-webpack-plugin插件
const HtmlWebpackPlugin = require('html-webpack-plugin')  
module.exports = {
    mode:"development",
    entry: path.join(__dirname, './src/main.js'),// 入口，表示，要使用 webpack 打包哪个文件
    output: { // 输出文件相关的配置  配置了js文件后就会自动在内存中生成一个main.js文件
      path: path.join(__dirname, './dist'), // 指定 打包好的文件，输出到哪个目录中去
      filename: 'bundle.js' // 这是指定 输出的文件的名称   
  },
  // --open --port 3000 --contentBase src --hot
  // 在配置文件中设置 参数  第一步
    devServer:{
      open:true,  /* 自动打开浏览器 */
      port:3000, /* 修改默认端口 */
      contentBase:'src', /* 托管的根目录 */
      hot:true /* 热更替-----第一步  开启或关闭HMR*/
    },
    plugins:[  //配置插件的节点
      /*热更替------第二步  */
      new webpack.HotModuleReplacementPlugin(),//有HMR插件才有资格开启HMR(热模块更替)
      new HtmlWebpackPlugin({  //创建一个 在内存中 生成 HTML 页面的插件
          template: path.join(__dirname,'./src/index.html'),  //指定模板页面,根据路径中的页面生成内存中的html页面
          filename:'index.html'  //指定在内存中生成页面的名称
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']  //如果不需要其他配置,只需用字符串,否则用{对象}
        },
        {
          test: /\.less$/,
          use: ['style-loader','css-loader','less-loader']
        },
        {
          test: /\.scss$/,
          use: ['style-loader','css-loader','sass-loader']
        },
        // 配置图片
        {
          test: /\.(png|jpg|gif|bmp|jepg)$/,
          use: [
            {loader:'url-loader',options:{limit:8192}}
          ]
        },
        // 配置字体图标
        {   
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: [
            {loader:'url-loader'}
          ]
        }
      ]
    }
    
}