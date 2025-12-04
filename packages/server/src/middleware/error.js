export const errorMiddleware = (server) => {
  server.useMiddleware(async (err, req, res, next) => {
    const { statusCode, message } = err;

    res.statusCode = statusCode;

    const html = await server.renderer.render('Error', { statusCode, message });
    if (html) {
      res.send(html);
    }

    next();
  });
};
