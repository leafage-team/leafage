// builder配置
export default {
  // 访问根路径
  publicPath: '/',
  // 文件名
  filenames: {
    // { isDev, isClient, isServer }
    app: ({ isDev }) => (isDev ? '[name].js' : 'static/js/[contenthash:10].js'),
    chunk: ({ isDev }) => (isDev ? '[name].js' : 'static/js/[contenthash:10].js'),
    css: ({ isDev }) => (isDev ? '[name].css' : 'static/css/[contenthash:10].css'),
    image: ({ isDev }) => (isDev ? '[path][name][ext]' : 'static/image/[contenthash:10][ext]'),
    font: ({ isDev }) => (isDev ? '[path][name][ext]' : 'static/font/[contenthash:10][ext]'),
    media: ({ isDev }) => (isDev ? '[path][name][ext]' : 'static/media/[contenthash:10][ext]'),
    cssModuleName: ({ isDev }) => (isDev ? '[name]__[local]--[hash:base64:8]' : '_[hash:base64:10]'),
  },
  // watch options
  watch: {},
};
