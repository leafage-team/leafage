import express from 'express';
import { logger, useContext } from '@leafage/toolkit';
import { applyPresets } from './common/utils';
import { basePreset } from './presets/base';
import { devPreset } from './presets/dev';
import { staticPreset } from './presets/static';
import { errorPreset } from './presets/error';

export const createServer = () => {
  const context = useContext();
  const app = express();

  context.callHook('server:create');

  applyPresets(app, [
    basePreset,
    devPreset,
    staticPreset,
    errorPreset,
  ]);

  return app;
};

export const startServer = (app) => {
  const context = useContext();

  app.listen(context.options.server.port, context.options.server.host, () => {
    context.callHook('server:start');

    logger.info(`Leafage server is running on port ${context.options.server.port}`);
  });
};
