import http from 'node:http';
import finalhandler from 'finalhandler';
import serverRouter from 'router';
import enableDestroy from 'server-destroy';
import {utils} from '@leafage/toolkit';
import {createRenderer} from '@leafage/renderer';
import {basePreset} from './presets/base';
import {devPreset} from './presets/dev';
import {staticPreset} from './presets/static';
import {proxyPreset} from './presets/proxy';
import {serverPreset} from './presets/server';
import {routePreset} from './presets/route';
import {errorPreset} from './presets/error';

const startServer = async (ctx) => {
  await ctx.renderer?.ready();

  utils.applyPresets(
    ctx,
    [
      basePreset,
      devPreset,
      staticPreset,
      proxyPreset,
      serverPreset,
      routePreset,
      errorPreset,
    ],
  );

  const server = http.createServer((req, res) => ctx.app(req, res, finalhandler(req, res)));

  await new Promise((resolve) => server.listen(ctx.config.server.port, ctx.config.server.host, () => resolve(server)));

  // Enable destroy support
  enableDestroy(server);

  await ctx.context.callHook('server:start', ctx.app);

  ctx.context.hook('server:close', () => new Promise((resolve) => {
    server.removeAllListeners();

    server.destroy(() => {
      ctx.context.removeHook('server:close');

      resolve();
    });
  }));
};
const closeServer = async (ctx) => {
  await ctx.renderer?.close();

  if (ctx.app.stack?.length) {
    ctx.app.stack = [];
  }

  await ctx.context.callHook('server:close');
};
export const createServer = (context) => {
  const app = serverRouter();
  const renderer = createRenderer(context);

  const ctx = { app, context, config: context.config, renderer, isDev: context.config.dev };

  context.callHook('server:create');

  return {
    app,
    getServer: () => ({}),
    start: () => startServer(ctx),
    close: () => closeServer(ctx),
  };
};
