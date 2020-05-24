const path = require('path');
const publicPath = ''
module.exports = {
    publicPath: './', // 公共路径
    productionSourceMap: false,
    runtimeCompiler: true,
    filenameHashing: false,
    devServer: {
        host: '0.0.0.0',
        open: true,
        port: 8020,
        noInfo: true,
        proxy: {
            '/hola': {
                target: 'http://admin.luoke101.com',
                changeOrigin: true,
                secure: false
            }
        }
    }
}
