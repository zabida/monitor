module.exports = {
  publicPath: './',
  // 输出文件目录
  outputDir: 'monitor-fe',
  // 静态资源存放的文件夹(相对于ouputDir)
  // assetsDir: 'assets',
  // eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)
  lintOnSave: false,
  productionSourceMap: true,
  devServer: {
    proxy: {
      '/m_api': {
        // target: 'http://192.168.220.128:8990/',
        target: 'http://localhost:8000/', // 目标主机
        ws: true, // 代理的WebSockets
        changeOrigin: true, // 允许websockets跨域
        pathRewrite: {
          '^/m_api': ''
        }
      }
    }
  }
}
