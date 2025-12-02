import bodyParser from 'body-parser';
import parseUrl from 'parseurl';

export const basePreset = (ctx) => {
  // 解析json数据
  ctx.app.use(bodyParser.json());
  // 解析 application/x-www-form-urlencoded
  ctx.app.use(bodyParser.urlencoded({ extended: false }));
  ctx.app.use((req, res, next) => {
    // 设置pathname
    req.pathname = parseUrl(req)?.pathname || '/';
    // 设置默认params和query
    req.params = req.params || {};
    req.query = req.query || {};
    // 设置自定义版权
    res.set('x-powered-by', `${process.env.PACKAGE_NAME}/${process.env.PACKAGE_VERSION}`);

    next();
  });
};
