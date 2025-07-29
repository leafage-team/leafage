import StyleConfigWebpackPlugin from '@pieced/style-config-webpack-plugin';
import { fileName } from '../utils';

export const stylePreset = (webpackContext) => {
  webpackContext.config.plugins.push(
    new StyleConfigWebpackPlugin({
      extract: {
        filename: fileName(webpackContext, 'css'),
        chunkFilename: fileName(webpackContext, 'css'),
      },
      cssModulesName: fileName(webpackContext, 'cssModuleName'),
    }),
  );
};
