import { rspack } from '@rspack/core';
import { getFileName } from '@/common/utils';

export const stylePreset = (ctx) => {
  const getCssLoaders = () => {
    const sourceMap = ctx.isDev && ctx.isClient;

    const cssExtractLoader = {
      loader: rspack.CssExtractRspackPlugin.loader,
      options: {
        emit: ctx.isClient,
      },
    };
    const cssLoader = {
      loader: require.resolve('css-loader'),
      options: {
        modules: {
          localIdentName: getFileName(ctx, 'cssModuleName'),
        },
        sourceMap,
      },
    };

    const lightningLoader = {
      loader: 'builtin:lightningcss-loader',
      options: {
        sourceMap,
      },
    };

    // generate loader string to be used with extract text plugin
    const generateLoaders = (loader, loaderOptions) => {
      const loaders = [cssLoader, lightningLoader];

      if (loader) {
        loaders.push({
          loader: `${loader}-loader`,
          options: {
            ...loaderOptions,
            sourceMap,
          },
        });
      }

      if (ctx.isClient && ctx.isDev) {
        return [require.resolve('style-loader')].concat(loaders);
      }

      return [cssExtractLoader].concat(loaders);
    };

    return {
      css: generateLoaders(),
      less: generateLoaders('less'),
      sass: generateLoaders('sass', { indentedSyntax: true }),
      scss: generateLoaders('sass'),
      stylus: generateLoaders('stylus'),
      styl: generateLoaders('stylus'),
    };
  };
  const loaders = getCssLoaders();
  Object.keys(loaders).forEach((suffix) => ctx.config.module.rules.push({
    test: new RegExp(`\\.${suffix}$`),
    use: loaders[suffix],
  }));
  if (!ctx.isDev && ctx.isClient) {
    ctx.config.plugins.push(
      new rspack.CssExtractRspackPlugin({
        filename: getFileName(ctx, 'css'),
        chunkFilename: getFileName(ctx, 'css'),
      }),
    );
    ctx.config.optimization.minimizer.push(
      new rspack.LightningCssMinimizerRspackPlugin(),
    );
  }
};
