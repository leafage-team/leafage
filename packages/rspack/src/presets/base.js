import path from 'pathe';
import WebpackBarPlugin from 'webpackbar/rspack';

export const basePreset = (ctx) => {
  ctx.config = {
    name: ctx.name,
    devtool: (!ctx.isDev || ctx.isServer) ? false : 'eval-cheap-module-source-map',
    mode: ctx.isDev ? 'development' : 'production',
    target: ctx.isServer ? 'node' : 'web',
    entry: {},
    output: {},
    module: {
      rules: [],
      parser: {
        'css/auto': {
          namedExports: false,
        },
      },
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {
        '@': path.join(ctx.options.dir.root, ctx.options.dir.src),
      },
    },
    plugins: [
      new WebpackBarPlugin({
        name: ctx.name,
        color: { client: 'green', server: 'orange' }[ctx.name],
      }),
    ],
    externals: [],
    optimization: {
      minimizer: [],
    },
    performance: {
      hints: false,
    },
  };
};
