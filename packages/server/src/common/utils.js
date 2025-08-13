import express from 'express';
import { useContext } from '@leafage/toolkit';

export const useMiddleware = (ctx, middleware) => {
  if (!middleware) return ctx;

  const context = useContext();

  if (typeof middleware === 'string') {
    return useMiddleware(context.importModule(middleware));
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
