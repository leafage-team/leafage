export const devMiddleware = (server) => {
  server.useMiddleware((req, res, next) => {
    if (server.devMiddleware) {
      // Safari over-caches JS (breaking HMR) and the seemingly only way to turn
      // this off in dev mode is to set Vary: * header
      if (req.url.startsWith(server.config.output.assetPrefix) && req.url.endsWith('.js')) {
        res.setHeader('Vary', '*');
      }
      server.devMiddleware(req, res, next);
      return;
    }

    next();
  });
};
