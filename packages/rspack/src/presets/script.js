import path from 'pathe';
import { rspack } from '@rspack/core';
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';

export const scriptPreset = (ctx) => {
  const resolve = (...dir) => path.join(ctx.options.dir.root, ...dir);

  ctx.config.module.rules.push({
    oneOf: new Array(Number(ctx.isClient) + 1).fill(0).map((_, index) => {
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
      if (index === 0 && ctx.isClient) {
        rule.resourceQuery = /useClientEntryLoader/;
        rule.use.push({
          loader: path.join(__dirname, '../loader/client-entry-loader.js'),
        });
      }

      return rule;
    }),
  });

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

              return hasJs && resource.indexOf(resolve('node_modules')) === 0;
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
