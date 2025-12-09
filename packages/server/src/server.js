import path from 'node:path';
import serverRouter from 'router';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import parseUrl from 'parseurl';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { imports, utils } from '@leafage/toolkit';
import { Renderer } from '@leafage/renderer';
import { Listener } from './listener';
import { routeMiddleware } from '@/middleware/route';
import { errorMiddleware } from '@/middleware/error';

class Server {
  #devMiddleware = null;

  #router = serverRouter();

  constructor(leafage) {
    this.leafage = leafage;
    this.config = leafage.config;
    this.app = serverRouter();
    this.server = {};

    this.listener = new Listener(this);

    // Close hook
    leafage.hook('close', () => this.close());

    if (this.config.dev) {
      this.leafage.hook('build:devMiddleware', (m) => {
        this.#devMiddleware = m;
      });
      this.leafage.hook('bundle:compiled', ({ name }) => {
        if (name === 'server') {
          this.importServerEntry().then(utils.emptyFn);
        }
      });
    } else {
      this.importServerEntry().then(utils.emptyFn);
    }
  }

  get isDev() {
    return this.leafage.isDev;
  }

  async importServerEntry() {
    try {
      const serverModule = await imports.importServerModule(
        'server',
        {
          url: this.config.output.server,
          try: true,
        },
      );

      this.server = await serverModule?.({
        router: this.#router,
        leafage: this.leafage,
        config: this.config,
        renderer: this.renderer,
        isDev: this.isDev,
      }) || {};
    } catch (e) {
      /* empty */
    }
  }

  async ready() {
    if (this._readyCalled) return this;
    this._readyCalled = true;

    await this.leafage.callHook('server:before', this);

    this.renderer = new Renderer(this.leafage);
    await this.renderer.ready();

    // Setup middleware
    await this.setupMiddleware();

    // Call done hook
    await this.leafage.callHook('server:done', this);

    return this;
  }

  async setupMiddleware() {
    await this.leafage.callHook('server:setupMiddleware', this.app);

    // 解析json数据
    this.useMiddleware(bodyParser.json());
    // 解析 application/x-www-form-urlencoded
    this.useMiddleware(bodyParser.urlencoded({ extended: false }));
    this.useMiddleware((req, res, next) => {
      // 设置pathname
      req.pathname = parseUrl(req)?.pathname || '/';
      // 设置默认params和query
      req.params = req.params || {};
      req.query = req.query || {};
      // 设置自定义版权
      res.set('x-powered-by', `${process.env.PACKAGE_NAME}/${process.env.PACKAGE_VERSION}`);

      next();
    });
    // dev middleware
    this.useMiddleware((req, res, next) => {
      if (this.#devMiddleware) {
        // Safari over-caches JS (breaking HMR) and the seemingly only way to turn
        // this off in dev mode is to set Vary: * header
        if (req.url.startsWith(this.config.output.assetPrefix) && req.url.endsWith('.js')) {
          res.setHeader('Vary', '*');
        }
        this.#devMiddleware?.(req, res, next);
        return;
      }

      next();
    });
    // static middleware
    const staticList = utils.toArray(this.config.server.static).filter(Boolean);
    if (!this.isDev && !/^https?:\/\//.test(this.config.output.assetPrefix)) {
      staticList.push({
        route: this.config.output.assetPrefix,
        handle: this.config.output.client,
      });
    }
    staticList.forEach((row) => this.useMiddleware(row));
    // proxy middleware
    Object.keys(this.config.server.proxy || {}).forEach((key) => {
      this.useMiddleware(key, createProxyMiddleware(this.config.server.proxy[key]));
    });
    // router middleware
    this.useMiddleware(this.#router);
    // path middleware
    this.app.get(routeMiddleware({
      renderRoute: this.renderer.renderRoute,
    }));
    // error middleware
    this.useMiddleware(errorMiddleware({
      render: this.renderer.render,
    }));
  }

  useMiddleware(middleware) {
    if (!middleware) return;

    if (typeof middleware === 'string') {
      const handle = imports.importServerModule(
        middleware,
        {
          url: [
            import.meta.url,
            this.config.input.src,
            this.config.root,
            path.join(this.config.root, 'node_modules'),
          ],
          try: true,
        },
      );

      this.useMiddleware(handle);
      return;
    }

    if (typeof middleware === 'object') {
      const route = middleware.route || '/';

      if (typeof middleware.handle === 'string') {
        this.app.use(route, serveStatic(middleware.handle));
        return;
      }
      this.app.use(route, middleware.handle);
      return;
    }

    this.app.use(middleware);
  }

  async listen() {
    if (this.listener.listening) return;

    // ready
    await this.leafage.ready();
    // Listen
    await this.listener.listen();

    await this.leafage.callHook('listen', this.listener, this);

    return this.listener;
  }

  async close() {
    if (!this.listener.listening) return;

    await this.renderer?.close();

    if (this.app.stack?.length) {
      this.app.stack = [];
    }
    if (this.#router.stack?.length) {
      this.#router.stack = [];
    }

    await this.listener.close();
  }
}

export { Server };
