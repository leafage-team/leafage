import express from 'express';
import { useContext, utils } from '@leafage/toolkit';

export const useMiddleware = (app, middleware) => {
  if (!middleware) return app;

  const context = useContext();

  if (typeof middleware === 'string') {
    return useMiddleware(context.importModule(middleware));
  }

  if (typeof middleware === 'object') {
    const route = middleware.path || '/';

    if (typeof middleware.handle === 'string') {
      return app.use(route, express.static(middleware.handle));
    }
    return app.use(route, middleware.handle);
  }

  return app.use(middleware);
};
export const applyPresets = (app, presets = []) => {
  const context = useContext();

  return utils.applyPresets(app, presets.map((preset) => () => preset(app, context)));
};
