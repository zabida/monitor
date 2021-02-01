module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.220.128:8080/',
        ws: true, // 代理的WebSockets
        changeOrigin: true, // 允许websockets跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
