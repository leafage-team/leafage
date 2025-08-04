import { getFileName } from '@/common/utils';

export const assetPreset = (ctx) => {
  ctx.config.module.rules.push({
    test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
    type: 'asset',
    generator: {
      filename: getFileName(ctx, 'image'),
      emit: ctx.isClient,
    },
    parser: {
      dataUrlCondition: {
        maxSize: 1000,
      },
    },
  }, {
    test: /\.(webm|mp4|ogv|mp3|aac|ogg|wav)$/i,
    type: 'asset',
    generator: {
      filename: getFileName(ctx, 'media'),
      emit: ctx.isClient,
    },
    parser: {
      dataUrlCondition: {
        maxSize: 1000,
      },
    },
  }, {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
    type: 'asset',
    generator: {
      filename: getFileName(ctx, 'font'),
      emit: ctx.isClient,
    },
    parser: {
      dataUrlCondition: {
        maxSize: 1000,
      },
    },
  });
};
