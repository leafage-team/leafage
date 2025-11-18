export const devPreset = (ctx) => {
  let devMiddleware = null;

  if (ctx.context.config.dev) {
    ctx.context.hook('bundle:devMiddleware', (middleware) => {
      devMiddleware = middleware;
    });
  }

  ctx.server.use((req, res, next) => {
    if (devMiddleware) {
      devMiddleware(req, res, next);
      return;
    }

    next();
  });
};
