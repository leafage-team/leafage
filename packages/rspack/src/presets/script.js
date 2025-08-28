import path from 'pathe';
import { rspack } from '@rspack/core';
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';

export const scriptPreset = (ctx) => {
  const targets = ctx.options.builder.browserslist;

  ctx.config.module.rules.push({
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
        env: {
          targets,
        },
      },
    }],
    type: 'javascript/auto',
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
