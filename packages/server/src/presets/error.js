import { handleErrorResponse } from '@/common/handleErrorResponse';

export const errorPreset = (app) => {
  app.use((err, req, res, next) => {
    const { statusCode, message } = handleErrorResponse(err, req, res);

    res.status(statusCode).send(message);

    next();
  });
};
