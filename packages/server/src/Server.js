import path from 'path';
import express from 'express';
import { handleErrorResponse } from '@/common/error';

class Server {
  constructor(leafage) {
    this.leafage = leafage;
    this.options = leafage.options;

    this.app = express()
      // 关闭版权
      .disable('x-powered-by')
      // 解决代理时取不到ip地址
      .set('trust proxy', 'loopback');
    this.devMiddleware = null;

    if (leafage.options.dev) {
      // devMiddleware placeholder
      leafage.hook('builder:devMiddleware', (devMiddleware) => {
        this.devMiddleware = devMiddleware;
      });
      // disable etag
      this.app.set('etag', false);
    }
  }

  setupMiddleware() {
    // add Powered-By
    this.useMiddleware((req, res, next) => {
      res.set('X-Powered-By', `${process.env.PACKAGE_NAME}/${process.env.PACKAGE_VERSION}`);

      next();
    });
    // 解析json数据
    this.useMiddleware(express.json());
    // 解析 application/x-www-form-urlencoded
    this.useMiddleware(express.urlencoded({ extended: false }));
    // static assets
    const staticConfig = this.options.server.static;
    if (staticConfig) {
      const staticCfg = Array.isArray(staticConfig) ? staticConfig : [staticConfig];
      staticCfg.forEach((row) => {
        if (typeof row === 'string') {
          this.useMiddleware({
            route: `${row}`,
            handle: express.static(this.leafage.resolve(row)),
          });
        } else if (typeof row === 'object') {
          const { publicPath, directory, ...staticArgs } = row;
          this.useMiddleware({
            route: publicPath,
            handle: express.static(directory, staticArgs),
          });
        }
      });
    }
    if (this.options.dev) {
      // devMiddleware
      this.useMiddleware((req, res, next) => {
        if (this.devMiddleware) {
          return this.devMiddleware(req, res, next);
        }

        return next();
      });
    } else if (!this.options.builder.publicPath?.startsWith?.('http')) {
      // client static
      this.useMiddleware({
        route: `${this.options.builder.publicPath}${this.options.dir.static}`,
        handle: express.static(path.join(this.options.dir.root, this.options.dir.dist, this.options.dir.static)),
      });
    }

    // error handler
    this.useMiddleware(this.renderError);
  }

  renderError(err, req, res) {
    const { statusCode, message } = handleErrorResponse(err, req, res);

    res.status(statusCode).send(message);
  }

  requireMiddleware(entry) {
    const entryPath = this.leafage.resolve(entry);
    const middlewareFn = this.leafage.require(entryPath);

    return middlewareFn.default ?? middlewareFn;
  }

  useMiddleware(middleware) {
    // middleware path
    if (typeof middleware === 'string') {
      return this.useMiddleware(this.requireMiddleware(middleware));
    }

    if (typeof middleware === 'object') {
      return this.app.use(middleware.route || '/', middleware.handle);
    }

    return this.app.use(middleware);
  }

  start() {
    this.setupMiddleware();

    this.app.listen(this.options.server.port, this.options.server.host, () => {
      this.leafage.callHook('server:start');
    });
  }
}

export { Server };
