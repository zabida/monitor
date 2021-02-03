module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://192.168.220.128:8080/',
        target: 'http://10.101.0.73:8888/', // 目标主机
        ws: true, // 代理的WebSockets
        changeOrigin: true, // 允许websockets跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
