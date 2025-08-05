import path from 'path';
import { rspack } from '@rspack/core';
import rm from 'rimraf';
import pify from 'pify';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { createMfs } from '@/common/utils';
import { client } from './config/client';
import { server } from './config/server';

const webpackDev = async (compiler, context, mfs) => {
  const devMiddleware = pify(
    webpackDevMiddleware(compiler, {
      stats: false,
      outputFileSystem: mfs,
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
const genStatsError = (stats) => {
  const error = new Error('Builder error');
  error.stack = stats.toString('normal');
  return error;
};
const webpackCompile = async (compiler, context) => {
  if (context.options.dev) {
    if (compiler.name === 'client') {
      const mfs = createMfs(context.options);
      compiler.hooks.done.tap('load-resources', async () => {
        await context.callHook('bundle:resources', mfs);
      });
      return new Promise((resolve, reject) => {
        compiler.hooks.done.tap('bundle-dev', (stats) => {
          if (stats?.hasErrors()) {
            reject(genStatsError(stats));
            return;
          }

          resolve();
        });

        webpackDev(compiler, context, mfs);
      });
    }

    if (compiler.name === 'server') {
      return new Promise((resolve, reject) => {
        compiler.watch(context.options.builder.watch, (err) => {
          if (err) return reject(err);

          resolve();
        });
      });
    }
  }

  compiler.run = pify(compiler.run);
  const stats = await compiler.run();

  if (stats?.hasErrors()) {
    throw genStatsError(stats);
  }
};
const build = async (context) => {
  const configs = [client, server].map((preset) => preset(context));

  await Promise.all(configs.map((c) => webpackCompile(rspack(c), context)));
};
export const bundle = async (context) => {
  rm.sync(path.join(context.options.dir.root, context.options.dir.dist));

  await context.runWithContext(() => build(context));
};
