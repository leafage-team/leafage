export const errorMiddleware = ({ render }) => async (err, req, res, next) => {
  const { statusCode, message } = err;

  res.statusCode = statusCode;

  const html = await render('Error', { statusCode, message });
  if (html) {
    res.send(html);
  }

  next();
};
