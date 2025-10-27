import { handleErrorResponse } from '../common/handleErrorResponse';

export const errorPreset = (ctx) => {
  ctx.app.use(async (err, req, res, next) => {
    const { statusCode, message } = handleErrorResponse(err, req, res);
    err.statusCode = statusCode;
    err.message = message;

    res.status(statusCode);

    const { html } = await ctx.renderer.renderError(err) || {};
    if (html) {
      res.send(html);
    }

    next();
  });
};
