module.exports = {
  publicPath: '/mt/',
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
        // target: 'http://10.101.12.34:8990/', // 目标主机
        target: 'http://127.0.0.1:8990/', // 目标主机
        ws: true, // 代理的WebSockets
        changeOrigin: true, // 允许websockets跨域
        pathRewrite: {
          '^/m_api': ''
        }
      }
    }
  }
}
