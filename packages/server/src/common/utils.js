import path from 'node:path';
import serveStatic from 'serve-static';
import { imports } from '@leafage/toolkit';

export const useMiddleware = (ctx, middleware) => {
  if (!middleware) return ctx;

  if (typeof middleware === 'string') {
    const handle = imports.importModule(
      middleware,
      {
        url: [
          import.meta.url,
          ctx.config.input.src,
          ctx.config.root,
          path.join(ctx.config.root, 'node_modules'),
        ],
      },
    );

    return useMiddleware(ctx, handle);
  }

  if (typeof middleware === 'object') {
    const route = middleware.route || '/';

    if (typeof middleware.handle === 'string') {
      ctx.server.use(route, serveStatic(middleware.handle));
      return;
    }

    return ctx.server.use(middleware.route || '/', middleware.handle);
  }

  return ctx.server.use(middleware);
};
