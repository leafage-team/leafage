import bodyParser from 'body-parser';
import parseUrl from 'parseurl';

export const basePreset = (ctx) => {
  // 解析json数据
  ctx.server.use(bodyParser.json());
  // 解析 application/x-www-form-urlencoded
  ctx.server.use(bodyParser.urlencoded({ extended: false }));
  ctx.server.use((req, res, next) => {
    // 设置pathname
    req.pathname = parseUrl(req)?.pathname || '/';
    // 设置默认params和query
    req.params = req.params || {};
    req.query = req.query || {};
    // 设置版权
    res.setHeader('x-powered-by', `${process.env.PACKAGE_NAME}/${process.env.PACKAGE_VERSION}`);

    next();
  });
};
