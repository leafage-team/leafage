import path from 'path';
import { isDevelopment } from 'std-env';
import browserslist from 'browserslist';
import isPlainObjectFn from 'lodash/isPlainObject';
import isFunctionFn from 'lodash/isFunction';
import { mergeProps } from '../utils';

const genStrValResolve = (parentStr, defaultStr) => async (val, get) => {
  const parent = await get(parentStr);

  if (typeof val === 'string') path.join(parent, val);
  return path.join(parent, defaultStr);
};
export default {
  // 根目录
  root: {
    $resolve: (val) => val || process.cwd(),
  },
  envName: {
    $resolve: async (val, get) => {
      if (typeof val === 'string') return val;

      const dev = await get('dev');

      return dev ? 'development' : 'production';
    },
  },
  // 是否是开发环境
  dev: {
    $resolve: (val) => (typeof val === 'boolean' ? val : Boolean(isDevelopment)),
  },
  // 环境
  env: {
    $resolve: (val) => {
      if (isPlainObjectFn(val) && Object.keys(val).length) return val;

      return {};
    },
  },
  // 输入
  input: {
    // 源码目录
    src: {
      $resolve: genStrValResolve('root', 'src'),
    },
    // 页面目录
    page: {
      $resolve: genStrValResolve('input.src', 'pages'),
    },
    // 获取页面文件的glob正则
    pattern: {
      $resolve: genStrValResolve('input.page', '**/index.{js,jsx}'),
    },
    // 导入外部文件
    externals: [],
  },
  // 输出
  output: {
    // 构建目录
    dist: {
      $resolve: genStrValResolve('root', 'dist'),
    },
    // 客户端打包后的代码存放位置
    client: {
      $resolve: genStrValResolve('output.dist', 'client'),
    },
    // 服务端打包后的代码存放位置
    server: {
      $resolve: genStrValResolve('output.dist', 'server'),
    },
    // manifest存放位置
    manifest: {
      $resolve: genStrValResolve('output.dist', 'manifest.json'),
    },
    // 静态资源的 URL 前缀
    assetPrefix: '/',
    // 设置静态资源被自动内联为 base64 的体积阈值。
    dataUriLimit: {
      $resolve: (val) => {
        const genRes = (maxSize) => ({
          font: maxSize,
          image: maxSize,
          media: maxSize,
        });

        if (typeof val === 'number') return genRes(val);

        const defaultVal = genRes(1000);
        if (isPlainObjectFn(val) && Object.keys(val).length) return mergeProps(defaultVal, val);

        return defaultVal;
      },
    },
    // CSS Modules 配置
    cssModules: {
      $resolve: async (val, get) => {
        const isDev = await get('dev');

        const defaultVal = {
          auto: true,
          namedExport: false,
          exportGlobals: false,
          exportLocalsConvention: 'camelCase',
          cssModuleName: (isDev ? '[path][name]__[local]_[hash:base64:10]' : '_[hash:base64:10]'),
        };

        if (isPlainObjectFn(val) && Object.keys(val).length) return mergeProps(defaultVal, val);

        return defaultVal;
      },
    },
    // 外部依赖
    // @doc https://rspack.rs/zh/config/externals
    externals: [],
    // 文件名
    filename: {
      // { name, context, config, isDev, isClient, isServer }
      app: ({ isDev }) => (isDev ? '[name].js' : 'static/js/[contenthash:10].js'),
      chunk: ({ isDev }) => (isDev ? '[name].js' : 'static/js/[contenthash:10].js'),
      css: ({ isDev }) => (isDev ? '[name].css' : 'static/css/[contenthash:10].css'),
      image: ({ isDev }) => (isDev ? '[path][name][ext]' : 'static/image/[contenthash:10][ext]'),
      font: ({ isDev }) => (isDev ? '[path][name][ext]' : 'static/font/[contenthash:10][ext]'),
      media: ({ isDev }) => (isDev ? '[path][name][ext]' : 'static/media/[contenthash:10][ext]'),
    },
    // browserslist
    browserslist: {
      $resolve: async (val, get) => {
        if (typeof val === 'string' || Array.isArray(val)) return val;

        const root = await get('root');
        const envName = await get('envName');

        const targets = browserslist.loadConfig({
          path: root,
          env: envName,
        });

        return targets || [];
      },
    },
  },
  // 页面头部配置
  head: {
    $resolve: (val) => {
      if ((isPlainObjectFn(val) && Object.keys(val).length)) return val;
      // { name, context, config, isDev, isClient, isServer }
      if (isFunctionFn(val)) return val;

      return {
        title: 'Leafage',
        meta: [
          {
            // 设置字符集格式
            name: 'Content-Type',
            'http-equiv': 'Content-Type',
            content: 'text/html; charset=UTF-8',
          },
        ],
      };
    },
  },
  // 构建器配置
  builder: {
    // 构建器 watch 配置
    watch: {
      $resolve: (val) => {
        if (isPlainObjectFn(val)) return val;

        return {};
      },
    },
    // 别名
    alias: {
      $resolve: async (val, get) => {
        if (isPlainObjectFn(val)) return val;

        const src = await get('input.src');
        return {
          '@': src,
        };
      },
    },
  },
  // 全局设置
  globals: {
    // 全局id设置
    id: 'app-main',
    // 上下文
    context: 'window.__INITIAL_STATE__',
  },
};
