import bodyParser from 'body-parser';
import parseUrl from 'parseurl';

export const baseMiddleware = (server) => {
  // 解析json数据
  server.useMiddleware(bodyParser.json());
  // 解析 application/x-www-form-urlencoded
  server.useMiddleware(bodyParser.urlencoded({ extended: false }));
  server.useMiddleware((req, res, next) => {
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
