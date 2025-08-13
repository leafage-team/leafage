import createError from 'http-errors';

export const routerPreset = (ctx) => {
  ctx.app.use(async (req, res, next) => {
    try {
      const html = await ctx.renderer.renderAndRouter(req, res);
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
