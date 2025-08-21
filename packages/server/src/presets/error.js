import { handleErrorResponse } from '../common/handleErrorResponse';

export const errorPreset = (ctx) => {
  ctx.app.use(async (err, req, res, next) => {
    const { statusCode, message } = handleErrorResponse(err, req, res);
    const html = await ctx.renderer.render('Error', { statusCode, message });

    res.status(statusCode);

    if (html) {
      res.send(html);
    }

    next();
  });
};
