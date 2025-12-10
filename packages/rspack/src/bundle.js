import { rspack } from '@rspack/core';
import rm from 'rimraf';
import { utils } from '@leafage/toolkit';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { createContext, getBuildStatsError } from './common/utils';
import { createMfs } from './common/mfs';
import { basePreset } from './presets/base';
import { aliasPreset } from './presets/alias';
import { assetPreset } from './presets/asset';
import { entryPreset } from './presets/entry';
import { envPreset } from './presets/env';
import { externalPreset } from './presets/external';
import { manifestPreset } from './presets/manifest';
import { outputPreset } from './presets/output';
import { scriptPreset } from './presets/script';
import { stylePreset } from './presets/style';

const webpackDev = async (compiler, context) => {
  const devMiddleware = utils.promisify(
    webpackDevMiddleware(compiler, {
      stats: false,
      outputFileSystem: compiler.outputFileSystem,
    }),
  );
  const hotMiddleware = utils.promisify(
    webpackHotMiddleware(compiler, {
      log: false,
      heartbeat: 10000,
    }),
  );

  await context.callHook('bundle:devMiddleware', async (req, res, next) => {
    await devMiddleware(req, res);

    await hotMiddleware(req, res);

    next();
  });
};
const webpackCompile = async (compiler, context) => {
  await context.callHook('bundle:compile', { name: compiler.options.name, compiler });

  if (context.config.dev) {
    compiler.hooks.done.tap('bundle-compiled', async (stats) => {
      await context.callHook('bundle:compiled', { name: compiler.options.name, compiler, stats });
    });

    if (compiler.options.name === 'client') {
      compiler.outputFileSystem = createMfs();
      compiler.hooks.done.tap('load-resource', async () => {
        await context.callHook('bundle:resource', compiler.outputFileSystem);
      });

      return new Promise((resolve, reject) => {
        compiler.hooks.done.tap('bundle-dev', (stats) => {
          if (stats?.hasErrors()) {
            reject(getBuildStatsError(stats));
            return;
          }

          resolve();
        });

        webpackDev(compiler, context);
      });
    }

    if (compiler.options.name === 'server') {
      return new Promise((resolve, reject) => {
        compiler.watch(context.config.builder.watch, (err, stats) => {
          if (err) {
            reject(err);
            return;
          }
          if (stats?.hasErrors()) {
            reject(getBuildStatsError(stats));
            return;
          }

          resolve();
        });
      });
    }

    return;
  }

  compiler.run = utils.promisify(compiler.run);
  const stats = await compiler.run();

  if (stats?.hasErrors()) {
    throw getBuildStatsError(stats);
  }
};
export const build = async ([client, server], context) => {
  rm.sync(context.config.output.dist);

  await Promise.all([client, server].map((c) => webpackCompile(rspack(c), context)));
};
export const createBundle = (context) => {
  context.callHook('bundle:create');

  const clientCtx = createContext(context, 'client');
  const serverCtx = createContext(context, 'server');

  const [client, server] = [clientCtx, serverCtx].map((ctx) => {
    const preset = utils.applyPresets(
      ctx,
      [
        basePreset,
        aliasPreset,
        assetPreset,
        entryPreset,
        envPreset,
        externalPreset,
        manifestPreset,
        outputPreset,
        scriptPreset,
        stylePreset,
      ],
    );

    return context.config.builder.rspack(
      preset.config,
      {
        name: ctx.name,
        context,
        config: context.config,
        isDev: ctx.isDev,
        isClient: ctx.isClient,
        isServer: ctx.isServer,
      },
    );
  });

  return {
    build: () => build([client, server], context),
  };
};
