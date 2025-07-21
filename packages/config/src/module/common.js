import { isDevelopment } from 'std-env';

export default {
  // 是否是开发环境
  dev: Boolean(isDevelopment),
  // 导入外部文件
  external: [],
  // 目录
  dir: {
    // 根目录
    root: process.cwd(),
    // 构建目录
    dist: 'dist',
    // 源码目录
    src: 'src',
    // 页面目录
    page: 'pages',
    // 构建的静态资源目录
    static: 'static',
    // manifest存放位置
    manifest: 'manifest.json',
    // 服务端代码存放位置
    server: 'server/views',
  },
  // 全局设置
  globals: {
    // 全局id设置
    id: 'app-main',
    // 上下文
    context: 'window.__INITIAL_STATE__',
  },
};
