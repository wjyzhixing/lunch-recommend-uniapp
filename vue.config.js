module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
		'/api': {
		  // target: 'http://localhost:7001',
		  target: 'http://43.143.38.230:7001', // 服务器地址
		  // ws: true,
		  pathRewrite: { '^/api': '' },
		  changeOrigin: true,
		},
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  }
}