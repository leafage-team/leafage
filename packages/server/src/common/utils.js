import path from 'node:path';
import { imports } from '@leafage/toolkit';

export const useMiddleware = (ctx, middleware) => {
  if (!middleware) return ctx;

  if (typeof middleware === 'string') {
    const handle = imports.importModule(
      middleware,
      {
        paths: [
          import.meta.url,
          ctx.context.config.input.src,
          ctx.context.config.root,
          path.join(ctx.context.config.root, 'node_modules'),
        ],
      },
    );

    return useMiddleware(handle);
  }

  if (typeof middleware === 'object') {
    return ctx.server.use(middleware.route || '/', middleware.handle);
  }

  return ctx.server.use(middleware);
};
