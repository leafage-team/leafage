import FontConfigWebpackPlugin from '@pieced/font-config-webpack-plugin';
import ImageConfigWebpackPlugin from '@pieced/image-config-webpack-plugin';
import MediaConfigWebpackPlugin from '@pieced/media-config-webpack-plugin';
import { fileName } from '../utils';

export const assetsPreset = (webpackContext) => {
  webpackContext.config.plugins.push(
    // image
    new ImageConfigWebpackPlugin({
      generator: {
        filename: fileName(webpackContext, 'image'),
      },
    }),
    // font
    new FontConfigWebpackPlugin({
      generator: {
        filename: fileName(webpackContext, 'font'),
      },
    }),
    // media
    new MediaConfigWebpackPlugin({
      generator: {
        filename: fileName(webpackContext, 'media'),
      },
    }),
  );
};
