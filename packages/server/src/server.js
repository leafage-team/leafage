import path from 'node:path';
import serverRouter from 'router';
import serveStatic from 'serve-static';
import { imports, utils } from '@leafage/toolkit';
import { Renderer } from '@leafage/renderer';
import { Listener } from './listener';
import { baseMiddleware } from '@/middleware/base';
import { devMiddleware } from '@/middleware/dev';
import { staticMiddleware } from '@/middleware/static';
import { proxyMiddleware } from '@/middleware/proxy';
import { serverMiddleware } from '@/middleware/server';
import { routeMiddleware } from '@/middleware/route';
import { errorMiddleware } from '@/middleware/error';

class Server {
  constructor(leafage) {
    this.leafage = leafage;
    this.config = leafage.config;
    this.app = serverRouter();
    this.serverModuleRouter = serverRouter();
    this.server = {};
    this.devMiddleware = null;

    this.listener = new Listener({ app: this.app, host: this.config.host, port: this.config.port });

    // Close hook
    leafage.hook('close', () => this.close());

    if (this.config.dev) {
      this.leafage.hook('build:devMiddleware', (m) => {
        this.devMiddleware = m;
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
        router: this.serverModuleRouter,
        leafage: this.server.leafage,
        config: this.config,
        renderer: this.server.renderer,
        isDev: this.server.isDev,
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

    // Setup nuxt middleware
    await this.setupMiddleware();

    // Call done hook
    await this.leafage.callHook('server:done', this);

    return this;
  }

  async setupMiddleware() {
    await this.leafage.callHook('server:setupMiddleware', this.app);

    utils.applyPresets(this, [
      baseMiddleware,
      devMiddleware,
      staticMiddleware,
      proxyMiddleware,
      serverMiddleware,
      routeMiddleware,
      errorMiddleware,
    ]);
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

    // Ensure nuxt is ready
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
    if (this.serverModuleRouter.stack?.length) {
      this.serverModuleRouter.stack = [];
    }

    await this.listener.close();
  }
}

export { Server };
