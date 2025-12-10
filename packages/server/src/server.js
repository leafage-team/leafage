import http from 'node:http';
import serverRouter from 'router';
import finalhandler from 'finalhandler';
import { utils } from '@leafage/toolkit';
import { basePreset } from './presets/base';
import { devPreset } from './presets/dev';
import { staticPreset } from './presets/static';

export const createServer = (context) => {
  const server = serverRouter();
  const listener = http.createServer((req, res) => server(req, res, finalhandler(req, res)));
  server.listen = listener.listen.bind(listener);

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
