import { join } from 'path';

export default {
  // host
  host: process.env.HOST || process.env.npm_config_host || 'localhost',
  // 端口
  port: process.env.PORT || process.env.npm_config_port || 7749,
  // 静态资源目录
  static: {
    directory: join(process.cwd(), 'public'),
    publicPath: '/public',
  },
};
