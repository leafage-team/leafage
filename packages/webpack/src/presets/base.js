import path from 'path';
import { utils } from '@leafage/toolkit';
import { applyPresets, fileName } from '../utils';

const baseConfig = (webpackContext) => {
  webpackContext.config = {
    name: webpackContext.name,
    devtool: (!webpackContext.isDev || webpackContext.isServer) ? false : 'eval-cheap-module-source-map',
    mode: webpackContext.isDev ? 'development' : 'production',
    target: webpackContext.isServer ? 'node' : 'web',
    output: {},
    module: {
      rules: [],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.json'],
      alias: {},
    },
    plugins: [],
    externals: [],
    optimization: {
      minimizer: [],
    },
  };
};
const output = (webpackContext) => {
  let result = {
    path: path.join(webpackContext.options.dir.root, webpackContext.options.dir.dist),
    publicPath: webpackContext.options.builder.publicPath,
  };
  if (webpackContext.isServer) {
    result = utils.mergeProps(
      result,
      {
        filename: '[name].js',
        chunkFilename: '[name].js',
        libraryTarget: 'commonjs2',
      },
    );
  }
  if (webpackContext.isClient) {
    result = utils.mergeProps(
      result,
      {
        filename: fileName(webpackContext, 'app'),
        chunkFilename: fileName(webpackContext, 'chunk'),
      },
    );
  }

  webpackContext.config.output = result;
};
const baseAlias = (webpackContext) => {
  const srcDir = path.join(webpackContext.options.dir.root, webpackContext.options.dir.src);

  webpackContext.config.resolve.alias = {
    '@': srcDir,
    page: path.join(srcDir, webpackContext.options.dir.page),

  };
};

export const basePreset = (webpackContext) => applyPresets(
  webpackContext,
  [
    baseConfig,
    output,
    baseAlias,
  ],
);
