// builder配置
export default {
  // 访问根路径
  publicPath: '/',
  // webpack扩展配置
  // config, {isDev, isClient, isServer}
  extend: (config) => config,
  // 文件名
  filenames: {
    // { isDev, isClient, isServer }
    app: ({ isDev }) => (isDev ? '[name].js' : 'js/js/[contenthash:10].js'),
    chunk: ({ isDev }) => (isDev ? '[name].js' : 'js/js/[contenthash:10].js'),
    css: ({ isDev }) => (isDev ? '[name].css' : 'css/[contenthash:10].css'),
    image: ({ isDev }) => (isDev ? '[path][name][ext]' : 'image/[contenthash:10][ext]'),
    font: ({ isDev }) => (isDev ? '[path][name][ext]' : 'font/[contenthash:10][ext]'),
    media: ({ isDev }) => (isDev ? '[path][name][ext]' : 'media/[contenthash:10][ext]'),
    cssModuleName: ({ isDev }) => (isDev ? '[name]__[local]--[hash:base64:8]' : '_[hash:base64:10]'),
  },
  // webpack watch配置
  watch: {},
  // babel配置,和babel.config.js配置一致
  babel: {},
};
