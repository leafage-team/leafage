import { join } from 'path';
import { isDevelopment } from 'std-env';
import dotEnv from 'dotenv-defaults';
import { mergeProps } from '../utils';

const root = process.cwd();
const dev = Boolean(isDevelopment);
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = dev ? 'development' : 'production';
}
const env = mergeProps(
  process.env,
  dotEnv.config({
    path: join(root, `.env.${process.env.NODE_ENV}`),
    encoding: 'utf8',
    defaults: join(root, '.env'),
  }).parsed,
);

export default {
  // 是否是开发环境
  dev,
  // 环境
  env,
  // 导入外部文件
  external: [],
  // 目录
  dir: {
    // 根目录
    root,
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
