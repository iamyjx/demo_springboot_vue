// vue.config.js
module.exports = {
    // https://cli.vuejs.org/zh/config/#devserver-proxy
  devServer: {
    port: 9090,
    proxy: {
      '/api': {
        target: 'http://localhost:8080', //请求本地
        ws: false,
        changeOrigin: true
      }
    }
  }
}