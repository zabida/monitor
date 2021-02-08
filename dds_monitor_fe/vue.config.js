module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.220.128:8990/',
        // target: 'http://10.101.12.34:8990/', // 目标主机
        ws: true, // 代理的WebSockets
        changeOrigin: true, // 允许websockets跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
