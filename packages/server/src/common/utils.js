import path from 'path';
import express from 'express';
import { imports } from '@leafage/toolkit';

export const useMiddleware = (ctx, middleware) => {
  if (!middleware) return ctx;

  if (typeof middleware === 'string') {
    const handle = imports.importModule(
      middleware,
      {
        isDev: ctx.context.options.dev,
        paths: [
          import.meta.url,
          path.join(ctx.context.options.dir.root, ctx.context.options.dir.src),
          ctx.context.options.dir.root,
          path.join(ctx.context.options.dir.root, 'node_modules'),
        ],
      },
    );

    return useMiddleware(handle);
  }

  if (typeof middleware === 'object') {
    const route = middleware.path || '/';

    if (typeof middleware.handle === 'string') {
      return ctx.app.use(route, express.static(middleware.handle));
    }
    return ctx.app.use(route, middleware.handle);
  }

  return ctx.app.use(middleware);
};
