import path from 'pathe';
import { rspack } from '@rspack/core';
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';
import { CLIENT_ENTRY_QUERY } from '@/common/constants';

export const scriptPreset = (ctx) => {
  const loaderLen = ctx.isClient ? 2 : 1;
  const loaders = new Array(loaderLen).fill(0).map((_, index) => {
    const rule = {
      test: /\.jsx?$/,
      use: [{
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'ecmascript',
              jsx: true,
            },
            transform: {
              react: {
                development: ctx.isDev,
                refresh: ctx.isDev && ctx.isClient,
              },
            },
          },
        },
      }],
      type: 'javascript/auto',
    };
    if (loaderLen === 2 && ctx.isClient && index === 0) {
      rule.resourceQuery = new RegExp(CLIENT_ENTRY_QUERY);
      rule.use.push({
        loader: require.resolve('../loader/client-entry-loader'),
      });
    }

    return rule;
  });

  ctx.config.module.rules.push({ oneOf: loaders });

  if (ctx.isDev && ctx.isClient) {
    ctx.config.plugins.push(
      new ReactRefreshPlugin(),
      new rspack.HotModuleReplacementPlugin(),
    );
  }
  if (!ctx.isDev) {
    if (ctx.isClient) {
      ctx.config.optimization.runtimeChunk = true;
      ctx.config.optimization.nodeEnv = false;
      ctx.config.optimization.splitChunks = {
        cacheGroups: {
          vendor: {
            name: 'vendor',
            chunks: 'initial',
            test: ({ resource }) => {
              if (!resource) return false;

              const hasJs = /\.js$/.test(resource);

              return hasJs && resource.indexOf(path.join(ctx.options.dir.root, 'node_modules')) === 0;
            },
          },
          async: {
            name: 'async',
            chunks: 'async',
            minChunks: 3,
          },
        },
      };
    }

    ctx.config.optimization.minimizer.push(
      new rspack.SwcJsMinimizerRspackPlugin({
        extractComments: false,
        minimizerOptions: {
          compress: {
            drop_debugger: true,
            pure_funcs: Object.keys(console).map((n) => `console.${n}`),
          },
        },
      }),
    );
  }
};
