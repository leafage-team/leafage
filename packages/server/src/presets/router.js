import { createRenderer } from '@leafage/renderer';

export const routerPreset = (app, context) => {
  const renderer = createRenderer(context);

  app.use(async (req, res, next) => {
    const html = await renderer.renderAndRouter(req, res);
    if (!html) {
      next();
    }

    res.send(html);
  });
};
