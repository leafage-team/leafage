import express from 'express';
// 捕获express promise异常
import 'express-async-errors';
import { logger } from '@leafage/toolkit';
import { applyPresets } from './common/utils';
import { basePreset } from './presets/base';
import { devPreset } from './presets/dev';
import { staticPreset } from './presets/static';
import { routerPreset } from './presets/router';
import { errorPreset } from './presets/error';

const startServer = (app, context) => {
  app.listen(context.options.server.port, context.options.server.host, () => {
    context.callHook('server:start');

    logger.ready({
      message: `Server listening on http://${context.options.server.host}:${context.options.server.port}`,
      badge: true,
    });
  });
};
export const createServer = (context) => {
  const app = express();

  context.callHook('server:create');

  context.runWithContext(() => {
    applyPresets(app, [
      basePreset,
      devPreset,
      staticPreset,
      routerPreset,
      errorPreset,
    ]);
  });

  return {
    app,
    start: () => startServer(app, context),
  };
};
