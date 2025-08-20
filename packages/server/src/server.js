import express from 'express';
// 捕获express promise异常
import 'express-async-errors';
import { logger, utils } from '@leafage/toolkit';
import { createRenderer } from '@leafage/renderer';
import { basePreset } from './presets/base';
import { devPreset } from './presets/dev';
import { staticPreset } from './presets/static';
import { serverPreset } from './presets/server';
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
  const renderer = createRenderer(context);

  context.callHook('server:create');

  context.runWithContext(() => {
    utils.applyPresets(
      { app, context, options: context.options, renderer, isDev: context.options.dev },
      [
        basePreset,
        devPreset,
        staticPreset,
        serverPreset,
        routerPreset,
        errorPreset,
      ],
    );
  });

  return {
    app,
    start: () => startServer(app, context),
  };
};
