export const devPreset = (app, context) => {
  let devMiddleware = null;

  if (context.options.dev) {
    context.hook('bundle:devMiddleware', (middleware) => {
      devMiddleware = middleware;
    });
  }

  app.use((req, res, next) => {
    if (devMiddleware) {
      devMiddleware(req, res, next);
      return;
    }

    next();
  });
};
