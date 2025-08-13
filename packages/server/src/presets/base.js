import express from 'express';
import parseUrl from 'parseurl';

export const basePreset = (ctx) => {
  // 关闭版权
  ctx.app.disable('x-powered-by');
  // 解决代理时取不到ip地址
  ctx.app.set('trust proxy', 'loopback');
  if (ctx.context.options.dev) {
    ctx.app.set('etag', false);
  }
  // 解析json数据
  ctx.app.use(express.json());
  // 解析 application/x-www-form-urlencoded
  ctx.app.use(express.urlencoded({ extended: false }));
  ctx.app.use((req, res, next) => {
    // 设置pathname
    req.pathname = parseUrl(req)?.pathname || '/';
    // 设置自定义版权
    res.set('x-powered-by', `${process.env.PACKAGE_NAME}/${process.env.PACKAGE_VERSION}`);

    next();
  });
};
