import { ServerError } from '@leafage/toolkit';

export const routeMiddleware = (server) => {
  server.app.get(async (req, res, next) => {
    try {
      const result = await server.renderer.renderRoute(req, res);
      const {
        // `html` html字符串
        html,
        // `error` 不为空时，格式为：
        // new ServerError({ statusCode: 500, message: 'My error message', headers: {}, stack: [] })
        error,
        // `redirected` 不为 `false` 时，格式为：
        // { path: '/other-path', status: 302 }
        redirected,
      } = result || {};

      if (redirected) {
        res.setHeader('Location', redirected.path);
        res.statusCode = redirected.status || 302;

        res.end();
        return;
      }
      if (error) {
        Object.keys(error.headers).forEach((key) => {
          res.setHeader(key, error.headers[key]);
        });

        next(error);
        return;
      }
      if (!html) {
        next(new ServerError({ statusCode: 404, message: 'This page could not be found' }));
        return;
      }

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.end(html, 'utf8');
    } catch (err) {
      next(new ServerError({
        statusCode: err.status || err.statusCode || 500,
        message: err.message,
        stack: err.stack || [],
      }));
    }
  });
};
