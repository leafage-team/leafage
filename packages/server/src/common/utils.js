import path from 'node:path';
import serveStatic from 'serve-static';
import { imports } from '@leafage/toolkit';

export const useMiddleware = (ctx, middleware) => {
  if (!middleware) return ctx;

  if (typeof middleware === 'string') {
    const handle = imports.importServerModule(
      middleware,
      {
        url: [
          import.meta.url,
          ctx.context.config.input.src,
          ctx.context.config.root,
          path.join(ctx.context.config.root, 'node_modules'),
        ],
      },
    );

    return useMiddleware(ctx, handle);
  }

  if (typeof middleware === 'object') {
    const route = middleware.route || '/';

    if (typeof middleware.handle === 'string') {
      return ctx.app.use(route, serveStatic(middleware.handle));
    }
    return ctx.app.use(route, middleware.handle);
  }

  return ctx.app.use(middleware);
};
