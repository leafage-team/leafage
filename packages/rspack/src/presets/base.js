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
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {},
    },
    resolveLoader: {
      alias: {},
    },
    plugins: [
      new WebpackBarPlugin({
        name: ctx.name,
        color: { client: '#00b400', server: '#ffac00' }[ctx.name],
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
