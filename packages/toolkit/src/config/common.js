import { isDevelopment } from 'std-env';
import isPlainObjectFn from 'lodash/isPlainObject';
import { loadEnv } from '../loadEnv';

export default {
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
    $resolve: async (val, get) => {
      if (isPlainObjectFn(val) && Object.keys(val).length) return val;

      const root = await get('dir.root');
      const envName = await get('envName');
      const { parsed } = loadEnv({
        cwd: root,
        mode: envName,
        systemVars: true,
        processEnv: process.env,
      });

      return parsed;
    },
  },
  // 导入外部文件
  external: [],
  // 目录
  dir: {
    // 根目录
    root: {
      $resolve: (val) => val || process.cwd(),
    },
    // 构建目录
    dist: 'dist',
    // 源码目录
    src: 'src',
    // 页面目录
    page: 'pages',
    // 获取页面文件的glob正则
    pattern: '**/index.{js,jsx}',
    // 客户端打包后的代码存放位置
    client: 'client',
    // 服务端打包后的代码存放位置
    server: 'server',
    // manifest存放位置
    manifest: 'manifest.json',
  },
  // 全局设置
  globals: {
    // 全局id设置
    id: 'app-main',
    // 上下文
    context: 'window.__INITIAL_STATE__',
  },
};
