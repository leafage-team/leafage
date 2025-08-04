import { join } from 'path';
import { isDevelopment } from 'std-env';
import dotEnv from 'dotenv-defaults';
import { mergeProps } from '../utils';

const root = process.cwd();
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
  dev: Boolean(isDevelopment),
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
    // 构建的静态资源目录
    static: 'static',
    // 服务端代码存放位置
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
