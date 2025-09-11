import { join } from 'path';
import isPlainObjectFn from 'lodash/isPlainObject';

export default {
  // host
  host: {
    $resolve: (val) => val || process.env.HOST || process.env.npm_config_host || 'localhost',
  },
  // 端口
  port: {
    $resolve: (val) => val || process.env.PORT || process.env.npm_config_port || 7749,
  },
  // 静态资源目录
  static: {
    $resolve: async (val, get) => {
      if (isPlainObjectFn(val) || Array.isArray(val)) return val;

      const root = await get('dir.root');

      return {
        path: '/public',
        handle: join(root, 'public'),
      };
    },
  },
  // 代理
  // proxy: {
  //   '/api': {
  //     target: 'https://xxx.com/api',
  //     changeOrigin: true,
  //   },
  // },
  proxy: {
    $resolve: (val) => {
      if (isPlainObjectFn(val)) return val;

      return {};
    },
  },
};
