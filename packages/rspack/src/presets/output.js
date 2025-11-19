import { getFileName } from '@/common/utils';

export const outputPreset = (ctx) => {
  const result = {
    publicPath: ctx.options.output.assetPrefix,
  };

  if (ctx.isClient) {
    result.path = ctx.options.output.client;
    result.filename = getFileName(ctx, 'app');
    result.chunkFilename = getFileName(ctx, 'chunk');
  }
  if (ctx.isServer) {
    result.path = ctx.options.output.server;
    result.filename = '[name].js';
    result.chunkFilename = '[name].js';
    result.libraryTarget = 'commonjs2';
  }

  ctx.config.output = result;
};
