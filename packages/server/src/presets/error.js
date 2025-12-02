export const errorPreset = (ctx) => {
  ctx.app.use(async (err, req, res, next) => {
    const { statusCode, message } = err;

    res.statusCode = statusCode;

    const html = await ctx.renderer.render('Error', { statusCode, message });
    if (html) {
      res.send(html);
    }

    next();
  });
};
