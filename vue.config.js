module.exports = {
  publicPath: process.env.PUBLIC_PATH || '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/global.scss";',
      },
    },
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.(doc|pdf|docx)(\?.*)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'assets/files/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
  },
}
