import path from 'path';
import { rspack } from '@rspack/core';
import rm from 'rimraf';
import pify from 'pify';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { getBuildStatsError } from '@/common/utils';
import { createMfs } from '@/common/mfs';
import { client } from './config/client';
import { server } from './config/server';

const webpackDev = async (compiler, context) => {
  const devMiddleware = pify(
    webpackDevMiddleware(compiler, {
      stats: false,
      outputFileSystem: compiler.outputFileSystem,
    }),
  );
  const hotMiddleware = pify(
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

  if (context.options.dev) {
    compiler.outputFileSystem = createMfs();

    compiler.hooks.done.tap('load-resources', async (stats) => {
      await context.callHook('bundle:compiled', { name: compiler.options.name, compiler, stats });

      await context.callHook('bundle:resources', compiler.outputFileSystem);
    });

    if (compiler.options.name === 'client') {
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
        compiler.watch(context.options.builder.watch, (err, stats) => {
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

  compiler.run = pify(compiler.run);
  const stats = await compiler.run();

  if (stats?.hasErrors()) {
    throw getBuildStatsError(stats);
  }
};
const build = async (context) => {
  const configs = [client, server].map((preset) => preset(context));

  await context.callHook('bundle:config', configs);

  await Promise.all(configs.map((c) => webpackCompile(rspack(c), context)));
};
export const bundle = async (context) => {
  rm.sync(path.join(context.options.dir.root, context.options.dir.dist));

  await context.runWithContext(() => build(context));
};
