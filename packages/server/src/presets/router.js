import createError from 'http-errors';

export const routerPreset = (ctx) => {
  ctx.app.use(async (req, res, next) => {
    try {
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

      res.send(html);
    } catch (err) {
      next(createError(err.status || 500, err));
    }
  });
};
