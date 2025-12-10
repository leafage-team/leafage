import { utils } from '@leafage/toolkit';
import { Router } from './router';
import { basePreset } from './presets/base';
import { devPreset } from './presets/dev';
import { staticPreset } from './presets/static';

export const createServer = (context) => {
  const server = new Router();

  context.callHook('server:create');

  utils.applyPresets(
    { server, context, config: context.config, isDev: context.config.dev },
    [
      basePreset,
      devPreset,
      staticPreset,
    ],
  );

  return {
    server,
  };
};
