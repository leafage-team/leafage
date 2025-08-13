export const devPreset = (ctx) => {
  let devMiddleware = null;

  if (ctx.context.options.dev) {
    ctx.context.hook('bundle:devMiddleware', (middleware) => {
      devMiddleware = middleware;
    });
  }

  ctx.app.use((req, res, next) => {
    if (devMiddleware) {
      devMiddleware(req, res, next);
      return;
    }

    next();
  });
};
