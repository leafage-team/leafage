import express from 'express';
import parseUrl from 'parseurl';

export const basePreset = (app, context) => {
  // 关闭版权
  app.disable('x-powered-by');
  // 解决代理时取不到ip地址
  app.set('trust proxy', 'loopback');
  if (context.options.dev) {
    app.set('etag', false);
  }
  // 解析json数据
  app.use(express.json());
  // 解析 application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: false }));
  app.use((req, res, next) => {
    // 设置pathname
    req.pathname = parseUrl(req)?.pathname || '/';
    // 设置自定义版权
    res.set('x-powered-by', `${process.env.PACKAGE_NAME}/${process.env.PACKAGE_VERSION}`);

    next();
  });
};
