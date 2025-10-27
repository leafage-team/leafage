import createError from 'http-errors';

export const routePreset = (ctx) => {
  ctx.app.use(async (req, res, next) => {
    try {
      if (req.method.toLowerCase() !== 'get') {
        next(new createError.NotFound());
        return;
      }

      const result = await ctx.renderer.renderRoute(req, res);
      const { html, error, redirected } = result || {};

      if (redirected) {
        res.end();
        return;
      }
      if (error) {
        next(error);
        return;
      }
      if (!html) {
        next(new createError.NotFound());
        return;
      }

      res.set('Content-Type', 'text/html; charset=utf-8');
      res.send(html);
    } catch (err) {
      next(createError(err.status || 500, err));
    }
  });
};
